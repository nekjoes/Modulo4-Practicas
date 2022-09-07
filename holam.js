const fs = require("fs");
const Leido = fs.readFileSync("myread.txt","utf-8")
// const hello = "Hola Mundo";
//fs.writeFileSync("Escrito.txt",`Lo que lei del archivo es: ${Leido}`);


// const escribir = fs.writeFileSync("Escrito.txt",Leido);

console.log(`Lo que lei del archivo es: ${Leido}`)

const redFromFile = fs.readFile("myread.txt","utf-8",(err, data)=>{
    console.log("lo que lei del archivo", data);
});

console.log("despues de leer el archivo");