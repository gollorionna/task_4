import { GiShop } from 'react-icons/gi';

export const Layout = () => {
  return (
    <header className="bg-white w-screen flex justify-between items-center h-16 p-5">
      <GiShop className="text-green-700 w-12 h-12 hover:underline cursor-pointer" />
      <nav className="flex">
        <ul className="flex space-x-6">
          <li className="hover:underline cursor-pointer">All products</li>
          <li className="hover:underline cursor-pointer">Chat</li>
          <li className="hover:underline cursor-pointer">Log in</li>
        </ul>
      </nav>
    </header>
  );
};
