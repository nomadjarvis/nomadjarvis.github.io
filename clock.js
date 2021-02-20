const clockContainer = document.querySelector(".js-clock"), 
  dayContainer = document.querySelector(".js-day")
  clockTitle = clockContainer.querySelector("h4"),
  dayTitle = dayContainer.querySelector("h6");


function getTime(){
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  const today = date.toLocaleDateString();
  const week = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT')
  clockTitle.innerText = `${hours< 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  dayTitle.innerText = `📅 ${today} ${week[date.getDay()]}` 
}

function init(){
 getTime();
 setInterval(getTime, 1000);
}

init();