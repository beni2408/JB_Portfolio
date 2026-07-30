import { Reveal } from "@/components/ui/Reveal";
import { ParallaxBackdrop } from "@/components/ui/ParallaxBackdrop";
import { skillGroups } from "@/data/skills";
import { skillIcons } from "@/components/sections/skillIcons";

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="relative isolate bg-royal/10 py-28">
      <ParallaxBackdrop align="left" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2 className="font-display mt-4 max-w-xl text-balance text-3xl text-ink sm:text-4xl">
            A full-stack toolkit, built for shipping
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.category} delay={(index % 3) * 0.06}>
              <h3 className="text-sm font-medium uppercase tracking-widest text-champagne">
                {group.category}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-3">
                {group.items.map((skill) => {
                  const Icon = skillIcons[skill];
                  return (
                    <li key={skill}>
                      <div className="group flex w-[86px] flex-col items-center gap-2.5 rounded-xl border border-royal/15 bg-pearl px-2 py-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-champagne/50 hover:shadow-[0_14px_28px_-16px_rgba(28,24,54,0.35)]">
                        <span
                          aria-hidden="true"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-royal/8 transition-colors duration-200 group-hover:bg-champagne/15"
                        >
                          {Icon && (
                            <Icon
                              size={19}
                              className="text-ink/70 transition-colors duration-200 group-hover:text-champagne"
                            />
                          )}
                        </span>
                        <span className="text-[11px] leading-tight text-mist transition-colors duration-200 group-hover:text-ink">
                          {skill}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
