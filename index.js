import { promises as fs } from "fs";
import { Console } from "console";

const _UF = process.argv[2].trim();
const folderCities = "cities-state/";

init();

async function  init() {
   createFileCity();
   const countCitiesOfState = await countCities();

   console.log(`A UF: ${_UF} tem ${countCitiesOfState} cidades`);
}

async function countCities() {
  const cities = JSON.parse(await fs.readFile(`${folderCities}${_UF}.json`));
  return cities.length;
}

async function createFileCity() {
  const state = JSON.parse(await fs.readFile("Estados.json"));
  const cities = JSON.parse(await fs.readFile("Cidades.json"));
  
  state.forEach(element => {
      const cityOfState = cities.filter(cidade => {
          return cidade.Estado === element.ID;
      });
      
      fs.writeFile(`${folderCities}${element.Sigla}.json`, JSON.stringify(cityOfState, null, 2));
  });
}


