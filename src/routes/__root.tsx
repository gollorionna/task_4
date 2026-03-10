import { Link, Outlet, createRootRoute, useNavigate } from '@tanstack/react-router';
import { Suspense } from 'react';
import { GiShop } from 'react-icons/gi';
import { useAuthToken } from '../utils/authQuery';
import { queryClient } from '../utils/queryClient';
import { Button } from '@/components/ui/button';

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  const { data: token } = useAuthToken();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    queryClient.setQueryData(['auth-token'], null);
    navigate({ to: '/' });
  };
  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center h-16 px-5 wrap">
        <Link to="/">
          <GiShop className="text-(--green-bg) bg-(--brown-bg) rounded-2xs w-12 h-12 hover:underline cursor-pointer hover:text-green-600 hover:transition-colors duration-300" />
        </Link>
        <nav className="flex">
          <ul className="flex space-x-6 text-black">
            <Button size="lg" variant="default" onClick={() => navigate({ to: '/products' })}>
              All products
            </Button>
            <Button size="lg" variant="default" onClick={() => navigate({ to: '/chat' })}>
              Chat
            </Button>
            {token ? (
              <Button onClick={handleSignOut} size="lg" variant="default">
                Sign out
              </Button>
            ) : (
              <Button onClick={() => navigate({ to: '/auth' })} size="lg" variant="default">
                Sign in
              </Button>
            )}
          </ul>
        </nav>
      </header>

      <main className="min-h-screen w-full flex justify-center items-center">
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
