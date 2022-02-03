import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Menu, Button, DropButton } from 'grommet'

import styles from '../styles/tela_inicial.module.css'
import { parseCookies, destroyCookie } from 'nookies'
import { GetServerSideProps } from 'next'
import { Router } from 'next/router'

type Props = {
  children?: ReactNode
  title?: string
  logado?: boolean
  admin?: any
}

const Layout = ({ children, title = 'This is the default title',logado, admin }: Props) => {

  var menuAdmin = false
  if (admin == "Sim") {
    menuAdmin = true
  } else {
    menuAdmin = false
  }

  function signout() {
    logado = false
    destroyCookie(null, 'nextauth.token')
    destroyCookie(null, 'email.token')

  }
  
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
              // logado || logado &&
              (logado && menuAdmin) && 

              <DropButton
                label="Logado !"
                dropAlign={{ top: 'bottom', right: 'right' }}
                dropContent={
                  <div className={styles.menuDropdown}>
                   <Link href="/Login">
                    <a><span onClick ={ () => signout()}>Sair</span></a>
                    </Link>

                    <Link href="/Cadastro_de_Produtos">
                      <a>
                        <span >Cadastrar Produtos</span>
                      </a>
                    </Link>

                    <Link href="/Visualiza_Reserva">
                      <a>
                        <span>Visualizar Reservas</span>
                      </a>
                    </Link>

                    <Link href="/Alterar_Usuario">
                      <a>
                        <span>Alterar Usuarios</span>
                      </a>
                    </Link>

                    
                    <Link href="/Cadastro_de_Usuarios">
                      <a>
                        <span >Cadastre-se</span>
                      </a>
                    </Link>


                    <Link href="/Alterar_Produto">
                      <a>
                        <span>Alterar Produto</span>
                      </a>
                    </Link>
                  </div>
                }
              />
            }

            { (logado && !menuAdmin) &&

              <DropButton
              label="Logado !"
              dropAlign={{ top: 'bottom', right: 'right' }}
              dropContent={
                <div className={styles.menuDropdown}>

                  <Link href="/Login">
                  <a><span onClick ={ () => signout()}>Sair</span></a>
                  </Link>

                  <Link href="/Visualiza_Reserva">
                    <a>
                      <span>Visualizar Reservas</span>
                    </a>
                  </Link>

                </div>
              }
              />



            }



            {
              // !logado &&
              !logado &&
              <DropButton
                label="Entre aqui !"
                dropAlign={{ top: 'bottom', right: 'right' }}
                dropContent={
                  <div className={styles.menuDropdown}>
                    <Link href="/Login">
                      <a>
                        <span>Logar</span>
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


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx)
  var logado = false
  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: '/Login',
  //       permanent: false,
  //     }
  //   }
  // }
  if (!token) {
    console.log('nao foi')
    logado = false
  } else {
    console.log("foi?")
    logado = true
    console.log(logado)
  }

  console.log('teste layout')
  // await apiClient.get('/users')

  return {
    props: {logado}
  }
}
