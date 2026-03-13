import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    navigate('/');
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text-primary)]" htmlFor="email">
              이메일
            </label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text-primary)]" htmlFor="password">
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            로그인
          </Button>
          
          <div className="text-center mt-4">
            <span className="text-sm text-[var(--color-text-secondary)]">
              계정이 없으신가요?{' '}
            </span>
            <Link to="/signup" className="text-sm font-medium text-[var(--color-primary)] hover:underline">
              회원가입
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
