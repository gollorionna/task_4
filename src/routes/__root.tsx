import { Link, Outlet, createRootRoute, useNavigate } from '@tanstack/react-router';
import { Suspense } from 'react';
import { GiShop } from 'react-icons/gi';

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  const navigate = useNavigate();
  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center h-16 px-5">
        <Link to="/">
          <GiShop className="text-[#9cd08f] bg-[#684551] rounded-2xs w-12 h-12 hover:underline cursor-pointer hover:text-green-600 hover:transition-colors duration-300"/>
        </Link>
        <nav className="flex">
          <ul className="flex space-x-6 text-black">
            <li className="bg-[#9cd08f] px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 inline-block">
              All products
            </li>
            <li className="bg-[#9cd08f] px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 inline-block" onClick={() => navigate({to: '/chat'})}>
              Chat
            </li>
            <li className="bg-[#9cd08f] px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 inline-block" onClick={() => navigate({to: '/auth'})}>
              Log in
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Suspense
          fallback={
            <div className="mt-10 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
