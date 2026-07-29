export function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="relative h-72 w-72 sm:h-96 sm:w-96">
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-plum/70 via-royal/50 to-pearl opacity-90 blur-2xl" />
        <div className="absolute inset-8 rounded-full border border-champagne/50" />
        <div className="absolute inset-16 rounded-full bg-linear-to-tr from-champagne/20 via-transparent to-transparent" />
        <div className="absolute inset-0 rounded-full border border-mist/20" />
      </div>
    </div>
  );
}
