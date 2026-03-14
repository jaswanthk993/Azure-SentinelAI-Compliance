import { useState } from 'react';
import { Layout } from './components/Layout';
import { ScanControl } from './components/ScanControl';
import { Dashboard } from './components/Dashboard';
import { ReportView } from './components/ReportView';
import { ReportsScreen, SettingsScreen } from './components/Screens';
import API_BASE_URL from './config';

// Mock type for the response
interface ScanResponse {
  risk_score: number;
  status: string;
  total_findings: number;
  critical_findings: number;
  findings: any[];
  scan_date?: string;
}

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [data, setData] = useState<ScanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastSubId, setLastSubId] = useState('');

  const handleScan = async (subId: string) => {
    setLoading(true);
    setLastSubId(subId);
    setError('');
    setData(null);
    try {
      const response = await fetch(`${API_BASE_URL}/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscription_id: subId }),
      });

      if (!response.ok) {
        throw new Error('Scan failed. Ensure backend is running.');
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      if (err.message === 'Failed to fetch' || err instanceof TypeError) {
        setError('Cannot connect to backend. Please ensure the backend server is running on port 8000.');
      } else {
        setError(err.message || 'Cannot connect to backend. Please ensure the backend server is running on port 8000.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {currentView === 'dashboard' && (
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome to SentinelAI</h2>
            <p className="text-blue-100 opacity-90">
              Autonomous multi-agent system for real-time Azure compliance auditing and remediation.
            </p>
          </div>

          <ScanControl onScan={handleScan} isLoading={loading} />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-2">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {data ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Dashboard data={data} subId={lastSubId} />
              <ReportView data={data} />
            </div>
          ) : (
            !loading && !error && (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">Enter a Subscription ID above to start the audit.</p>
              </div>
            )
          )}
        </div>
      )}

      {currentView === 'reports' && <ReportsScreen />}
      {currentView === 'settings' && <SettingsScreen />}
    </Layout>
  );
}

export default App;
