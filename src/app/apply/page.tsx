import {
  Heading,
  Text,
  Column,
  Row,
  Meta,
  Flex,
  Icon,
  RevealFx,
  Card,
} from "@once-ui-system/core";
import { LoanInquiryForm } from "@/components/forms/LoanInquiryForm";
import { baseURL } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: "Apply for Loan - BumiAuto",
    description:
      "Apply for motorcycle financing or consumer durable loans with BumiAuto. Quick approval, competitive rates, and flexible payment options.",
    baseURL: baseURL,
    path: "/apply",
    image: "/images/og/loan-application.jpg",
  });
}

// Features/Benefits
const features = [
  {
    icon: "clock",
    title: "Quick Approval",
    description: "Get approved within 24-48 hours with minimal documentation",
  },
  {
    icon: "creditCard",
    title: "Competitive Rates",
    description: "Enjoy competitive interest rates tailored to your profile",
  },
  {
    icon: "calendar",
    title: "Flexible Terms",
    description: "Choose repayment periods from 12 to 60 months",
  },
  {
    icon: "shield",
    title: "Secure Process",
    description: "Your information is protected with bank-level security",
  },
];

// Loan Types
const loanTypes = [
  {
    icon: "🏍️",
    title: "Motorcycle Loans",
    description: "Finance your dream motorcycle with affordable monthly payments",
    amount: "Up to RM 50,000",
  },
  {
    icon: "📱",
    title: "Consumer Durable",
    description: "Finance electronics, appliances, and other consumer goods",
    amount: "Up to RM 20,000",
  },
  {
    icon: "💼",
    title: "Personal Financing",
    description: "Flexible financing for various personal needs",
    amount: "Up to RM 30,000",
  },
];

// Steps
const steps = [
  {
    number: "1",
    title: "Fill Application",
    description: "Complete the simple form below with your details",
  },
  {
    number: "2",
    title: "Quick Review",
    description: "Our team reviews your application within 24 hours",
  },
  {
    number: "3",
    title: "Get Approved",
    description: "Receive your approval and sign the agreement",
  },
  {
    number: "4",
    title: "Receive Funds",
    description: "Get your financing disbursed quickly",
  },
];

