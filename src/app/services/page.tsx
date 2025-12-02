import {
  Column,
  Heading,
  Meta,
  Text,
  Flex,
  Row,
  Icon,
  RevealFx,
  Button,
} from "@once-ui-system/core";
import { baseURL, work } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

// Main services
const services = [
  {
    id: "motorcycle",
    icon: "bike",
    title: "Motorcycle Loans",
    subtitle: "Fast & Flexible Financing",
    description:
      "Get your dream motorcycle with our competitive financing options. Perfect for daily commuters, delivery riders, and anyone who needs reliable transportation.",
    features: [
      "Loan amounts from RM3,000 to RM30,000",
      "Flexible tenure from 12 to 60 months",
      "Competitive interest rates starting from 4.5% p.a.",
      "Quick approval within 24-48 hours",
      "Minimal documentation required",
      "No guarantor needed for qualified applicants",
    ],
    benefits: [
      { icon: "clock", text: "Same-day approval for qualified applicants" },
      { icon: "percent", text: "Low monthly installments" },
      { icon: "shield", text: "Insurance options available" },
    ],
  },
  {
    id: "consumer",
    icon: "home",
    title: "Consumer Durable Financing",
    subtitle: "Affordable Payment Plans",
    description:
      "Finance home appliances, electronics, furniture, and other essential items with easy monthly installments. Make big purchases without the big upfront cost.",
    features: [
      "Financing from RM500 to RM20,000",
      "Flexible repayment from 6 to 36 months",
      "0% interest promotions with select partners",
      "Wide network of retail partners",
      "Easy in-store application",
      "Instant approval at participating stores",
    ],
    benefits: [
      { icon: "shoppingCart", text: "Buy now, pay over time" },
      { icon: "tag", text: "Exclusive promotions" },
      { icon: "store", text: "Wide partner network" },
    ],
  },
];

// Eligibility criteria
const eligibility = [
  {
    icon: "user",
    title: "Malaysian Citizen",
    description: "Must be a Malaysian citizen with valid MyKad",
  },
  {
    icon: "calendar",
    title: "Age 21-60",
    description: "Applicants must be between 21 and 60 years old",
  },
  {
    icon: "briefcase",
    title: "Stable Income",
    description: "Minimum monthly income of RM1,500",
  },
  {
    icon: "fileText",
    title: "Basic Documents",
    description: "IC, income proof, and bank statements",
  },
];

// Process steps
const processSteps = [
  {
    step: "1",
    title: "Choose Your Product",
    description:
      "Select the motorcycle or item you want to finance from our partner network",
  },
  {
    step: "2",
    title: "Submit Application",
    description:
      "Fill out our simple online form or apply in-store with basic documents",
  },
  {
    step: "3",
    title: "Quick Approval",
    description: "Get approved within 24-48 hours with instant notification",
  },
  {
    step: "4",
    title: "Collect Your Purchase",
    description:
      "Complete the agreement and collect your motorcycle or product",
  },
];

// Partner types
const partners = [
  { name: "Motorcycle Dealers", count: "50+" },
  { name: "Electronics Stores", count: "100+" },
  { name: "Furniture Retailers", count: "30+" },
  { name: "Appliance Shops", count: "80+" },
];

