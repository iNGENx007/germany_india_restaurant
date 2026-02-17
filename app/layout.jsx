export const metadata = {
  title: 'Restaurant Taj Mahal Poing – Authentische indische Küche',
  description:
    'Willkommen im Restaurant Taj Mahal in Poing, wo wir Ihnen den authentischen Geschmack Indiens näherbringen – eine kulinarische Reise durch die reichen Traditionen der Großmogul-Küche. Reserviere jetzt deinen Tisch!',
};

import { LanguageProvider } from "./contexts/LanguageContext";

export default function RootLayout({ children }) {
  return (
    <html data-wf-domain="www.gigi.restaurant" data-wf-page="680ce7f65120df33e1a9bfcc" data-wf-site="680ce7f65120df33e1a9bf6d" lang="de" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Restaurant Taj Mahal Poing – Authentische indische Küche" />
        <meta property="og:description" content="Willkommen im Restaurant Taj Mahal in Poing, wo wir Ihnen den authentischen Geschmack Indiens näherbringen – eine kulinarische Reise durch die reichen Traditionen der Großmogul-Küche. Reserviere jetzt deinen Tisch!" />
        <meta property="twitter:title" content="Restaurant Taj Mahal Poing – Authentische indische Küche" />
        <meta property="twitter:description" content="Willkommen im Restaurant Taj Mahal in Poing, wo wir Ihnen den authentischen Geschmack Indiens näherbringen – eine kulinarische Reise durch die reichen Traditionen der Großmogul-Küche. Reserviere jetzt deinen Tisch!" />

        <link href="https://cdn.prod.website-files.com/680ce7f65120df33e1a9bf6d/css/gigi-2025.shared.235c6ae77.min.css" rel="stylesheet" type="text/css" />
        <link href="/images/taj-mahal.png" rel="shortcut icon" type="image/png" />
        <link href="/images/taj-mahal.png" rel="apple-touch-icon" />
        <link href="https://gigi.restaurant" rel="canonical" />

        {/* [Attributes by Finsweet] Disable scrolling */}
        <script defer src="/js/attributes-scrolldisable@1-scrolldisable.js"></script>

        {/* Inline CSS from original <head> */}
        <style dangerouslySetInnerHTML={{ __html: `
    a[href^="tel"] { text-decoration: none; color: inherit; }
    .photos-wrapper { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; width: 100%; }
    .home_photo-wrapper { width: 100%; position: relative; overflow: hidden; aspect-ratio: 4 / 3; }
    .home_photo { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
    @media (min-width: 768px) { .photos-wrapper { gap: 1.5rem; } }
    .about-section { padding: 4rem 0; background: linear-gradient(180deg, #faf8f6 0%, #ffffff 100%); position: relative; overflow: hidden; }
    .about-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 50%, rgba(201, 125, 96, 0.05) 0%, transparent 50%); pointer-events: none; }
    .about-wrapper { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 1rem; position: relative; z-index: 1; }
    .about-image-wrapper { width: 100%; height: 100%; min-height: 400px; position: relative; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15); transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    .about-image-wrapper:hover { transform: translateY(-5px); }
    .about-image-wrapper::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201, 125, 96, 0.1) 0%, rgba(212, 165, 116, 0.05) 100%); pointer-events: none; }
    .about-image { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
    .about-content { padding: 2rem 0; display: flex; flex-direction: column; justify-content: center; }
    .about-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: #2c2418; margin-bottom: 2rem; line-height: 1.3; letter-spacing: -0.02em; position: relative; padding-bottom: 1.25rem; text-align: left; }
    .about-title::after { content: ''; position: absolute; bottom: 0; left: 0; width: 60px; height: 4px; background: linear-gradient(135deg, #c97d60 0%, #d4a574 100%); border-radius: 2px; }
    .about-text { font-size: clamp(1rem, 1.5vw, 1.125rem); line-height: 1.85; color: #4a4238; margin-bottom: 1.5rem; text-align: justify; text-align-last: left; word-wrap: break-word; overflow-wrap: break-word; hyphens: auto; max-width: 100%; padding: 0; }
    .about-text:last-child { margin-bottom: 0; }
    @media (min-width: 768px) { .about-section { padding: 6rem 0; } .about-wrapper { grid-template-columns: 1fr 1fr; gap: 4rem; } .about-image-wrapper { min-height: 500px; } .about-content { padding: 1.5rem 0; } .about-text { line-height: 1.9; margin-bottom: 1.75rem; } }
    @media (min-width: 992px) { .about-section { padding: 8rem 0; } .about-wrapper { gap: 5rem; } .about-image-wrapper { min-height: 600px; } }
    @media (max-width: 767px) { .about-section { padding: 3rem 0; } .about-text { font-size: 1rem; line-height: 1.8; margin-bottom: 1.5rem; text-align: justify; text-align-last: left; } .about-title { margin-bottom: 1.5rem; padding-bottom: 1rem; } .about-content { padding: 1.5rem 0; } }
    #w-node-a400f8da-4024-5047-9427-04f591cfb66b-e1a9bfcc .home_menu-item_top { text-align: center; }
    #w-node-a400f8da-4024-5047-9427-04f591cfb66b-e1a9bfcc .home_menu-item_top .text-font-garamond { text-align: center; }
    #w-node-a400f8da-4024-5047-9427-04f591cfb66b-e1a9bfcc .div-block-5 { text-align: center; }
    #w-node-a400f8da-4024-5047-9427-04f591cfb66b-e1a9bfcc .text-size-small { text-align: center; }
    #w-node-a400f8da-4024-5047-9427-04f591cfb66b-e1a9bfcc .button { display: block; margin: 1.5rem auto 0; text-align: center; }
    @keyframes shine { 0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); } 100% { transform: translateX(100%) translateY(100%) rotate(45deg); } }
    .home_hero-image { position: relative; overflow: hidden; }
    .home_hero-image::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%); transform: translateX(-100%) translateY(-100%) rotate(45deg); animation: shine 3s infinite; pointer-events: none; z-index: 1; }
    .about-image-wrapper { position: relative; overflow: hidden; }
    .about-image-wrapper::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%); transform: translateX(-100%) translateY(-100%) rotate(45deg); animation: shine 4s infinite; pointer-events: none; z-index: 2; }
    .home_photo-wrapper { position: relative; overflow: hidden; }
    .home_photo-wrapper::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%); transform: translateX(-100%) translateY(-100%) rotate(45deg); animation: shine 5s infinite; pointer-events: none; z-index: 1; }
    .section_home-hero { position: relative; }
    .home_component { position: relative; }
    .hero_logo { position: absolute; top: 50%; left: 50%; z-index: 10; overflow: hidden; pointer-events: none; }
    .hero_logo::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%); transform: translateX(-100%) translateY(-100%) rotate(45deg); animation: shine 6s infinite; pointer-events: none; z-index: 1; }
    .home_hero-image:hover::before, .about-image-wrapper:hover::before, .home_photo-wrapper:hover::before, .hero_logo:hover::before { animation: shine 1.5s infinite; }
        ` }} />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            function ready(fn){ if(document.readyState!=='loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }
            ready(function(){
              var btn = document.querySelector('.w-nav-button');
              var menu = document.querySelector('.w-nav-menu');
              if(btn && menu){
                btn.addEventListener('click', function(){
                  var open = menu.getAttribute('data-open') === 'true';
                  menu.setAttribute('data-open', (!open).toString());
                  menu.style.display = open ? 'none' : 'block';
                });
                menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ menu.setAttribute('data-open','false'); menu.style.display='none'; }); });
              }
            });
          })();
        ` }} />
      </body>
    </html>
  );
}


