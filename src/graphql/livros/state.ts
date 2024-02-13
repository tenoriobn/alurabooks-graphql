import { makeVar } from "@apollo/client";
import { ILivro } from "../../interfaces/ILivro";
import { ICategoria } from "../../interfaces/ICategoria";

interface FiltroLivros {
  categoria?: ICategoria,
  titulo?: string
}

export const filtroLivrosVar = makeVar<FiltroLivros>({});

export const livrosVar = makeVar<ILivro[]>([]);