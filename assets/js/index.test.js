const {getUniqueChars,charsCount,characterCount,wordCount,sentenceCount,displayUniqueCharsArray,showMoreOrLessfunc,updateCharWordAndSentenceCount} = require('./index.js')

//updating the time for reading text in text area
function readingTimeUpdate(text){
    let textfilter = text.trim().length
    return textfilter.length >0? `${Math.ceil(textfilter/200)} minutes`:'0 minute';
}

//retrieving the uniquecharacter of a string.
test('retrieve unique character from data', () => {
    const text ='cbsc tray';
    expect(text).toBeDefined();
    expect(getUniqueChars(text)).toEqual(['C','B','S','T','R','A','Y'])
})

//counting unique characters and finding their percentages.
test('getting the unique character densities',() => {
    const text = 'Broom'
    expect(text).toBeDefined();
    expect(charsCount(text)).toEqual([
        {uniqueChar:'B',counter:1,uniqueCharPercentage:'20.00'},
        {uniqueChar:'R',counter:1,uniqueCharPercentage:'20.00'},
        {uniqueChar:'O',counter:2,uniqueCharPercentage:'40.00'},
        {uniqueChar:'M',counter:1,uniqueCharPercentage:'20.00'}
    ])
})

//counting characters in a text
test('Counting the number of characters in text',() => {
    const text = 'Rack j9';
    const emptyinput = ''
    const specialCharacters = '$%2'
    const excessiveWhitespace = '  8'
    // expect(text).toBeDefined();
    expect(characterCount(text)).toBe('07')
    expect(characterCount(emptyinput)).toBe('00')
    expect(characterCount(emptyinput)).toBe('00')
    expect(characterCount(excessiveWhitespace)).toBe('03')
})

//counting the words in a text
test('counting the number of words in text',() => {
    const text1 = 'Roses are red. Violets are blue.'
    const textWithExtraSpace1 = 'Roses  are red.'
    const textWithSpaceAtEnd = 'Rosesare red. '
    expect(text1).toBeDefined();
    expect(wordCount(text1)).toMatch('06')
    expect(wordCount(textWithExtraSpace1)).toMatch('03')
    expect(wordCount(textWithSpaceAtEnd)).toMatch('02')
})

test('counting the number of sentences in the text',() => {
    const text = 'Humpty dumty sat on the wall.Humpty dumpty had a great fall. All the'
    const textWithoutEndingSign = 'Humpty dumty sat on the wall. Humpty dumpty had a great fall'
    expect(text).toBeDefined()
    expect(sentenceCount(text)).toMatch('03')
    expect(sentenceCount(textWithoutEndingSign)).toMatch('02')
})


// test('displaying the show more or less function',() => {
//     let arr = [2,3]
//     showMoreOrLessfunc(arr);
//     expect(showMoreOrLess.innerText).toMatch('')
// })

//testing the text area event listeners and mnipulating the dom,updating the read time
// and checking whether the character limit has been exceede.
describe('DOM manipulation for the text area',() => {
    let textareacontent;
    beforeEach(() => {
        document.body.innerHTML = `
    <div id="container">
      <textarea name="textinp" id="" class="textar"></textarea>
      <h2 class="charcount">00</h2>
      <h2 class="wordcount">00</h2>
      <h2 class="sentcount">00</h2>
      <p id='readtime'></p>
      
    </dvi
    `
    textareacontent = document.querySelector(".textar")
    });
    afterEach(() => {
        document.body.innerHTML = ''
    });
    test('update the character,word and sentence count',() => {
        const charcount = document.querySelector('.charcount')
        const wordcount = document.querySelector('.wordcount')
        const sentcount = document.querySelector('.sentcount')
        const readingTime = document.getElementById('readtime') 
        

        const event = new Event('input',{bubbles:true});
        textareacontent.value = 'Design and read. Look and Leap.'
        textareacontent.dispatchEvent(event)
        charcount.textContent = characterCount(textareacontent.value)
        wordcount.textContent = wordCount(textareacontent.value)
        sentcount.textContent = sentenceCount(textareacontent.value)
        readingTime.textContent = readingTimeUpdate(textareacontent.value)
    

        expect(charcount.textContent).toMatch('31')
        expect(wordcount.textContent).toMatch('06')
        expect(sentcount.textContent).toMatch('02')

         // Simulate warning logic for character limits
        const maxCharacterLimit = 200;
        const warningDiv = document.createElement('div');
        warningDiv.id = 'warning';
        document.getElementById('container').appendChild(warningDiv);

        if(parseInt(characterCount(textareacontent.value)) >= maxCharacterLimit){
            warningDiv.textContent = 'Limit reached or exceeded'
        }
        else{
            warningDiv.textContent ='';
        }
        if(parseInt(characterCount(textareacontent.value))  > maxCharacterLimit){
            expect(warningDiv.textContent).toBe('Limit reached or exceeded')
        }
        else{
            expect(warningDiv.textContent).toBe('')
        }
        
        expect(readingTimeUpdate(textareacontent.value)).toMatch('0 minute')
    })
})