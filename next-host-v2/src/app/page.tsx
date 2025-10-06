"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState<{ name?: string; message?: string }>(
    {}
  );
  const [nextMessage, setNextMessage] = useState("Olá do Next 👋");

  // Carrega scripts Angular
  useEffect(() => {
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = () => resolve();
        s.onerror = reject;
        document.body.appendChild(s);
      });

    Promise.all([
      loadScript("http://localhost:4200/runtime.js"),
      loadScript("http://localhost:4200/polyfills.js"),
      loadScript("http://localhost:4200/main.js"),
    ]).catch(console.error);
  }, []);

  // Captura dados vindos do Angular
  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent;
      setFormData(customEvent.detail);
    };

    window.addEventListener("form-submitted", handler);
    return () => window.removeEventListener("form-submitted", handler);
  }, []);

  // Envia dados para o Angular
  const sendMessageToAngular = () => {
    const event = new CustomEvent("message-from-next", {
      detail: { text: nextMessage },
    });
    window.dispatchEvent(event);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Next.js ↔ Angular Bidirecional 🔁
      </h1>

      {/* Componente Angular */}
      <angular-home externalMessage={nextMessage}></angular-home>

      <div className="mt-10 bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-secondary mb-2">
          Dados recebidos do Angular:
        </h2>
        {formData.name ? (
          <>
            <p className="text-neutral">
              <strong>Nome:</strong> {formData.name}
            </p>
            <p className="text-neutral">
              <strong>Mensagem:</strong> {formData.message}
            </p>
          </>
        ) : (
          <p className="text-gray-500">Nenhum dado enviado ainda.</p>
        )}
      </div>

      <div className="mt-8 flex gap-2">
        <input
          type="text"
          value={nextMessage}
          onChange={(e) => setNextMessage(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Mensagem para Angular"
        />
        <button
          onClick={sendMessageToAngular}
          className="bg-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-accent transition"
        >
          Enviar ao Angular
        </button>
      </div>
    </main>
  );
}
