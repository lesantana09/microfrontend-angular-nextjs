"use client";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white text-center py-3 mt-10">
      <p className="text-sm opacity-90">
        © {new Date().getFullYear()} Portal IDS — Todos os direitos reservados.
      </p>
    </footer>
  );
}
