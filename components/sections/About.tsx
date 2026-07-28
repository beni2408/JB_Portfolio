import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" aria-label="About" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="eyebrow">About</p>
      </Reveal>

      <div className="mt-6 grid gap-12 md:grid-cols-[1.3fr_1fr]">
        <div>
          {profile.aboutParagraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={index * 0.08}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist first:mt-0">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 gap-6 border-l border-royal/60 pl-8">
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl text-champagne">{stat.value}</dt>
                <dd className="mt-1 text-sm text-mist">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
