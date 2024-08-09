'use server';

import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmailExists, '존재하지 않는 이메일 입니다. '),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(5, '비밀번호가 너무 짧습니다.')
    .max(10, '비밀번호를 10글자 이하로 작성해주세요.'),
});

export async function LoginForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        password: true,
        id: true,
      },
    });

    const ok = await bcrypt.compare(result.data.password, user!.password ?? '');
    if (ok) {
      const session = await getSession();
      session.id = user?.id;
      await session.save();
      redirect('/home');
    } else {
      return {
        fieldErrors: {
          message: ['비밀번호가 틀립니다.'],
          email: [],
        },
      };
    }
  }
}
