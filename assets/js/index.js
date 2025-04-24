const textareacontent = document.querySelector(".textar")
const root = document.documentElement;
const charcount = document.querySelector('.charcount')
const wordcount = document.querySelector('.wordcount')
const sentcount = document.querySelector('.sentcount')
const sun = document.querySelector('.two')
const moon = document.querySelector(' .one')
const imgc = document.querySelector(".imgc")
const danger = document.querySelector(".charlimit")
const logo = document.querySelector(".logo")
const charLimitCheckbox = document.querySelector('#charcheck')
const excludeSpaceCheckbox = document.querySelector('#spacecheck')
const charLimit = document.querySelector('.maxlength')
const letterTracker = document.querySelector('.lettercount')
const noDensity = document.querySelector('.noletterfound')
const showMoreOrLess = document.querySelector('.showMoreOrLessToggle')
const showMoreButton = document.querySelector('.showMoreOrLessToggle.one');
const showLessButton = document.querySelector('.showMoreOrLessToggle.two')
const limitNumber = document.querySelector('.limitMsgNumber')
const densities = document.querySelector('.data')
const dropUpOrDownButton = document.querySelector('img.dropUpOrDownButton')
const time = document.querySelector('.time')

let showless=true;
//textarea input eventlistener
textareacontent?.addEventListener('input',event => {
    updateCountAndDensities(showless)
}
)
let isdark = true
//dark or light mode eventlistener
imgc?.addEventListener('click',darkMode)

//character limit checkbox event listener
charLimitCheckbox?.addEventListener('change',showCharacterLimitInputevent)
//maxlength input bar eventlistener
charLimit?.addEventListener('change',event => {
    textareacontent.setAttribute('maxLength',parseInt(event.target.value))
    limitNumber.textContent = event.target.value
    text = textareacontent.value.toLowerCase()
    showDanger(text)
})

//exclude space for character count eventlistener
excludeSpaceCheckbox?.addEventListener('change',event =>{
    // const text = textareacontent.value.toLowerCase()
    // let characters= excludeSpaceCheckbox?.checked == true? text.replace(/\s+/g,''):text
    // charcount.textContent = characters.length.toString().padStart(2, "0")
    updateCountAndDensities(showless=showless)
}
)

//dark and light mode toggle function
function darkMode(){
    isdark = !isdark
    if(isdark == false){
        document.body.style.backgroundImage  = "url('./assets/images/bg-light-theme.png')";
        root.style.setProperty('--neutral-0', '#12131a');
        root.style.setProperty('--neutral-200', '#12131a');
        root.style.setProperty('--neutral-100', '#12131A');
        root.style.setProperty('--neutral-700', '#f2f2f7');
        root.style.setProperty('--neutral-800', ' #f2f2f7');
        moon.style.display = "block"
        sun.style.display = "none"
        logo.src = "./assets/images/logo-light-theme.svg";
        
    }
    else{
        document.body.style.backgroundImage  = "url('./assets/images/bg-dark-theme.png')";
        root.style.setProperty('--neutral-0', '#ffffff');
        root.style.setProperty('--neutral-200', '#e4e4ef');
        root.style.setProperty('--neutral-100', '#f2f2f7');
        root.style.setProperty('--neutral-700', '#2a2b37');
        root.style.setProperty('--neutral-800', '#21222c');
        moon.style.display = "none"
        sun.style.display = "block"
        logo.src = "./assets/images/logo-dark-theme.svg";
        
    }
  
}
 
//eventlistener for toggling between show more or less
showMoreOrLess?.addEventListener('click',event => {
    showless = !showless
    if(showless == true){
        showMoreOrLess.innerHTML = `
        See more 
       <img src="./assets/images/downarrow.png" alt="dropdowm" class="dropUpOrDownButton" id="dropUpOrDownButton"/>
        `
    }
    else{
         showMoreOrLess.innerHTML= `See less 
       <img src="./assets/images/uparrow.png" alt="dropdowm" class="dropUpOrDownButton" id="dropUpOrDownButton"/>
         `
    }
        updateCountAndDensities(event,showless)
    })

    //shows whether the maxlength of the textarea has been reached or exceeded.
    function showDanger(text){
        let maxlength1 = textareacontent.getAttribute("maxlength")
        if(text.length >= maxlength1){
            textareacontent.style.borderColor = "var(--orange-500)" 
            danger.style.display = "flex"
        }
        else{
            textareacontent.style.borderColor = "var(--neutral-700)" 
            danger.style.display = "none"
        }
    }

    //retrieving the unique characters out of the textarea input
    function getUniqueChars(text){
        let text1 = text.replace(/[^A-Z0-9]/ig,'')
        let uniqueChars=[...new Set(text1.toUpperCase())]
        return uniqueChars
    }

    //counting the number of times the unique character appears and return its densities
    function charsCount(text1){
        let text = text1.replace(/[^A-Z0-9]/ig,'')
        let inputtext = text.toUpperCase()
        let inputlength = inputtext.length
        let letterDensity = []
        let uniqueChars = getUniqueChars(inputtext)
        uniqueChars.forEach(uniqueChar =>{
            let counter = 0;
        inputtext.split('').forEach(inputChar => {
            if (uniqueChar == inputChar){
                counter++
            }
        }
    )
    let uniqueCharPercentage = ((counter/inputlength)*100).toFixed(2)
        letterDensity.push({uniqueChar,counter,uniqueCharPercentage})
    })
    return letterDensity;
}

