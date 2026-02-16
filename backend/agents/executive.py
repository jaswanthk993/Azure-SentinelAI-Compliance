class ExecutiveAgent:
    def summarize(self, mapped_findings):
        """
        Calculates risk score and generates executive summary.
        """
        total_checks = len(mapped_findings)
        high_risk = len([f for f in mapped_findings if f.get("severity") == "High" or f.get("severity") == "Critical"])
        
        # Simple score calculation
        if total_checks == 0:
            score = 100
        else:
            score = max(0, 100 - (high_risk * 20))

        summary = {
            "risk_score": score,
            "total_findings": total_checks,
            "critical_findings": high_risk,
            "status": "Compliant" if score > 80 else "At Risk"
        }
        
        return summary