export default function ApplyPage() {
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
        background="brand-alpha-weak"
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
              LOAN APPLICATION
            </Text>
          </RevealFx>
          <RevealFx translateY="8" delay={0.1}>
            <Heading variant="display-strong-xl" align="center">
              Start Your Journey Today
            </Heading>
          </RevealFx>
          <RevealFx translateY="12" delay={0.2}>
            <Text
              variant="heading-default-l"
              onBackground="neutral-weak"
              align="center"
              style={{ maxWidth: "600px" }}
            >
              Apply for financing in minutes. Fast approval, competitive rates,
              and flexible repayment options to suit your needs.
            </Text>
          </RevealFx>
        </Column>
      </Flex>

      {/* Features */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
      >
        <Column maxWidth="l" fillWidth>
          <div className="contact-methods-grid">
            {features.map((feature, index) => (
              <RevealFx key={feature.title} translateY="16" delay={index * 0.1}>
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
                      name={feature.icon}
                      size="m"
                      onBackground="brand-medium"
                    />
                  </Flex>
                  <Column gap="4" horizontal="center" align="center">
                    <Text variant="heading-strong-s">{feature.title}</Text>
                    <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                      {feature.description}
                    </Text>
                  </Column>
                </Column>
              </RevealFx>
            ))}
          </div>
        </Column>
      </Flex>

      {/* Loan Types */}
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
          <Column horizontal="center" gap="12">
            <RevealFx translateY="8">
              <Heading variant="display-strong-m" align="center">
                Financing Options
              </Heading>
            </RevealFx>
            <RevealFx translateY="12" delay={0.1}>
              <Text variant="body-default-l" onBackground="neutral-weak" align="center">
                Choose the financing option that best fits your needs
              </Text>
            </RevealFx>
          </Column>

          <div className="grid-cards-3">
            {loanTypes.map((type, index) => (
              <RevealFx key={type.title} translateY="16" delay={index * 0.1}>
                <Column
                  gap="16"
                  padding="32"
                  radius="l"
                  background="page"
                  border="neutral-alpha-weak"
                  fillWidth
                  className="card"
                >
                  <Text style={{ fontSize: "2.5rem" }}>{type.icon}</Text>
                  <Column gap="8">
                    <Text variant="heading-strong-m">{type.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {type.description}
                    </Text>
                  </Column>
                  <Row
                    padding="12"
                    radius="m"
                    background="brand-alpha-weak"
                    horizontal="center"
                  >
                    <Text variant="label-strong-m" onBackground="brand-medium">
                      {type.amount}
                    </Text>
                  </Row>
                </Column>
              </RevealFx>
            ))}
          </div>
        </Column>
      </Flex>

      {/* How It Works */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
      >
        <Column maxWidth="l" fillWidth gap="32">
          <Column horizontal="center" gap="12">
            <RevealFx translateY="8">
              <Heading variant="display-strong-m" align="center">
                How It Works
              </Heading>
            </RevealFx>
            <RevealFx translateY="12" delay={0.1}>
              <Text variant="body-default-l" onBackground="neutral-weak" align="center">
                Get financing in 4 simple steps
              </Text>
            </RevealFx>
          </Column>

          <Row gap="24" wrap horizontal="center">
            {steps.map((step, index) => (
              <RevealFx key={step.title} translateY="16" delay={index * 0.1}>
                <Column
                  gap="16"
                  padding="24"
                  horizontal="center"
                  align="center"
                  style={{ width: "200px" }}
                >
                  <Flex
                    width="48"
                    height="48"
                    radius="full"
                    background="brand-strong"
                    horizontal="center"
                    vertical="center"
                  >
                    <Text variant="heading-strong-m" style={{ color: "white" }}>
                      {step.number}
                    </Text>
                  </Flex>
                  <Column gap="4" horizontal="center" align="center">
                    <Text variant="heading-strong-s">{step.title}</Text>
                    <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                      {step.description}
                    </Text>
                  </Column>
                </Column>
              </RevealFx>
            ))}
          </Row>
        </Column>
      </Flex>

      {/* Application Form */}
      <Flex
        as="section"
        id="form"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
        background="neutral-alpha-weak"
      >
        <Column maxWidth="m" fillWidth gap="32">
          <Column horizontal="center" gap="12">
            <RevealFx translateY="8">
              <Heading variant="display-strong-m" align="center">
                Apply Now
              </Heading>
            </RevealFx>
            <RevealFx translateY="12" delay={0.1}>
              <Text variant="body-default-l" onBackground="neutral-weak" align="center">
                Fill out the form below to start your application
              </Text>
            </RevealFx>
          </Column>

          <RevealFx translateY="16" delay={0.2}>
            <Card
              padding="32"
              radius="l"
              background="page"
              border="neutral-alpha-weak"
              fillWidth
            >
              <LoanInquiryForm />
            </Card>
          </RevealFx>
        </Column>
      </Flex>

      {/* FAQ Preview */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
      >
        <Column maxWidth="m" fillWidth gap="32">
          <Column horizontal="center" gap="12">
            <RevealFx translateY="8">
              <Heading variant="display-strong-m" align="center">
                Frequently Asked Questions
              </Heading>
            </RevealFx>
          </Column>

          <Column gap="16">
            {[
              {
                q: "What documents do I need?",
                a: "You'll need a valid IC, proof of income (payslip or bank statement), and a copy of your utility bill for address verification.",
              },
              {
                q: "How long does approval take?",
                a: "Most applications are reviewed within 24-48 hours. Once approved, funds can be disbursed within 1-3 business days.",
              },
              {
                q: "What is the minimum income requirement?",
                a: "We consider applications from individuals with a minimum monthly income of RM 1,500. Other factors may also be considered.",
              },
              {
                q: "Can I apply if I have existing loans?",
                a: "Yes, you can still apply. Our team will assess your debt-to-income ratio to determine your eligibility.",
              },
            ].map((faq, index) => (
              <RevealFx key={faq.q} translateY="12" delay={index * 0.1}>
                <Card
                  padding="24"
                  radius="m"
                  border="neutral-alpha-weak"
                  fillWidth
                >
                  <Column gap="8">
                    <Row gap="12" vertical="center">
                      <Icon name="helpCircle" size="s" onBackground="brand-medium" />
                      <Text variant="heading-strong-s">{faq.q}</Text>
                    </Row>
                    <Text variant="body-default-m" onBackground="neutral-weak" style={{ marginLeft: "28px" }}>
                      {faq.a}
                    </Text>
                  </Column>
                </Card>
              </RevealFx>
            ))}
          </Column>
        </Column>
      </Flex>
    </Flex>
  );
}
