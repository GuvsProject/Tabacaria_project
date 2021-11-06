import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DataTable from '../components/ListaProdutos'
import { TextInput } from 'grommet';
import { Button } from 'grommet'
import { Product } from '../interfaces'
import axios from 'axios'

import styles from '../styles/Cadastro_de_Produtos.module.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  row:Product,
  load:any
}
export default function BasicModal<Props>({row, load}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() =>{
    setQuantity(row.quantity.toString())
    setPrice(row.price.toString())
  },[])

  async function handleSubmit(event) {

    event.preventDefault()
    console.log(row.id,quantity,price)
    setOpen(false)
    try{
    const response = await axios.patch('http://localhost:3333/products',{
      id: row.id,
      quantity: quantity,
      price: price
    })
    await load()
    // console.log(response.data)
    // setVisible(true)
    // setTimeout(() => {setVisible(false)}, 5000);
    // setEmail('')
    // setSenha('')
    }   catch(err){
    console.log(err)

    }
}




  return (
    <div>
      <Button primary label="Alterar Produto" onClick={handleOpen}/>

      {/* <Button onClick={handleOpen}>Alterar Produto Selecionado</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Alteração de Produtos. 
          </Typography>

          <div>
                <form onSubmit={handleSubmit} >
                    <div >
                        <h1>A quantidade atual é: {row.quantity}</h1>
                        <TextInput required type='text'
                            placeholder="Quantidade"
                            // value={quantity}
                            onChange={event => setQuantity(event.target.value)}
                            />

                          <h1>O preço atual é: {row.price}</h1>
                        <TextInput required type='text'
                            placeholder="Preço"
                            // value={price}
                            onChange={event => setPrice(event.target.value)}
                            />
                          <br></br>
                      <Button type='submit' primary label="Confirmar" />


                    </div>{/* Div dos botoes, */}
                    

                    {/* <Link href="/">
                        <a>Voltar à Pagina Inicial</a>
                    </Link> */}

                </form>
            </div>

         



          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Alteração de Produtos.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
