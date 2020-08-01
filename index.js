const fs = require('fs'); 

const _UF = process.argv[2].trim();
const folderCities = "cities-state/";
let _states = [];

init();

function init() {
   createFileCity();
   const countCitiesOfState = countCities(_UF);
   const countCitiesByState = GetArrayCountCitiesOfStates();

   console.log(`--- Quantidade de cidade na UF ${_UF} ---`);
   console.log(`${countCitiesOfState} cidades \n`);
   console.log(`--- Quantidade de cidades por estado ---`);
   console.log(`${ JSON.stringify(countCitiesByState.slice(0, 6), null, 2) } \n`);
}

function countCities(uf) {
  const cities = JSON.parse(fs.readFileSync(`${folderCities}${uf}.json`));
  return cities.length;
}

function GetArrayCountCitiesOfStates() {
  let count = [];
  let countCitiesByState = [];
  let objState = {};

  for (let i = 0; i < _states.length; i++) {    
     count = countCities(_states[i].Sigla);
     objState = { "UF": _states[i].Sigla, "Quantidade": count };
     countCitiesByState.push(objState);
  }

  return countCitiesByState.sort((a, b) => {  
      return b.Quantidade - a.Quantidade;
  });
} 

function createFileCity() {
  _states = JSON.parse(fs.readFileSync("Estados.json"));
  const cities = JSON.parse(fs.readFileSync("Cidades.json"));
  
  _states.forEach(element => {
      const cityOfState = cities.filter(cidade => {
          return cidade.Estado === element.ID;
      });
      
      fs.writeFileSync(`${folderCities}${element.Sigla}.json`, JSON.stringify(cityOfState, null, 2));
  });
}


