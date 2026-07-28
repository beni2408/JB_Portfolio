// Generates a plain, text-based placeholder resume PDF at public/resume.pdf
// from the same ground-truth content as /data. Swap this file for a
// professionally designed resume PDF whenever one is ready — the CTA in
// Nav/Hero just links to /resume.pdf, so any file with that name works.
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFile } from "node:fs/promises";

const INK = rgb(0.043, 0.039, 0.102);
const CHAMPAGNE = rgb(0.831, 0.686, 0.416);
const PEARL = rgb(0.957, 0.945, 0.914);
const MIST = rgb(0.663, 0.643, 0.769);

const doc = await PDFDocument.create();
const page = doc.addPage([612, 792]);
const { width, height } = page.getSize();
const bold = await doc.embedFont(StandardFonts.HelveticaBold);
const regular = await doc.embedFont(StandardFonts.Helvetica);

page.drawRectangle({ x: 0, y: 0, width, height, color: INK });

let y = height - 56;
function text(str, { x = 56, size = 10, font = regular, color = PEARL, gap = 16 } = {}) {
  page.drawText(str, { x, y, size, font, color });
  y -= gap;
}

text("JASCAR BENISH P", { size: 24, font: bold, color: PEARL, gap: 22 });
text("MERN-Stack Developer . Composer . Audio Engineer", { size: 12, color: CHAMPAGNE, gap: 20 });
text("Thoothukudi, Tamil Nadu, India  .  jascarbenish@gmail.com  .  +91 8870378785  .  github.com/beni2408", {
  size: 9.5,
  color: MIST,
  gap: 28,
});

function heading(str) {
  text(str, { size: 12, font: bold, color: CHAMPAGNE, gap: 16 });
}

function bullet(str) {
  const lines = wrap(str, 95);
  lines.forEach((line, i) => text((i === 0 ? "-  " : "   ") + line, { x: 60, size: 9.5, color: MIST, gap: 13 }));
}

function wrap(str, max) {
  const words = str.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > max) {
      lines.push(line.trim());
      line = word;
    } else {
      line += " " + word;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

heading("SUMMARY");
bullet(
  "MERN-stack developer with hands-on experience building and shipping full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Designs REST APIs and JWT authentication; builds responsive interfaces with React, Redux Toolkit, Next.js, and SvelteKit. Trained in music theory (Grade 5, Trinity College London) and active as a composer and audio engineer."
);
y -= 8;

heading("EXPERIENCE");
text("MERN-Stack Developer -- NextGen Global Solutions (Client: LyntX Global Solutions)", {
  size: 10,
  font: bold,
  color: PEARL,
  gap: 12,
});
text("Remote, Chennai, India  .  Apr 2026 - Present", { size: 9, color: MIST, gap: 13 });
bullet("Build and maintain full-stack web applications across the MERN stack and SvelteKit for client-facing platforms.");
bullet("Develop RESTful APIs, JWT-based authentication, and third-party CRM and webhook integrations.");
y -= 4;
text("UI/UX Developer -- Neural Nest Solutions", { size: 10, font: bold, color: PEARL, gap: 12 });
text("Remote, India  .  Apr 2024 - Oct 2025", { size: 9, color: MIST, gap: 13 });
bullet("Designed user interfaces for web and mobile applications; collaborated with developers on UX.");
y -= 8;

heading("FLAGSHIP PROJECTS");
text("St. John's Carol Union -- Web Platform & CMS  (SvelteKit, Node.js, MongoDB)", {
  size: 9.5,
  font: bold,
  color: PEARL,
  gap: 12,
});
bullet("Full-stack platform and custom CMS for a choir ministry -- 12 homepage sections, 14 admin modules, live AI chat assistant.");
text("SJC Asanam Receipt Generator  (SvelteKit, MERN, n8n)", { size: 9.5, font: bold, color: PEARL, gap: 12 });
bullet("Donation management system with bilingual PDF receipts, n8n Google Sheets sync, and Tamil transliteration.");
y -= 8;

heading("SKILLS");
bullet("Frontend: React.js, Next.js, SvelteKit, TypeScript, Tailwind CSS, Redux Toolkit");
bullet("Backend: Node.js, Express.js, RESTful APIs, JWT Authentication, MVC");
bullet("Database: MongoDB, Mongoose, MySQL  .  Automation: n8n, Webhooks  .  CMS: WordPress");
y -= 8;

heading("EDUCATION & CERTIFICATIONS");
bullet("B.Tech, Computer Science & Engineering -- Karunya Institute of Technology and Sciences (2020-2024)");
bullet("IIT-M Pravartak Certified Full-Stack Development with AI -- HCL Guvi (2025)");
bullet("Grade 5 Theory of Music, with Merit -- Trinity College London (2023)");

const bytes = await doc.save();
await writeFile(new URL("../public/resume.pdf", import.meta.url), bytes);
console.log("Wrote public/resume.pdf");
