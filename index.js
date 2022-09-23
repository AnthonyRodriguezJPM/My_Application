

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
const h2 = document.createElement('h2')
h2.innerText = data.title
artContDiv.appendChild(h2)

 fetch(data.api_link)
.then(resp=>resp.json())
.then(data2=>{
    console.log(data2)
    const img1 = document.createElement('img')
    img1.src=`https://www.artic.edu/iiif/2/${data2.data.image_id}/full/843,/0/default.jpg`;
    h2.appendChild(img1)
    
    })

}