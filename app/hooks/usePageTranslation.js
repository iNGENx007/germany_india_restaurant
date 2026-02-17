"use client";

import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

// Comprehensive translation mappings
const translations = {
  de: {}, // German is default
  en: {
    // Navigation
    "Home": "Home",
    "Menü": "Menu",
    "Impressionen": "Impressions",
    "Gruppen & Events": "Groups & Events",
    "Karriere": "Career",
    "Kontakt": "Contact",
    // Buttons
    "Reservierung": "Reservation",
    "Reservierung / Anruf": "Reservation / Call",
    "Download Menü (PDF)": "Download Menu (PDF)",
    "Menü im Pop‑up öffnen": "Open Menu in Pop-up",
    "Klicken Sie hier, um das Menü anzuzeigen": "Click here to view menu",
    "Download": "Download",
    // Menu Section
    "Taj Mahal Menü": "Taj Mahal Menu",
    "Entdecken Sie unsere authentische indische Küche": "Discover our authentic Indian cuisine",
    // About Section
    "Über das Restaurant Taj Mahal": "About Restaurant Taj Mahal",
    "Willkommen im Restaurant Taj Mahal": "Welcome to Restaurant Taj Mahal",
    "Unsere Gerichte werden aus den feinsten und frischesten Zutaten zubereitet": "Our dishes are prepared from the finest and freshest ingredients",
    "Im Taj Mahal glauben wir, dass Essen mehr ist als nur eine Mahlzeit": "At Taj Mahal, we believe that food is more than just a meal",
    "Jedes Gericht ist ein Zusammenspiel von Farben, Aromen und Texturen": "Every dish is an interplay of colors, aromas and textures",
    "Wir freuen uns darauf, Sie bei uns begrüßen zu dürfen": "We look forward to welcoming you",
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

export function usePageTranslation() {
  const { language } = useLanguage();

  useEffect(() => {
    const translatePageContent = () => {
      if (language === "de") {
        // Restore original German text if needed
        return;
      }

      const mappings = translations[language] || {};
      if (Object.keys(mappings).length === 0) return;

      // Translate text nodes
      function translateNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent.trim();
          if (text && mappings[text]) {
            node.textContent = mappings[text];
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Skip script, style, and noscript tags
          if (
            node.tagName === "SCRIPT" ||
            node.tagName === "STYLE" ||
            node.tagName === "NOSCRIPT"
          ) {
            return;
          }

          // Translate text content
          if (node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (mappings[text]) {
              node.textContent = mappings[text];
            }
          }

          // Translate attributes
          ["title", "aria-label", "alt", "placeholder"].forEach((attr) => {
            const value = node.getAttribute(attr);
            if (value && mappings[value]) {
              node.setAttribute(attr, mappings[value]);
            }
          });

          // Recursively translate children
          Array.from(node.childNodes).forEach(translateNode);
        }
      }

      // Translate all elements with specific selectors
      const selectors = [
        ".navbar_link",
        ".button",
        ".button_mobile",
        ".menu-title",
        ".menu-description",
        ".about-title",
        ".about-text",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "a",
        "button",
        "span",
        "label",
        "div",
      ];

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          // Skip if element contains other elements (nested)
          if (element.children.length > 0) {
            // Only translate if it's a direct text node
            let hasDirectText = false;
            Array.from(element.childNodes).forEach((child) => {
              if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
                hasDirectText = true;
                const text = child.textContent.trim();
                if (mappings[text]) {
                  child.textContent = mappings[text];
                } else {
                  // Check for partial matches
                  Object.keys(mappings).forEach((key) => {
                    if (text.includes(key)) {
                      child.textContent = text.replace(new RegExp(key, "g"), mappings[key]);
                    }
                  });
                }
              }
            });
          } else {
            // Element has only text content
            const text = element.textContent.trim();
            if (text && mappings[text]) {
              element.textContent = mappings[text];
            } else if (text) {
              // Check for partial matches
              Object.keys(mappings).forEach((key) => {
                if (text.includes(key)) {
                  element.textContent = text.replace(new RegExp(key, "g"), mappings[key]);
                }
              });
            }
          }

          // Translate attributes
          ["title", "aria-label", "alt", "placeholder"].forEach((attr) => {
            const value = element.getAttribute(attr);
            if (value && mappings[value]) {
              element.setAttribute(attr, mappings[value]);
            } else if (value) {
              Object.keys(mappings).forEach((key) => {
                if (value.includes(key)) {
                  element.setAttribute(attr, value.replace(new RegExp(key, "g"), mappings[key]));
                }
              });
            }
          });
        });
      });

      // Also translate all text nodes directly
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            // Skip script and style tags
            const parent = node.parentElement;
            if (parent && (parent.tagName === "SCRIPT" || parent.tagName === "STYLE")) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        },
        false
      );

      let node;
      while ((node = walker.nextNode())) {
        const text = node.textContent.trim();
        if (text && mappings[text]) {
          node.textContent = mappings[text];
        } else if (text) {
          // Check for partial matches
          Object.keys(mappings).forEach((key) => {
            if (text.includes(key)) {
              node.textContent = text.replace(new RegExp(key, "g"), mappings[key]);
            }
          });
        }
      }
    };

    // Wait for DOM to be ready
    const timeout = setTimeout(() => {
      translatePageContent();
    }, 100);

    // Also listen for language changes
    const handleLanguageChange = () => {
      translatePageContent();
    };

    window.addEventListener("languageChanged", handleLanguageChange);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, [language]);

  return null;
}

