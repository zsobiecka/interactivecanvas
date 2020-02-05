const canvas = document.querySelector("canvas")

const c = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let mouse = {
  x: undefined,
  y: undefined,
}

const maxRadius = 40
const minRadius = 2

const colorArray = ["#96ceb4", "#ffeead", "#ff6f69", "#ffcc5c", "#88d8b0"]

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  init()
})

function Circle(x, y, dx, dy, radius) {
  //define properites
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius // we add this to reference this specific circle we draw
  this.minRadius = radius // is shrinking to original size
  this.color = c.fillStyle =
    colorArray[Math.floor(Math.random() * colorArray.length)]

  //draw the circle
  this.draw = function() {
    c.beginPath() // to start new path independent from line
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = "blue"
    c.fillStyle = this.color
    c.fill()
  }

  //set the trajectory and speed(velocity)

  //it bounces when it approaches the boarder
  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }

    //define a speed
    this.x += this.dx // velocity - the spead in which is moving in some direction
    this.y += this.dy

    //interactivity

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1
    }

    this.draw()
  }
}

//create a circle array
let circleArray = []

function init() {
  circleArray = []
  // create a starting postion and radius to push it to circleArray
  for (let i = 0; i < 2400; i++) {
    const radius = Math.random() * 3 + 1 // + 1 so we know the minimum radius is 1
    const x = Math.random() * (innerWidth - radius * 2) + radius // random position from which circle is starting // - radius * 2) + radius - it bounces on the boarder not from the inside
    const y = Math.random() * (innerHeight - radius * 2) + radius // random position from which circle is starting
    const dx = Math.random() - 0.5 // randomise velocity (-0.5 it can be positive and negative)
    const dy = Math.random() - 0.5
    circleArray.push(new Circle(x, y, dx, dy, radius)) // we want  to push a new circle to circleArray every time the circle is drown
  }
}

// animate the circles
function animate() {
  requestAnimationFrame(animate) // requestAnimationFrame is crating loop for us, in this case of all the function animate
  c.clearRect(0, 0, innerWidth, innerHeight) // this function clear the path every time the page is refreshing

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update()
  }
}

animate()

init()
