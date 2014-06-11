// Exercises from Effective JavaScript by Doug Crockford
// from class taught June 10-12, 2014

// write out arg
function log(arg) {
	if (typeof(document) != "undefined") {
		document.writeln(arg);
	} else {
		console.log(arg);
	}
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

// return a unary function that invokes a binary function with its arg passed twice
function twice(f) {
	return function(a) {
		return f(a,a);
	};
}

// reverse the args of a binary function
function reverse(f) {
	return function(a,b) {
		return f(b,a);
	};
}

// compose two unary functions
function composeu(fa, fb) {
	return function(a) {
		return fb(fa(a));
	};
}

// invoke two binary functions
function composeb(f, g) {
	return function(a, b, c) {
		return g( f(a, b), c);
	};
}

// invoke a binary function exactly once
function once(f) {
	var called = false;
	return function(a,b) {
		if (! called) {
			called = true;
			return f(a,b);
		}
		return undefined;
	};
}

// generator that produces values in a range
function fromTo(from, to) {
	return function() {
		var answer = from;
		if (answer < to) {
			from += 1;
			return answer;
		} else {
			return undefined;
		}
	};
}

// generator that uses generator to return elements from an array
function element(arr, ixfn) {
	if (ixfn === undefined) {
		ixfn = fromTo(0, arr.length);
	}
	return function() {
		return arr[ixfn()];
	};
}

// take a generator and an array, return function that collects what is generated into the array
function collect(gen, arr) {
	return function() {
		var ele = gen();
		if (ele !== undefined) {
			arr.push(ele);
		}
		return ele;
	};
}

// filter a generator
function filter(gen, pred) {
	return function() {
		do {
			var value = gen();
		} while (value !== undefined && !pred(value));
		return value;
	};
}

// concatenation two generators
function concat(gena, genb) {
	return function() {
		var value = gena();
		if (value === undefined) {
			value = genb();
		}
		return value;
	};
}

// construct an object
function counter(value) {
	return {
      next: function() {
    	value += 1;
        return value;
      },
      prev: function() {
    	value -= 1;
        return value;
      }
	};
}

// make a revocable function wrapper
function revocable(func) {
	var callable = true;
	return {
		invoke : function(a) {
			if (callable) {
				return func(a);
			}
			return undefined;
		},
		revoke : function() {
			callable = false;
		}
	};
}

// symbol generator
function gensymf(root) {
	var r = String(root),
	    i = 0;
	return function() {
		i += 1;
		return r + i;
	};
}

// a factory to make a symbol generator
function gensymff(func, seed) {
	return function(root) {
		var i = seed,
			r = String(root);
			return function() {
				i = func(i);
				return r + i;
			};
	};
}

// finaonacci sequence generator
function fibonaccif(a, b) {
	var x = undefined, 
	    y = undefined;
	return function() {
		if (x === undefined) {
			x = a;
			return x;
		} 
		if (y == undefined) {
			y = b;
			return y;
		}
		var value = x + y;
		x = y;
		y = value;
		return value;
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

var inc = curry(add,1);
//var inc_1 = curry(add,1);
//var inc_2 = liftf(add)(1);
//var inc_3 = addf(1);
 
//log( inc_1(5) );    	//6
//log( inc_1(inc_1(5)) );   //7
 
//log( inc_2(5) );    	//6
//log( inc_2(inc_2(5)) );   //7
 
//log( inc_3(5) );    	//6
//log( inc_3(inc_3(5)) );   //7

// log( add(11,11) );  	//22
var doubl = twice(add);
// log( doubl(11) );   	//22
var square = twice(mul);
// log( square(11) ); 		//121

// var bus = reverse(sub);
// log( bus(3,2) );  // -1

//log( composeu(doubl, square)(5) ); // 100

//log( composeb(add, mul)(2, 3, 7) ); // 35

// var add_once = once(add);
// log ( add_once(3,4) ); //7
// log ( add_once(3,5) ); //undefined

// var index = fromTo(0, 3);
// log( index() );  //0
// log( index() );  //1
// log( index() );  //2
// log( index() );  //undefined
//
//var ele = element(['a', 'b', 'c', 'd'], fromTo(1,3));
//log( ele() );  //b
//log( ele() );  //c
//log( ele() );  //undefined
//
//var elf = element(['a', 'b', 'c', 'd']);
//log( elf() );  //a
//log( elf() );  //b
//log( elf() );  //c
//log( elf() );  //d
//log( elf() );  //undefined

//var array = [],
//    col = collect(fromTo(5,7), array);
//log( col() ); //5
//log( col() ); //g
//log( col() ); //undefined
//log( array ); // [5,6]

//var fil = filter(fromTo(0,5),
//		function third(value) {
//			return (value % 3) === 0;
//		});
//log( fil() );  // 0
//log( fil() );  // 3
//log( fil() );  // undefined
//
//var con = concat(fromTo(0,3), fromTo(0,2));
//log( con() );  // 0
//log( con() );  // 1
//log( con() );  // 2
//log( con() );  // 0
//log( con() );  // 1
//log( con() );  // undefined

//var object = counter(10),
//	next = object.next,
//	prev = object.prev;
//log ( next() ); // 11
//log ( prev() ); // 10
//log ( prev() ); //  9
//log ( next() ); // 10

//var rev = revocable(identity),
//	invoke = rev.invoke;
//log( invoke(7) ); //7
//rev.revoke();
//log( invoke(8) ); //undefined

//var geng = gensymf("G"),
//    genh = gensymf("H");
//log( geng() ); // "G1" 
//log( genh() ); // "H1"
//log( geng() ); // "G2"
//log( genh() ); // "H2"

//var gensymf = gensymff(inc, 0),
//	geng = gensymf("G"),
//	genh = gensymf("H");
//log( geng() ); // "G1" 
//log( genh() ); // "H1"
//log( geng() ); // "G2"
//log( genh() ); // "H2"

var fib = fibonaccif(0,1);
log( fib() ); // 0
log( fib() ); // 1
log( fib() ); // 1
log( fib() ); // 2
log( fib() ); // 3
log( fib() ); // 5
