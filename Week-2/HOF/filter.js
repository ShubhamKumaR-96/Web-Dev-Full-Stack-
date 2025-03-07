/*
Filter is also a higher order function
filter also loops over the array formats
there is one special things about filter, i.e the argument function f which we have to pass inside
filter should always return a boolean,otherwise output will be converted to a boolean


filter loops over every elements , passes that elements in the arguments function and then if the output
of the this function call is true, then it stores the original elemnts in a new array otherwise doesn't add this add
element to the array

*/

function oddEven(x){
    return (x%2==0) // returning a boolean
}
let arr=[1,2,3,4,5,67,8,9]

const res=arr.filter(oddEven)

console.log(res)