// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
  password: string
}


export interface Product {
  id: number
  name: string
  description: string
  quantity: number
  price: number
  status: string
  createdAt: string
  updatedAt: string
}

// export interface Product_for_Alter {
//   id: number
//   Nome: string
//   Quantidade: number
//   Preco: number

// }