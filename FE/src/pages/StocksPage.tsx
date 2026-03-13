import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { mockStocks } from '@/data/mockData';
import { formatCurrency, formatPercent, cn } from '@/lib/utils';

export function StocksPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'KOSPI' | 'KOSDAQ'>('ALL');
  const navigate = useNavigate();

  const filteredStocks = mockStocks.filter(stock => {
    const matchesSearch = stock.name.includes(search) || stock.code.includes(search);
    const matchesFilter = filter === 'ALL' || stock.market === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">종목 검색</h2>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" size={18} />
          <Input
            placeholder="종목명 또는 코드 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          {(['ALL', 'KOSPI', 'KOSDAQ'] as const).map(market => (
            <button
              key={market}
              onClick={() => setFilter(market)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors flex-1 md:flex-none cursor-pointer",
                filter === market
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-slate-100 text-[var(--color-text-secondary)] hover:bg-slate-200"
              )}
            >
              {market === 'ALL' ? '전체' : market}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>종목명/코드</TableHead>
                <TableHead className="text-right">현재가</TableHead>
                <TableHead className="text-right">전일대비</TableHead>
                <TableHead className="text-right">등락률</TableHead>
                <TableHead className="text-right hidden md:table-cell">거래량</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.map((stock) => (
                <TableRow 
                  key={stock.code}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => navigate(`/stocks/${stock.code}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{stock.name}</span>
                      <Badge variant="outline">{stock.market}</Badge>
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] font-mono-num">{stock.code}</div>
                  </TableCell>
                  <TableCell className="text-right font-mono-num font-medium">
                    {formatCurrency(stock.currentPrice)}
                  </TableCell>
                  <TableCell className={cn("text-right font-mono-num", stock.change > 0 ? "text-[var(--color-danger)]" : stock.change < 0 ? "text-[var(--color-primary)]" : "")}>
                    {stock.change > 0 ? '▲ ' : stock.change < 0 ? '▼ ' : ''}
                    {formatCurrency(Math.abs(stock.change))}
                  </TableCell>
                  <TableCell className={cn("text-right font-mono-num font-medium", stock.changeRate > 0 ? "text-[var(--color-danger)]" : stock.changeRate < 0 ? "text-[var(--color-primary)]" : "")}>
                    {formatPercent(stock.changeRate)}
                  </TableCell>
                  <TableCell className="text-right font-mono-num text-[var(--color-text-secondary)] hidden md:table-cell">
                    {stock.volume.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {filteredStocks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-[var(--color-text-secondary)]">
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
