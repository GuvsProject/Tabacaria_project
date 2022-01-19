import Link from 'next/link'
import OutlinedCard from '../components/Cards'
import Layout from '../components/Layout'
import axios from 'axios'
import { Product, User } from '../interfaces';
import { useCallback,useEffect, useState } from 'react';

import styles from '../styles/Cadastro_de_Produtos.module.css'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import  nookies  from 'nookies';

const IndexPage = ({logadoB,emailLogado}) => {

  async function getUserProducts():Promise<Product[]> {
    const response = await axios.get('https://apitabacaria-2gqbsph2wq-ue.a.run.app/active');
    return response.data
  }

  const [auxiliar,setAuxiliar] = useState([])
  const [usuario, setUsuario] = useState([])

  const getData = useCallback(async () => {
    const data = await getUserProducts();
    setAuxiliar(data);
  }, [setAuxiliar])

  //user
  const getmakeUser = useCallback(async () => {
    const data2 = await getUser(emailLogado);
    setUsuario(data2);
  }, [setUsuario])

  
  useEffect(() => {
    getData();
    getmakeUser();
    
  }, [getData,getmakeUser])
  
  //console.log(logadoB)
  // console.log(usuario['email'])
  //pega usuario conforme email retornado
  
  async function getUser(email):Promise<User[]> {

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
    <Layout title="Mario's Tabacaria" logado={logadoB}>
    <>

    
    <br></br>
    <div className={styles.divCardGrid}>
      
      {/* {console.log(usuario)} */}
    {
        auxiliar.map((auxiliar) => 
          (<OutlinedCard key = {auxiliar.id}
            id = {auxiliar.id}
            name ={auxiliar.name}
            price={auxiliar.price}
            quantity={auxiliar.quantity}
            description={auxiliar.description}
            logado={logadoB}
            user={usuario}
          ></OutlinedCard>)
        )
    }
      
    </div>    


  </>
  
  </Layout>
  )

}


export default IndexPage


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { ['nextauth.token']: token } = parseCookies(ctx)
  const  cookie_email = nookies.get(ctx)
  var logadoB = false
  var emailLogado = ""

  if (!token) {
    // console.log('token de login nao gerado')
    logadoB = false
  } else {
    // console.log("token de login gerado")
    logadoB = true
    emailLogado = cookie_email['email.token']
  }
  
  // console.log(cookie_email['email.token']) //pega EMAIL

  return {
    props: { logadoB, emailLogado }
  }
}
