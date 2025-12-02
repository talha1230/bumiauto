import {
  Heading,
  Text,
  Column,
  Row,
  Schema,
  Meta,
  Flex,
  Icon,
  RevealFx,
  Button,
} from "@once-ui-system/core";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { LoanInquiryForm } from "@/components/forms/LoanInquiryForm";
import { person, baseURL } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: "Contact Us - BumiAuto",
    description:
      "Get in touch with BumiAuto. We're here to help with your financing needs and answer any questions you may have.",
    baseURL: baseURL,
    path: "/contact",
    image: "/images/og/contact.jpg",
  });
}

// Contact methods
const contactMethods = [
  {
    icon: "email",
    label: "Email Us",
    value: person.email,
    href: `mailto:${person.email}`,
    description: "We'll respond within 24 hours",
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: "+60 12-345 6789",
    href: "https://wa.me/60123456789",
    description: "Chat with us instantly",
  },
  {
    icon: "phone",
    label: "Call Us",
    value: "+60 3-1234 5678",
    href: "tel:+60312345678",
    description: "Mon-Fri, 9AM-6PM",
  },
  {
    icon: "mapPin",
    label: "Visit Us",
    value: "Kuala Lumpur, Malaysia",
    href: "#",
    description: "By appointment only",
  },
];

// Office hours
const officeHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
  { day: "Sunday & Public Holidays", hours: "Closed" },
];

