// Write a function isAnagram which takes 2 parameters and returns true/false if those are anagrams or not.
// What's Anagram?
// - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp. 

const isAnagram=(str1,str2)=>{
    return str1.length===str2.length && [...str1.toLowerCase()].sort().join('') === [...str2.toLowerCase()].sort().join('');
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
console.log(isAnagram("Dormitory", "Dirtyroom")); // true

