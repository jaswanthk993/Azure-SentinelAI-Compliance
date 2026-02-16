import React from 'react';

interface ReportViewProps {
    data: any;
}

export const ReportView: React.FC<ReportViewProps> = ({ data }) => {
    const handleDownload = async () => {
        try {
            const response = await fetch('http://localhost:8000/report', {
                method: 'GET',
            });

            if (!response.ok) throw new Error('Download failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Azure_Compliance_Report.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading report:', error);
            alert("Failed to download report. Ensure a scan has been run first.");
        }
    };

    return (
        <div className="mt-6 flex justify-end">
            <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 flex items-center gap-2 transition-colors"
            >
                <span>📄</span> Download Audit Report (PDF)
            </button>
        </div>
    );
};
