import Link from 'next/link'
import Layout from '../components/Layout'
import { useState } from 'react'
import { Button, Box, } from 'grommet'
import { FileInput } from 'grommet'
import { TextInput } from 'grommet'
import { DateInput } from 'grommet'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import  nookies  from 'nookies';

import DataTable from '../components/ListaProdutos'

import styles from '../styles/Cadastro_de_Produtos.module.css'

const Alterar_Produto = ({logadoB}) => {

    //Inputs dos campos
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    //Toast
    const [visible, setVisible] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault()
        
        // try{
        // console.log(email, senha)
        // const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/users',{
        //     email: email,
        //     password: senha
        // })
        // console.log(response.data)
        // setVisible(true)
        // setTimeout(() => {setVisible(false)}, 5000);
        // setEmail('')
        // setSenha('')
        // }   catch(err){
        // console.log(err)

        // }
    }


    return (
          <Layout title="Alterar Produto" logado={logadoB}>
        <>

            {visible &&
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
            }
            
            {DataTable()}
           
            {/* <div className={styles.DivPrincipalInput}>
                <h1>Login</h1>
                <form className={styles.FormPrincipalInput} onSubmit={handleSubmit}>
                    <div className={styles.divInputs}>
                        <TextInput required type='email'
                            placeholder="Email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />

                        <TextInput required type='password'
                            placeholder="Senha"
                            value={senha}
                            onChange={event => setSenha(event.target.value)}
                        />


                    </div>{/* Div dos botoes, */}

                    {/* <Link href="/">
                        <a>Voltar à Pagina Inicial</a>
                    </Link> */}

                {/* </form>
            </div> */}


        </>


        </Layout>

    )
}

export default Alterar_Produto

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { ['nextauth.token']: token } = parseCookies(ctx)
    var logadoB = false
  
    if (!token) {
      console.log('token de login nao gerado')
      logadoB = false
    } else {
      console.log("token de login gerado")
      logadoB = true
    }
    
    return {
      props: { logadoB }
    }
  }
  