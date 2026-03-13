import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { mockTransactions } from '@/data/mockData';
import { formatCurrency, formatDate, cn } from '@/lib/utils';

export function TransactionsPage() {
  const [filter, setFilter] = useState<'ALL' | '매수' | '매도'>('ALL');

  const filteredTransactions = mockTransactions
    .filter(tx => filter === 'ALL' || tx.type === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">거래 내역</h2>

      <div className="flex gap-2">
        {(['ALL', '매수', '매도'] as const).map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer",
              filter === type
                ? "bg-[var(--color-primary)] text-white"
                : "bg-slate-100 text-[var(--color-text-secondary)] hover:bg-slate-200"
            )}
          >
            {type === 'ALL' ? '전체' : type}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>날짜</TableHead>
                <TableHead>종목명</TableHead>
                <TableHead className="text-center">유형</TableHead>
                <TableHead className="text-right">수량</TableHead>
                <TableHead className="text-right">체결가격</TableHead>
                <TableHead className="text-right">총 금액</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-[var(--color-text-secondary)]">
                    {formatDate(tx.date)}
                    <div className="text-xs">{new Date(tx.date).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{tx.name}</div>
                    <div className="text-xs text-[var(--color-text-secondary)] font-mono-num">{tx.code}</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={tx.type === '매수' ? 'danger' : 'default'}>
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono-num">{tx.quantity}주</TableCell>
                  <TableCell className="text-right font-mono-num text-[var(--color-text-secondary)]">
                    {formatCurrency(tx.price)}
                  </TableCell>
                  <TableCell className="text-right font-mono-num font-medium">
                    {formatCurrency(tx.totalAmount)}
                  </TableCell>
                </TableRow>
              ))}
              {filteredTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-[var(--color-text-secondary)]">
                    거래 내역이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {filteredTransactions.length > 0 && (
            <div className="p-4 border-t border-[var(--color-border)] flex justify-center">
              <button className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer">
                더보기
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
