let root = document.querySelector(':root')
let app = Array.from(document.querySelectorAll('.app'))
let allTasks = Array.from(document.querySelectorAll('.task'))
let imageHeader = document.querySelector('.header-img')
let appBodyContent = document.querySelector('.app-body-content')
let appBodyOptions = document.querySelector('.app-body-options')
let allButton = document.querySelector('.all-tasks')
let input = document.querySelector('.main-input')
let activeButton = document.querySelector('.active-tasks')
let completedButton = document.querySelector('.completed-tasks')
let clearCompletedButton = document.querySelector('.clear-completed')
let itemsLeftParagraph = document.getElementsByClassName('items-left')[0]

let darkLightMode = document.querySelector('.light-dark-mode')
let moon = document.querySelector('.moon')
let sun = document.querySelector('.sun')

itemsLeftCalc()

function createNewTask(ele) {
    if(window.event.key === 'Enter') {
        if (ele.value === "" || ele.value === null) {
            window.event.preventDefault()
            return
        }

        window.event.preventDefault()
        // make div
        let myDiv = document.createElement('div')
        myDiv.classList.add("task") 

        // make form
        let myForm = document.createElement('form')
        myForm.classList.add("inner-form-task")
        let myInput = document.createElement('input')
        let idGen = Date.now().toString()
        myInput.classList.add("checkbox-input")
        myInput.type = "checkbox"
        myInput.id = idGen
        let myLabel = document.createElement("label")
        myLabel.setAttribute("for", idGen)
        myLabel.innerText = ele.value
        myLabel.classList.add("checkbox-label")
        
        // make close button
        let myParagraph = document.createElement('p')
        myParagraph.classList.add("close-button")
        myForm.appendChild(myInput)
        myForm.appendChild(myLabel)
        myDiv.appendChild(myForm)
        myDiv.appendChild(myParagraph)

        // check theme
        if (root.classList.contains('dark')) {
            myDiv.classList.add('dark')
            myParagraph.classList.toggle('dark')
        }

        appBodyContent.prepend(myDiv)
        let tempList = Array.from(appBodyContent.children)
        tempList.forEach(task => {
            task.style.display = "flex"
        })
        ele.value=""

        itemsLeftCalc()
        appBodyContent.dataset.empty = "false"
    }
}
document.addEventListener('click', e => {
    if(e.target && e.target.classList.contains('close-button')){
        let clickedCloseButton = e.target
        clickedCloseButton.parentElement.remove()
    }
    itemsLeftCalc()
    checkContentIsEmpty()
});
document.addEventListener('click', e => {
    if(e.target && e.target.classList.contains('checkbox-input')){
        e.target.parentElement.parentElement.classList.toggle('completed-task')
    }
    itemsLeftCalc()
});

allButton.addEventListener('click', e => {
    let tempList = Array.from(appBodyContent.children)
    tempList.forEach(task => {
        task.style.display = "flex"
    })
});

completedButton.addEventListener('click', e => {
    let tempList = Array.from(appBodyContent.children)
    tempList.forEach(task => {
        if (!task.classList.contains("completed-task")) {
            task.style.display = "none"
        }
        else {
            task.style.display = "flex"
        }
    })
});

activeButton.addEventListener('click', e => {
    let tempList = Array.from(appBodyContent.children)
    console.log(tempList)
    tempList.forEach(task => {
        if (!task.classList.contains("completed-task")) {
            task.style.display = "flex"
        }
        else {
            task.style.display = "none"
        }
    })
});

clearCompletedButton.addEventListener('click', e => {
    let tempList = Array.from(appBodyContent.children)
    console.log(tempList)
    tempList.forEach(task => {
        if (task.classList.contains("completed-task")) {
            appBodyContent.removeChild(task)
        }
    })
    itemsLeftCalc()
    checkContentIsEmpty()
});

function itemsLeftCalc() {
    let tempList = Array.from(appBodyContent.children)
    let count = 0
    tempList.forEach(task => {
        if (!task.classList.contains("completed-task")) {
            count += 1
        }
    })
    itemsLeftParagraph.dataset.num = count;
}

function checkContentIsEmpty() {
    let tempList = Array.from(appBodyContent.children)
    if (tempList.length > 0) {
        appBodyContent.dataset.empty = "false"
    }
    else {
        appBodyContent.dataset.empty = "true"
    }
}

// darm theme
function renderImage() {
    if (imageHeader.classList.contains('dark')) {
        imageHeader.src = "./Assets/Photos/bg-desktop-dark.jpg"
    }
    else {
        imageHeader.src = "./Assets/Photos/bg-desktop-light.jpg"
    }
}

darkLightMode.addEventListener('click', e => {
    if (moon.style.display === "none") {
        moon.style.display = "block"
        sun.style.display = "none"
    } else {
        moon.style.display = "none"
        sun.style.display = "block"
    }
    root.classList.toggle('dark')
    appBodyOptions.classList.toggle('dark')
    appBodyContent.classList.toggle('dark')
    input.classList.toggle('dark')
    
    app.forEach(item => {
        item.classList.toggle('dark')
    })
    let temp = Array.from(appBodyContent.children)
    temp.forEach(item => {
        item.classList.toggle('dark')
    })
    temp.forEach(item => {
        item.children[1].classList.toggle('dark')
    })
    imageHeader.classList.toggle('dark')
    renderImage()
})