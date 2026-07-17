//=========================
//middle of range (div.nums)
//=========================

//get user input numbers & convert to float
let num1 = parseFloat( prompt("Please enter a number (1 of 3)") );
let num2 = parseFloat( prompt("Please enter a number (2 of 3)") );
let num3 = parseFloat( prompt("Please enter a number (3 of 3)") );

//determine middle value
let midNum;
if (num1 <= num2 && num1 >= num3 || num1 >= num2 && num1 <= num3) { midNum = num1; }
else if (num2 <= num1 && num2 >= num3 || num2 >= num1 && num2 <= num3) { midNum = num2; }
else if (num3 <= num1 && num3 >= num2 || num3 >= num1 && num3 <= num2) { midNum = num3; }
else { midNum = "problem"; }

//get DOM obj and assign new HTML content
const numsDiv = document.querySelector(".nums");
numsDiv.innerHTML = "<p>The middle number of (" + 
					num1 + ", " + num2 + ", " + 
					num3 + ") is: " + midNum + "</p>";

//assign new class to prev DOM obj; change styling on content
if (midNum % 2 == 0) { numsDiv.classList.add("alert-light"); }
else { numsDiv.classList.add("alert-danger"); }

//=========================
//grade (div.grade)
//=========================

//get user input percentage number & convert to float
let percent = prompt("Please enter a percentage, from 0 to 100");
	percent = parseFloat( percent );

let letterGrade; //create variable for DOM obj & later value assignment

//get DOM obj & assign new HTML content
const gradeDiv = document.querySelector(".grade");
gradeDiv.innerHTML = "<p>The letter grade for " + 
						percent + "% is: <b><span class=\"letterGrade\">" + 
						letterGrade + "</span></b></p>";

//determine styling of DOM obj and value of letterGrade on user percent number
if (percent <= 100 && percent >= 0 ) {
	if ( percent <= 49 ) { 
		letterGrade = "F"; 
		gradeDiv.classList.add("alert-danger");
	} else if ( percent <= 64 ) { 
		letterGrade = "D"; 
		gradeDiv.classList.add("alert-dark"); 
	} else if ( percent <= 79 ) { 
		letterGrade = "C"; 
		gradeDiv.classList.add("alert-warning");
	} else if ( percent <= 89 ) { 
		letterGrade = "B"; 
		gradeDiv.classList.add("alert-primary");
	} else if ( percent <= 100 ) { 
		letterGrade = "A"; 
		gradeDiv.classList.add("alert-success"); 
	} else { 
		gradeDiv.innerHTML = "<p>???</p>";
		gradeDiv.classList.add("alert-danger");
	}
} else {
	gradeDiv.innerHTML = "<p>Incorrect - not between 0-100</p>";
	gradeDiv.classList.add("alert-danger");
}

//get DOM obj containing letterGrade class - holding same variable
//assign value of letterGrade to text of DOM obj
document.querySelector(".letterGrade").innerText = letterGrade;

//Part 2
//=========================
//iteration (div.iterPound)
//=========================

//create variable & contents for output 'iterOut'
let iterOut = "";
for (let i = 1 ; i <= 5 ; i++) {
	for (let j = 1 ; j <= i ; j++) {
		iterOut += "# ";
	}
	iterOut += "\n";
}
for (let i = 4 ; i > 0 ; i--) {
	for (let j = 1 ; j <= i ; j++) {
		iterOut += "# ";
	}
	iterOut += "\n";
}

//get DOM obj and assign text of 'iterOut' contents
const iterDiv = document.querySelector(".iterPound");
iterDiv.innerText = iterOut;

//=========================
//conditional (form)
//=========================

//get DOM objs and assign to constants for further use
const aSpeedInput = document.querySelector("#alexaSpeed");
const sSpeedInput = document.querySelector("#siriSpeed");
const aSpeedNum = document.querySelector(".aSpeedP");
const sSpeedNum = document.querySelector(".sSpeedP");
const nameWinnerP = document.querySelector(".nameWinner");

//get user input numbers
let aSpeed = prompt("How many seconds did Alexa take?");
let sSpeed = prompt("How many seconds did Siri take?");

//assign value of '_Speed' vars to relevant DOM object properties
	//DOM text obj = DOM input obj = variable
aSpeedNum.innerText = aSpeedInput.value = aSpeed;
sSpeedNum.innerText = sSpeedInput.value = sSpeed;

//assign text of 'winner' DOM obj, and styles based on speed values
if (aSpeed > sSpeed) { 
	nameWinnerP.innerText = "Alexa"; 
	nameWinnerP.className += " text-danger"; 
	aSpeedNum.className += " text-danger";
	sSpeedNum.className += " text-primary";
	}
else if (aSpeed < sSpeed) { 
	nameWinnerP.innerText = "Siri"; 
	nameWinnerP.className += " text-danger"; 
	sSpeedNum.className += " text-danger";
	aSpeedNum.className += " text-primary";
	}
else { 
	//alternate text of entire winner line for ties, no color styling applied
	document.querySelector("#winnerLine").innerHTML = "<b>Tie!</b>";
}