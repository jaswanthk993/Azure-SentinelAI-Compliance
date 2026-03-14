class ExecutiveAgent:
    def summarize(self, mapped_findings):
        severity_weights = {
            'Critical': 25,
            'High': 15,
            'Medium': 5,
            'Low': 1
        }
        total_penalty = sum(
            severity_weights.get(f.get('severity', 'Low'), 1)
            for f in mapped_findings
        )
        score = max(0, 100 - min(total_penalty, 100))
        critical = len([f for f in mapped_findings if f.get('severity') in ('Critical', 'High')])
        return {
            "risk_score": score,
            "total_findings": len(mapped_findings),
            "critical_findings": critical,
            "status": "Compliant" if score >= 80 else "At Risk"
        }
