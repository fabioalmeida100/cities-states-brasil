import { promises as fs } from "fs";

init();

function  init() {
   createFileCity();
}

async function createFileCity() {
  const state = JSON.parse(await fs.readFile("Estados.json"));
  const cities = JSON.parse(await fs.readFile("Cidades.json"));
  
  state.forEach(element => {
      const cityOfState = cities.filter(cidade => {
          return cidade.Estado === element.ID;
      });
      
      fs.writeFile(`cities-state/${element.Sigla}.json`, JSON.stringify(cityOfState, null, 2));
  });
}

