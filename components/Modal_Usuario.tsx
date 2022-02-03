import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DataTable from '../components/ListaProdutos'
import SelectUserAdmin from '../components/SelectUserAdmin'
import SelectUserAtivo from '../components/SelectUserAtivo'
import { TextInput,Button, Select } from 'grommet';
import { User } from '../interfaces'
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
  row:User,
  load:any
}
export default function BasicModal_User<Props>({row, load}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [admin, setAdmin] = useState('Nao');
  const [ativo, setAtivo] = useState('Nao');

  useEffect(() =>{
    // setNome(row.nome.toString())
    // setEmail(row.email.toString())
    // setCpf(row.cpf.toString())
    // setAdmin('')
  },[])

  async function handleSubmit(event) {

    event.preventDefault()
    // console.log(row.id,nome,email,cpf,admin)
    setOpen(false)
    try{
    const response = await axios.patch('https://apitabacaria-2gqbsph2wq-ue.a.run.app/users',{
    // const response = await axios.patch('http://localhost:3333/users',{
      cpf: row.cpf,
      name: nome ?? row.name,
      password:password ?? row.password,
      email: email ?? row.email,
      admin: admin ?? row.admin,
      ativo: ativo ?? row.ativo
    })
    await load()
    console.log("entrou?")
    console.log(response.data)
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
      <Button primary label="Alterar Usuario" onClick={handleOpen}/>

      {/* <Button onClick={handleOpen}>Alterar Produto Selecionado</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-cpf"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Alteração de Usuario. 
          </Typography>

          <div>
                <form onSubmit={handleSubmit} >
                    <div >
                        <h1>Usuario: {row.name}</h1>
                        <h1>CPF do Usuario: {row.cpf}</h1>
                        <TextInput  type='text'
                            placeholder="Nome do usuario"
                            // value={nome}
                            onChange={event => setNome(event.target.value)}
                            />
                          <br></br>

                        <TextInput  type='text'
                            placeholder="Alterar senha"
                            // value={email}
                            onChange={event => setPassword(event.target.value)}
                            />
                          <br></br>

                        <TextInput  type='text'
                            placeholder="Alterar email"
                            // value={email}
                            onChange={event => setEmail(event.target.value)}
                            />
                          <br></br>

                          {/* <h1>Preço atual: R${row.email}</h1> */}
                          {/* <h1>Preço atual</h1> */}
                        <TextInput  type='text'
                            placeholder="Alterar CPF"
                            // value={email}
                            onChange={event => setCpf(event.target.value)}
                            />
                          <br></br>

                       

                        <h1>É Administrador ?:{row.admin}</h1>
                        <SelectUserAdmin
                        opcao ={admin}
                        setOpcao ={setAdmin}
                        ></SelectUserAdmin>
                        
                        <h1>Usuario ativo ?:{row.ativo}</h1>
                        <SelectUserAtivo
                        opcao ={ativo}
                        setOpcao ={setAtivo}
                        ></SelectUserAtivo>

                        <br></br>
                        <br></br>

                       


                        <Button type='submit' primary label="Confirmar" />


                    </div>{/* Div dos botoes, */}
                    

                    {/* <Link href="/">
                        <a>Voltar à Pagina Inicial</a>
                    </Link> */}

                </form>
            </div>

         



          {/* <Typography id="modal-modal-cpf" sx={{ mt: 2 }}>
            Alteração de Produtos.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
