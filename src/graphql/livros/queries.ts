import { gql } from "@apollo/client";

export const OBTER_LIVROS = gql`
    query ObterLivros($categoriaId: Int, $titulo: String) {
        livros(categoriaId: $categoriaId, titulo: $titulo) {
            id
            slug
            titulo
            imagemCapa
            opcoesCompra {
                id
                preco
            }
        }
    }
`;

export const OBTER_DESTAQUES = gql`
    query ObterLancamentos {
        destaques {
            lancamentos {
                id
                slug
                titulo
                imagemCapa
                opcoesCompra {
                    id
                    preco
                }
                autor {
                    nome
                }
            }
            maisVendidos {
                id
                slug
                titulo
                imagemCapa
                opcoesCompra {
                    id
                    preco
                }
                autor {
                    nome
                }
            }
        }
    }
`;