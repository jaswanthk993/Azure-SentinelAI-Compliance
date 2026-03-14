from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

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

try:
    from fastapi.responses import Response
    from utils.report_generator import ReportGenerator
    # Initialize Report Generator
    report_gen = ReportGenerator()
except Exception as e:
    print(f"Warning: Failed to initialize ReportGenerator: {e}")
    report_gen = None

# ... (previous imports)

# In-memory storage for latest scan (Demo only)
latest_scan_result = {}

@app.post("/scan", response_model=ScanResponse)
async def run_scan(request: ScanRequest):
    global latest_scan_result
    try:
        # ... (scanning logic) ...
        # (This part is inside the function, we need to capture the response before returning)
        
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
        
        response_data = {
            "risk_score": summary["risk_score"],
            "status": summary["status"],
            "total_findings": summary["total_findings"],
            "critical_findings": summary["critical_findings"],
            "findings": final_findings
        }
        
        # Store for report generation
        latest_scan_result = response_data
        
        return response_data
        
    except Exception as e:
        print(f"Error during scan: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/report")
async def get_report():
    if not latest_scan_result:
        raise HTTPException(status_code=404, detail="No scan data available. Run a scan first.")
    
    if not report_gen:
        raise HTTPException(status_code=501, detail="Report generation is not available. Check dependencies.")
    
    pdf_bytes = report_gen.generate_pdf(latest_scan_result)
    
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=compliance_report.pdf"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
