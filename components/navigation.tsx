'use client';

import getSession from '@/lib/session';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logout } from './logout';
export default function Navigation() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleLogout = async () => {
    await Logout();
  };

  return (
    <div className="flex flex-row justify-between my-10">
      <h1 className="text-4xl font-extrabold">Billionaire</h1>
      <nav className=" flex justify-end">
        <ul className="flex flex-row items-center gap-4">
          <li>
            <button
              onClick={handleBackClick}
              className="text-white hover:text-stone-500 active:text-stone-500"
            >
              Back
            </button>
          </li>
          <li>
            <Link
              href="/"
              className="text-white hover:text-stone-500 active:text-stone-500"
            >
              Home
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>LogOut</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
