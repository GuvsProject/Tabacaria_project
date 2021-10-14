import Link from 'next/link'
import Layout from '../components/Layout'
import { useState } from 'react'
import { Button, Box, } from 'grommet'
import { FileInput } from 'grommet'
import { TextInput } from 'grommet'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'

import styles from '../styles/Cadastro_de_Produtos.module.css'

const Cadastro_de_Produtos = () => {

  //Inputs dos campos
  const [ProductName, setProductName] = useState('');
  // const [Description, setDescription] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Price, setPrice] = useState('');

  //Toast
  const [visible, setVisible] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault()
    
    try{
      console.log(ProductName, Quantity, Price)
      const response = await axios.post('http://localhost:3333/products',{
        name: ProductName,
        quantity: Quantity,
        price: Price
      })
      console.log(response.data)
      setVisible(true)
      setTimeout(() => {setVisible(false)}, 5000);
      setProductName('')
      setQuantity('')
      setPrice('')
    }catch(err){
      console.log(err)

    }
    

    
  }


  return (
      <Layout title="Produtos">
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

            {/* <TextInput required
              placeholder="Descrição"
              value={Description}
              onChange={event => setDescription(event.target.value)}
            /> */}

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
