"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TopNavbar from "../../components/TopNavbar";

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

      <TopNavbar />

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
