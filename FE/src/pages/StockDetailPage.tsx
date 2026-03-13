import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { mockStocks, generateChartData, accountInfo } from '@/data/mockData';
import { formatCurrency, formatPercent, cn } from '@/lib/utils';

export function StockDetailPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  
  const stock = mockStocks.find(s => s.code === code);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState<string>('');

  if (!stock) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <h2 className="text-xl font-bold">종목을 찾을 수 없습니다.</h2>
        <Button onClick={() => navigate('/stocks')}>목록으로 돌아가기</Button>
      </div>
    );
  }

  const chartData = generateChartData(stock.currentPrice);
  const isPositive = stock.changeRate >= 0;
  const colorClass = isPositive ? 'text-[var(--color-danger)]' : 'text-[var(--color-primary)]';
  const qty = parseInt(quantity, 10) || 0;
  const estimatedAmount = qty * stock.currentPrice;
  const hasEnoughBalance = tradeType === 'buy' ? estimatedAmount <= accountInfo.balance : true;

  const handleTrade = () => {
    if (qty <= 0) {
      alert('수량을 입력해주세요.');
      return;
    }
    if (tradeType === 'buy' && !hasEnoughBalance) {
      alert('잔고가 부족합니다.');
      return;
    }
    alert(`${stock.name} ${qty}주 ${tradeType === 'buy' ? '매수' : '매도'} 주문이 완료되었습니다.`);
    setQuantity('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{stock.name}</h2>
                    <span className="text-[var(--color-text-secondary)] font-mono-num">{stock.code}</span>
                    <Badge variant="outline">{stock.market}</Badge>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className={cn("text-4xl font-bold font-mono-num", colorClass)}>
                      {formatCurrency(stock.currentPrice)}
                    </span>
                    <div className={cn("flex flex-col font-mono-num font-medium", colorClass)}>
                      <span>{stock.change > 0 ? '▲' : stock.change < 0 ? '▼' : ''} {formatCurrency(Math.abs(stock.change))}</span>
                      <span>{formatPercent(stock.changeRate)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[300px] w-full mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      domain={['auto', 'auto']} 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
                      tickFormatter={(value) => value.toLocaleString()}
                      dx={-10}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`₩${value.toLocaleString()}`, '가격']}
                      labelFormatter={(label) => `${label}일`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke={isPositive ? 'var(--color-danger)' : 'var(--color-primary)'} 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>종목 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-[var(--color-text-secondary)] mb-1">시가</div>
                  <div className="font-medium font-mono-num">{formatCurrency(stock.open)}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--color-text-secondary)] mb-1">고가</div>
                  <div className="font-medium font-mono-num text-[var(--color-danger)]">{formatCurrency(stock.high)}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--color-text-secondary)] mb-1">저가</div>
                  <div className="font-medium font-mono-num text-[var(--color-primary)]">{formatCurrency(stock.low)}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--color-text-secondary)] mb-1">거래량</div>
                  <div className="font-medium font-mono-num">{stock.volume.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-80 shrink-0">
          <Card className="sticky top-6">
            <CardContent className="pt-6 space-y-6">
              <div className="flex p-1 bg-slate-100 rounded-lg">
                <button
                  className={cn(
                    "flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer",
                    tradeType === 'buy' ? "bg-white text-[var(--color-danger)] shadow-sm" : "text-[var(--color-text-secondary)]"
                  )}
                  onClick={() => setTradeType('buy')}
                >
                  매수
                </button>
                <button
                  className={cn(
                    "flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer",
                    tradeType === 'sell' ? "bg-white text-[var(--color-primary)] shadow-sm" : "text-[var(--color-text-secondary)]"
                  )}
                  onClick={() => setTradeType('sell')}
                >
                  매도
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[var(--color-text-secondary)] block mb-1">주문 수량</label>
                  <div className="relative">
                    <Input
                      type="number"
                      min="1"
                      placeholder="0"
                      className="text-right pr-8 font-mono-num text-lg"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">주</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)]">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-[var(--color-text-secondary)]">예상 금액</span>
                    <span className="font-bold font-mono-num text-lg">{formatCurrency(estimatedAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">주문 가능 금액</span>
                    <span className="font-medium font-mono-num">{formatCurrency(accountInfo.balance)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full h-12 text-lg"
                  variant={tradeType === 'buy' ? 'danger' : 'primary'}
                  onClick={handleTrade}
                >
                  {tradeType === 'buy' ? '매수하기' : '매도하기'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
