import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Product } from '../interfaces'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { TextInput } from 'grommet';

import styles from '../styles/Cadastro_de_Produtos.module.css'
import BasicModalReserva from './Modal_Reserva';
import axios from 'axios';

// export default function MediaCard() {
  // return (

// }

interface Props {
  Product
}

export default function OutlinedCard<Product>({id, name, price, quantity, description, logado, user}) {
  
  const [idProduto,setIdProduto] = useState(id)
  const [visible, setVisible] = useState(false);
  const [quantidadeDigitada, setQuantidadeDigitada] = useState('');

  async function handlesubmit() {
    // console.log(user['id'],id,quantity,price,new Date())

    if (Number(quantidadeDigitada) > 0) {

      try{
        const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/order',{
                "userId": user['id'],
                "productId": id,
                "quantity": quantidadeDigitada,
                "price": price,
                "status": 'Pendente',
                "orderDate": new Date(),
            })
          setQuantidadeDigitada('')
          setVisible(false)
          // atualiza_quantidade(idProduto, quantidadeDigitada, price,description)
          // console.log(response.data)
          return response.data
      } catch(err) {
        console.log(err)
        
      }

    }

  }

  async function atualiza_quantidade(id_passado, quantidade_passada, price_passado, description) {
    console.log(id)
    if (quantity < 0) {
      var status_produto = "Inativo"
    }
    try{
      // const response = await axios.patch('https://apitabacaria-2gqbsph2wq-ue.a.run.app/products',{
      const response = await axios.patch('http://localhost:3333/products',{
        id: id_passado,
        quantity: quantidade_passada,
        price: price_passado,
        description: description,
        status: status_produto
      })

      }   catch(err){
      console.log(err)
  
      }
  }


  const card =(
    <React.Fragment>
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="140"
      // image="/static/images/cards/contemplative-reptile.jpg"
      image="/teste_card.jpg"
      alt="test image"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {/* Produto xpto */}
        {name}
      </Typography>
      <Typography gutterBottom variant="h6" component="div">
        {/* Preço:  */}
        R$ {price}
        {/* {console.log(user['email'])} */}
        {/* {console.log(quantity)} */}


      </Typography>

      <Typography variant="body2" color="text.secondary">
       {/* Descrição  */}
       {description}
      </Typography>
    </CardContent>
    <CardActions>
      {/* <Button size="small"></Button> */}
      { logado &&
      <Button size="small"
      onClick={() => {
        console.log("clicou na solicitar reserva");
        setVisible(true)
        console.log(visible)
        handlesubmit()
        // setTimeout(() => {setVisible(false)}, 5000);
      }} 
      >Solicitar Reserva
      { visible &&
        // <BasicModalReserva ></BasicModalReserva>
        <TextInput required type='number'
        placeholder="Quantidade"
        // value={price}
        onChange={event => setQuantidadeDigitada(event.target.value)}
        />
      }

      </Button>
      }
      
      {/* {
        clicou && 
      <BasicModalReserva ></BasicModalReserva>
      } */}
      {/* <Button size="small">Abrir em outra pagina</Button> */}

      {/* {visible &&
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
                   Solicitação realizada com sucesso !!
                </Alert> */}
      {/* } */}



    </CardActions>
    {/* <br></br> */}
  </Card>
  </React.Fragment>
);

  return (
    <div className={styles.divcard}>

    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>

    </div>
  );
}