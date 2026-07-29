import type { ComponentType } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiSvelte,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiN8N,
  SiGooglesheets,
  SiWordpress,
  SiGit,
  SiGithub,
  SiVercel,
  SiRender,
  SiNetlify,
  SiPostman,
  SiFigma,
} from "react-icons/si";
import { FaCss3Alt, FaBolt } from "react-icons/fa6";
import { Route, Component, Webhook, Mail } from "lucide-react";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

export const skillIcons: Record<string, IconComponent> = {
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  SvelteKit: SiSvelte,
  "JavaScript (ES6+)": SiJavascript,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Redux Toolkit": SiRedux,
  HTML5: SiHtml5,
  CSS3: FaCss3Alt,

  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "RESTful APIs": Route,
  "JWT Authentication": SiJsonwebtokens,
  "MVC Architecture": Component,

  MongoDB: SiMongodb,
  Mongoose: SiMongoose,
  "MySQL (Basics)": SiMysql,

  n8n: SiN8N,
  Webhooks: Webhook,
  "Google Sheets sync": SiGooglesheets,
  "Email dispatch": Mail,

  WordPress: SiWordpress,

  Git: SiGit,
  GitHub: SiGithub,
  Vercel: SiVercel,
  Render: SiRender,
  Netlify: SiNetlify,
  Postman: SiPostman,
  ThunderClient: FaBolt,
  Figma: SiFigma,
};
