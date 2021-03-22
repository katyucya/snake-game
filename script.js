let canvas = document.getElementById('snake');
let context = canvas.getContext('2d'); // reinderiza o desenho
let box = 32; // tamanho de 32 pixel de cada quadrados
let snake = [];
snake[0] = {
  // o que tem dentro
  x: 8 * box,
  y: 8 * box,
};
let direction = 'right'; // criando variável com a direção da cobrinha
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

// criando a função, desenhando e definindo
function criarBG() {
  context.fillStyle = 'lightgreen'; // fillStyle trabalha com o estilo do texto
  // fillRect desenha o retângulo onde vai acontecer o jogo, 4 parâmetros
  // canvas terá a altura e largura de 16
  context.fillRect(0, 0, 16 * box, 16 * box);
}

// criando a cobrinha
function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'green';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// criando a comida
function drawFood() {
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
}

// aperta uma tecla e chama um evento
document.addEventListener('keydown', update);

function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left';
  if (event.keyCode == 38 && direction != 'down') direction = 'up';
  if (event.keyCode == 39 && direction != 'left') direction = 'right';
  if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// criar uma função que atualiza nosso jogo, em tempos em tewmpos, quanto terminar o o jogo parar
function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && sanke[0].y == snake[0].y) {
      clearInterval(jogo);
      alert('Game Over :(');
    }
  }
  criarBG();
  criarCobrinha();
  drawFood();

  // criar a posição da cobrinha
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // criando as cordenadas da cobrinha, onde vai seguir
  if (direction == 'right') snakeX += box;
  if (direction == 'left') snakeX -= box;
  if (direction == 'up') snakeY -= box;
  if (direction == 'down') snakeY += box;

  // função por retira os elementos do último array
  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  // nova cabeça
  // acrescenta uma a frente
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

// setInterval função de tempo
let jogo = setInterval(iniciarJogo, 100);
