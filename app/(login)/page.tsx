'use client';

import Input from '@/components/input';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { LoginForm } from './action';

export default function Login() {
  const [state, action] = useFormState(LoginForm, null);
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-96 bg-slate-800 m-auto flex flex-col gap-6 justify-center items-center text-center p-6 rounded-2xl shadow-lg">
        <h1 className="text-4xl text-orange-500 font-semibold">Login</h1>
        <form action={action} className="flex flex-col w-full gap-4">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            errors={state?.fieldErrors.email}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            errors={state?.fieldErrors.email}
          />

          <button className="w-full bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold py-2 rounded-lg">
            Login
          </button>
          <p className="text-white">
            아직 회원이 아닌가요?
            <Link
              href="/sign-up"
              className="pl-2 text-orange-400 hover:text-orange-700"
            >
              회원가입
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
