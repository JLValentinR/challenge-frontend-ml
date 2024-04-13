import type { Metadata } from "next";
import Resultado from "./../components/Resultado";

export const metadata: Metadata = {
  title: "Resultado de la busqueda",
  description: "En ML encontraras los mejores productos del mercado",
};

export default function Search() {
  return (
    <Resultado />
  );
}
