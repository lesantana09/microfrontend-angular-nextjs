import dynamic from "next/dynamic";

const AngularHome = dynamic(() => import("../components/AngularHomeClient"), {
  ssr: false,
});

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Next Host + Angular Remote</h1>
      <AngularHome title="Angular Remote" message="Mensagem" />
    </div>
  );
}
