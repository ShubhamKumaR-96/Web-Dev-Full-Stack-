// Problem : Create an array containg names types

const names=["shubh","sunny","Rahul","Sanju","Kohali","Rohit","Pankaj"]

// ADD devansh into existing list
names.push("devansh")

// REmove Rahul name
const indexRahul=names.indexOf("Rahul")
console.log(indexRahul)
if (indexRahul > -1){
    names.splice(indexRahul,1)
}

// filter sanju

const filtered=names.filter((name)=> name!='Sanju')
console.log(filtered)

// sort the names in alphabetical order