import React from 'react';

interface ReportViewProps {
    data: any;
}

export const ReportView: React.FC<ReportViewProps> = ({ data }) => {
    const handleDownload = () => {
        // In a real app, this would trigger a PDF generation on backend or use jsPDF
        alert("Downloading Audit-Ready PDF Report...");
    };

    return (
        <div className="mt-6 flex justify-end">
            <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 flex items-center gap-2"
            >
                <span>📄</span> Download Audit Report
            </button>
        </div>
    );
};
