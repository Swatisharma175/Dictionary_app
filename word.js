const words = document.getElementById("text");
// console.log(words.innerText.length);
let arr = ""
var j = 0;
for(let i = 0 ; i < words.innerText.length ; i++){
    if(words.innerText[i] === " "){
        arr += "\"" + words.innerText.substring(j,i)+ "\","
        j = i+1;
    }
}
words.innerText = arr;
console.log(arr);
