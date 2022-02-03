import styles from '../styles/Cadastro_de_Produtos.module.css'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import  nookies  from 'nookies';
import axios from 'axios'

import Link from 'next/link'
import Layout from '../components/Layout'
import { useCallback, useEffect, useState } from 'react'
import DataTableR from '../components/ListaReservas';
import { User } from '../interfaces';

const Visualiza_Reserva = ({logadoB, emailLogado}) => {

    //Toast
    // const [visible, setVisible] = useState(false);
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
 
  //console.log(logadoB)
  // console.log(usuario['email'])
  //pega usuario conforme email retornado
  
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
    return (
          <Layout title="Solicitações de Reservas" logado={logadoB} admin={usuario?.admin}>
        <>

            {/* {visible &&
                <Alert variant="filled" severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setVisible(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                   Produto Alterado com sucesso !!
                </Alert>
            } */}
            <label>Visualização de Reservas</label>
            {<DataTableR
                logadoB={logadoB}
                emailLogado={emailLogado}
            ></DataTableR>}
            {/* <DataTableR logadoB={undefined} emailLogado={undefined}></DataTableR> */}


        </>


        </Layout>

    )
}

export default Visualiza_Reserva

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
    
    // console.log(cookie_email) //pega EMAIL
    // console.log(cookie_email['email.token']) //pega EMAIL
    // console.log(token)
  
  
    return {
      props: { logadoB, emailLogado }
    }
  }
  