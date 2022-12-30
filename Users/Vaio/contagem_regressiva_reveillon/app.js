const contentDay = document.getElementById("dias");
const contentHours = document.getElementById("horas");
const contentMinutes = document.getElementById("minutos");
const contentSeconds = document.getElementById("segundos");
const anoNovo = document.getElementById("anoNovo");

const newYear = new Date().getFullYear() + 1;
const newYearTime = new Date(`January 01 ${newYear} 00:00:00`);

const containerContador = () => {
  const toDay = new Date();
  const difference = newYearTime - toDay;

  const day = Math.floor(difference / 1000 / 60 / 60 / 24);
  const hours = Math.floor(difference / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(difference / 1000 / 60) % 60;
  const seconds = Math.floor(difference / 1000) % 60;

  contentDay.textContent = day < 10 ? "0" + day : day;
  contentHours.textContent = hours < 10 ? "0" + hours : hours;
  contentMinutes.textContent = minutes < 10 ? "0" + minutes : minutes;
  contentSeconds.textContent = seconds < 10 ? "0" + seconds : seconds;

  anoNovo.textContent = newYear;
};

setInterval(containerContador, 1000);
