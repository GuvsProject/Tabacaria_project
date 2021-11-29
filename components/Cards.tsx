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

import styles from '../styles/Cadastro_de_Produtos.module.css'

// export default function MediaCard() {
  // return (

// }

// interface Props {
//   Product
// }

export default function OutlinedCard<Product>({id, name, price, description}) {
  
  // const [idProduto,setIdProduto] = useState(null)

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
      </Typography>

      <Typography variant="body2" color="text.secondary">
       {/* Descrição  */}
       {description}
      </Typography>
    </CardContent>
    <CardActions>
      {/* <Button size="small"></Button> */}
      <Button size="small">Solicitar Reserva</Button>
      {/* <Button size="small">Abrir em outra pagina</Button> */}
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