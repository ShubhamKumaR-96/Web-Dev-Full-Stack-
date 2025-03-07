// function greet(name, callback) {
//     console.log("Hello, " + name + "!");
//     callback(); // Execute the callback function
// }

// function sayGoodbye() {
//     console.log("Goodbye!");
// }

// greet("Alice", sayGoodbye);


function doSomething(callback) {
    setTimeout(function() {
        console.log("Task done!");
        callback(); // Execute the callback after the task
        console.log("Really")
    }, 2000); // Wait 2 seconds
}

function afterTask() {
    console.log("Callback executed!");
}

doSomething(afterTask);