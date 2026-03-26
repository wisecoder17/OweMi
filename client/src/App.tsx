import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import { LedgerPage } from './pages/LedgerPage';
import { VerifyPage } from './pages/VerifyPage';
import { ResultPage } from './pages/ResultPage';
import { DebtPage } from './pages/DebtPage';

const App = () => {
  return (
    <Router>
      <div className="max-w-md mx-auto min-h-screen bg-surface selection:bg-brand-100 flex flex-col">
        <TopBar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<LedgerPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/debts/:id" element={<DebtPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
