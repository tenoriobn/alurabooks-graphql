import { useState } from "react"
import './ListaLivros.css'
import { useLivros } from "../../graphql/livros/hooks"
import { ICategoria } from "../../interfaces/ICategoria"
import { AbBotao, AbCampoTexto } from "ds-alurabooks"
import CardLivro from "../CardLivro"

interface ListaLivrosProps {
    categoria: ICategoria
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

    const [ textoBusca, setTextoBusca ] = useState('');

    const { data, refetch } = useLivros(categoria)

    const buscarLivros = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (textoBusca) {
            refetch({
                categoriaId: categoria.id,
                titulo: textoBusca
            })
        }
    }

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