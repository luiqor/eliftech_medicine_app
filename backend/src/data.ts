import { Product } from './types/Product'


export const sampleProducts: Product[] = [
    {
        name: 'Amiksyn',
        id: 'amiksyn',
        price: 100,
        image: './images/medicine-amiksyn.jpg',
        sellerShop: ['Pharmacy 1', 'Pharmacy 2'],
        countInStock: 10
    },
    {
        name: 'Nimid',
        id: 'nimid',
        price: 100,
        image: './images/medicine-nimid.jpg',
        sellerShop: ['Pharmacy 3', 'Pharmacy 2'],
        countInStock: 5
    },
    {
        name: 'Solpadeyin',
        id: 'solpadeyin',
        price: 100,
        image: './images/medicine-solpadeyin.jpg',
        sellerShop: ['Pharmacy 3'],
        countInStock: 2
    },
    {
        name: 'Strepsils',
        id: 'strepsils',
        price: 100,
        image: './images/medicine-strepsils.jpg',
        sellerShop: ['Pharmacy 1', 'Pharmacy 2', 'Pharmacy 3'],
        countInStock: 6
    }
]