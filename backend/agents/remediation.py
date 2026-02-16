class RemediationAgent:
    def generate_fix(self, finding):
        """
        Generates CLI and Terraform fixes for a given finding.
        """
        check = finding.get("check")
        resource_id = finding.get("resource_id")
        resource_name = finding.get("resource_name")

        fix = {
            "azure_cli": "",
            "terraform": ""
        }

        if check == "public_storage":
            fix["azure_cli"] = f"az storage account update --name {resource_name} --resource-group <rg-name> --allow-blob-public-access false"
            fix["terraform"] = f"""
resource "azurerm_storage_account" "example" {{
  name                     = "{resource_name}"
  ...
  allow_blob_public_access = false
}}
"""
        elif check == "nsg_open_ports":
            fix["azure_cli"] = f"az network nsg rule delete --resource-group <rg-name> --nsg-name {resource_name} --name AllowAllInbound"
            fix["terraform"] = f"""
# Remove the 'Allow' rule for port *
"""

        finding["remediation"] = fix
        return finding
