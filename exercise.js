
// write out arg
function log(arg) {
	document.writeln(arg);
}

// identity function
function identity(x) {
	return x;
}

// add two numbers
function add(a, b) {
	return +a + +b; 
}

// subtract two numbers
function sub(a, b) {
	return +a - +b;
}

// multiply two numbers
function mul(a, b) {
	return +a * +b;
}

// function that returns a function that returns its argument
function identityf(func) {
	return function() {
		return func;
	};
}

// funciton that adds from two invocations
function addf(a) {
	return function(b) {
		return +a + +b;
	};
}

// function that takes a binary function and makes it callable with two invocation
function liftf(f) {
	return function(a) {
		return function(b) {
			return f(a,b);
		};
	};
}

// take a function an argument, return function that adds second argument
function curry(f, a) {
	return function(b) {
		return f(a, b);
	};
}

//log(identity(3));
//log(add(3,4));
//log(sub(3,4));
//log(mul(3,4));

//var idf3 = identityf(3);
//log(idf3());

//log( addf(3)(4) );

//var addf = liftf(add);
//log( addf(3)(4) ); 			// 7
//log( liftf(mul)(5)(6) ); 		// 30 

//var add3 = curry(add, 3);
//log( add3(4) ); 				//7
//log( curry(mul,5)(6) ); 		//30

var inc_1 = curry(add,1);
var inc_2 = liftf(add)(1);
var inc_3 = addf(1);

log( inc_1(5) );    	//6
log( inc_1(inc_1(5)) );   //7

log( inc_2(5) );    	//6
log( inc_2(inc_2(5)) );   //7

log( inc_3(5) );    	//6
log( inc_3(inc_3(5)) );   //7
