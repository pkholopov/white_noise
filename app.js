const cnv        = document.querySelector('canvas')
const c          = cnv.getContext('2d')

const infoBox    = document.querySelector('#info')
const fpsInfo    = document.querySelector('#fps')
const fsBtn      = document.querySelector('#fullscreen')
const scaleInput = document.querySelector('#scale')
const hideBtn    = document.querySelector('#hideBtn')

let scaleFactor  = 3

// functions

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function setCnvSize(scaleFactor) {
  cnv.width = document.documentElement.clientWidth / scaleFactor + 3 // random number =)
  cnv.height = document.documentElement.clientHeight / scaleFactor + 3
  cnv.style.transform = `scale(${scaleFactor})`
}

function toggleCursor() {
  cnv.style.cursor === 'none' ? cnv.style.cursor = 'auto' : cnv.style.cursor = 'none'
}

function togglePannel() {
  infoBox.classList.toggle('hideInfo')
  hideBtn.classList.toggle('hideBtnFade')
  if (!hideBtn.classList.contains('hideBtnFade')) {
    hideBtn.innerHTML = 'Hide'
  } else {
    hideBtn.innerHTML = 'Show'
  }
}

let isFS = false
function toggleFullscreen() {
  if (!isFS) {
    document.documentElement.requestFullscreen()
    isFS = true
  } else {
    document.exitFullscreen()
    isFS = false
  }
}

function setScale(e) {
  if (e.target.value < 6) {
    scaleFactor = e.target.value
    setCnvSize(scaleFactor)
  } else {
    e.target.value = scaleFactor
  }
  
}

let lastUpdate = 0
function tick(timestamp) {

  let delta = timestamp - lastUpdate
  lastUpdate = timestamp
  let fps = 1000 / delta

  let imgData = c.createImageData(cnv.width, cnv.height)
  for (let i = 0; i < imgData.data.length; i += 4) {
    const color = getRandomInt(0, 255)
    imgData.data[i] = color
    imgData.data[i + 1] = color
    imgData.data[i + 2] = color
    imgData.data[i + 3] = 255    
  }
  c.putImageData(imgData, 0, 0)

  fpsInfo.innerHTML = `FPS: ${Math.round(fps)}`

  requestAnimationFrame(tick)
}


requestAnimationFrame(tick)

setCnvSize(scaleFactor)

// event listeners

addEventListener('resize', () => setCnvSize(scaleFactor))

cnv.addEventListener('dblclick', toggleCursor)

hideBtn.addEventListener('click', togglePannel)

fsBtn.addEventListener('click', toggleFullscreen)

scaleInput.addEventListener('change', setScale)