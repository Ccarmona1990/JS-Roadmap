
/** Filter gifts function **/
/*
// filter gift function
function filterGifts1(gifts) {
  return gifts.map(gift => gift.includes('#') ? gift.replace('#','') : gift);
}
function filterGifts(gifts) {
  return gifts.filter(gift => !gift.includes('#'));
}

const gifts2 = ['#broken', '#rusty']
const good2 = filterGifts(gifts2)
//console.log(good2)
*/

/** Creador de regalos **/

/*
// manufacture gifts function
function manufactureGifts(giftsToProduce) {
  const result = [];
  for (const { toy, quantity } of giftsToProduce) {
    if (typeof quantity !== 'number' || quantity < 1) {
      continue;
    }
    for (let i = 0; i < quantity; i++) {
      result.push(toy);
    }
  }
  return result;
}

const production1 = [
  { toy: 'car', quantity: 3 },
  { toy: 'doll', quantity: 1 },
  { toy: 'ball', quantity: 2 }
]
const production2 = [
  { toy: 'train', quantity: 0 }, // no se fabrica
  { toy: 'bear', quantity: -2 }, // tampoco
  { toy: 'puzzle', quantity: 1 }
]

const result1 = manufactureGifts(production2)
console.log(result1)
// ['car', 'car', 'car', 'doll', 'ball', 'ball']
*/

/** Dibujador de regalos **/

// function drawGift(size, symbol) {
//   let str = ''; 
//   if (size < 2) return str;
//   for(let i = 1; i <= size; i++){
//     if (i === 1){
//       str += `${symbol.repeat(size)}\n`;
//     } else if (i === size){
//       str += symbol.repeat(size);
//     } else {
//       const spaces = ' '.repeat(size-2);
//       str += `${symbol}${spaces}${symbol}\n`;
//     }
//   }
//   return str;
// }
// const g1 = drawGift(4, '*')
// console.log(g1)
// /*
//  ****
//  *  *
//  *  *
//  ****
//  */

// const g2 = drawGift(3, '#')
// console.log(g2)
// /*
// ###
// # #
// ###
// */

// const g3 = drawGift(2, '-')
// console.log(g3)
// /*
// --
// --
// */

// const g4 = drawGift(1, '+')
// console.log(g4)
// // "" 

/** Decodificador de código de Santa **/

/*
function evalDynamicStr(str){
  // Extract base number from the start of a string
  const baseNumber = parseInt(str, 10);
  // Extract just the operator symbol
  const operators = str.replace(/[0-9]/g, '').split('');

  // Defining rules for all possible operators
  const operatorRules = {
    '+': val => val + 1,
    '-': val => val - 1,
  }
  // Loop through each operator and update the total
  return operators.reduce((total, operator)=>{
    const rule = operatorRules[operator];
    return rule ? rule(total) : total;
  }, baseNumber)
}

function decodeSantaPin(code) {
  const arr = code.match(/[^[\]]+/g);
  let prev = null;
  let pin = '';
  if(arr.length < 4) return null;
  arr.forEach(element => {
    const char = element.charAt(0);
      if(char === '<') {element = prev; pin += element;} 
      else if (element.length === 1) {prev = element; pin += element;}
      else if (element.length > 1){
        const dynNum = evalDynamicStr(element);
        if(dynNum === 10) {prev = '0'; pin += prev;}
        else if(dynNum === -1) {prev = '9'; pin += prev;}  
        else if(char !== '9' && char !== '0') {prev = evalDynamicStr(element); pin += prev;}
      }
  });
  return console.log(pin);
}
*/
/* 
console.log(
decodeSantaPin('[1++][2-][3+][<]'))
// "3144"
console.log(
decodeSantaPin('[9+][0-][4][<]'))
// "0944"

decodeSantaPin('[1+][2-]')
// null (solo 2 dígitos)

// Version mas eficiente
function decodeSantaPin(code) {

    const blocks = code.match(/[^[\]]+/g);

    if (blocks.length < 4) return null;

    let pin = "";
    let previous = "";

    for (const block of blocks) {

        if (block === "<") {pin += previous; continue;}

        let digit = Number(block[0]);

        for (const op of block.slice(1)) {
            if (op === "+") {digit = (digit + 1) % 10;}
            if (op === "-") {digit = (digit + 9) % 10;}
        }

        previous = String(digit);
        pin += previous;
    }

    return pin;
} */

    /** Empaquetador de regalos **/

