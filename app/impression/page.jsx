export default function ImpressionPage() {
  return (
    <main>
      <div
        dangerouslySetInnerHTML={{
          __html: `
  <div class="page-wrapper">
    <div class="padding-global _100">
      <h1 class="hide">Impressionen – Restaurant Taj Mahal Poing</h1>
    </div>
    <nav class="navbar_component w-nav">
      <div class="navbar_container">
        <a href="/" class="navbar_logo-link w-nav-brand"><img src="/images/logo.png" alt="Logo" class="navbar_logo"></a>
        <nav class="navbar_menu w-nav-menu">
          <div class="navbar_menu-wrapper">
            <div class="navbar_links-wrapper">
              <a href="/" class="navbar_link w-nav-link">Home</a>
              <a href="/impression" class="navbar_link w-nav-link w--current">Impressionen</a>
              <a href="/events" class="navbar_link w-nav-link">Gruppen &amp; Events</a>
              <a href="/karriere" class="navbar_link w-nav-link">Karriere</a>
              <a href="/kontakt" class="navbar_link w-nav-link">Kontakt</a>
            </div>
          </div>
        </nav>
      </div>
    </nav>
    <section class="sectio_home4">
      <div class="padding-global">
        <div class="container-large">
          <div class="photos-wrapper">
            <div class="home_photo-wrapper"><img src="https://www.chutegerdeman.com/wp-content/uploads/2023/03/pexels-joe-l-2788792-1024x683.jpg" class="home_photo" alt="Interior"></div>
            <div class="home_photo-wrapper"><img src="https://cdn.prod.website-files.com/680ce7f65120df33e1a9bf6d/6810e52f73b5023a1104ea32_Frame%20127.avif" class="home_photo" alt="Drink"></div>
            <div class="home_photo-wrapper"><img src="https://cdn.prod.website-files.com/680ce7f65120df33e1a9bf6d/6810e52fd64fb44e77458f4b_Frame%20128.avif" class="home_photo" alt="Dining room"></div>
            <div class="home_photo-wrapper"><img src="https://cdn.prod.website-files.com/680ce7f65120df33e1a9bf6d/6810e52f03e9b9e722053d06_Frame%20129.avif" class="home_photo" alt="Beverages"></div>
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
