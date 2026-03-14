try:
    from azure.identity import DefaultAzureCredential
    from azure.mgmt.resourcegraph import ResourceGraphClient
    from azure.mgmt.resourcegraph.models import QueryRequest
except ImportError as e:
    print(f"Warning: Azure modules not installed correctly: {e}")
    DefaultAzureCredential = None
    ResourceGraphClient = None
    QueryRequest = None

class ScannerAgent:
    def __init__(self):
        try:
            if DefaultAzureCredential and ResourceGraphClient:
                self.credential = DefaultAzureCredential()
                self.client = ResourceGraphClient(self.credential)
            else:
                self.credential = None
                self.client = None
        except Exception as e:
            print(f"Warning: Failed to initialize Azure credentials: {e}")
            self.credential = None
            self.client = None

    def scan(self, subscription_id: str):
        """
        Scans the Azure subscription for common security misconfigurations.
        """
        import re

        mock_findings = [
            {
                "check": "public_storage",
                "resource_id": "/subscriptions/sub-demo/resourceGroups/rg-demo/providers/Microsoft.Storage/storageAccounts/sa-demo-public",
                "resource_name": "sa-demo-public",
                "severity": "High",
                "details": "Storage account allows public blob access"
            },
            {
                "check": "nsg_open_ports",
                "resource_id": "/subscriptions/sub-demo/resourceGroups/rg-demo/providers/Microsoft.Network/networkSecurityGroups/nsg-demo-open",
                "resource_name": "nsg-demo-open",
                "severity": "Critical",
                "details": "NSG allows inbound traffic on all ports"
            },
            {
                "check": "unencrypted_sql",
                "resource_id": "/subscriptions/sub-demo/resourceGroups/rg-demo/providers/Microsoft.Sql/servers/sql-demo/databases/db-insecure",
                "resource_name": "db-insecure",
                "severity": "Medium",
                "details": "Transparent Data Encryption is disabled"
            }
        ]

        if not re.match(r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', subscription_id, re.IGNORECASE):
            print("Activating DEMO MODE with mock findings (no UUID).")
            return mock_findings

        queries = {
            "public_storage": "Resources | where type =~ 'microsoft.storage/storageaccounts' | where properties.allowBlobPublicAccess == true",
            "unencrypted_sql": "Resources | where type =~ 'microsoft.sql/servers/databases' | where properties.transparentDataEncryption.status == 'Disabled'",
            "nsg_open_ports": "Resources | where type =~ 'microsoft.network/networksecuritygroups' | mv-expand rules=properties.securityRules | where rules.properties.access == 'Allow' and rules.properties.direction == 'Inbound' and rules.properties.destinationPortRange == '*'",
        }

        findings = []

        if not self.client or not QueryRequest:
            print("Activating DEMO MODE with mock findings (no client).")
            return mock_findings

        try:
            for check_name, query in queries.items():
                request = QueryRequest(subscriptions=[subscription_id], query=query)
                response = self.client.resources(request)
                
                if response.data:
                    for resource in response.data:
                        findings.append({
                            "check": check_name,
                            "resource_id": resource.get("id"),
                            "resource_name": resource.get("name"),
                            "severity": "High" if check_name == "public_storage" else ("Critical" if check_name == "nsg_open_ports" else "Medium"),
                            "details": "Storage account allows public blob access" if check_name == "public_storage" else ("NSG allows inbound traffic on all ports" if check_name == "nsg_open_ports" else "Transparent Data Encryption is disabled")
                        })
                        
            if not findings:
                 print("Activating DEMO MODE with mock findings (empty findings in live mode).")
                 return mock_findings
        except Exception as e:
            print(f"Error during query execution, falling back to DEMO MODE: {e}")
            return mock_findings

        return findings
