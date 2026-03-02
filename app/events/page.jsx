export default function EventsPage() {
  return (
    <main>
      <div
        dangerouslySetInnerHTML={{
          __html: `
  <div class="page-wrapper">
    <div class="padding-global _100">
      <h1 class="hide">Gruppen & Events – Restaurant Taj Mahal Poing</h1>
    </div>
    <nav class="navbar_component w-nav">
      <div class="navbar_container">
        <a href="/" class="navbar_logo-link w-nav-brand"><img src="/images/logo.png" alt="Logo" class="navbar_logo"></a>
        <nav class="navbar_menu w-nav-menu">
          <div class="navbar_menu-wrapper">
            <div class="navbar_links-wrapper">
              <a href="/" class="navbar_link w-nav-link">Home</a>
              <a href="/impression" class="navbar_link w-nav-link">Impressionen</a>
              <a href="/events" class="navbar_link w-nav-link w--current">Gruppen &amp; Events</a>
              <a href="/karriere" class="navbar_link w-nav-link">Karriere</a>
              <a href="/kontakt" class="navbar_link w-nav-link">Kontakt</a>
            </div>
          </div>
        </nav>
      </div>
    </nav>
    <section class="about-section">
      <div class="padding-global">
        <div class="container-large">
          <div class="about-wrapper">
            <div class="about-image-wrapper">
              <img src="https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg?semt=ais_hybrid&w=740&q=80" alt="Event space" class="about-image" />
            </div>
            <div class="about-content">
              <h2 class="about-title">Events & Catering</h2>
              <p class="about-text">Ausrichten Sie Familienessen, Feiern oder Geschäftsessen – wir bereiten indische Menüs mit Liebe zum Detail zu.</p>
              <p class="about-text">Sprechen Sie uns für individuelle Menüs, vegetarische Optionen und Tandoori-Spezialitäten an.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="padding-global">
        <div class="container-large">
          <div class="footer_wrapper">
            <div class="footel_line"></div>
            <div class="footer-top">
              <div class="footer-top_center"><a href="/" class="w-inline-block"><img src="https://placehold.co/200x80?text=Taj+Mahal+Logo" alt="Logo" class="footer_logo"></a>
                <div class="footer-text-wrapper"><a aria-label="address" href="https://share.google/df6DQ9ljtyiBndTf2" target="_blank" class="text_link">Friedensstraße 9, 85586 Poing</a><a href="tel:+498121986166" class="text_link">+49 (0) 8121986166</a><a href="mailto:info@taj-mahal-poing.de" class="text_link">info@taj-mahal-poing.de</a></div>
              </div>
            </div>
            <div class="footel_line"></div>
          </div>
        </div>
      </div>
    </footer>
  </div>
          `,
        }}
      />
    </main>
  );
}


