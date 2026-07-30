import { Reveal } from "@/components/ui/Reveal";
import { ParallaxBackdrop } from "@/components/ui/ParallaxBackdrop";
import { TimelineSpine } from "@/components/sections/TimelineSpine";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="relative isolate mx-auto max-w-6xl px-6 py-28"
    >
      <ParallaxBackdrop align="left" />
      <Reveal>
        <p className="eyebrow">Experience</p>
        <h2 className="font-display mt-4 max-w-xl text-balance text-3xl text-ink sm:text-4xl">
          Where the work has happened
        </h2>
      </Reveal>

      <TimelineSpine>
        {experience.map((entry, index) => (
          <Reveal as="li" key={entry.company} delay={index * 0.08} className="relative">
            <span
              className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-champagne sm:-left-[calc(2.5rem+5px)]"
              aria-hidden="true"
            />
            <p className="font-mono-tag text-xs tracking-wide text-mist">{entry.dates}</p>
            <h3 className="font-display mt-2 text-xl text-ink sm:text-2xl">
              {entry.role} · {entry.company}
            </h3>
            {entry.client && (
              <p className="mt-1 text-sm text-mist">Client: {entry.client}</p>
            )}
            <p className="mt-1 text-sm text-mist">
              {entry.location}
              {entry.website && (
                <>
                  {" · "}
                  <a
                    href={entry.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-champagne hover:text-champagne-soft"
                  >
                    {entry.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </>
              )}
            </p>
            <ul className="mt-4 max-w-2xl space-y-2">
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-mist">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-mist" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </TimelineSpine>
    </section>
  );
}
