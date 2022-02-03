import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { Data } from '@material-ui/lab'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react';
import { User } from '../interfaces';
import Layout from './Layout';
import BasicModal_User from '../components/Modal_Usuario'


async function getUsers():Promise<User[]> {
  const response = await axios.get('https://apitabacaria-2gqbsph2wq-ue.a.run.app/users');
  // const response = await axios.get('http://localhost:3333/users');
  return response.data
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width:100 },
  { field: 'name', headerName: 'Nome ',width:300  },
  { field: 'email', headerName: 'Email ', width:250 },
  { field: 'cpf', headerName: 'CPF ', width:300 },
  // { field: 'birthdate', headerName: 'Data de Nascimento ', width:300 },
  { field: 'admin', headerName: 'Usuario Administrador', width:200},
  { field: 'ativo', headerName: 'Usuario ativo', width:200,}
  
  // { field: 'DataCreate', headerName: 'DataCreate',  },
  // { field: 'DataUpdate', headerName: 'DataUpdate',  },
];

// export default function DataTableU({admin, id_user}) {
export default function DataTableU() {
  const [rows,setrows] = useState([])
  const [row,setrow] = useState(null)

  const InitComponent = useCallback(async()=>{
    
  const retorno_users = await getUsers()
  setrows(retorno_users)

  },[])

  useEffect(()=>{
    InitComponent()
  },[InitComponent])

  function return_linha(linha){
    setrow(linha)
  }

  async function loadGrid(){
      
  const retorno_produtos = await getUsers()
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
      <BasicModal_User row={row} load={loadGrid}></BasicModal_User>
      }
    </div>
  );
}