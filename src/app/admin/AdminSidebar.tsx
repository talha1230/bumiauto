"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import styles from "./admin.module.css";

interface AdminSidebarProps {
  email: string;
  pendingCount?: number;
  pendingCommentsCount?: number;
}

export function AdminSidebar({ email, pendingCount = 0, pendingCommentsCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    closeSidebar();
  }, [closeSidebar]);

  // Close sidebar on window resize (when going to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/inquiries", label: "Inquiries", icon: "📧", badge: pendingCount > 0 ? pendingCount : undefined },
    { href: "/admin/comments", label: "Comments", icon: "💬", badge: pendingCommentsCount > 0 ? pendingCommentsCount : undefined },
    { href: "/admin/blog", label: "Blog", icon: "📝" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(href);
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={handleOverlayClick}
        onKeyDown={handleOverlayKeyDown}
        role="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close sidebar"
      />

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        {/* Close button for mobile */}
        <button
          type="button"
          className={styles.sidebarCloseButton}
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Header */}
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>
            <span>🚗</span> BumiAuto
          </h2>
          <p className={styles.sidebarEmail}>{email}</p>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive(item.href) ? styles.navLinkActive : ""}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
              {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <a href="/" className={styles.navLink} target="_blank" rel="noopener noreferrer">
            <span className={styles.navIcon}>🌐</span>
            View Website
          </a>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className={styles.logoutButton}>
              <span>🚪</span>
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className={styles.mobileMenuButton}
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>
    </>
  );
}
