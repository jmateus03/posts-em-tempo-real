import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { supabase } from "./supabase"
import PrivateRoute from './components/PrivateRouter'
import LoginPagina from "./pages/LoginPagina"
import CadastroPagina from "./pages/CadastroPagina"
import PaginaPosts from './pages/paginaPosts'
import CriarPosts from './pages/CriarPosts'

function App() {
    //Usuario
    const [user , setUser] = useState(null)

  //função que verifica se o usuario já esta logado
    useEffect(()=>{
        async function carregarsessao() {
            const resposta = await supabase.auth.getSession()
            const sessao = resposta.data.session

            if(sessao){
                setUser(sessao.user)
            }
            else{
                setUser(null)
            }
        }
        carregarsessao()

        //verifica se houve mudanças no estado do usuario
        const mudancasSessao = supabase.auth.onAuthStateChange(
            function(evento, sessao) {
                if(sessao){
                setUser(sessao.user)
                } else {
                setUser(null)
                }
            }
        )

         return function(){
           mudancasSessao.data.subscription.unsubscribe()
        }

    }, [])

  return(
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPagina />} />
        <Route path="/cadastro" element={<CadastroPagina/>} />

        <Route path='/paginaPosts' element={
          <PrivateRoute user={user}>
            <PaginaPosts />
          </PrivateRoute>
        }/> 

        <Route path='/criarPosts' element={
            <PrivateRoute user={user}>
              <CriarPosts />
            </PrivateRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
