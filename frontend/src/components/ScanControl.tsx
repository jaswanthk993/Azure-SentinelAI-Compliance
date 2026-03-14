import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface ScanControlProps {
    onScan: (subId: string) => Promise<void>;
    isLoading: boolean;
}

export const ScanControl: React.FC<ScanControlProps> = ({ onScan, isLoading }) => {
    const [subId, setSubId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (subId) onScan(subId);
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Start Compliance Scan</h2>
            <form onSubmit={handleSubmit} className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        value={subId}
                        onChange={(e) => setSubId(e.target.value)}
                        placeholder="Enter Azure Subscription ID or type 'demo' for demo mode"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors shadow-sm flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Scanning...
                        </>
                    ) : (
                        'Scan Environment'
                    )}
                </button>
            </form>
        </div>
    );
};
