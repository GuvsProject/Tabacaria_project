import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import  nookies  from 'nookies';

import Layout from '../components/Layout'
import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import { User } from '../interfaces';

const Sobre = ({logadoB,emailLogado}) => {

  const [usuario, setUsuario] = useState(null)

  //user
  const getmakeUser = useCallback(async () => {
  const data2 = await getUser(emailLogado);
  setUsuario(data2);
  // console.log(data2);
  return data2
  }, [setUsuario])

  useEffect(() => {
  getmakeUser();
  
  }, [getmakeUser])
  
  async function getUser(email):Promise<User>  {

  try{
      // const response = await axios.post('http://localhost:3333/singleUser',{
      const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/singleUser',{
              "email": email,
          })
      
      // console.log(response.data)
      return response.data
  } catch(err) {
      console.log(err)
      
  }
  
  }


  
  return(
    
    <Layout title="Sobre Nós" logado={logadoB} admin={usuario?.admin}>
      <h1>Nossa Historia</h1>
      <div>
  
        <p>
        A Mario’s Tabacaria foi fundada em Santos – Litoral Paulista na década de 80 por Mario Mendes após o falecimento do senhor Mario, seu filho Helton seguiu com o negócio da família. 
        </p>
  
        <p>
        É uma tabacaria já conhecida no centro de Santos e que tem sua história junto das antigas construções do centro da cidade.
        </p>
  
        <p>
        Localizada na Avenida Senador Feijó próximo a rodoviária de Santos e ao fórum da cidade.
        Outras informações: CEP: 11015-500.
        </p>
        
        <p>
  
        Sendo uma loja familiar não possui filiais, possuindo dois tipos principais de clientes, os de baixo consumo e de pouco poder aquisitivo que possuem foco em produtos simples de tabacaria e clientes de alto poder aquisitivo que procuram produtos de luxo, como charutos importados
  
        </p>
  
          
        
      </div>
      <p>
        {/* <Link href="/">
          <a>Go home</a>
        </Link> */}
      </p>
    </Layout>
  )
}

export default Sobre

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { ['nextauth.token']: token } = parseCookies(ctx)
  const  cookie_email = nookies.get(ctx)
  var logadoB = false
  var emailLogado = ""

  if (!token) {
    console.log('token de login nao gerado')
    logadoB = false
  } else {
    console.log("token de login gerado")
    logadoB = true
    emailLogado = cookie_email['email.token']
  }

  return {
    props: { logadoB, emailLogado }
  }
}
