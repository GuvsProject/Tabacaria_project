import Link from 'next/link'
import OutlinedCard from '../components/Cards'
import Layout from '../components/Layout'
import axios from 'axios'
import { Product } from '../interfaces';

const IndexPage = () => {
  async function getUserProducts():Promise<Product[]> {
    const response = await axios.get('http://localhost:3333/products');
    return response.data
  }
  const data = getUserProducts()

  data.then( result =>
    console.log(result)
    
    )

  return(
    <Layout title="Mario's Tabacaria">
    <>
            
    <br></br>
    <OutlinedCard
    name ={''}
    price={''}
    description={''}
    ></OutlinedCard>

    {/* <Link href="/about">
      <a>Sobre Nós</a>
    </Link> */}
    
    {/* <Link href="/Cadastro_de_Produtos">
      <a>Cadastrar Produto</a>
    </Link> */}
  </>
  
  </Layout>
  )

}

  

export default IndexPage
