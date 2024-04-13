import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscador de productos en ML",
  description: "En ML encontraras los mejores productos del mercado",
};

export default function Home() {
  return (
    <div className="sin-resultados">
      Ingresa una palabra a buscar
    </div>
  );
}
