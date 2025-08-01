export interface Product {
    description: string;
    price: number;
}

//objeto 1
const phone: Product = {
    description: 'Nokia a1',
    price: 150.0
}
//objeto 2
const tablet: Product = {
    description: 'ipad Air',
    price: 250.0
}
export interface TaxCalculationOptions {
    tax: number;
    products: Product[];
}

//function taxCalculation(options: TaxCalculationOptions): [number, number] { //Desestructuracion es que hago un arreglo de numeros 
//DESESTRUCTURACION DE OPTIONS
//function taxCalculation({tax, products}: TaxCalculationOptions): [number, number] { 
export function taxCalculation(options: TaxCalculationOptions): [number, number] {
    const { tax, products } = options
    
    let total = 0;
    //DESESTRUCTURACION
    // options.products.forEach(({ price}) => {
    products.forEach(({ price }) => {
        total += price;
    });

    // options.products.forEach(product => {
    //     total += product.price;
    // });
    //return [total, total * options.tax]
    return [total, total * tax]
}
//funcion:se recomienda hasta 3 argumentos, 
//si no deberiamos pasarlo a un objeto, si tiene mas de 3


//forEach -> metodo que se usa para reccorer todos los elementos del array. en este caso 
//esta recorriendo el array de products y suma su precios.


const shoppingCart = [phone, tablet];
const tax = 0.15;

//DESESTRUCTURACION 
const [total, taxTotal] = taxCalculation({
    products: shoppingCart,
    //tax: tax, para evitar poner una propiedad con el mismo nombre de la variable se puede poner solo la variable
    tax,
});

// const result = taxCalculation({
//     products: shoppingCart,
//     tax: tax, para evitar poner una propiedad con el mismo nombre de la variable se puede poner solo la variable
//     tax,
// });


//console.log('TOTAL', result.total); NO puedo ponerlo asi porque el resultado que tengo es un arreglo 
// console.log('TOTAL', result[0]);
// console.log('TAX', result[1]);
console.log('TOTAL', total);
console.log('TAX', taxTotal);

