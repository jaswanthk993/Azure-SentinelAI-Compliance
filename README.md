# 🛡️ Azure SentinelAI Compliance

> **Autonomous Multi-Agent System for Real-Time Cloud Compliance & Security Auditing**

![Python](https://img.shields.io/badge/Backend-FastAPI_+_Python-blue?style=flat-square)
![React](https://img.shields.io/badge/Frontend-React_+_Vite-61DAFB?style=flat-square)
![Azure](https://img.shields.io/badge/Cloud-Azure_OpenAI-0078D4?style=flat-square)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🚀 The Problem

Cloud compliance today is **reactive, manual, and broken**.

- Cloud teams manage thousands of resources with no unified compliance view
- Auditors rely on outdated spreadsheets that are stale the moment they're generated
- CISOs have no real-time risk visibility — they find out about breaches *after* they happen
- Mapping technical misconfigurations to legal frameworks (ISO 27001, SOC 2, GDPR) requires expensive consultants

**The result?** Organizations spend an average of $5.9M per compliance failure — and most failures are preventable misconfigurations.

---

## 💡 The Solution

**Azure SentinelAI Compliance** transforms manual, reactive auditing into an **autonomous, agentic workflow** powered by Azure OpenAI.

Enter your Azure Subscription ID. Four AI agents go to work instantly:

1. 🕵️ **Scanner Agent** — queries Azure Resource Graph for real misconfigurations
2. ⚖️ **Compliance Agent** — uses GPT-4 to map findings to ISO 27001, SOC 2, and GDPR
3. 🛠️ **Remediation Agent** — generates copy-paste Azure CLI and Terraform fixes
4. 📊 **Executive Agent** — calculates a weighted 0–100 Risk Score and compliance status

The result: a **live compliance dashboard + downloadable PDF audit report** in under 60 seconds.

---

## 🎬 Demo

> 📺 **[Watch the 3-Minute Demo Video →](#)** *(link your video here)*

### Screenshots

| Dashboard | Findings & Remediation |
|-----------|----------------------|
| Risk score gauge, KPI cards, compliance pie chart | Per-finding CLI fixes, framework mappings |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User / Dashboard                      │
│              React + Vite + TypeScript                   │
└────────────────────────┬────────────────────────────────┘
                         │ POST /scan
┌────────────────────────▼────────────────────────────────┐
│                  FastAPI Backend                         │
│                  (Orchestrator)                          │
└──┬──────────────┬───────────────┬──────────────┬────────┘
   │              │               │              │
   ▼              ▼               ▼              ▼
┌──────┐    ┌──────────┐   ┌──────────┐   ┌──────────┐
│Scanner│   │Compliance│   │Remediat. │   │Executive │
│Agent  │   │  Agent   │   │  Agent   │   │  Agent   │
│       │   │          │   │          │   │          │
│Azure  │   │Azure     │   │CLI +     │   │Risk Score│
│Resource│  │OpenAI    │   │Terraform │   │PDF Report│
│Graph  │   │GPT-4     │   │Generator │   │Generator │
└───────┘   └──────────┘   └──────────┘   └──────────┘
```

### Agent Responsibilities

| Agent | Role | Key Technology |
|-------|------|---------------|
| **Scanner Agent** | Discovers misconfigurations across your Azure subscription | Azure Resource Graph, Azure SDK |
| **Compliance Agent** | Maps technical issues to ISO 27001 / SOC 2 / GDPR using AI reasoning | Azure OpenAI (GPT-4) |
| **Remediation Agent** | Generates safe, executable CLI and Terraform fix commands | Rule engine + templating |
| **Executive Agent** | Calculates weighted risk score, determines compliance status | Statistical analysis |

---

## ✅ Features

- **Real-Time Scanning** — Direct integration with Azure Resource Graph API
- **AI Compliance Mapping** — Automatically maps `public_storage` → `ISO 27001 A.13.1.1` via GPT-4
- **Weighted Risk Scoring** — 0–100 score based on severity (Critical/High/Medium/Low weights)
- **Auto-Remediation** — Copy-paste Azure CLI and Terraform commands for every finding
- **PDF Audit Reports** — Downloadable, professionally formatted compliance reports
- **Demo Mode** — Works fully without Azure credentials for evaluation/testing
- **Secure by Design** — Uses Azure DefaultAzureCredential (Managed Identity ready)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Recharts |
| Backend | Python 3.10+, FastAPI, Uvicorn |
| AI | Azure OpenAI (GPT-4 / GPT-3.5-Turbo) |
| Azure Integration | Azure Resource Graph, azure-identity, azure-mgmt-resourcegraph |
| Reports | ReportLab (PDF generation) |
| Infrastructure | Terraform (Azure App Service, Linux Web App) |

---

## ⚡ Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- An Azure Subscription (optional — demo mode works without one)
- Azure OpenAI resource (optional — mock mappings work without one)

### 1. Clone the Repository

```bash
git clone https://github.com/jaswanthk993/Azure-SentinelAI-Compliance.git
cd Azure-SentinelAI-Compliance
```

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
.\venv\Scripts\activate
# Mac / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your Azure credentials (see below)
```

### 3. Configure Environment Variables

```env
# .env

# Azure OpenAI (required for live AI compliance mapping)
AZURE_OPENAI_API_KEY=your_api_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=gpt-4

# Azure Subscription (required for live scanning)
# If not set, demo mode activates automatically
AZURE_SUBSCRIPTION_ID=your_subscription_id_here
```

> **Note:** If these are not set, the app automatically enters **Demo Mode** with realistic mock findings — perfect for evaluation.

### 4. Start the Backend

```bash
uvicorn main:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`
API docs available at: `http://localhost:8000/docs`

### 5. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🎮 Running the Demo

1. Open `http://localhost:5173`
2. Enter any Subscription ID (or type `demo-mode` for mock data)
3. Click **"Scan Environment"**
4. Watch the 4 agents process your infrastructure
5. Review findings with compliance mappings and CLI remediation commands
6. Click **"Download Report"** to get a PDF audit report

---

## 📁 Project Structure

```
Azure-SentinelAI-Compliance/
├── backend/
│   ├── agents/
│   │   ├── scanner.py          # Azure Resource Graph queries
│   │   ├── compliance.py       # GPT-4 compliance mapping
│   │   ├── remediation.py      # CLI/Terraform fix generation
│   │   └── executive.py        # Risk scoring & summary
│   ├── utils/
│   │   └── report_generator.py # PDF report generation (ReportLab)
│   ├── main.py                 # FastAPI app & API routes
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx   # Main compliance dashboard
│   │   │   ├── ScanControl.tsx # Scan trigger UI
│   │   │   ├── IssueCard.tsx   # Per-finding display
│   │   │   └── ReportView.tsx  # Report download
│   │   └── data/
│   │       └── mockData.ts     # Demo mode data
│   └── package.json
└── infra/
    └── main.tf                 # Terraform: Azure App Service
```

---

## 🔌 API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/health` | GET | Service status |
| `/scan` | POST | Run full compliance scan |
| `/report` | GET | Download PDF audit report |

**Scan Request:**
```json
POST /scan
{
  "subscription_id": "your-subscription-id"
}
```

**Scan Response:**
```json
{
  "risk_score": 60,
  "status": "At Risk",
  "total_findings": 3,
  "critical_findings": 2,
  "findings": [
    {
      "check": "public_storage",
      "resource_name": "sa-demo-public",
      "severity": "High",
      "compliance": {
        "ISO 27001": "A.13.1.1 Network Controls",
        "SOC 2": "CC6.1 Logical Access",
        "GDPR": "Art. 32 Security of Processing"
      },
      "remediation": {
        "azure_cli": "az storage account update --name sa-demo-public ...",
        "terraform": "resource \"azurerm_storage_account\" { ... }"
      }
    }
  ]
}
```

---

## 🔒 Security

- **Authentication**: Uses Azure `DefaultAzureCredential` — supports Managed Identity, environment variables, and CLI auth
- **Secrets**: Stored in `.env` locally; use Azure Key Vault in production
- **Scanner permissions**: Read-only access to Azure Resource Graph
- **Remediation**: Generates commands for review — does not auto-execute changes

---

## ☁️ Deploy to Azure

Infrastructure is defined in `infra/main.tf` using Terraform:

```bash
cd infra
terraform init
terraform plan
terraform apply
```

This provisions an Azure App Service (Linux, Python 3.11) in East US for the backend.

---

## 🗺️ Roadmap

- [x] Multi-agent scanning pipeline
- [x] Azure OpenAI compliance mapping
- [x] Auto-remediation (CLI + Terraform)
- [x] Risk scoring engine
- [x] PDF audit report generation
- [ ] Azure AD / Entra ID authentication
- [ ] Historical scan comparison
- [ ] Slack / Teams alert integration
- [ ] Azure Policy auto-remediation execution
- [ ] Multi-subscription support

---

## 👥 Contributors

| Name | Role |
|------|------|
| **Jaswanth Kumar** | Lead — Architecture, Backend, Frontend |

---

> 🏆 Built for the **Microsoft Azure AI Dev Days Hackathon 2026**
>
> Powered by Azure OpenAI · Azure Resource Graph · FastAPI · React
