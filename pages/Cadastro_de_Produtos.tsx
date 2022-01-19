import Link from 'next/link'
import Layout from '../components/Layout'
import { useState } from 'react'
import { Button, Box,FileInput, TextInput,Select  } from 'grommet'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import  nookies  from 'nookies';

import styles from '../styles/Cadastro_de_Produtos.module.css'

const Cadastro_de_Produtos = ({logadoB}) => {

  //Inputs dos campos
  // const  [StatusModificado, setStatusmodificado] = useState(false)
  const [ProductName, setProductName] = useState('');
  const [Description, setDescription] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Price, setPrice] = useState('');
  const [Status, setStatus] = useState('Inativo');

  //Toast
  const [visible, setVisible] = useState(false);

  // function VerificaStatus(opcoes) {
  //   if (Status == "Inativo"){
  //     setStatusmodificado(false)
  //   } else{
  //     setStatusmodificado(true)

  //   }
    
    
  // }

  async function handleSubmit(event) {
    event.preventDefault()
    
    // VerificaStatus(Status)
    try{
      console.log(ProductName, Quantity, Price, Description, Status)
      const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/products',{
        name: ProductName,
        quantity: Quantity,
        price: Price,
        description: Description,
        status: Status
      })
      console.log(response.data)
      setVisible(true)
      setTimeout(() => {setVisible(false)}, 5000);
      setProductName('')
      setQuantity('')
      setPrice('')
      setDescription('')
      setStatus('Inativo')
      // setStatusmodificado(false)
    }catch(err){
      console.log(err)

    }
    

    
  }


  return (
      <Layout title="Produtos" logado={logadoB}>
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
        <form className={styles.FormPrincipalInput} onSubmit={handleSubmit}>
          <div className={styles.divInputs}>
            <TextInput required
              placeholder="Produto"
              value={ProductName}
              onChange={event => setProductName(event.target.value)}
            />

            <TextInput required
              placeholder="Descrição"
              value={Description}
              onChange={event => setDescription(event.target.value)}
            />

            <TextInput required
              placeholder="Quantidade"
              value={Quantity}
              onChange={event => setQuantity(event.target.value)}
            />

            <TextInput required
              placeholder="Preço"
              value={Price}
              onChange={event => setPrice(event.target.value)}
            />

          <Select
            options={['Inativo', 'Ativo']}
            value={Status}
            onChange={({ option }) => setStatus(option)}
          />


            {/* <FileInput 
              name="FileImage"
              onChange={event => {
                const fileList = event.target.files;
                for (let i = 0; i < fileList.length; i += 1) {
                  const file = fileList[i];
                }
              }} /> */}


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

export default Cadastro_de_Produtos

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
