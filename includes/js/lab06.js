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
        .then( data => { return data } )
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

const getPokemonTable = async () => {
    const allPokemonJSON = await getPokeData ( "pokemon", 1500);
    allPokemon = allPokemonJSON.results;
    count = 0;
    let addPokemon = false;

    for ( let i=1 ; i <= allPokemon.length ; i++ ) {
        const currPokemon = await getPokeData ( `pokemon/${i}`);

        let selectedType = $(typeOptions).val().toLowerCase().trim();
        let currentTypes = currPokemon.types;

        let typeList = listType( currentTypes, selectedType );

        if ( selectedType == "all" ) { 
            addPokemon = true; 
        }
        if ( addPokemon ) {  
            addTableRow( currPokemon, typeList );
        }
        if ( count === 10 ) { break; }
    }
}

makeSelectTypeList();
getPokemonTable();

// const listType = () =>
const listType = ( currentTypes, selectedType ) => {
    let typeList ="";
    for ( let i=0 ; i < currentTypes.length ; i++ ) {
        let currentTypeI = currentTypes[i].type.name.toLowerCase().trim()
        typeList += currentTypeI;
        typeList += ", "
        if ( selectedType == currentTypeI ) { addPokemon = true; }
    }
    let list = typeList.slice(0,-2);
    
    return list;
}

const addTableRow = ( currPokemon, typeList ) => {
    let pokemonHTML = '';
    let link = currPokemon.sprites.front_default;
    let pokeName = currPokemon.name;

    let Height = currPokemon.height;
    let Weight = currPokemon.weight;
    count++;

    pokemonHTML = `
    <tr>
        <td><img src="${link}"></img></td>
        <td>${pokeName}</td>
        <td>${typeList}</td>
        <td>${Height}</td>
        <td>${Weight}</td>
    </tr>
    `
    $("#pokeTable").append( pokemonHTML );  
}