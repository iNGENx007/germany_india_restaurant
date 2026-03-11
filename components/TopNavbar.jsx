"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  {
    href: "/",
    label: "Home",
    dataWId: "25ee2989-7528-078a-6215-f3ce16ae41b5",
  },
  {
    href: "/menu",
    label: "Men\u00FC",
    dataWId: "25ee2989-7528-078a-6215-f3ce16ae41b7",
  },
  {
    href: "/impression",
    label: "Impressionen",
    dataWId: "25ee2989-7528-078a-6215-f3ce16ae41b9",
  },
  {
    href: "/events",
    label: "Gruppen & Events",
    dataWId: "b85b4db3-387f-80d2-f8e9-44fb13e1cd9b",
  },
  {
    href: "/karriere",
    label: "Karriere",
    dataWId: "25ee2989-7528-078a-6215-f3ce16ae41bb",
  },
  {
    href: "/kontakt",
    label: "Kontakt",
    dataWId: "25ee2989-7528-078a-6215-f3ce16ae41bd",
  },
];

function normalizePath(path) {
  if (!path) {
    return "/";
  }

  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
}

export default function TopNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activePath = hasMounted ? normalizePath(pathname || "/") : "";

  const isLinkActive = (href) => {
    if (!activePath) {
      return false;
    }

    return activePath === normalizePath(href);
  };

  return (
    <div className="page-wrapper" style={{ position: "relative", zIndex: 2147483000 }}>
      <style jsx global>{`
        .navbar_component,
        .navbar_container {
          overflow: visible !important;
        }

        @media (max-width: 991px) {
          .navbar_component {
            z-index: 2147483001 !important;
          }

          .navbar_menu.w-nav-menu {
            display: none !important;
            position: fixed !important;
            top: 4rem !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 4rem !important;
            background-color: #fff !important;
            padding: 1.5rem 2rem !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch;
            z-index: 2147483002 !important;
            pointer-events: auto !important;
            isolation: isolate;
          }

          .navbar_menu.w-nav-menu.w--nav-menu-open {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
          }

          .navbar_menu-wrapper,
          .navbar_links-wrapper,
          .navbar_link {
            position: relative;
            z-index: 2;
            pointer-events: auto !important;
          }

          .nav_mob_link-wrapper {
            display: none !important;
            pointer-events: none !important;
          }

          .w--nav-menu-open .navbar_link {
            display: block !important;
            width: 100% !important;
            padding: 1rem 0 !important;
            text-align: left !important;
            font-size: 1.1rem !important;
            color: #614124 !important;
            border-bottom: 1px solid #f0f0f0 !important;
          }

          .w--nav-menu-open .navbar_link:last-child {
            border-bottom: none !important;
          }

          .navbar_menu-button {
            position: relative !important;
            z-index: 2147483003 !important;
          }
        }

        .menu-icon_line-top,
        .menu-icon_line-bottom {
          transition: transform 0.3s ease-in-out !important;
          transform-origin: center center !important;
        }

        .w-nav-button.w--open .menu-icon_line-top {
          transform: translateY(6px) rotate(45deg) !important;
        }

        .w-nav-button.w--open .menu-icon_line-bottom {
          transform: translateY(-6px) rotate(-45deg) !important;
        }
      `}</style>
      <div className="buttons_mobile-wrapper">
        <a href="tel:+498121986166" className="button_mobile is-1 w-button">
          Reservierung
        </a>
        <a
          href="https://share.google/df6DQ9ljtyiBndTf2"
          target="_blank"
          rel="noopener noreferrer"
          className="button_mobile w-button"
        >
          Order to pickup
        </a>
      </div>

      <div
        data-animation="default"
        className={`navbar_component w-nav ${isOpen ? "w--open" : ""}`}
        data-easing2="ease"
        data-easing="ease"
        data-collapse="all"
        data-w-id="25ee2989-7528-078a-6215-f3ce16ae41a6"
        role="banner"
        data-no-scroll="1"
        data-duration="0"
      >
        <div className="navbar_container">
          <Link
            href="/"
            id="w-node-_25ee2989-7528-078a-6215-f3ce16ae41a8-16ae41a6"
            data-w-id="25ee2989-7528-078a-6215-f3ce16ae41a8"
            className="navbar_logo-link w-nav-brand"
          >
            <Image
              loading="eager"
              src="/images/logo.png"
              alt="Logo"
              className="navbar_logo"
              width={150}
              height={60}
            />
            <Image
              src="/images/logo.png"
              loading="lazy"
              data-w-id="5426709b-5c20-473e-6fda-ba3a826a9da3"
              alt="Logo"
              className="navbar_logo is-white"
              width={150}
              height={60}
            />
          </Link>
          <div
            id="w-node-_33570b70-7d97-85f9-8fe2-43d3854f29bb-16ae41a6"
            className="nav_link-wrapper"
          >
            <a href="tel:+498121986166" className="button is-yellow w-button">
              Reservierung
            </a>
            <a
              href="https://share.google/df6DQ9ljtyiBndTf2"
              target="_blank"
              rel="noopener noreferrer"
              className="button is-yellow w-button"
            >
              Pickup Order
            </a>
          </div>
          <nav
            id="site-mobile-menu"
            role="navigation"
            data-w-id="25ee2989-7528-078a-6215-f3ce16ae41b2"
            className={`navbar_menu w-nav-menu ${isOpen ? "w--nav-menu-open" : ""}`}
            data-open={isOpen ? "true" : "false"}
            {...(isOpen ? { "data-nav-menu-open": "" } : {})}
          >
            <div className="navbar_menu-wrapper">
              <div className="navbar_links-wrapper">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    data-w-id={link.dataWId}
                    className={`navbar_link w-nav-link ${isOpen ? "w--nav-link-open" : ""} ${isLinkActive(link.href) ? "w--current" : ""}`}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="nav_mob_link-wrapper"></div>
              </div>
            </div>
          </nav>
          <div
            id="w-node-_25ee2989-7528-078a-6215-f3ce16ae41b1-16ae41a6"
            className="navbar-menu_wrapper"
          >
            <div className="mobile_links">
              <a
                aria-label="phone number"
                href="tel:+498121986166"
                className="mob_link w-inline-block"
              >
                <span className="icon_mob">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2H10L12 7L10 8C11.25 10.75 13.25 12.75 16 14L17 12L22 14V18C22 19.1 21.1 20 20 20C11.16 20 4 12.84 4 4C4 2.9 4.9 2 6 2Z" fill="currentColor" />
                  </svg>
                </span>
              </a>
              <a aria-label="location" href="https://share.google/df6DQ9ljtyiBndTf2" className="mob_link w-inline-block">
                <span className="icon_mob">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C8 17.2 6 14.2 6 10.5C6 7.19 8.69 4.5 12 4.5C15.31 4.5 18 7.19 18 10.5C18 14.2 16 17.2 12 22Z" fill="currentColor" />
                    <circle cx="12" cy="10.5" r="2.5" fill="white" />
                  </svg>
                </span>
              </a>
            </div>
            <button
              type="button"
              className={`navbar_menu-button mobile_link-wrapper w-nav-button ${isOpen ? "w--open" : ""}`}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="site-mobile-menu"
              onClick={() => setIsOpen((previousState) => !previousState)}
            >
              <div className="menu-icon">
                <div className="menu-icon_wrapper">
                  <div data-w-id="25ee2989-7528-078a-6215-f3ce16ae41c4" className="menu-icon_line-top">
                    <div className="div-block-8"></div>
                  </div>
                  <div data-w-id="25ee2989-7528-078a-6215-f3ce16ae41c5" className="menu-icon_line-bottom">
                    <div className="div-block-8"></div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
