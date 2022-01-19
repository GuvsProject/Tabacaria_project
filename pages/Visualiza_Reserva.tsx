import styles from '../styles/Cadastro_de_Produtos.module.css'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import  nookies  from 'nookies';
import axios from 'axios'

import Link from 'next/link'
import Layout from '../components/Layout'
import { useState } from 'react'
import DataTableR from '../components/ListaReservas';

const Visualiza_Reserva = ({logadoB, emailLogado}) => {

    //Toast
    const [visible, setVisible] = useState(false);

    return (
          <Layout title="Solicitações de Reservas" logado={logadoB}>
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
            
            {<DataTableR
                logadoB={logadoB}
                emailLogado={emailLogado}
            ></DataTableR>}



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
  