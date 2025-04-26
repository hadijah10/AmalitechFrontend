const {getCharacterCount,getWordCount,getSentenceCount,updateCount,warning,updateReadTime} = require('./counter')

//test for character count
describe('text character count test together with edge cases',() => {

     //test for text empty input 
     test('counting of characters in a text with string with excludespace checbox checked', () => {
        expect(getCharacterCount('',true)).toBe('00')
      });
     test('counting characters in a text with string with excludespace checbox not checked', () => {
        expect(getCharacterCount('')).toBe('00')
      })

    //test for text with string input
    test('counting of characters in a text with string with excludespace checbox checked', () => {
        expect(getCharacterCount('I am well',true)).toBe('07')
      });
      test('counting of characters in a text with string with excludespace checbox not checked', () => {
        expect(getCharacterCount('I am well')).toBe('09')
      });

      //test for text with special characters 
      test('counting characters in a text with string with excludespace checbox checked',() => {
        expect(getCharacterCount('$good day @',true)).toBe('09')
      })
      test('counting characters in a text with special characters with excludespace checbox  not checked',() => {
        expect(getCharacterCount('$good day @')).toBe('11')
      })

       //test for character count for text with excessive whitespace
       test('counting characters in a text with excessive whitespace with excludespace checbox checked',() => {
        expect(getCharacterCount('  ',true)).toBe('00')
      })
      test('counting characters in a text with excessive whitespace with excludespace checbox not checked',() => {
        expect(getCharacterCount('  ')).toBe('02')
      })

})

//testing the wordcount of a text.
describe('count words in a text',() => {
    //test for text with punctuations
    test('count words of a text with nospace',() => {
        expect(getWordCount('Iamfine')).toBe('01')
    }) 
    test('count words of a text with space',() => {
        expect(getWordCount('I am fine')).toBe('03')
    }) 
    test('count words of text a with extra whitespace',() => {
        expect(getWordCount(' I   am  fine')).toBe('03')
    }) 
})

//testing the sentence count of a text
describe('Counting the sentences in a text',() => {

    test('sentence count of text without punction',() => {
        expect(getSentenceCount('Humpty dumty sat on the wall Humpty dumpty had a great fall')).toBe('01')
    })
    test('sentence count of text withiout  punction',() => {
      expect(getSentenceCount('Humpty dumty sat on the wall. Humpty dumpty had a great fall.')).toBe('02')
  })
})

