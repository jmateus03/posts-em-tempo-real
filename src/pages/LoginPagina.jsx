import { useNavigate } from "react-router-dom"
import { useState} from "react"
import { supabase } from "./../supabase"

 function LoginPagina() {
    //informações de login
    const [email , setEmail] = useState("")
    const [senha , setSenha] = useState("")

    //função que leva o usuario para a pagina de posts
    const navigate = useNavigate()

    //função de login
    async function login(){
        const resposta = await supabase.auth.signInWithPassword({
            email: email,
            password: senha
        })

        if (resposta.error) {
            alert(`Não foi possível fazer login: ${resposta.error.message}`)
        } else {
            alert("Login feito com sucesso")
            navigate("/paginaPosts")
        }
    }
    
    return(
        <div>
            <h1>Login</h1>

            <p>Email</p>

            <input type="email"
            placeholder="Insira o Email"
            value={email}            
            onChange={e => setEmail(e.target.value)}
            />

            <p>Senha</p>

            <input type="password"
            placeholder="Insira o Senha"
            value={senha}            
            onChange={e => setSenha(e.target.value)}
            maxLength={12}
            minLength={6}
            />

            <button onClick={login}>Entrar</button>
            <button onClick={()=>{navigate("/cadastro")}}>Criar uma conta</button>
        </div>
    )
}

export default LoginPagina