import { Street } from './Street';

export interface RegisterForm
{
    names: string,
    surnames: string,
    street: string,
    street_optional?: string,
    // addresses: Street[],

    email: string,
    phone: number,
    password: string
}