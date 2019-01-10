var session = window.pl.create();

var globalSuggbox = null;
var parsed = session.consult("\
% load lists module\
	:- use_module(library(lists)).\
	\
	% fruit/1\
	fruit(apple). fruit(pear). fruit(banana).\
\
	% fruits_in/2\
	fruits_in(Xs, X) :- member(X, Xs), fruit(X).\
"); // true

var suggCallback = function(answer) {
	//globalSuggbox.innerHTML += pl.format_answer( answer );
	console.log(pl.format_answer( answer ));
}

var parser = function() {
    var text = this.value

    var areaid = this.getAttribute('id');
    var areaNum = areaid[areaid.length -1];
    var suggbox = document.getElementById("sugg"+areaNum);

    text = text.split(" ")
    var last = text.pop()

    var test = session.query("fruits_in([carrot, apple, banana, broccoli], X).");

	var answer = true;
	globalSuggbox = suggbox;
	var suggCallback = console.log;
	while(answer) {
		session.answer( suggCallback );
	}


    //on a le chemin vers le dernier truc, celui qu'on est en train de faire des suggestions pour ici.

    suggbox.innerHTML = keyArray;
}

var parseAreas = document.getElementsByClassName("parse-area");
indexArray = Array(parseAreas.length);
for(var i = 0; i < parseAreas.length; i++) {
    indexArray[i] = 0;
    parseAreas[i].addEventListener("input", parser, false);
}

//
