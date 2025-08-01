//consiste en que podamos tomar de los objetos las partes que nos interesan 

interface AudioPlayer{
    audioVolume: number;
    songDuration: number;
    song: string;
    details:Details;
}

interface Details {
    author:string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: "Ed sheeran",
        year: 2015
    }
}

const song = 'new song';
//desestrucutoro solo tomo song generando una nueva variable
//const {song} = audioPlayer

const { song:anotherSong, songDuration: duration} = audioPlayer;
const { author, year } = audioPlayer.details

console.log(`Song: ` + anotherSong + ` duracion: ` + duration);
console.log( `desestructuracion de details: ` + `autor ` + author + ` ano ` + year);

console.log(`Song: ` + audioPlayer.song);
console.log(`Song: ` + song);
console.log(`autor: ` + audioPlayer.details.author);

//DESESTRUCTURACION DE ARREGLOS
// siempre empieza en 0, 1, 2, etc
const dbz: string [] = [ `Goku`, `Vegeta`, `Trunk`];
const [ , , trunks = 'not found']: string[]=[`Goku`, `Vegeta`, `Trunk`];
    // el not found seria para cuando no este trunk definido 
//const trunk= dbz[3] || 'No hay personaje';

console.log(`firts: `, dbz[2]);
// console.log(`firts: `, dbz[3]|| 'No hay personaje');
console.error('Personaje 3 ', trunks);

export {}