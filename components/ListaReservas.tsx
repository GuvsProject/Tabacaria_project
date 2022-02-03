import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { Data } from '@material-ui/lab'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react';
import { Order, User} from '../interfaces';
import Layout from './Layout';
import BasicModal from '../components/Modal'
import BasicModalReserva from './Modal_Reserva';
import { parseCookies } from 'nookies';
import  nookies  from 'nookies';
import { GetServerSideProps } from 'next';

interface Props {
  logadoB,
  emailLogado
}

export default function DataTableR({logadoB, emailLogado}) {
  const [rows,setrows] = useState([])
  const [row,setrow] = useState(null)
  const [usuario, setUsuario] = useState(null)

  const InitComponent = useCallback(async()=>{
  
  // console.log(logadoB)
  if (logadoB) {
    const usuario_auxiliar = await getmakeUser()
  //   // console.log(usuario)
    const retorno_ordem = await getUserOrder(usuario_auxiliar)
    console.log(retorno_ordem)
    setrows(retorno_ordem)
    
  }

  },[])

  // console.log(logadoB)  
  // console.log(emailLogado)
  // console.log(usuario)
  async function getUser(email):Promise<User>  {

    // console.log(email)
    // console.log(emailLogado) 
    try{
      // const response = await axios.post('http://localhost:3333/singleUser',{
      const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/singleUser',{
              "email": email,
          })
        
        // console.log(response.data)
        return response.data;
    } catch(err) {
      console.log(err);
      
    }
  
  }

  const getmakeUser = useCallback(async () => {
    const data2 = await getUser(emailLogado);
    setUsuario(data2);
    return data2
  }, [setUsuario])


  useEffect(()=>{
    InitComponent()
    },[InitComponent])

  
async function getUserOrder(usuario_order):Promise<Order[]> {

  console.log(usuario_order)
    try {

      // const response = await axios.post('http://localhost:3333/orderbyuser',{
      const response = await axios.post('https://apitabacaria-2gqbsph2wq-ue.a.run.app/orderbyuser',{
        'userId': usuario_order['id']
      });
  
      return response.data
      // await loadGrid()
    } catch(err) {
      console.log(err)
    }
 

}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID da solicitação', width:200 },
  { field: 'userId', headerName: 'ID Usuario ',width:300  },
  { field: 'productId', headerName: 'ID Produto ', width:250 },
  { field: 'quantity', headerName: 'Quantidade ', width:300 },
  { field: 'price', headerName: 'Preço R$ ', width:300 },
  { field: 'status', headerName: 'Status', width:300,},
  { field: 'orderDate', headerName: 'Data Realizada', width:200,}
  
  // { field: 'DataCreate', headerName: 'DataCreate',  },
  // { field: 'DataUpdate', headerName: 'DataUpdate',  },
];


  function return_linha(linha){
    setrow(linha)
  }

  // async function loadGrid(){
  // if(logadoB) {
  //    await getmakeUser()
  //   const retorno_ordem = await getUserOrder()
  //   setrows(retorno_ordem)

  // }
  
  // }



  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        onRowClick = {params => return_linha(params.row)}
        // checkboxSelection
      />
      
      {/* <Button type='submit' primary label="Alterar Produto" 
      onClick={() => {
                      handleSubmit(event);
                     }}/> */}
      {/* {
        row && 
      
      <BasicModalReserva row={row} load={loadGrid}></BasicModalReserva>
      
      } */}
    </div>
  );
}