import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      "react-hooks/static-components": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/immutability": "off",
    },
  },
  {
    // These surfaces accept CMS URLs, upload previews, or extra-long product
    // screenshots. Raw images are intentional here; changing them to the Next
    // optimizer would alter the established rendering and remote-host contract.
    files: [
      "src/app/effy_edu_management_system/**/*.{js,jsx,ts,tsx}",
      "src/components/showcase/**/*.{js,jsx,ts,tsx}",
      "src/components/ui/Card.jsx",
      "src/features/effy-edu-demo/**/*.{js,jsx,ts,tsx}",
    ],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  {
    // These protected admin editors intentionally mirror incoming server data.
    // Their existing effects are left byte-for-byte unchanged in the final QA.
    files: [
      "src/app/effy_edu_management_system/teacher/website/home/batches/HomeCoursesAdmin.tsx",
      "src/app/effy_edu_management_system/teacher/website/home/gallery/HomeGalleryAdmin.tsx",
      "src/components/admin/MyWorkClient.js",
    ],
    rules: {
      "react-hooks/exhaustive-deps": "off",
    },
  },
  {
    // These server pages keep request-time Date snapshots. Existing directives
    // remain in place to preserve the previously verified server source.
    files: [
      "src/app/effy_edu_management_system/student/assignments/**/page.tsx",
      "src/app/effy_edu_management_system/student/assignments/page.tsx",
      "src/app/effy_edu_management_system/student/routine/page.tsx",
      "src/app/effy_edu_management_system/teacher/assignments/page.tsx",
      "src/app/effy_edu_management_system/teacher/routine/new/page.tsx",
    ],
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
  },
  {
    // @react-pdf/renderer Image is not an HTML image; the DOM alt-text rule is
    // a false positive for the generated result PDF.
    files: ["src/features/effy-edu-demo/pdf/ExamResultDocument.tsx"],
    rules: {
      "jsx-a11y/alt-text": "off",
    },
  },
];

export default eslintConfig;