export default function Contact() {
  return (
    <Flex fillWidth direction="column" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/contact"
        title="Contact BumiAuto"
        description="Get in touch with BumiAuto for financing inquiries and support"
      />

      {/* Hero Section */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
      >
        <Column
          maxWidth="l"
          fillWidth
          gap="32"
          horizontal="center"
          align="center"
          paddingY="l"
        >
          <RevealFx translateY="4">
            <Text variant="label-strong-s" onBackground="brand-medium">
              GET IN TOUCH
            </Text>
          </RevealFx>
          <RevealFx translateY="8" delay={0.1}>
            <Heading variant="display-strong-xl" align="center">
              We&apos;re Here to Help
            </Heading>
          </RevealFx>
          <RevealFx translateY="12" delay={0.2}>
            <Text
              variant="heading-default-l"
              onBackground="neutral-weak"
              align="center"
              style={{ maxWidth: "600px" }}
            >
              Have questions about our financing options? Our team is ready to
              assist you with your application or any inquiries.
            </Text>
          </RevealFx>
        </Column>
      </Flex>

      {/* Contact Methods */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="l"
      >
        <Column maxWidth="l" fillWidth>
          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => (
              <RevealFx key={method.label} translateY="16" delay={index * 0.1}>
                <Link href={method.href} style={{ textDecoration: "none", width: "100%" }}>
                  <Column
                    gap="12"
                    padding="24"
                    radius="l"
                    border="neutral-alpha-weak"
                    background="surface"
                    horizontal="center"
                    align="center"
                    fillWidth
                    className="card"
                    style={{
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Flex
                      width="48"
                      height="48"
                      radius="m"
                      background="brand-alpha-weak"
                      horizontal="center"
                      vertical="center"
                    >
                      <Icon
                        name={method.icon}
                        size="m"
                        onBackground="brand-medium"
                      />
                    </Flex>
                    <Column gap="4" horizontal="center" align="center">
                      <Text variant="label-strong-s" onBackground="brand-medium">
                        {method.label}
                      </Text>
                      <Text variant="body-default-m">{method.value}</Text>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        {method.description}
                      </Text>
                    </Column>
                  </Column>
                </Link>
              </RevealFx>
            ))}
          </div>
        </Column>
      </Flex>

      {/* Main Content: Forms */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
        background="neutral-alpha-weak"
      >
        <Column maxWidth="l" fillWidth gap="48">
          <div className="grid-cards-2">
            {/* Loan Application Form */}
            <Column
              gap="24"
              padding="32"
              radius="l"
              background="page"
              border="neutral-alpha-weak"
              fillWidth
              className="card"
            >
              <RevealFx translateY="8">
                <Column gap="8">
                  <Row gap="8" vertical="center">
                    <Icon name="fileText" size="m" onBackground="brand-medium" />
                    <Text variant="heading-strong-l">Loan Application</Text>
                  </Row>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    Ready to apply? Fill out our loan inquiry form and we&apos;ll
                    get back to you within 24-48 hours.
                  </Text>
                </Column>
              </RevealFx>
              <RevealFx translateY="12" delay={0.1}>
                <LoanInquiryForm />
              </RevealFx>
            </Column>

            {/* General Contact Form */}
            <Column
              gap="24"
              padding="32"
              radius="l"
              background="page"
              border="neutral-alpha-weak"
              fillWidth
              className="card"
            >
              <RevealFx translateY="8">
                <Column gap="8">
                  <Row gap="8" vertical="center">
                    <Icon name="message" size="m" onBackground="brand-medium" />
                    <Text variant="heading-strong-l">General Inquiry</Text>
                  </Row>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    Have questions or need support? Send us a message and we&apos;ll
                    respond within 24 hours.
                  </Text>
                </Column>
              </RevealFx>
              <RevealFx translateY="12" delay={0.1}>
                <ContactForm />
              </RevealFx>
            </Column>
          </div>
        </Column>
      </Flex>

      {/* Office Hours & Info */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
      >
        <Column maxWidth="m" fillWidth gap="48">
          <div className="grid-cards-2">
            {/* Office Hours */}
            <Column
              gap="24"
              padding="32"
              radius="l"
              border="neutral-alpha-weak"
              background="surface"
              fillWidth
              className="card"
            >
              <RevealFx translateY="8">
                <Row gap="12" vertical="center">
                  <Icon name="clock" size="m" onBackground="brand-medium" />
                  <Text variant="heading-strong-l">Office Hours</Text>
                </Row>
              </RevealFx>
              <Column gap="12">
                {officeHours.map((item, index) => (
                  <RevealFx key={item.day} translateY="8" delay={index * 0.1}>
                    <Row fillWidth horizontal="between">
                      <Text variant="body-default-m">{item.day}</Text>
                      <Text variant="body-default-m" onBackground="neutral-weak">
                        {item.hours}
                      </Text>
                    </Row>
                  </RevealFx>
                ))}
              </Column>
            </Column>

            {/* Quick Info */}
            <Column
              gap="24"
              padding="32"
              radius="l"
              border="neutral-alpha-weak"
              background="surface"
              fillWidth
              className="card"
            >
              <RevealFx translateY="8">
                <Row gap="12" vertical="center">
                  <Icon name="info" size="m" onBackground="brand-medium" />
                  <Text variant="heading-strong-l">Quick Info</Text>
                </Row>
              </RevealFx>
              <Column gap="16">
                <RevealFx translateY="8" delay={0.1}>
                  <Column gap="4">
                    <Text variant="label-strong-s" onBackground="brand-medium">
                      Response Time
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      We typically respond within 24 hours on business days.
                    </Text>
                  </Column>
                </RevealFx>
                <RevealFx translateY="8" delay={0.2}>
                  <Column gap="4">
                    <Text variant="label-strong-s" onBackground="brand-medium">
                      Loan Processing
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      Approved applications are processed within 24-48 hours.
                    </Text>
                  </Column>
                </RevealFx>
                <RevealFx translateY="8" delay={0.3}>
                  <Column gap="4">
                    <Text variant="label-strong-s" onBackground="brand-medium">
                      Support Languages
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      English and Bahasa Malaysia
                    </Text>
                  </Column>
                </RevealFx>
              </Column>
            </Column>
          </div>
        </Column>
      </Flex>

      {/* CTA Section */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
        background="brand-alpha-weak"
      >
        <Column
          maxWidth="m"
          fillWidth
          gap="24"
          horizontal="center"
          align="center"
          paddingY="l"
        >
          <Heading variant="display-strong-m" align="center">
            Prefer to Chat?
          </Heading>
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
          >
            Connect with us on WhatsApp for instant support and quick answers.
          </Text>
          <Button
            href="https://wa.me/60123456789"
            variant="primary"
            size="l"
          >
            Chat on WhatsApp
          </Button>
        </Column>
      </Flex>
    </Flex>
  );
}
