import Link from 'next/link'
import Layout from '../components/Layout'
import { useState } from 'react'
import { Button, Box, } from 'grommet'
import { FileInput } from 'grommet'
import { TextInput } from 'grommet'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


import styles from '../styles/Cadastro_de_Produtos.module.css'

const Cadastro_de_Produtos = () => {

  //Inputs dos campos
  const [value, setValue] = useState('');
  const [descricao, setDescricao] = useState('');
  const [Quantidade, setQuantidade] = useState('');
  const [Preco, setPreco] = useState('');

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
        Pedido cadastrado com sucesso !!
      </Alert>
      }

      <div className={styles.DivPrincipalInput}>
        <h1>Cadastro de Produtos</h1>
        <form className={styles.FormPrincipalInput}>
          <div className={styles.divInputs}>
            <TextInput required
              placeholder="Produto"
              value={value}
              onChange={event => setValue(event.target.value)}
            />

            <TextInput required
              placeholder="Descrição"
              value={descricao}
              onChange={event => setDescricao(event.target.value)}
            />

            <TextInput required
              placeholder="Quantidade"
              value={Quantidade}
              onChange={event => setQuantidade(event.target.value)}
            />

            <TextInput required
              placeholder="Preco"
              value={Preco}
              onChange={event => setPreco(event.target.value)}
            />

            <FileInput 
              name="FileImage"
              onChange={event => {
                const fileList = event.target.files;
                for (let i = 0; i < fileList.length; i += 1) {
                  const file = fileList[i];
                }
              }} />


          </div>{/* Div dos botoes, */}
          <Button type='submit' primary label="Confirmar" onClick={() =>  handleSubmit() } />

          <Link href="/">
            <a>Voltar à Pagina Inicial</a>
          </Link>

        </form>
      </div>


    </>




    //</Layout>

  )
}

export default Cadastro_de_Produtos
