import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { mockHoldings, goal } from '@/data/mockData';
import { formatCurrency, formatPercent, cn } from '@/lib/utils';

export function PortfolioPage() {
  const [targetGoal, setTargetGoal] = useState((goal.target / 10000).toString());
  
  const totalInvestment = mockHoldings.reduce((acc, holding) => acc + (holding.averagePrice * holding.quantity), 0);
  const totalValue = mockHoldings.reduce((acc, holding) => acc + holding.totalValue, 0);
  const totalReturnAmount = totalValue - totalInvestment;
  const totalReturnRate = totalInvestment > 0 ? (totalReturnAmount / totalInvestment) * 100 : 0;
  
  const handleSetGoal = () => {
    alert(`목표 수익액이 ${formatCurrency(parseInt(targetGoal) * 10000)}으로 설정되었습니다.`);
  };

  const currentReturnProgress = Math.max(0, Math.min(100, (goal.current / goal.target) * 100));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">포트폴리오</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--color-text-secondary)]">총 평가금액</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono-num">{formatCurrency(totalValue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--color-text-secondary)]">총 투자금액</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono-num">{formatCurrency(totalInvestment)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--color-text-secondary)]">총 수익/손실</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold font-mono-num", totalReturnAmount >= 0 ? "text-[var(--color-danger)]" : "text-[var(--color-primary)]")}>
              {totalReturnAmount > 0 ? '+' : ''}{formatCurrency(totalReturnAmount)}
            </div>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>보유 종목 상세</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>종목명</TableHead>
                    <TableHead className="text-right">보유수량</TableHead>
                    <TableHead className="text-right">평균매수가</TableHead>
                    <TableHead className="text-right">현재가</TableHead>
                    <TableHead className="text-right">평가금액</TableHead>
                    <TableHead className="text-right">수익률</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHoldings.map((holding) => (
                    <TableRow key={holding.code}>
                      <TableCell>
                        <div className="font-medium">{holding.name}</div>
                        <div className="text-xs text-[var(--color-text-secondary)] font-mono-num">{holding.code}</div>
                      </TableCell>
                      <TableCell className="text-right font-mono-num">{holding.quantity}주</TableCell>
                      <TableCell className="text-right font-mono-num text-[var(--color-text-secondary)]">
                        {formatCurrency(holding.averagePrice)}
                      </TableCell>
                      <TableCell className="text-right font-mono-num">
                        {formatCurrency(holding.currentPrice)}
                      </TableCell>
                      <TableCell className="text-right font-mono-num font-medium">
                        {formatCurrency(holding.totalValue)}
                      </TableCell>
                      <TableCell className={cn("text-right font-mono-num font-medium", holding.returnRate >= 0 ? "text-[var(--color-danger)]" : "text-[var(--color-primary)]")}>
                        {formatPercent(holding.returnRate)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {mockHoldings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-[var(--color-text-secondary)]">
                        보유 종목이 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>목표 수익 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-text-primary)]">
                  목표 수익액 (만 원 단위)
                </label>
                <div className="flex gap-2">
                  <Input 
                    type="number" 
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(e.target.value)}
                    className="font-mono-num text-right"
                  />
                  <Button onClick={handleSetGoal}>설정</Button>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-[var(--color-border)]">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[var(--color-text-secondary)]">진행률</span>
                  <span className="font-bold text-[var(--color-primary)] font-mono-num">{currentReturnProgress.toFixed(1)}%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--color-primary)] transition-all duration-500"
                    style={{ width: `${currentReturnProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-[var(--color-text-secondary)] font-mono-num">{formatCurrency(goal.current)}</span>
                  <span className="text-[var(--color-text-secondary)] font-mono-num">{formatCurrency(goal.target)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
