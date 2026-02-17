// Translation utility to translate HTML content
import { translations } from "../translations/translations";

// Common text mappings for translation
const textMappings = {
  de: {
    // German (default) - keep original
  },
  en: {
    "Home": "Home",
    "Menü": "Menu",
    "Impressionen": "Impressions",
    "Gruppen & Events": "Groups & Events",
    "Karriere": "Career",
    "Kontakt": "Contact",
    "Reservierung": "Reservation",
    "Reservierung / Anruf": "Reservation / Call",
    "Download Menü (PDF)": "Download Menu (PDF)",
    "Menü im Pop‑up öffnen": "Open Menu in Pop-up",
    "Klicken Sie hier, um das Menü anzuzeigen": "Click here to view menu",
    "Download": "Download",
    "Taj Mahal Menü": "Taj Mahal Menu",
    "Entdecken Sie unsere authentische indische Küche": "Discover our authentic Indian cuisine",
    "Über das Restaurant Taj Mahal": "About Restaurant Taj Mahal",
    "Willkommen im Restaurant Taj Mahal": "Welcome to Restaurant Taj Mahal",
  },
  pt: {
    "Home": "Início",
    "Menü": "Cardápio",
    "Impressionen": "Impressões",
    "Gruppen & Events": "Grupos e Eventos",
    "Karriere": "Carreira",
    "Kontakt": "Contato",
    "Reservierung": "Reserva",
    "Reservierung / Anruf": "Reserva / Ligar",
    "Download Menü (PDF)": "Baixar Cardápio (PDF)",
    "Menü im Pop‑up öffnen": "Abrir Cardápio em Pop-up",
    "Klicken Sie hier, um das Menü anzuzeigen": "Clique aqui para ver o cardápio",
    "Download": "Baixar",
    "Taj Mahal Menü": "Cardápio Taj Mahal",
    "Entdecken Sie unsere authentische indische Küche": "Descubra nossa culinária indiana autêntica",
    "Über das Restaurant Taj Mahal": "Sobre o Restaurante Taj Mahal",
    "Willkommen im Restaurant Taj Mahal": "Bem-vindo ao Restaurante Taj Mahal",
  },
  ar: {
    "Home": "الرئيسية",
    "Menü": "القائمة",
    "Impressionen": "الانطباعات",
    "Gruppen & Events": "المجموعات والفعاليات",
    "Karriere": "الوظائف",
    "Kontakt": "اتصل بنا",
    "Reservierung": "حجز",
    "Reservierung / Anruf": "حجز / اتصال",
    "Download Menü (PDF)": "تحميل القائمة (PDF)",
    "Menü im Pop‑up öffnen": "فتح القائمة في نافذة منبثقة",
    "Klicken Sie hier, um das Menü anzuzeigen": "انقر هنا لعرض القائمة",
    "Download": "تحميل",
    "Taj Mahal Menü": "قائمة تاج محل",
    "Entdecken Sie unsere authentische indische Küche": "اكتشفوا مطبخنا الهندي الأصيل",
    "Über das Restaurant Taj Mahal": "حول مطعم تاج محل",
    "Willkommen im Restaurant Taj Mahal": "مرحباً بكم في مطعم تاج محل",
  },
};

export function translatePage(language) {
  if (language === "de" || !textMappings[language]) {
    return; // German is default, no translation needed
  }

  const mappings = textMappings[language];
  const body = document.body;

  // Function to translate text nodes
  function translateTextNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent.trim();
      if (text && mappings[text]) {
        node.textContent = mappings[text];
      }
      // Also check for partial matches in common phrases
      Object.keys(mappings).forEach((key) => {
        if (text.includes(key)) {
          node.textContent = text.replace(new RegExp(key, "g"), mappings[key]);
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Skip script and style tags
      if (
        node.tagName === "SCRIPT" ||
        node.tagName === "STYLE" ||
        node.tagName === "NOSCRIPT"
      ) {
        return;
      }

      // Translate text content
      if (node.textContent && node.textContent.trim()) {
        let text = node.textContent.trim();
        Object.keys(mappings).forEach((key) => {
          if (text === key || text.includes(key)) {
            node.textContent = text.replace(new RegExp(key, "g"), mappings[key]);
          }
        });
      }

      // Translate attributes
      ["title", "aria-label", "alt"].forEach((attr) => {
        if (node.getAttribute(attr)) {
          const attrValue = node.getAttribute(attr);
          if (mappings[attrValue]) {
            node.setAttribute(attr, mappings[attrValue]);
          }
        }
      });

      // Recursively translate child nodes
      Array.from(node.childNodes).forEach(translateTextNode);
    }
  }

  // Translate all text nodes
  Array.from(body.childNodes).forEach(translateTextNode);

  // Also translate specific elements by class or ID
  const selectors = [
    ".navbar_link",
    ".button",
    ".menu-title",
    ".menu-description",
    ".about-title",
    ".about-text",
    "h1",
    "h2",
    "h3",
    "p",
    "a",
    "button",
  ];

  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (element.textContent) {
        let text = element.textContent.trim();
        Object.keys(mappings).forEach((key) => {
          if (text === key || text.includes(key)) {
            element.textContent = text.replace(new RegExp(key, "g"), mappings[key]);
          }
        });
      }
    });
  });
}

// More comprehensive translation function using Google Translate API or similar
export async function translateContent(language, text) {
  if (language === "de") return text;

  // For now, use the mappings
  const mappings = textMappings[language] || {};
  
  // Check exact match
  if (mappings[text]) {
    return mappings[text];
  }

  // Check partial matches
  let translated = text;
  Object.keys(mappings).forEach((key) => {
    if (translated.includes(key)) {
      translated = translated.replace(new RegExp(key, "g"), mappings[key]);
    }
  });

  return translated;
}

