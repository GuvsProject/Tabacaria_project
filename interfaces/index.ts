// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
  password: any
  email: string
  cpf: number
  birtDate: string
  admin: string
  ativo: string
  createdAt: string
  updatedAt: string
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

export interface Order {
  userId: number,
  productId: number,
  quantity: number,
  price: number,
  status: string,
  orderDate: string
}