"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button, Flex, Row, Text } from "@once-ui-system/core";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Text variant="heading-strong-l" onBackground="neutral-strong">
            BumiAuto
          </Text>
        </Link>

        {/* Desktop Navigation - Center */}
        <div className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  ? styles.active
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side: Theme Toggle + CTA */}
        <div className={styles.rightSection}>
          <ThemeToggle />
          <div className={styles.ctaButton}>
            <Button
              href="/apply"
              variant="primary"
              size="m"
            >
              Apply Now
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ""}`}>
        <div className={styles.mobileMenuContent}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  ? styles.active
                  : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileThemeToggle}>
            <ThemeToggle />
          </div>
          <div className={styles.mobileCta}>
            <Button
              href="/apply"
              variant="primary"
              size="l"
              fillWidth
              onClick={() => setMobileMenuOpen(false)}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileMenuOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMobileMenuOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}
    </header>
  );
};
