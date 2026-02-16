from dotenv import load_dotenv
load_dotenv()

print("Initializing ScannerAgent...")
try:
    from agents import ScannerAgent
    s = ScannerAgent()
    print("ScannerAgent init success")
except Exception as e:
    print(f"ScannerAgent init failed: {e}")

print("Initializing ComplianceAgent...")
try:
    from agents import ComplianceAgent
    c = ComplianceAgent()
    print("ComplianceAgent init success")
except Exception as e:
    print(f"ComplianceAgent init failed: {e}")

print("Initializing RemediationAgent...")
try:
    from agents import RemediationAgent
    r = RemediationAgent()
    print("RemediationAgent init success")
except Exception as e:
    print(f"RemediationAgent init failed: {e}")

print("Initializing ExecutiveAgent...")
try:
    from agents import ExecutiveAgent
    e = ExecutiveAgent()
    print("ExecutiveAgent init success")
except Exception as e:
    print(f"ExecutiveAgent init failed: {e}")
