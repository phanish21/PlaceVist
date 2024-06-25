export default function MainHeader({ children }) {
    return (
      <header className="main-header bg-gray-900 text-white p-4 flex justify-between items-center h-16 lg:h-20">
        {children}
      </header>
    );
  }
  