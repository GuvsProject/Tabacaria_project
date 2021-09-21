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


import styles from '../styles/Cadastro_de_Produtos.module.css'

const Cadastro_de_Usuarios = () => {

    //Inputs dos campos
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [senha_confirmar, setSenha_confirmar] = useState('');
    const [date, setData] = useState('');

    //Toast
    const [visible, setVisible] = useState(false);

    function handleSubmit() {

        setVisible(true)
        // setTimeout(() => {setVisible(false)}, 500);
    }


    return (
        //   <Layout title="About | Next.js + TypeScript Example">
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

            <div className={styles.DivPrincipalInput}>
                <h1>Cadastro de Usuarios</h1>
                <form className={styles.FormPrincipalInput}>
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
                            onChange={event => setCpf(event.target.value)}
                        />

                        <TextInput required type='password'
                            placeholder="Cadastre uma senha"
                            value={senha}
                            onChange={event => setSenha(event.target.value)}
                        />

                        <TextInput required type='password'
                            placeholder="confirme sua senha"
                            value={senha_confirmar}
                            onChange={event => setSenha_confirmar(event.target.value)}
                        />

                        <DateInput required
                            format="mm/dd/yyyy"
                            value={(new Date()).toISOString()}
                            // onChange={({ value }) => { }}
                            // onChange={event => setData(event.target.value)}
                        />


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
                    <Button type='submit' primary label="Confirmar" onClick={() => handleSubmit()} />

                    <Link href="/">
                        <a>Voltar à Pagina Inicial</a>
                    </Link>

                </form>
            </div>


        </>


        //</Layout>

    )
}

export default Cadastro_de_Usuarios