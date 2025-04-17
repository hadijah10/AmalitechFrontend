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





textareacontent.addEventListener('input',(event) => {
    let maxlength = textareacontent.getAttribute("maxlength") 
    let content = event.target.value.replace(/^\s+|\s+$/gm,'').toLowerCase();
    let words = content.split(/\s/)
    let sent = content.split(/[.?!]/)
  charcount.textContent = content.length;
  wordcount.textContent = words.length;
  sentcount.textContent = sent.length
   
    if(content.length == maxlength){
        textareacontent.style.borderColor = "var(--orange-500)" 
        danger.style.display = "flex"
    }
    getUniqueChars(content)
    let letterDen = charsCount(content)
    displayUniqueChars(letterDen)
    ShowDensity(content)


})
let isdark = true
imgc.addEventListener('click',event => {
    darkMode(event)
})
charLimitCheckbox.addEventListener('click',event => {
    if (charLimitCheckbox.checked == true){
        charLimit.style.display = "block"
    }
    else{
        charLimit.style.display = "none"
    }
})
charLimit.addEventListener('input',event => {
  textareacontent.setAttribute('maxLength',parseInt(event.target.value))
  limitNumber.textContent = event.target.value
})


function darkMode(event){
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
 let showless=true;
showMoreOrLess.addEventListener('click',event => {
    showless = !showless
    if(showless == true){
        showMoreOrLess.innerHTML = `
        See more 
       <img src="./assets/images/downarrow.png" alt="dropdowm" class="dropUpOrDownButton" id="dropUpOrDownButton"/>
        `
    }
    else{
         showMoreOrLess.innerHTML= `
         See less 
       <img src="./assets/images/uparrow.png" alt="dropdowm" class="dropUpOrDownButton" id="dropUpOrDownButton"/>
         `
    }
    })

function getUniqueChars(text){
    let text1 = text.replace(/\s/g, '');
    let uniqueChars=[...new Set(text1.toLowerCase())]
    return uniqueChars
}
function charsCount(text){
    //uniqueChar =  a
    // text = `abgacedf`
    let inputtext = text.toLowerCase()
    let inputlength = text.length
    let letterDensity = []
    let uniqueChars = getUniqueChars(text)
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
function displayUniqueChars(letterDen){
    letterTracker.innerHTML = "";

    letterDen.map( (element,index) => {
        let newdiv = document.createElement("div")
       newdiv.className = "countwrapper"
        newdiv.innerHTML = `
        <span class="letter">${element.uniqueChar}</span>
        <div class="score">
          <div class="fill new" style="width:${element.uniqueCharPercentage}%;background-color:var(--purple-400)"></div>
        </div>
        <span class="percent">${element.counter} (${element.uniqueCharPercentage}%)</span>`;
       
        letterTracker.appendChild(newdiv)


}

    )
    showMoreOrLessfunc()

}
function ShowDensity(text){
    if(text.length>0){
        noDensity.style.display = "none"
       /* letterTracker.style.display = "flex"
       */
        densities.style.display = "block"
    }
    else{
        noDensity.style.display = "block"
        /*letterTracker.style.display = "none"
       */
         densities.style.display = "none"
    }
}
function showMoreOrLessfunc(){
    if(letterTracker.childElementCount > 5){
         showMoreOrLess.style.display = "block"
    }
    else{
         showMoreOrLess.style.display = "none"
    }
}


function appendToParent(){

}