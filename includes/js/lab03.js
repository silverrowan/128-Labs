//=========================
// #region Count letter in string
//=========================

const letterCount = (string, chara) => {
	let count = 0;
	for ( i = 0 ; i < string.length; i++ ) {
		//convert all to uppercase to make the count case insensitive
		string = string.toUpperCase();
		chara = chara.toUpperCase();
		//check each character in the string and compare to the count character
		if (string.charAt( i ) == chara ) { count++; }
	}
	return count;
}

let output = '';
//functionize the tests for letterCount and append to the 'output' variable
const displayCountTest = (string, chara) => {
	output += "<p>The string is: " + string + 
		"</p><p>The letter " + chara + " appears " + 
		letterCount(string, chara) + " times.</p><br>"
	return output;
}

//Test lettercount preforms as expected & append to output via 'display...' function
displayCountTest("This is a string", "i");
displayCountTest('Some other test with lots of "O"s', "o");
displayCountTest("This is a test string that should count 0", "y");

//Get the target div and assign the output to it
stringCountDiv = document.querySelector("#stringCountTests");
stringCountDiv.innerHTML = output;
// #endregion

//=========================
// #region Date Functions - Console
//=========================

//Trialing different date formatting functions
let labDay = new Date(2022, 2, 1);
console.log("labDay is " + labDay );
console.log( labDay.toDateString() );
console.log( labDay.toTimeString() );
console.log("labDay as UTC is " + labDay.getTime() );
console.log(labDay.getDate() + " / " + labDay.getMonth() + " / " + labDay.getFullYear() );
console.log(labDay.getHours() + " : " + labDay.getMinutes() );
console.log("-------------------------------");

//Trialing different date functions
let now = Date.now();
console.log( "now: " + now );

let errorDate = new Date(2016, 33, 1);
console.log( errorDate );

let invalidDate = new Date("Funuary 3, 2018");
console.log( invalidDate );

let options = { weekday: 'long' , year: 'numeric', month: 'long', day: 'numeric' };
console.log( labDay.toLocaleString('de-DE', options) );

//preforming calculation on date
let msDay = 24 * 60 * 60 * 1000; //milliseconds per day, from hours/day x min/hr x s/min x ms/s
let mslabDay = now;
labDay = new Date( mslabDay + msDay );
console.log(labDay);
console.log("-------------------------------");
// #endregion

//=========================
// #region Date Functions - Payroll
//=========================

//provided - get number of days in specified month
function daysInMonth (year, month) { // use 1 for Jan, 2 for Feb, etc
	return new Date(year, month, 0).getDate();
}

//get number of work days in specified month
function workDaysInMonth (year, month) {
	let allDaysInMonth = daysInMonth(year, month-1);
	let workDays = 0;
	for ( let i = 1 ; i <= allDaysInMonth ; i++ ) {
		//for every day from 1st to last:
			//get the day number and 
		let day = new Date(year, month, i).getDay();
			// compare to valid numbers for weekdays; 
			// if its a valid weekday, add one to workDays counter
		switch (day) {
			case 1: 
			case 2: 
			case 3: 
			case 4: 
			case 5:
				workDays += 1
				break;
		}
	}
	return workDays;
}

//calculate monthly payout and return html formatted output:
//exact payout for 1 month, given month, year (ignore holidays). 
//Ask for hourly wage from userAgent, pass in month and year
//Display Month, Year, Number of Weekdays, hourly pay, and monthly pay
const calculatePayout = (year, month) => {
	//request user input on hourly wage
	perHourWage = parseFloat(prompt("What is the employee's hourly pay?"));
	
	//array to transform month number into month name
	let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	
	let workDayHours = 7.5; //given value
	let workDaysInMonthCount = workDaysInMonth(year, month);
	monthPay = perHourWage * workDayHours * workDaysInMonthCount;
	
	// create new 'output' variable
	let output = "<p>"
	// append following contents to output variable
		output += "Month: " + monthArray[month] + "<br>";
		output += "Year: " + year + "<br>";
		output += "Weekdays: " + workDaysInMonthCount + "<br>";
		output += "Salary: $" + perHourWage.toFixed(2) + "<br>";
		output += "Pay: $" + monthPay.toFixed(2) + "<br>";
		output += "</p>";
	return output;
}

//get month and year from user instead of hard-coding it in
let monthNo = prompt("What is the month number? (use 1-12 as normal numbering)") - 1;
let year = prompt("what is the year?");

//find the html div to put the output into, and call the calcPay Function
const dateFunctionsDiv = document.querySelector("#dateFunctions");
dateFunctionsDiv.innerHTML = calculatePayout(year, monthNo);
// #endregion

//=========================
// #region Error Handling
//=========================

const calcFutureValue = (principle, rate, years) => {
	//throw errors for disallowed values
	if ( principle <= 0 ) { throw new Error("Principle value must be greater than zero"); }
	else if ( rate <= 0 ) { throw new Error("Rate value must be greater than zero"); }
	else if ( years <= 0 ) { throw new Error("Years value must be greater than zero"); }
	
	//transform annual variables into monthly variables
	let monthlyRate = rate / (12 * 100);
	let months = years * 12;
	//set futureValue to value of principe (future value at 0 time passed)
	let futureValue = 0;
	
	// for each month, multiply the (future value + principle) * ( 1 + monthly rate) to 
	// find the total of the monthly increase added to the existing amount including deposits
	for ( let i = 0 ; i < months ; i++) {
		futureValue = (futureValue + principle) * ( 1 + monthlyRate );
	}
	
	//return the value rounded to the nearest cent
	return futureValue.toFixed(2);
}

//setting initial test values of parameters
let investment = 10;
let annualRate = 4;
let years = 5; 

//use try/catch to handle (log) errors thrown by dissalowed values for parameters
//otherwise, run calcFutureValue()
const tryCalcFutValue = ( investment, annualRate, years ) => {
    try {
        futureValue = calcFutureValue( investment, annualRate, years ) ;
        return futureValue;
    } catch(error) {
        console.log( error );
        return error;
    }
}

// Get target div and
const futureValueDiv = document.querySelector("#futureValueCalc");
//set the HTML conts of the div to a string and test 1 result
futureValueDiv.innerHTML = `<p>The future value is: ${tryCalcFutValue(investment, annualRate, years)}</p>`;//665.2
//append next two tests to the same div
futureValueDiv.innerHTML += `<p>The future value is: ${tryCalcFutValue(100, 5,5)}</p>`;//6828.94
futureValueDiv.innerHTML += `<p>The future value is: ${tryCalcFutValue(0,4,5)}</p>`;