import {
  Button,
  Flex,
  Heading,
  Text,
  RevealFx,
  Column,
  Row,
  Icon,
  Avatar,
} from "@once-ui-system/core";
import { routes, home } from "@/resources";

// Features data
const features = [
  {
    icon: "bolt",
    title: "Fast Approval",
    description: "Get approved within 24-48 hours with minimal documentation",
  },
  {
    icon: "shield",
    title: "Secure & Licensed",
    description: "Fully compliant with Malaysian financial regulations",
  },
  {
    icon: "wallet",
    title: "Flexible Terms",
    description: "Customized repayment plans that fit your budget",
  },
  {
    icon: "phone",
    title: "24/7 Support",
    description: "Dedicated support team ready to assist you anytime",
  },
];

// Services data
const services = [
  {
    title: "Motorcycle Loans",
    description:
      "Get your dream motorcycle with our fast and flexible financing. Perfect for daily commute and delivery riders.",
    features: ["Quick approval", "Low interest rates", "Flexible tenure"],
    href: "/services#motorcycle",
  },
  {
    title: "Consumer Financing",
    description:
      "Finance home appliances, electronics, and essential items with easy monthly installments.",
    features: ["No hidden fees", "Easy application", "Same-day approval"],
    href: "/services#consumer",
  },
];

// How it works steps
const steps = [
  {
    step: "01",
    title: "Apply Online",
    description: "Fill out our simple online form with your basic information",
  },
  {
    step: "02",
    title: "Quick Review",
    description: "Our team reviews your application within 24-48 hours",
  },
  {
    step: "03",
    title: "Get Approved",
    description: "Receive approval notification via SMS and email",
  },
  {
    step: "04",
    title: "Get Funded",
    description: "Funds disbursed quickly so you can make your purchase",
  },
];

// Stats data
const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "RM50M+", label: "Loans Disbursed" },
  { value: "24hrs", label: "Avg. Approval Time" },
  { value: "4.8★", label: "Customer Rating" },
];

