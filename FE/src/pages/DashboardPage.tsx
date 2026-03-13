import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { accountInfo, mockHoldings, goal } from '@/data/mockData';
import { formatCurrency, formatPercent, cn } from '@/lib/utils';

export function DashboardPage() {
  const totalAssets = accountInfo.balance + mockHoldings.reduce((acc, holding) => acc + holding.totalValue, 0);
  const totalInvestment = mockHoldings.reduce((acc, holding) => acc + (holding.averagePrice * holding.quantity), 0);
  const totalReturnRate = ((totalAssets - accountInfo.initialBalance) / accountInfo.initialBalance) * 100;
  
  const progressPercent = Math.min(100, Math.max(0, (goal.current / goal.target) * 100));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">대시보드</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--color-text-secondary)]">총 자산</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono-num">{formatCurrency(totalAssets)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--color-text-secondary)]">총 수익률</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold font-mono-num", totalReturnRate >= 0 ? "text-[var(--color-danger)]" : "text-[var(--color-primary)]")}>
              {formatPercent(totalReturnRate)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--color-text-secondary)]">현금 잔고</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono-num">{formatCurrency(accountInfo.balance)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--color-text-secondary)]">투자 금액</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono-num">{formatCurrency(totalInvestment)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>목표 수익 달성률</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">현재 {formatCurrency(goal.current)}</span>
              <span className="font-medium">목표 {formatCurrency(goal.target)}</span>
            </div>
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--color-primary)] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-right text-sm font-medium text-[var(--color-primary)] font-mono-num">
              {progressPercent.toFixed(1)}%
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>보유 종목 요약</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>종목명</TableHead>
                <TableHead className="text-right">현재가</TableHead>
                <TableHead className="text-right">수익률</TableHead>
                <TableHead className="text-right">평가금액</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHoldings.map((stock) => (
                <TableRow key={stock.code}>
                  <TableCell>
                    <div className="font-medium">{stock.name}</div>
                    <div className="text-xs text-[var(--color-text-secondary)] font-mono-num">{stock.code}</div>
                  </TableCell>
                  <TableCell className="text-right font-mono-num">
                    {formatCurrency(stock.currentPrice)}
                  </TableCell>
                  <TableCell className={cn("text-right font-mono-num font-medium", stock.returnRate >= 0 ? "text-[var(--color-danger)]" : "text-[var(--color-primary)]")}>
                    {formatPercent(stock.returnRate)}
                  </TableCell>
                  <TableCell className="text-right font-mono-num font-medium">
                    {formatCurrency(stock.totalValue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
