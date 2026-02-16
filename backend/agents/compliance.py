import os
from openai import AzureOpenAI

class ComplianceAgent:
    def __init__(self):
        self.api_key = os.getenv("AZURE_OPENAI_API_KEY")
        self.endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
        self.deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-4")
        
        if self.api_key and self.endpoint:
            self.client = AzureOpenAI(
                api_key=self.api_key,
                api_version="2023-05-15",
                azure_endpoint=self.endpoint
            )
        else:
            self.client = None

    def map_to_frameworks(self, findings):
        """
        Maps technical findings to compliance frameworks (ISO 27001, SOC 2, GDPR).
        """
        if not self.client:
            return self._mock_compliance_mapping(findings)

        mapped_findings = []
        
        for finding in findings:
            prompt = f"""
            Analyze the following Azure security finding and map it to ISO 27001, SOC 2, and GDPR controls.
            Finding: {finding}
            
            Return JSON format:
            {{
                "iso_27001": ["Control ID", "Description"],
                "soc_2": ["Criteria ID", "Description"],
                "gdpr": ["Article ID", "Description"],
                "business_impact": "Explanation of risk"
            }}
            """
            
            try:
                response = self.client.chat.completions.create(
                    model=self.deployment,
                    messages=[{"role": "system", "content": "You are a Compliance Officer Agent."},
                              {"role": "user", "content": prompt}]
                )
                content = response.choices[0].message.content
                # In a real app, parse the JSON. For now, store raw.
                finding["compliance_context"] = content
                mapped_findings.append(finding)
            except Exception as e:
                print(f"AI Error: {e}")
                mapped_findings.append(self._mock_enrichment(finding))

        return mapped_findings

    def _mock_compliance_mapping(self, findings):
        # Fallback if no OpenAI key
        for finding in findings:
            self._mock_enrichment(finding)
        return findings

    def _mock_enrichment(self, finding):
        check = finding.get("check")
        if check == "public_storage":
            finding["compliance"] = {
                "ISO 27001": "A.13.1.1 Network Controls",
                "SOC 2": "CC6.1 Logical Access",
                "GDPR": "Art. 32 Security of Processing",
                "Impact": "Data leakage risk."
            }
        elif check == "nsg_open_ports":
            finding["compliance"] = {
                "ISO 27001": "A.13.1.2 Security of Network Services",
                "SOC 2": "CC6.6 External Boundary Protection",
                "GDPR": "Art. 32 Security of Processing",
                "Impact": "Unauthorized access risk."
            }
        return finding
