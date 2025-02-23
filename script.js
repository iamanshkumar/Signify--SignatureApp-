const colorPicker = document.getElementById('colorPicker')
const canvasColor = document.getElementById('canvasColor') 
const canvas = document.getElementById('myCanvas')
const fontPicker = document.getElementById('fontSize')
const clearBtn = document.getElementById('clearButton')
const saveBtn = document.getElementById('saveButton')
const retrieveBtn = document.getElementById('retrieveButton')
const ctx = canvas.getContext('2d')

let isDrawing = false
let lastX = 0
let lastY = 0

ctx.fillStyle = "white";  
ctx.fillRect(0, 0, canvas.width, canvas.height);

colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value
    ctx.fillStyle = e.target.value
})

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true
    lastX = e.offsetX
    lastY = e.offsetY
})

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()

        lastX = e.offsetX
        lastY = e.offsetY
    }
})

canvas.addEventListener('mouseup', () => {
    isDrawing = false
})

canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value
    ctx.fillRect(0, 0, canvas.width, canvas.height) // Fixed
})

fontPicker.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value
})

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

saveBtn.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL())

    let link = document.createElement('a')
    link.download = "my-canvas.png"
    link.href = canvas.toDataURL()
    link.click()
})

retrieveBtn.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents')

    if (savedCanvas) {
        let img = new Image()
        img.src = savedCanvas
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
        }
    }
})