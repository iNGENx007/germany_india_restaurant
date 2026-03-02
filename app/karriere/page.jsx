"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function KarrierePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = [
    "/images/career3.png",
    "/images/career4.png",
    "/images/career5.png",
    "/images/flat-restaurant-job-hunting-inst.png",
  ];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000); // 2 seconds per image

    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <style jsx global>{`
        a[href^="tel"] {
          text-decoration: none;
          color: inherit;
        }

        /* Modern Animations and Hover Effects for Karriere Page */
        .hero-text {
          font-size: 1.125rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-text-animated {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.2s;
        }

        .hero-text-secondary {
          animation-delay: 0.4s;
        }

        .hero-text-tertiary {
          animation-delay: 0.6s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Image Hover Effects */
        .image_parallax-wrapper {
          transition: transform 0.3s ease-out;
          overflow: hidden;
        }

        .image_parallax-wrapper:hover {
          transform: scale(1.02);
        }

        .image_parallax-wrapper img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image_parallax-wrapper:hover img {
          transform: scale(1.05);
        }

        /* Section Animation on Scroll */
        .section_karriere-2,
        .section_karriere-3 {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 0.3s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Card Hover Effects */
        .karriere_image-wrapper {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .karriere_image-wrapper::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .karriere_image-wrapper:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        .karriere_image-wrapper:hover::after {
          opacity: 1;
        }

        .karriere_image-wrapper img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .karriere_image-wrapper:hover img {
          transform: scale(1.08);
        }

        /* Text Gradient Animation */
        .heading-style-h1 {
          background: linear-gradient(
            135deg,
            #2c2c2c 0%,
            #4a4a4a 50%,
            #2c2c2c 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Smooth Scroll Behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced Hero Section */
        .hero-top.is-padding {
          position: relative;
        }

        .hero-top.is-padding::before {
          content: "";
          position: absolute;
          top: -50px;
          left: -50px;
          width: 200px;
          height: 200px;
          background: radial-gradient(
            circle,
            rgba(255, 182, 193, 0.1) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: pulse 4s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        /* Event Item Hover Effects */
        .event_item {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .event_item:hover {
          transform: translateX(-5px);
        }

        .event_item-image {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .event_item:hover .event_item-image {
          transform: scale(1.05);
        }

        /* Button Animation Enhancement */
        .button.w-button {
          position: relative;
          z-index: 1;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .button.w-button::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
          z-index: -1;
        }

        .button.w-button:hover::after {
          width: 300px;
          height: 300px;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .hero-text {
            font-size: 1rem;
            margin-bottom: 1.25rem;
          }
          .karriere_image-wrapper:hover {
            transform: translateY(-4px);
          }
        }

        /* Stagger Animation for Multiple Elements */
        .karriere_images-left,
        .karriere_images-right {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .karriere_images-right {
          animation-delay: 0.2s;
        }

        /* ============================================
           BEAUTIFUL DESIGN ENHANCEMENTS
           ============================================ */

        /* Enhanced Page Background */
        body {
          background: linear-gradient(
            135deg,
            #faf9f7 0%,
            #f5f3f0 50%,
            #faf9f7 100%
          );
          background-attachment: fixed;
        }

        /* Beautiful Hero Section */
        .section_karriere-1 {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(250, 248, 246, 0.98) 100%
          );
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }

        .section_karriere-1::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              circle at 20% 50%,
              rgba(255, 182, 193, 0.08) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(255, 218, 185, 0.08) 0%,
              transparent 50%
            );
          pointer-events: none;
        }

        /* Enhanced Hero Wrapper */
        .hero-wrapper {
          position: relative;
          z-index: 1;
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 60px 40px;
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        /* Beautiful Typography */
        .heading-style-h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
          background: linear-gradient(
            135deg,
            #1a1a1a 0%,
            #4a4a4a 50%,
            #2c2c2c 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .hero-text {
          font-size: clamp(1rem, 2vw, 1.25rem);
          line-height: 1.85;
          color: #3a3a3a;
          margin-bottom: 1.75rem;
          font-weight: 400;
          letter-spacing: 0.01em;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
        }

        .hero-text:first-of-type {
          font-size: clamp(1.25rem, 2.5vw, 1.5rem);
          font-weight: 600;
          color: #2a2a2a;
          margin-bottom: 1.5rem;
        }

        /* Enhanced Button Styles - Matching UI Color Scheme */
        .button.is-pink {
          background: linear-gradient(135deg, #c97d60 0%, #d4a574 100%);
          color: #ffffff;
          border: none;
          padding: 16px 36px;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(201, 125, 96, 0.3),
            0 0 0 3px rgba(201, 125, 96, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .button.is-pink::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s ease;
        }

        .button.is-pink:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(201, 125, 96, 0.4),
            0 0 0 4px rgba(201, 125, 96, 0.15);
          background: linear-gradient(135deg, #d18a6f 0%, #deb07f 100%);
        }

        .button.is-pink:hover::before {
          left: 100%;
        }

        .button.is-pink:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(201, 125, 96, 0.3),
            0 0 0 2px rgba(201, 125, 96, 0.1);
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

        /* Hero Section Improvements */
        .section_karriere-1 {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            rgba(250, 248, 246, 0.95) 0%,
            rgba(255, 255, 255, 0.98) 50%,
            rgba(250, 248, 246, 0.95) 100%
          );
          padding: 80px 0;
        }

        .section_karriere-1::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at 30% 50%,
            rgba(210, 180, 140, 0.1) 0%,
            transparent 50%
          );
          pointer-events: none;
        }

        .hero-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-top.is-padding {
          animation: fadeInUp 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-text-animated {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }

        .hero-text-animated:nth-child(2) {
          animation-delay: 0.1s;
        }

        .hero-text-animated:nth-child(3) {
          animation-delay: 0.2s;
        }

        .hero-text-animated:nth-child(4) {
          animation-delay: 0.3s;
        }

        .hero-top.is-padding .button {
          animation: fadeInUp 0.8s ease-out 0.4s both;
          margin-top: 2rem;
          display: inline-block;
          text-align: center;
        }

        .hero-top.is-padding {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .section_karriere-1 .heading-style-h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          background: linear-gradient(135deg, #614124 0%, #8b6f5e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .hero-text {
          font-size: clamp(1rem, 1.5vw, 1.125rem);
          line-height: 1.75;
          color: #4a4a4a;
          margin-bottom: 1.25rem;
        }

        .hero-text-secondary,
        .hero-text-tertiary {
          color: #6f6a63;
        }

        /* Slideshow Container */
        .image_parallax-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(250, 250, 250, 0.05) 100%
          );
          backdrop-filter: blur(10px);
          aspect-ratio: 16/9;
          animation: slideInRight 1s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slideshow-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .slideshow-container:hover {
          transform: scale(1.01);
        }

        .slideshow-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          object-fit: cover;
          border-radius: 24px;
          transform: scale(1.1);
          filter: blur(2px);
        }

        .slideshow-slide.active {
          opacity: 1;
          z-index: 1;
          transform: scale(1);
          filter: blur(0);
        }

        .slideshow-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px;
          transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slideshow-slide.active img {
          transform: scale(1.02);
        }

        /* Slideshow Indicators */
        .slideshow-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 2;
        }

        .slideshow-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }

        .slideshow-indicator.active {
          background: rgba(255, 255, 255, 1);
          width: 30px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 991px) {
          .hero-wrapper {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .image_parallax-wrapper {
            aspect-ratio: 4/3;
          }
        }

        /* Enhanced Section 2 */
        .section_karriere-2 {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(250, 248, 246, 0.8) 100%
          );
          padding: 100px 0;
          position: relative;
        }

        .section_karriere-2::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 0, 0, 0.1),
            transparent
          );
        }

        /* Beautiful Image Cards */
        .karriere_image-wrapper {
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.5);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .karriere_image-wrapper:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.8);
        }

        .karriere_image-wrapper img {
          border-radius: 16px;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .karriere_image-1,
        .karriere_image-4 {
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1));
          transition: all 0.5s ease;
        }

        .karriere_image-1:hover,
        .karriere_image-4:hover {
          transform: scale(1.05) rotate(2deg);
          filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.15));
        }

        /* Enhanced Section 3 */
        .section_karriere-3 {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(250, 248, 246, 0.98) 100%
          );
          padding: 120px 0;
          position: relative;
        }

        .event_item {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.5);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .event_item:hover {
          transform: translateX(-8px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.12),
            0 0 0 1px rgba(255, 255, 255, 0.8);
        }

        .event_item-image {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
        }

        .event_item-image img {
          border-radius: 20px;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .heading-style-h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .event_item-right p {
          font-size: 1.125rem;
          line-height: 1.85;
          color: #4a4a4a;
          margin-bottom: 2rem;
        }

        /* Beautiful Decorative Elements */
        .hero-top.is-padding::after {
          content: "";
          position: absolute;
          bottom: -30px;
          right: -30px;
          width: 150px;
          height: 150px;
          background: radial-gradient(
            circle,
            rgba(255, 182, 193, 0.15) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: pulse 5s ease-in-out infinite;
          animation-delay: 1s;
          pointer-events: none;
        }

        /* Enhanced Spacing */
        .container-medium,
        .container-large {
          position: relative;
          z-index: 1;
        }

        /* Beautiful Gradient Overlays */
        .karriere_images-component {
          position: relative;
        }

        .karriere_images-component::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
          background: radial-gradient(
            circle,
            rgba(255, 182, 193, 0.05) 0%,
            transparent 70%
          );
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .karriere_images-left,
        .karriere_images-right {
          position: relative;
          z-index: 1;
        }

        /* Enhanced Mobile Responsiveness */
        @media (max-width: 768px) {
          .hero-wrapper {
            padding: 40px 24px;
            border-radius: 20px;
          }
          .section_karriere-1 {
            padding: 60px 0;
          }
          .section_karriere-2,
          .section_karriere-3 {
            padding: 60px 0;
          }
          .event_item {
            padding: 30px 24px;
          }
        }

        /* Smooth Scroll Enhancement */
        * {
          scroll-behavior: smooth;
        }

        /* Beautiful Text Shadows */
        .hero-text {
          text-shadow: 0 1px 3px rgba(255, 255, 255, 0.9);
        }

        /* Enhanced Image Borders */
        .image_parallax-wrapper::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 2px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3),
            rgba(255, 255, 255, 0.1)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .image_parallax-wrapper:hover::after {
          opacity: 1;
        }

        /* ============================================
           TEXT FORMATTING AND ALIGNMENT FIXES
           ============================================ */

        /* Hero Section Text Alignment */
        .hero-top.is-padding {
          text-align: left;
          max-width: 100%;
        }

        .hero-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Proper Text Alignment */
        .hero-text {
          text-align: justify;
          text-align-last: left;
          max-width: 100%;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        .hero-text:first-of-type {
          text-align: left;
          text-align-last: left;
        }

        /* Heading Alignment */
        .heading-style-h1 {
          text-align: left;
          max-width: 100%;
        }

        /* Hero Section Content Layout */
        @media (min-width: 768px) {
          .hero-wrapper {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
          }
          .hero-top.is-padding {
            max-width: 100%;
          }
        }

        /* Event Item Text Formatting */
        .event_item-right {
          text-align: left;
        }

        .event_item-right p {
          text-align: justify;
          text-align-last: left;
          max-width: 100%;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
          margin-bottom: 1.5rem;
          line-height: 1.85;
        }

        .event_item-right p br {
          display: block;
          content: "";
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        /* Heading Alignment in Event Item */
        .event_item-right .heading-style-h2 {
          text-align: left;
          max-width: 100%;
        }

        /* Button Alignment */
        .hero-top.is-padding .button,
        .event_item-right .button {
          display: inline-block;
          margin-top: 1rem;
          text-align: center;
        }

        /* Text Container Alignment */
        .hero-top.is-padding > * {
          text-align: left;
        }

        /* Better Paragraph Spacing */
        .hero-text + .hero-text {
          margin-top: 1.5rem;
        }

        /* Fix Long Text Wrapping */
        .hero-text,
        .event_item-right p {
          word-break: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        /* Container Alignment */
        .container-medium,
        .container-large {
          text-align: left;
        }

        /* Event Item Layout */
        .event_item.is-right {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }

        .event_item-left {
          order: 1;
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

        .event_item-right {
          order: 2;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
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

        @media (min-width: 992px) {
          .event_item.is-right {
            gap: 2.5rem;
          }
        }

        /* Hero Text Responsive Alignment */
        @media (max-width: 767px) {
          .hero-wrapper {
            display: flex;
            flex-direction: column;
          }
          .hero-text {
            text-align: left;
            text-align-last: left;
          }
          .heading-style-h1 {
            text-align: left;
          }
        }

        /* Fix Text Overflow */
        p {
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        /* Remove forced line breaks spacing issues */
        .event_item-right p br + br {
          display: none;
        }

        .event_item-right p br:after {
          content: "";
          display: block;
          margin-top: 1rem;
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
                    className="navbar_link w-nav-link"
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
                    aria-current="page"
                    className="navbar_link w-nav-link w--current"
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
          <header className="section_karriere-1">
            <div className="padding-global">
              <div className="container-medium">
                <div className="hero-wrapper">
                  <div className="hero-top is-padding">
                    <h1
                      data-w-id="9291d96c-5c15-29e4-4bb3-0f27fd237c4e"
                      className="heading-style-h1"
                    >
                      Werde Teil unserer Familie
                    </h1>
                    <p
                      data-w-id="57a303f6-6aa9-4224-8d94-06f613ef73d3"
                      className="hero-text hero-text-animated"
                    >
                      Unsere Mitarbeiter sind das Herz unseres Erfolgs
                    </p>
                    <p className="hero-text hero-text-animated hero-text-secondary">
                      Hier stehen unsere Mitarbeiter im Mittelpunkt unseres
                      Handelns. Ihre Zufriedenheit und ihr Wohlbefinden sind für
                      uns von zentraler Bedeutung – denn wir glauben, dass der
                      wahre Erfolg eines Unternehmens die Summe der Menschen
                      ist, die dahinterstehen.
                    </p>
                    <p className="hero-text hero-text-animated hero-text-tertiary">
                      Wir sind stets auf der Suche nach leidenschaftlichen,
                      engagierten und motivierten Persönlichkeiten, die
                      gemeinsam mit uns wachsen und wirklich etwas bewegen
                      möchten.
                    </p>
                    <a
                      data-w-id="c37b513f-b1b5-9dff-ac23-f381e945131c"
                      href="/kontakt"
                      className="button is-pink w-button"
                    >
                      Offene Positionen
                    </a>
                  </div>
                  <div
                    data-w-id="cd06f466-e0d8-86bd-9098-978670a4faa1"
                    className="image_parallax-wrapper"
                  >
                    <div
                      className="slideshow-container"
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                    >
                      {slides.map((slide, index) => (
                        <div
                          key={index}
                          className={`slideshow-slide ${
                            index === currentSlide ? "active" : ""
                          }`}
                        >
                          <Image
                            src={slide}
                            loading={index === 0 ? "eager" : "lazy"}
                            sizes="(max-width: 1946px) 100vw, 1946px"
                            alt={`Career image ${
                              index + 1
                            } - Das Service-Team der Taj Mahal Trattoria`}
                            className="image_parallax is-jpf"
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                      <div className="slideshow-indicators">
                        {slides.map((_, index) => (
                          <div
                            key={index}
                            className={`slideshow-indicator ${
                              index === currentSlide ? "active" : ""
                            }`}
                            onClick={() => handleSlideChange(index)}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="section_karriere-2">
            <div className="padding-global">
              <div className="karriere_images-component">
                <div
                  id="w-node-_813ba5c3-2845-0bbb-53c9-2f6875f59609-04a9f370"
                  className="karriere_images-left"
                >
                  <Image
                    src="/images/inthali.png"
                    loading="lazy"
                    data-w-id="5bd5f6dc-8160-330d-3da1-fd77d9f93657"
                    alt="Illustration einer fröhlichen Comicfigur mit Spaghetti und Schriftzug ‚Dolce Far Niente' – verspieltes Taj Mahal-Motiv im Retro-Stil."
                    className="karriere_image-1"
                    width={400}
                    height={400}
                  />
                  <div
                    data-w-id="85183d07-0140-b9a5-e6bb-055406c52eaa"
                    className="karriere_image-wrapper"
                  >
                    <Image
                      className="karriere_image-3"
                      src="/images/career3.png"
                      alt="Köchin der Taj Mahal Trattoria lächelt in die Kamera und präsentiert stolz ein angerichtetes Gericht mit Rucola und Rindfleisch – Einblick hinter die Kulissen der Küche."
                      sizes="(max-width: 854px) 100vw, 854px"
                      data-w-id="7d38b233-a1bb-c71e-98b8-62f5fecf7d34"
                      loading="lazy"
                      width={854}
                      height={570}
                    />
                  </div>
                </div>
                <div className="karriere_images-right">
                  <div
                    data-w-id="5274c26e-7404-cdea-c04e-f34aee2c9edb"
                    className="karriere_image-wrapper"
                  >
                    <Image
                      className="karriere_image-2"
                      src="/images/career2.png"
                      alt="Barkeeper der Taj Mahal Trattoria beim Mixen eines Drinks – Eiswürfel fliegen durch die Luft, während er mit dem Shaker arbeitet – Actionmoment an der Bar."
                      sizes="(max-width: 854px) 100vw, 854px"
                      data-w-id="d27680b7-e0a9-dcab-d02d-9e787ff21395"
                      loading="lazy"
                      width={854}
                      height={570}
                    />
                  </div>
                  <Image
                    src="/images/food.png"
                    sizes="(max-width: 765px) 100vw, 765px"
                    alt="Illustration einer Zitrusfrucht mit Blättern, spiralförmig geschälter Schale und aufgeschnittener Hälfte – botanisches Motiv im Vintage-Stil."
                    className="karriere_image-4"
                    width={765}
                    height={765}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="section_karriere-3">
            <div className="padding-global">
              <div className="container-large">
                <div className="event_item is-right">
                  <div className="event_item-left">
                    <Image
                      src="/images/taj-mahal-tshirt.png"
                      loading="lazy"
                      sizes="(max-width: 1536px) 100vw, 1536px"
                      alt="Servicekraft im Taj Mahal Restaurant mit aufgesticktem Logo auf der Rückenpartie der Uniform – stilvoll balanciert sie mehrere Weingläser mit der Hand."
                      className="event_item-image"
                      width={1536}
                      height={1024}
                    />
                    <div className="event_item-color_wrapper">
                      <div className="event_item-color"></div>
                    </div>
                  </div>
                  <div className="event_item-right">
                    <h2 className="heading-style-h2">
                      wir freuen uns auf dich
                    </h2>
                    <p>
                      Wir bieten eine Vielzahl interessanter
                      Arbeitsmöglichkeiten und sind immer auf der Suche nach
                      aufgeschlossenen Menschen mit Teamgeist, großer Lust, ihr
                      Wissen zu erweitern und sich persönlich
                      weiterzuentwickeln. <br />
                      <br />
                      Bringst Du Fachwissen, den Willen, etwas zu bewegen und
                      eine gesunde Portion Coolness mit und hast Lust, den Weg
                      gemeinsam mit uns gehen, freuen wir uns auf Deine
                      aussagekräftigen Bewerbungsunterlagen mit Deinem
                      frühestmöglichen Eintrittsdatum und Deine
                      Gehaltsvorstellungen an jobs@thebellezzagroup.com
                      <br />
                      <br />
                      Werde Teil der Taj Mahal Familie – wir freuen uns auf
                      Dich!
                    </p>
                    <a
                      data-w-id="c9541822-52d2-0600-6cb4-d8debf84969e"
                      href="/kontakt"
                      className="button w-button"
                    >
                      offene positionen
                    </a>
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
