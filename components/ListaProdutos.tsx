import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { Data } from '@material-ui/lab'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../interfaces';
import Layout from './Layout';
import BasicModal from '../components/Modal'


async function getUserProducts():Promise<Product[]> {
  const response = await axios.get('https://apitabacaria-2gqbsph2wq-ue.a.run.app/products');
  return response.data
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width:100 },
  { field: 'name', headerName: 'Nome ',width:300  },
  { field: 'description', headerName: 'Descrição ', width:250 },
  { field: 'quantity', headerName: 'Quantidade ', width:300 },
  { field: 'price', headerName: 'Preço R$ ', width:300 },
  { field: 'status', headerName: 'Status do Produto ', width:200,}
  
  // { field: 'DataCreate', headerName: 'DataCreate',  },
  // { field: 'DataUpdate', headerName: 'DataUpdate',  },
];

export default function DataTable() {
  const [rows,setrows] = useState([])
  const [row,setrow] = useState(null)

  const InitComponent = useCallback(async()=>{
    
  const retorno_produtos = await getUserProducts()
  setrows(retorno_produtos)

  },[])

  useEffect(()=>{
    InitComponent()
  },[InitComponent])

  function return_linha(linha){
    setrow(linha)
  }

  async function loadGrid(){
      
  const retorno_produtos = await getUserProducts()
  setrows(retorno_produtos)

  }



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
      {
        row && 
      <BasicModal row={row} load={loadGrid}></BasicModal>
      }
    </div>
  );
}