describe('DOM manipulation for text input updates',() => {
  let textareacontent;
  //mocking the dom to test.
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="container">
      <textarea name="textinp" id="" class="textar"></textarea>
      <h2 class="charcount">00</h2>
      <h2 class="wordcount">00</h2>
      <h2 class="sentcount">00</h2>
      <input type="checkbox" id="charlimit-checkbox">
      <p id='readTimeText'>
      Approx.reading time:<
      <span id='readtime'>0 minute<span
      </p>
    </div>
    `
    textareacontent = document.querySelector('.textar')

  });
  afterEach(()=> {
    document.body.innerHTML = ''
  });

  //updating the character,word and sentence count when textarea input updates.
  test('updating the character, word and sentence count when the textarea input changes',() => {
      const charcount = document.querySelector('.charcount')
        const wordcount = document.querySelector('.wordcount')
        const sentcount = document.querySelector('.sentcount')
        const event = new Event('input',{bubbles:true});
        textareacontent.value = 'Design and read. Look and Leap.'
        textareacontent.dispatchEvent(event)
        updateCount(charcount,wordcount,sentcount,getCharacterCount(textareacontent.value),getWordCount(textareacontent.value),getSentenceCount(textareacontent.value))
         //expect(readingTimeUpdate(textareacontent.value)).toMatch('0 minute')
          //testing for character update count.
        expect(charcount.textContent).toMatch('31')
        expect(wordcount.textContent).toMatch('06')
        expect(sentcount.textContent).toMatch('02')
  });
  test('updating the readtime when textarea updates',() => {
    const readingTime = document.getElementById('readtime') 
    const event = new Event('input',{bubbles:true});
    textareacontent.dispatchEvent(event)

    //test when the text has few string. 
     textareacontent.value = 'Design and read. Look and Leap.'
     readingTime.textContent = updateReadTime(getCharacterCount(textareacontent.value,true))
     expect(readingTime.textContent).toBe('1 minutes')

         //test when the text is empty. 
         textareacontent.value = ''
         readingTime.textContent = updateReadTime(getCharacterCount(textareacontent.value,true))
         expect(readingTime.textContent).toContain('0 minute')

          //test when the text has 260 string. 
      
     textareacontent.value = 'Design and read. Look and Leap.'.repeat(10)
     readingTime.textContent = updateReadTime(getCharacterCount(textareacontent.value,true))
     expect(readingTime.textContent).toBe('2 minutes')

        //test when the text has 520 string. 
        
        textareacontent.value = 'Design and read. Look and Leap.'.repeat(20)
        readingTime.textContent = updateReadTime(getCharacterCount(textareacontent.value,true))
        expect(readingTime.textContent).toBe('3 minutes')

           //test when the text has 1300 string. 
      textareacontent.value = 'Design and read. Look and Leap.'.repeat(50)
      readingTime.textContent = updateReadTime(getCharacterCount(textareacontent.value,true))
      expect(readingTime.textContent).toBe('7 minutes')
  })
})

//testing for warning logic when character limit is reached.
describe('display warning when charcter limit is reached',() => {
  beforeEach(() => {
    //mocking the dom
    document.body.innerHTML = `
    <div>
      <textarea name="textinp" id="" class="textar"></textarea>
      <p id="warningDiv">
      <span> warningicon</span>
      <span id='warningText'></span>
      </p>
      <input type="checkbox" name="" id="limitCharCheckbox">
      <input type="number" name="" id="characterLimit">
    </div>
    `
  });
  afterEach(() => {
    document.body.innerHTML = ``
  })
  test('showing a warning when character reached or exceeds limit',() => {
    const textareacontent = document.querySelector('.textar')
    const charLimitCheckbox = document.querySelector('#limitCharCheckbox')
    const warningDiv = document.querySelector('#warningDiv')
    const maxCharacterLimit = document.querySelector('#characterLimit')
    const warningtext = document.querySelector('#warningText')

    textareacontent.value = 'Design and read.Look and Leap.'
    charLimitCheckbox.checked = true
    maxCharacterLimit.value = 40

    //testing for when checbox is checked and textarea character limit is less than the max limit
    warning(getCharacterCount,charLimitCheckbox,maxCharacterLimit,warningDiv,textareacontent,warningtext)
    expect(warningDiv.style.display).toBe('none')
    expect(warningtext.textContent).toBe('')
    expect(textareacontent.style.borderColor).toBe('#2a2b37')

       //testing for when checkbox is checked and textarea character limit reaches or exceeds character limit
       maxCharacterLimit.value = 10
       warning(getCharacterCount,charLimitCheckbox,maxCharacterLimit,warningDiv,textareacontent,warningtext)
       expect(warningDiv.style.display).toBe('block') 
      expect(warningtext.textContent).toBe('Limit reached! Your text exceeds 10 characters.')
      expect(textareacontent.style.borderColor).toBe('#fe8159')

        //testing for when checkbox is not checked and maximumcharracter limit is undefined
    maxCharacterLimit.value = undefined
    charLimitCheckbox.checked = false
    warning(getCharacterCount,charLimitCheckbox,maxCharacterLimit,warningDiv,textareacontent,warningtext)
    expect(warningDiv.style.display).toBe('none') 
    expect(warningtext.textContent).toBe('')
    expect(textareacontent.style.borderColor).toBe('#2a2b37')

   //testing for when checkbox is not checked and textarea character limit does not reach or exceed character limit
   maxCharacterLimit.value = 40
   charLimitCheckbox.checked = false
   warning(getCharacterCount,charLimitCheckbox,maxCharacterLimit,warningDiv,textareacontent,warningtext)
   expect(warningDiv.style.display).toBe('none') 
   expect(warningtext.textContent).toBe('')
   expect(textareacontent.style.borderColor).toBe('#2a2b37')

     //testing for when checkbox is not checked and textarea character limit reaches or exceeds character limit
     maxCharacterLimit.value = 10
     charLimitCheckbox.checked = false
     warning(getCharacterCount,charLimitCheckbox,maxCharacterLimit,warningDiv,textareacontent,warningtext)
     expect(warningDiv.style.display).toBe('none') 
     expect(warningtext.textContent).toBe('')
     expect(textareacontent.style.borderColor).toBe('#2a2b37')

       //testing for when checkbox is not checked and maximumcharracter limit is undefined
    maxCharacterLimit.value = undefined
   charLimitCheckbox.checked = false
   warning(getCharacterCount,charLimitCheckbox,maxCharacterLimit,warningDiv,textareacontent,warningtext)
   expect(warningDiv.style.display).toBe('none') 
   expect(warningtext.textContent).toBe('')
   expect(textareacontent.style.borderColor).toBe('#2a2b37')
  }) 
})