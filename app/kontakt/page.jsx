"use client";

import { useState } from "react";
import Image from "next/image";

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

      <div className="page-wrapper">
        <div className="buttons_mobile-wrapper">
          <a href="tel:+498121986166" className="button_mobile is-1 w-button">
            Reservierung
          </a>
          <a
            href="https://maps.app.goo.gl/PFQf45ysWMXU4sPeA?g_st=iwb"
            target="_blank"
            rel="noopener noreferrer"
            className="button_mobile w-button"
          >
            Order to pickup
          </a>
        </div>

        <div
          data-animation="default"
          className="navbar_component w-nav"
          data-easing2="ease"
          fs-scrolldisable-element="smart-nav"
          data-easing="ease"
          data-collapse="all"
          data-w-id="25ee2989-7528-078a-6215-f3ce16ae41a6"
          role="banner"
          data-no-scroll="1"
          data-duration="0"
        >
          <div className="navbar_container">
            <a
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
            </a>
            <div
              id="w-node-_33570b70-7d97-85f9-8fe2-43d3854f29bb-16ae41a6"
              className="nav_link-wrapper"
            >
              <a href="tel:+498121986166" className="button is-yellow w-button">
                Reservierung
              </a>
              <a
                href="https://maps.app.goo.gl/PFQf45ysWMXU4sPeA?g_st=iwb"
                target="_blank"
                rel="noopener noreferrer"
                className="button is-yellow w-button"
              >
                Pickup Order
              </a>
            </div>
            <nav
              role="navigation"
              data-w-id="25ee2989-7528-078a-6215-f3ce16ae41b2"
              className="navbar_menu w-nav-menu"
            >
              <div className="navbar_menu-wrapper">
                <div className="navbar_links-wrapper">
                  <a
                    href="/"
                    data-w-id="25ee2989-7528-078a-6215-f3ce16ae41b5"
                    className="navbar_link w-nav-link"
                  >
                    Home
                  </a>
                  <a
                    href="/menu"
                    data-w-id="25ee2989-7528-078a-6215-f3ce16ae41b7"
                    className="navbar_link w-nav-link"
                  >
                    Menü
                  </a>
                  <a
                    href="/impression"
                    data-w-id="25ee2989-7528-078a-6215-f3ce16ae41b9"
                    className="navbar_link w-nav-link"
                  >
                    Impressionen
                  </a>
                  <a
                    href="/events"
                    data-w-id="b85b4db3-387f-80d2-f8e9-44fb13e1cd9b"
                    className="navbar_link w-nav-link"
                  >
                    Gruppen &amp; Events
                  </a>
                  <a
                    href="/karriere"
                    data-w-id="25ee2989-7528-078a-6215-f3ce16ae41bb"
                    className="navbar_link w-nav-link"
                  >
                    Karriere
                  </a>
                  <a
                    href="/kontakt"
                    data-w-id="25ee2989-7528-078a-6215-f3ce16ae41bd"
                    aria-current="page"
                    className="navbar_link w-nav-link w--current"
                  >
                    Kontakt
                  </a>
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
                  <div className="icon_mob w-embed">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_432_2222)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.681311 9.74124C0.072789 7.96769 -0.182062 6.17853 0.140402 4.58701C0.431661 3.15153 1.18581 1.88767 2.56409 0.946285C2.81894 0.759048 3.06859 0.603016 3.31824 0.467789C3.57829 0.327361 3.84354 0.218139 4.1088 0.124521C4.6393 -0.0523147 5.19061 -0.0367116 5.68471 0.145325C6.17881 0.327361 6.6105 0.665429 6.90696 1.13872L9.36705 5.08111C9.6479 5.5284 9.76753 6.0277 9.73112 6.5166C9.69471 7.0107 9.50748 7.48919 9.17461 7.89488L7.86395 9.46559C7.71312 9.64763 7.6247 9.85567 7.6039 10.0689C7.58309 10.2822 7.6247 10.5058 7.73912 10.7138C8.53488 12.1805 9.68431 13.668 11.0106 14.9891C12.3316 16.3102 13.8191 17.4596 15.2858 18.2605C15.4939 18.3698 15.7175 18.4166 15.9308 18.3958C16.144 18.375 16.352 18.2866 16.5341 18.1357L18.1048 16.8251C18.5105 16.487 18.989 16.2998 19.4831 16.2633C19.972 16.2269 20.4765 16.3466 20.9186 16.6274L24.8609 19.0875C25.3342 19.384 25.6775 19.8157 25.8543 20.3098C26.0312 20.8039 26.052 21.3552 25.8752 21.8857C25.7867 22.1561 25.6723 22.4162 25.5319 22.6814C25.4019 22.9311 25.2406 23.1807 25.0534 23.4356C24.1068 24.8139 22.8429 25.568 21.4127 25.8593C19.8159 26.1817 18.032 25.9269 16.2584 25.3184C13.1014 24.2417 9.74152 21.9169 6.91216 19.0875C4.07759 16.2582 1.75793 12.8983 0.67611 9.74124H0.681311ZM1.39905 4.84187C1.1234 6.18893 1.36265 7.75445 1.89835 9.33036C2.91256 12.295 5.123 15.478 7.82234 18.1825C10.5269 20.8871 13.7099 23.0975 16.6745 24.1065C18.2504 24.6474 19.8107 24.8815 21.163 24.6058C22.2812 24.377 23.2694 23.7893 24.008 22.7074L24.0184 22.6866C24.164 22.489 24.294 22.2862 24.4033 22.0781C24.5073 21.8805 24.5957 21.6828 24.6581 21.4852C24.7413 21.2355 24.7361 20.9755 24.6581 20.7518C24.5749 20.523 24.4189 20.3254 24.1952 20.1849L20.2528 17.7248C20.0396 17.5948 19.8055 17.5376 19.5819 17.5532C19.3582 17.5688 19.1346 17.6572 18.9422 17.8133L17.3715 19.1239C16.9866 19.4464 16.5341 19.6284 16.066 19.6752C15.6031 19.722 15.1194 19.6284 14.6825 19.3892C13.0962 18.5258 11.5099 17.3036 10.1108 15.9045C8.71172 14.5054 7.48427 12.9139 6.6261 11.3328C6.38685 10.8907 6.29323 10.4122 6.34004 9.94929C6.38685 9.48119 6.57409 9.0287 6.89135 8.64383L8.20201 7.07311C8.35805 6.88067 8.45166 6.66223 8.46207 6.43338C8.47767 6.20454 8.42046 5.97049 8.29043 5.76245L5.83034 1.82006C5.68991 1.59642 5.48707 1.43518 5.26343 1.35717C5.03978 1.27395 4.77973 1.26875 4.53008 1.35717C4.33244 1.41958 4.1348 1.508 3.93716 1.61202C3.73432 1.72124 3.53148 1.84607 3.33384 1.99169L3.31304 2.0073C2.23122 2.74585 1.6435 3.73404 1.41466 4.85227L1.39905 4.84187Z"
                          fill="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_432_2222">
                          <rect
                            width="26"
                            height="26"
                            fill="currentColor"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </a>
                <a
                  aria-label="location"
                  href="https://maps.app.goo.gl/PFQf45ysWMXU4sPeA?g_st=iwb"
                  className="mob_link w-inline-block"
                >
                  <div className="icon_mob w-embed">
                    <svg
                      width="24"
                      height="30"
                      viewBox="0 0 24 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_432_2224)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.3678 29.181C10.3315 27.789 8.98689 26.3912 7.59291 24.9354C3.95991 21.1538 0 17.0358 0 11.7868C0 8.6722 1.34464 5.8476 3.51581 3.806C5.68697 1.7644 8.69082 0.5 12.0031 0.5C15.3153 0.5 18.3192 1.7644 20.4904 3.806C22.6615 5.8476 24.0062 8.6722 24.0062 11.7868C24.0062 17.0358 20.0463 21.1596 16.4133 24.9412C15.0131 26.397 13.6623 27.8006 12.6322 29.1984C12.3917 29.5232 11.9167 29.6044 11.5713 29.3782C11.4911 29.326 11.4233 29.2622 11.3739 29.1868L11.3678 29.181ZM8.72166 23.9784C9.89977 25.2022 11.047 26.3912 12.0031 27.5686C12.9591 26.3912 14.1064 25.2022 15.2845 23.9784C18.7263 20.394 22.4765 16.4906 22.4765 11.7868C22.4765 9.0666 21.3045 6.6016 19.4109 4.821C17.5173 3.0404 14.8959 1.9384 12.0031 1.9384C9.11025 1.9384 6.48882 3.0404 4.59522 4.821C2.70162 6.6016 1.52968 9.0666 1.52968 11.7868C1.52968 16.4964 5.27988 20.394 8.72166 23.9784ZM12.0031 8.1386C10.936 8.1386 9.96762 8.5446 9.26446 9.2058C8.56129 9.867 8.12953 10.7776 8.12953 11.781C8.12953 12.7844 8.56129 13.695 9.26446 14.3562C9.96762 15.0174 10.936 15.4234 12.0031 15.4234C13.0702 15.4234 14.0385 15.0174 14.7417 14.3562C15.4449 13.695 15.8766 12.7844 15.8766 11.781C15.8766 10.7776 15.4449 9.867 14.7417 9.2058C14.0385 8.5446 13.0702 8.1386 12.0031 8.1386ZM8.18504 8.1908C7.20432 9.113 6.59984 10.3774 6.59984 11.781C6.59984 13.1846 7.20432 14.4548 8.18504 15.3712C9.16577 16.2934 10.5104 16.8618 12.0031 16.8618C13.4958 16.8618 14.8466 16.2934 15.8211 15.3712C16.8018 14.449 17.4063 13.1846 17.4063 11.781C17.4063 10.3774 16.8018 9.1072 15.8211 8.1908C14.8404 7.2686 13.4958 6.7002 12.0031 6.7002C10.5104 6.7002 9.1596 7.2686 8.18504 8.1908Z"
                          fill="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_432_2224">
                          <rect
                            width="24"
                            height="29"
                            fill="currentColor"
                            transform="translate(0 0.5)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </a>
              </div>
              <div className="navbar_menu-button mobile_link-wrapper w-nav-button">
                <div className="menu-icon">
                  <div className="menu-icon_wrapper">
                    <div
                      data-w-id="25ee2989-7528-078a-6215-f3ce16ae41c4"
                      className="menu-icon_line-top"
                    >
                      <div className="div-block-8"></div>
                    </div>
                    <div
                      data-w-id="25ee2989-7528-078a-6215-f3ce16ae41c5"
                      className="menu-icon_line-bottom"
                    >
                      <div className="div-block-8"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                        href="https://maps.app.goo.gl/PFQf45ysWMXU4sPeA?g_st=iwb"
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
      </div>
    </>
  );
}