//return the unique characters to be displayed in an array.
function  uniqueCharsDensitiesArray(letterDen){
    letterTracker.innerHTML = "";
    let newDivArray = []
    letterDen.map( (element,index) => {
        let newdiv = document.createElement("div")
       newdiv.className = "countwrapper"
        newdiv.innerHTML = `
        <span class="letter">${element.uniqueChar}</span>
        <div class="score">
          <div class="fill new" style="width:${element.uniqueCharPercentage}%;background-color:var(--purple-400)"></div>
        </div>
        <span class="percent">${element.counter} (${element.uniqueCharPercentage}%)</span>`;
        newDivArray.push(newdiv)
    }
  )
    return newDivArray

}

//display the unique characters on screen together with show more or less option
function displayUniqueCharDensities(charArray,showless){
    let newCharArray = []
    if(showless==true){
        newCharArray = charArray.slice(0,5)
    }
    else{
        newCharArray = charArray
    }
        showMoreOrLessfunc(charArray)
        newCharArray.forEach((element) => {
            letterTracker.appendChild(element)
    }
    
    )
}
//display whether the textarea is empty and no densities are found or display densities when there are characters in the textarea.
    function ShowDensity(text){
        if(text.length>0){
            noDensity.style.display = "none"
            densities.style.display = "block"
            time.textContent = `${Math.ceil(text.length/200)}`
        }
        else{
            noDensity.style.display = "block"
            densities.style.display = "none"
            time.textContent = "0"
            }
    }

    //display the show more or less function when the unique characters in the textarea are more five 
     function showMoreOrLessfunc(charArray){
        if(charArray.length > 5){
            showMoreOrLess.style.display = "block"   
        }
        else{
       showMoreOrLess.style.display = "none"
        }
     }
     
     //function to count characters in the textarea
    function characterCount(text){
        let characters= excludeSpaceCheckbox?.checked == true? text.replace(/\s+/g,''):text
        return characters.length.toString().padStart(2, "0")
    }
    function wordCount(text){
        //let words = text.trim()==''?[]:text.trim().split(/\s+/)
        let words = text.trim()==''?[]:text.trim().split(/\s+/)
        return words.length.toString().padStart(2, "0");
    }
    function sentenceCount(text){
        let sentence = text.trim().split(/[.?!]/).filter(data => {return data.length>0}) //split(/[.?!]/)
        return sentence.length.toString().padStart(2, "0")
    }

    //update character count,word count and sentence count
    function updateCharWordAndSentenceCount(){
        let content = textareacontent.value.toLowerCase();
        // let uniqueChar = content.replace(/[^A-Z0-9]/ig,'')
         charcount.textContent = characterCount(content)
         wordcount.textContent = wordCount(content)
         sentcount.textContent = sentenceCount(content)
    }

    //updates the densities together with the character count,word count and sentence count based on textarea
    function updateCountAndDensities(showless=true){
        let maxlength = textareacontent.getAttribute("maxlength")
        let content = textareacontent.value.toLowerCase();

       updateCharWordAndSentenceCount()
    if(charLimitCheckbox.checked == true && maxlength?.length> 0){
        showDanger(content)
    }
        getUniqueChars(content)
        let lettersDen = charsCount(content)
        let charArray = uniqueCharsDensitiesArray(lettersDen)
        ShowDensity(content.trim())
        displayUniqueCharDensities(charArray,showless)
    }

    function showCharacterLimitInputevent() {
        if (charLimitCheckbox.checked == true){
            charLimit.style.display = "block"
        }
        else{
            charLimit.style.display = "none"
            textareacontent.removeAttribute('maxlength')
            textareacontent.style.borderColor = "var(--neutral-700)" 
            danger.style.display = "none"
        }
    
    }

module.exports = {getUniqueChars,charsCount,characterCount,wordCount,sentenceCount,uniqueCharsDensitiesArray,showMoreOrLessfunc,updateCharWordAndSentenceCount}