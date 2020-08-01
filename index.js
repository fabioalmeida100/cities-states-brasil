const fs = require('fs'); 

const _UF = process.argv[2].trim();
const folderCities = "cities-state/";
let _states = [];

init();

function init() {
   createFileCity();
   
   ShowCitiesOfStateByArgv();
   Show5StatesWithMoreCities();
   Show5StatesWithMinusCities();
   ShowCitiesWithBiggestNameByState();
   ShowCitiesWithSmallestNameByState();
   ShowCityWithBiggestName();
   ShowCityWithSmallestName();
}

function ShowCitiesOfStateByArgv() {
  const countCitiesOfState = GetCitiesByUF(_UF).length;
  console.log(`--- Quantidade de cidade na UF ${_UF} ---`);
  console.log(`${countCitiesOfState} cidades \n`);
}

function Show5StatesWithMoreCities() {
  let count = [];
  let countCitiesByState = [];
  let objState = {};
  let fiveStatesWithMoreCities = []

  for (let i = 0; i < _states.length; i++) {    
     count = GetCitiesByUF(_states[i].Sigla).length;
     objState = { "UF": _states[i].Sigla, "Quantidade": count };
     countCitiesByState.push(objState);
  }

  fiveStatesWithMoreCities = countCitiesByState.sort((a, b) => {  
      return b.Quantidade - a.Quantidade;
  }).slice(0, 5);

  console.log(`--- 5 estados com mais cidades ---`);
  fiveStatesWithMoreCities.forEach(element => {
    console.log(`${ element.UF } - ${ element.Quantidade} `)
  });
  console.log("")
} 

function Show5StatesWithMinusCities() {
  let count = [];
  let countCitiesByState = [];
  let objState = {};

  for (let i = 0; i < _states.length; i++) {    
     count = GetCitiesByUF(_states[i].Sigla).length;
     objState = { "UF": _states[i].Sigla, "Quantidade": count };
     countCitiesByState.push(objState);
  }

  fiveStatesWithMoreCities = countCitiesByState.sort((a, b) => {  
    return a.Quantidade - b.Quantidade;
  }).slice(0, 5)
    .sort((a, b) => {
      return b.Quantidade - a.Quantidade
    });

  console.log(`--- 5 estados com menos cidades ---`);
  fiveStatesWithMoreCities.forEach(element => {
    console.log(`${ element.UF } - ${ element.Quantidade} `)
  });

  console.log("")
} 

function ShowCitiesWithBiggestNameByState() {
  let citiesOfState = [];
  let cityWithBiggestName = [];

  for (let i = 0; i < _states.length; i++) {    
     citiesOfState = GetCitiesByUF(_states[i].Sigla).sort((a,b) => {
       return b.Nome.length - a.Nome.length; 
     });

     cityWithBiggestName.push({ "Cidade": citiesOfState[0].Nome, "UF": _states[i].Sigla });    
  }

  console.log(`--- Cidades com maiores nomes por estado ---`);
  cityWithBiggestName.forEach(element => {
    console.log(`${ element.Cidade } - ${ element.UF} `)
  });

  console.log("");  
} 

function ShowCitiesWithSmallestNameByState() {
  let citiesOfState = [];
  let cityWithSmallestName = [];

  for (let i = 0; i < _states.length; i++) {    
     citiesOfState = GetCitiesByUF(_states[i].Sigla).sort((a,b) => {
       return a.Nome.length - b.Nome.length; 
     });

     cityWithSmallestName.push({ "Cidade": citiesOfState[0].Nome, "UF": _states[i].Sigla });    
  }

  console.log(`--- Cidades com menores nomes por estado ---`);
  cityWithSmallestName.forEach(element => {
    console.log(`${ element.Cidade } - ${ element.UF} `)
  });

  console.log("");  
} 

function ShowCityWithBiggestName() {
  let citiesOfState = [];
  let cityWithBiggestName = [];

  for (let i = 0; i < _states.length; i++) {    
     citiesOfState = GetCitiesByUF(_states[i].Sigla).sort((a, b) => {
       return b.Nome.length - a.Nome.length; 
     });

     cityWithBiggestName.push({ "Cidade": citiesOfState[0].Nome, "UF": _states[i].Sigla });    
  }

  let lengthOfBiggestNameCity = cityWithBiggestName.sort((a, b) => {
    return b.Cidade.length - a.Cidade.length 
  })[0].Cidade.length;

  var onlyBiggestCities = cityWithBiggestName.filter(cidade => {
      return cidade.Cidade.length == lengthOfBiggestNameCity;
  }).sort((a, b) => {
    return a.Cidade < b.Cidade ? -1 : a.Cidade > b.Cidade ? 1 : 0;
  })
  
  console.log(`--- Cidades com maior nome ---`);
  console.log(`${ onlyBiggestCities[0].Cidade } - ${ onlyBiggestCities[0].UF }  \n`);
}

function ShowCityWithSmallestName() {
  let citiesOfState = [];
  let cityWithSmallestName = [];

  for (let i = 0; i < _states.length; i++) {    
     citiesOfState = GetCitiesByUF(_states[i].Sigla).sort((a, b) => {
       return a.Nome.length - b.Nome.length; 
     });

     cityWithSmallestName.push({ "Cidade": citiesOfState[0].Nome, "UF": _states[i].Sigla });    
  }

  let lengthOfSmallNameCity = cityWithSmallestName.sort((a, b) => {
    return a.Cidade.length - b.Cidade.length 
  })[0].Cidade.length;

  var onlySmallCities = cityWithSmallestName.filter(cidade => {
      return cidade.Cidade.length == lengthOfSmallNameCity;
  }).sort((a, b) => {
    return a.Cidade < b.Cidade ? -1 : a.Cidade > b.Cidade ? 1 : 0;
  })
  
  console.log(`--- Cidades com menor nome ---`);
  console.log(`${ onlySmallCities[0].Cidade } - ${ onlySmallCities[0].UF }  \n`);
}

function GetCitiesByUF(uf) {
  const cities = JSON.parse(fs.readFileSync(`${folderCities}${uf}.json`));
  return cities;
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


