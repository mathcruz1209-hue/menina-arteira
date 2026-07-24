const canvas = document.getElementById('fundo-particulas');
const ctx = canvas.getContext('2d');


let largura = window.innerWidth;
let altura = window.innerHeight;

canvas.width = largura;
canvas.height = altura;

let particulas = [];

function Particula(){
  this.x = Math.random() * largura;
  this.y = Math.random() * altura;
  this.vx = (Math.random() - 0.5) * 0.5;
  this.vy = (Math.random() - 0.5) * 0.5;
}

for(let i = 0; i < 100; i++){
  particulas.push(new Particula());
}
function animar(){

  ctx.fillStyle = "rgba(26, 24, 24, 0.15)";
  ctx.fillRect(0, 0, largura, altura);

  particulas.forEach(p => {

    p.x += p.vx;
    p.y += p.vy;

    if(p.x < 0) p.x = largura;
    if(p.x > largura) p.x = 0;
    if(p.y < 0) p.y = altura;
    if(p.y > altura) p.y = 0;

    ctx.fillStyle = "#f19ab7";
    ctx.fillRect(p.x, p.y, 2, 2);

  });

  requestAnimationFrame(animar);
}

animar();

window.addEventListener("resize", () => {
  largura = window.innerWidth;
  altura = window.innerHeight;
  canvas.width = largura;
  canvas.height = altura;
});