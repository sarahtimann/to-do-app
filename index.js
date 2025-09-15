const toDoArr = [];

const submit = document.querySelector("#submit");
const todoNameInput = document.querySelector("#todo_name_input");
const todoContainer = document.querySelector("#todo_container");

submit.addEventListener("click", subMitTodo);

function subMitTodo(evt) {
  const todoObj = {
    name: todoNameInput.value,
    id: self.crypto.randomUUID(),
    done: false,
  };
  toDoArr.unshift(todoObj);
  console.log("toDoArr 1", toDoArr);
  writeTodos();
}

function writeTodos() {
  console.log("writeTodos");
  todoContainer.innerHTML = "";
  toDoArr.forEach((todoObj) => {
    let isChecked;
    if (todoObj.done === true) {
      isChecked = "checked";
    } else {
      isChecked = "";
    }

    // todoContainer.innerHTML += `<li>er et LI element</li>`;
    //     todoContainer.innerHTML += `<li> <h2>${todoObj.name}</h2>    <input type="checkBox" name="todo" ${todoObj.done ? "checked" : ""} /></li>`;
    todoContainer.innerHTML += `<li data-id="${todoObj.id}"> <h3>${todoObj.name}</h3>    <input type="checkBox" name="todoCheck" ${isChecked} /></li>`;
  });
  todoContainer.querySelectorAll("li").forEach((li) => {
    const checkbox = li.querySelector("input");
    checkbox.addEventListener("click", (evt) => {
      evt.preventDefault(); // Forhindre standard checkbox opførsel
      const correspondingDataObj = toDoArr.find((toDo) => toDo.id === li.dataset.id);
      correspondingDataObj.done = !correspondingDataObj.done; // Toggle done status, den vil få status true i konsollen
      //   console.log("correspondingDataObj", correspondingDataObj);
      console.log("toDoArr 2", toDoArr);
      writeTodos(); // Opdater visningen
    });
  });
}
