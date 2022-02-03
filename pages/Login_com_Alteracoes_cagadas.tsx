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
import { User } from '../interfaces'

const Login = () => {

    //Inputs dos campos
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logado, setLogado] = useState(false);
    const [statusAtivo,setStatusativo] = useState(false);

    const getmakestatusAtivo = useCallback(async () => {
        const data2 = await CheckActive(email);
        setStatusativo(data2);
        return data2
      }, [setStatusativo])

    const getmakeLogado = useCallback(async () => {
        const data3 = await return_login_ok(email, password);
        setLogado(data3);
        return data3
    }, [setLogado])

    const InitComponent = useCallback(async()=>{
        getmakestatusAtivo()
        getmakeLogado()

    },[])
      
    useEffect(()=>{
        InitComponent()
        if(logado && statusAtivo){
            console.log(logado)
            console.log(statusAtivo)
            Router.push('/')
        }  

        },[InitComponent,logado])
    
    const [usuario, setUsuario] = useState(null)

    //Toast
    const [visible, setVisible] = useState(false);
    const [visibleUserNoActive, setvisibleUserNoActive] = useState(true);
    // const [token, setToken] = useState("");
    var token



    
    async function CheckActive(email):Promise<boolean> {

        console.log(email)
        try{
        //   const response = await axios.get('http://localhost:3333/checkActive',{
          const response = await axios.get('https://apitabacaria-2gqbsph2wq-ue.a.run.app/singleUser',{
                params:{
                    email,
                }  
              })
            
            // console.log(response.data)
            return response.data;
        } catch(err) {
          console.log(err);
          
        }
      
      }
    // useEffect(() => {
    //     if(logado && statusAtivo){
    //         console.log(logado)
    //         console.log(statusAtivo)
    //         Router.push('/')
    //     }  
    //   }
    //   , [logado]);

    //   return (
    //     null
    //   )

    async function return_login_ok(email, password):Promise<boolean> {


        event.preventDefault()
        // const auxiliar_StatusLogado = getmakestatusAtivo()
        
        // console.log(auxiliar_StatusLogado)
        try{
        // console.log(email, password)
        const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/login',{
            "email": email,
            "password": password
        })
        return response.data
        
        }   catch(err){
        console.log(err)
        console.log("deu erro")
        }
    }


    async function handleSubmit(event) {


        event.preventDefault()
        // const auxiliar_StatusLogado = getmakestatusAtivo()
        
        // console.log(auxiliar_StatusLogado)
        try{
        // // console.log(email, password)
        // const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/login',{
        //     "email": email,
        //     "password": password
        // })
        // console.log(response.data)
        // console.log("separador -------")
        // var teste = response.data
        // console.log(teste)
        // setLogado(teste)
        // console.log(logado)
        if (logado) {
            setVisible(true)

        
            token = uuid()
            // console.log(token)
            
            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 1, // 1 hour
                })
            
                setCookie(undefined, 'email.token', email, {
                maxAge: 60 * 60 * 1, // 1 hour
                })
    
            setTimeout(() => {setVisible(false)}, 5000);
            setEmail('')
            setPassword('')
            setStatusativo(false)
            setLogado(false)
            
        } else if(!statusAtivo || !logado) {
            // } else {
            setvisibleUserNoActive(false)
            setStatusativo(false)
            setLogado(false)
            // setVisible(true)
            // setTimeout(() => {setVisible(false)}, 5000);
            console.log('entrou no erro')
            setTimeout(() => {setvisibleUserNoActive(true)}, 5000);
            
        }
        
        }   catch(err){
        console.log(err)
        console.log("deu erro")
        }
    }

    return (
          <Layout title="Login"
          >
        <>
            {(visible && logado) &&
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

            {(!visibleUserNoActive) &&
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