/*
  // Get the pair of gloves
  function matchGloves(gloves) {
    const matchingGloves = [];
    const allGloves = {};

    for (const glove of gloves){
      const {hand, color} = glove;
      if (!allGloves[color]){allGloves[color] = {L: 0, R: 0}}; 
      let currGlove = allGloves[color];
      const oppositeHand = hand === 'L' ? 'R' : 'L';
      if (currGlove[oppositeHand] > 0){
        currGlove[oppositeHand]--;
        matchingGloves.push(color);
      } else{
        currGlove[hand]++;
      }
    }
  return matchingGloves
}

const gloves = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' },
  { hand: 'L', color: 'green' }
]

matchGloves(gloves)
console.log(matchGloves(gloves))
// ["red", "green"]

const gloves2 = [
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' }
]

matchGloves(gloves2)
console.log(matchGloves(gloves2))
// ["gold", "gold"]

const gloves3 = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' }
]

matchGloves(gloves3)
//console.log(matchGloves(gloves3))

// []

const gloves4 = [
  { hand: 'L', color: 'green' },
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'red' },
  { hand: 'R', color: 'green' }
]

matchGloves(gloves4)
//console.log(matchGloves(gloves4))

// ['red', 'green']
*/

/** Tiempo hasta el despegue **/

/* 
function timeUntilTakeOff(fromTime, takeOffTime) {
  const parseElfTime = (time) =>{
    const formatted = 
    time
        .replaceAll('*','-')
        .replaceAll('@','T')
        .replaceAll('|',':')
        .replace(' NP','') + 'Z';
    return new Date(formatted);
  }
  const result =  Math.floor((parseElfTime(takeOffTime) - parseElfTime(fromTime))/1000);
  return result;
}

const takeoff = '2025*12*25@00|00|00 NP'

// desde el 24 diciembre 2025, 23:59:30, 30 segundos antes del despegue
timeUntilTakeOff('2025*12*24@23|59|30 NP', takeoff)
// 30

// justo en el momento exacto
timeUntilTakeOff('2025*12*25@00|00|00 NP', takeoff)
// 0

// 12 segundos después del despegue
timeUntilTakeOff('2025*12*25@00|00|12 NP', takeoff)
// -12 
*/

/** Encontrar el juguete único **/

/* 
function findUniqueToy(toy) {
  const conteoDeLetras = {};
  for (const letra of toy.toLowerCase()){
    conteoDeLetras[letra] = (conteoDeLetras[letra] || 0) + 1;
  }
  for (const letra of toy){
    if(conteoDeLetras[letra.toLowerCase()] === 1) {return letra;}
  }
  return ''
}

findUniqueToy('Gift') // 'G'
console.log(findUniqueToy('Gift') );
// ℹ️ La G es la primera letra que no se repite
// y la devolvemos tal y como aparece

findUniqueToy('sS') // ''
console.log(findUniqueToy('sS'))
// ℹ️ Las letras se repiten, ya que no diferencia mayúsculas

findUniqueToy('reindeeR') // 'i'
console.log(findUniqueToy('reindeeR'))
// ℹ️ La r se repite (aunque sea en mayúscula)
// y la e también, así que la primera es la 'i'

// Más casos:
findUniqueToy('AaBbCc') // ''
findUniqueToy('abcDEF') // 'a'
findUniqueToy('aAaAaAF') // 'F'
findUniqueToy('sTreSS') // 'T'
findUniqueToy('z') // 'z'
 */

  /** Profundidad máxima de corchetes **/

/* 
  function maxDepth(s) {
    let profundidad = 0;
    let profundidadMaxima = 0;

    for (const char of s){
      if(char === '['){
        profundidad++;
        profundidadMaxima = Math.max(profundidadMaxima, profundidad);
      } else if (char === ']'){
        profundidad--;
        if (profundidad < 0) return -1;
      }
    }
  return profundidad === 0 ? profundidadMaxima : -1;
}
maxDepth('[]') // -> 1
maxDepth('[[]]') // -> 2
maxDepth('[][]') // -> 1
maxDepth('[[][]]') // -> 2
maxDepth('[[[]]]') // -> 3
maxDepth('[][[]][]') // -> 2

maxDepth('][') // -> -1 (cierra antes de abrir)
maxDepth('[[[') // -> -1 (faltan cierres)
maxDepth('[]]]') // -> -1 (sobran cierres)
maxDepth('[][][') // -> -1 (queda uno sin cerrar)
 */

/** Empaquetador de regalos **/

