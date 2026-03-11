"use client";

import TopNavbar from "../../components/TopNavbar";export default function EventsPage() {
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

        /* Events page UI enhancements */
        .event_item {
          border: 1px solid var(--color-border, rgba(97, 65, 36, 0.15));
          border-radius: 14px;
          background: #faf8f6;
          transition: box-shadow 0.3s ease, transform 0.2s ease,
            background 0.3s ease;
          overflow: hidden;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        .event_item:hover {
          background: #ffffff;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .event_item-image {
          border-radius: 12px;
          transition: transform 0.45s ease, filter 0.45s ease;
          will-change: transform;
        }

        .event_item:hover .event_item-image {
          transform: scale(1.03);
        }

        .event_item-color {
          opacity: 0.08;
          transition: opacity 0.3s ease;
        }

        .event_item:hover .event_item-color {
          opacity: 0.18;
        }

        .button.w-button {
          transition: transform 0.12s ease, box-shadow 0.2s ease,
            filter 0.2s ease;
        }

        .button.w-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          filter: saturate(1.05);
        }

        .button.w-button:active {
          transform: translateY(0);
        }

        .heading-style-h2 {
          letter-spacing: 0.04em;
          margin-top: 0;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .text-font-garamond {
          margin-top: 0;
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }

        .event_item-right p {
          margin-top: 0;
          margin-bottom: 1.25rem;
          line-height: 1.75;
          text-align: justify;
          text-align-last: left;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        /* Intro text container spacing */
        .events-top .events-text_wrapper p {
          max-width: 70ch;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.8;
          text-align: justify;
          text-align-last: left;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
          margin-bottom: 1.5rem;
        }

        /* Hero section text formatting */
        .hero-top.is-padding p {
          text-align: justify;
          text-align-last: left;
          line-height: 1.8;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
          margin-bottom: 1.5rem;
        }

        /* Text formatting for strong tags */
        .text-font-garamond strong {
          display: block;
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        .text-font-garamond strong br {
          display: block;
          content: "";
          margin-top: 0.25rem;
        }

        /* Fix spacing issues with special characters */
        .event_item-right p br,
        .events-text_wrapper p br {
          display: block;
          content: "";
          margin-top: 0.75rem;
        }

        /* Remove forced line breaks spacing issues */
        .event_item-right p br + br,
        .events-text_wrapper p br + br {
          display: none;
        }

        /* Containers and wrapping */
        .container-large,
        .container-medium {
          padding-left: 16px;
          padding-right: 16px;
        }

        .event_item-right,
        .event_item-left {
          padding: 1rem;
        }

        .event_item-left {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          position: relative;
          box-sizing: border-box;
        }

        .event_item-left img,
        .event_item-image {
          width: 100%;
          max-width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }

        .event_item-color_wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        .events_wrapper {
          gap: 2rem;
        }

        .events_wrapper .container-medium {
          padding-left: 0;
          padding-right: 0;
        }

        /* Typography resilience */
        .event_item-right,
        .events-top p,
        .events-top h2,
        .events-top h1 {
          overflow-wrap: break-word;
          word-break: normal;
          hyphens: auto;
          text-align: justify;
          text-align-last: left;
        }

        /* Heading formatting */
        .heading-style-h1,
        .heading-style-h2 {
          text-align: left;
          line-height: 1.3;
          margin-bottom: 1rem;
        }

        /* Better paragraph spacing */
        p {
          margin-bottom: 1.25rem;
        }

        /* Fix text alignment for headings with breaks */
        .heading-style-h2 br {
          display: block;
          line-height: 1.2;
        }

        @media (min-width: 768px) {
          .event_item-right,
          .event_item-left {
            padding: 1.25rem;
          }
          .events_wrapper {
            gap: 2.5rem;
          }
          .events-top .events-text_wrapper p {
            font-size: 1.05rem;
          }
        }

        @media (min-width: 992px) {
          .event_item-right,
          .event_item-left {
            padding: 1.5rem;
          }
          .events-top .events-text_wrapper p {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 767px) {
          .events-top .events-text_wrapper p {
            padding-left: 8px;
            padding-right: 8px;
          }
          .heading-style-h2 {
            font-size: 1.6rem;
          }
          .text-font-garamond {
            font-size: 1rem;
          }
          .event_item-right p {
            font-size: 0.98rem;
            line-height: 1.7;
          }
          .hero-top.is-padding p {
            font-size: 1rem;
            line-height: 1.75;
          }
          .events-top .events-text_wrapper p {
            font-size: 0.98rem;
            line-height: 1.75;
          }
        }

        @media (hover: none) {
          .event_item:hover {
            transform: none;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          }
          .button.w-button:hover {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <TopNavbar />

      <main className="main-wrapper">
          <header className="section_events-1">
            <div className="padding-global">
              <div className="container-medium">
                <div className="hero-wrapper">
                  <div className="hero-top is-padding">
                    <h1
                      data-w-id="9291d96c-5c15-29e4-4bb3-0f27fd237c4e"
                      className="heading-style-h1"
                    >
                      Gruppen &amp; Events
                    </h1>
                    <p data-w-id="57a303f6-6aa9-4224-8d94-06f613ef73d3">
                      Genießt in unserem eleganten indischen Ambiente ein
                      authentisches Dining-Erlebnis. Egal, ob ihr ein Corporate Event, eine
                      Hochzeitsfeier oder ein privates Get-Together
                      veranstaltet, wir bieten euch zahlreiche Möglichkeiten,
                      eure Event-Vision zum Leben zu erwecken. Jeder Bereich hat
                      eine einzigartige Atmosphäre, sodass wir das perfekte
                      Setting für eure besondere Veranstaltung kreieren können.
                    </p>
                  </div>
                  <div
                    data-w-id="bde5501d-ac36-1fc2-b514-61f9232dad1e"
                    className="image_parallax-wrapper is-1-1"
                  >
                    <img
                      className="image_parallax is-g-e"
                      src="/images/g1.png"
                      alt="Taj Mahal"
                      style={{ opacity: 0.8 }}
                      sizes="(max-width: 1667px) 100vw, 1667px"
                      data-w-id="8dad6a7d-74c2-c635-7353-81d025237a9d"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="section_events-2">
            <div className="padding-global">
              <div className="container-large">
                <div className="events_wrapper">
                  <div className="container-medium">
                    <div className="events-top">
                      <h2
                        data-w-id="e9c9ccf8-0577-5724-9863-54f5e738a436"
                        className="heading-style-h2"
                      >
                        let's
                        <br />
                        celebrate
                      </h2>
                      <div className="events-text_wrapper">
                        <p data-w-id="6c4d89ae-0515-aedf-6a19-d5ee165c26d4">
                          Wir bieten euch und euren Gästen ein sorgfältig
                          zusammengestelltes 3- bis 5-Gänge-Menü an und
                          berücksichtigen dabei nach Möglichkeit gerne
                          individuelle Wünsche. Besonders bei exklusiven
                          Veranstaltungen erstellen wir ein maßgeschneidertes
                          Menü für euch.
                          <br />
                          <br />
                          Für Anfragen zu unseren private Dining Optionen und zu
                          exklusiven Veranstaltungen, schickt uns einfach eine
                          Eventanfrage und wir melden uns schnellstmöglich bei
                          euch.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="event_item is-right">
                    <div className="event_item-left">
                      <img
                        src="/images/g2.png"
                        loading="lazy"
                        data-w-id="d1af1872-a3df-1c6d-7284-bd2ef1890920"
                        sizes="(max-width: 1536px) 100vw, 1536px"
                        alt="Das Separee Citronella im Restaurant Taj Mahal: stilvoller Raum mit floraler Decke, warmem Licht und eleganter Atmosphäre für private Dinner."
                        className="event_item-image"
                      />
                      <div className="event_item-color_wrapper is-left">
                        <div className="event_item-color"></div>
                      </div>
                    </div>
                    <div className="event_item-right">
                      <h2 className="heading-style-h2">citronella</h2>
                      <p className="text-font-garamond">
                        <strong>
                          Platz für bis zu 30 Personen
                          <br />
                          Lage: Erdgeschoss
                        </strong>
                      </p>
                      <p>
                        Unser Séparée Citronella bietet flexible
                        Gestaltungsmöglichkeiten. Es kann auf Wunsch nach extra
                        Privatsphäre durch Türen vom Hauptraum abgetrennt werden
                        oder verwandelt sich bei geöffneten Türen in ein
                        halbprivates Dining-Erlebnis, ohne dabei auf den Flair
                        des Restaurants zu verzichten.
                      </p>
                      <a
                        href="/kontakt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button w-button"
                      >
                        anfragen
                      </a>
                    </div>
                  </div>

                  <div className="event_item is-left">
                    <div className="event_item-right">
                      <h2 className="heading-style-h2">
                        private dining galerie
                      </h2>
                      <p className="text-font-garamond">
                        <strong>
                          Platz für bis zu 12 Personen
                          <br />
                          Lage: 1. Stock
                        </strong>
                      </p>
                      <p>
                        Unser Séparée auf der Galerie ist optimal geeignet für
                        private Veranstaltungen im kleinen Kreis. Es eignet sich
                        perfekt für Meetings, Geburtstagsfeiern,
                        Produktpräsentationen oder Workshops. Es kann optional
                        durch Türen vom Hauptraum abgetrennt werden für extra
                        Privatsphäre.
                      </p>
                      <a
                        href="/kontakt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button w-button"
                      >
                        anfragen
                      </a>
                    </div>
                    <div className="event_item-left">
                      <img
                        src="/images/g3.png"
                        loading="lazy"
                        sizes="(max-width: 1536px) 100vw, 1536px"
                        alt="Das Separee ‚Private Dining Galerie' im Taj Mahal Restaurant: exklusiver Raum mit großem Holztisch, stimmungsvoller Beleuchtung, tropischen Pflanzen und kunstvoller Wandgestaltung – ideal für private Feiern und Dinner in elegantem Rahmen."
                        className="event_item-image"
                      />
                      <div className="event_item-color_wrapper is-right">
                        <div className="event_item-color _2"></div>
                      </div>
                    </div>
                  </div>

                  <div className="event_item is-right">
                    <div className="event_item-left">
                      <img
                        src="/images/g4.png"
                        loading="lazy"
                        sizes="(max-width: 1536px) 100vw, 1536px"
                        alt="Die gemütliche Lounge im Restaurant Taj Mahal: stilvoller Nebenraum mit authentischer Atmosphäre – ideal für kleine Gruppen."
                        className="event_item-image"
                      />
                      <div className="event_item-color_wrapper is-left">
                        <div className="event_item-color"></div>
                      </div>
                    </div>
                    <div className="event_item-right">
                      <h2 className="heading-style-h2">INDIAN LOUNGE</h2>
                      <p className="text-font-garamond">
                        <strong>
                          Platz für bis zu 20 Personen (Stehempfang)
                          <br />
                          Lage: Erdgeschoss
                        </strong>
                      </p>
                      <p>
                        Unsere Indian Lounge im Eingangsbereich eignet sich perfekt für ein lockeres
                        Get-Together, einem entspannten
                        Stehempfang oder Geburtstagsfeiern mit Appetizern und
                        kühlen Getränken.
                      </p>
                      <a
                        href="/kontakt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button w-button"
                      >
                        anfragen
                      </a>
                    </div>
                  </div>

                  <div className="event_item is-left">
                    <div className="event_item-right">
                      <h2 className="heading-style-h2">galerie Teilexklusiv</h2>
                      <p className="text-font-garamond">
                        <strong>
                          Platz für bis zu 60 Personen
                          <br />
                          Lage: 1. Stock
                        </strong>
                      </p>
                      <p>
                        Auf unserer Galerie habt ihr den perfekten Überblick.
                        Die Tische im gesamten Bereich sind exklusiv für eure
                        Gruppe reserviert, dies sorgt für ein privates
                        Dining-Erlebnis ohne dabei auf die lebendige Stimmung
                        des Restaurants zu verzichten.
                      </p>
                      <a
                        href="/kontakt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button w-button"
                      >
                        anfragen
                      </a>
                    </div>
                    <div className="event_item-left">
                      <img
                        src="/images/g5.png"
                        loading="lazy"
                        sizes="(max-width: 1536px) 100vw, 1536px"
                        alt="Stimmungsvoller Sitzbereich auf der Galerie im Taj Mahal Restaurant mit Bücherwand, Samtbänken und gemusterten Stühlen – ideal für teilexklusive Gruppen mit Blick ins Restaurant."
                        className="event_item-image"
                      />
                      <div className="event_item-color_wrapper is-right">
                        <div className="event_item-color _2"></div>
                      </div>
                    </div>
                  </div>

                  <div className="event_item is-right">
                    <div className="event_item-left">
                      <img
                        src="/images/g6.png"
                        loading="lazy"
                        sizes="(max-width: 3340px) 100vw, 3340px"
                        alt="Blick von oben auf den stilvollen Barbereich im Restaurant Taj Mahal – indische Eleganz trifft auf modernes Interior-Design."
                        className="event_item-image"
                      />
                      <div className="event_item-color_wrapper is-left">
                        <div className="event_item-color"></div>
                      </div>
                    </div>
                    <div className="event_item-right">
                      <h2 className="heading-style-h2">Taj Mahal exklusiv</h2>
                      <p className="text-font-garamond capitalize-normal">
                        <strong>
                          Platz für bis zu 150 Personen
                          <br />
                          Gesamtes Restaurant
                        </strong>
                      </p>
                      <p>
                        Für das ultimative Taj Mahal Feeling ist eine exklusive
                        Reservierung möglich. Perfekt für Corporate Events,
                        Weihnachtsfeiern und Hochzeiten. Wir freuen uns eure
                        Event-Vision Wirklichkeit werden zu lassen.
                      </p>
                      <a
                        href="/kontakt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button w-button"
                      >
                        anfragen
                      </a>
                    </div>
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
                        <img
                          src="/images/logo.png"
                          loading="lazy"
                          alt="Logo"
                          className="footer_logo"
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
