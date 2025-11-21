function Header() {
  return (
    <header className="bg-[#202225] text-white shadow-lg border-b border-[#2f3136]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-3">
          <img src="/image-placeholder.png" alt="Movie Meter Logo" className="w-10 h-10" />
          <h1 className="text-4xl font-bold text-center">Movie Meter</h1>
        </div>
        <p className="text-center mt-2 text-gray-400">Find your perfect movie based on your preferences</p>
      </div>
    </header>
  );
}

export default Header;
