let textContent = document.querySelector(".encrypt-decrypt-area")
let mainContainer = document.querySelector(".main-container")
let output = document.querySelector(".output")
let encryptBtn = document.querySelector(".btn-encrypt")
let decryptBtn = document.querySelector(".btn-decrypt")
let message = document.querySelector(".message")
let copySpace = document.querySelector(".copy-space")
let copyBtn = document.querySelector(".btn-copy")
let aside = document.querySelector(".aside-container")
let bodyContainer = document.querySelector(".body-container")

let map = new Map([["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]]);

function change(text, encrypt=true) {
    if (encrypt) {
        for (i=0; i in [0,1,2,3,4]; i++) {
            letter = Array.from(map.keys())[i]   
            word = map.get(Array.from(map.keys())[i]);
            console.log(letter, word, text)
            text = text.replace(new RegExp(letter, "g"), word);              
            }
    }else{
        for (i=4; i in [0,1,2,3,4]; i--) {
            letter = Array.from(map.keys())[i]
            word = map.get(Array.from(map.keys())[i]);
            text = text.replace(new RegExp(word, "g"), letter); 
        }
    }
    return text
}

function validation(text) {
    if (/[^a-zA-Z0-9 ]/.test(text)) {
        alert("Por favor, não use caracteres acentuados ou símbolos no campo de entrada");
        event.preventDefault();
    }
}


encryptBtn.addEventListener("click", () => {
    let text = textContent.value
    validation(text)
    textOutPut = change(text, encrypt=true)
})

decryptBtn.addEventListener("click", () => {
    let text = textContent.value
    validation(text)
    textOutPut = change(text, encrypt=false)
})

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(output.innerText).then(output.innerHTML = "");
})

mainContainer.addEventListener("submit", function(event) {
    event.preventDefault();
    message.style.display = "none";
    output.style.display = "block";
    copySpace.style.display = "flex";
    aside.style.gridTemplateRows = "calc(100% - 70px) 70px";
    output.innerHTML = "";
    output.innerHTML = textOutPut
    watch();
})

window.addEventListener("resize", () => {
    watch()
});

function watch() {
    if (document.body.clientWidth > 500 && document.body.clientWidth <= 950) { 
        if (textOutPut) {
            bodyContainer.style.gridTemplateColumns = "1fr";
            bodyContainer.style.gridTemplateRows = "10vh 60vh 25vh 5vh";
        }
    }else if (document.body.clientWidth <= 500) { 
        if (textOutPut) {
            bodyContainer.style.gridTemplateColumns = "1fr";
            bodyContainer.style.gridTemplateRows = "10vh 70vh 50vh 5vh";
        }
    }else{
        if (textOutPut) {
            bodyContainer.style.gridTemplateColumns = "3fr 1.1fr";
            bodyContainer.style.gridTemplateRows = "12vh 83vh 5vh";
            bodyContainer.style.gridTemplateAreas = "h a"
                                                    "m a"
                                                    "f f"
        }
    }
}