//

export interface Passanger{
    name: string;
    children?: string[];
}

const passenger1: Passanger = {
    name: 'Cande',
}

const passenger2: Passanger = {
    name: 'Julian',
    children: ['Catalina','Pandi']
}

const printChildren = (passanger : Passanger) => {
    const howManyChildren = passanger.children?.length || 0;// si existe devuelve la cantidad y si no devuelve 0

    console.log('Pasajero= ' + passanger.name + ' Hijos= ' + howManyChildren);
    
}

printChildren(passenger1)