import { useState } from "react";
import { ScanIssue } from "@/data/types";
import SeverityBadge from "./SeverityBadge";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Terminal, FileCode, ListChecks, Copy, Check } from "lucide-react";

interface IssueCardProps {
  issue: ScanIssue;
  index: number;
}

const IssueCard = ({ issue, index }: IssueCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"cli" | "terraform" | "steps">("steps");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const remediationContent = activeTab === "cli" ? issue.remediationCLI : activeTab === "terraform" ? issue.remediationTerraform : issue.remediationSteps;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card-hover overflow-hidden"
    >
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 flex items-center gap-4 text-left">
        <SeverityBadge severity={issue.severity} />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate">{issue.issueType}</h4>
          <p className="text-xs text-muted-foreground font-mono truncate">{issue.resourceName}</p>
        </div>
        <span className="text-xs text-muted-foreground hidden sm:block">{issue.resourceType}</span>
        <div className="flex gap-1 flex-wrap hidden md:flex">
          {issue.complianceFrameworks.map((f) => (
            <span key={f} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">{f}</span>
          ))}
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
              <p className="text-sm text-muted-foreground">{issue.businessImpact}</p>

              <div className="flex gap-1">
                {[
                  { key: "steps" as const, icon: ListChecks, label: "Steps" },
                  { key: "cli" as const, icon: Terminal, label: "Azure CLI" },
                  { key: "terraform" as const, icon: FileCode, label: "Terraform" },
                ].map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      activeTab === key ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="relative bg-secondary/50 rounded-lg p-3">
                <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">{remediationContent}</pre>
                <button
                  onClick={() => copyToClipboard(remediationContent)}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-secondary hover:bg-border transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IssueCard;
