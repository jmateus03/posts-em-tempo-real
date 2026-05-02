import { useState } from "react"
import { supabase } from "../supabase"
import { useNavigate } from "react-router-dom"

function CriarPosts() {
    const[titulo, setTitulo] = useState("")
    const[texto , setTexto] = useState("")

    const navigate = useNavigate()
    
    async function adicionarPost() {

    const { data: userData } = await supabase.auth.getUser()

    const user = userData?.user

    if (!user) {
        alert("Usuário não logado")
        return
    }

    const usuario = user?.user_metadata?.display_name

    const { data, error } = await supabase
        .from("posts")
        .insert([{
            titulo,
            texto,
            usuario: usuario,
            user_id: user.id
        }])

    if (error) {
        alert(`Não foi possivel criar o post: ${error.message}`)
    } else {
        setTitulo("")
        setTexto("")
        navigate("/paginaPosts")
    }
}
    

    return(
        <div>
            <h1>Criar Posts</h1>
            <p>Titulo do post</p>

            <input 
            type="text"
            placeholder="insira o Titulo do posts"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            />

            <p>texto do posts</p>

            <textarea
            placeholder="Digite o conteúdo do post..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            />

            <button onClick={adicionarPost}>Adicionar posts</button>
        </div>
    )
}

export default CriarPosts