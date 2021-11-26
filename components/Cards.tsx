import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import styles from '../styles/Cadastro_de_Produtos.module.css'

// export default function MediaCard() {
  // return (
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
          Produto xpto
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Preço: 
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Products are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
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
// }


export default function OutlinedCard({name, price, description  }) {
  return (
    <div className={styles.divcard}>

    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>

    </div>
  );
}