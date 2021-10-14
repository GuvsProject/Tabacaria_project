import Link from 'next/link'
import Layout from '../components/Layout'

const Sobre = () => (
  <Layout title="Sobre Nós">
    <h1>Nossa Historia</h1>
    <div>

      <p>
      A Mario’s Tabacaria foi fundada em Santos – Litoral Paulista na década de 80 por Mario Mendes após o falecimento do senhor Mario, seu filho Helton seguiu com o negócio da família. 
      </p>

      <p>
      É uma tabacaria já conhecida no centro de Santos e que tem sua história junto das antigas construções do centro da cidade.
      </p>

      <p>
      Localizada na Avenida Senador Feijó próximo a rodoviária de Santos e ao fórum da cidade.
      Outras informações: CEP: 11015-500.
      </p>
      
      <p>

      Sendo uma loja familiar não possui filiais, possuindo dois tipos principais de clientes, os de baixo consumo e de pouco poder aquisitivo que possuem foco em produtos simples de tabacaria e clientes de alto poder aquisitivo que procuram produtos de luxo, como charutos importados

      </p>

        
      
    </div>
    <p>
      {/* <Link href="/">
        <a>Go home</a>
      </Link> */}
    </p>
  </Layout>
)

export default Sobre
