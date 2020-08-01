const fs = require('fs'); 

const _UF = process.argv[2].trim();
const folderCities = "cities-state/";
let _states = [];

init();

function init() {
   createFileCity();
   const countCitiesOfState = GetCitiesByUF(_UF).length;
   const countCitiesByState = Get5StatesWithMoreCities();
   const count5StatesWithMinusCities = Get5StatesWithMinusCities();
   const citiesWithBiggestNameOfState = GetCitiesWithBiggestNameOfState();
   const citiesWithSmallestNameOfState = GetCitiesWithSmallestNameOfState();

   console.log(`--- Quantidade de cidade na UF ${_UF} ---`);
   console.log(`${countCitiesOfState} cidades \n`);
   console.log(`--- 5 estados com mais cidades ---`);
   console.log(`${ countCitiesByState } \n`);
   console.log(`--- 5 estados com menos cidades ---`);
   console.log(`${ count5StatesWithMinusCities } \n`);
   console.log(`--- Cidades com maiores nomes por estado ---`);
   console.log(`${ citiesWithBiggestNameOfState } \n`);
   console.log(`--- Cidades com menores nomes por estado ---`);
   console.log(`${ citiesWithSmallestNameOfState } \n`);
}

function GetCitiesByUF(uf) {
  const cities = JSON.parse(fs.readFileSync(`${folderCities}${uf}.json`));
  return cities;
}

function Get5StatesWithMoreCities() {
  let count = [];
  let countCitiesByState = [];
  let objState = {};

  for (let i = 0; i < _states.length; i++) {    
     count = GetCitiesByUF(_states[i].Sigla).length;
     objState = { "UF": _states[i].Sigla, "Quantidade": count };
     countCitiesByState.push(objState);
  }

  return JSON.stringify(countCitiesByState.sort((a, b) => {  
      return b.Quantidade - a.Quantidade;
  }).slice(0, 5), null, 2);
} 

function Get5StatesWithMinusCities() {
  let count = [];
  let countCitiesByState = [];
  let objState = {};

  for (let i = 0; i < _states.length; i++) {    
     count = GetCitiesByUF(_states[i].Sigla).length;
     objState = { "UF": _states[i].Sigla, "Quantidade": count };
     countCitiesByState.push(objState);
  }

  return JSON.stringify(countCitiesByState.sort((a, b) => {  
      return a.Quantidade - b.Quantidade;
  }).slice(0, 5)
  .sort((a, b) => {
    return b.Quantidade - a.Quantidade;
  }), null, 2);
} 

function GetCitiesWithBiggestNameOfState() {
  let citiesOfState = [];
  let cityWithBiggestName = [];

  for (let i = 0; i < _states.length; i++) {    
     citiesOfState = GetCitiesByUF(_states[i].Sigla).sort((a,b) => {
       return b.Nome.length - a.Nome.length; 
     });

     cityWithBiggestName.push(citiesOfState[0].Nome + ' - ' + _states[i].Sigla);    
  }

  return cityWithBiggestName;
} 

function GetCitiesWithSmallestNameOfState() {
  let citiesOfState = [];
  let cityWithSmallestName = [];

  for (let i = 0; i < _states.length; i++) {    
     citiesOfState = GetCitiesByUF(_states[i].Sigla).sort((a,b) => {
       return a.Nome.length - b.Nome.length; 
     });

     cityWithSmallestName.push(citiesOfState[0].Nome + ' - ' + _states[i].Sigla);    
  }

  return cityWithSmallestName;
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


