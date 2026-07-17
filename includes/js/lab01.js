document.getElementById("hello").innerHTML = "Hello, how many rooms do you want to book?";

let userName = prompt("What is your name?");
alert("Hello, " + userName + ". Nice to meet you again.");

let amount = prompt("What is the cost of the rooms?",100);
amount = parseFloat( amount );
let taxrate = prompt("What is the tax rate?", 14);
taxrate = parseInt( taxrate );
let numRooms = prompt("How many rooms will you book?", 2);
numRooms = parseInt( numRooms );

let amountTD = document.getElementById("roomAmount");
let taxrateTD = document.getElementById("roomTax");
let numRoomsTD = document.getElementById("roomNum");
let totalTD = document.getElementById("roomTotal");

console.log("finished all gets");

amountTD.innerText = "$" + amount.toFixed(2);
taxrateTD.innerText = taxrate + "%";
numRoomsTD.innerHTML = numRooms;
total = ( amount + amount * taxrate / 100 ) * numRooms;
totalTD.innerHTML = "$" + total.toFixed(2);