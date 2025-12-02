import {
  Column,
  Heading,
  Text,
  Meta,
  Flex,
  Row,
  Icon,
  RevealFx,
  Button,
  Avatar,
} from "@once-ui-system/core";
import { baseURL, about } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

// Company values
const values = [
  {
    icon: "heart",
    title: "Customer First",
    description:
      "We prioritize your financial well-being with personalized service and dedicated support at every step.",
  },
  {
    icon: "shield",
    title: "Trust & Transparency",
    description:
      "No hidden fees, clear terms, and honest communication. What you see is what you get.",
  },
  {
    icon: "bolt",
    title: "Innovation",
    description:
      "Leveraging AI and technology to provide seamless, fast loan applications and approvals.",
  },
  {
    icon: "users",
    title: "Inclusion",
    description:
      "Making financial services accessible to underserved B40 and M40 communities across Malaysia.",
  },
];

// Team members
const team = [
  {
    name: "Banking & Finance Expert",
    role: "Co-Founder",
    description: "15+ years experience in Malaysian banking sector",
  },
  {
    name: "Payments Specialist",
    role: "Co-Founder",
    description: "Former head of digital payments at major fintech",
  },
  {
    name: "AI & Technology Lead",
    role: "Co-Founder",
    description: "Built AI systems for financial risk assessment",
  },
  {
    name: "Startup Veteran",
    role: "Co-Founder",
    description: "Successfully scaled multiple fintech startups",
  },
];

// Milestones
const milestones = [
  {
    year: "2024",
    title: "Founded BumiAuto",
    description: "Started with a mission to bridge financial gaps in Malaysia",
  },
  {
    year: "2024",
    title: "Market Research",
    description: "Extensive study of Malaysian financial service providers",
  },
  {
    year: "2025",
    title: "Platform Launch",
    description: "Launching our digital lending platform for Malaysians",
  },
  {
    year: "2025",
    title: "Partner Network",
    description: "Building partnerships across automotive and retail sectors",
  },
];

// FAQ data
const faqs = [
  {
    question: "Who can apply for a BumiAuto loan?",
    answer:
      "Malaysian citizens aged 21-60 with a stable income can apply. We cater specifically to the B40 and M40 income groups.",
  },
  {
    question: "What documents do I need?",
    answer:
      "Basic documents include your IC, proof of income (payslip or bank statements), and proof of address. Our team will guide you through the process.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Most applications are reviewed within 24-48 hours. Once approved, funds are disbursed quickly so you can make your purchase.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "Absolutely not. We believe in full transparency. All fees and charges are clearly stated upfront before you sign any agreement.",
  },
  {
    question: "What interest rates do you offer?",
    answer:
      "Our rates are competitive and tailored to your profile. We offer flexible repayment terms that fit your income cycle.",
  },
  {
    question: "How do I make repayments?",
    answer:
      "Repayments can be made through online banking, FPX, or at selected payment counters. We also offer auto-debit options for convenience.",
  },
];

