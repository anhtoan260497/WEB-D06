const searchInput = document.querySelector(".search-input");
const searchSubmit = document.querySelector(".search-submit");

const addInput = document.querySelector(".add-input");
const addSubmit = document.querySelector(".add-submit");

const todoContainer = document.querySelector(".todo-container");
const todoItem = document.querySelector(".todo-item");

const todoDeleteBtn = document.querySelector(".todo-item-delete");

let searchKeyword
let addKeyword = "";

let  todoArr = JSON.parse(localStorage.getItem('todo')) || []

let todoFilterArr = [];

window.onload = function() {
    todoContainer.innerHTML = "";
    for (let i = 0; i < todoArr.length; i++) {
      todoContainer.innerHTML += ` <div class="todo-item" idx=${i}>
          <p class='run'>${todoArr[i]}</p>
          <button class='todo-item-delete' onclick="handleDelete(${i})"><i class="fa-solid fa-xmark"></i></button>
        </div>`;
    }
}

searchInput.addEventListener("input", (e) => {
  searchKeyword = e.target.value;
});

searchSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchKeyword === "" || !searchKeyword) {
    todoContainer.innerHTML = "";
    for (let i = 0; i < todoArr.length; i++) {
      todoContainer.innerHTML += ` <div class="todo-item" idx=${i}>
        <p class='run'>${todoArr[i]}</p>
        <button class='todo-item-delete' onclick="handleDelete(${i})"><i class="fa-solid fa-xmark"></i></button>
      </div>`;
    }
    return;
  }

  todoFilterArr = todoArr.filter((item) => item.includes(searchKeyword));
  todoContainer.innerHTML = "";
  for (let i = 0; i < todoFilterArr.length; i++) {
    todoContainer.innerHTML += ` <div class="todo-item" idx=${i}>
        <p class='run'>${todoFilterArr[i]}</p>
        <button class='todo-item-delete' onclick="handleDelete(${i})"><i class="fa-solid fa-xmark"></i></button>
      </div>`;
  }
});

addInput.addEventListener("input", (e) => {
  addKeyword = e.target.value;
});

addSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  for (let i = 0; i < todoArr.length; i++) {
    if (addKeyword === todoArr[i]) return;
  }
  todoArr.push(addKeyword);

  todoContainer.innerHTML = "";
  for (let i = 0; i < todoArr.length; i++) {
    todoContainer.innerHTML += ` <div class="todo-item" idx=${i}>
        <p class='run'>${todoArr[i]}</p>
        <button class='todo-item-delete' onclick="handleDelete(${i})"><i class="fa-solid fa-xmark"></i></button>
      </div>`;
  }
  localStorage.setItem('todo',JSON.stringify(todoArr))
}
);

todoItem.addEventListener("click", () => {
  console.log("a");
});

const handleDelete = (idx) => {
  const isConfirm = confirm("Delete this to do work ?");
  if (!isConfirm) return;
  todoArr.splice(idx, 1);
  todoContainer.innerHTML = "";
  for (let i = 0; i < todoArr.length; i++) {
    todoContainer.innerHTML += ` <div class="todo-item" idx=${i}>
            <p class='run'>${todoArr[i]}</p>
            <button class='todo-item-delete' onclick="handleDelete(${i})"><i class="fa-solid fa-xmark"></i></button>
          </div>`;
  }
};