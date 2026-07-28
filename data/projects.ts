export type Project = {
  slug: string;
  title: string;
  flagship: boolean;
  stack: string[];
  dates: string;
  summary: string;
  highlights: string[];
  liveHref?: string;
  githubHref?: string;
  githubHrefs?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "st-johns-carol-union",
    title: "St. John's Carol Union — Web Platform & CMS",
    flagship: true,
    stack: ["SvelteKit 5", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind CSS"],
    dates: "Apr 2026 – Jun 2026",
    summary:
      "A production-deployed full-stack web application and custom CMS for a choir ministry — 12 dynamically managed homepage sections and 14 admin modules, fully editable by non-technical administrators.",
    highlights: [
      "Backend in Node.js, Express.js, MongoDB with JWT auth, role-based access control, and Cloudinary media storage; frontend in SvelteKit, TypeScript, Tailwind CSS with GSAP and Lenis animations.",
      "Integrated a live AI chat assistant (Groq) grounded in real-time database content, Resend transactional email with branded templates, and AES-256-GCM encrypted API-key storage.",
      "Shipped audition management with public applications, testimonial moderation, a 6-stage production pipeline, and full SEO (sitemap, Open Graph, geo tags); deployed on Netlify and Render.",
    ],
    liveHref: "https://stjohnscarolunion.com",
  },
  {
    slug: "sjc-asanam-receipt-generator",
    title: "SJC Asanam Receipt Generator",
    flagship: true,
    stack: ["SvelteKit", "MongoDB", "Express.js", "Node.js", "n8n", "Tailwind CSS"],
    dates: "Jan 2026 – Apr 2026",
    summary:
      "Full-stack donation management system for a church committee — donor entries, auto-sequential receipt numbering (SJC260001 format), bilingual Tamil/English PDF receipts, email dispatch, and live Google Sheets sync.",
    highlights: [
      "Backend in Express.js and MongoDB with JWT auth, Puppeteer-based PDF generation, and ExcelJS reporting; frontend in SvelteKit and Tailwind CSS.",
      "n8n automation for dual-write to MongoDB and Google Sheets, automated email delivery with PDF attachments, and update/delete synchronization.",
      "Tamil transliteration (Google Input Tools with AI4Bharat XLIT fallback), India Post office-city autocomplete, floating calculator, advanced filtering, and a real-time analytics dashboard.",
    ],
  },
  {
    slug: "health-wellness-app",
    title: "Health & Wellness App",
    flagship: false,
    stack: ["React", "Redux", "Node.js", "MongoDB", "React Query", "Tailwind CSS"],
    dates: "2025",
    summary:
      "Full-stack MERN app with secure JWT auth — fitness tracking, nutrition logging, and goal management.",
    highlights: [
      "Responsive mobile-first UI with React + Tailwind; real-time data fetching/caching with React Query.",
    ],
    githubHrefs: [
      { label: "Frontend", href: "https://github.com/beni2408/guvi-finalproject-frontend" },
      { label: "Backend", href: "https://github.com/beni2408/guvi-finalproject-backend" },
    ],
  },
  {
    slug: "movie-review-app",
    title: "Movie Review App",
    flagship: false,
    stack: ["React", "Node.js", "MongoDB", "OMDb API"],
    dates: "Sep 2025 – Oct 2025",
    summary:
      "Full-stack movie review app with OMDb API integration and user authentication.",
    highlights: [
      "Movie search, detailed views, star-rating system, persistent storage with MongoDB.",
    ],
    githubHref: "https://github.com/beni2408/movie-review-app-guvi",
  },
  {
    slug: "invoice-management-system",
    title: "Invoice Management System",
    flagship: false,
    stack: ["React", "Redux", "Tailwind CSS"],
    dates: "Sep 2025 – Oct 2025",
    summary:
      "Responsive invoice app with React.js, Redux, Tailwind — automatic calculations and PDF download.",
    highlights: [
      "State managed with Redux + custom hooks; modular, maintainable components.",
    ],
    githubHref: "https://github.com/beni2408/invoice-builder-guvi-mini-project2",
  },
];

export const flagshipProjects = projects.filter((p) => p.flagship);
export const otherProjects = projects.filter((p) => !p.flagship);
