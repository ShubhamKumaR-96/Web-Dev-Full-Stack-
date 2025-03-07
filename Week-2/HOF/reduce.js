/*

reduce is a higher order function avilable for arrays
reduce also takes a function f as an argument,
what reduce does is, it one by one goes to every element of the array
say the current elememts is arr[i]
reduce will pass this element to the function f,and accumulate the result of further calls
with this particular result

*/

// const arr=[1,2,3,4,5,7,6]

// function sum(prev,curr){
//     console.log(prev,curr)
//     return prev+curr
// }
// const ans=arr.reduce(sum)
// console.log(ans)

let cart = [
    { price: 1000, name: "iPhone" },
    { price: 2000, name: "MacBook" },
    { price: 500, name: "Apple Watch" },
    { price: 1500, name: "iPad" },
    { price: 800, name: "AirPods" },
    { price: 300, name: "Apple Pencil" },
];

// console.log(cart);

function addPrice(prev,curr){
    console.log(prev,curr)
    let newPrice=prev.price+curr.price
    return {price:newPrice}
}

const totalPrice=cart.reduce(addPrice)
console.log(totalPrice,totalPrice.price)