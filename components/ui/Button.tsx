import Link from "next/link";
import type { ComponentProps } from "react";

type BaseProps = {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
};

type ButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
    | ({ href?: undefined } & Omit<ComponentProps<"button">, "className">)
  );

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200";

const variants: Record<NonNullable<BaseProps["variant"]>, string> = {
  solid: "bg-champagne text-ink hover:bg-champagne-soft",
  outline: "border border-champagne text-champagne hover:bg-champagne/10",
  ghost: "text-pearl hover:text-champagne",
};

export function Button({ children, variant = "solid", className = "", ...rest }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (rest.href) {
    const { href, ...linkProps } = rest as { href: string } & Omit<
      ComponentProps<typeof Link>,
      "href" | "className"
    >;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ComponentProps<"button">;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
