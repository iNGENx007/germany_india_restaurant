"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TopNavbar from "../../components/TopNavbar";

export default function ImpressionPage() {
  const tiltImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const handlersRef = useRef<
    Array<{ mouseMove: (e: MouseEvent) => void; mouseLeave: () => void }>
  >([]);

  useEffect(() => {
    const handleScroll = () => {
      tiltImagesRef.current.forEach((img) => {
        if (!img) return;

        const rect = img.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const scrollProgress =
          (windowHeight / 2 - elementCenter) / windowHeight;

        // Limit tilt to when image is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const tiltX = scrollProgress * 10; // Max 10deg tilt
          const tiltY = scrollProgress * 5; // Max 5deg tilt
          img.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
        }
      });
    };

    const handleMouseMove = (e: MouseEvent, img: HTMLImageElement) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
      const rotateY = ((x - centerX) / centerX) * 10; // Max 10deg

      img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = (img: HTMLImageElement) => {
      img.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Wait for images to be in DOM before adding event listeners
    const setupListeners = () => {
      handlersRef.current = [];
      tiltImagesRef.current.forEach((img, index) => {
        if (!img) return;
        const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e, img);
        const mouseLeaveHandler = () => handleMouseLeave(img);

        handlersRef.current[index] = {
          mouseMove: mouseMoveHandler,
          mouseLeave: mouseLeaveHandler,
        };
        img.addEventListener("mousemove", mouseMoveHandler);
        img.addEventListener("mouseleave", mouseLeaveHandler);
      });
      handleScroll(); // Initial call after setup
    };

    // Use setTimeout to ensure DOM is ready
    setTimeout(setupListeners, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      tiltImagesRef.current.forEach((img, index) => {
        if (!img || !handlersRef.current[index]) return;
        const handlers = handlersRef.current[index];
        img.removeEventListener("mousemove", handlers.mouseMove);
        img.removeEventListener("mouseleave", handlers.mouseLeave);
      });
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        a[href^="tel"] {
          text-decoration: none;
          color: inherit;
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

        /* Tilt effect for specific images */
        .tilt-image {
          transition: transform 0.3s ease-out;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .tilt-image:hover {
          transition: transform 0.1s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .tilt-image {
            transition: none;
          }
        }

        /* Cocktail image animations */
        @keyframes cocktailFloat {
          0%,
          100% {
            transform: translate3d(0px, 1.2034%, 0px)
              scale3d(0.956017, 0.956017, 1) rotateZ(26.017deg);
          }
          50% {
            transform: translate3d(0px, calc(1.2034% - 20px), 0px)
              scale3d(0.956017, 0.956017, 1) rotateZ(calc(26.017deg + 5deg));
          }
        }

        @keyframes cocktailGlow {
          0%,
          100% {
            filter: drop-shadow(0 0 15px rgba(100, 150, 255, 0.4)) brightness(1);
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(100, 150, 255, 0.8))
              brightness(1.1);
          }
        }

        @keyframes cocktailRotate {
          0% {
            transform: translate3d(0px, 1.2034%, 0px)
              scale3d(0.956017, 0.956017, 1) rotateZ(26.017deg);
          }
          25% {
            transform: translate3d(0px, 1.2034%, 0px)
              scale3d(0.956017, 0.956017, 1) rotateZ(calc(26.017deg + 3deg));
          }
          75% {
            transform: translate3d(0px, 1.2034%, 0px)
              scale3d(0.956017, 0.956017, 1) rotateZ(calc(26.017deg - 3deg));
          }
          100% {
            transform: translate3d(0px, 1.2034%, 0px)
              scale3d(0.956017, 0.956017, 1) rotateZ(26.017deg);
          }
        }

        .impressionen_image-glass {
          opacity: 1;
          will-change: transform;
          transform: translate3d(0px, 1.2034%, 0px)
            scale3d(0.956017, 0.956017, 1) rotateX(0deg) rotateY(0deg)
            rotateZ(26.017deg) skew(0deg, 0deg);
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            filter 0.4s ease;
          animation: cocktailFloat 4s ease-in-out infinite,
            cocktailGlow 3s ease-in-out infinite,
            cocktailRotate 6s ease-in-out infinite;
        }

        .impressionen_image-glass:hover {
          animation: cocktailFloat 2s ease-in-out infinite,
            cocktailGlow 1.5s ease-in-out infinite,
            cocktailRotate 3s ease-in-out infinite;
          transform: translate3d(0px, 1.2034%, 0px) scale3d(1.05, 1.05, 1)
            rotateX(5deg) rotateY(5deg) rotateZ(26.017deg) skew(0deg, 0deg);
          filter: drop-shadow(0 0 35px rgba(100, 150, 255, 0.9))
            brightness(1.15);
        }

        @media (prefers-reduced-motion: reduce) {
          .impressionen_image-glass {
            animation: none;
          }
        }
      `}</style>

      <TopNavbar />


        <main className="main-wrapper">
          <section className="section_impressionen-1">
            <div className="padding-global">
              <div className="container-medium">
                <div className="hero-wrapper">
                  <div className="hero-top is-padding">
                    <h1
                      data-w-id="9291d96c-5c15-29e4-4bb3-0f27fd237c4e"
                      className="heading-style-h1"
                    >
                      Authentischer <br />
                      Indischer Genuss
                    </h1>
                    <p data-w-id="57a303f6-6aa9-4224-8d94-06f613ef73d3">
                      Lassen Sie sich von der Magie Indiens verzaubern. Unsere
                      Leidenschaft für authentische Gewürze und traditionelle
                      Zubereitung im Tandoor-Ofen verspricht ein unvergessliches
                      Erlebnis. In unserem Restaurant trifft herzliche indische Gastfreundschaft auf moderne Eleganz – eine perfekte Bühne für Ihre Sinne. <br />
                    </p>
                    <img
                      ref={(el) => {
                        tiltImagesRef.current[0] = el;
                      }}
                      src="/images/food.png"
                      loading="lazy"
                      style={{
                        WebkitTransform:
                          "translate3d(50%, 0, 0) scale3d(0.8, 0.8, 1) rotateX(0) rotateY(0) rotateZ(-30deg) skew(0, 0)",
                        MozTransform:
                          "translate3d(50%, 0, 0) scale3d(0.8, 0.8, 1) rotateX(0) rotateY(0) rotateZ(-30deg) skew(0, 0)",
                        msTransform:
                          "translate3d(50%, 0, 0) scale3d(0.8, 0.8, 1) rotateX(0) rotateY(0) rotateZ(-30deg) skew(0, 0)",
                        transform:
                          "translate3d(50%, 0, 0) scale3d(0.8, 0.8, 1) rotateX(0) rotateY(0) rotateZ(-30deg) skew(0, 0)",
                      }}
                      data-w-id="8d9705d0-c666-fb68-4ea9-9b263900c97e"
                      alt="Illustration eines Zitronenzweigs mit reifer gelber Zitrusfrucht, grünen Blättern und weißen Blüten – botanisches Element im Vintage-Stil."
                      className="impressionen_image-branch tilt-image"
                    />
                  </div>
                  <div className="hero-bottom">
                    <div
                      data-w-id="890d5c10-4a11-ff0b-d67a-8eac38b2cb02"
                      style={{ opacity: 1 }}
                      className="image_parallax-wrapper"
                    >
                      <Image
                        src="/images/event1image.png"
                        loading="lazy"
                        sizes="(max-width: 1112px) 100vw, 1112px"
                        alt="Heller, stilvoll eingerichteter Gastraum des Restaurant Taj Mahal in Poing mit großen Fensterfronten, komfortabler Einrichtung und indischem Flair in modernem Ambiente."
                        className="image_parallax is-390400"
                        width={1112}
                        height={600}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            data-w-id="71d4d094-209d-2234-7c0f-91c71429fa39"
            className="section_impressionen-2"
          >
            <div className="padding-global">
              <div className="container-large">
                <div className="impressionen_images-component">
                  <div className="impressionen_images-left">
                    <Image
                      className="impressionen_image-1"
                      src="/images/event2image.png"
                      alt="Indische Festtafel mit vielfältigen Gerichten wie Currys, Tandoori-Spezialitäten, Naan-Brot und Antipasti auf bunten Keramiktellern – stilvoll angerichtet im Restaurant Taj Mahal."
                      style={{ opacity: 1 }}
                      sizes="(max-width: 1310px) 100vw, 1310px"
                      data-w-id="71d4d094-209d-2234-7c0f-91c71429fa3e"
                      loading="lazy"
                      width={1310}
                      height={800}
                    />
                    <Image
                      src="/images/event4image.png"
                      loading="lazy"
                      style={{ opacity: 1 }}
                      data-w-id="71d4d094-209d-2234-7c0f-91c71429fa3f"
                      alt="Nahaufnahme eines erfrischenden Getränks im Restaurant Taj Mahal – stilvolle Getränkeszene."
                      className="impressionen_image-3"
                      width={600}
                      height={800}
                    />
                  </div>
                  <div className="impressionen_image-right">
                    <Image
                      className="impressionen_image-2"
                      src="/images/event3image.png"
                      alt="Stimmungsvolle Gesamtaufnahme des Restaurant Taj Mahal in Poing mit eleganter Einrichtung und stilvoller Lichtinszenierung – indisches Flair auf zwei Ebenen."
                      style={{ opacity: 1 }}
                      sizes="(max-width: 804px) 100vw, 804px"
                      data-w-id="71d4d094-209d-2234-7c0f-91c71429fa41"
                      loading="lazy"
                      width={804}
                      height={600}
                    />
                    <img
                      ref={(el) => {
                        tiltImagesRef.current[1] = el;
                      }}
                      src="https://cdn.prod.website-files.com/6867d9c22b0a14fbc654f1cd/6867e8fa7a3f3cd0890c9c34_Gruppe%20739.svg"
                      loading="lazy"
                      style={{ opacity: 0.8 }}
                      data-w-id="e08ab556-23ce-c61a-29c6-9017348f5dac"
                      alt="Illustration einer fröhlichen Comicfigur mit Spaghetti und Schriftzug ‚Dolce Far Niente' – verspieltes GIGI-Motiv im Retro-Stil."
                      className="impressionen_image-4 tilt-image"
                    />
                  </div>
                </div>
                <div className="impressionen_images-component is-mob">
                  <div className="impressionen_images-left">
                    <Image
                      src="/images/680ce7f65120df33e1a9bf6d-680d1573113d0ea65d57d5e4_Rechteck%201794.avif"
                      loading="lazy"
                      id="w-node-_13fffa71-8327-4baf-ce42-c4b09dfb8a13-f9fcf116"
                      sizes="(max-width: 1310px) 100vw, 1310px"
                      alt="Indische Festtafel mit vielfältigen Gerichten wie Currys, Tandoori-Spezialitäten, Naan-Brot und Antipasti auf bunten Keramiktellern – stilvoll angerichtet im Restaurant Taj Mahal."
                      className="impressionen_image-1"
                      width={1310}
                      height={800}
                    />
                    <img
                      ref={(el) => {
                        tiltImagesRef.current[2] = el;
                      }}
                      src="/images/cocktail.png"
                      loading="lazy"
                      data-w-id="13fffa71-8327-4baf-ce42-c4b09dfb8a17"
                      id="w-node-_13fffa71-8327-4baf-ce42-c4b09dfb8a17-f9fcf116"
                      alt="blue cocktail"
                      className="impressionen_image-4 tilt-image"
                    />
                    <Image
                      src="/images/680ce7f65120df33e1a9bf6d-680d15733e86477a69ea6293_Rechteck%201803.avif"
                      loading="lazy"
                      id="w-node-_13fffa71-8327-4baf-ce42-c4b09dfb8a14-f9fcf116"
                      alt="Nahaufnahme eines erfrischenden Getränks im Restaurant Taj Mahal – stilvolle Getränkeszene."
                      className="impressionen_image-3"
                      width={600}
                      height={800}
                    />
                    <Image
                      src="/images/680ce7f65120df33e1a9bf6d-680d15832c8bf853b1dd98a3_Frame%2068.avif"
                      loading="lazy"
                      id="w-node-_13fffa71-8327-4baf-ce42-c4b09dfb8a16-f9fcf116"
                      sizes="(max-width: 804px) 100vw, 804px"
                      alt="Stimmungsvolle Gesamtaufnahme des Restaurant Taj Mahal in Poing mit eleganter Einrichtung und stilvoller Lichtinszenierung – indisches Flair auf zwei Ebenen."
                      className="impressionen_image-2"
                      width={804}
                      height={600}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            data-w-id="7d17c185-6dc1-b77c-d442-7b2b90a63a58"
            className="section_impressionen-3"
          >
            <div className="padding-global">
              <div className="container-medium">
                <div className="hero-wrapper">
                  <div className="hero-top">
                    <h2
                      data-w-id="2fedb4b2-246e-3ed8-a808-d60a638c9d13"
                      className="heading-style-h2"
                    >
                      Namaste!
                    </h2>
                    <p data-w-id="2fedb4b2-246e-3ed8-a808-d60a638c9d15">
                      Freunde und Familien kommen zusammen, um in einem Ambiente, 
                      das die Seele Indiens widerspiegelt, gemeinsam zu feiern. 
                      Eine wunderbare Atmosphäre der Lebensfreude und Gemeinschaft.
                    </p>
                    <img
                      src="/images/blue-cocktail.png"
                      loading="lazy"
                      data-w-id="2150d052-af75-8d02-2037-0aa84d100cbc"
                      alt="Eleganter Cocktail im verzierten Stielglas mit cremigem Schaum – stilvoller Signature Drink des Restaurant Taj Mahal."
                      className="impressionen_image-glass"
                      style={{
                        opacity: 1,
                        willChange: "transform",
                        transform:
                          "translate3d(0px, 1.2034%, 0px) scale3d(0.956017, 0.956017, 1) rotateX(0deg) rotateY(0deg) rotateZ(26.017deg) skew(0deg, 0deg)",
                        transformStyle: "preserve-3d",
                      }}
                    />
                  </div>
                  <div
                    data-w-id="78bb23f5-3242-e71f-6520-50c20d9bfbb4"
                    className="image_parallax-wrapper"
                  >
                    <img
                      className="image_parallax is-390400"
                      src="/images/event8image.png"
                      alt="Detailaufnahme der stilvollen Bar im Restaurant Taj Mahal mit moderner Theke, Glaswaren und edler Ausstattung – indische Eleganz trifft auf internationale Barkultur."
                      style={{ opacity: 0.8 }}
                      sizes="(max-width: 1390px) 100vw, 1390px"
                      data-w-id="2fedb4b2-246e-3ed8-a808-d60a638c9d19"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            data-w-id="7d17c185-6dc1-b77c-d442-7b2b90a63a58"
            className="section_impressionen-4"
          >
            <div className="padding-global">
              <div className="container-large">
                <div className="impressionen_images-component">
                  <div className="impressionen_images-left">
                    <Image
                      className="impressionen_image-1"
                      src="/images/event9image.png"
                      alt="Stilvoller Nebenraum im Restaurant Taj Mahal: moderne Einrichtung mit indischen Akzenten und gemütlicher Atmosphäre – ideal für kleine Gruppen."
                      style={{ opacity: 0.8 }}
                      sizes="(max-width: 983px) 100vw, 983px"
                      data-w-id="dd420398-4386-8960-faed-9b685f7505f2"
                      loading="lazy"
                      width={983}
                      height={600}
                    />
                  </div>
                  <div className="impressionen_image-right">
                    <Image
                      className="impressionen_image-2"
                      src="/images/event7image.png"
                      alt="Detailaufnahme der stilvollen Bar im Restaurant Taj Mahal mit moderner Theke, Glaswaren und edler Ausstattung – indische Eleganz trifft auf internationale Barkultur."
                      style={{ opacity: 0.8 }}
                      sizes="(max-width: 804px) 100vw, 804px"
                      data-w-id="1c016943-7623-6a4b-107e-2a54432ee544"
                      loading="lazy"
                      width={804}
                      height={600}
                    />
                    <img
                      ref={(el) => {
                        tiltImagesRef.current[3] = el;
                      }}
                      src="https://cdn.prod.website-files.com/680ce7f65120df33e1a9bf6d/680d172dab7cea386dc367b0_Teller_Hahn1-Wiederhergestellt.avif"
                      loading="lazy"
                      style={{ opacity: 0.8 }}
                      data-w-id="ca707434-2f40-9ed7-947c-e4995fd37288"
                      alt="Traditionelles indisches Design-Element – Keramikteller mit floralen Verzierungen."
                      className="impressionen_image-5 tilt-image"
                    />
                  </div>
                </div>
                <div className="impressionen_images-component is-mob">
                  <div className="impressionen_images-left">
                    <Image
                      src="/images/event7image.png"
                      loading="lazy"
                      id="w-node-_7c557cb7-2d20-debe-80e7-bc88b6aa4806-f9fcf116"
                      sizes="(max-width: 983px) 100vw, 983px"
                      alt="Stilvoller Nebenraum im Restaurant Taj Mahal: moderne Einrichtung mit indischen Akzenten und gemütlicher Atmosphäre – ideal für kleine Gruppen."
                      className="impressionen_image-1"
                      width={983}
                      height={600}
                    />
                    <img
                      src="https://photos.smugmug.com/Asia/India/i-Pf4hCQr/0/d3d38770/X2/indian-food-dosa-X2.jpg"
                      loading="lazy"
                      id="w-node-_7c557cb7-2d20-debe-80e7-bc88b6aa4807-f9fcf116"
                      alt="Gourmetgericht mit authentischen indischen Spezialitäten im Restaurant Taj Mahal."
                      className="impressionen_image-3"
                    />
                    <Image
                      src="/images/event6image.png"
                      loading="lazy"
                      id="w-node-_7c557cb7-2d20-debe-80e7-bc88b6aa4809-f9fcf116"
                      sizes="(max-width: 804px) 100vw, 804px"
                      alt="Detailaufnahme der stilvollen Bar im Restaurant Taj Mahal mit moderner Theke, Glaswaren und edler Ausstattung – indische Eleganz trifft auf internationale Barkultur."
                      className="impressionen_image-2"
                      width={804}
                      height={600}
                    />
                    <img
                      ref={(el) => {
                        tiltImagesRef.current[4] = el;
                      }}
                      src="/images/inthali.png"
                      loading="lazy"
                      data-w-id="7c557cb7-2d20-debe-80e7-bc88b6aa480a"
                      id="w-node-_7c557cb7-2d20-debe-80e7-bc88b6aa480a-f9fcf116"
                      alt="Traditionelles indisches Design-Element – Keramikteller mit floralen Verzierungen."
                      className="impressionen_image-5 tilt-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section_impressionen-5">
            <div className="padding-global">
              <div className="container-medium">
                <div
                  data-w-id="47889ad9-de7f-35e6-71d2-4bbd590bac53"
                  className="image_parallax-wrapper"
                >
                  <Image
                    className="image_parallax"
                    src="/images/event10image.png"
                    alt="Das Separee Citronella im Restaurant Taj Mahal: stilvoller Raum mit eleganter Ausstattung für private Dinner."
                    style={{ opacity: 1 }}
                    sizes="(max-width: 1112px) 100vw, 1112px"
                    data-w-id="b23bba75-1d13-e410-51e4-9fa7fe045e09"
                    loading="lazy"
                    width={1112}
                    height={600}
                  />
                </div>
              </div>
            </div>
          </section>

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
        </main>
    </>
  );
}
