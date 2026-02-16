import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Scan, AlertTriangle, CheckCircle2, Server, FileText, Activity, Search } from "lucide-react";
import RiskScoreGauge from "@/components/RiskScoreGauge";
import StatCard from "@/components/StatCard";
import IssueCard from "@/components/IssueCard";
import FrameworkCard from "@/components/FrameworkCard";
import SeverityBadge from "@/components/SeverityBadge";
import { mockScan, mockIssues, frameworkStats } from "@/data/mockData";
import { ComplianceScan, Severity } from "@/data/types";

const ScanningOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
  >
    <div className="text-center space-y-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        <Scan className="w-16 h-16 text-primary" />
      </motion.div>
      <div>
        <h2 className="text-xl font-semibold text-foreground">Scanning Azure Environment</h2>
        <p className="text-sm text-muted-foreground mt-2">Analyzing resources, security configurations, and compliance posture...</p>
      </div>
      <div className="flex gap-3 justify-center">
        {["Resources", "NSGs", "Storage", "Disks", "Logs"].map((item, i) => (
          <motion.span
            key={item}
            className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Index = () => {
  const [scan, setScan] = useState<ComplianceScan | null>(null);
  const [scanning, setScanning] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all");

  const startScan = () => {
    setScanning(true);
    setScan(null);
    setTimeout(() => {
      setScan(mockScan);
      setScanning(false);
    }, 3000);
  };

  const filteredIssues = scan?.issues.filter((i) => severityFilter === "all" || i.severity === severityFilter) ?? [];

  const severityCounts = scan
    ? {
        critical: scan.issues.filter((i) => i.severity === "critical").length,
        high: scan.issues.filter((i) => i.severity === "high").length,
        medium: scan.issues.filter((i) => i.severity === "medium").length,
        low: scan.issues.filter((i) => i.severity === "low").length,
      }
    : null;

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>{scanning && <ScanningOverlay />}</AnimatePresence>

      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">SentinelAI <span className="gradient-text">Compliance</span></h1>
              <p className="text-xs text-muted-foreground">Azure Cloud Security & Compliance</p>
            </div>
          </div>
          <button
            onClick={startScan}
            disabled={scanning}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 glow-primary"
          >
            <Scan className="w-4 h-4" />
            {scanning ? "Scanning..." : scan ? "Re-scan" : "Scan Environment"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!scan && !scanning ? (
          /* Landing state */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 text-center">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 mb-8">
                <Shield className="w-20 h-20 text-primary" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-foreground mb-3">Azure Compliance Scanner</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Scan your Azure infrastructure for security misconfigurations, map findings to ISO 27001, SOC 2 & GDPR frameworks, and generate AI-powered remediation steps.
            </p>
            <button
              onClick={startScan}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all glow-primary"
            >
              <Search className="w-5 h-5" />
              Start Compliance Scan
            </button>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
              {[
                { icon: <Scan className="w-5 h-5" />, title: "Infrastructure Scan", desc: "Resource Graph analysis" },
                { icon: <Activity className="w-5 h-5" />, title: "Risk Mapping", desc: "ISO, SOC 2, GDPR" },
                { icon: <FileText className="w-5 h-5" />, title: "Audit Report", desc: "Executive-ready PDF" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass-card p-5 text-center space-y-2"
                >
                  <div className="inline-flex p-2.5 rounded-lg bg-primary/10 text-primary">{item.icon}</div>
                  <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : scan ? (
          /* Dashboard */
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Resources Scanned" value={scan.resourcesScanned} icon={<Server className="w-5 h-5" />} delay={0.1} />
              <StatCard label="Issues Found" value={scan.issues.length} icon={<AlertTriangle className="w-5 h-5" />} delay={0.15} />
              <StatCard label="Critical Issues" value={severityCounts?.critical ?? 0} icon={<AlertTriangle className="w-5 h-5" />} delay={0.2} trend="Requires immediate attention" />
              <StatCard label="Subscription" value={scan.subscriptionName} icon={<CheckCircle2 className="w-5 h-5" />} delay={0.25} />
            </div>

            {/* Score + Frameworks */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 flex items-center justify-center"
              >
                <RiskScoreGauge score={scan.totalRiskScore} />
              </motion.div>
              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Framework Compliance</h3>
                {frameworkStats.map((fw, i) => (
                  <FrameworkCard key={fw.name} framework={fw} index={i} />
                ))}
              </div>
            </div>

            {/* Issues */}
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Security Findings</h3>
                <div className="flex gap-1.5 flex-wrap">
                  {(["all", "critical", "high", "medium", "low"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeverityFilter(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        severityFilter === s ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s === "all" ? "All" : <>{s.charAt(0).toUpperCase() + s.slice(1)} {severityCounts?.[s] ? `(${severityCounts[s]})` : ""}</>}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {filteredIssues.map((issue, i) => (
                  <IssueCard key={issue.id} issue={issue} index={i} />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Index;
