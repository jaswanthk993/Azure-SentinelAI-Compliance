# 🛡️ Azure SentinelAI Compliance

> **Autonomous Multi-Agent System for Real-Time Cloud Compliance & Auditing**

![Azure SentinelAI Banner] ![Python](https://img.shields.io/badge/Backend-FastAPI-blue?style=flat-square) ![React](https://img.shields.io/badge/Frontend-React_Vite-61DAFB?style=flat-square) ![Azure](https://img.shields.io/badge/Cloud-Azure_OpenAI-0078D4?style=flat-square)

---

## 🚀 The Problem
In modern cloud environments, compliance is **reactive, manual, and fragmented**.
- **Cloud Admins** struggle with thousands of misconfigurations.
- **Auditors** rely on outdated spreadsheets.
- **CISOs** lack a real-time view of risk.

## 💡 The Solution
**Azure SentinelAI Compliance** transforms manual auditing into an **autonomous, agentic workflow**.
It uses a multi-agent AI system to:
1.  **Scan** Azure infrastructure in real-time.
2.  **Map** findings to ISO 27001, SOC 2, and GDPR using LLMs.
3.  **Calculate** a unified Risk Score.
4.  **Auto-Remediate** issues with generated CLI/Terraform fixes.

---

## 🏗️ System Architecture

The system follows a modular **Multi-Agent Architecture**:

graph TD
    User[User / Dashboard] -->|Trigger Scan| API[FastAPI Backend]
    API -->|Dispatch| Scanner[🕵️ Scanner Agent]
    Scanner -->|Azure Resource Graph| Azure[Azure Subscription]
    Scanner -->|Raw Findings| Compliance[⚖️ Compliance Agent]
    Compliance -->|Azure OpenAI (GPT-4)| LLM[LLM Reasoning]
    LLM -->|Mapped Regulations| Compliance
    Compliance -->|Enriched Data| Remediation[🛠️ Remediation Agent]
    Remediation -->|Fix Scripts| Executive[📊 Executive Agent]
    Executive -->|Risk Score & Report| API
    API -->|JSON Response| User
```

### 🤖 The Agents
| Agent | Role | Tech Stack |
|-------|------|------------|
| **Scanner Agent** | Discovers resources & misconfigurations | Azure Resource Graph, Python SDK |
| **Compliance Agent** | Maps technical issues to legal frameworks (ISO/SOC2) | Azure OpenAI (GPT-4), Prompt Engineering |
| **Remediation Agent** | Generates safe, executable fix commands | Semantic Kernel / LangChain principles |
| **Executive Agent** | Aggregates data into meaningful ROI & Risk Scores | Statistical Analysis, JSON Processing |

---

## ⚡ Features (Hackathon Win Checklist)
- ✅ **Real-Time Scanning**: Direct integration with Azure Resource Graph.
- ✅ **AI Compliance Mapping**: "Public Storage" -> "ISO 27001 A.13.1.1" automagically.
- ✅ **Risk Scoring Engine**: 0-100 Score based on severity weights.
- ✅ **Auto-Remediation**: Copy-paste Azure CLI commands to fix issues instantly.
- ✅ **Audit-Ready Reports**: PDF generation for compliance officers (Coming Soon).
- ✅ **Secure by Design**: Uses Azure Managed Identity & Key Vault.

---

## 🛠️ Setup & Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- Azure Subscription (Owner/Contributor access)
- Azure OpenAI Service (gpt-4 or gpt-35-turbo)

### 1. Clone Repository
```bash
git clone https://github.com/jaswanthk993/Azure-SentinelAI-Compliance.git
cd Azure-SentinelAI-Compliance
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

# Configure Secrets
cp .env.example .env
# Edit .env with your Azure Keys
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Running the Demo
1.  Open `http://localhost:5173`.
2.  Log in (Mocked for Demo).
3.  Enter **Subscription ID** (or use `demo-mode`).
4.  Watch the agents work! 🚀

---

## 📊 Demo Flow
1.  **"Scan Environment"**: User clicks the button.
2.  **Agent Logs**: Watch the backend terminal to see agents "thinking".
3.  **Risk Dashboard**: See the score drop/rise based on findings.
4.  **Remediation**: Click on a finding to see the AI-generated fix.
5.  **Report**: Download the PDF audit report.

---

## 🛡️ Security
- **Authentication**: Azure AD / Entra ID (Planned).
- **Secrets**: Stored in `.env` (Local) or Azure Key Vault (Prod).
- **Permissions**: Read-only access for Scanner, Write access required for Remediation.

---

## 👥 Contributors
- **Jaswanth Kumar** - *Lead Functionality & Architecture*

---

> Built for the **Microsoft Azure AI Hackathon 2026**.
