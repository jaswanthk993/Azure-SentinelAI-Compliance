import { Severity } from "@/data/types";
import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

const config: Record<Severity, { label: string; classes: string }> = {
  critical: { label: "Critical", classes: "bg-destructive/15 text-destructive border-destructive/30" },
  high: { label: "High", classes: "bg-destructive/10 text-destructive/80 border-destructive/20" },
  medium: { label: "Medium", classes: "bg-warning/15 text-warning border-warning/30" },
  low: { label: "Low", classes: "bg-accent/15 text-accent border-accent/30" },
};

const SeverityBadge = ({ severity, className }: SeverityBadgeProps) => {
  const c = config[severity];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border", c.classes, className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", {
        "bg-destructive": severity === "critical" || severity === "high",
        "bg-warning": severity === "medium",
        "bg-accent": severity === "low",
      })} />
      {c.label}
    </span>
  );
};

export default SeverityBadge;
