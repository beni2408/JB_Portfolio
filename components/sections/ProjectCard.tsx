"use client";

import { useRef } from "react";
import { GithubIcon } from "@/components/ui/icons";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/data/projects";

const MAX_TILT = 6;

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * MAX_TILT}deg) rotateX(${-y * MAX_TILT}deg)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  }

  const links = project.githubHrefs ?? (project.githubHref ? [{ label: "Source", href: project.githubHref }] : []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full rounded-xl border border-royal/60 bg-royal/10 p-6 transition-[transform,border-color] duration-200 ease-out hover:border-champagne/60"
      style={{ transformStyle: "preserve-3d" }}
    >
      <p className="font-mono-tag text-xs tracking-wide text-mist">{project.dates}</p>
      <h3 className="font-display mt-2 text-xl text-pearl">{project.title}</h3>
      <p className="mt-3 text-sm text-mist">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      {links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-pearl transition-colors hover:text-champagne"
            >
              <GithubIcon size={15} /> {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
