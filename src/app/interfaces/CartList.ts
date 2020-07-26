import { Product } from './Product';
import { OptionProduct } from './OptionProduct';

export interface CartList
{
    quantity: number, 
    product: Product, 
    options: OptionProduct
}