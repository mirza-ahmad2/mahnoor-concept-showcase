import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MotionReveal } from "./MotionReveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  action,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverted";
  action?: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <MotionReveal
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p
            className={cn(
              "eyebrow mb-4",
              tone === "inverted" ? "text-champagne" : "text-aubergine",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <Tag className="display-lg">{title}</Tag>
        {description ? (
          <p
            className={cn(
              "lede mt-4",
              tone === "inverted" ? "text-ivory/70" : "text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </MotionReveal>
  );
}
