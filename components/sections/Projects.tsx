import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectFeature } from "@/components/sections/ProjectFeature";
import { flagshipProjects, otherProjects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" aria-label="Featured projects" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="eyebrow">Featured Projects</p>
        <h2 className="font-display mt-4 max-w-xl text-balance text-3xl text-pearl sm:text-4xl">
          Production platforms, not tutorials
        </h2>
      </Reveal>

      <div className="mt-14 space-y-10">
        {flagshipProjects.map((project, index) => (
          <ProjectFeature key={project.slug} project={project} index={index} />
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {otherProjects.map((project, index) => (
          <Reveal key={project.slug} delay={(index % 3) * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
