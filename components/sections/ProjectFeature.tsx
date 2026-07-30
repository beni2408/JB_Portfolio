import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/data/projects";

export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.08}>
      <article className="grid gap-8 rounded-2xl border border-royal/20 bg-linear-to-br from-royal/10 via-pearl to-pearl p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono-tag text-xs tracking-wide text-mist">{project.dates}</p>
            {project.liveHref && (
              <span className="font-mono-tag inline-flex items-center gap-1.5 rounded-full border border-champagne/60 px-2.5 py-0.5 text-xs text-champagne">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" aria-hidden="true" />
                Live
              </span>
            )}
          </div>

          <h3 className="font-display mt-3 text-2xl text-ink sm:text-3xl">{project.title}</h3>

          <p className="mt-4 max-w-xl text-mist">{project.summary}</p>

          <ul className="mt-5 space-y-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm text-mist">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            {project.liveHref && (
              <a
                href={project.liveHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-champagne-soft px-5 py-2.5 text-sm font-medium text-ink transition-[filter] hover:brightness-90"
              >
                Visit live site <ExternalLink size={15} />
              </a>
            )}
            {project.githubHref && (
              <a
                href={project.githubHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-champagne"
              >
                <GithubIcon size={16} /> View source
              </a>
            )}
          </div>
        </div>

        <Parallax distance={-28} className="lg:pt-2">
          <div className="flex flex-wrap content-start gap-2 lg:justify-end">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </Parallax>
      </article>
    </Reveal>
  );
}
