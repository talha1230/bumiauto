import Link from "next/link";
import { Row, Column, IconButton, Text, Flex, Button } from "@once-ui-system/core";
import { social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
    services: [
      { label: "Motorcycle Loans", href: "/services#motorcycle" },
      { label: "Consumer Financing", href: "/services#consumer" },
      { label: "Flexible Plans", href: "/services#flexible" },
    ],
    resources: [
      { label: "FAQs", href: "/about#faq" },
      { label: "Apply Now", href: "/contact" },
      { label: "How It Works", href: "/services#flexible" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  return (
    <footer className={styles.footer} style={{ position: "relative", zIndex: 10 }}>
      <Flex
        fillWidth
        maxWidth="xl"
        paddingX="l"
        paddingY="xl"
        direction="column"
        gap="xl"
      >
        {/* Main Footer Content */}
        <div className={styles.footerGrid}>
          {/* Company Info */}
          <Column gap="16" className={styles.fadeInUp}>
            <Text variant="heading-strong-l" onBackground="neutral-strong">
              BumiAuto
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Redefining microloans and financial access in Malaysia. Fast motorcycle loans and consumer financing with flexible terms.
            </Text>
            <Row gap="12" marginTop="8">
              {social.map(
                (item) =>
                  item.link && (
                    <IconButton
                      key={item.name}
                      href={item.link}
                      icon={item.icon}
                      tooltip={item.name}
                      size="m"
                      variant="ghost"
                      className={styles.socialIcon}
                    />
                  ),
              )}
            </Row>
            <Button
              href="/contact"
              variant="primary"
              size="m"
              style={{ marginTop: "8px", width: "fit-content" }}
            >
              Apply Now
            </Button>
          </Column>

          {/* Company Links */}
          <Column gap="12" className={styles.fadeInUp}>
            <Text variant="label-strong-s" onBackground="neutral-medium">
              Company
            </Text>
            {footerLinks.company.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {link.label}
                </Text>
              </Link>
            ))}
          </Column>

          {/* Services Links */}
          <Column gap="12" className={styles.fadeInUp}>
            <Text variant="label-strong-s" onBackground="neutral-medium">
              Services
            </Text>
            {footerLinks.services.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {link.label}
                </Text>
              </Link>
            ))}
          </Column>

          {/* Resources Links */}
          <Column gap="12" className={styles.fadeInUp}>
            <Text variant="label-strong-s" onBackground="neutral-medium">
              Resources
            </Text>
            {footerLinks.resources.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {link.label}
                </Text>
              </Link>
            ))}
          </Column>

          {/* Legal Links */}
          <Column gap="12" className={styles.fadeInUp}>
            <Text variant="label-strong-s" onBackground="neutral-medium">
              Legal
            </Text>
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {link.label}
                </Text>
              </Link>
            ))}
          </Column>
        </div>

        {/* Bottom Bar */}
        <Flex
          fillWidth
          paddingTop="l"
          gap="16"
          horizontal="between"
          vertical="center"
          style={{ borderTop: "1px solid var(--neutral-alpha-medium)" }}
        >
          <Column gap="8">
            <Text variant="body-default-xs" onBackground="neutral-weak">
              © {currentYear} BumiAuto. All rights reserved.
            </Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Licensed by Bank Negara Malaysia
            </Text>
          </Column>
          <Text variant="body-default-xs" onBackground="neutral-weak">
            Made with ❤️ in Malaysia
          </Text>
        </Flex>
      </Flex>
    </footer>
  );
};
