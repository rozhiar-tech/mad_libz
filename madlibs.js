/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  // Your code here.
   const obj = {
    n: "noun",
    v: "verb",
    a: "adjective",
  };

  // console.log(obj[n]);
  
  // Split the string into an array using spaces, get comma and dot as words as well
  const wordArray = rawStory.split(/(?=[\.,])|[ ]/g);
  console.log(wordArray);

  //Create an array of word objects using the output of string split
  const arrayOfWords = [];

  for (element of wordArray) {
    // Check if any words contain [anv] inside square brackets
    const posTest = /\[[anv]\]/;

    if (posTest.test(element)) {
            
      //check if the element has a pos key
      //what type of word is it, extract the letter out of the square brackets
      const posValue = element.match(posTest)[0].charAt(1);
      console.log(posValue);
      //push the word into the container with the pos key and value
      arrayOfWords.push({ word: element.replace(`${element.match(posTest)[0]}`, ""), pos: obj[posValue] });
    } else {
      //Push word into container
      arrayOfWords.push({ word: element });
    }
  }
  return arrayOfWords;
}



/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const madLibsPreview = document.getElementById("madLibsPreview");
    const newDiv = document.getElementById("new");
      //     //            n   v  a
      // let counter = [0, 0, 0];
  processedStory.forEach(element => {
    if (!element.pos) {
      const spanEdit = document.createElement("span");
      spanEdit.innerText = `${element.word}  `;
      spanEdit.className="span-edit"
      const spanPerview = document.createElement("p");
      spanPerview.innerText = `${element.word}` ;
      
      newDiv.appendChild(spanEdit);
      madLibsPreview.appendChild(spanPerview);

    } else {
      // creating the elements
      const span = document.createElement("span");
      const divInput= document.createElement("div")
      const label = document.createElement("label");
      // giving classNames to elements
      label.className="label"
      label.innerHTML=element.pos;
      divInput.className="inputs"
      span.innerText = `(${element.pos}) `;
      span.style.fontWeight = 'bold';
      const input = document.createElement("input");
      input.className="inputt"

      divInput.appendChild(label)
      divInput.appendChild(input)
      input.autocomplete="off"     
      
      newDiv.appendChild(divInput);
      madLibsPreview.appendChild(span);
      // checking if the element position is at noun
      // if (element.pos==="noun") {
      //   ++counter[0];
      //   input.id= "input-noun"+counter[0];
      //   span.id = "span-noun"+counter[0];
      // }
      // // checking if the element position is at verb
      // else if(element.pos==="verb"){
      //    ++counter[1];
      //   input.id= "input-verb"+counter[1];
      //   span.id = "span-verb"+counter[1];
      // }
      // // checking if the element position is at adjective
      // else if(element.pos==="adjective"){
      //    ++counter[2];
      //   input.id= "input-adjective"+counter[2];
      //   span.id = "span-adjective"+counter[2];
      // }
       input.addEventListener("input",()=>{
            console.log(processedStory)
            element.word= input.value
            span.innerHTML = element.word    
    })

    }
     
  });
  });
 
