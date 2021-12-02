import Link from 'next/link'
import OutlinedCard from '../components/Cards'
import Layout from '../components/Layout'
import axios from 'axios'
import { Product } from '../interfaces';
import { useCallback,useEffect, useState } from 'react';
import { resolve } from 'path';

import styles from '../styles/Cadastro_de_Produtos.module.css'

const IndexPage = () => {
  async function getUserProducts():Promise<Product[]> {
    const response = await axios.get('http://localhost:3333/active');
    return response.data
  }
  const [auxiliar,setAuxiliar] = useState([])

  const getData = useCallback(async () => {
    const data = await getUserProducts();
    setAuxiliar(data);
  }, [setAuxiliar])

  useEffect(() => {
    getData();
  }, [getData])

  console.log(auxiliar)
  // console.log(auxiliar[1].id)

 

  return(
    <Layout title="Mario's Tabacaria">
    <>

    
    <br></br>
    <div className={styles.divCardGrid}>
      
      
    {
        auxiliar.map((auxiliar) => 
          (<OutlinedCard key = {auxiliar.id}
            id = {auxiliar.id}
            name ={auxiliar.name}
            price={auxiliar.price}
            description={auxiliar.description}
          ></OutlinedCard>)
        )
    }
      
    </div>    

    {/* <OutlinedCard
    name ={''}
    price={''}
    description={''}
    ></OutlinedCard> */}

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
