import words from "./words.js";
const uri = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const resultBody = document.getElementById("result-body");
const inputWord = document.getElementById("myInput");
console.log(words[0]);
inputWord.addEventListener("keyup", function(event) {
    findMeaning();
}
);

function findMeaning(){
 const uriWord = uri+inputWord.value.toLowerCase();
if(inputWord.value !== ''){
fetch(uriWord)
  .then((response) => {
    if(response.ok === false){
      resultBody.innerText = "Sorry, No meaning found by word \"" + inputWord.value + "\"";
    }else {
      return response.json()
    }
    })
    .then((data) =>{
        if(data !== undefined){
        resultBody.innerHTML = ` <div class="display-result">
        ${data[0].phonetics[0].audio ?'<button id="word-audio"><i class="fa-solid fa-volume-high"></i></button>' : ''}
        <h3>`+data[0].word+`</h3>
        <small>`+data[0].phonetics[0].text+`</small>
        <div id="listOfMeaning"><div>
        </div>`
        var ul = document.createElement('ul');
document.getElementById('listOfMeaning').appendChild(ul);
        for(let i = 0 ; i < data[0].meanings.length ; i++){
            var li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML = `<ul><li><span>${data[0].meanings[i].partOfSpeech}<span>: ${data[0].meanings[i].definitions[0].definition}</li>
                                <li>synonyms :- ${data[0].meanings[i].synonyms[0]}</li></ul>`
        }
if(data[0].phonetics[0].audio){
                const wordAudio = document.querySelector('#word-audio');
                wordAudio.addEventListener("click",function(){
                  const audio = new Audio(data[0].phonetics[0].audio);
                  audio.play();
                })
              }
            }
}).catch((err) => {
      console.log(err);
        resultBody.innerText = "Could Not load";
    
    });
}
else{
  resultBody.innerText = "plese enter a word";
}
}



//   autocomplete -----------------------------------------
function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
        
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
   
  // /*initiate the autocomplete function on the "myInput" element, and pass along the wordlist array as possible autocomplete values:*/
  autocomplete(document.getElementById("myInput"), words);