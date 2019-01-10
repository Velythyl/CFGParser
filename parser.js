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

var seek = function(word, in) {

}

var parseIt = function(category, word) {  //retourne category courante (premiere sans <>)
    var nextCat = "";

    if(typeof category == "string") {       //traite apres ce grand if


    }

    if(typeof category == "object") {   //json
        if(category.hasOwnProperty("word")) {
            return category[word];
        } else {
            for(var k in category) {

            }


        }
    }

    if(word == category.split(" ")[0])


}

//https://stackoverflow.com/questions/5613834/convert-string-to-variable-name-in-javascript

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

var indexArray = null; // initialise plus bas
var abstractFinder = new RegExp("┫(.*?)┣");
var parse = function(cats, text, areaNum) {
    cats = cats.split(" "); // forme "┫paren_expr┣ ┫stat┣"

    for(cat in cats) {
        save = indexArray[areaNum];

        if(cat == text[parseIndex]) {
            incrementIndexArray(areaNum);
            return;
        } else if(abstractFinder.test(cat)) {
            var catvar = window[cat];

            if(typeof catvar == "string") {       //traite apres ce grand if
                parse(catvar, text, areaNum);

            } else if(typeof catvar == "object") {   //json
                if(catvar.hasOwnProperty("word")) {
                    incrementIndexArray(areaNum);
                    parse(catvar[word], text, areaNum);
                } else {
                    for(var key in catvar) {
                        if(abstractFinder.test(key)) {
                            parse(key, text, areaNum);
                            parse(catvar[key], text, areaNum);
                        }
                    }
                }

            } else if(Array.isArray(catvar)) {
                for(subcat in catvar) {
                    parse(subcat, key, areaNum);
                }
            }

        } else if (cat[0] == '┅') {
            if(specialParse(cat.substring(1), word)) {
                incrementIndexArray(areaNum);
            }
        }

        //si pas bon...
        if(save == indexArray[areaNum]) throw "An error has occured.";
    }
}

var parser = function() {
    var text = this.value
    if(text[text.length-1] == '┫' || text[text.length-1] == '┣' || text[text.length-1] == '┅') {
        this.value = text.substr(0, text.length-1);
        return;
    }

    var areaid = this.getAttribute('id');
    var suggbox = document.getElementById("sugg"+areaid[areaid.length -1]);

    text = text.split(" ")
    var last = text.pop()

    var category = ┫stat┣;
    try{
        for(var i = 0; i < text.length; i++) {
            parseIt(┫stat┣, text[i])
        }
    } catch(e) {

    }

    suggbox.innerHTML = keyArray;
}

var parseAreas = document.getElementsByClassName("parse-area");
indexArray = Array(parseAreas.length);
for(var i = 0; i < parseAreas.length; i++) {
    indexArray[i] = 0;
    parseAreas[i].addEventListener("input", parser, false);
}

//
