import { Mail, MessageCircle } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h2 className="font-display mt-4 max-w-xl text-balance text-4xl text-ink sm:text-5xl">
          Let&rsquo;s build something.
        </h2>
        <p className="mt-5 max-w-lg text-lg text-mist">
          Open to full-stack roles, freelance builds, and community projects. Based in{" "}
          {profile.location} — working remote.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Button href={`mailto:${profile.email}`}>
            <Mail size={16} /> {profile.email}
          </Button>
          <Button href={profile.whatsappHref} variant="outline" target="_blank" rel="noreferrer">
            <MessageCircle size={16} /> WhatsApp
          </Button>
          <Button href={profile.github} variant="ghost" target="_blank" rel="noreferrer">
            <GithubIcon size={16} /> GitHub
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
