/*
 array are also custom objects in js
 index of the elements is the key and the elements it self is the value
 ["abc","def","ghi"]-> {0:"abc",1:"def",2->"ghi"}

*/

/**
 * Map Function
 * map is a higher order function avilable with arrays
 * it take functions as an argruments - f
 * it returns an array in which every value is actually populated by calling
 * function f with original array elements as argument
 * 
 */

function square(el){
    return el*el
}

arr=[1,2,3,4]
let ans=arr.map(square)
console.log(ans)

/**
 *  when to use maps ?
 * In any situation when we have to do an operations on every elements of the array
 * and store the results of each opertion
 * map can be a good options
 * 
 * 
 * for example:
 * Array of product object.
 * 
 */

const newArr=[9,8,7,6]


/*
  if the function that we are passing in map takes two arguments
  then first argriments will be accessing the actual value
  second argrument will be accessing index of that value
*/

function print(ele,idx){
    return `element at idx ${idx} is ${ele}`
}

const res=newArr.map(print)
console.log(res)