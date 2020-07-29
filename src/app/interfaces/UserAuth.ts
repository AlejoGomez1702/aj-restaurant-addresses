import { Street } from './Street';

export interface UserAuth
{
    addresses: Street[],
    email: string,
    names: string,
    surnames: string,
    phone: number    
}