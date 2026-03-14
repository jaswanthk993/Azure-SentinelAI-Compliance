from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from datetime import datetime
import io

class ReportGenerator:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self.title_style = ParagraphStyle(
            'CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            spaceAfter=30,
            textColor=colors.HexColor('#0078D4')
        )
        self.heading_style = ParagraphStyle(
            'CustomHeading',
            parent=self.styles['Heading2'],
            fontSize=16,
            spaceBefore=20,
            spaceAfter=10,
            textColor=colors.HexColor('#2d3748')
        )

    def generate_pdf(self, scan_data: dict) -> bytes:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        elements = []

        # Title
        elements.append(Paragraph(f"Azure SentinelAI Compliance Report", self.title_style))
        scan_date = scan_data.get('scan_date', datetime.now().strftime('%B %d, %Y - %I:%M %p'))
        elements.append(Paragraph(f"Date: {scan_date}", self.styles['Normal']))
        elements.append(Spacer(1, 20))

        # Executive Summary
        elements.append(Paragraph("Executive Summary", self.heading_style))
        elements.append(Paragraph(f"<b>Overall Risk Score:</b> {scan_data['risk_score']}/100", self.styles['Normal']))
        elements.append(Paragraph(f"<b>Compliance Status:</b> {scan_data['status']}", self.styles['Normal']))
        elements.append(Paragraph(f"<b>Total Findings:</b> {scan_data['total_findings']}", self.styles['Normal']))
        elements.append(Spacer(1, 20))

        # Findings Table
        elements.append(Paragraph("Detailed Findings", self.heading_style))
        
        data = [['Finding', 'Severity', 'Resource', 'Remediation']]
        for finding in scan_data['findings']:
            # Truncate long text for table
            name = (finding.get('check') or '')[:30]
            severity = finding.get('severity', 'Low')
            resource = (finding.get('resource_name') or 'Unknown')[:30]
            # Handle potential missing remediation dict
            remediation_dict = finding.get('remediation', {})
            # safely get azure_cli or default string
            fix = str(remediation_dict.get('azure_cli', 'See details'))[:40]
            
            data.append([name, severity, resource, fix])

        # Table Styling
        table = Table(data, colWidths=[120, 60, 150, 150])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0078D4')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f8fafc')),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#e2e8f0'))
        ]))
        
        elements.append(table)
        
        # Build PDF
        doc.build(elements)
        buffer.seek(0)
        return buffer.getvalue()
