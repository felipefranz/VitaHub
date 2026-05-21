import React from "react";

export function H1({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={`text-3xl font-bold tracking-tight text-[var(--foreground)] ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`text-2xl font-bold tracking-tight text-[var(--foreground)] ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-xl font-bold tracking-tight text-[var(--foreground)] ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={`text-lg font-bold tracking-tight text-[var(--foreground)] ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
}

export function Text({
  className = "",
  children,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { variant?: "default" | "muted" | "lead" }) {
  const variants = {
    default: "text-base text-[var(--foreground)]",
    muted: "text-sm text-[var(--muted-foreground)]",
    lead: "text-lg text-[var(--muted-foreground)]",
  };

  return (
    <p
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
