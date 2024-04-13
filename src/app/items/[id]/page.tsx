import type { Metadata } from "next";
import Detalle from "./../../components/Detalle";

export const metadata: Metadata = {
  title: "Detalle del producto",
  description: "En ML encontrarás los mejores productos del mercado",
};

export default function Detail({ params }) {
  return (
    <Detalle id={params.id} />
  );
}
