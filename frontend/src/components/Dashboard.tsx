import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, CheckCircle, XCircle, Shield, Activity, FileWarning } from 'lucide-react';

interface Finding {
    check: string;
    resource_name: string;
    severity: string;
    description?: string;
    remediation?: {
        azure_cli: string;
        terraform: string;
    };
    compliance?: {
        "ISO 27001"?: string;
        "SOC 2"?: string;
        "GDPR"?: string;
    };
}

interface DashboardProps {
    data: {
        risk_score: number;
        status: string;
        total_findings: number;
        critical_findings: number;
        findings: Finding[];
    };
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
    const chartData = [
        { name: 'Risk', value: 100 - data.risk_score },
        { name: 'Secure', value: data.risk_score },
    ];
    const COLORS = ['#ef4444', '#10b981'];

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <Shield className="h-4 w-4" />
                        <span className="text-sm font-medium">Risk Score</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{data.risk_score}<span className="text-lg text-gray-400 font-normal">/100</span></div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <Activity className="h-4 w-4" />
                        <span className="text-sm font-medium">Status</span>
                    </div>
                    <div className={`text-2xl font-bold flex items-center gap-2 ${data.status === 'Compliant' ? 'text-green-600' : 'text-red-600'}`}>
                        {data.status === 'Compliant' ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                        {data.status}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <FileWarning className="h-4 w-4" />
                        <span className="text-sm font-medium">Total Findings</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{data.total_findings}</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div className="text-gray-500 text-sm font-medium mb-2">Critical Issues</div>
                    <div className="text-3xl font-bold text-red-600">{data.critical_findings}</div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-1">
                    <h3 className="font-semibold text-gray-900 mb-6">Compliance Overview</h3>
                    <div className="h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-gray-700">{data.risk_score}%</span>
                        </div>
                    </div>
                </div>

                {/* Findings List */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
                    <h3 className="font-semibold text-gray-900 mb-6">Risk Findings & Remediation</h3>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {data.findings.length === 0 && <p className="text-gray-500 text-center py-8">No issues found. Great job!</p>}
                        {data.findings.map((finding, idx) => (
                            <div key={idx} className="border border-gray-100 rounded-lg p-5 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        {finding.severity === 'Critical' || finding.severity === 'High' ?
                                            <XCircle className="text-red-500 h-5 w-5 mt-0.5" /> : <AlertTriangle className="text-yellow-500 h-5 w-5 mt-0.5" />}
                                        <div>
                                            <h4 className="font-medium text-gray-900">{finding.check}</h4>
                                            <p className="text-sm text-gray-500">Resource: {finding.resource_name}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${finding.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                                        {finding.severity}
                                    </span>
                                </div>

                                {finding.compliance && (
                                    <div className="bg-slate-50 p-3 rounded-md text-xs text-slate-600 mb-3 grid gap-1">
                                        {finding.compliance["ISO 27001"] && <div><span className="font-semibold text-slate-800">ISO 27001:</span> {finding.compliance["ISO 27001"]}</div>}
                                        {finding.compliance["SOC 2"] && <div><span className="font-semibold text-slate-800">SOC 2:</span> {finding.compliance["SOC 2"]}</div>}
                                    </div>
                                )}

                                {finding.remediation && (
                                    <div className="mt-3">
                                        <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Remediation (Azure CLI)</p>
                                        <div className="bg-gray-900 rounded-md p-3 group relative">
                                            <code className="text-green-400 text-xs font-mono break-all">
                                                {finding.remediation.azure_cli}
                                            </code>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
