import {
  Heading,
  Text,
  Column,
  Row,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { ContactForm } from "@/components/forms/ContactForm";
import { person, baseURL } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: "Contact Us - BumiAuto",
    description: "Get in touch with BumiAuto. We're here to help with your financing needs and answer any questions you may have.",
    baseURL: baseURL,
    path: "/contact",
    image: "/images/og/contact.jpg",
  });
}

export default function Contact() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/contact"
        title="Contact BumiAuto"
        description="Get in touch with BumiAuto for financing inquiries and support"
      />
      
      <Column maxWidth="s" gap="32" fillWidth>
        {/* Header */}
        <Column gap="16" align="center">
          <Heading wrap="balance" variant="display-strong-l">
            Get in Touch
          </Heading>
          <Text wrap="balance" onBackground="neutral-weak" variant="body-default-l" align="center">
            Have questions? We're here to help. Send us a message and we'll respond within 24 hours.
          </Text>
        </Column>

        {/* Contact Info Cards */}
        <Row gap="16" s={{ direction: "column" }}>
          <Column
            gap="8"
            flex={1}
            padding="16"
            border="neutral-alpha-medium"
            radius="l"
          >
            <Text variant="label-default-s" onBackground="brand-medium">
              📧 Email
            </Text>
            <Text variant="body-default-m" onBackground="neutral-strong">
              {person.email}
            </Text>
          </Column>

          <Column
            gap="8"
            flex={1}
            padding="16"
            border="neutral-alpha-medium"
            radius="l"
          >
            <Text variant="label-default-s" onBackground="brand-medium">
              📱 WhatsApp
            </Text>
            <Text variant="body-default-m" onBackground="neutral-strong">
              +60 12-345 6789
            </Text>
          </Column>

          <Column
            gap="8"
            flex={1}
            padding="16"
            border="neutral-alpha-medium"
            radius="l"
          >
            <Text variant="label-default-s" onBackground="brand-medium">
              📍 Location
            </Text>
            <Text variant="body-default-m" onBackground="neutral-strong">
              Kuala Lumpur, Malaysia
            </Text>
          </Column>
        </Row>

        {/* Contact Form */}
        <Column
          gap="24"
          padding="24"
          border="neutral-alpha-medium"
          radius="l"
          background="page"
        >
          <Heading as="h2" variant="heading-strong-l">
            Send us a message
          </Heading>
          <ContactForm />
        </Column>

        {/* Additional Info */}
        <Column gap="12" align="center">
          <Text variant="body-default-s" onBackground="neutral-weak" align="center">
            For loan applications, please use our dedicated{" "}
            <a href="/" style={{ color: "var(--brand-on-background-medium)", textDecoration: "underline" }}>
              loan inquiry form
            </a>
            .
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak" align="center">
            Business hours: Monday - Friday, 9:00 AM - 6:00 PM (MYT)
          </Text>
        </Column>
      </Column>
    </Column>
  );
}
