export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
    return (
      <header className="bg-white sticky top-0 shadow-md px-4 py-3 flex items-center justify-between md:pl-72">
        {/* Mobile Hamburger */}
        <button onClick={onMenuClick} className="md:hidden text-2xl text-gray-700">
          ☰
        </button>
  
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      </header>
    );
  }
  
  