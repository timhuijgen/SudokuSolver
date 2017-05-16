global.getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

global.invert = function (hexnum){
    if(hexnum.length != 6) {
        console.error("Hex color must be six hex numbers in length.");
        return false;
    }

    hexnum = hexnum.toUpperCase();
    var splitnum = hexnum.split("");
    var resultnum = "";
    var simplenum = "FEDCBA9876".split("");
    var complexnum = new Array();
    complexnum.A = "5";
    complexnum.B = "4";
    complexnum.C = "3";
    complexnum.D = "2";
    complexnum.E = "1";
    complexnum.F = "0";

    for(var i = 0; i < 6; i++){
        if(!isNaN(splitnum[i])) {
            resultnum += simplenum[splitnum[i]];
        } else if(complexnum[splitnum[i]]){
            resultnum += complexnum[splitnum[i]];
        } else {
            console.error("Hex colors must only include hex numbers 0-9, and A-F");
            return false;
        }
    }

    return resultnum;
};

Array.prototype.sum = function() {
    return this.reduce(function(a, b) { return a + b; }, 0);
};

Array.prototype.hasDuplicates = function() {
    var valuesSoFar = [];
    for (var i = 0; i < this.length; ++i) {
        var value = this[i];
        if (valuesSoFar.indexOf(value) !== -1) {
            return true;
        }
        valuesSoFar.push(value);
    }
    return false;
};

global.minMargin = function(amount) {
    return (amount * (amount + 1) / 2);
};

global.numBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

global.uniqueValue = function (nums, min, max = 9) {
    let num = min;
    while(nums.indexOf(num) !== -1) {
        num++;
    }

    if(num > max || num > 9) return false;

    return num;
};