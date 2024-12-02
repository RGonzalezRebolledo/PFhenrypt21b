import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center bg-White text-gray-950">
      <h2 className="text-4xl font-bold mb-4">Página no Encontrada</h2>
      <p className="text-lg mb-6">El recurso que buscas no está disponible.</p>
      <Link href="/">
        <button className="bg-amber-600 text-white border border-amber-800 rounded-lg py-2 px-6 hover:bg-opacity-90">
          Volver al Inicio
        </button>
      </Link>
    </main>
  );
}