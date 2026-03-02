import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: MainPage,
});

function MainPage() {
  return (
    <>
      <div className="bg-[url('src/assets/Mask_Group.webp')] h-screen w-screen bg-cover bg-center bg-no-repeat relative pt-3.5"></div>
      <div className="absolute top-40 left-170 bg-[#9cd08f]/80 rounded-tr-2xl rounded-bl-2xl p-6 w-1/2 text-center leading-7 max-w-160">
        <p>New Arrival</p>
        <h1 className="text-2xl font-bold">Discover Our New Collection</h1>
        <p>
          Introducing our latest collection of premium products designed to elevate your lifestyle.
        </p>
        <button className="bg-[#1d221c] text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-300">
          Buy Now
        </button>
      </div>
    </>
  );
}
