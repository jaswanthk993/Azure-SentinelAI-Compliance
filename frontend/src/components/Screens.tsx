import React from 'react';
import { FileText, Download, Clock } from 'lucide-react';

export const ReportsScreen: React.FC = () => {
    const historicalReports = [
        { id: 1, date: '2023-10-25', time: '14:30', score: 85, status: 'Compliant' },
        { id: 2, date: '2023-10-20', time: '09:15', score: 62, status: 'Non-Compliant' },
        { id: 3, date: '2023-10-15', time: '11:45', score: 90, status: 'Compliant' },
        { id: 4, date: '2023-10-01', time: '16:20', score: 78, status: 'At Risk' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Historical Compliance Reports</h2>
                    <p className="text-sm text-gray-500">Download past audit reports and compliance certificates.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Report Date</th>
                                <th className="px-6 py-3">Scan Time</th>
                                <th className="px-6 py-3">Risk Score</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historicalReports.map((report) => (
                                <tr key={report.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{report.date}</td>
                                    <td className="px-6 py-4">{report.time}</td>
                                    <td className="px-6 py-4">
                                        <span className={`font-semibold ${report.score >= 80 ? 'text-green-600' : report.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                            {report.score}/100
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${report.status === 'Compliant' ? 'bg-green-100 text-green-700' :
                                                report.status === 'Non-Compliant' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1 font-medium">
                                            <Download className="h-4 w-4" /> Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export const SettingsScreen: React.FC = () => {
    return (
        <div className="max-w-4xl space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <h3 className="font-medium text-gray-900">Automatic Scanning</h3>
                            <p className="text-sm text-gray-500">Run compliance scans automatically every 24 hours.</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <h3 className="font-medium text-gray-900">Email Notifications</h3>
                            <p className="text-sm text-gray-500">Receive alerts for critical compliance violations.</p>
                        </div>
                        <input type="checkbox" className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Azure Tenant ID</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value="72f988bf-86f1-41af-91ab-2d7cd011db47" disabled />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">OpenAI API Key</label>
                        <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value="sk-xxxxxxxxxxxxxxxxxxxxxxxx" disabled />
                    </div>
                </div>
            </div>
        </div>
    );
};
