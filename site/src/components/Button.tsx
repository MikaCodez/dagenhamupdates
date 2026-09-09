import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties } from "react";

type Variant = "default" | "primary" | "dark";
type Size = "sm" | "md" | "lg";

const sizePad: Record<Size, string> = {
  sm: "var(--du-btn-pad-sm)",
  md: "var(--du-btn-pad-md)",
  lg: "var(--du-btn-pad-lg)",
};

function styleFor(variant: Variant, size: Size): CSSProperties {
  const base: CSSProperties = {
    display: "inline-block",
    padding: sizePad[size],
    fontSize: "var(--du-label-button)",
    fontWeight: 700,
    letterSpacing: "var(--du-tracking-button)",
    textTransform: "uppercase",
    border: "1px solid var(--du-ink)",
    background: "transparent",
    color: "var(--du-ink)",
    cursor: "pointer",
    textAlign: "center",
  };
  if (variant === "primary") {
    return {
      ...base,
      background: "var(--du-accent)",
      borderColor: "var(--du-accent)",
      color: "#FFFFFF",
    };
  }
  if (variant === "dark") {
    return {
      ...base,
      background: "var(--du-ink)",
      borderColor: "var(--du-ink)",
      color: "var(--du-ink-inverse)",
    };
  }
  return base;
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidthOnMobile?: boolean;
}

export function ButtonLink({
  href,
  variant = "default",
  size = "md",
  fullWidthOnMobile,
  className,
  style,
  ...rest
}: CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link
      href={href}
      className={[fullWidthOnMobile ? "du-btn--full-mobile" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={{ ...styleFor(variant, size), textDecoration: "none", borderBottomWidth: 0, ...style }}
      {...rest}
    />
  );
}

export function Button({
  variant = "default",
  size = "md",
  fullWidthOnMobile,
  className,
  style,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={[fullWidthOnMobile ? "du-btn--full-mobile" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={{ ...styleFor(variant, size), ...style }}
      {...rest}
    />
  );
}
