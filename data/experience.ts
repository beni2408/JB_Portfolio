export type ExperienceEntry = {
  company: string;
  client?: string;
  role: string;
  dates: string;
  location: string;
  website?: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Lynt-X Global",

    role: "MERN-Stack Developer",
    dates: "Apr 2026 – Present",
    location: "Remote",
    website: "https://www.lyntxglobal.com/",
    bullets: [
      "Build and maintain full-stack web applications across the MERN stack (MongoDB, Express.js, React.js, Node.js) and SvelteKit for client-facing platforms.",
      "Develop RESTful APIs, JWT-based authentication, and third-party CRM and webhook integrations.",
      "Build responsive, component-based user interfaces with React, Redux Toolkit, and Tailwind CSS.",
      "Collaborate through Git, code reviews, and Agile workflows to ship features on schedule.",
    ],
  },
  {
    company: "Neural Nest Solutions",
    role: "UI/UX Developer",
    dates: "Apr 2024 – Oct 2025",
    location: "Remote · India",
    website: "https://www.neuralnestsolutions.com/",
    bullets: [
      "Designed user interfaces for web and mobile applications.",
      "Collaborated with developers to enhance user experience across platforms.",
    ],
  },
];
