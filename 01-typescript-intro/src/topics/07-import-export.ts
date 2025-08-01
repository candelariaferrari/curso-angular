//import - export  son modulos 
// La idea de esto se resume a tener una funcionalidad encapsulada , transformando los archivos en modulos 
// cuando exportamos , tenemos que tener en cuenta que el archivo que exportemos no tenga codigo suelto que no necesitemos 
// como por ej console.log o otras funciones porque nos va a aparecer todo en donde lo importemos

import { taxCalculation } from './06-function-destructuring';

import type { Product } from './06-function-destructuring';


const shoppingCart: Product[] = [
    {
        description: 'Nokia',
        price: 100,
    },
    {
        description: 'Ipad',
        price: 400,
    }
];

const [total, tax] = taxCalculation({
    products:shoppingCart,
    tax:0.15
});

console.log('total', total);
console.log('tax', tax);


