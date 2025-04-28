const ojo = document.querySelector('.ojo');
const iris = document.querySelector('.iris');
const pupila = document.querySelector('.pupila');

document.addEventListener('mousemove', (e) => {
  const rect = ojo.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const x = e.clientX - centerX;
  const y = e.clientY - centerY;

  // Mover el iris (como antes)
  const maxMove = 300;
  const distanceX = Math.max(-maxMove, Math.min(maxMove, x));
  const distanceY = Math.max(-maxMove, Math.min(maxMove, y));
  iris.style.left = `calc(50% + ${distanceX}px)`;
  iris.style.top = `calc(50% + ${distanceY}px)`;

  // Calcular distancia al centro del ojo
  const distance = Math.sqrt(x * x + y * y);

  // Cambiar tamaño de la pupila según distancia
  if (distance < 200) {
    pupila.style.transform = "translate(-50%, -50%) scale(1.5)";
    iris.style.transform = "translate(-50%, -50%) scale(1.6)";
    ojo.style.borderRadius = "100% 0%"
  } else {
    pupila.style.transform = "translate(-50%, -50%) scale(1)";
    iris.style.transform = "translate(-50%, -50%) scale(1)";
    ojo.style.borderRadius = "70% 0%"
  }
});

function parpadear() {
  // Cierra el ojo
  ojo.classList.add('cerrado');

  // Abre el ojo después de 200ms (duración del parpadeo)
  setTimeout(() => {
    ojo.classList.remove('cerrado');
  }, 200);
}

// Parpadea de vez en cuando (cada 3 a 6 segundos, aleatoriamente)
function iniciarParpadeo() {
  const intervalo = Math.random() * 3000 + 3000; // entre 3000 y 6000 ms
  setTimeout(() => {
    parpadear();
    iniciarParpadeo(); // llama recursivamente para seguir parpadeando
  }, intervalo);
}
setTimeout(() => {
  iniciarParpadeo();
}, 2000);

