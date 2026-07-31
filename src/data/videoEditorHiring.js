import siteConfig from "@/theme/siteConfig";

const applicationMessage = `Assalamu Alaikum,

I want to apply for the Project-Based Product Video Editor role at Effy Tech.

1. Full Name:
2. Current City:
3. Phone Number:
4. Portfolio Link:
5. Best 2 Video Sample Links:
6. CV / Resume Link:
7. Editing Tools I Use:
8. Website / App Video Experience:
9. AI Tools I Have Used:
10. Digital Marketing / Meta Ads Knowledge:
11. Weekly Availability:
12. Expected Fee Per Video:
13. Estimated Delivery Time:
14. Short Concept: Choose one Effy Tech project and share its target audience, opening hook, 3 features you would show, and final CTA.

I confirm that I have read the role requirements and work values.`;

const emailBody = `Assalamu Alaikum,

I would like to apply for the Project-Based Product Video Editor role at Effy Tech.

Please find my application details below:

1. Full Name:
2. Current City:
3. Phone Number:
4. Portfolio Link:
5. Best 2 Video Sample Links:
6. Editing Tools I Use:
7. Website / App Video Experience:
8. AI Tools I Have Used:
9. Digital Marketing / Meta Ads Knowledge:
10. Weekly Availability:
11. Expected Fee Per Video:
12. Estimated Delivery Time:
13. Short Concept: Choose one Effy Tech project and share its target audience, opening hook, 3 features you would show, and final CTA.

I have attached my CV / resume with this email.

Regards,`;

const whatsappNumber = siteConfig.contact.phone.replace(/\D/g, "");

