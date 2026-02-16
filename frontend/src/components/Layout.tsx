import React from 'react';
import { ShieldCheck, LayoutDashboard, FileText, Settings, Bell, User } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                    <ShieldCheck className="h-8 w-8 text-blue-400" />
                    <span className="font-bold text-lg tracking-tight">SentinelAI</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg text-white shadow-sm">
                        <LayoutDashboard className="h-5 w-5" />
                        <span className="font-medium">Dashboard</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <FileText className="h-5 w-5" />
                        <span className="font-medium">Reports</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <Settings className="h-5 w-5" />
                        <span className="font-medium">Settings</span>
                    </a>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="font-bold text-xs">A</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Admin User</p>
                            <p className="text-xs text-slate-400">admin@contoso.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shadow-sm">
                    <h1 className="text-xl font-semibold text-gray-800">Compliance Overview</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Bell className="h-5 w-5" />
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                            <User className="h-5 w-5" />
                            <span className="text-sm font-medium">Profile</span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
