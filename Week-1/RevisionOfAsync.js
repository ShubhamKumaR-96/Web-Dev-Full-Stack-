// Define a function to calculate the square of a number
function square(n) {
    return n * n;
}

// Define a function to calculate the cube of a number
function cube(n) {
    return n * n * n;
}

// function sumOfCubes(a,b){ // let sq1=square(a) // let sq2=square(b) // return sq1+sq2 // }

// Function to perform an operation on two numbers using a provided function
// This function follows the DRY principle by avoiding repeated code
function doSomething(a, b, fn) {
    let fn1 = fn(a);
    let fn2 = fn(b);
    return fn1 + fn2;
}

// Example usage of doSomething function with square and cube functions
console.log(doSomething(1, 2, square)); // Output: 5 (1^2 + 2^2)
console.log(doSomething(1, 2, cube));   // Output: 9 (1^3 + 2^3)



