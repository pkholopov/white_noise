const cnv = document.querySelector('canvas')
const c = cnv.getContext('2d')

const infoBox = document.querySelector('#info')


function setCnvSize(scaleFactor) {
  cnv.width = document.documentElement.clientWidth / scaleFactor
  cnv.height = document.documentElement.clientHeight / scaleFactor
  cnv.style.transform = `scale(${scaleFactor}, ${scaleFactor})`
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
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

  infoBox.innerHTML = `FPS: ${Math.round(fps)}`

  requestAnimationFrame(tick)
}

requestAnimationFrame(tick)

setCnvSize(3)

addEventListener('resize', () => setCnvSize(3))