//create room object
class room {
	constructor(imgName, title, description, price) {
		this.imgName = `includes\\img\\${imgName}`;
		this.title = title;
		this.description = description;
		this.price = price;
	}
}

//create array of room instances
const roomArray = [
	new room("04-single.jpg", "Standard", "Single Room with a bed", 159),
	new room("04-double.jpg", "Double", "Double Room with a bed", 229),
	new room("04-penthouse.jpg", "Penthouse", "King Size Bed<br>Bar<br>Jacuzzi", 359)
]

//insert object data into html and assign to html of target div, 
//repeating for each instance in roomArray  
const cardDiv = document.querySelector("#cardCol");
let cardOutput = "";
for (i = 0; i < roomArray.length; i++) {
	cardOutput += `<div class="card m-3 d-flex flex-row">
					<div class="img-contain d-flex align-items-stretch">
						<img class="card-img-top card-img-bottom card-img imgCoverFit " src="${roomArray[i].imgName}"></img>
					</div>	
					<div class="card-body d-flex flex-column">
						<h2 class="card-title" id="">${roomArray[i].title}</h2>
						<hr class="w100">
						<p class="card-text" id="">${roomArray[i].description}</p>
						<p class="card-title h3" id="">$${roomArray[i].price}</p>
						<button id="roomBtn${i}" btnNum="${i}" class="btn btn-primary align-self-end">Book Room</button>
					</div>
				</div>`
}
cardDiv.innerHTML = cardOutput;

//Button click function
const alertPrice = (event) => { 
	let button = event.target;
	let buttonNumber = button.getAttribute("btnNum");
	let btnRoom = roomArray[buttonNumber]
	let price = btnRoom.price;

	alert(`Your room is ${price} per night`) 
};

//assign listeners to div holding buttons (instead of assigning to ea button; 
// event bubbling will allow each button to activate the event). it does error 
// (in console) on anything but a button, but eh. It doesn't break or show anything
cardDiv.addEventListener("click", alertPrice);

// get table from HTML; assign current first row values as HTML 
// contents as a blank slate - eliminates the tbody that 
// is automatically added
const rowCounTable = document.querySelector("#sampleTable");
let tableContent = `<tr><td>Row1 cell1</td><td>Row1 cell2</td></tr>`;
rowCounTable.innerHTML = tableContent;

// table button click function:
// add rows to the table when insert row button is clicked. 
// Handles row and cell numbering by incrementing when number needed (as needed)
// and setting the cell count to 0 at the start of the function
let tableRowCount = 1;
const addToTable = () => {

	let tableCellCount = 0;
	tableContent += `<tr><td>Row${++tableRowCount} cell${++tableCellCount}
						</td>
						<td>Row${tableRowCount} cell${++tableCellCount}</td></tr>`;
	rowCounTable.innerHTML = tableContent;
};

// get button and assign event handler
const tableButton = document.querySelector("#myButton");

tableButton.addEventListener("click", addToTable);






