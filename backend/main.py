from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any
from agents import ScannerAgent, ComplianceAgent, RemediationAgent, ExecutiveAgent

app = FastAPI(title="Azure SentinelAI Compliance API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ScanRequest(BaseModel):
    subscription_id: str

class Finding(BaseModel):
    check: str
    resource_id: Optional[str] = None
    resource_name: Optional[str] = None
    severity: str
    details: Optional[str] = None
    remediation: Optional[dict] = None
    compliance: Optional[dict] = None
    # Allow extra fields
    model_config = {
        "extra": "allow"
    }

class ScanResponse(BaseModel):
    risk_score: int
    status: str
    total_findings: int
    critical_findings: int
    findings: List[dict]

# Initialize Agents
scanner = ScannerAgent()
compliance = ComplianceAgent()
remediation = RemediationAgent()
executive = ExecutiveAgent()

@app.get("/")
async def root():
    return {"message": "Azure SentinelAI Compliance API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/scan", response_model=ScanResponse)
async def run_scan(request: ScanRequest):
    try:
        # 1. Scan -> Scanner Agent
        print(f"Starting scan for subscription: {request.subscription_id}")
        raw_findings = scanner.scan(request.subscription_id)
        
        # 2. Analyze -> Compliance Agent
        print("Mapping to compliance frameworks...")
        mapped_findings = compliance.map_to_frameworks(raw_findings)
        
        # 3. Fix -> Remediation Agent
        print("Generating remediation...")
        final_findings = []
        for finding in mapped_findings:
            # Add remediation instructions
            finding_with_fix = remediation.generate_fix(finding)
            final_findings.append(finding_with_fix)
            
        # 4. Summarize -> Executive Agent
        print("Calculating risk score...")
        summary = executive.summarize(final_findings)
        
        response = {
            "risk_score": summary["risk_score"],
            "status": summary["status"],
            "total_findings": summary["total_findings"],
            "critical_findings": summary["critical_findings"],
            "findings": final_findings
        }
        
        return response
        
    except Exception as e:
        print(f"Error during scan: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
