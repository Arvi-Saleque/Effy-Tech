import siteConfig from "@/theme/siteConfig";

const whatsappNumber = siteConfig.contact.phone.replace(/\D/g, "");
const whatsappMessage =
  "Hello Effy Tech, I would like to discuss a software project.";

export const contactChannels = [
  {
    id: "email",
    label: "Business email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    external: false,
  },
  {
    id: "phone",
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone}`,
    external: false,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "Open a direct project discussion",
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`,
    external: true,
  },
  {
    id: "location",
    label: "Office",
    value: siteConfig.contact.address,
    href: null,
    external: false,
  },
];

export const socialLinks = siteConfig.socials;

export const projectBriefChecklist = [
  {
    title: "Current workflow",
    description: "What happens now, and where the work slows down.",
  },
  {
    title: "Users and roles",
    description: "Who will use the system and what each person needs to do.",
  },
  {
    title: "Required outcome",
    description: "What should become faster, clearer, safer, or measurable.",
  },
  {
    title: "Delivery context",
    description: "Important timing, constraints, references, and budget range.",
  },
];

export const inquirySteps = [
  {
    number: "01",
    title: "Context review",
    description:
      "We review the workflow, users, constraints, and outcome in the brief.",
  },
  {
    number: "02",
    title: "Scope clarification",
    description:
      "Open questions are separated from confirmed requirements before planning.",
  },
  {
    number: "03",
    title: "Practical next action",
    description:
      "The next step may be discovery, a scoped proposal, or a direct technical discussion.",
  },
];
