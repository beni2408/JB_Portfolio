import Link from "next/link";
import { profile } from "@/data/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-royal/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link href="#top" className="font-display text-lg text-pearl" aria-label={`${profile.name} — back to top`}>
          JB<span className="text-champagne">.</span>
        </Link>

        <nav aria-label="Footer" className="flex gap-6">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-mist hover:text-champagne">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="text-xs text-mist">
          <p>Designed &amp; built by {profile.name}</p>
          <p className="mt-1">Next.js · React Three Fiber · Tailwind CSS</p>
          <p className="mt-1">&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
