"use client";

export default function Header() {
  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide">🚀 Portal IDS</h1>

      <nav className="space-x-6 text-sm">
        <a href="#" className="hover:text-accent transition-colors">
          Home
        </a>
        <a href="#" className="hover:text-accent transition-colors">
          Sobre
        </a>
        <a href="#" className="hover:text-accent transition-colors">
          Contato
        </a>
      </nav>
    </header>
  );
}
