import Link from 'next/link'
import Layout from '../components/Layout'
import { useState, useEffect, useContext, useCallback } from 'react'
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
    const [logado, setLogado] = useState(null);
    const [statusAtivo,setStatusativo] = useState(null);

    const attStatusAtivo = useCallback(async (email_passado) => {
        const auxiliar =  await CheckActive(email_passado)
        setStatusativo(auxiliar)
        console.log(auxiliar)
        return auxiliar
    }, [setStatusativo])

    const attLogado = useCallback(async (email_passado,password_passado) => {
        const auxiliar2 =  await teste(email_passado,password_passado)
        setLogado(auxiliar2)
        console.log(auxiliar2)
        return auxiliar2
    }, [setLogado])


    const [visibleError, setvisibleError] = useState(false);
    //Toast
    const [visible, setVisible] = useState(false);
    // const [token, setToken] = useState("");
    var token
    var LoginAtivado = false
    var logadoAux = false

    // const innerFunction = useCallback(async () => {
       
    // });
    async function redireciona() {
        // console.log(logado) 
        // console.log(statusAtivo) 
        const addLog    = await attLogado(email, password)
        const addAtivo  = await attStatusAtivo(email)
        // if(logado && statusAtivo ){
        if(addLog && addAtivo ){
            Router.push('/')
            // console.log('entra n')
        }  
    }
    
    useEffect(() => {
        redireciona()
        
      }
      , [redireciona]);

    //   return (
    //     null
    //   )

 

    async function CheckActive(email):Promise<boolean> {

        console.log(email)
        try{
        //   const response = await axios.get('http://localhost:3333/checkActive',{
          const response = await axios.get('https://apitabacaria-2gqbsph2wq-ue.a.run.app/singleUser',{
                params:{
                    email,
                }  
              })
            
            console.log(response.data);
            return response.data;
        } catch(err) {
          console.log(err);
          
        }
      
      }


    async function teste(email, password):Promise<boolean> {

        console.log(email,password)
        const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/login',{
        // const response = await axios.post('http://localhost:3333/login',{
            "email": email,
            "password": password
        })
        console.log(response.data);
        return response.data;

    }
    async function handleSubmit(event) {

        event.preventDefault()
        try{
        console.log(email, password)
        // const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/login',{
        //     "email": email,
        //     "password": password
        // })
        // console.log(response.data)
        // console.log("separador -------")
        // LoginAtivado = await CheckActive(email)
        // console.log(LoginAtivado)
        
        // LoginAtivado = attStatusAtivo()
        
        // setStatusativo(LoginAtivado)
        // console.log(statusAtivo)
        // logadoAux = response.data
        // setLogado(logadoAux)
        // console.log(logado)
        // console.log(logadoAux)
        // var logado_auxiliar = logado

        // console.log(logado_auxiliar)
        
        // if (LoginAtivado && logadoAux) {
            // if (logadoAux && statusAtivo) {
        // setStatusativo(attStatusAtivo())
        // setLogado(attLogado())
        const addLogado = await attLogado(email,password) 
        const addAtivo = await attStatusAtivo(email)
        // const varteste = await teste(email,password)
        // const varteste2 =  await CheckActive(email)
        // console.log(varteste)
        // console.log(varteste2)
        // if ((addLogado && addAtivo) || (logado && statusAtivo)) {
        if (addLogado && addAtivo) {
        // if (logado && statusAtivo) {
            
            // console.log(LoginAtivado)
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
            
        // } else if (!addLogado || !addAtivo) {
        } else {
            setvisibleError(true)
            setTimeout(() => {setvisibleError(false)}, 5000);
        }

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

            {(visibleError) &&
                <Alert variant="filled" severity="error"
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
                Usuario não ativado ou inexistente em nossa base, entre em contato com o Administrador !!
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