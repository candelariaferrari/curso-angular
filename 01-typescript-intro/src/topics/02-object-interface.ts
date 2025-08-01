//Arreglo de string
const skills: string[] = ['bash', 'counter', ' headling'];

//interface 
interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string | undefined; //LE ESTAMOS DICIENDO QUE ES OPCIONAL
}


const strider: Character = {
    name: 'Strider',
    hp: 100,
    skills: ['Bash', 'Counter'],
}

strider.hometown = 'Rivendell';

console.table(strider);



export {}