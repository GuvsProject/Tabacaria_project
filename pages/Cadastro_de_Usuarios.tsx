import Link from 'next/link'
import Layout from '../components/Layout'
import { useState,useEffect } from 'react'
import { Button, Box, } from 'grommet'
import { FileInput } from 'grommet'
import { TextInput } from 'grommet'
import { DateInput } from 'grommet'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
import Router from "next/router";

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { cpfMask } from '../utils/mascara'
import styles from '../styles/Cadastro_de_Produtos.module.css'

const Cadastro_de_Usuarios = () => {

    //Inputs dos campos
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [senha_confirmar, setSenha_confirmar] = useState('');
    const [data, setData] = useState('');
    
    //Toast
    const [visible, setVisible] = useState(false);
    const [visibleError, setvisibleError] =  useState(false)
    
    //Redirecionamento
    const [direciona, setDireciona] = useState(false)

    useEffect(() => { 
        if(direciona ){
          Router.push('/Login')
        }  
      }
      , [direciona]);
    //   return (
    //     null
    //   )
    function FormatDate(data:any){
        // console.log(data)
        const novaData = new Date(data)
        const auxiliarData = novaData.toLocaleDateString('ko-KR')

        // console.log(auxiliarData)
        const dataFormatada = auxiliarData.replace(/. /g,"-")
        // console.log(dataFormatada)
        const dataFormatadaP2 = dataFormatada.replace(".","")
        // console.log(dataFormatadaP2)
        return dataFormatadaP2
    }

    function calculaIdade(dataNasc){
        var ano_atual = new Date().getFullYear();
        var data_cadastro = dataNasc.split('-')[0];
        var resultado = 0
        console.log(ano_atual)
        console.log(data_cadastro)
        var resultado = ano_atual - data_cadastro
        if (resultado >= 18) {
            return true;
        } else {
            return false;
        }

       }



    async function handleSubmit(event) {

        event.preventDefault()
        
        const dataRecebida = FormatDate(data)
        console.log(dataRecebida)
        calculaIdade(dataRecebida)
        
        console.log()
        const idadeOk = calculaIdade(dataRecebida)
        // console.log(visibleError)
        
        if (idadeOk) {
            
            try{
                console.log(name, senha, email, cpf)
    
                const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/users',{
                    name: nome,
                    password: senha,
                    email: email,
                    cpf: cpf.replace(/(\.|-)/g,""),
                    birthDate: data//'2021-10-20' //ano, mes, dia
                })
                console.log(response.data)
                
        
                
                if (Object.keys(response.data).length === 0) {
                    setDireciona(false)
                    
                } else {
                    setDireciona(true)
                }
                console.log(Object.keys(response.data).length === 0)
                console.log(response.data)
        
        
                setVisible(true)
                setTimeout(() => {setVisible(false)}, 5000);
                setNome('')
                setEmail('')
                setCpf('')
                setSenha('')
                setSenha_confirmar('')
                setData('')
                }   catch(err){
                console.log(err)
        
                }


        } else {
            setvisibleError(true)
            setTimeout(() => {setvisibleError(false)}, 5000);
        }

       
    } 


    return (
          <Layout title="Cadastro">
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
                    Usuario cadastrado com sucesso !!
                </Alert>
            }

            { visibleError &&
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
                    Por gentileza digite uma idade maior que 18 anos !!
                </Alert>
            }

            <div className={styles.DivPrincipalInput}>
                <h1>Cadastro de Usuarios</h1>
                <form className={styles.FormPrincipalInput} onSubmit={handleSubmit}>
                    <div className={styles.divInputs}>
                        
                        <TextInput required
                            placeholder="Nome Completo"
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                        />

                        <TextInput required type='email'
                            placeholder="E-Mail"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />

                        <TextInput required
                            placeholder="Informe seu CPF"
                            value={cpf}
                            onChange={event => setCpf(cpfMask(event.target.value))}
                        />

                        <TextInput required type='password'
                            placeholder="Cadastre uma senha"
                            value={senha}
                            onChange={event => setSenha(event.target.value)}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Data de nascimento"
                            value={data}
                            onChange={(newValue) => {
                            setData(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>





                        {/* <FileInput 
                name="FileImage"
                onChange={event => {
                  const fileList = event.target.files;
                  for (let i = 0; i < fileList.length; i += 1) {
                    const file = fileList[i];
                  }
                }} />
   */}

                    </div>{/* Div dos botoes, */}
                    <Button type='submit' primary label="Confirmar"/>

                    <Link href="/">
                        <a>Voltar à Pagina Inicial</a>
                    </Link>

                </form>
            </div>


        </>


        </Layout>

    )
}

export default Cadastro_de_Usuarios