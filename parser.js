/*for( var area of document.getElementsByClassName("parse-area")) {
    area.addEventListener('input', function() {
        areaid = area.getAttribute('id');
        suggbox = document.getElementById("sugg1");
        suggbox.innerHTML = areaid;
    });
}*/

var ┫stat┣ = {
                "break" : "┅id",
                "if" : ["┫paren_expr┣ ┫stat┣", "┫paren_expr┣ ┫stat┣ else ┫stat┣"]
            }

var ┫paren_expr┣ = "(┫expr┣)";

var ┫expr┣ = ["┫test┣", "┅id = ┫expr┣"];

var ┫test┣ = "┫sum┣"

var ┫sum┣ = "┫mult┣"

var ┫mult┣ = "┫term┣"

var ┫term┣ = "┅int"

var closestMatch = function() {

}



var specialParse = function(type, word) {
    switch (type) {
        case "id":
            return /./.test(word);
        case "int":
            return /^\d+$/.test(word);
    }
}

var incrementIndexArray = function(areaNum) {
    indexArray[areaNum]++;
}

var safeParse = function(cats, text, areaNum) {
    try{
        return parse(cats, text, areaNum);
    }catch(e) {
        return null;
    }
}

//ca, qui ne laisse pas avoir de la recursion, que est complique, etc, ou juste au fur et a mesure matcher les trucs et avoir un array des cat qui ont ete choisies? mais ne permet pas d'effacer plus que le dernier truc pas encore complete...


var indexArray = null; // initialise plus bas
var abstractFinder = new RegExp("┫(.*?)┣");
var parse = function(cats, text, areaNum) {
    endCats = []

    cats = cats.split(" "); // forme "┫paren_expr┣ ┫stat┣"

    for(cat in cats) {
        save = indexArray[areaNum];

        if(cat == text[indexArray[areaNum]]) {
            incrementIndexArray(areaNum);
            endCats.push(cat);
        } else if(abstractFinder.test(cat)) {
            var catvar = window[cat];   //https://stackoverflow.com/questions/5613834/convert-string-to-variable-name-in-javascript

            if(typeof catvar == "string") {       //traite apres ce grand if
                endCats.push(safeParse(catvar, text, areaNum));

            } else if(typeof catvar == "object") {   //json
                if(catvar.hasOwnProperty(text[indexArray[areaNum]])) {
                    incrementIndexArray(areaNum);
                    endCats.push(text[indexArray[areaNum]])

                    endCats.push(safeParse(catvar[text[indexArray[areaNum]]], text, areaNum));
                } else {
                    for(var key in catvar) {
                        if(abstractFinder.test(key)) {
                            endCats.push(safeParse(key, text, areaNum));
                            endCats.push(safeParse(catvar[key], text, areaNum));
                        }
                    }
                }

            } else if(Array.isArray(catvar)) {
                for(subcat in catvar) {
                    endCats.push(safeParse(subcat, key, areaNum));
                }
            }

        } else if (cat[0] == '┅') {
            if(specialParse(cat.substring(1), word)) {
                endCats.push(cat.substring(1));
                incrementIndexArray(areaNum);
            }
        }

        //si pas bon...
        if(save == indexArray[areaNum]) throw "An error has occured.";
    }

    return endCats;
}

var parser = function() {
    var text = this.value
    if(text[text.length-1] == '┫' || text[text.length-1] == '┣' || text[text.length-1] == '┅') {
        this.value = text.substr(0, text.length-1);
        return;
    }

    var areaid = this.getAttribute('id');
    var areaNum = areaid[areaid.length -1];
    var suggbox = document.getElementById("sugg"+areaNum);

    text = text.split(" ")
    var last = text.pop()

    var category = ┫stat┣;
    try{
        cats = parse("┫stat┣", text, areaNum);
    } catch(e) {}
    if(indexArray[areaNum] !== text.length) //marche pas...

    cats = cats.filter(function (el) {  //https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
        return el != null;
    });

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
