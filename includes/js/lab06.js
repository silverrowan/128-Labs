// "use strict";

//Gets information from pokeAPIv2, returns an array
const getPokeData = (endpoint, limit) => {
    const url = "https://pokeapi.co/api/v2";

    return fetch(`${url}/${endpoint}/?limit=${limit}`)
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

const makePokemonTableRow = async () => {
    // rawResults = await getPokeData( "pokemon", 100 ); 
    // do i have to parse through ALL pokemon until i find ones that match conditions?
    // ...if so i'll need to figure out pagination :/
    let string;

    pokemonHTML = `
    <tr>
        <td><img>${link}</img></td>
        <td>${pokeName}</td>
        <td>${type}</td>
        <td>${Height}</td>
        <td>${Weight}</td>
    </tr>
    `
    $("#pokeTable").append( pokemonHTML );
}

makeSelectTypeList();
// makePokemonTableRow();