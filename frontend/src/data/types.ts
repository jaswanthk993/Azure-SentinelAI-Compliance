export type Severity = "critical" | "high" | "medium" | "low";

export interface ScanIssue {
  id: string;
  resourceId: string;
  resourceName: string;
  resourceType: string;
  issueType: string;
  severity: Severity;
  complianceFrameworks: string[];
  businessImpact: string;
  remediationCLI: string;
  remediationTerraform: string;
  remediationSteps: string;
  status: "open" | "resolved" | "acknowledged";
}

export interface ComplianceScan {
  scanId: string;
  subscriptionId: string;
  subscriptionName: string;
  timestamp: string;
  totalRiskScore: number;
  issues: ScanIssue[];
  resourcesScanned: number;
  status: "idle" | "scanning" | "completed" | "error";
}

export interface ComplianceFramework {
  name: string;
  issueCount: number;
  score: number;
  color: string;
}
