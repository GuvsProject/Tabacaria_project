import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DataTable from '../components/ListaProdutos'
// import SelectProductStats from '../components/SelectProductStats'
import { TextInput,Button, Select } from 'grommet';
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
  // row:Product,
  load?:any
}
// export default function BasicModalReserva<Props>({row, load}) {
export default function BasicModalReserva<Props>() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Inativo');

  useEffect(() =>{
    // setQuantity(row.quantity.toString())
    // setPrice(row.price.toString())
    // setDescription(row.description.toString())
    // setStatus('')
  },[])

  async function handleSubmit(event) {

    event.preventDefault()
    // console.log(row.id,quantity,price,description,status)
    setOpen(false)
    try{
    // const response = await axios.patch('https://apitabacaria-2gqbsph2wq-ue.a.run.app/products',{
    //   id: row.id,
    //   quantity: quantity,
    //   price: price,
    //   description: description,
    //   status: status
    // })
    // await load()
    
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
      <Button primary label="Solicitar Reserva" onClick={handleOpen}/>

      {/* <Button onClick={handleOpen}>Alterar Produto Selecionado</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Reservas. 
          </Typography>

          <div>
                <form onSubmit={handleSubmit} >
                    <div >
                        {/* <h1>Quantidade atual: {row.quantity}</h1> */}
                        <TextInput required type='text'
                            placeholder="Quantidade"
                            // value={quantity}
                            onChange={event => setQuantity(event.target.value)}
                            />
                        <h1>Nova descrição</h1>
                        <TextInput required type='text'
                            placeholder="Descrição"
                            // value={price}
                            onChange={event => setDescription(event.target.value)}
                            />
                          <br></br>


              
                          <h1>Preço atual: R${}</h1>
                        <TextInput required type='text'
                            placeholder="Preço"
                            // value={price}
                            onChange={event => setPrice(event.target.value)}
                            />
                          <br></br>

                       

                        <h1>Status:{}</h1>
                        {/* <Select
                        options={['Inativo', 'Ativo']}
                        value={status}
                        onChange={({ option }) => console.log(status)}
                        /> */}
                        {/* <SelectProductStats 
                        opcao ={status}
                        setOpcao ={setStatus}
                        ></SelectProductStats> */}

                        <br></br>
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
