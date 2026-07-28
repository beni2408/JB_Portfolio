export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "SvelteKit",
      "JavaScript (ES6+)",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "JWT Authentication",
      "MVC Architecture",
    ],
  },
  {
    category: "Database",
    items: ["MongoDB", "Mongoose", "MySQL (Basics)"],
  },
  {
    category: "Automation",
    items: ["n8n", "Webhooks", "Google Sheets sync", "Email dispatch"],
  },
  {
    category: "CMS",
    items: ["WordPress"],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "Render",
      "Netlify",
      "Postman",
      "ThunderClient",
      "Figma",
    ],
  },
];
