import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-primary/90 text-base">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-white font-bold text-xl">
          Thai Spa Luxury
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-accent">หน้าแรก</Link>
          <Link to="/admin" className="hover:text-accent">แดชบอร์ด</Link>
        </div>
      </div>
    </nav>
  );
}
