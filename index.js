const form = document.querySelector('#form');
form.addEventListener('submit', handleSubmit);

const submitBttn = document.querySelector('#enter');
const artContDiv = document.querySelector('#art-collection')


function handleSubmit(e) {
    

    e.preventDefault()

    artContDiv.innerHTML=''

    const inputText = e.target.input1.value
    console.log(inputText)
    form.reset()
    fetchArt(inputText)

}

function fetchArt(inputText) {
    fetch(`https://api.artic.edu/api/v1/artworks/search?q=${inputText}&limit=5`)
    .then(resp=>resp.json())
    .then(dataTotal=>dataTotal.data.forEach(loadDom))

    // fetch(`https://api.artic.edu/api/v1/artworks/search?q=${inputText}&limit=5`)
    // .then(resp=>resp.json())
    // .then(dataTotal=>console.log(dataTotal))
}

function loadDom(data) {
    
console.log(data)
const divContainer = document.createElement('div')
divContainer.setAttribute('class', 'art-card')
artContDiv.appendChild(divContainer)
// const h2 = document.createElement('h2')
// h2.innerText = data.title
// divContainer.appendChild(h2)

fetch(data.api_link)
.then(resp=>resp.json())
.then(data2=>{
    console.log(data2)
    const img1 = document.createElement('img')
    img1.src=`https://www.artic.edu/iiif/2/${data2.data.image_id}/full/830,/0/default.jpg`;
    img1.setAttribute('class', 'images-art')
    divContainer.appendChild(img1)

    /////////// Add Title of Art

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
    
    ////////// Paragraph Thumbnail

    const paragraphTextDiv = document.createElement('div')
    paragraphTextDiv.setAttribute('class', 'paragraph-text')
    textDivBlock.appendChild(paragraphTextDiv)

    const paraText = document.createElement('p')
    const addThumbnailInfo = data.thumbnail.alt_text
    paraText.innerText = `${addThumbnailInfo}`
    paragraphTextDiv.appendChild(paraText)

    /////////// Add break after add-card
    const brDiv = document.createElement('div')
    divContainer.appendChild(brDiv)

    })
}

