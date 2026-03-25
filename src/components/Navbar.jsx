import { useEffect, useState } from 'react';
import { Image } from './Image';
import { Link } from 'react-router-dom';

import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image
          src="new-logo.png"
          alt="blog nest logo"
          w={40}
          h={40}
          className="rounded-md"
        />
        <span>Blog Nest</span>
      </Link>
      {/* MOBILE MENU */}
      <div className="md:hidden ">
        {/* MOBILE BUTTON */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((curr) => !curr)}
        >
          {open ? 'X' : '☰'}
        </div>
        {/* MOBILE LINK LIST */}
        <div
          className={`fixed top-16 left-0 w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-large bg-[#e6e6ff] transition-all duration-700 ease-in-out ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={() => setOpen(false)}
        >
          <Link to="/">Home</Link>
          <Link to="/posts?sort=trending">Trending</Link>
          <Link to="/posts?sort=popular">Most Popular</Link>
          {user && <Link to="/bio">Bio</Link>}
          <SignedOut>
            <Link to="/login">
              <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
                Login 👋
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/posts?sort=trending">Trending</Link>
        <Link to="/posts?sort=popular">Most Popular</Link>
        {user && <Link to="/bio">Bio</Link>}

        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
