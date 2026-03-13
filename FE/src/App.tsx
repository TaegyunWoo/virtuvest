import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { StocksPage } from '@/pages/StocksPage';
import { StockDetailPage } from '@/pages/StockDetailPage';
import { PortfolioPage } from '@/pages/PortfolioPage';
import { TransactionsPage } from '@/pages/TransactionsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/stocks/:code" element={<StockDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
