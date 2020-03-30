"use strict";

const MINNUMBER		=	  0;
const MAXNUMBER		=	 98;

var rn 				=	  0;	
var numGuesses		=	  0;
var guessedIt			=	true;

var $ = function(id) {
	return document.getElementById(id);
};

var processEntries = function()
{
	var guess = parseInt($("guess").value);
	
	$("guessStatus").value = "";
	
	if (guessedIt)
	{
		getNewNumber();	
	}

	if (isNaN(guess) || (guess < MINNUMBER) || (guess > MAXNUMBER))
	{
		$("guess").nextElementSibling.firstChild.nodeValue =
											"Invalid Guess.  Must Be 0 - 98";
		$("guess").value = "";
		$("guess").focus();
		guessedIt = false;
		return;
	}
	else
	{
		$("guess").nextElementSibling.firstChild.nodeValue = "";
		checkYourGuess(guess);	
	}
};

var checkYourGuess = function(g) {
	var retVal = "";
	
	numGuesses++;

	if (g < rn)
	{
		retVal = "Guess Of " + g + " Too Low.";
		guessedIt = false;
		$("guess").value = "";
		$("guess").focus();
	}
	else if (g > rn)
	{
		retVal = "Guess Of " + g + " Too High.";
		guessedIt = false;
		$("guess").value = "";
		$("guess").focus();
	}
	else if (g === rn)
	{
		retVal = "Correct Guess (" + g + ") in " + 
				numGuesses + " guesses";
		guessedIt = true;
	}
	
	$("guessStatus").value = retVal;
};

var resetTheForm = function() {
	$("guess").value 			= "";
	$("guessStatus").value	= "";
	$("guess").nextElementSibling.firstChild.nodeValue = "*";
	$("guess").focus();
};

var getNewNumber = function() {
	//	Generate a new random number
	resetTheForm();
	numGuesses = 0;
	rn = Math.floor(Math.random() * 100) + 1;
}

window.onload = function() {
	$("calculate").onclick = processEntries;	//	"Register" calculate button
	$("reset").onclick = resetTheForm;		//	"Register" reset button
	$("newNumber").onclick = getNewNumber;	//	"Register" new number button
	$("guess").focus();					//	Set focus to height text box
};