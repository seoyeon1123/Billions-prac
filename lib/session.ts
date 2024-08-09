import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface ISession {
  id?: number;
}

export default async function getSession() {
  return getIronSession<ISession>(cookies(), {
    cookieName: 'Karrot',
    password: process.env.COOKIE_PASSWORD!,
  });
}
