const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finList = document.querySelector(".js-finList");

const TODOS_LS = "toDos";
const FIN_LS = "fins";

let toDos = [];
let fins = [];

function saveFins() {
  localStorage.setItem(FIN_LS, JSON.stringify(fins));
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = (toDos.length + 1).toString();
  span.innerText = text;
  delBtn.innerText = "❌";
  finBtn.innerText = "🚩";
  delBtn.addEventListener("click", deleteToDo);
  finBtn.addEventListener("click", finishToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const idx = toDos.findIndex(function (target) {
    return target.id === li.id;
  });
  toDos.splice(idx, 1);
  saveToDos();
  saveFins();
}

function finishToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const idx = toDos.findIndex(function (target) {
    return target.id === li.id;
  });
  toDos.splice(idx, 1);
  paintFin(li.childNodes[0].innerText);
  saveToDos();
  saveFins();
}

function paintFin(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const rstBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = (fins.length + 1).toString();
  span.innerText = text;
  delBtn.innerText = "❌";
  rstBtn.innerText = "👀";
  delBtn.addEventListener("click", deleteFins);
  rstBtn.addEventListener("click", notFinished);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(rstBtn);
  li.id = newId;
  finList.appendChild(li);
  const finObj = {
    text: text,
    id: newId
  };
  fins.push(finObj);
  saveFins();
}

function deleteFins(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finList.removeChild(li);
  const idx = fins.findIndex(function (target) {
    return target.id === li.id;
  });
  fins.splice(idx, 1);
  saveToDos();
  saveFins();
}

function notFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finList.removeChild(li);
  const idx = fins.findIndex(function (target) {
    return target.id === li.id;
  });
  fins.splice(idx, 1);
  paintToDo(li.childNodes[0].innerText);
  saveToDos();
  saveFins();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadFins() {
  const loadedFins = localStorage.getItem(FIN_LS);
  if (loadedFins !== null) {
    const parsedFins = JSON.parse(loadedFins);
    parsedFins.forEach(function (fin) {
      paintFin(fin.text);
    });
  }
}

function init() {
  loadToDos();
  loadFins();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
