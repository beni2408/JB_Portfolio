"use client";

import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { HeroCanvasGate } from "@/components/three/HeroCanvasGate";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const prefersReducedMotion = useFramerReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pt-24"
      aria-label="Introduction"
    >
      <div className="pointer-events-none absolute inset-0">
        <HeroCanvasGate />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <motion.div
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          variants={container}
        >
          <motion.p variants={item} className="eyebrow">
            Full-Stack Developer &amp; Composer
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display mt-4 text-balance text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-lg text-mist sm:text-xl">
            {profile.roleLine}
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-md text-balance text-base text-mist">
            {profile.valueProp}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Button href="#projects">View Work</Button>
            <Button href={profile.resumeHref} variant="outline">
              <span>Download Résumé</span>
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Jascar Benish P on GitHub"
              className="text-mist transition-colors hover:text-champagne"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email Jascar Benish P"
              className="text-mist transition-colors hover:text-champagne"
            >
              <Mail size={20} />
            </a>
            <a
              href={profile.whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Message Jascar Benish P on WhatsApp"
              className="text-mist transition-colors hover:text-champagne"
            >
              <MessageCircle size={20} />
            </a>
          </motion.div>
        </motion.div>

        <div className="hidden md:block" aria-hidden="true" />
      </div>

      <span className="sr-only">
        Decorative rotating 3D crystalline centerpiece representing the intersection of code and
        music.
      </span>
    </section>
  );
}
