// 05 Context
DOT = function(obj, prop){

}

// 05 Context
DOTCALL = function(obj, prop, args){

}

// 06 Prototypes
NEW = function(constructor, args){
	//creates a new object
	// set __= objects __proto_- to constructor prototype
	// invoke constructor
	//return new object
	var o = {};
	o.__proto__ = constructor.prototype;
	var returnValue = cosntructor.apply(o,args);
	return o;
}

INSTANCEOF = function(obj, constructor){
	if(obj.__proto__===constructor.prototype){
		return true;
	} else if(obj.__proto__){
		return INSTANCEOF(obj.__proto__, constructor);
	} else {
		return false;
	}
};