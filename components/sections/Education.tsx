import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxBackdrop } from "@/components/ui/ParallaxBackdrop";
import { certifications, education } from "@/data/education";

export function Education() {
  return (
    <section
      id="education"
      aria-label="Education and certifications"
      className="relative isolate bg-royal/10 py-28"
    >
      <ParallaxBackdrop align="right" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">Education &amp; Certifications</p>
        </Reveal>

        <div className="mt-12 grid gap-14 md:grid-cols-2">
          <Reveal>
            <h3 className="text-sm font-medium uppercase tracking-widest text-champagne">
              Education
            </h3>
            <ul className="mt-6 space-y-6">
              {education.map((entry) => (
                <li key={entry.institution}>
                  <p className="font-display text-lg text-ink">{entry.degree}</p>
                  <p className="mt-1 text-sm text-mist">{entry.institution}</p>
                  <p className="font-mono-tag mt-1 text-xs text-mist">{entry.dates}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="text-sm font-medium uppercase tracking-widest text-champagne">
              Certifications
            </h3>
            <ul className="mt-6 space-y-6">
              {certifications.map((cert) => (
                <li key={cert.name}>
                  <p className="font-display text-lg text-ink">
                    {cert.name}
                    {cert.featured && (
                      <span className="ml-2 rounded-full border border-champagne/50 px-2 py-0.5 text-xs font-sans text-champagne align-middle">
                        Music
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-mist">
                    {cert.issuer} · {cert.date}
                  </p>
                  <a
                    href={cert.verifyHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm text-champagne hover:text-champagne-soft"
                  >
                    Verify credential <ExternalLink size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
