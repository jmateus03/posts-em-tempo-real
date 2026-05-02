import { useEffect, useState } from "react"
import { supabase } from "../supabase"
import { useNavigate } from "react-router-dom"

function PaginaPosts(){
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])



    useEffect(()=>{
        buscarPosts()
    },[])

    async function buscarPosts() {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('criado_em', { ascending: false })

        if(error){
            console.log(error.message)
        } else {
            setPosts(data)
        }
    }

    return(
        <div>
            <h1>Pagina de posts</h1>

            <button onClick={()=> navigate("/criarPosts")}>
                Criar posts
            </button>

            {posts.map(post => (
                <div key={post.id}>
                    <p>postado por {post.usuario}</p>
                    <h2>{post.titulo}</h2>
                    <p>{post.texto}</p>
                </div>
            ))}
        </div>
    )
}

export default PaginaPosts