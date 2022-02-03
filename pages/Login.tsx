import Link from 'next/link'
import Layout from '../components/Layout'
import { useState, useEffect, useContext } from 'react'
import { Button, Box, } from 'grommet'
import { FileInput } from 'grommet'
import { TextInput } from 'grommet'
import { DateInput } from 'grommet'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import Router from "next/router";

import styles from '../styles/Cadastro_de_Produtos.module.css'
import { parseCookies, setCookie } from 'nookies'
import { v4 as uuid } from 'uuid'

const Login = () => {

    //Inputs dos campos
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logado, setLogado] = useState(false);
    
    //Toast
    const [visible, setVisible] = useState(false);
    // const [token, setToken] = useState("");
    var token
    // const { 'nextauth.token': token } = uuid()

    // const { signIn } = useContext(AuthContext)
    // useEffect(() => {
    //     const { 'nextauth.token': token } = parseCookies()
    
    //     if (token) {
    //     //   recoverUserInformation().then(response => {
    //     //     setUser(response.user)
    //     console.log("teste")
    //     //   })
    //     }
    //   }, [])


    useEffect(() => { 
        if(logado ){
          Router.push('/')
        }  
      }
      , [logado]);

    //   return (
    //     null
    //   )

    async function handleSubmit(event) {

        event.preventDefault()
        try{
        console.log(email, password)
        const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/login',{
            "email": email,
            "password": password
        })
        console.log(response.data)
        console.log("separador -------")
     
        setLogado(response.data)
        
        
        
        setVisible(true)
        token = uuid()
        console.log(token)
        
        setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 1, // 1 hour
          })
        
         setCookie(undefined, 'email.token', email, {
            maxAge: 60 * 60 * 1, // 1 hour
          })

        setTimeout(() => {setVisible(false)}, 5000);
        setEmail('')
        setPassword('')

        }   catch(err){
        console.log(err)
        
        }
    }

    // async function handleSignIn(data) {
    //     await signIn(data)
    //   }

    return (
          <Layout title="Login"
          >
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
                Login Realizado !!
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
                            placeholder="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
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