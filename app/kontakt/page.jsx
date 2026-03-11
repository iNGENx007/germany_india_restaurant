"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TopNavbar from "../../components/TopNavbar";

export default function KontaktPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const forbiddenWords = [
    "financing",
    "marketing",
    "guest posting",
    "free trial",
    "unlock secrets",
    "affiliate",
    "advertisement",
    "promo",
    "offer",
    "seo",
    "sponsored",
    "influencer",
    "click here",
    "guaranteed",
    "leads",
    "business opportunity",
    "promotions",
    "cash",
    "instant",
    "earn money",
    "work from home",
    "investment",
    "make money fast",
    "risk-free",
    "free gift",
    "opportunity",
    "click below",
    "satisfaction guarantee",
    "increase sales",
    "double your income",
    "no fees",
    "limited time",
    "lowest price",
    "exclusive deal",
    "miracle",
    "best price",
    "save big",
    "as seen on",
    "once in a lifetime",
    "urgent",
    "act now",
    "100% free",
    "get paid",
    "give away",
    "win",
    "lottery",
    "deals",
    "sale",
    "free access",
    "free report",
    "search engine listings",
    "confidentiality",
    "unsecured credit",
    "removal",
    "online biz opportunity",
    "cash bonus",
    "free membership",
    "free quotes",
    "banners",
    "referral bonus",
    "multilevel marketing",
    "secret",
    "no cost",
    "hidden fees",
    "buy direct",
    "satisfaction",
    "prize",
    "free trial membership",
    "testimonials",
    "free consultation",
    "crazy deal",
    "unsecured debts",
    "earn cash",
    "money back guarantee",
    "limited supply",
    "internet business",
    "free samples",
    "advertising",
    "send money",
    "free information",
    "risk-free trial",
    "yearly fees",
    "hidden charges",
    "earn extra cash",
    "free download",
    "win big",
    "money-making",
    "make money online",
    "best payout",
    "easy money",
    "fast cash",
    "limited time offer",
    "bulk emails",
    "unsecured loans",
    "free checklist",
    "big bucks",
    "free money",
    "no fees ever",
    "100% satisfied",
    "apply now",
    "best rate",
    "direct email",
    "full refund",
    "free upgrade",
    "credit card offers",
    "promise you",
    "money management",
    "unsecured credit cards",
    "work at home",
    "be your own boss",
    "easy income",
    "incentives",
    "investment opportunity",
    "premium",
    "no purchase necessary",
    "special promotion",
    "free website",
    "cash prizes",
    "join millions",
    "click to remove",
    "free technology",
    "low investment",
    "money making system",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const inputFields = form.querySelectorAll("input, textarea");

    // Check for forbidden words
    for (const field of inputFields) {
      const value = (field.value || "").toLowerCase();
      if (forbiddenWords.some((word) => value.includes(word))) {
        alert("404");
        return;
      }
    }

    // Get form data
    const formData = new FormData(form);
    const data = {
      Vorname: formData.get("Vorname"),
      Nachname: formData.get("Nachname"),
      Email: formData.get("Email"),
      Telefonnummer: formData.get("Telefonnummer"),
      message: formData.get(
        "Geben Sie Ihre Anfrage oder Geben Sie Ihre Anfrage oder Nachricht ein. ein."
      ),
    };

    // Button animation
    setIsPressed(true);

    try {
      // Send form data to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Success - show toast and reset form
        const responseData = await response.json();
        console.log("Form submitted successfully:", responseData);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2500);
        form.reset();
      } else {
        // Error - show error message
        const errorData = await response.json();
        const errorMessage =
          errorData.error || errorData.details || "Unbekannter Fehler";
        console.error("Error submitting form:", errorData);
        alert(
          `Fehler beim Senden: ${errorMessage}\n\nBitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt unter info@taj-mahal-poing.de`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut."
      );
    } finally {
      setTimeout(() => setIsPressed(false), 500);
    }
  };

  return (
    <>
      <style jsx global>{`
        a[href^="tel"] {
          text-decoration: none;
          color: inherit;
        }

        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #fffffd inset !important;
          box-shadow: 0 0 0 1000px #fffffd inset !important;
          color: #7e5f40 !important;
        }

        input {
          color: #7e5f40 !important;
        }

        /* Themed hero and form polish */
        .hero-contact {
          position: relative;
          margin: 12px auto 24px;
          max-width: 1400px;
          border-radius: 16px;
          overflow: hidden;
          background: #f5efe6;
          box-shadow: 0 8px 24px rgba(100, 80, 60, 0.12);
          isolation: isolate;
        }

        .hero-contact_media {
          position: relative;
          min-height: 320px;
          background: url("/images/680ce7f65120df33e1a9bf6d-680f7b4ea9cdd39d5ce10ced_Rectangle%202042%20(1).avif")
            center/cover no-repeat;
        }

        .hero-contact_overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.55) 60%,
            rgba(255, 255, 255, 0.94) 100%
          );
        }

        .hero-contact_content {
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
          animation: hcUp 0.5s ease both;
        }

        @keyframes hcUp {
          from {
            transform: translateY(12px);
            opacity: 0.65;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .hero-contact_title {
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-contact_sub {
          color: #6f6a63;
        }

        .hero-contact_actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .hero-contact_logo {
          width: 56px;
          height: auto;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.12));
        }

        .btn-brown {
          background: #614124;
          color: #fff;
          border: 1px solid #614124;
          border-radius: 10px;
          padding: 10px 14px;
        }

        .btn-brown:hover {
          filter: saturate(1.05) brightness(0.98);
        }

        .btn-ghost {
          background: #fff;
          color: #614124;
          border: 1px solid #d2b48c;
          border-radius: 10px;
          padding: 10px 14px;
        }

        .btn-ghost:hover {
          background: color-mix(in oklab, #d2b48c 18%, #fff);
        }

        /* Form micro-interactions */
        .form-field_wrapper {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .form-field_wrapper:focus-within {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(100, 80, 60, 0.08);
        }

        .text_field {
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .text_field:focus {
          border-color: #ad241a;
          background: #fffefc;
        }

        .counter {
          font-size: 12px;
          color: #6f6a63;
          margin-top: 6px;
        }

        .contact-cta-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 12px;
        }

        /* Form layout/spacing */
        .form-fields_wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        @media (min-width: 768px) {
          .form-fields_wrapper {
            grid-template-columns: 1fr 1fr;
          }

          #w-node-_38aec402-977c-5f66-cfa8-6a5ab71b4988-e1d74b1f {
            grid-column: 1 / -1;
          }
        }

        .form-top {
          margin-bottom: 16px;
        }

        .form-field_wrapper p {
          margin: 0 0 6px;
          color: #614124;
          font-weight: 600;
        }

        .text_field.is-area {
          min-height: 140px;
        }

        .button.is-pink.is-form {
          background: linear-gradient(135deg, #c97d60 0%, #d4a574 100%);
          border: 2px solid #c97d60;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #ffffff !important;
          padding: 14px 24px;
          font-weight: 600;
          box-shadow: 0 6px 20px rgba(201, 125, 96, 0.3),
            0 0 0 0 rgba(201, 125, 96, 0.15);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .button.is-pink.is-form::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .button.is-pink.is-form:hover {
          background: linear-gradient(135deg, #d18a6f 0%, #deb07f 100%);
          color: #ffffff !important;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 32px rgba(201, 125, 96, 0.4),
            0 0 0 6px rgba(201, 125, 96, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .button.is-pink.is-form:hover::before {
          width: 300px;
          height: 300px;
        }

        .button.is-pink.is-form:active {
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 4px 16px rgba(201, 125, 96, 0.3),
            0 0 0 3px rgba(201, 125, 96, 0.1);
        }

        .button.is-pink.is-form.is-pressed {
          animation: pulse 0.45s ease;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Toast */
        .toast {
          position: fixed;
          left: 50%;
          bottom: 28px;
          transform: translateX(-50%) translateY(16px);
          background: #2e2d2b;
          color: #fff;
          padding: 10px 14px;
          border-radius: 12px;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
          z-index: 99999;
        }

        .toast[aria-hidden="false"] {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* Marquee gallery */
        .marquee {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          background: #faf8f6;
          border: 1px solid rgba(97, 65, 36, 0.15);
          box-shadow: 0 8px 24px rgba(100, 80, 60, 0.08);
        }

        .marquee-track {
          display: flex;
          gap: 16px;
          padding: 16px;
          animation: marquee 24s linear infinite;
        }

        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .marquee-card {
          position: relative;
          flex: 0 0 300px;
          height: 180px;
          border-radius: 12px;
          overflow: hidden;
        }

        .marquee-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .shine:before {
          content: "";
          position: absolute;
          inset: -20%;
          transform: skewX(-20deg);
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.55) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          width: 30%;
          animation: shine 3.5s ease-in-out infinite;
        }

        @keyframes shine {
          0% {
            left: -30%;
          }
          100% {
            left: 130%;
          }
        }

        .w-slider-dot {
          background-color: #f3f1e9;
          width: 100px;
          height: 1px;
          transition: background-color 0.5s ease;
          margin: 0 !important;
          padding: 0 !important;
        }

        .w-slider-dot.w-active {
          background-color: #7e5f40;
          width: 100px;
          height: 1px;
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>

      <TopNavbar />

        <main className="main-wrapper">
          <div className="section_contact">
            <div className="padding-global">
              <div className="container-small">
                <div className="form-wrapper">
                  <div className="form-top">
                    <h1
                      data-w-id="3e33cca4-1570-cc67-ff6c-e91c4b337f83"
                      className="heading-style-h1"
                    >
                      Kontakt
                    </h1>
                    <p data-w-id="74fbb920-44ca-33e4-fe78-2ad8a7d08f83">
                      TAJ MAHAL Restaurant
                      <br />
                      INDIAN SPICE ROUTE GmbH
                      <br />
                      Friedensstraße 9 · 85586 Poing
                      <br />
                      T 08121 98 61 66 · M 0176 228 202 63
                      <br />
                      <br />
                      Montag – Samstag: 11:30 – 14:30, 17:30 – 23:00
                      <br />
                      Sonntag: 11:30 – 23:00
                    </p>
                  </div>
                  <div id="Kontakt" className="form-component w-form">
                    <form
                      id="wf-form-Kontakt"
                      name="wf-form-Kontakt"
                      data-name="Kontakt"
                      method="post"
                      className="form"
                      onSubmit={handleSubmit}
                    >
                      <div
                        data-w-id="f0374cf2-2fbc-ddbd-cfd5-92084386d926"
                        className="form-fields_wrapper"
                      >
                        <div className="form-field_wrapper">
                          <p>Vorname</p>
                          <input
                            className="text_field w-input"
                            maxLength={256}
                            name="Vorname"
                            data-name="Vorname"
                            aria-label="Vorname"
                            placeholder=""
                            type="text"
                            id="Vorname"
                            required
                          />
                        </div>
                        <div className="form-field_wrapper">
                          <p>Nachname</p>
                          <input
                            className="text_field w-input"
                            maxLength={256}
                            name="Nachname"
                            data-name="Nachname"
                            aria-label="Nachname"
                            placeholder=""
                            type="text"
                            id="Nachname"
                            required
                          />
                        </div>
                        <div className="form-field_wrapper">
                          <p>Email</p>
                          <input
                            className="text_field w-input"
                            maxLength={256}
                            name="Email"
                            data-name="Email"
                            aria-label="Email"
                            placeholder=""
                            type="email"
                            id="Email"
                            required
                          />
                        </div>
                        <div className="form-field_wrapper">
                          <p>Telefonnummer</p>
                          <input
                            className="text_field w-input"
                            maxLength={256}
                            name="Telefonnummer"
                            data-name="Telefonnummer"
                            aria-label="Telefonnummer"
                            placeholder=""
                            type="text"
                            id="Telefonnummer"
                            required
                          />
                        </div>
                        <div
                          id="w-node-_38aec402-977c-5f66-cfa8-6a5ab71b4988-e1d74b1f"
                          className="form-field_wrapper"
                        >
                          <p>
                            Geben Sie Ihre Anfrage oder Geben Sie Ihre Anfrage
                            oder Nachricht ein. ein.
                          </p>
                          <textarea
                            className="text_field is-area w-input"
                            maxLength={5000}
                            name="Geben Sie Ihre Anfrage oder Geben Sie Ihre Anfrage oder Nachricht ein. ein."
                            data-name="Geben Sie Ihre Anfrage oder Geben Sie Ihre Anfrage oder Nachricht ein. ein."
                            aria-label="Geben Sie Ihre Anfrage oder Geben Sie Ihre Anfrage oder Nachricht ein. ein."
                            placeholder=""
                            id="Geben Sie Ihre Anfrage oder Geben Sie Ihre Anfrage oder Nachricht ein. ein."
                          ></textarea>
                        </div>
                      </div>
                      <input
                        type="submit"
                        data-wait=""
                        data-w-id="98c350da-b04f-16ac-8251-9c4910400d93"
                        className={`button is-pink is-form w-button ${
                          isPressed ? "is-pressed" : ""
                        }`}
                        value="senden"
                      />
                    </form>
                    <div className="success_message w-form-done">
                      <div>
                        Thank you! Your submission has been received! .. You
                        will soon get a response <br />
                        Vielen Dank! Ihre Anfrage ist eingegangen! Sie erhalten
                        in Kürze eine Antwort.
                      </div>
                    </div>
                    <div className="w-form-fail">
                      <div>
                        Oops! Something went wrong while submitting the form.
                        <br />
                        Hoppla! Beim Absenden des Formulars ist ein Fehler
                        aufgetreten.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="padding-global">
            <div className="container-large">
              <div className="marquee" aria-label="Galerie">
                <div className="marquee-track">
                  <div className="marquee-card shine">
                    <Image src="/images/INT.png" alt="Interior 1" width={300} height={180} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="marquee-card shine">
                    <img
                      src="https://media.timeout.com/images/106116502/750/562/image.jpg"
                      alt="Interior 2"
                    />
                  </div>
                  <div className="marquee-card shine">
                    <Image
                      src="/images/680ce7f65120df33e1a9bf6d-683dfa69574fa7baf536c3ee_Italian-shot-glockenbach.avif"
                      alt="Interior 3"
                      width={300}
                      height={180}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="marquee-card shine">
                    <Image
                      src="/images/680ce7f65120df33e1a9bf6d-683dfa77511d9e5f860dee01_Italian-shot-maxvorstadt.avif"
                      alt="Interior 4"
                      width={300}
                      height={180}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="marquee-card shine">
                    <Image
                      src="/images/680ce7f65120df33e1a9bf6d-6810e072a0bf621ba2bf2666_Gigi-slider-01.avif"
                      alt="Interior 5"
                      width={300}
                      height={180}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="marquee-card shine">
                    <Image
                      src="/images/680ce7f65120df33e1a9bf6d-683dfa69574fa7baf536c3ee_Italian-shot-glockenbach.avif"
                      alt="Interior 3"
                      width={300}
                      height={180}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="marquee-card shine">
                    <Image
                      src="/images/680ce7f65120df33e1a9bf6d-683dfa77511d9e5f860dee01_Italian-shot-maxvorstadt.avif"
                      alt="Interior 4"
                      width={300}
                      height={180}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div
          id="toast"
          className="toast"
          aria-hidden={!toastVisible}
          role="status"
        >
          Nachricht erfolgreich gesendet!
        </div>

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
                        Montag &ndash; Samstag 11:30 &ndash; 14:30, 17:30
                        &ndash; 23:00
                      </p>
                      <p className="paragraph">Sonntag 11:30 &ndash; 23:00</p>
                    </div>
                    <div className="footer-link_wraper"></div>
                  </div>
                </div>
                <div className="footel_line"></div>
                <div className="footer-bottom">
                  <div
                    id="w-node-_735fc156-5166-43a8-5a31-b2ee3c4bc3ed-3c4bc3c0"
                    className="footer-bottom_side"
                  ></div>
                  <div
                    id="w-node-_735fc156-5166-43a8-5a31-b2ee3c4bc3f2-3c4bc3c0"
                    className="footer-bottom_center"
                  ></div>
                  <div
                    id="w-node-_735fc156-5166-43a8-5a31-b2ee3c4bc3fb-3c4bc3c0"
                    className="footer-bottom_side"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </footer>
    </>
  );
}
