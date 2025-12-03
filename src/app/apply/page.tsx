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
import styles from "./apply.module.css";

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
    description: "Get approved within 24-48 hours",
  },
  {
    icon: "percent",
    title: "Competitive Rates",
    description: "Best rates tailored to you",
  },
  {
    icon: "calendar",
    title: "Flexible Terms",
    description: "12 to 60 month options",
  },
  {
    icon: "shield",
    title: "Secure Process",
    description: "Bank-level security",
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
    description: "Complete the form with your details",
  },
  {
    number: "2",
    title: "Quick Review",
    description: "We review within 24 hours",
  },
  {
    number: "3",
    title: "Get Approved",
    description: "Sign your agreement",
  },
  {
    number: "4",
    title: "Receive Funds",
    description: "Quick disbursement",
  },
];

// FAQs
const faqs = [
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
];

export default function ApplyPage() {
  return (
    <Flex fillWidth direction="column" horizontal="center">
      {/* Hero + Form Section - Two Column Layout on Desktop */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="xl"
        background="brand-alpha-weak"
      >
        <div className={styles.heroFormGrid}>
          {/* Left: Hero Content */}
          <Column gap="24" className={styles.heroContent}>
            <RevealFx translateY="4">
              <Text variant="label-strong-s" onBackground="brand-medium">
                LOAN APPLICATION
              </Text>
            </RevealFx>
            <RevealFx translateY="8" delay={0.1}>
              <Heading variant="display-strong-l">
                Start Your Journey Today
              </Heading>
            </RevealFx>
            <RevealFx translateY="12" delay={0.2}>
              <Text
                variant="body-default-l"
                onBackground="neutral-weak"
              >
                Apply for financing in minutes. Fast approval, competitive rates,
                and flexible repayment options.
              </Text>
            </RevealFx>

            {/* Quick Features - Horizontal on Desktop */}
            <RevealFx translateY="16" delay={0.3}>
              <div className={styles.quickFeatures}>
                {features.map((feature) => (
                  <div key={feature.title} className={styles.featureItem}>
                    <Flex
                      width="32"
                      height="32"
                      radius="s"
                      background="brand-alpha-medium"
                      horizontal="center"
                      vertical="center"
                      className={styles.featureIcon}
                    >
                      <Icon name={feature.icon} size="s" onBackground="brand-strong" />
                    </Flex>
                    <Column gap="2" className={styles.featureText}>
                      <Text variant="label-strong-s">{feature.title}</Text>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        {feature.description}
                      </Text>
                    </Column>
                  </div>
                ))}
              </div>
            </RevealFx>
          </Column>

          {/* Right: Application Form */}
          <RevealFx translateY="16" delay={0.2} className={styles.formContainer}>
            <Card
              padding="24"
              radius="l"
              background="page"
              border="neutral-alpha-weak"
              fillWidth
            >
              <Column gap="16">
                <Column gap="4">
                  <Heading variant="heading-strong-l">Apply Now</Heading>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Fill out the form to start your application
                  </Text>
                </Column>
                <LoanInquiryForm />
              </Column>
            </Card>
          </RevealFx>
        </div>
      </Flex>

      {/* How It Works - Compact */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="l"
      >
        <Column maxWidth="l" fillWidth gap="24">
          <Column horizontal="center" gap="8">
            <RevealFx translateY="8">
              <Heading variant="heading-strong-xl" align="center">
                How It Works
              </Heading>
            </RevealFx>
            <RevealFx translateY="12" delay={0.1}>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Get financing in 4 simple steps
              </Text>
            </RevealFx>
          </Column>

          <div className={styles.stepsGrid}>
            {steps.map((step, index) => (
              <RevealFx key={step.title} translateY="16" delay={index * 0.1}>
                <Column
                  gap="12"
                  padding="16"
                  horizontal="center"
                  align="center"
                  fillWidth
                >
                  <Flex
                    width="40"
                    height="40"
                    radius="full"
                    background="brand-strong"
                    horizontal="center"
                    vertical="center"
                  >
                    <Text variant="heading-strong-s" style={{ color: "white" }}>
                      {step.number}
                    </Text>
                  </Flex>
                  <Column gap="4" horizontal="center" align="center">
                    <Text variant="heading-strong-s">{step.title}</Text>
                    <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
                      {step.description}
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
        paddingY="l"
        background="neutral-alpha-weak"
      >
        <Column maxWidth="l" fillWidth gap="24">
          <Column horizontal="center" gap="8">
            <RevealFx translateY="8">
              <Heading variant="heading-strong-xl" align="center">
                Financing Options
              </Heading>
            </RevealFx>
            <RevealFx translateY="12" delay={0.1}>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Choose the option that best fits your needs
              </Text>
            </RevealFx>
          </Column>

          <div className={styles.loanTypesGrid}>
            {loanTypes.map((type, index) => (
              <RevealFx key={type.title} translateY="16" delay={index * 0.1}>
                <Column
                  gap="12"
                  padding="24"
                  radius="l"
                  background="page"
                  border="neutral-alpha-weak"
                  fillWidth
                  className={styles.loanCard}
                >
                  <Text style={{ fontSize: "2rem" }}>{type.icon}</Text>
                  <Column gap="4">
                    <Text variant="heading-strong-m">{type.title}</Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {type.description}
                    </Text>
                  </Column>
                  <Row
                    padding="8"
                    radius="s"
                    background="brand-alpha-weak"
                    horizontal="center"
                  >
                    <Text variant="label-strong-s" onBackground="brand-medium">
                      {type.amount}
                    </Text>
                  </Row>
                </Column>
              </RevealFx>
            ))}
          </div>
        </Column>
      </Flex>

      {/* FAQ */}
      <Flex
        as="section"
        fillWidth
        direction="column"
        horizontal="center"
        paddingX="l"
        paddingY="l"
      >
        <Column maxWidth="m" fillWidth gap="24">
          <Column horizontal="center" gap="8">
            <RevealFx translateY="8">
              <Heading variant="heading-strong-xl" align="center">
                Frequently Asked Questions
              </Heading>
            </RevealFx>
          </Column>

          <Column gap="12">
            {faqs.map((faq, index) => (
              <RevealFx key={faq.q} translateY="12" delay={index * 0.1}>
                <Card
                  padding="16"
                  radius="m"
                  border="neutral-alpha-weak"
                  fillWidth
                >
                  <Column gap="8">
                    <Row gap="12" vertical="center">
                      <Icon name="helpCircle" size="s" onBackground="brand-medium" />
                      <Text variant="heading-strong-s">{faq.q}</Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="neutral-weak" style={{ marginLeft: "28px" }}>
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
