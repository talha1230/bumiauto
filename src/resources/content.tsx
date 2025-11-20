import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "BumiAuto",
  lastName: "Team",
  name: "BumiAuto",
  role: "Fintech Microloan Solutions",
  avatar: "/images/bumiauto-logo.png",
  email: "info@bumiauto.com.my",
  location: "Asia/Kuala_Lumpur",
  languages: ["English", "Bahasa Malaysia"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Get the Latest Updates from BumiAuto</>,
  description: <>Subscribe for news about financing options, special offers, and financial tips</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/bumiauto/",
  },
  {
    name: "Facebook",
    icon: "facebook",
    link: "https://www.facebook.com/bumiauto",
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    link: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: "BumiAuto - Motorcycle Microloans & Consumer Financing Malaysia",
  description: "Redefining microloans and financial access in Malaysia. Get instant motorcycle loans and consumer durable financing with flexible repayment plans.",
  headline: <>Redefining Microloans and Financial Access</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <Text marginRight="4" onBackground="brand-medium">
          ✓ Fast Approval • Flexible Terms • Trusted Partner
        </Text>
      </Row>
    ),
    href: "/services",
  },
  subline: (
    <>
      Empowering Malaysians with accessible financing for motorcycles and consumer durables.
      <br /> Fast approval, flexible repayment plans, and dedicated support every step of the way.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About BumiAuto – ${person.role}`,
  description: `Learn about BumiAuto, Malaysia's trusted fintech company specializing in motorcycle microloans and consumer financing solutions.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Our Mission",
    description: (
      <>
        BumiAuto is a Malaysia-based fintech company dedicated to making financial access easier for everyone.
        We specialize in providing microloans for motorcycles and consumer durables, helping Malaysians achieve
        their mobility and lifestyle goals with flexible, affordable financing solutions.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Our Services",
    experiences: [
      {
        company: "Motorcycle Microloans",
        timeframe: "Core Service",
        role: "Fast & Flexible Financing",
        achievements: [
          "Quick approval process with minimal documentation required for qualified applicants.",
          "Competitive interest rates and flexible repayment terms tailored to your income cycle.",
        ],
        images: [],
      },
      {
        company: "Consumer Durable Financing",
        timeframe: "Core Service",
        role: "Affordable Payment Plans",
        achievements: [
          "Finance home appliances, electronics, and other essential items with easy monthly installments.",
          "No hidden fees and transparent pricing to help you budget with confidence.",
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Why Choose BumiAuto",
    institutions: [
      {
        name: "Customer-Centric Approach",
        description: <>We prioritize your financial well-being with personalized service and support.</>,
      },
      {
        name: "Regulatory Compliance",
        description: <>Licensed and compliant with Malaysian financial regulations for your peace of mind.</>,
      },
      {
        name: "Fast & Transparent",
        description: <>Quick approvals, clear terms, and no hidden charges - what you see is what you get.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "How It Works",
    skills: [
      {
        title: "1. Apply Online",
        description: (
          <>Fill out our simple online form with your basic information and loan requirements.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "2. Quick Approval",
        description: (
          <>Our team reviews your application and provides approval within 24-48 hours.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "3. Get Funded",
        description: (
          <>Once approved, receive your funds quickly and start enjoying your purchase.</>
        ),
        tags: [],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Resources",
  title: "Financial Tips & News",
  description: "Stay informed with the latest financing tips, industry news, and helpful guides from BumiAuto",
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/services",
  label: "Services",
  title: "Our Financing Solutions",
  description: "Explore BumiAuto's range of microloan and financing services designed for Malaysians",
  // Create new service pages by adding a new .mdx file to app/work/projects
  // All services will be listed on the /home and /services routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Success Stories – BumiAuto",
  description: "See how BumiAuto has helped Malaysians achieve their goals",
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