export default function About() {
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
              ABOUT BUMIAUTO
            </Text>
          </RevealFx>
          <RevealFx translateY="8" delay={0.1}>
            <Heading
              variant="display-strong-xl"
              align="center"
              style={{ maxWidth: "800px" }}
            >
              Redefining Microloans and Financial Access
            </Heading>
          </RevealFx>
          <RevealFx translateY="12" delay={0.2}>
            <Text
              variant="heading-default-l"
              onBackground="neutral-weak"
              align="center"
              style={{ maxWidth: "700px" }}
            >
              Creating future possibilities for Malaysians through accessible,
              technology-driven financial solutions.
            </Text>
          </RevealFx>
        </Column>
      </Flex>

      {/* Mission Section */}
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
          <Row fillWidth wrap gap="48" vertical="center">
            <Column gap="24" style={{ flex: "1 1 400px" }}>
              <RevealFx translateY="8">
                <Text variant="label-strong-s" onBackground="brand-medium">
                  OUR MISSION
                </Text>
              </RevealFx>
              <RevealFx translateY="12" delay={0.1}>
                <Heading variant="display-strong-m">
                  Bridging the Gap Between Communities and Financial Institutions
                </Heading>
              </RevealFx>
              <RevealFx translateY="16" delay={0.2}>
                <Text variant="body-default-l" onBackground="neutral-weak">
                  BumiAuto was founded with the mission of bridging the gap
                  between underserved communities and financial institutions,
                  focusing on providing micro-loans to the mid to low-income
                  segments.
                </Text>
              </RevealFx>
              <RevealFx translateY="20" delay={0.3}>
                <Text variant="body-default-l" onBackground="neutral-weak">
                  Recognizing motorcycles as a key asset for daily mobility,
                  especially among the B40 and M40 income groups in Malaysia,
                  BumiAuto aims to leverage this ecosystem to drive financial
                  inclusion.
                </Text>
              </RevealFx>
            </Column>

            <Column gap="16" style={{ flex: "1 1 300px" }}>
              <RevealFx translateY="8" delay={0.2}>
                <Column
                  padding="24"
                  radius="l"
                  background="page"
                  border="neutral-alpha-weak"
                  gap="12"
                >
                  <Row gap="12" vertical="center">
                    <Icon name="target" size="m" onBackground="brand-medium" />
                    <Text variant="heading-strong-m">Our Focus</Text>
                  </Row>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    Recruitment and maintenance of business partners across
                    Malaysia in automotive, electrical, and telecommunications
                    sectors.
                  </Text>
                </Column>
              </RevealFx>
              <RevealFx translateY="12" delay={0.3}>
                <Column
                  padding="24"
                  radius="l"
                  background="page"
                  border="neutral-alpha-weak"
                  gap="12"
                >
                  <Row gap="12" vertical="center">
                    <Icon name="mapPin" size="m" onBackground="brand-medium" />
                    <Text variant="heading-strong-m">Our Reach</Text>
                  </Row>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    Starting from Greater Kuala Lumpur and Selangor, expanding
                    to serve Malaysians nationwide.
                  </Text>
                </Column>
              </RevealFx>
            </Column>
          </Row>
        </Column>
      </Flex>

      {/* Values Section */}
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
              OUR VALUES
            </Text>
            <Heading variant="display-strong-m" align="center">
              What Drives Us Every Day
            </Heading>
          </Column>

          <Row fillWidth wrap gap="24" horizontal="center">
            {values.map((value, index) => (
              <RevealFx key={value.title} translateY="16" delay={index * 0.1}>
                <Column
                  gap="16"
                  padding="24"
                  radius="l"
                  border="neutral-alpha-weak"
                  background="surface"
                  style={{ flex: "1 1 280px", maxWidth: "320px" }}
                >
                  <Flex
                    width="48"
                    height="48"
                    radius="m"
                    background="brand-alpha-weak"
                    horizontal="center"
                    vertical="center"
                  >
                    <Icon name={value.icon} size="m" onBackground="brand-medium" />
                  </Flex>
                  <Column gap="8">
                    <Text variant="heading-strong-m">{value.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {value.description}
                    </Text>
                  </Column>
                </Column>
              </RevealFx>
            ))}
          </Row>
        </Column>
      </Flex>

      {/* Team Section */}
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
              OUR TEAM
            </Text>
            <Heading variant="display-strong-m" align="center">
              Experienced Leadership
            </Heading>
            <Text
              variant="body-default-l"
              onBackground="neutral-weak"
              align="center"
              style={{ maxWidth: "600px" }}
            >
              Our founding team brings together decades of experience in
              banking, payments, startups, and AI technology.
            </Text>
          </Column>

          <Row fillWidth wrap gap="24" horizontal="center">
            {team.map((member, index) => (
              <RevealFx key={member.name} translateY="16" delay={index * 0.1}>
                <Column
                  gap="16"
                  padding="24"
                  radius="l"
                  background="page"
                  border="neutral-alpha-weak"
                  horizontal="center"
                  align="center"
                  style={{ flex: "1 1 240px", maxWidth: "280px" }}
                >
                  <Flex
                    width="64"
                    height="64"
                    radius="full"
                    background="brand-alpha-weak"
                    horizontal="center"
                    vertical="center"
                  >
                    <Icon name="user" size="l" onBackground="brand-medium" />
                  </Flex>
                  <Column gap="4" horizontal="center" align="center">
                    <Text variant="heading-strong-m">{member.name}</Text>
                    <Text variant="label-default-s" onBackground="brand-medium">
                      {member.role}
                    </Text>
                    <Text
                      variant="body-default-s"
                      onBackground="neutral-weak"
                      align="center"
                    >
                      {member.description}
                    </Text>
                  </Column>
                </Column>
              </RevealFx>
            ))}
          </Row>
        </Column>
      </Flex>

      {/* Timeline Section */}
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
              OUR JOURNEY
            </Text>
            <Heading variant="display-strong-m" align="center">
              Building the Future of Finance
            </Heading>
          </Column>

          <Column fillWidth gap="24">
            {milestones.map((milestone, index) => (
              <RevealFx key={milestone.title} translateY="8" delay={index * 0.1}>
                <Row
                  fillWidth
                  gap="24"
                  padding="24"
                  radius="l"
                  border="neutral-alpha-weak"
                  background="surface"
                  vertical="center"
                >
                  <Flex
                    paddingX="16"
                    paddingY="8"
                    radius="m"
                    background="brand-alpha-weak"
                  >
                    <Text variant="label-strong-m" onBackground="brand-medium">
                      {milestone.year}
                    </Text>
                  </Flex>
                  <Column gap="4" style={{ flex: 1 }}>
                    <Text variant="heading-strong-m">{milestone.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {milestone.description}
                    </Text>
                  </Column>
                </Row>
              </RevealFx>
            ))}
          </Column>
        </Column>
      </Flex>

      {/* FAQ Section */}
      <Flex
        as="section"
        id="faq"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
        background="neutral-alpha-weak"
      >
        <Column maxWidth="m" fillWidth gap="48">
          <Column gap="16" horizontal="center" align="center">
            <Text variant="label-strong-s" onBackground="brand-medium">
              FAQ
            </Text>
            <Heading variant="display-strong-m" align="center">
              Frequently Asked Questions
            </Heading>
          </Column>

          <Column fillWidth gap="16">
            {faqs.map((faq, index) => (
              <RevealFx key={faq.question} translateY="8" delay={index * 0.05}>
                <Column
                  padding="24"
                  radius="l"
                  background="page"
                  border="neutral-alpha-weak"
                  gap="12"
                >
                  <Text variant="heading-strong-m">{faq.question}</Text>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {faq.answer}
                  </Text>
                </Column>
              </RevealFx>
            ))}
          </Column>
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
            Ready to Start Your Journey?
          </Heading>
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
            style={{ maxWidth: "500px" }}
          >
            Join thousands of Malaysians who have achieved their goals with
            BumiAuto financing.
          </Text>
          <Flex gap="16" wrap horizontal="center">
            <Button href="/contact" variant="primary" size="l">
              Apply Now
            </Button>
            <Button href="/services" variant="secondary" size="l">
              Explore Services
            </Button>
          </Flex>
        </Column>
      </Flex>
    </Flex>
  );
}
