/** Shown instead of the 3D centrepiece on mobile, low-end devices and under
 * reduced motion.
 *
 * Deliberately a soft, off-centre wash rather than a ringed orb: on a phone the
 * hero is text-only, so anything centred sits directly behind the headline. The
 * previous version put two hard 1px circles across it and dropped the h1 to
 * 1.30:1 contrast. Blur-only, no crisp edges, biased low and right so it reads
 * as ambient depth behind the copy instead of a shape competing with it.
 */
export function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,var(--plum)_0%,transparent_70%)] opacity-[0.10] blur-3xl sm:h-[26rem] sm:w-[26rem]" />
      <div className="absolute -right-10 top-1/2 h-56 w-56 translate-y-6 rounded-full bg-[radial-gradient(circle,var(--champagne)_0%,transparent_72%)] opacity-[0.09] blur-3xl sm:h-72 sm:w-72" />
    </div>
  );
}
