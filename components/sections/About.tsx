import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" aria-label="About" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="eyebrow">About</p>
      </Reveal>

      <div className="mt-6 grid gap-10 md:grid-cols-[200px_1fr] md:items-start md:gap-14">
        <Reveal>
          <div className="relative w-fit">
            <div
              className="absolute -inset-3 rounded-3xl border border-champagne/40"
              aria-hidden="true"
            />
            <Image
              src="/profile_pic.png"
              alt="Portrait of Jascar Benish P"
              width={200}
              height={200}
              className="relative rounded-2xl object-cover shadow-[0_20px_45px_-20px_rgba(28,24,54,0.35)]"
              priority
            />
          </div>
        </Reveal>

        <div>
          {profile.aboutParagraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={index * 0.08}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist first:mt-0">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.15}>
        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-royal/25 pt-10 sm:grid-cols-4">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-2xl text-champagne">{stat.value}</dt>
              <dd className="mt-1 text-sm text-mist">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
