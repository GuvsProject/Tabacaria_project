import Link from 'next/link'
import Layout from '../components/Layout'
import { useState } from 'react'
import { Button,TextInput,TextArea } from 'grommet'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
import { parseCookies } from 'nookies'
import  nookies  from 'nookies';

import styles from '../styles/Cadastro_de_Produtos.module.css'
import { GetServerSideProps } from 'next';

const Reclamacao = ({logadoB,emailLogado}) => {

    //Inputs dos campos
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const [userId,setUserId] = useState('')

    //Toast
    const [visible, setVisible] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault()
        
        // try{
        // console.log(userId, titulo, texto)
        // const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/complain',{
        //     userId: 6,
        //     name: titulo,
        //     message: texto
        // })
        // console.log(response.data)
        setVisible(true)
        setTimeout(() => {setVisible(false)}, 5000);
        setTitulo('')
        setTexto('')
        // }   catch(err){
        // console.log(err)

        // }
    }


    return (
          <Layout title="Reclamações" logado={logadoB}>
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
                    Reclamação enviada com sucesso !!
                </Alert>
            }

            <div className={styles.DivPrincipalInput}>
                <h1>Reclamações</h1>
                <form className={styles.FormPrincipalInput} onSubmit={handleSubmit}>
                    <div className={styles.divInputs}>
                        <TextInput required
                            placeholder="Escreva um titulo a critica  "
                            value={titulo}
                            onChange={event => setTitulo(event.target.value)}
                        />

                        <TextArea
                            placeholder="Descreva sua critica"
                            value={texto}
                            onChange={event => setTexto(event.target.value)}
                            />

                       
                    </div>{/* Div dos botoes, */}
                    <Button type='submit' primary label="Registrar"/>

                    {/* <Link href="/">
                        <a>Voltar à Pagina Inicial</a>
                    </Link> */}

                </form>
            </div>


        </>


        </Layout>

    )
}

export default Reclamacao

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
  