export default function Services() {
  return (
    <Flex fillWidth direction="column" horizontal="center">
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
          paddingY="xl"
        >
          <RevealFx translateY="4">
            <Text variant="label-strong-s" onBackground="brand-medium">
              OUR SERVICES
            </Text>
          </RevealFx>
          <RevealFx translateY="8" delay={0.1}>
            <Heading
              variant="display-strong-xl"
              align="center"
              style={{ maxWidth: "800px" }}
            >
              Financing Solutions for Every Need
            </Heading>
          </RevealFx>
          <RevealFx translateY="12" delay={0.2}>
            <Text
              variant="heading-default-l"
              onBackground="neutral-weak"
              align="center"
              style={{ maxWidth: "600px" }}
            >
              Flexible, affordable financing options designed to help you
              achieve your goals without the financial stress.
            </Text>
          </RevealFx>
        </Column>
      </Flex>

      {/* Services Detail Sections */}
      {services.map((service, serviceIndex) => (
        <Flex
          key={service.id}
          as="section"
          id={service.id}
          fillWidth
          direction="column"
          horizontal="center"
          paddingX="l"
          paddingY="xl"
          background={serviceIndex % 2 === 0 ? "neutral-alpha-weak" : "page"}
        >
          <Column maxWidth="l" fillWidth gap="48">
            <Row fillWidth wrap gap="48" vertical="start">
              {/* Service Info */}
              <Column gap="24" style={{ flex: "1 1 400px" }}>
                <RevealFx translateY="8">
                  <Flex
                    width="64"
                    height="64"
                    radius="l"
                    background="brand-alpha-weak"
                    horizontal="center"
                    vertical="center"
                  >
                    <Icon name={service.icon} size="l" onBackground="brand-medium" />
                  </Flex>
                </RevealFx>
                <RevealFx translateY="12" delay={0.1}>
                  <Column gap="8">
                    <Text variant="label-default-s" onBackground="brand-medium">
                      {service.subtitle}
                    </Text>
                    <Heading variant="display-strong-m">{service.title}</Heading>
                  </Column>
                </RevealFx>
                <RevealFx translateY="16" delay={0.2}>
                  <Text variant="body-default-l" onBackground="neutral-weak">
                    {service.description}
                  </Text>
                </RevealFx>

                {/* Benefits */}
                <RevealFx translateY="20" delay={0.3}>
                  <Row gap="16" wrap>
                    {service.benefits.map((benefit) => (
                      <Row
                        key={benefit.text}
                        gap="8"
                        vertical="center"
                        paddingX="12"
                        paddingY="8"
                        radius="m"
                        background="surface"
                        border="neutral-alpha-weak"
                      >
                        <Icon
                          name={benefit.icon}
                          size="s"
                          onBackground="brand-medium"
                        />
                        <Text variant="body-default-s">{benefit.text}</Text>
                      </Row>
                    ))}
                  </Row>
                </RevealFx>

                <RevealFx translateY="24" delay={0.4}>
                  <Button href="/contact" variant="primary" size="l">
                    Apply for {service.title}
                  </Button>
                </RevealFx>
              </Column>

              {/* Features List */}
              <Column gap="16" style={{ flex: "1 1 350px" }}>
                <RevealFx translateY="8" delay={0.2}>
                  <Text variant="heading-strong-m">Features & Terms</Text>
                </RevealFx>
                <Column gap="12">
                  {service.features.map((feature, index) => (
                    <RevealFx
                      key={feature}
                      translateY="8"
                      delay={0.3 + index * 0.05}
                    >
                      <Row gap="12" vertical="center">
                        <Flex
                          width="24"
                          height="24"
                          radius="full"
                          background="brand-alpha-weak"
                          horizontal="center"
                          vertical="center"
                          style={{ flexShrink: 0 }}
                        >
                          <Icon
                            name="check"
                            size="xs"
                            onBackground="brand-medium"
                          />
                        </Flex>
                        <Text variant="body-default-m">{feature}</Text>
                      </Row>
                    </RevealFx>
                  ))}
                </Column>
              </Column>
            </Row>
          </Column>
        </Flex>
      ))}

      {/* Eligibility Section */}
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
              ELIGIBILITY
            </Text>
            <Heading variant="display-strong-m" align="center">
              Who Can Apply?
            </Heading>
            <Text
              variant="body-default-l"
              onBackground="neutral-weak"
              align="center"
              style={{ maxWidth: "600px" }}
            >
              Our financing is designed for working Malaysians. Check if you
              meet our simple eligibility criteria.
            </Text>
          </Column>

          <Row fillWidth wrap gap="24" horizontal="center">
            {eligibility.map((item, index) => (
              <RevealFx key={item.title} translateY="16" delay={index * 0.1}>
                <Column
                  gap="16"
                  padding="24"
                  radius="l"
                  border="neutral-alpha-weak"
                  background="surface"
                  horizontal="center"
                  align="center"
                  style={{ flex: "1 1 220px", maxWidth: "280px" }}
                >
                  <Flex
                    width="48"
                    height="48"
                    radius="m"
                    background="brand-alpha-weak"
                    horizontal="center"
                    vertical="center"
                  >
                    <Icon name={item.icon} size="m" onBackground="brand-medium" />
                  </Flex>
                  <Column gap="8" horizontal="center" align="center">
                    <Text variant="heading-strong-m">{item.title}</Text>
                    <Text
                      variant="body-default-s"
                      onBackground="neutral-weak"
                      align="center"
                    >
                      {item.description}
                    </Text>
                  </Column>
                </Column>
              </RevealFx>
            ))}
          </Row>
        </Column>
      </Flex>

      {/* Process Section */}
      <Flex
        as="section"
        id="flexible"
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
              HOW IT WORKS
            </Text>
            <Heading variant="display-strong-m" align="center">
              Simple 4-Step Process
            </Heading>
          </Column>

          <Row fillWidth wrap gap="24" horizontal="center">
            {processSteps.map((step, index) => (
              <RevealFx key={step.step} translateY="16" delay={index * 0.1}>
                <Column
                  gap="16"
                  padding="24"
                  horizontal="center"
                  align="center"
                  style={{ flex: "1 1 220px", maxWidth: "280px" }}
                >
                  <Flex
                    width="56"
                    height="56"
                    radius="full"
                    background="brand-strong"
                    horizontal="center"
                    vertical="center"
                  >
                    <Text variant="heading-strong-l" onSolid="neutral-strong">
                      {step.step}
                    </Text>
                  </Flex>
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
          </Row>
        </Column>
      </Flex>

      {/* Partners Section */}
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
              OUR NETWORK
            </Text>
            <Heading variant="display-strong-m" align="center">
              Trusted Partner Network
            </Heading>
            <Text
              variant="body-default-l"
              onBackground="neutral-weak"
              align="center"
              style={{ maxWidth: "600px" }}
            >
              Apply at any of our authorized partner locations across Malaysia.
            </Text>
          </Column>

          <Row fillWidth wrap gap="24" horizontal="center">
            {partners.map((partner, index) => (
              <RevealFx key={partner.name} translateY="16" delay={index * 0.1}>
                <Column
                  gap="8"
                  padding="32"
                  radius="l"
                  border="neutral-alpha-weak"
                  background="surface"
                  horizontal="center"
                  align="center"
                  style={{ flex: "1 1 200px", maxWidth: "240px" }}
                >
                  <Text variant="display-strong-l" onBackground="brand-strong">
                    {partner.count}
                  </Text>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {partner.name}
                  </Text>
                </Column>
              </RevealFx>
            ))}
          </Row>
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
            Ready to Apply?
          </Heading>
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
            style={{ maxWidth: "500px" }}
          >
            Get started today with our simple online application. Approval in
            24-48 hours.
          </Text>
          <Flex gap="16" wrap horizontal="center">
            <Button href="/contact" variant="primary" size="l">
              Apply Online
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
