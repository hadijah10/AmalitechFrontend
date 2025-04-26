//retrieving the character count of a text with or without the exludespace checkbox selected.
function getCharacterCount(text,excludespace=false){
    if(excludespace){
        return text.replace(/\s+/g,'').length.toString().padStart(2, "0")
    }
    else{
        return text.length.toString().padStart(2, "0")
    }
}

//finding the wordcount of the text in the text area.
function getWordCount(text){
   let text1 = text.trim()==''?[]:text.trim().split(/\s+/)
        return text1.length.toString().padStart(2, "0");
}

//finding the number of sentences in a text.
function getSentenceCount(text){
    let sentence = text.trim().split(/[.?!]/).filter(data => {return data.length>0})
        return sentence.length.toString().padStart(2, "0")
}


//updating the count when the tetxarea is updated
function updateCount(characterCountarea,wordCountArea,sentenceCountArea,getCharacterCount,getWordCount,getSentenceCount){
    characterCountarea.textContent = getCharacterCount
    wordCountArea.textContent = getWordCount
    sentenceCountArea.textContent = getSentenceCount
}

//calcumating the readtime of text
function updateReadTime(getCharacterCount){
    return parseInt(getCharacterCount) >0? `${Math.ceil(parseInt(getCharacterCount)/200)} minutes`:'0 minute';
}

//triggering a warning when the thew texarea input is reached the maximum character limit 
function warning(getCharacterCount,characterLimitCheck,maxCharacterLimit,warningDiv,textareacontent,warningtext,){
    if(characterLimitCheck.checked==true && maxCharacterLimit.value){
        if(parseInt(getCharacterCount(textareacontent.value)) >= maxCharacterLimit.value){
            warningDiv.style.display = 'block'
            warningtext.textContent = `Limit reached! Your text exceeds ${maxCharacterLimit.value} characters.`;
            textareacontent.style.borderColor= '#fe8159';
        }
        else{
            warningDiv.style.display = 'none'
            warningtext.textContent = ''
            textareacontent.style.borderColor= '#2a2b37';   
        }
    } else{
        warningDiv.style.display = 'none'
        warningtext.textContent = ''
        textareacontent.style.borderColor= '#2a2b37'; 
    }
   
}



module.exports = {getCharacterCount,getWordCount,getSentenceCount,updateCount,warning,updateReadTime}