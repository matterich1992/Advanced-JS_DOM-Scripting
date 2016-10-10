//Counter example for i
//Demonstration of Closure

var counter = function(){
	var count = 0;
	return function(){
		return ++count;
	}
};

var c1 = counter();
c1();
c1();

var c2 = counter();
c2();

//Other counter Example understanding IIFE and utilization

var a = {};

for(var i =0;i<3;i++){
	a[i] = function(){
		return i;
	};
}

a[0]();
a[1]();
a[2]();

// This is wrong --> 3 will be alerted 3 times

var a = {}; // In this instance j gets it'sown copy of i
for(var i=0;i<3;i+){
	(function(j){
		a[j] = function(){
			alert(j);
		}
	})(i);
}

a[0]();
a[1]();
a[2]();

// Practice Example//

make = {};

var tags = ["a","div","span","form","h1","h2","h3", "h4"];

for(var i = 0;i<tags.length;i++){
	(function(tag){
		make[tag] = function(){
			return document.createElement(tag);
		}
	})(tags[i]);
}

// alternate

tags.forEach(function(tag){
	make[tag] = function(){
		return document.createElement(tag);
	};
});

//////////////////// Looking at the 'this' keyword///////////////////
//CONTEXT

var dog = {
	barCount: 0,
	bark: function(){
		this.barCount++;
	}
}

dog.bark();
//this will point to the 'dog' object

// Alternate Ex:

var dog = {
	barkCount: 0,
	bark: function(){
		return this.barkCount++;
	}
}

var bark = dog.bark();
// this will actually point to the 'window' obejct


var Person = function(name){
	this.name = name;

}

var p = new Person("Matt Erich");
// this will now point to the 'p';
// the instance of a person


var dog = {
	barkCount: 0,
	bark: function(barks){
		this.barkCount+=barks;
	}
},

cat = {
	barkCount:0
}


dog.bark.call(cat,1);
// 'this' will be cat --> Object becomes cat with a barkCount of 1. 


/*
1. dot call '.' Ex: dog.bark ---> left side of the dot is the object that becomes 'this'
2.'new' keyword: var puppy= new Dog --> 'puppy' will be the context(new Object)
3. call/apply --> Dog.bark.call(puppy,1) --> yu decide the context with the first arg to call
	apply is the same accept after the context it is the array of args
4. if no rule is applied then by default 'this' will become the window
*/



// call and apply Examples...
// call takes arguments
//apply takes an array of arguments
 var dog = {
 	bark: function(count){

 	}
 }

 dog.bark.call(cat,1);
 dog.bark.call(cat,[1]);


 //the Dot Operator

 var foo = {}; // same as new Object;
 foo.toString();
 
// functions have prototypes and Objects have protos


/////////////////////////Exrecise Two///////////////////////////
// reimplement the dot function

var Person = function(name){
	this.name = name;
} 

Person.prototype.isPerson = true;

var person = new Person('Smith');

DOT(person,'name');  // person.name
DOT(person, 'isPerson'); // person.isPerson

// proto is already on all objects just like any other property but the dot operator automatically traverses 
var DOT = function(obj,prop){
	if(obj.hasOwnProperty(prop)){
		return obj[prop]; // will return person and name
	} else if(obj.__proto__) {
		return DOT(obj.__proto__, prop); // will keep looking up the prototype chain
	}

};

var Person = function(name){
	this.name = name;
} 

Person.prototype.speak = function(){
	console.log('Hello! ' + this.name);
}

var person = new Person('Smith');

//Test was DOTCALL(person, 'speak', []);
//person.speak();

var DOTCALL = function(obj, prop, args){
	var fn = DOT(obj.prop);
	if(fn){
	return  fn.apply(obj,args);
	}
};

///////////////Prototypal Inheritance///////////////////

var Animal = function(){
	this.offspring  =[];
}
Dog = function(){}

Dog.prototype = new Animal();
var dog1 = new Dog();
var dog2 = new Dog();
var pup = new Dog();

dog1.offspring.push(pup);
dog2.offspring;


 var Animal = function(name){
 	this.name = name;
 }

Animal.prototype.eats = function(){
	return this.name + " is eating!"
}

var sponge = new Animal('Bob');

/// More complex-- adding
//Mammal -- has hair --- Chordate-- has spine --- Animal -- eats

var Animal = function(name){
	this.name = name;
}

Animal.prototype.eats = function(){
	return this.name + ' is eating!';
}

var Chordate = function(name){
	return this.name = name;
}
/*	var Chordate = function(name){
	return Animal.call(this,name);
}
Chordate.prototype = new Animal();
Chordate.prototype.hasSpine = true;


*/
Chordate.prototype = new Animal();
Chordate.prototype.hasSpine = true;


Mammal = function(name){
	return this.name = name;
}
/*
var Mammal = function(name){
	Chordate.call(this,name);
}
Mammal.prototype = new Chordate();
Mammal.prototype.hasHair = true;

*/

Mammal.prototype = new Chordate();
Mammal.prototype.hasHair = true;


var m = new Mammal('dog');

////////////////////

Animal = function(){
 this.offspring = [];
}

var Dog = function(){};
 Dog.prototype = new Animal();

var dog1 = new Dog();
var dog2 = new Dog();
var pup = new Dog();


dog1.offspring.push(pup);
dog2.offspring;// will have pup;

/////Summary

var Dog = function(){};
var pup = new Dog();


////////////Object.create/////////////
// Is slower when using this?

var Animal = {
init: function(name){
	return this.name = name;
},
eats: function(){
	return this.name + ' is eating';
 }
}

var Chordate = Object.create(Animal,{
hasSpine: {value: true;}
});

var Mammal = Object.create(Chordate, {
	hasHair: {value: true}
});

var m = Object.create(Mammal);

m.init('dog');



