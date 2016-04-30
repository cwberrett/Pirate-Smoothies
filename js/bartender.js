// function toTitleCase(string)
// {
//     // \u00C0-\u00ff for a happy Latin-1
//     return string.toLowerCase().replace(/_/g, ' ').replace(/\b([a-z\u00C0-\u00ff])/g, function (_, initial) {
//         return initial.toUpperCase();
//     }).replace(/(\s(?:de|a|o|e|da|do|em|ou|[\u00C0-\u00ff]))\b/ig, function (_, match) {
//         return match.toLowerCase();
//     });
// }
function genRandNum(min,max){
	return Math.floor(Math.random()*(max-min)+1);
}

//object to hold, track and restock ingridients
var pantry = function (ingredients){
	this.ingredients = ingredients;
};

//objects to reciever orders and make drinks
var bartender = function (questions, pantry) {
	this.questions = questions;
	this.pantry = pantry;
};

//object to store name combos and generate name
var nameGen = function (drink, adjectives, nouns) {
	this.drink=drink;
	this.adjectives=adjectives;
	this.nouns=nouns;
};

//method to generate name
nameGen.prototype.generateName = function(){
	var words = this.drink[0].split(" ");
	mainIngridient= words[words.length -1];
	var noun = this.nouns[genRandNum(0,4)];
	var adj = this. adjectives[genRandNum(0,4)];
	this.name =(adj + " " + mainIngridient + " " + noun);

};

//adds method to make drink based on preferences input
bartender.prototype.mix = function (preferences, pantry){
	var order = [];
	for (var i = 0; i < preferences.length; i++) {
		if (preferences[i]) {
			var num = genRandNum(1,3);
			order.push(pantry.ingredients[i][num]);
		}
		this.drink=order;
	}
};

//creates arrays for the types of drink ingridients
var strong = ["Glug of Rum", "Slug of Whisky", "Splash of Gin"];
var salty = ["Olive on a Stick", "Salt-dusted Rim", "Rasher of Bacon"];
var bitter = ["Shake of Bitters", "Splash of Tonic", "Twist of Lemon Peel"];
var sweet = ["Sugar Cube", "Spoonful of Honey", "Splash of Cola"];
var fruity = ["Slice of Orange", "Dash of Cassis", "Cherry on Top"];

//creates ingridients to go into the pantry
var fixins =[strong, salty, bitter, sweet, fruity];

//creates a new pantry with ingridients
var cupboard = new pantry (fixins);

//creates an array of questions for the bartender
var questions = ["Do ye like yer drinks strong?","Do ye like it with a salty tang?","Are ye a lubber who likes it bitter?","Would ye like a bit of sweetness with yer poison?","Are ye one for a fruity finish?"];

//creates a new bartender names joe and passes in the questions and pantry
var joe = new bartender(questions, cupboard);

// var preferences = [true, true, true, true, true];

// joe.mix(preferences, this.cupboard);
var adjectives = ["Barbaric", "Cursed", "Cutthroat", "Scurvy", "Treacherous"];
var nouns = ["Bilge Rat", "Sea Dog", "Marauder", "Treasure", "Cur"];

for (var item in joe.questions) {
	$("#order").append("<li id='quest'"+item+">"+joe.questions[item]+"</li><span><select id='sel"+item+"'><option value='aye'>Aye</option><option value='nay'>Nay</option></select></span>");
}

$(document).ready(function(){
	$(".result").hide();
	$("#place").click(function(){
		var answers = $("select").get();
		var preferences=[];
		for (var i = 0; i < answers.length; i++) {
			preferences[i]=false;
			if ($(answers[i]).val()=='aye'){
				preferences[i]=true;
			}
		}
		joe.mix(preferences, joe.pantry);
		console.log(joe);
		for (var i = 0; i < joe.drink.length; i++) {
			if(joe.drink[i]) {
				$("#drink").append("<li>"+joe.drink[i]+"</li>");
			}
		}
		namer = new nameGen(joe.drink, adjectives, nouns);
		namer.generateName();
		$("#name").text(namer.name);
		$(".options").hide();
		$(".result").show();
	});
	$("#newOrder").click(function(){
		$(".result").hide();
		$(".result ul li").remove();
		$(".options").show();
	});
});