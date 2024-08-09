'use server';

import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const checkPassword = ({
  password,
  comfirmPassword,
}: {
  password: string;
  comfirmPassword: string;
}) => password === comfirmPassword;

const formSchema = z
  .object({
    username: z.string().trim(),
    email: z.string().email(),
    password: z
      .string()
      .min(5, '비밀번호가 너무 짧습니다.')
      .max(10, '비밀번호를 10글자 이하로 작성해주세요.'),
    comfirmPassword: z
      .string()
      .min(5, '비밀번호가 너무 짧습니다.')
      .max(10, '비밀번호를 10글자 이하로 작성해주세요.'),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'username이 이미 존재합니다.',
        fatal: true,
        path: ['username'],
      });
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'email이 이미 존재합니다.',
        fatal: true,
        path: ['email'],
      });
    }
  })
  .refine(checkPassword, {
    message: 'Both passwords should be the same!',
    path: ['comfirmPassword'],
  });

export default async function SignUp(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    comfirmPassword: formData.get('comfirmPassword'),
  };

  const result = await formSchema.spa(data);
  console.log(result.error);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect('/home');
  }
}
