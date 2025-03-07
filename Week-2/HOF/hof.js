// Higher order function -> THere are functions which take another function as arguments
// these are called higher order function

function f(x,fn){


    console.log(x)
    fn()
}

f(10,function exe(){
    console.log("i am an expression passed to a HOF")
})

arr=[1,10,9,100,1000,11,12,13,14,15,2,3] // unsorted array

arr.sort()  // it sorts the given array // [expections]-> this might arrange elements in inc order // default implementation of arr.sort()
// is going to sort my array in lexicographical order
/*
   0->a
   1->b
   2->c
   ...
   [B,BA]
*/

console.log(arr)