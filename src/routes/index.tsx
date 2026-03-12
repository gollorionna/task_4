import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: MainPage,
});

export function MainPage() {
  return (
    <>
      <div className="bg-[url(/Mask_Group.webp)] h-screen w-screen bg-cover bg-center bg-no-repeat relative pt-3.5"></div>
      <div className="absolute top-24 sm:top-32 lg:top-40 left-1/3 right-4 translate-x-0 lg:left-auto lg:right-20 bg-(--green-bg)/80 rounded-tr-2xl rounded-bl-2xl p-4 sm:w-[70%] md:w-[60%] lg:w-[40%] max-w-160 text-center leading-7">
        <p>New Arrival</p>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Discover Our New Collection</h1>
        <p className='text-sm sm:text-base'>
          Introducing our latest collection of premium products designed to elevate your lifestyle.
        </p>
        <Link to="/products">
          <Button size="lg" variant="secondary" className='mt-4'>
            Shop Now
          </Button>
        </Link>
      </div>
    </>
  );
}
