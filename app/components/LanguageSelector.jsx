"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const languages = [
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find((lang) => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="language-flag">{currentLang.flag}</span>
        <span className="language-name">{currentLang.name}</span>
        <span className="language-arrow">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? "active" : ""}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
      <style jsx>{`
        .language-selector {
          position: relative;
          display: inline-block;
          z-index: 1000;
        }
        .language-selector-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #fff;
          border: 2px solid #614124;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #614124;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .language-selector-button:hover {
          background: #faf8f6;
          border-color: #8b6f47;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(97, 65, 36, 0.15);
        }
        .language-flag {
          font-size: 18px;
        }
        .language-name {
          font-size: 14px;
        }
        .language-arrow {
          font-size: 10px;
          margin-left: 4px;
        }
        .language-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #fff;
          border: 2px solid #614124;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          min-width: 180px;
          overflow: hidden;
          z-index: 1001;
        }
        .language-option {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          background: #fff;
          border: none;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          text-align: left;
          font-size: 14px;
          color: #614124;
          transition: all 0.2s ease;
        }
        .language-option:last-child {
          border-bottom: none;
        }
        .language-option:hover {
          background: #faf8f6;
        }
        .language-option.active {
          background: #614124;
          color: #fff;
        }
        .language-option.active .language-flag {
          filter: brightness(1.2);
        }
        @media (max-width: 768px) {
          .language-selector-button {
            padding: 6px 12px;
            font-size: 13px;
          }
          .language-name {
            display: none;
          }
          .language-dropdown {
            right: 0;
            min-width: 160px;
          }
        }
      `}</style>
    </div>
  );
}