/* function packGifts(regalos, pesoMaximo) {
  // Si no hay regalos, no se necesitan trineos
  if (regalos.length === 0) return 0;
  let trineos = 1;
  let pesoActual = 0;

  // Iterar sobre cada regalo en la lista de regalos
  for (const regalo of regalos){
    // Si el peso del regalo excede el peso máximo permitido, no se puede empaquetar
    if (regalo > pesoMaximo) return null;
    // Si el peso actual más el peso del regalo es menor o igual al peso máximo, 
    // agregar el regalo al trineo actual. Si no, iniciar un nuevo trineo y agregar el regalo a ese trineo.
    if (pesoActual + regalo <= pesoMaximo) {
      pesoActual += regalo;
    } else {
      trineos++;
      pesoActual = regalo;
    }
  }
  return trineos;
}

packGifts([2, 3, 4, 1], 5);
//console.log(packGifts([2, 3, 4, 1], 5))
// 2 trineos
// Trineo 1: 2 + 3 = 5
// Trineo 2: 4 + 1 = 5

packGifts([3, 3, 2, 1], 3)
//console.log(packGifts([3, 3, 2, 1], 3))
// 3 trineos
// Trineo 1: 3
// Trineo 2: 3
// Trineo 3: 2 + 1 = 3

packGifts([1, 1, 1, 1], 2)
// console.log(packGifts([1, 1, 1, 1], 2))
// 2 trineos
// Trineo 1: 1 + 1 = 2
// Trineo 2: 1 + 1 = 2

packGifts([5, 6, 1], 5)
// console.log(packGifts([5, 6, 1], 5))
// null
// Hay un regalo de peso 6 que no cabe

packGifts([], 10)
//console.log(packGifts([], 10))
// 0 trineos
// No hay regalos que entregar */

/** Regalos no seguros **/

/* 
function findUnsafeGifts(warehouse) {
  // Definir las direcciones para verificar las celdas adyacentes (arriba, abajo, izquierda, derecha);
  const direcciones = [[-1,0], [1,0], [0,-1], [0,1]];
  let noSeguro = 0;
  
  // Iterar sobre cada fila en el almacén
  for (let fila = 0; fila < warehouse.length; fila++){
    // Iterar sobre cada columna en la fila actual
    for (let columna = 0; columna < warehouse[fila].length; columna++){

      // Chequear cada celda tiene un regalo ('*');
      if (warehouse[fila][columna] !== '*') continue;
      
      let regaloProtegido = false;
      
      // Chequear las cuatro celdas adyacentes (arriba, abajo, izquierda, derecha) para saber si hay una cámara ('#') 
      for (const [dirFila, dirColumna] of direcciones) {
        const nuevaFila = fila + dirFila;
        const nuevaColumna = columna + dirColumna;
        const dentroDeLimites = nuevaFila >= 0 && nuevaFila < warehouse.length && nuevaColumna >= 0 && nuevaColumna < warehouse[nuevaFila].length && warehouse[nuevaFila][nuevaColumna] === '#';

        if (dentroDeLimites) {
          regaloProtegido = true;
          break;
        }
      }
      // Si no hay cámara encontrada adyacente al regalo, incrementar el conteo de regalos no seguros
      if (!regaloProtegido) noSeguro++;
  }
}
  return noSeguro;
}

console.log(
findUnsafeGifts([
  '.*.',
  '*#*',
  '.*.'
]) // ➞ 0

// All presents are next to a camera

,findUnsafeGifts([
  '...',
  '.*.',
  '...'
]) // ➞ 1

// This present has no cameras around

,findUnsafeGifts([
  '*.*',
  '...',
  '*#*'
]) // ➞ 2
// The presents in the top corners have no cameras around

,findUnsafeGifts([
  '.....',
  '.*.*.',
  '..#..',
  '.*.*.',
  '.....'
]) // ➞ 4

// The four presents have no cameras, because they are diagonal to the camera
);
 */

/** Camino a los regalos **/

/* 
function findGiftPath(obj, regalo) {
  // Iterar sobre cada llave y valor del objeto usando Object.entries para obtener un arreglo de pares [llave, valor].
  for (const [llave, valor] of Object.entries(obj)){
    // Si el valor es igual al regalo, devuelve un arreglo que contiene la llave actual.
    if (valor === regalo) return [llave];
    // Si el valor es un objeto y no es nulo, llama recursivamente a la funcion para buscar el regalo en ese objeto.
    if (typeof valor === 'object' && valor !== null) {
      const path = findGiftPath(valor, regalo);
      // Si se encuentra un camino hacia el regalo y ya no hay mas objectos, devuelve un arreglo que contiene la llave actual y el camino hasta llegar a dicho regalo.
      if (path.length > 0) return [llave, ...path];
    }
  }
  return []
}

const workshop = {
  storage: {
    shelf: {
      box1: 'train',
      box2: 'switch'
    },
    box: 'car'
  },
  gift: 'doll'
}

console.log(
findGiftPath(workshop, 'train')
// ➜ ['storage', 'shelf', 'box1']

,findGiftPath(workshop, 'switch')
// ➜ ['storage', 'shelf', 'box2']

,findGiftPath(workshop, 'car')
// ➜ ['storage', 'box']

,findGiftPath(workshop, 'doll')
// ➜ ['gift']

,findGiftPath(workshop, 'plane')
// ➜ []
)
 */

