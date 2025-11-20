"use client";

import { useState, useEffect } from "react";
import { Button } from "@once-ui-system/core";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "60123456789";
  const message = encodeURIComponent("Hi BumiAuto! I'm interested in learning more about your financing options.");

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="whatsapp-float-button"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#25D366",
        color: "white",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.8)",
        transition: "all 0.3s ease",
        pointerEvents: isVisible ? "auto" : "none",
      }}
      aria-label="Contact us on WhatsApp"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <title>WhatsApp Icon</title>
        <path
          d="M16 0C7.164 0 0 7.164 0 16c0 2.824.736 5.488 2.024 7.796L0 32l8.408-2.008A15.892 15.892 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm8.092 22.664c-.348.984-2.02 1.8-2.932 1.912-.788.092-1.82.136-2.944-.184-.684-.196-1.56-.456-2.68-.896-4.684-1.84-7.732-6.568-7.968-6.868-.232-.3-1.904-2.532-1.904-4.828 0-2.296 1.208-3.428 1.636-3.892.428-.464.936-.58 1.248-.58.312 0 .624.004.896.016.288.012.672-.108 1.052.8.388.92 1.324 3.228 1.44 3.464.116.236.192.512.036.812-.152.3-.228.488-.452.748-.224.26-.472.58-.672.78-.224.224-.456.464-.196.912.26.448 1.156 1.908 2.484 3.088 1.708 1.52 3.148 1.992 3.596 2.216.448.224.708.188.968-.116.26-.304.932-1.088 1.18-1.464.248-.376.496-.312.836-.188.34.124 2.16 1.02 2.532 1.204.372.184.62.276.712.428.092.152.092.876-.256 1.86z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
