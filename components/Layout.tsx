import React, { ReactNode, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Menu, Button, DropButton } from 'grommet'

import styles from '../styles/tela_inicial.module.css'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {

  const [logado, setLogado] = useState(true);

  return (

    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className={styles.navclassInicial}>
          <Link href="/">
            <a> <img src="/tabacaria_logo_transparente.png" className={styles.imgLogo} /> </a>
          </Link>


          <div className={styles.itensHeader}>

            <Link href="/Reclamacao">
              <a>Envie uma Reclamação</a>
            </Link>

            <Link href="/Sobre">
              <a>Sobre Nós</a>
            </Link>

          </div>

          <div>

            {
              logado &&
              
              // <Menu label="Conta" 
              // items={[
              // { label: 'Sair', onClick: () => setLogado(false) },
              // { label: 'Cadastrar Produto',
              // onClick: () => {
              //       <Link href="/Cadastro_de_Produtos">
              //         <a>
              //           <span>Produto</span>
              //         </a>
              //       </Link>
              //       //nao ta pegando verificar
              // }
            
            
              // }
            
              // ]} />
              <DropButton
                label="Logado !"
                dropAlign={{ top: 'bottom', right: 'right' }}
                dropContent={
                  <div className={styles.menuDropdown}>
                   <Link href="/">
                    <a><span onClick ={ () => setLogado(false)}>Sair</span></a>
                    </Link>

                    <Link href="/Cadastro_de_Produtos">
                      <a>
                        <span >Cadastrar Produtos</span>
                      </a>
                    </Link>

                    {/* <Link href="/Visualiza_Reserva"> */}
                      <a>
                        <span>Visualizar Reservas</span>
                      </a>
                    {/* </Link> */}

                    {/* <Link href="/Alterar_Dados"> */}
                      <a>
                        <span>Alterar Dados</span>
                      </a>
                    {/* </Link> */}

                    <Link href="/Alterar_Produto">
                      <a>
                        <span>Alterar Produto</span>
                      </a>
                    </Link>

                     <Link href="/Login">
                      <a>
                        <span onClick ={ () => setLogado(true)}>Logar</span>
                      </a>
                    </Link>

                    <Link href="/Cadastro_de_Usuarios">
                      <a>
                        <span >Cadastre-se</span>
                      </a>
                    </Link>

                  </div>
                }
              />
            }

            {
              !logado &&
              //  <Button primary label="Logar" onClick ={ () => setLogado(true)}/>
              <DropButton
                label="Entre aqui !"
                dropAlign={{ top: 'bottom', right: 'right' }}
                dropContent={
                  <div className={styles.menuDropdown}>
                    <Link href="/Login">
                      <a>
                        <span onClick ={ () => setLogado(true)}>Logar</span>
                      </a>
                    </Link>

                    <Link href="/Cadastro_de_Usuarios">
                      <a>
                        <span >Cadastre-se</span>
                      </a>
                    </Link>

                  </div>
                }
              />


            }

          </div>


        </nav>
      </header>
      <div className={styles.divfooter}>
        {children}

      </div>
      <footer className={styles.footerInicial}>
        <span>Contatos</span>
        <label>Email - tabacaria.com.br</label>
        <label>Telefone - (99) 982838387</label>
      </footer>
    </>

  )
}

export default Layout