/** CHEQUEAR SI TIENE 4 LUCES **/
/* 
function hasFourLights(board) {
  const direccion = [[1,0],[0,1]]; 
  
  // Iterar sobre cada fila y columna del tablero
  for (let fila = 0; fila < board.length; fila++){
    for (let columna = 0; columna < board[fila].length; columna++){

      const color = board[fila][columna];

      // Verificar si hay luces
      if(color === '.') continue;

      // Iterar sobre cada dirección (horizontal y vertical) para verificar si hay 4 luces del mismo color seguidas
      for (const [dirFila, dirColumna] of direccion){
        let hayCuatroLuces = true;
        
        // Verificar las siguientes 3 celdas en la dirección actual
        for (let i = 1; i < 4; i++){
          const nuevaFila = fila + dirFila * i;
          const nuevaColumna = columna + dirColumna * i;
          // Si no se encuentran 4 luces del mismo color seguidas, devolver false
          if (board[nuevaFila]?.[nuevaColumna] !== color) {
            hayCuatroLuces = false;
            break;
          }
        }
        // Si se encuentran 4 luces del mismo color seguidas, devolver true
        if (hayCuatroLuces) return true;
      }
    }
  }
  return false
}

console.log(
hasFourLights([
  ['.', '.', '.', '.', '.'],
  ['R', 'R', 'R', 'R', '.'],
  ['G', 'G', '.', '.', '.']
])
// true → hay 4 luces rojas en horizontal

,hasFourLights([
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.']
])
// true → hay 4 luces verdes en vertical

,hasFourLights([
  ['R', 'G', 'R'],
  ['G', 'R', 'G'],
  ['G', 'R', 'G']
])
// false → no hay 4 luces del mismo color seguidas
); */

/** ORDENAR RUTA NAVIDEÑA **/
/* 
function revealSantaRoute(routes) {
  let route = [];
  // Buscar el primer origen que no sea un destino en ninguna otra ruta
  route.push(routes[0][0], routes[0][1]);

  let foundnext = true;

  // Mientras se encuentre un siguiente destino, continuar agregando a la ruta
  while (foundnext){
  foundnext = false;
  for (const [origen, destino] of routes) {
   // Si el último destino en la ruta coincide con el origen de la ruta actual, agregar el destino a la ruta 
      if (route[route.length - 1] === origen) {
        route.push(destino);
        foundnext = true;
        break;
      } 
    }
  }  
  return route
}
 */
 // Version mas eficiente

 /*
 function revealSantaRoute(routes) {
  if (routes.length === 0) return [];

  const nextStops = {};

  // Construimos el mapa
  for (const [from, to] of routes) {
    nextStops[from] = to;
  }

  // Primer tramo
  const result = [routes[0][0], routes[0][1]];

  let current = routes[0][1];

  // Seguimos la ruta
  while (nextStops[current]) {
    current = nextStops[current];
    result.push(current);
  }

  return result;
}
  */
/* 
console.log(
revealSantaRoute([
  ['MEX', 'CAN'],
  ['UK', 'GER'],
  ['CAN', 'UK']
])
// → ['MEX', 'CAN', 'UK', 'GER']

,revealSantaRoute([
  ['USA', 'BRA'],
  ['JPN', 'PHL'],
  ['BRA', 'UAE'],
  ['UAE', 'JPN'],
  ['CMX', 'HKN']
])
// → ['USA', 'BRA', 'UAE', 'JPN', 'PHL']

,revealSantaRoute([
  ['STA', 'HYD'],
  ['ESP', 'CHN']
])
// → ['STA', 'HYD']
) */

/** DROPGIFT **/
/*
function dropGifts(warehouse, drops) {
  for (const column of drops) {

    for (let row = warehouse.length - 1; row >= 0; row--) {

      if (warehouse[row][column] === '.') {
        warehouse[row][column] = '#';
        break;
      }
    }
  }
  return warehouse;
}
  */
/*
dropGifts(
  [
    ['.', '.', '.'],
    ['.', '#', '.'],
    ['#', '#', '.']
  ],
  [0]
)*/
/*
[
  ['.', '.', '.'],
  ['#', '#', '.'],
  ['#', '#', '.']
]
*/

/*
console.log(
dropGifts(
  [
    ['.', '.', '.'],
    ['#', '#', '.'],
    ['#', '#', '#']
  ],
  [0, 2]
),
//[
// ['#', '.', '.'],
// ['#', '#', '#'],
// ['#', '#', '#']
//]

dropGifts(
  [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.']
  ],
  [0, 1, 2]
),

//[
//  ['.', '.', '.'],
//  ['.', '.', '.'],
//  ['#', '#', '#']
//]


dropGifts(
  [
    ['#', '#'],
    ['#', '#']
  ],
  [0, 0]
)

//[
//  ['#', '#'],
//  ['#', '#']
//]
);
*/

