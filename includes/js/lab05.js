// #region Hotel Class 
class Hotel {
        #name;
        #city;
        #rooms;
        #booked;
        #gym;
        #roomTypes;
        #location;
        #swimmingPool;
        #airportShuttle;
        #restaurants;

    // constructor( name, rooms, booked, gym )
    constructor(name, city, rooms, booked, gym) {
        this.#name = name;
        this.#city = city;
        this.#rooms = rooms;
        this.#booked = booked;
        this.#gym = gym;
        this.#roomTypes;
        this.#location;
        this.#swimmingPool;
        this.#airportShuttle;
        this.#restaurants;
    }

    get locationName() { return this.#name; }
    set locationName(n) { this.#name = n; }

    get city() { return this.#city; }
    set city(c) { this.#city = c; }

    get rooms() { return this.#rooms; }
    set rooms(r) { this.#rooms = r; }

    get booked() { return this.#booked; }
    set booked(b) { this.#booked = b; }

    get gym() { return this.#gym; }
    set gym(g) { this.#gym = g; }

    get roomTypes() { return this.#roomTypes; }
    set roomTypes(t) { this.#roomTypes = t; }

    get swimmingPool() { return this.#swimmingPool; }
    set swimmingPool(p) { this.#swimmingPool = p; }

    get airportShuttle() { return this.#airportShuttle; }
    set airportShuttle(a) { this.#airportShuttle = a; }

    get restaurants() { return this.#restaurants; }
    set restaurants(map) { this.#restaurants = map; }

    bookRoom( notifyContainer ) {
        if (this.booked < this.rooms) {
            this.booked = this.booked + 1 ;
            notifyContainer.innerHTML = `Your room was booked<br>`;
            notifyContainer.innerHTML += `${ this.rooms - this.booked } rooms are now available`
        } else {
            notifyContainer.innerHTML = "Sorry, there are no rooms available. Your room was not booked."
        }
    }
    cancelRoom( notifyContainer ) {
        if (this.booked > 0 ) {
            this.booked = this.booked - 1 ;
            notifyContainer.innerHTML = `Your room was successfully cancelled.<br>`;
            notifyContainer.innerHTML += `There are now ${ this.rooms - this.booked } rooms available`
        } else {
            notifyContainer.innerHTML = "There are no booked rooms to cancel"
        }
    }
    listRoomsHTML = () => {
        let roomList = '';
        for (let i = 0; i < example.roomTypes.length -1 ; i++) {
            roomList += example.roomTypes[i] + ", "
        }
        roomList += example.roomTypes.at(-1);
        return `<p id="typeListP">The available room types are: ${roomList}.</p>`
    }
    addRoomType = ( typeListContainer ) => {
        let newType = prompt("Type of room to add?").trim();
        let newPosition = this.roomTypes.length;
        this.roomTypes[newPosition] = newType;
        typeListContainer.innerHTML = this.listRoomsHTML() ;
    }
}
// #endregion 

// #region Hotel Example + output structure
example = new Hotel("Cartagena Hotel", "Cartagena", 20, 15, true );
example.roomTypes = ["Single", "Double", "Suite"];
example.swimmingPool = true;
example.airportShuttle = true;
example.restaurants = [["Donde la Arepa", "Colombian"], ["Cassa Ramen", "Japanese"], ["Pizza Hermosa", "Italian"]];

let restNumber = example.restaurants.length;
let restOut = '';
for (let i = 0; i < example.restaurants.length; i++) {
    restOut += `
        <ul><strong>${i + 1}. ${example.restaurants[i][0]}</strong> / Type / <strong>${example.restaurants[i][1]}</strong> </ul>
        `
}

let hotelNameAndLocation = `
    <h1>${example.locationName}</h1>
    <h2><u>Hotel Info</u></h2>
    <p>The <strong>${example.locationName} Hotel</strong> is located in <strong>${example.city}</strong>.</p>`
let hotelRoomTypes = example.listRoomsHTML();
let boolExtras = `    
    <p><Strong>Hotel has a shuttle?</strong> ${example.airportShuttle}</p>
    <p><Strong>Hotel has a Gym?</strong> ${example.gym}</p>
    <p><Strong>Hotel has a swimming pool?</strong> ${example.swimmingPool}</p>`
let hotelRestaraunts = `
    <p><Strong>Hotel has a ${restNumber} restaraunts, each with a different theme: </strong></p>
    <list>${restOut}</list>`
let hotelRoomsAvailable = `<p id="roomsP">There are ${example.booked} / ${example.rooms} booked.</p>`;
let hotelRoomAdjustBtns = `<div><button class="btn btn-primary" id="btnBook">Book Room</button>
    <button class="btn btn-danger" id="btnCancel">Cancel Room</button>
    <button class="btn btn-success" id="btnType">Add Room Type</button></div>
    `;
let endCard = `</div>`;
let sisterResortBtn = `<div><button class="btn btn-success m-3 mt-0" id="sisterBtn">See Our Sister Resort</button></div>`

const buildHotelCard = ( cardContainer ) => {
    cardContainer.html(`<div class="card m-3 p-3" id="testCard"></div>`);
    $("#testCard").append( hotelNameAndLocation );
    $("#testCard").append( hotelRoomTypes );
    $("#testCard").append( boolExtras );
    $("#testCard").append( hotelRestaraunts );
    $("#testCard").append( hotelRoomsAvailable );
    $("#testCard").append( hotelRoomAdjustBtns );

    $("#testCard").append( endCard );
    $("#testCard").after( sisterResortBtn );

    $("#roomsP").css("color", "green");
    let roomsAvailableP = document.querySelector("#roomsP");
    $("#btnBook").click( function () {
        example.bookRoom( roomsAvailableP );
    });
    $("#btnCancel").click( function () {
        example.cancelRoom( roomsAvailableP );
    });
    $("#btnType").click( function() {
        example.addRoomType( document.querySelector("#typeListP") );
    });
    $("#sisterBtn").click( function() {
        buildResortCard( cardContainer );
    });
}
// #endregion

// #region Resort Class
class Resort extends Hotel {
    #resortType;
    #beachFront;
    #kidsClub;

    constructor( name, city, rooms, booked, gym, resportType, beachFront, kidsClub ) {
        super( name, city, rooms, booked, gym );
        this.#resortType = resportType;
        this.#beachFront = beachFront;
        this.#kidsClub = kidsClub;
    }

    get resortType() { return this.#resortType }
    set resortType( r ) { this.#resortType = r; }

    get beachFront() { return this.#beachFront }
    set beachFront( b ) { this.#beachFront = b; }

    get kidsClub() { return this.#kidsClub }
    set kidsClub( k ) { this.#kidsClub = k; }
}
// #endregion

// #region Resort card build
resort = new Resort("El Paraiso Complejo", "Isla Palma", 9, 5, false, "Eco", true, false );
console.log( resort );

let resortNameAndLocation = `
    <h1>${resort.city} ${resort.resortType} Resort</h1>
    <h2><u>Resort Info</u></h2>
    <p>The <strong>${resort.locationName}</strong> is located in <strong>${example.city}</strong>.</p>`

let boolResortExtras = `    
    <p><Strong>Is it on a beach?</strong> ${resort.beachFront}</p>
    <p><Strong>Does it have a kids Club?</strong> ${resort.kidsClub}</p>`

let resortRoomsAvailable = `<p id="resortRoomsP">There are ${resort.booked} / ${resort.rooms} booked.</p>`;
let resortRoomAdjustBtns = `<div><button class="btn btn-primary" id="btnBookResort">Book Room</button>
    <button class="btn btn-danger" id="btnCancelResort">Cancel Room</button>
    `;
let sisterHotelBtn = `<div><button class="btn btn-success m-3 mt-0" id="sisterHotelBtn">See Our Sister Hotel</button></div>`

const buildResortCard = ( cardContainer ) => {
    cardContainer.html(`<div class="card m-3 p-3" id="resortCard"></div>`);
    $("#resortCard").append( resortNameAndLocation );
    $("#resortCard").append( boolResortExtras );
    $("#resortCard").append( resortRoomsAvailable );
    $("#resortCard").append( resortRoomAdjustBtns );
    $("#resortCard").append( endCard );
    $("#resortCard").after( sisterHotelBtn );

    $("#resortRoomsP").css("color", "green");
    let roomsAvailableP = document.querySelector("#resortRoomsP");
    $("#btnBookResort").click( function () {
        resort.bookRoom( roomsAvailableP );
    });
    $("#btnCancelResort").click( function () {
        resort.cancelRoom( roomsAvailableP );
    });
    $("#sisterHotelBtn").click( function() {
        buildHotelCard( cardContainer );
    });
}
// #endregion

$(document).ready( function() {
    let cardContainer = $("#mainCol");
    buildHotelCard( cardContainer );
});