export const applicationLinks = {
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    applicationMessage,
  )}`,
  email: `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    "Application — Project-Based Product Video Editor",
  )}&body=${encodeURIComponent(emailBody)}`,
  emailAddress: siteConfig.contact.email,
  whatsappNumber: siteConfig.contact.phone,
};

export const roleHighlights = [
  "Remote collaboration",
  "Paid per project",
  "Bangladesh-focused opening",
  "Long-term opportunity based on performance",
];

export const roleResponsibilities = [
  {
    title: "Understand the product",
    description:
      "Website, web app বা mobile app নিজে explore করে target user, core problem এবং business value বুঝতে হবে।",
  },
  {
    title: "Shape the video story",
    description:
      "Strong hook, short concept এবং clear flow তৈরি করতে হবে—কোন feature কখন দেখালে viewer value বুঝবে, সেটি plan করতে হবে।",
  },
  {
    title: "Record clean product footage",
    description:
      "Desktop ও mobile screen recording, cursor movement, zoom, framing এবং sensitive data protection professionally handle করতে হবে।",
  },
  {
    title: "Edit for paid promotion",
    description:
      "Subtitle, callout, music, sound, pacing, brand elements এবং CTA দিয়ে Facebook ও Instagram ad-ready video তৈরি করতে হবে।",
  },
  {
    title: "Prepare useful versions",
    description:
      "Brief অনুযায়ী 9:16, 4:5 বা other required format export করতে হবে এবং quality loss ছাড়াই final files organise করতে হবে।",
  },
  {
    title: "Hand over editable files",
    description:
      "Final MP4-এর সঙ্গে editable CapCut বা equivalent project file এবং ব্যবহৃত asset references জমা দিতে হবে।",
  },
];

export const requiredSkills = [
  "CapCut বা equivalent editing tool confidently use করতে পারা",
  "Website, web app ও mobile app-এর basic structure বুঝতে পারা",
  "Clean screen recording, subtitle, callout, pacing ও sound sense",
  "Product feature-কে simple benefit-driven story-তে convert করার ability",
  "Feedback clearly বুঝে agreed revision deliver করা",
  "Copyright-safe music, footage, font ও visual asset use করা",
];

export const preferredSkills = [
  "Google Flow বা other AI video tools-এর practical use",
  "Digital marketing, Meta Ads বা ad creative performance সম্পর্কে ধারণা",
  "Software, SaaS, education platform বা mobile app showcase experience",
  "Short script, hook এবং Bangla-English promotional copy লিখতে পারা",
  "Multiple aspect ratio ও social media export workflow",
];

export const workValues = [
  {
    title: "Salah-conscious",
    description:
      "নামাজের প্রতি sincere, regular এবং Islamic values-এর প্রতি respectful হতে হবে।",
  },
  {
    title: "Modest & humble",
    description:
      "Communication calm, respectful এবং ego-free হতে হবে—especially feedback ও revision-এর সময়।",
  },
  {
    title: "Responsible",
    description:
      "যে commitment দেওয়া হবে, সেটি own করতে হবে; কোনো blocker হলে আগে থেকে communicate করতে হবে।",
  },
  {
    title: "Time-conscious",
    description:
      "Deadline, review window এবং file handover professionally maintain করতে হবে।",
  },
];

export const collaborationSteps = [
  {
    number: "01",
    title: "Project access & brief",
    description:
      "Effy Tech project link, demo access, audience, campaign goal এবং brand direction দেবে।",
  },
  {
    number: "02",
    title: "Explore & propose",
    description:
      "Editor product explore করে hook, flow, feature order এবং required format propose করবে।",
  },
  {
    number: "03",
    title: "First draft",
    description:
      "Agreed direction অনুযায়ী screen recording ও first edit review-এর জন্য submit করবে।",
  },
  {
    number: "04",
    title: "Focused revision",
    description:
      "Consolidated feedback অনুযায়ী agreed revision complete হবে—scope নতুন করে expand হবে না।",
  },
  {
    number: "05",
    title: "Final handover",
    description:
      "Approved exports, source project, asset references এবং clean folder handover করা হবে।",
  },
  {
    number: "06",
    title: "Campaign by Effy Tech",
    description:
      "Ad setup, targeting, budget, lead handling এবং sales follow-up Effy Tech manage করবে।",
  },
];

export const selectionSteps = [
  "Portfolio, CV এবং application details review",
  "একটি Effy Tech project নিয়ে submitted short concept review",
  "Short online discussion with shortlisted candidates",
  "Selected candidate-এর সঙ্গে clear brief ও paid pilot project",
];

export const faqs = [
  {
    question: "CapCut জানলেই কি apply করা যাবে?",
    answer:
      "হ্যাঁ। Tool-এর নামের চেয়ে clean execution, product understanding এবং storytelling বেশি important। CapCut ভালোভাবে জানলে apply করা যাবে।",
  },
  {
    question: "Digital marketing বা Meta Ads চালাতে হবে?",
    answer:
      "না। Campaign setup, targeting, budget, lead handling এবং sales Effy Tech করবে। Marketing knowledge থাকলে ad-friendly creative বানাতে extra priority পাওয়া যাবে।",
  },
  {
    question: "Male candidate কি mandatory?",
    answer:
      "এই opening-এ male candidate preferred। এটি headline requirement নয়; overall skill, values, responsibility এবং work quality-এর সঙ্গে preference consider করা হবে।",
  },
  {
    question: "Free sample video বানাতে হবে?",
    answer:
      "না। Application-এর সময় existing portfolio, best samples এবং একটি short written concept চাওয়া হচ্ছে। Selected candidate-এর initial pilot paid হবে।",
  },
  {
    question: "Payment কীভাবে নির্ধারিত হবে?",
    answer:
      "প্রতিটি video-এর scope, duration, formats, complexity এবং revision requirement দেখে project fee আগে থেকেই agree করা হবে।",
  },
  {
    question: "CV বা portfolio কীভাবে পাঠাব?",
    answer:
      "WhatsApp application template-এ shareable Drive/portfolio link দিন এবং চাইলে পরের message-এ PDF CV attach করুন। Email করলে send করার আগে CV attach করতে হবে।",
  },
];

