export interface OHLCData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const user = {
  email: 'investor@virtuvest.kr',
  nickname: '주식왕',
};

export const accountInfo = {
  initialBalance: 100000000,
  balance: 45000000,
};

export const goal = {
  target: 5000000,
  current: 2500000,
};

export const mockStocks = [
  { code: '005930', name: '삼성전자', currentPrice: 72000, change: 1200, changeRate: 1.69, volume: 15430210, market: 'KOSPI', high: 73000, low: 71000, open: 71500, marketCap: 4298243 },
  { code: '000660', name: 'SK하이닉스', currentPrice: 158000, change: -2500, changeRate: -1.56, volume: 3214500, market: 'KOSPI', high: 161000, low: 157000, open: 160000, marketCap: 1150240 },
  { code: '035420', name: 'NAVER', currentPrice: 195000, change: 3000, changeRate: 1.56, volume: 854000, market: 'KOSPI', high: 196000, low: 192000, open: 192000, marketCap: 319200 },
  { code: '035720', name: '카카오', currentPrice: 54000, change: -500, changeRate: -0.92, volume: 1452000, market: 'KOSPI', high: 54500, low: 53500, open: 54500, marketCap: 240010 },
  { code: '373220', name: 'LG에너지솔루션', currentPrice: 420000, change: 8000, changeRate: 1.94, volume: 450000, market: 'KOSPI', high: 422000, low: 412000, open: 412000, marketCap: 982800 },
  { code: '005380', name: '현대자동차', currentPrice: 205000, change: 4000, changeRate: 1.99, volume: 950000, market: 'KOSPI', high: 206000, low: 201000, open: 201000, marketCap: 433500 },
  { code: '006400', name: '삼성SDI', currentPrice: 430000, change: -12000, changeRate: -2.71, volume: 320000, market: 'KOSPI', high: 442000, low: 428000, open: 442000, marketCap: 295000 },
  { code: '068270', name: '셀트리온', currentPrice: 185000, change: 1500, changeRate: 0.82, volume: 620000, market: 'KOSPI', high: 186000, low: 183500, open: 183500, marketCap: 402500 },
  { code: '105560', name: 'KB금융', currentPrice: 65000, change: 500, changeRate: 0.78, volume: 1100000, market: 'KOSPI', high: 65500, low: 64500, open: 64500, marketCap: 262000 },
  { code: '005490', name: 'POSCO홀딩스', currentPrice: 460000, change: -5000, changeRate: -1.08, volume: 420000, market: 'KOSPI', high: 465000, low: 455000, open: 465000, marketCap: 388000 },
];

export const mockHoldings = [
  { code: '005930', name: '삼성전자', quantity: 200, averagePrice: 68000, currentPrice: 72000, totalValue: 14400000, returnRate: 5.88, returnAmount: 800000 },
  { code: '035420', name: 'NAVER', quantity: 50, averagePrice: 200000, currentPrice: 195000, totalValue: 9750000, returnRate: -2.50, returnAmount: -250000 },
  { code: '035720', name: '카카오', quantity: 100, averagePrice: 52000, currentPrice: 54000, totalValue: 5400000, returnRate: 3.85, returnAmount: 200000 },
  { code: '373220', name: 'LG에너지솔루션', quantity: 30, averagePrice: 450000, currentPrice: 420000, totalValue: 12600000, returnRate: -6.67, returnAmount: -900000 },
  { code: '005380', name: '현대자동차', quantity: 50, averagePrice: 190000, currentPrice: 205000, totalValue: 10250000, returnRate: 7.89, returnAmount: 750000 },
];

export const mockTransactions = [
  { id: 1, date: '2023-10-25T10:15:00', code: '005930', name: '삼성전자', type: '매수', quantity: 100, price: 71500, totalAmount: 7150000 },
  { id: 2, date: '2023-10-24T14:20:00', code: '035420', name: 'NAVER', type: '매수', quantity: 20, price: 192000, totalAmount: 3840000 },
  { id: 3, date: '2023-10-23T09:30:00', code: '000660', name: 'SK하이닉스', type: '매도', quantity: 50, price: 160000, totalAmount: 8000000 },
  { id: 4, date: '2023-10-20T11:45:00', code: '373220', name: 'LG에너지솔루션', type: '매수', quantity: 10, price: 415000, totalAmount: 4150000 },
  { id: 5, date: '2023-10-19T13:10:00', code: '035720', name: '카카오', type: '매도', quantity: 30, price: 55000, totalAmount: 1650000 },
  { id: 6, date: '2023-10-18T10:00:00', code: '005380', name: '현대자동차', type: '매수', quantity: 50, price: 190000, totalAmount: 9500000 },
  { id: 7, date: '2023-10-17T15:20:00', code: '005930', name: '삼성전자', type: '매수', quantity: 100, price: 68000, totalAmount: 6800000 },
  { id: 8, date: '2023-10-16T09:10:00', code: '068270', name: '셀트리온', type: '매수', quantity: 40, price: 180000, totalAmount: 7200000 },
  { id: 9, date: '2023-10-13T14:40:00', code: '068270', name: '셀트리온', type: '매도', quantity: 40, price: 185000, totalAmount: 7400000 },
  { id: 10, date: '2023-10-12T11:15:00', code: '105560', name: 'KB금융', type: '매수', quantity: 100, price: 62000, totalAmount: 6200000 },
  { id: 11, date: '2023-10-11T13:50:00', code: '105560', name: 'KB금융', type: '매도', quantity: 100, price: 64000, totalAmount: 6400000 },
  { id: 12, date: '2023-10-10T10:30:00', code: '005490', name: 'POSCO홀딩스', type: '매수', quantity: 20, price: 470000, totalAmount: 9400000 },
  { id: 13, date: '2023-10-06T15:10:00', code: '035420', name: 'NAVER', type: '매수', quantity: 30, price: 205000, totalAmount: 6150000 },
  { id: 14, date: '2023-10-05T09:45:00', code: '035720', name: '카카오', type: '매수', quantity: 130, price: 51000, totalAmount: 6630000 },
  { id: 15, date: '2023-10-04T14:00:00', code: '373220', name: 'LG에너지솔루션', type: '매수', quantity: 20, price: 467500, totalAmount: 9350000 },
];

export const generateChartData = (basePrice: number) => {
  const data = [];
  let current = basePrice;
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const change = current * (Math.random() * 0.06 - 0.03);
    current = current + change;
    
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      price: Math.floor(current / 100) * 100,
    });
  }
  
  return data;
};

export const generateOHLCData = (basePrice: number): OHLCData[] => {
  const data: OHLCData[] = [];
  let previousClose = basePrice;
  const now = new Date();

  for (let i = 59; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Format date as YYYY-MM-DD for lightweight-charts
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const timeStr = `${year}-${month}-${day}`;

    // Open = previous day's close
    const open = previousClose;

    // Close with realistic ±3% daily movement
    const closeChange = open * (Math.random() * 0.06 - 0.03);
    const close = Math.round((open + closeChange) / 100) * 100;

    // High and Low with realistic wicks
    const high = Math.round(Math.max(open, close) * (1 + Math.random() * 0.02) / 100) * 100;
    const low = Math.round(Math.min(open, close) * (1 - Math.random() * 0.02) / 100) * 100;

    // Volume between 100K and 5M
    const volume = Math.floor(Math.random() * 4900000 + 100000);

    data.push({
      time: timeStr,
      open,
      high,
      low,
      close,
      volume,
    });

    previousClose = close;
  }

  return data;
};
