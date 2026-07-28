import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="bg-royal/10 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2 className="font-display mt-4 max-w-xl text-balance text-3xl text-pearl sm:text-4xl">
            A full-stack toolkit, built for shipping
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.category} delay={(index % 3) * 0.06}>
              <h3 className="text-sm font-medium uppercase tracking-widest text-champagne">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li key={skill}>
                    <span className="inline-block rounded-full border border-royal bg-ink/60 px-3.5 py-1.5 text-sm text-pearl transition-colors duration-200 hover:border-champagne hover:text-champagne">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
