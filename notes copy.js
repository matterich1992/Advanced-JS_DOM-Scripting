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
