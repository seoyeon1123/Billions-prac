'use client';

import Input from '@/components/input';
import { useFormState } from 'react-dom';
import SignUp from './action';

export default function signUp() {
  const [state, action] = useFormState(SignUp, null);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="w-96 bg-slate-800 m-auto flex flex-col gap-6 justify-center items-center text-center p-6 rounded-2xl shadow-lg">
          <h1 className="text-4xl text-orange-500 font-semibold">Sign Up</h1>
          <form action={action} className="flex flex-col w-full gap-4">
            <Input
              type="text"
              placeholder="Username"
              name="username"
              errors={state?.fieldErrors.username}
            />
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
              errors={state?.fieldErrors.password}
            />
            <Input
              type="password"
              placeholder="comfirm Password"
              name="comfirmPassword"
              errors={state?.fieldErrors.comfirmPassword}
            />
            <button className="w-full bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold py-2 rounded-lg">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
