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


import styles from '../styles/Cadastro_de_Produtos.module.css'

const Login = () => {

    //Inputs dos campos
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    //Toast
    const [visible, setVisible] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault()
        
        // try{
        // console.log(email, senha)
        // const response = await axios.post('http://localhost:3333/users',{
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
          <Layout title="Login">
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
                   Efetuando login !!
                </Alert>
            }

            <div className={styles.DivPrincipalInput}>
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
                    <Button type='submit' primary label="Logar"/>

                    {/* <Link href="/">
                        <a>Voltar à Pagina Inicial</a>
                    </Link> */}

                </form>
            </div>


        </>


        </Layout>

    )
}

export default Login