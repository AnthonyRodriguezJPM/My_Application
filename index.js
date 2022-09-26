
////////// DOMContentLoaded Event

document.addEventListener('DOMContentLoaded', (e)=>{
    e.preventDefault
    console.log('DOM FULLY LOADED')
})

///////// Submit Event on Form Element

const form = document.querySelector('#form');
form.addEventListener('submit', handleSubmit);

const submitBttn = document.querySelector('#enter');

///////// MouseOver/MouseOut EventListener

function changeColor(e){
    e.preventDefault()
    if(e.target.matches('#enter')) {
    e.target.style.color = 'red'

}}

function mouseReturn(e) {
    e.preventDefault()
    e.target.style.color='black'
}

submitBttn.addEventListener('mouseover', changeColor)
submitBttn.addEventListener('mouseout', mouseReturn)


/////// Building JS


const artContDiv = document.querySelector('#art-collection')


function handleSubmit(e) {
    e.preventDefault()
    // resets inner HTML and will delete previous images and reload new images
    artContDiv.innerHTML=''
    const inputText = e.target.input1.value
    console.log(inputText)
    const inputNum = e.target.num_Images.value
    console.log(inputNum)
    form.reset()
    fetchArt(inputText, inputNum)
}

function fetchArt(inputText, inputNum) {
    fetch(`https://api.artic.edu/api/v1/artworks/search?q=${inputText}&limit=${inputNum}`)
    .then(resp=>resp.json())
    .then(dataTotal=>dataTotal.data.forEach(loadDom))
    .catch((error)=>console.error('There was an error with Fetch!', error))

    // fetch(`https://api.artic.edu/api/v1/artworks/search?q=${inputText}&limit=5`)
    // .then(resp=>resp.json())
    // .then(dataTotal=>console.log(dataTotal))
}

function loadDom(data) {

fetch(data.api_link)
.then(resp=>resp.json())
.then(data2=>{

    console.log(data)
    console.log(data2)

    /////////// Create Div Card

    const divContainer = document.createElement('div')
    divContainer.setAttribute('class', 'art-card')
    artContDiv.appendChild(divContainer)

    /////////// Create Image & Add Image

    const img1 = document.createElement('img')
    img1.src=`https://www.artic.edu/iiif/2/${data2.data.image_id}/full/830,/0/default.jpg`;
    img1.setAttribute('class', 'images-art')
    divContainer.appendChild(img1)

    /////////// Add Title of Art to Div Card

    const h2 = document.createElement('h2')
    h2.innerText = data2.data.title
    divContainer.appendChild(h2)

    ////////// Create Text Div Block

    const textDivBlock = document.createElement('div')
    textDivBlock.setAttribute('class', 'text-info')
    divContainer.appendChild(textDivBlock)

    ////////// Author of Art

    const authorDiv = document.createElement('div')
    authorDiv.setAttribute('class', 'author')
    textDivBlock.appendChild(authorDiv)

    const paraAuthor = document.createElement('p')
    const authorTitle = data2.data.artist_title
    paraAuthor.innerText = `Artist Name: ${authorTitle}`
    authorDiv.appendChild(paraAuthor)
    
    ////////// Paragraph Explanation

    const paragraphTextDiv = document.createElement('div')
    paragraphTextDiv.setAttribute('class', 'paragraph-text')
    textDivBlock.appendChild(paragraphTextDiv)

    const paraText = document.createElement('p')
    const addThumbnailInfo = data.thumbnail.alt_text
    paraText.innerText = `Description: ${addThumbnailInfo}`
    paragraphTextDiv.appendChild(paraText)

    //////// Artwork Type, Year, and Department Title

    const typeAndYearP = document.createElement('p')
    const typeArt = data2.data.artwork_type_title
    const yearArt = data2.data.date_display
    const departmentTitle = data2.data.department_title
    typeAndYearP.innerText = `Type of Art: ${typeArt};          Year: ${yearArt};           Department: ${departmentTitle} `
    paragraphTextDiv.appendChild(typeAndYearP)

    //////// Creating Like Button & Click Event Listener

    const bttn = document.createElement('button')
    bttn.innerText = '  ❤️  '
    bttn.setAttribute('class', 'heart-button')
    h2.appendChild(bttn)

    bttn.addEventListener('click', ()=>{
    alert(`${data2.data.artist_title} thanks you for your love!`)})

    /////////// Add break after add-card
    const brDiv = document.createElement('div')
    divContainer.appendChild(brDiv)
    })
}

