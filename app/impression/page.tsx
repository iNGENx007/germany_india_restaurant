"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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

      <div className="page-wrapper">
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

        <div className="filter"></div>

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
                href="https://share.google/df6DQ9ljtyiBndTf2"
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
                    aria-current="page"
                    className="navbar_link w-nav-link w--current"
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
                    className="navbar_link w-nav-link"
                  >
                    Kontakt
                  </a>
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
          <section className="section_impressionen-1">
            <div className="padding-global">
              <div className="container-medium">
                <div className="hero-wrapper">
                  <div className="hero-top is-padding">
                    <h1
                      data-w-id="9291d96c-5c15-29e4-4bb3-0f27fd237c4e"
                      className="heading-style-h1"
                    >
                      Spettacolo <br />
                      senza fine
                    </h1>
                    <p data-w-id="57a303f6-6aa9-4224-8d94-06f613ef73d3">
                      Rossini wäre hier Stammgast. Sein Faible für Opulenz und
                      seine Leidenschaft für gute Küche würde hier auf's Beste
                      befriedigt. Auf unserer großen Bühne haben nicht nur die
                      ursprünglich zubereiteten Trattoria-Gerichte ihren
                      Auftritt, sondern auch das Publikum selbst. <br />
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
                        alt="Heller, stilvoll eingerichteter Gastraum der GIGI Trattoria in München mit großen Fensterfronten, rosafarbenen Samtsofas, gemusterten Sesseln und Retro-Lampen – italienisches Flair in modernem Ambiente."
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
                      alt="Italienische Tavolata mit vielfältigen Gerichten wie Pasta, gegrilltem Fisch, Fleisch und Antipasti auf bunten Keramiktellern – stilvoll angerichtet auf rustikalem Holztisch im GIGI Restaurant."
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
                      alt="Nahaufnahme einer Hand, die eine Flasche Roséwein mit dem Etikett ‚Amore Senza Fine' hält – stilvolle Getränkeszene im GIGI Restaurant."
                      className="impressionen_image-3"
                      width={600}
                      height={800}
                    />
                  </div>
                  <div className="impressionen_image-right">
                    <Image
                      className="impressionen_image-2"
                      src="/images/event3image.png"
                      alt="Stimmungsvolle Gesamtaufnahme des GIGI Restaurants in München mit imposanten Fransenlampen, offener Bar, eleganten Sitzbereichen und stilvoller Lichtinszenierung – italienisches Flair auf zwei Ebenen."
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
                      alt="Italienische Tavolata mit vielfältigen Gerichten wie Pasta, gegrilltem Fisch, Fleisch und Antipasti auf bunten Keramiktellern – stilvoll angerichtet auf rustikalem Holztisch im GIGI Restaurant."
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
                      alt="Nahaufnahme einer Hand, die eine Flasche Roséwein mit dem Etikett ‚Amore Senza Fine' hält – stilvolle Getränkeszene im GIGI Restaurant."
                      className="impressionen_image-3"
                      width={600}
                      height={800}
                    />
                    <Image
                      src="/images/680ce7f65120df33e1a9bf6d-680d15832c8bf853b1dd98a3_Frame%2068.avif"
                      loading="lazy"
                      id="w-node-_13fffa71-8327-4baf-ce42-c4b09dfb8a16-f9fcf116"
                      sizes="(max-width: 804px) 100vw, 804px"
                      alt="Stimmungsvolle Gesamtaufnahme des GIGI Restaurants in München mit imposanten Fransenlampen, offener Bar, eleganten Sitzbereichen und stilvoller Lichtinszenierung – italienisches Flair auf zwei Ebenen."
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
                      Entrata!
                    </h2>
                    <p data-w-id="2fedb4b2-246e-3ed8-a808-d60a638c9d15">
                      Alte Freunde treffen auf junge Verliebte und mischen sich
                      unter fröhliche Gesellschaften, in einem Ambiente, das dem
                      hohen Haus absolut gerecht wird. Eine einzige,
                      phantastische Choreographie der Lebensfreude.
                    </p>
                    <img
                      src="/images/blue-cocktail.png"
                      loading="lazy"
                      data-w-id="2150d052-af75-8d02-2037-0aa84d100cbc"
                      alt="Eleganter Cocktail im verzierten Stielglas mit cremigem Schaum und Orangenscheibe – stilvoller Signature Drink 'Italian Pornstar' von GIGI Trattoria."
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
                      alt="Detailaufnahme der stilvollen Bar im GIGI Restaurant mit Marmortheke, hohen Barhockern, Zitrusfrüchten, Glaswaren und edler Ausstattung – mediterrane Eleganz trifft auf italienische Barkultur."
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
                      alt="Die Cicchetteria der GIGI Trattoria: stilvoller Nebenraum mit dekorativen Fliesen, heller Holzbar, gemütlichen Sitzplätzen und mediterraner Atmosphäre – ideal für Aperitivo und kleine Gerichte."
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
                      alt="Detailaufnahme der stilvollen Bar im GIGI Restaurant mit Marmortheke, hohen Barhockern, Zitrusfrüchten, Glaswaren und edler Ausstattung – mediterrane Eleganz trifft auf italienische Barkultur."
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
                      alt="Bunter Keramikteller im italienischen Stil mit Hahn-Motiv und floralen Verzierungen in Rot, Gelb und Blau – traditionelles Design-Element."
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
                      alt="Die Cicchetteria der GIGI Trattoria: stilvoller Nebenraum mit dekorativen Fliesen, heller Holzbar, gemütlichen Sitzplätzen und mediterraner Atmosphäre – ideal für Aperitivo und kleine Gerichte."
                      className="impressionen_image-1"
                      width={983}
                      height={600}
                    />
                    <img
                      src="https://photos.smugmug.com/Asia/India/i-Pf4hCQr/0/d3d38770/X2/indian-food-dosa-X2.jpg"
                      loading="lazy"
                      id="w-node-_7c557cb7-2d20-debe-80e7-bc88b6aa4807-f9fcf116"
                      alt="Gourmetgericht mit gegrilltem Oktopus, Gemüse und Kräutern auf handbemaltem italienischem Keramikteller – serviert im GIGI Restaurant mit einem Glas Weißwein."
                      className="impressionen_image-3"
                    />
                    <Image
                      src="/images/event6image.png"
                      loading="lazy"
                      id="w-node-_7c557cb7-2d20-debe-80e7-bc88b6aa4809-f9fcf116"
                      sizes="(max-width: 804px) 100vw, 804px"
                      alt="Detailaufnahme der stilvollen Bar im GIGI Restaurant mit Marmortheke, hohen Barhockern, Zitrusfrüchten, Glaswaren und edler Ausstattung – mediterrane Eleganz trifft auf italienische Barkultur."
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
                      alt="Bunter Keramikteller im italienischen Stil mit Hahn-Motiv und floralen Verzierungen in Rot, Gelb und Blau – traditionelles Design-Element."
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
                    alt="Das Separee Citronella im GIGI Restaurant: stilvoller Raum mit floraler Zitronen-Decke, warmem Licht, rosafarbenem Samtsofa und eleganter Atmosphäre für private Dinner."
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
        </main>
      </div>
    </>
  );
}
