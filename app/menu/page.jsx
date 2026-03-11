"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import TopNavbar from "../../components/TopNavbar";

export default function MenuPage() {
  const [menuData, setMenuData] = useState(null);
  const [flatData, setFlatData] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState(""); // 'veg', 'nonveg', or ''
  const [sortBy, setSortBy] = useState("price-asc");
  const [modalOpen, setModalOpen] = useState(false);
  const [activePdf, setActivePdf] = useState(""); // Track which PDF to display
  const [loading, setLoading] = useState(true);

  const EUR = "€";

  const parseEuro = (s) => {
    if (!s) return NaN;
    const m = (s + "")
      .replace(/[^\d,.-]/g, "")
      .replace(".", "")
      .replace(",", ".");
    const v = parseFloat(m);
    return Number.isFinite(v) ? v : NaN;
  };

  const extractAllergens = (name) => {
    const m = name.match(/([a-z](?:\d)?(?:\s*,\s*[a-z](?:\d)?)+)$/i);
    if (!m) return { clean: name.trim(), allergens: [] };
    const tail = m[1];
    const allergens = tail.split(/\s*,\s*/).map((x) => x.toLowerCase());
    const clean = name
      .slice(0, name.length - tail.length)
      .replace(/[ ,;\-]+$/, "")
      .trim();
    return { clean, allergens };
  };

  const VEG_SECTIONS = [/vegane/i, /vegetar/i, /salate/i, /reis/i];
  const NONVEG_SECTIONS = [
    /hähnchen/i,
    /rind/i,
    /lamm/i,
    /ente/i,
    /fisch/i,
    /garnelen/i,
    /tandoori/i,
  ];
  const VEG_WORDS =
    /(paneer|vegetable|veg|dal|chana|chole|aloo|saag|palak|matar|mutter|kofta|bhindi|baingan|mix|sabzi)/i;
  const NONVEG_WORDS =
    /(chicken|beef|rind|lamm|mutton|duck|ente|fish|fisch|prawn|shrimp|garnelen|kebab|kabab)/i;

  const classifyVeg = (sectionTitle, itemName) => {
    if (VEG_SECTIONS.some((rx) => rx.test(sectionTitle))) return "veg";
    if (NONVEG_SECTIONS.some((rx) => rx.test(sectionTitle))) return "nonveg";
    if (VEG_WORDS.test(itemName)) return "veg";
    if (NONVEG_WORDS.test(itemName)) return "nonveg";
    return "unknown";
  };

  const minPriceFrom = (prices) => {
    if (!prices || !prices.length) return NaN;
    const vals = prices.map((p) => parseEuro(p)).filter(Number.isFinite);
    return vals.length ? Math.min(...vals) : NaN;
  };

  const flattenData = (data) => {
    const rows = [];
    for (const section of data.sections || []) {
      for (const item of section.items || []) {
        const { clean, allergens } = extractAllergens(item.name || "");
        const vegClass = classifyVeg(section.title || "", clean);
        const prices = item.prices || [];
        const sizes = item.sizes || [];
        rows.push({
          code: item.code || "",
          name: clean,
          description: item.description || "",
          section: section.title || "",
          prices,
          sizes,
          allergens,
          vegClass,
          sortPrice: minPriceFrom(prices),
        });
      }
    }
    return rows;
  };

  const applyFilters = useCallback(() => {
    if (!flatData.length) return;

    const q = searchQuery.trim().toLowerCase();
    let filtered = flatData.filter((r) => {
      if (q) {
        const hay = (
          r.code +
          " " +
          r.name +
          " " +
          r.description +
          " " +
          r.section
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (dietaryFilter === "veg") {
        if (r.vegClass !== "veg") return false;
      } else if (dietaryFilter === "nonveg") {
        if (r.vegClass !== "nonveg") return false;
      }
      return true;
    });

    // sorting
    filtered.sort((a, b) => {
      if (sortBy === "price-asc")
        return (a.sortPrice || 1e9) - (b.sortPrice || 1e9);
      if (sortBy === "price-desc")
        return (b.sortPrice || -1) - (a.sortPrice || -1);
      if (sortBy === "name-asc")
        return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
      return 0;
    });

    setViewData(filtered);
  }, [flatData, searchQuery, dietaryFilter, sortBy]);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await fetch("/api/menu", { cache: "no-store" });
        const data = await res.json();
        setMenuData(data);
        const flattened = flattenData(data);
        setFlatData(flattened);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load menu JSON", err);
        setLoading(false);
      }
    };
    loadMenu();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const openModal = (pdfPath) => {
    setActivePdf(pdfPath);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setActivePdf("");
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [modalOpen]);

  return (
    <>
      <style jsx global>{`
        /* Lightweight page-specific polish layered on top of styles.css */
        :root {
          --color-text: #2e2d2b;
          --color-muted: #6f6a63;
          --color-card: #faf8f6;
          --color-saffron: #d2b48c;
          --color-maroon: #614124;
          --color-accent: #ad241a;
          --color-border: rgba(97, 65, 36, 0.15);
          --color-hover: rgba(210, 180, 140, 0.22);
          --color-separator: #d2b48c;
        }

        body {
          font-family: "Inter", "Roboto", sans-serif;
          background: #fff;
          color: var(--color-text);
        }

        h1,
        h2,
        h3 {
          font-family: "Proxima Nova", "Inter", sans-serif;
          color: var(--color-maroon);
          font-weight: 700;
          text-transform: uppercase;
        }

        /* ---- Hero Header ---- */
        .hero {
          position: relative;
          margin: 12px auto 8px;
          max-width: 1400px;
          border-radius: 16px;
          overflow: hidden;
          background: #f5efe6;
          box-shadow: 0 8px 24px rgba(100, 80, 60, 0.12);
          isolation: isolate;
        }

        .hero-media {
          position: relative;
          min-height: 320px;
          background: url("/images/680ce7f65120df33e1a9bf6d-680f62c00b2ef342b13cf3b5_Rectangle%202042.avif")
            center/cover no-repeat;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.55) 60%,
            rgba(255, 255, 255, 0.9) 100%
          );
        }

        .hero-content {
          position: absolute;
          inset: auto 0 0 0;
          padding: 28px 20px 24px;
          display: grid;
          gap: 12px;
          background: linear-gradient(
            0deg,
            rgba(250, 248, 246, 0.92),
            rgba(250, 248, 246, 0.65)
          );
          backdrop-filter: blur(2px);
          animation: slideUp 0.5s ease both;
        }

        @keyframes slideUp {
          from {
            transform: translateY(12px);
            opacity: 0.6;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .hero-title {
          letter-spacing: 0.08em;
          text-align: center;
          animation: titleFade 1.2s ease both;
        }

        .hero-sub {
          color: var(--color-muted);
          font-weight: 400;
          text-align: center;
        }

        .hero-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        @keyframes titleFade {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .btn-primary {
          background: var(--color-accent);
          color: #fff;
          border: 1px solid var(--color-accent);
          transition: transform 0.12s ease, box-shadow 0.2s ease,
            filter 0.2s ease;
        }

        .btn-primary:hover {
          filter: saturate(1.05) brightness(0.98);
          box-shadow: 0 8px 20px rgba(173, 36, 26, 0.25);
          transform: translateY(-1px);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .btn-ghost {
          background: #fff;
          color: var(--color-maroon);
          border: 1px solid var(--color-separator);
          transition: transform 0.12s ease, box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .btn-ghost:hover {
          background: color-mix(in oklab, var(--color-saffron) 18%, #fff);
          box-shadow: 0 6px 16px rgba(97, 65, 36, 0.15);
          transform: translateY(-1px);
        }

        .btn-ghost:active {
          transform: translateY(0);
        }

        /* Highlight Menu Pop-up Button */
        #openPdfBtn {
          background: linear-gradient(135deg, #c97d60 0%, #d4a574 100%);
          color: #ffffff;
          border: 2px solid #c97d60;
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(201, 125, 96, 0.35),
            0 0 0 3px rgba(201, 125, 96, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          animation: pulseHighlight 2s ease-in-out infinite;
        }

        #openPdfBtn::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 10px;
          padding: 2px;
          background: linear-gradient(135deg, #c97d60, #d4a574, #c97d60);
          background-size: 200% 200%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderGlow 3s ease infinite;
          z-index: -1;
        }

        @keyframes pulseHighlight {
          0%,
          100% {
            box-shadow: 0 4px 16px rgba(201, 125, 96, 0.35),
              0 0 0 3px rgba(201, 125, 96, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 6px 24px rgba(201, 125, 96, 0.45),
              0 0 0 5px rgba(201, 125, 96, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes borderGlow {
          0%,
          100% {
            background-position: 0% 50%;
            opacity: 1;
          }
          50% {
            background-position: 100% 50%;
            opacity: 0.8;
          }
        }

        #openPdfBtn:hover {
          background: linear-gradient(135deg, #d18a6f 0%, #deb07f 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201, 125, 96, 0.45),
            0 0 0 6px rgba(201, 125, 96, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        #openPdfBtn:active {
          transform: translateY(0);
          box-shadow: 0 2px 12px rgba(201, 125, 96, 0.35),
            0 0 0 3px rgba(201, 125, 96, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        /* ---- Modal PDF ---- */
        .modal {
          position: fixed;
          inset: 0;
          display: none;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.55);
          z-index: 9999;
        }

        .modal[aria-hidden="false"] {
          display: flex;
        }

        .modal-dialog {
          width: min(96vw, 1100px);
          height: min(92vh, 820px);
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
          transform: translateY(12px);
          opacity: 0;
          animation: modalIn 0.35s ease forwards;
        }

        @keyframes modalIn {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: #faf8f6;
          border-bottom: 1px solid var(--color-border);
        }

        .modal-title {
          font-weight: 700;
          color: var(--color-maroon);
          text-transform: uppercase;
          font-size: 14px;
          letter-spacing: 0.08em;
        }

        .modal-close {
          border: none;
          background: transparent;
          color: var(--color-maroon);
          cursor: pointer;
          font-size: 20px;
          padding: 6px 8px;
          border-radius: 8px;
        }

        .modal-close:hover {
          background: color-mix(in oklab, var(--color-saffron) 22%, #fff);
        }

        .modal-body {
          height: calc(100% - 48px);
        }

        .modal-body iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        .menu-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px;
        }

        .menu-toolbar {
          display: grid;
          gap: 12px;
          margin-top: 8px;
        }

        @media (min-width: 768px) {
          .menu-toolbar {
            grid-template-columns: 1fr auto auto auto;
            align-items: end;
          }
        }

        .input,
        .select,
        .btn {
          border: 1px solid var(--color-border);
          background: var(--color-card);
          color: var(--color-text);
          padding: 10px 12px;
          border-radius: 10px;
        }

        .input {
          width: 100%;
        }

        .btn {
          cursor: pointer;
        }

        .chip.btn {
          color: var(--color-accent);
          background: #fff;
          border-color: var(--color-accent);
        }

        .chip.btn.veg {
          color: #355e3b;
          border-color: #355e3b;
        }

        .chip.btn:hover {
          background: color-mix(in oklab, var(--color-accent) 12%, #fff);
        }

        .chip.btn.veg:hover {
          background: color-mix(in oklab, #355e3b 12%, #fff);
        }

        .btn[aria-pressed="true"] {
          background: var(--color-accent);
          color: #fff;
          border-color: var(--color-accent);
        }

        .btn.veg[aria-pressed="true"] {
          background: #355e3b;
          color: #fff;
          border-color: #355e3b;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 12px;
          border: 1px solid var(--color-border);
        }

        .badge.veg {
          background: #eaf2e6;
          color: #355e3b;
          border-color: #c9ddbd;
        }

        .badge.nonveg {
          background: #f7eceb;
          color: #8b3b2e;
          border-color: #e4c3bf;
        }

        .price-chip {
          display: inline-flex;
          font-family: ui-monospace, Menlo, Consolas, monospace;
          font-size: 13px;
          padding: 6px 8px;
          border-radius: 999px;
          border: 1px dashed var(--color-border);
          background: color-mix(in oklab, var(--color-saffron) 28%, #fff);
          margin: 2px 6px 0 0;
        }

        .allergen {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 999px;
          border: 1px solid var(--color-border);
          background: color-mix(in oklab, var(--color-saffron) 18%, #fff);
          margin-right: 4px;
          cursor: help;
        }

        .count {
          font-size: 12px;
          color: var(--color-muted);
          margin-top: 6px;
        }

        .table-wrap {
          background: var(--color-card);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          overflow: auto;
          box-shadow: 0 2px 8px rgba(100, 80, 60, 0.06);
        }

        table.menu {
          width: 100%;
          min-width: 980px;
          border-collapse: separate;
          border-spacing: 0;
        }

        table.menu thead {
          background: color-mix(in oklab, var(--color-saffron) 35%, #fff);
          position: sticky;
          top: 0;
          z-index: 2;
        }

        table.menu th,
        table.menu td {
          padding: 12px 14px;
          border-bottom: 1px solid var(--color-border);
          vertical-align: top;
          text-align: left;
        }

        table.menu th {
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-maroon);
        }

        table.menu tr:hover td {
          background: var(--color-hover);
        }

        .dish {
          font-weight: 700;
          color: var(--color-maroon);
        }

        .code {
          font-size: 12px;
          padding: 2px 8px;
          border: 1px solid var(--color-border);
          border-radius: 999px;
          background: color-mix(in oklab, var(--color-saffron) 22%, #fff);
          color: var(--color-maroon);
        }

        .desc {
          color: var(--color-muted);
          font-size: 14px;
          margin-top: 2px;
        }

        /* Menu Header Image - Full Display Without Cropping */
        .menu-header-image-wrapper {
          width: 100%;
          max-width: 100%;
          position: relative;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f5efe6;
          overflow: hidden;
          box-sizing: border-box;
        }

        .menu-header-image-wrapper img {
          width: 100%;
          height: auto;
          max-width: 100%;
          max-height: 600px;
          display: block;
          object-fit: contain;
          object-position: center;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .menu-header-image-wrapper {
            width: 100%;
            max-width: 100%;
            overflow: hidden;
          }
          .menu-header-image-wrapper img {
            width: 100%;
            height: auto;
            max-width: 100%;
            max-height: 400px;
            object-fit: contain;
          }
        }

        @media (min-width: 769px) and (max-width: 1200px) {
          .menu-header-image-wrapper img {
            max-height: 500px;
          }
        }

        @media (min-width: 1201px) {
          .menu-header-image-wrapper img {
            max-height: 600px;
          }
        }

        .toolbar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px;
        }

        .controls {
          display: grid;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .controls {
            grid-template-columns: 1fr auto auto auto;
            align-items: end;
          }
        }

        .search-wrap {
          flex: 1;
        }
      `}</style>      <TopNavbar />

      {/* Menu Header Image */}
      <div className="menu-header-image-wrapper">
        <Image src="/images/menu-header.png" alt="Menu Header" loading="eager" width={1200} height={600} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
      </div>

      {/* Hero Header */}
      <section className="hero" aria-label="Menu Header">
        <div className="hero-media">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">Unsere Speisekarte</h1>
            <p className="hero-sub">
              Authentisch indisch, traditionell serviert – entdecken Sie unsere
              aktuelle Auswahl.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="/Speisekarte_Poing_3_(1)[1].pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Speisekarte als PDF"
              >
                Download Menü (PDF)
              </a>
              <button
                className="btn btn-ghost"
                id="openPdfBtn"
                aria-haspopup="dialog"
                aria-controls="pdfModal"
                onClick={() => openModal("/Speisekarte_Poing_3_(1)[1].pdf")}
              >
                Menü im Pop‑up öffnen
              </button>
              <button
                className="btn btn-ghost"
                id="openMittagskarteBtn"
                style={{
                  background: "linear-gradient(135deg, #d4a574 0%, #c97d60 100%)",
                  color: "#ffffff",
                  border: "2px solid #c97d60",
                  fontWeight: "600"
                }}
                aria-haspopup="dialog"
                aria-controls="pdfModal"
                onClick={() => openModal("/Mittagskarte 2025-2.pdf")}
              >
                Preview Mittagskarte (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      <header
        className="site-header"
        style={{ background: "transparent", paddingTop: "8px" }}
      >
        <div className="toolbar">
          <div className="controls">
            <div className="search-wrap">
              <input
                id="search"
                className="input"
                type="search"
                placeholder="Search by dish, code, section…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              id="vegBtn"
              className="chip btn veg"
              aria-pressed={dietaryFilter === "veg"}
              onClick={() =>
                setDietaryFilter(dietaryFilter === "veg" ? "" : "veg")
              }
            >
              Veg
            </button>
            <button
              id="nonVegBtn"
              className="chip btn"
              aria-pressed={dietaryFilter === "nonveg"}
              onClick={() =>
                setDietaryFilter(dietaryFilter === "nonveg" ? "" : "nonveg")
              }
            >
              Non-Veg
            </button>
            <select
              id="sort"
              className="select"
              aria-label="Sort menu items"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price-asc">Sort: Price ↑</option>
              <option value="price-desc">Sort: Price ↓</option>
              <option value="name-asc">Sort: Name A→Z</option>
            </select>
          </div>
        </div>
      </header>

      <main className="menu-shell">
        <div className="count">
          {viewData.length.toLocaleString()} dishes shown
        </div>
        <div className="table-wrap">
          <table className="menu" aria-describedby="count">
            <thead>
              <tr>
                <th style={{ width: "72px" }}>Code</th>
                <th style={{ width: "220px" }}>Dish</th>
                <th>Section</th>
                <th style={{ minWidth: "180px" }}>Sizes</th>
                <th style={{ minWidth: "180px" }}>Prices</th>
                <th style={{ minWidth: "120px" }}>Tags</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6}>Loading menu data...</td>
                </tr>
              ) : viewData.length === 0 ? (
                <tr>
                  <td colSpan={6}>No dishes found</td>
                </tr>
              ) : (
                viewData.map((item, index) => (
                  <tr key={`${item.code}-${index}`}>
                    <td>
                      <span className="code">{item.code || "-"}</span>
                    </td>
                    <td>
                      <div className="dish">{item.name}</div>
                      {item.description && (
                        <div className="desc">{item.description}</div>
                      )}
                    </td>
                    <td>{item.section}</td>
                    <td>
                      {item.sizes.map((size, idx) => (
                        <span key={idx} className="price-chip" title="Size">
                          {size}
                        </span>
                      ))}
                    </td>
                    <td>
                      {item.prices.map((price, idx) => (
                        <span key={idx} className="price-chip">
                          {price}
                        </span>
                      ))}
                    </td>
                    <td>
                      {item.vegClass === "veg" && (
                        <span className="badge veg">Veg</span>
                      )}
                      {item.vegClass === "nonveg" && (
                        <span className="badge nonveg">Non-Veg</span>
                      )}
                      {item.allergens.map((allergen, idx) => (
                        <span
                          key={idx}
                          className="allergen"
                          title="Allergen code"
                        >
                          {allergen}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="footer">
        <div className="padding-global">
          <div className="container-large">
            <div className="footer_wrapper">
              <div className="footel_line"></div>
              <div className="footer-top">
                <div
                  id="w-node-_735fc156-5166-43a8-5a31-b2ee3c4bc3cf-3c4bc3c0"
                  className="footer-top_center"
                >
                  <a href="/" className="w-inline-block">
                    <Image
                      src="/images/logo.png"
                      loading="lazy"
                      alt="Logo"
                      className="footer_logo"
                      width={200}
                      height={80}
                    />
                  </a>
                  <div className="footer-text-wrapper">
                    <p className="text_link" style={{ fontWeight: '600', marginBottom: '4px' }}>
                      TAJ MAHAL Restaurant
                    </p>
                    <p className="text_link" style={{ fontSize: '0.9em', marginBottom: '8px' }}>
                      INDIAN SPICE ROUTE GmbH
                    </p>
                    <a
                      aria-label="address"
                      href="https://share.google/df6DQ9ljtyiBndTf2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text_link"
                    >
                      Friedensstraße 9 · 85586 Poing
                    </a>
                    <a href="tel:+4908121986166" className="text_link">
                      T 08121 98 61 66
                    </a>
                    <a href="tel:+49176228202263" className="text_link">
                      M 0176 228 202 63
                    </a>
                  </div>
                  <div className="footer-text-wrapper _2">
                    <p className="paragraph">
                      Montag &ndash; Samstag 11:30 &ndash; 14:30, 17:30 &ndash;
                      23:00
                    </p>
                    <p className="paragraph">Sonntag 11:30 &ndash; 23:00</p>
                  </div>
                  <div className="footer-link_wraper"></div>
                </div>
              </div>
              <div className="footel_line"></div>
              <div className="footer-bottom">
                <div className="footer-bottom_side"></div>
                <div className="footer-bottom_center"></div>
                <div className="footer-bottom_side"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* PDF Modal */}
      <div
        className="modal"
        id="pdfModal"
        role="dialog"
        aria-modal="true"
        aria-hidden={!modalOpen}
        aria-label="Menu PDF"
        onClick={(e) => e.target === e.currentTarget && closeModal()}
      >
        <div className="modal-dialog">
          <div className="modal-head">
            <div className="modal-title">
              {activePdf.includes("Mittagskarte") ? "Mittagskarte (Lunch Menu)" : "Speisekarte (Main Menu)"}
            </div>
            <button
              className="modal-close"
              aria-label="Schließen"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
          <div className="modal-body">
            <iframe
              src={modalOpen ? activePdf : ""}
              title="Menu PDF"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
