import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('Signup attempt:', { email, password, nickname });
    navigate('/login');
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
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text-primary)]" htmlFor="passwordConfirm">
              비밀번호 확인
            </label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              minLength={8}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text-primary)]" htmlFor="nickname">
              닉네임 (선택)
            </label>
            <Input
              id="nickname"
              type="text"
              placeholder="주식왕"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            회원가입
          </Button>
          
          <div className="text-center mt-4">
            <span className="text-sm text-[var(--color-text-secondary)]">
              이미 계정이 있으신가요?{' '}
            </span>
            <Link to="/login" className="text-sm font-medium text-[var(--color-primary)] hover:underline">
              로그인
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
