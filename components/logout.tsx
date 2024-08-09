'use server';

import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

export const Logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect('/');
};
