import { gql, useQuery } from "@apollo/client"
import { ICategoria } from "../../interfaces/ICategoria"
import CardLivro from "../CardLivro"

import './ListaLivros.css'
import { ILivro } from "../../interfaces/ILivro"
import { AbBotao, AbCampoTexto } from "ds-alurabooks"
import { useState } from "react"

interface ListaLivrosProps {
    categoria: ICategoria
}

const OBTER_LIVROS = gql`
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

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

    const [ textoBusca, setTextoBusca ] = useState('');

    const { data, refetch } = useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
        variables: {
            categoriaId: categoria.id
        }
    })

    const buscarLivros = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (textoBusca) {
            refetch({
                categoriaId: categoria.id,
                titulo: textoBusca
            })
        }
    }

    // const { data: produtos } = useQuery(['buscaLivrosPorCategoria', categoria], () => obterProdutosDaCategoria(categoria))
    return (
        <section>
            <form onSubmit={buscarLivros} style={{ maxWidth: '80%', margin: '0 auto', textAlign: 'center' }}>
                <AbCampoTexto value={textoBusca} onChange={setTextoBusca} placeholder="Digite o título" />
                <div style={{ marginTop: '16px' }}>
                    <AbBotao texto="Buscar" />
                </div>
            </form>

            <div className="livros">
                {data?.livros.map(livro => <CardLivro livro={livro} key={livro.id} />)}
            </div>
        </section>
    );
}

export default ListaLivros