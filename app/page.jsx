"use client";

import Script from "next/script";
import Image from "next/image";
import { useEffect, useState } from "react";
import TopNavbar from "../components/TopNavbar";

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/images/high-angle-indian-food-assortment.jpg",
    "/images/high-angle-indian-food-with-sauce.jpg",
    "/images/hs1.jpg",
    "/images/hs2.jpg",
    "/images/hs3.jpg",
    "/images/hs4.jpg",
    "/images/hs5.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // 3 seconds per image

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    // Forbidden words script
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

    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.addEventListener("submit", function (event) {
        const inputFields = form.querySelectorAll("input, textarea");
        for (const field of inputFields) {
          const value = field.value.toLowerCase();
          if (forbiddenWords.some((word) => value.includes(word))) {
            alert("404");
            event.preventDefault();
            return;
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    // Global error handler for script errors
    const handleError = (event) => {
      // Suppress known script errors from external libraries
      if (
        event.error &&
        (event.error.message?.includes("c is not a function") ||
          event.error.message?.includes("is not a function"))
      ) {
        console.warn("Suppressed script error:", event.error.message);
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener("error", handleError, true);

    return () => {
      window.removeEventListener("error", handleError, true);
    };
  }, []);

  useEffect(() => {
    // Modal close script
    const closeBtn = document.querySelector(".modal_close-button");
    const modal = document.querySelector(".modal_component");

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
      });
    }
  }, []);

  useEffect(() => {
    // Ensure hero logo always stays visible over slideshow
    const ensureLogoVisibility = () => {
      const logo = document.querySelector(".hero_logo");
      if (logo) {
        // Force visibility properties
        logo.style.opacity = "1";
        logo.style.visibility = "visible";
        logo.style.display = "block";
        logo.style.zIndex = "9999";
        logo.style.position = "absolute";
      }
    };

    // Run immediately
    ensureLogoVisibility();

    // Set up interval to check and enforce visibility
    const interval = setInterval(ensureLogoVisibility, 100);

    // Also use MutationObserver to watch for style changes
    const logo = document.querySelector(".hero_logo");
    if (logo) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "style"
          ) {
            ensureLogoVisibility();
          }
        });
      });

      observer.observe(logo, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });

      return () => {
        clearInterval(interval);
        observer.disconnect();
      };
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        a[href^="tel"] {
          text-decoration: none;
          color: inherit;
        }

        /* Equal sizing for images at the end of the page - 2x2 grid */
        .photos-wrapper {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          width: 100%;
        }

        .home_photo-wrapper {
          width: 100%;
          position: relative;
          overflow: hidden;
          aspect-ratio: 4 / 3;
        }

        .home_photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        @media (min-width: 768px) {
          .photos-wrapper {
            gap: 1.5rem;
          }
        }

        /* About Section Modern UI */
        .about-section {
          padding: 4rem 0;
          background: linear-gradient(180deg, #faf8f6 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }

        .about-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at 20% 50%,
            rgba(201, 125, 96, 0.05) 0%,
            transparent 50%
          );
          pointer-events: none;
        }

        .about-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          position: relative;
          z-index: 1;
        }

        .about-image-wrapper {
          width: 100%;
          height: 100%;
          min-height: 400px;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-image-wrapper:hover {
          transform: translateY(-5px);
        }

        .about-image-wrapper::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(201, 125, 96, 0.1) 0%,
            rgba(212, 165, 116, 0.05) 100%
          );
          pointer-events: none;
        }

        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* About Section Slideshow */
        .about-slideshow-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 16px;
        }

        .about-slideshow-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(1.05);
        }

        .about-slideshow-slide.active {
          opacity: 1;
          z-index: 1;
          transform: scale(1);
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1),
            transform 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-slideshow-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .about-content {
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .about-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #2c2418;
          margin-bottom: 2rem;
          line-height: 1.3;
          letter-spacing: -0.02em;
          position: relative;
          padding-bottom: 1.25rem;
          text-align: left;
        }

        .about-title::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(135deg, #c97d60 0%, #d4a574 100%);
          border-radius: 2px;
        }

        .about-text {
          font-size: clamp(1rem, 1.5vw, 1.125rem);
          line-height: 1.85;
          color: #4a4238;
          margin-bottom: 1.5rem;
          text-align: justify;
          text-align-last: left;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
          max-width: 100%;
          padding: 0;
        }

        .about-text:last-child {
          margin-bottom: 0;
        }

        @media (min-width: 768px) {
          .about-section {
            padding: 6rem 0;
          }

          .about-wrapper {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }

          .about-image-wrapper {
            min-height: 500px;
          }

          .about-content {
            padding: 1.5rem 0;
          }

          .about-text {
            line-height: 1.9;
            margin-bottom: 1.75rem;
          }
        }

        @media (min-width: 992px) {
          .about-section {
            padding: 8rem 0;
          }

          .about-wrapper {
            gap: 5rem;
          }

          .about-image-wrapper {
            min-height: 600px;
          }
        }

        @media (max-width: 767px) {
          .about-section {
            padding: 3rem 0;
          }

          .about-text {
            font-size: 1rem;
            line-height: 1.8;
            margin-bottom: 1.5rem;
            text-align: justify;
            text-align-last: left;
          }

          .about-title {
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
          }

          .about-content {
            padding: 1.5rem 0;
          }
        }

        /* Center alignment for Information section */
        #w-node-a400f8da-4024-5047-9427-04f591cfb66b-e1a9bfcc
          .home_menu-item_top {
          text-align: center;
        }

        #w-node-a400f8da-4024-5047-9427-04f591cfb66b-e1a9bfcc
          .home_menu-item_top
          .text-font-garamond {
          text-align: center;
        }

        #w-node-a400f8da-4024-5047-9427-04f591cfb66b-e1a9bfcc .div-block-5 {
          text-align: center;
        }

        #w-node-a400f8da-4024-5047-9427-04f591cfb66b-e1a9bfcc .text-size-small {
          text-align: center;
        }

        #w-node-a400f8da-4024-5047-9427-04f591cfb66b-e1a9bfcc .button {
          display: block;
          margin: 1.5rem auto 0;
          text-align: center;
        }

        /* Shine effect for images */
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }

          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        /* Shine effect for hero images */
        .home_hero-image {
          position: relative;
          overflow: hidden;
        }

        .home_hero-image::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
          animation: shine 3s infinite;
          pointer-events: none;
          z-index: 1;
        }

        /* Shine effect for about section image */
        .about-image-wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 100%
          );
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
          animation: shine 4s infinite;
          pointer-events: none;
          z-index: 2;
        }

        /* Shine effect for gallery photos */
        .home_photo-wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.35) 50%,
            transparent 100%
          );
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
          animation: shine 5s infinite;
          pointer-events: none;
          z-index: 1;
        }

        /* Center hero logo in hero section */
        .section_home-hero {
          position: relative;
        }

        .home_component {
          position: relative;
        }

        /* Ensure slideshow elements don't cover the logo */
        .home_slider,
        .home_slider-mask,
        .home_hero-wrapper,
        .home_hero-image,
        .w-slider,
        .w-slider-mask,
        .w-slide {
          z-index: 1;
        }

        /* Shine effect for hero logo */
        .hero_logo {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          z-index: 9999 !important;
          overflow: visible !important;
          pointer-events: none !important;
          max-width: 400px;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        .hero_logo::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.5) 50%,
            transparent 100%
          );
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
          animation: shine 6s infinite;
          pointer-events: none;
          z-index: 1;
        }

        /* Hover effect - faster shine on hover */
        .home_hero-image:hover::before,
        .about-image-wrapper:hover::before,
        .home_photo-wrapper:hover::before,
        .hero_logo:hover::before {
          animation: shine 1.5s infinite;
        }

        /* Make text look crisper and more legible in all browsers */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        /* Focus state style for keyboard navigation for the focusable elements */
        *[tabindex]:focus-visible,
        input[type="file"]:focus-visible {
          outline: 0.125rem solid #4d65ff;
          outline-offset: 0.125rem;
        }

        /* Set color style to inherit */
        .inherit-color * {
          color: inherit;
        }

        /* Get rid of top margin on first element in any rich text element */
        .w-richtext > :not(div):first-child,
        .w-richtext > div:first-child > :first-child {
          margin-top: 0 !important;
        }

        /* Get rid of bottom margin on last element in any rich text element */
        .w-richtext > :last-child,
        .w-richtext ol li:last-child,
        .w-richtext ul li:last-child {
          margin-bottom: 0 !important;
        }

        /* Make sure containers never lose their center alignment */
        .container-medium,
        .container-small,
        .container-large {
          margin-right: auto !important;
          margin-left: auto !important;
        }

        /* Apply "..." after 3 lines of text */
        .text-style-3lines {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        /* Apply "..." after 2 lines of text */
        .text-style-2lines {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        /* These classes are never overwritten */
        .hide {
          display: none !important;
        }

        @media screen and (max-width: 991px) {
          .hide,
          .hide-tablet {
            display: none !important;
          }
        }

        @media screen and (max-width: 767px) {
          .hide-mobile-landscape {
            display: none !important;
          }
        }

        @media screen and (max-width: 479px) {
          .hide-mobile {
            display: none !important;
          }
        }

        .margin-0 {
          margin: 0rem !important;
        }

        .padding-0 {
          padding: 0rem !important;
        }

        .spacing-clean {
          padding: 0rem !important;
          margin: 0rem !important;
        }

        .margin-top {
          margin-right: 0rem !important;
          margin-bottom: 0rem !important;
          margin-left: 0rem !important;
        }

        .padding-top {
          padding-right: 0rem !important;
          padding-bottom: 0rem !important;
          padding-left: 0rem !important;
        }

        .margin-right {
          margin-top: 0rem !important;
          margin-bottom: 0rem !important;
          margin-left: 0rem !important;
        }

        .padding-right {
          padding-top: 0rem !important;
          padding-bottom: 0rem !important;
          padding-left: 0rem !important;
        }

        .margin-bottom {
          margin-top: 0rem !important;
          margin-right: 0rem !important;
          margin-left: 0rem !important;
        }

        .padding-bottom {
          padding-top: 0rem !important;
          padding-right: 0rem !important;
          padding-left: 0rem !important;
        }

        .margin-left {
          margin-top: 0rem !important;
          margin-right: 0rem !important;
          margin-bottom: 0rem !important;
        }

        .padding-left {
          padding-top: 0rem !important;
          padding-right: 0rem !important;
          padding-bottom: 0rem !important;
        }

        .margin-horizontal {
          margin-top: 0rem !important;
          margin-bottom: 0rem !important;
        }

        .padding-horizontal {
          padding-top: 0rem !important;
          padding-bottom: 0rem !important;
        }

        .margin-vertical {
          margin-right: 0rem !important;
          margin-left: 0rem !important;
        }

        .padding-vertical {
          padding-right: 0rem !important;
          padding-left: 0rem !important;
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

        .shine:hover:before {
          animation: shine 1s ease-in-out infinite;
        }

        @keyframes shine {
          0% {
            left: -30%;
          }
          100% {
            left: 130%;
          }
        }
      `}</style>

      <TopNavbar />

      <main className="main-wrapper">
        <header className="section_home-hero">
          <div className="home_component">
            <div
              data-delay="4000"
              data-animation="fade"
              className="home_slider w-slider"
              data-autoplay="true"
              data-easing="ease"
              data-hide-arrows="true"
              data-disable-swipe="false"
              data-w-id="b812ad33-981e-9c2f-3a5e-249486af3698"
              data-autoplay-limit="0"
              data-nav-spacing="3"
              data-duration="1111"
              data-infinite="true"
            >
              <div className="home_slider-mask w-slider-mask">
                <div className="home_hero-wrapper w-slide">
                  <Image
                    src="/images/hh1.jpg"
                    priority
                    fill
                    style={{
                      objectFit: "cover",
                      transform:
                        "translate3d(0, 0, 0) scale3d(1.05, 1.05, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    }}
                    sizes="100vw"
                    alt="Heller, stilvoll eingerichteter Gastraum des Restaurant Taj Mahal in Poing mit warmem Ambiente und traditionellen indischen Designelementen – authentisches Flair in modernem Ambiente."
                    className="home_hero-image"
                  />
                </div>
                <div className="home_hero-wrapper w-slide">
                  <Image
                    src="/images/hh2.jpg"
                    priority
                    fill
                    style={{
                      objectFit: "cover",
                      transform:
                        "translate3d(0, 0, 0) scale3d(1.05, 1.05, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    }}
                    sizes="100vw"
                    alt="Stilvoller Gastraum des Restaurant Taj Mahal in Poing mit dekorativen Elementen, gemütlichen Sitzplätzen und authentischer indischer Atmosphäre – ideal für traditionelle Gerichte und Familienessen."
                    className="home_hero-image"
                  />
                </div>
                <div className="home_hero-wrapper w-slide">
                  <Image
                    src="/images/hh3.jpg"
                    priority
                    fill
                    style={{
                      objectFit: "cover",
                      transform:
                        "translate3d(0, 0, 0) scale3d(1.05, 1.05, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    }}
                    sizes="100vw"
                    alt="Stilvoller Gastraum im Restaurant Taj Mahal in Poing mit warmem Licht und eleganter Atmosphäre für private Dinner und Familienfeiern."
                    className="home_hero-image"
                  />
                </div>
              </div>
              <div className="home_slider-arrow w-slider-arrow-left"></div>
              <div className="home_slider-arrow w-slider-arrow-right"></div>
              <div className="home_slider-nav w-slider-nav"></div>
            </div>
            <Image
              src="/images/tajmahalhome.png"
              priority
              width={400}
              height={200}
              style={{
                opacity: 1,
                visibility: "visible",
                display: "block",
                zIndex: 9999,
              }}
              data-w-id="2827754f-19e0-2175-338b-d6606d126e80"
              alt="Taj Mahal Logo"
              className="hero_logo"
            />
          </div>
          <div className="padding-global _100">
            <h1 className="hide">
              Restaurant Taj Mahal Poing – Authentische indische Küche
            </h1>
          </div>
        </header>

        {/* About Section */}
        <section className="about-section">
          <div className="padding-global">
            <div className="container-large">
              <div className="about-wrapper">
                <div className="about-image-wrapper">
                  <div className="about-slideshow-container">
                    {slides.map((slide, index) => (
                      <div
                        key={index}
                        className={`about-slideshow-slide ${
                          index === currentSlide ? "active" : ""
                        }`}
                      >
                        <Image
                          src={slide}
                          alt="Restaurant Taj Mahal Poing - Authentische indische Küche"
                          className="about-image"
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: "cover" }}
                          priority={index === 0}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="about-content">
                  <h2 className="about-title">Über das Restaurant Taj Mahal</h2>
                  <p className="about-text">
                    Willkommen im Restaurant Taj Mahal, wo wir Ihnen den
                    authentischen Geschmack Indiens näherbringen – eine
                    kulinarische Reise durch die reichen Traditionen der
                    Großmogul-Küche.
                  </p>
                  <p className="about-text">
                    Unsere Gerichte werden aus den feinsten und frischesten
                    Zutaten zubereitet, mit einer harmonischen Mischung aus
                    aromatischen Gewürzen und Kräutern, die nicht nur für ihren
                    Geschmack, sondern auch für ihre gesundheitlichen Vorteile
                    geschätzt werden. Von Chili, das reich an Vitamin C ist, bis
                    hin zu Ingwer und Pfeffer, die die Verdauung fördern – jedes
                    Element in unserer Küche dient dem Wohlbefinden und dem
                    Genuss zugleich.
                  </p>
                  <p className="about-text">
                    Im Taj Mahal glauben wir, dass Essen mehr ist als nur eine
                    Mahlzeit – es ist ein Erlebnis. Unsere Köche verwenden
                    traditionelle Kochtechniken, darunter den berühmten Tandoor,
                    einen Lehmofen, der unseren Broten und Fleischgerichten ihr
                    einzigartiges, rauchiges Aroma verleiht.
                  </p>
                  <p className="about-text">
                    Jedes Gericht ist ein Zusammenspiel von Farben, Aromen und
                    Texturen – mit Leidenschaft und Sorgfalt zubereitet, damit
                    jeder Gast unser Restaurant zufrieden und mit einem Lächeln
                    verlässt.
                  </p>
                  <p className="about-text">
                    Wir freuen uns darauf, Sie bei uns begrüßen zu dürfen – und
                    hoffen, dass Sie unser Restaurant als Freund verlassen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          data-w-id="9a1de53a-6d1e-efba-fac2-c4a90a26648b"
          className="section_home-2"
        >
          <div className="padding-global">
            <div className="home_menu-wrapper">
              <div className="home_menu-component">
                {/* INFORMATION */}
                <div
                  id="w-node-a400f8da-4024-5047-9427-04f591cfb66b-e1a9bfcc"
                  data-w-id="a400f8da-4024-5047-9427-04f591cfb66b"
                  style={{
                    transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)",
                    opacity: 1,
                  }}
                  className="home_menu-item"
                >
                  <div className="home_menu-item_top">
                    <p className="text-font-garamond text-size-medium">
                      Informationen
                    </p>
                    <div className="div-block-5">
                      <p className="text-size-small">
                        Taj Mahal – Indisches Restaurant Poing
                        <br />
                        Friedensstraße 9, 85586 Poing
                        <br />
                        <br />
                        +49 (0) 8121986166
                        <br />
                        <a href="mailto:info@taj-mahal-poing.de">
                          info@taj-mahal-poing.de
                        </a>
                      </p>
                    </div>
                  </div>
                  <a href="/impression" className="button">
                    Impressionen
                  </a>
                </div>

                {/* OPENING HOURS */}
                <div
                  id="w-node-_16867b54-af5a-ffa2-dd58-8815c8ab6c5a-e1a9bfcc"
                  data-w-id="16867b54-af5a-ffa2-dd58-8815c8ab6c5a"
                  style={{
                    transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)",
                    opacity: 1,
                  }}
                  className="home_menu-item"
                >
                  <div className="home_menu-item_top">
                    <p className="text-font-garamond text-size-medium">
                      Öffnungszeiten
                    </p>
                    <div className="div-block-5">
                      <p className="text-size-small">
                        Montag – Samstag:
                        <br />
                        11:30 – 14:30 Uhr
                        <br />
                        17:30 – 23:00 Uhr
                        <br />
                        <br />
                        Sonntag:
                        <br />
                        11:30 – 23:00 Uhr
                      </p>
                    </div>
                  </div>
                  <a href="/kontakt" className="button">
                    Reservierung / Anruf
                  </a>
                </div>

                {/* OUR MENU */}
                <div
                  id="w-node-_60e58ec2-23b6-c568-dbfc-f705f9a433b2-e1a9bfcc"
                  data-w-id="60e58ec2-23b6-c568-dbfc-f705f9a433b2"
                  style={{
                    transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)",
                    opacity: 1,
                  }}
                  className="home_menu-item"
                >
                  <div className="home_menu-item_top">
                    <p className="text-font-garamond text-size-medium">
                      Unser Menü
                    </p>
                    <div className="div-block-5">
                      <p className="text-size-small">
                        Entdecken Sie nordindische & Tandoori-Klassiker, frische
                        Currys und Köche-Specials – authentischer Geschmack
                        direkt in Poing.
                      </p>
                    </div>
                  </div>
                  <a href="/menu" className="button">
                    Menü
                  </a>
                </div>

                {/* IMAGE 1 (keep for design) */}
                <Image
                  src="/images/inthali.png"
                  loading="lazy"
                  data-w-id="18dd8d7e-0c98-ac3c-d969-9a035947a090"
                  alt="Decorative element"
                  className="home_image-plate"
                  width={300}
                  height={300}
                  style={{
                    transform:
                      "translate3d(0.076%, -0.076%, 0px) rotateZ(57.5deg)",
                    willChange: "transform",
                  }}
                />

                {/* EVENTS / CATERING */}
                <div
                  id="w-node-b0e283db-38d5-b3e2-8b55-c4804c97f287-e1a9bfcc"
                  data-w-id="b0e283db-38d5-b3e2-8b55-c4804c97f287"
                  style={{
                    transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)",
                    opacity: 1,
                  }}
                  className="home_menu-item"
                >
                  <div className="home_menu-item_top">
                    <p className="text-font-garamond text-size-medium">
                      Events & Catering
                    </p>
                    <div className="div-block-5">
                      <p className="text-size-small">
                        Ausrichten Sie Familienessen, Feiern oder Geschäftsessen
                        – wir bereiten indische Menüs mit Liebe zum Detail zu.
                      </p>
                    </div>
                  </div>
                  <a href="/events" className="button">
                    Räumlichkeiten
                  </a>
                </div>

                {/* CAREER / JOIN US */}
                <div
                  id="w-node-d4ebcebe-f07f-13a9-f9a1-c77c36adb4ee-e1a9bfcc"
                  data-w-id="d4ebcebe-f07f-13a9-f9a1-c77c36adb4ee"
                  style={{
                    transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)",
                    opacity: 1,
                  }}
                  className="home_menu-item"
                >
                  <div className="home_menu-item_top">
                    <p className="text-font-garamond text-size-medium">
                      Karriere
                    </p>
                    <div className="div-block-5">
                      <p className="text-size-small">
                        Leidenschaft für indische Küche und freundlichen Service
                        in Poing? Schreiben Sie uns an{" "}
                        <a href="mailto:info@taj-mahal-poing.de">
                          info@taj-mahal-poing.de
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                  <div className="div-block-6">
                    <a href="/karriere" className="button">
                      Bewerben
                    </a>
                  </div>
                </div>

                {/* IMAGE 2 (keep decorative asset so layout stays same) */}
                <Image
                  src="/images/mangolassi.png"
                  loading="lazy"
                  alt="Decorative element"
                  className="home_image-glass"
                  width={200}
                  height={300}
                  style={{ willChange: "transform" }}
                />
              </div>

              {/* Lemon / branch image, keep to preserve floating elements */}
              <Image
                src="/images/samosa.png"
                loading="lazy"
                alt="Decorative branch"
                className="home_image-branch"
                width={250}
                height={250}
                style={{ willChange: "transform" }}
              />
            </div>
          </div>
        </section>

        <div className="padding-global">
          <div className="container-large">
            <div className="marquee" aria-label="Galerie">
              <div className="marquee-track">
                <div className="marquee-card shine">
                  <Image src="/images/hs1.jpg" alt="Interior 1" fill sizes="300px" style={{ objectFit: "cover" }} />
                </div>
                <div className="marquee-card shine">
                  <Image src="/images/hs2.jpg" alt="Interior 2" fill sizes="300px" style={{ objectFit: "cover" }} />
                </div>

                <div className="marquee-card shine">
                  <Image src="/images/hs4.jpg" alt="Interior 4" fill sizes="300px" style={{ objectFit: "cover" }} />
                </div>
                <div className="marquee-card shine">
                  <Image src="/images/hh.png" alt="Interior 3" fill sizes="300px" style={{ objectFit: "cover" }} />
                </div>
                <div className="marquee-card shine">
                  <Image src="/images/hs5.jpg" alt="Interior 5" fill sizes="300px" style={{ objectFit: "cover" }} />
                </div>
                <div className="marquee-card shine">
                  <Image src="/images/hs6.jpg" alt="Interior 3" fill sizes="300px" style={{ objectFit: "cover" }} />
                </div>
                <div className="marquee-card shine">
                  <Image src="/images/hs7.jpg" alt="Interior 4" fill sizes="300px" style={{ objectFit: "cover" }} />
                </div>
              </div>
            </div>
          </div>
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
                        Montag&nbsp;–&nbsp;Samstag&nbsp;11:30&nbsp;–&nbsp;14:30,&nbsp;17:30&nbsp;–&nbsp;23:00
                      </p>
                      <p className="paragraph">
                        Sonntag&nbsp;11:30&nbsp;–&nbsp;23:00
                      </p>
                      <p className="paragraph" style={{ marginTop: "0.5rem" }}>
                        Verfügbar auf: Uber Eats, Lieferando, Food Amigo, Bolt
                      </p>
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
      </main>

      <div className="w-dyn-list">
        <div role="list" className="w-dyn-items">
          <div role="listitem" className="w-dyn-item"></div>
        </div>
      </div>
      <div className="filter"></div>

      {/* External scripts */}
      <Script
        src="/js/js-jquery-3.5.1.min.dc5e7f18c8.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => {
          const scripts = [
            "/js/js-gigi-2025.schunk.36b8fb49256177c8.js",
            "/js/js-gigi-2025.schunk.1176fe8c62e4f594.js",
            "/js/js-gigi-2025.schunk.61b534daaaeddbc7.js",
            "/js/js-gigi-2025.786f41e7.0091cb714b9c1fb6.js",
          ];
          let i = 0;
          function loadNext() {
            if (i >= scripts.length) return;
            const s = document.createElement("script");
            s.src = scripts[i];
            s.onload = () => { i++; loadNext(); };
            s.onerror = () => { i++; loadNext(); };
            document.body.appendChild(s);
          }
          loadNext();
        }}
      />
    </>
  );
}
