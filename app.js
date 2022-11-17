const body = document.querySelector('body')
const openModal = document.createElement('button')
openModal.id = 'open_modal'
openModal.innerText = 'Abrir'
openModal.style = 'position: fixed;cursor: pointer;top: 10px;border-radius: 10px;padding: 4px 15px;outline: none;background: white;right: 20px;'
var hided = []
var clicked = false
const element = document.createElement('dialog')
element.style = 'position: fixed;background:black; top: 10px;right: 85px;width: 230px;min-height: 100px;color: white;border-radius: 15px;border: 1px solid #2f3336;margin-right: 0px;padding-top: 5px;'
element.innerHTML = "<p><label for='userInput'>Escreva o termo que deseja esconder:</label><br><input type='text' id='userInput' style='width: 200px;background: #202327;outline: none;border-radius: 3px;margin-top: 5px;border: none;padding: 5px 10px;color: white;'></p><button id='confirmar' style='background: white;outline: none;border-radius: 10px;padding: 3px 10px;cursor: pointer;'>Confirmar</button><ul style='padding:0px;margin-bottom:0px;' id='tags'></ul>";
body.append(element)
body.append(openModal)
const input = document.getElementById('userInput')
const confirmBtn = document.getElementById('confirmar')

input.addEventListener('keypress', e=>{
    if(e.key == 'Enter'){
        createTags()
    }
})
confirmBtn.addEventListener('click', e=>{
    createTags()
})

function createTags(){
    const tags = document.createElement('li')
    const append = document.getElementById('tags')
    const value = document.getElementById('userInput').value
    hided.push(document.getElementById('userInput').value)
    tags.id = value
    tags.classList.add('tag')
    tags.style = 'cursor: pointer;border: 2px solid rgb(0 122 133);padding: 0px 5px;display: inline-block; border-radius:5px; background: rgb(255 255 255);color: black;margin-right: 4px;margin-bottom: 4px;'
    tags.innerHTML = value
    document.getElementById('userInput').value = ''
    tags.onclick = function() { deleteTag(value) }
    append.append(tags)
}

function deleteTag(id){
    const result = hided.indexOf(id)
    const deleleteElement = document.getElementById(id)
    deleleteElement.remove();
    if(result > -1){
        hided.splice(result, 1)
    }
    console.log(hided)
    
}


openModal.addEventListener('click', e=>{
    if(clicked){
        clicked = false;
        element.close()
    }else{
        clicked = true;
        element.show()
    }
})

renderScreen()
function renderScreen(){
    const content = document.querySelectorAll('.css-1dbjc4n.r-1loqt21.r-18u37iz.r-1ny4l3l.r-1udh08x.r-1qhn6m8.r-i023vh.r-o7ynqc.r-6416eg');
    for(let text in content){ 
        const post = content[text];
            try{
                for(const hideElement in hided){ 
                    let result = post.textContent.toLowerCase().includes(hided[hideElement].toLowerCase());   
                    if(result){ 
                        post.innerHTML = `<div style="height:100px;color:white;display:flex;cursor:pointer;justify-content:center;align-items:center;margin:auto;flex-direction:column;"><a>Conteúdo escondido</a><a>Palavra bloqueada: ${hided[hideElement]}</a></div>`
                    }
                }  
            }catch(err){

            } 
    }
    requestAnimationFrame(renderScreen)
}
