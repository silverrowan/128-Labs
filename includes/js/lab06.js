// "use strict";

//Gets information from pokeAPIv2, returns an array
const getPokeData = (endpoint, limit, offset) => {
    const url = "https://pokeapi.co/api/v2";
    let offsetString = ''
    let limitString = ''
    if (offset) { offsetString = `&offset=${offset}`; }
    if (limit) { limitString = `?limit=${limit}`; }

    return fetch(`${url}/${endpoint}/${limitString}${offsetString}`)
        .then( response => response.json() )
        .then( data => { console.log(data);
            return data } )
        .catch( error => console.log(error.message));
}

// get items for and make options in select
const makeSelectTypeList = async () => {
    let results = await getPokeData("type", 100);
    results = results.results;

    // for each of the entries. 
    for ( let i = 0; i < results.length ; i++ ) {
        let typeString = results[i].name;

        let typeHTML = `<option value="${typeString}">${typeString}</option>`
        $("#typeOptions").append( typeHTML );
    }
}

makeSelectTypeList();

const getPokemonTable = async () => {
    const allPokemonJSON = await getPokeData ( "pokemon", 1500);
    allPokemon = allPokemonJSON.results;
    console.log( allPokemon );
    count = 0;
    let pokemonHTML = '';

    for ( i=1 ; i <= 3 ; i++ ) {
        const currPokemon = await getPokeData ( `pokemon/${i}`);
        console.log( currPokemon );

        let addPokemon = false;
        let selectedType = $(typeOptions).val().toLowerCase().trim();
        let currentTypes = currPokemon.types;
        let typeList = '';
 

        for ( i=0 ; i < currentTypes.length ; i++ ) {
            let currentTypeI = currentTypes[i].type.name.toLowerCase().trim()
            if ( selectedType != currentTypeI ) {
                typeList += currentTypeI;
                continue;}
            else {
                typeList += currentTypeI;
                addPokemnon = true;
            }
        }

        if ( selectedType == "all" ) { addPokemon = true; }

        if ( addPokemon ) {        
            let link = currPokemon.sprites.front_default;
            let pokeName = currPokemon.name;
            let type = typeList;
            let Height = currPokemon.height;
            let Weight = currPokemon.weight;
            count++;

            pokemonHTML = `
            <tr>
                <td><img src="${link}"></img></td>
                <td>${pokeName}</td>
                <td>${type}</td>
                <td>${Height}</td>
                <td>${Weight}</td>
            </tr>
            `
            $("#pokeTable").append( pokemonHTML );        

            console.log( allPokemon[i] );
        }
        if ( count === 10 ) { break; }
    }
}


getPokemonTable();

