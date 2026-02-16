import { motion } from "framer-motion";
import { ComplianceFramework } from "@/data/types";

interface FrameworkCardProps {
  framework: ComplianceFramework;
  index: number;
}

const colorMap: Record<string, string> = {
  primary: "hsl(var(--primary))",
  warning: "hsl(var(--warning))",
  accent: "hsl(var(--accent))",
};

const FrameworkCard = ({ framework, index }: FrameworkCardProps) => {
  const color = colorMap[framework.color] || colorMap.primary;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="glass-card p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">{framework.name}</h4>
        <span className="text-xs text-muted-foreground">{framework.issueCount} issues</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Score</span>
          <span className="font-medium" style={{ color }}>{framework.score}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${framework.score}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FrameworkCard;
