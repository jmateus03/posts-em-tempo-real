import { useState } from "react"
import { supabase } from "../supabase"
import { useNavigate } from "react-router-dom"

function CadastroPagina(){
    const [nome , setNome] = useState("")
    const [email , setEmail] = useState("")
    const [senha , setSenha] = useState("")
    const [confirmarSenha , setConfirmarSenha] = useState("")

    const navigate = useNavigate()

    async function cadastrar(){
        const resposta = supabase.auth.signUp(
            {
                email:email,
                password:senha,
                options:{
                    data:{
                        display_name: nome
                    }
                }
            }
        )

        if(senha != confirmarSenha){
            alert("As senhas não estão batendo")
        }
        else if(resposta.error){
            alert(`Cadastro não realizado: ${resposta.error.mensage}`)
            navigate("/")
        }
        else{
            alert("Vá no seu email e faça a verificação")
            navigate("/")
        }
    }

    return(
        <div>
            <h1>cadastro</h1>

            <p>Nome de usuario</p>

            <input
            type="text"
            placeholder="Insira seu nome de usuario"
            value={nome}
            onChange={e => setNome(e.target.value)}
            maxLength={25}
            />

            <p>Email</p>

            <input 
            type="email"
            placeholder="Insira o Email"
            value={email}            
            onChange={e => setEmail(e.target.value)}
            />

            <p>Senha</p>

            <input
            type="password"
            placeholder="Insira o Senha"
            value={senha}            
            onChange={e => setSenha(e.target.value)}
            maxLength={12}
            minLength={6}
            />

            <p>Confirmar senha</p>

            <input
            type="password"
            placeholder="Confirme a sua senha"
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
            maxLength={12}
            minLength={6}
            />

            <button onClick={cadastrar}>Cadastrar</button>
            <button onClick={()=>{navigate("/")}}>já tenho uma conta</button>
        </div>
    )
}

export default CadastroPagina