export default function Home() {
  return (
    <Flex fillWidth direction="column" horizontal="center" flex={1}>
      {/* Hero Section */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
        gap="xl"
        style={{ minHeight: "80vh" }}
      >
        <Column
          maxWidth="l"
          fillWidth
          gap="32"
          horizontal="center"
          align="center"
          paddingY="xl"
        >
          {/* Badge */}
          <RevealFx translateY="4">
            <Flex
              paddingX="16"
              paddingY="8"
              radius="full"
              border="brand-alpha-medium"
              background="brand-alpha-weak"
              horizontal="center"
            >
              <Text variant="label-default-s" onBackground="brand-medium">
                ✓ Licensed & Trusted in Malaysia
              </Text>
            </Flex>
          </RevealFx>

          {/* Main Headline */}
          <RevealFx translateY="8" delay={0.1}>
            <Heading
              wrap="balance"
              variant="display-strong-xl"
              align="center"
              style={{ maxWidth: "900px" }}
            >
              {home.headline}
            </Heading>
          </RevealFx>

          {/* Subheadline */}
          <RevealFx translateY="12" delay={0.2}>
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-l"
              align="center"
              style={{ maxWidth: "600px" }}
            >
              {home.subline}
            </Text>
          </RevealFx>

          {/* CTA Buttons */}
          <RevealFx translateY="16" delay={0.3}>
            <Flex gap="16" wrap horizontal="center">
              {routes["/apply"] && (
                <Button href="/apply" variant="primary" size="l">
                  Apply Now
                </Button>
              )}
              {routes["/services"] && (
                <Button href="/services" variant="secondary" size="l">
                  Our Services
                </Button>
              )}
            </Flex>
          </RevealFx>

          {/* Trust Indicators */}
          <RevealFx translateY="20" delay={0.4}>
            <Row gap="24" wrap horizontal="center" marginTop="16">
              <Row gap="8" vertical="center">
                <Icon name="check" size="s" onBackground="brand-medium" />
                <Text variant="body-default-s" onBackground="neutral-weak">
                  No Hidden Fees
                </Text>
              </Row>
              <Row gap="8" vertical="center">
                <Icon name="check" size="s" onBackground="brand-medium" />
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Quick Disbursement
                </Text>
              </Row>
              <Row gap="8" vertical="center">
                <Icon name="check" size="s" onBackground="brand-medium" />
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Flexible Repayment
                </Text>
              </Row>
            </Row>
          </RevealFx>
        </Column>
      </Flex>

      {/* Stats Section */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
        background="neutral-alpha-weak"
      >
        <Column maxWidth="l" fillWidth gap="32">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <RevealFx key={stat.label} translateY="8" delay={index * 0.1}>
                <Column
                  horizontal="center"
                  align="center"
                  gap="8"
                  padding="24"
                  fillWidth
                >
                  <Text variant="display-strong-l" onBackground="brand-strong">
                    {stat.value}
                  </Text>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {stat.label}
                  </Text>
                </Column>
              </RevealFx>
            ))}
          </div>
        </Column>
      </Flex>

      {/* Features Section */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
      >
        <Column maxWidth="l" fillWidth gap="48">
          <Column gap="16" horizontal="center" align="center">
            <Text variant="label-strong-s" onBackground="brand-medium">
              WHY CHOOSE US
            </Text>
            <Heading variant="display-strong-m" align="center">
              Built for Malaysians, by Malaysians
            </Heading>
            <Text
              variant="body-default-l"
              onBackground="neutral-weak"
              align="center"
              style={{ maxWidth: "600px" }}
            >
              We understand the financial needs of middle-class Malaysians and
              provide accessible solutions that work for you.
            </Text>
          </Column>

          <div className="grid-cards">
            {features.map((feature, index) => (
              <RevealFx key={feature.title} translateY="16" delay={index * 0.1}>
                <Column
                  gap="16"
                  padding="24"
                  radius="l"
                  border="neutral-alpha-weak"
                  background="surface"
                  fillWidth
                  className="card"
                >
                  <Flex
                    width="48"
                    height="48"
                    radius="m"
                    background="brand-alpha-weak"
                    horizontal="center"
                    vertical="center"
                  >
                    <Icon name={feature.icon} size="m" onBackground="brand-medium" />
                  </Flex>
                  <Column gap="8">
                    <Text variant="heading-strong-m">{feature.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {feature.description}
                    </Text>
                  </Column>
                </Column>
              </RevealFx>
            ))}
          </div>
        </Column>
      </Flex>

      {/* Services Section */}
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
          <Column gap="16" horizontal="center" align="center">
            <Text variant="label-strong-s" onBackground="brand-medium">
              OUR SERVICES
            </Text>
            <Heading variant="display-strong-m" align="center">
              Financing Solutions for Your Needs
            </Heading>
          </Column>

          <div className="grid-cards-2">
            {services.map((service, index) => (
              <RevealFx key={service.title} translateY="16" delay={index * 0.15}>
                <Column
                  gap="24"
                  padding="32"
                  radius="l"
                  border="neutral-alpha-weak"
                  background="page"
                  fillWidth
                  className="card"
                >
                  <Column gap="12">
                    <Text variant="heading-strong-l">{service.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {service.description}
                    </Text>
                  </Column>

                  <Column gap="8">
                    {service.features.map((feat) => (
                      <Row key={feat} gap="8" vertical="center">
                        <Icon name="check" size="s" onBackground="brand-medium" />
                        <Text variant="body-default-s">{feat}</Text>
                      </Row>
                    ))}
                  </Column>

                  <Button href={service.href} variant="secondary" size="m">
                    Learn More
                  </Button>
                </Column>
              </RevealFx>
            ))}
          </div>
        </Column>
      </Flex>

      {/* How It Works Section */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
      >
        <Column maxWidth="l" fillWidth gap="48">
          <Column gap="16" horizontal="center" align="center">
            <Text variant="label-strong-s" onBackground="brand-medium">
              HOW IT WORKS
            </Text>
            <Heading variant="display-strong-m" align="center">
              Get Funded in 4 Simple Steps
            </Heading>
          </Column>

          <div className="grid-cards-4">
            {steps.map((step, index) => (
              <RevealFx key={step.step} translateY="16" delay={index * 0.1}>
                <Column
                  gap="16"
                  padding="24"
                  horizontal="center"
                  align="center"
                  fillWidth
                >
                  <Text
                    variant="display-strong-l"
                    onBackground="brand-weak"
                    style={{ opacity: 0.5 }}
                  >
                    {step.step}
                  </Text>
                  <Text variant="heading-strong-m" align="center">
                    {step.title}
                  </Text>
                  <Text
                    variant="body-default-m"
                    onBackground="neutral-weak"
                    align="center"
                  >
                    {step.description}
                  </Text>
                </Column>
              </RevealFx>
            ))}
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
          gap="32"
          horizontal="center"
          align="center"
          paddingY="xl"
        >
          <Heading variant="display-strong-m" align="center">
            Ready to Get Started?
          </Heading>
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
            style={{ maxWidth: "500px" }}
          >
            Apply now and get approved within 24-48 hours. No hidden fees, no
            surprises – just simple, accessible financing.
          </Text>
          <Flex gap="16" wrap horizontal="center">
            <Button href="/apply" variant="primary" size="l">
              Apply Now
            </Button>
            <Button
              href="https://wa.me/60123456789"
              variant="secondary"
              size="l"
            >
              WhatsApp Us
            </Button>
          </Flex>
        </Column>
      </Flex>
    </Flex>
  );
}
