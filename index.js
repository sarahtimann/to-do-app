const toDoArr = []; // Array til at gemme todo-objekter

const submit = document.querySelector("#submit"); // Tilføj (+) knappen
const todoNameInput = document.querySelector("#todo_name_input"); // Inputfelt til opgavenavn
const todoContainer = document.querySelector("#todo_container"); // Container til at vise todo-liste
const priorityInput = document.querySelector("#todo_priority_input"); // Inputfelt til opgaveprioritet

submit.addEventListener("click", subMitTodo); // Når der klikkes på tilføj knappen, kaldes funktionen subMitTodo

function subMitTodo(evt) {
  // Når der klikkes på tilføj knappen
  document.querySelector("#plus_sound").play(); // Afspil lyd ved tilføjelse
  const todoObj = {
    // Opret et nyt todo-objekt
    name: todoNameInput.value, // Navn fra inputfelt
    priority: priorityInput.value, // Prioritet fra inputfelt
    id: self.crypto.randomUUID(), // Unikt ID genereret ved hjælp af crypto API
    done: false, // Standardværdi for udført status
  };
  toDoArr.unshift(todoObj); // Tilføj det nye objekt til starten af arrayet
  console.log("toDoArr 1", toDoArr);
  writeTodos(); // Opdater visningen af todo-listen
}

function writeTodos() {
  // Funktion til at opdatere visningen af todo-listen
  console.log("writeTodos");
  todoContainer.innerHTML = ""; // Ryd den nuværende visning
  // Sortér så ikke-udførte opgaver vises øverst
  toDoArr.sort((a, b) => a.done - b.done); // Sorter efter done status
  toDoArr.forEach((todoObj) => {
    // Gå igennem hvert todo-objekt i arrayet
    let isChecked; // Variabel til at holde checkbox status
    if (todoObj.done === true) {
      // Hvis opgaven er markeret som udført
      isChecked = "checked"; // Sæt checkbox til checked
      document.querySelector("#checked_sound").play(); // Afspil lyd ved markering
    } else {
      // Hvis opgaven ikke er udført
      isChecked = ""; // Sæt checkbox til unchecked (tom streng)
    }

    todoContainer.innerHTML += `<li data-id="${todoObj.id}">
<h3>${todoObj.name} (${todoObj.priority})</h3>
  <div class="todo-li">
  <input type="checkBox" name="todoCheck" ${isChecked} />
  <button class="delete-btn">Slet</button>
</div>
</li>`;
  });

  todoContainer.querySelectorAll("li").forEach((li) => {
    // Tilføj event listeners til hver li i todoContainer
    const checkbox = li.querySelector("input"); // Find checkbox i li
    checkbox.addEventListener("click", (evt) => {
      // Når der klikkes på checkbox
      evt.preventDefault(); // Forhindre standard checkbox opførsel
      const correspondingDataObj = toDoArr.find((toDo) => toDo.id === li.dataset.id); // Find det tilsvarende objekt i arrayet ved hjælp af data-id
      correspondingDataObj.done = !correspondingDataObj.done; // Toggle done status, den vil få status true i konsollen
      //   console.log("correspondingDataObj", correspondingDataObj);
      console.log("toDoArr 2", toDoArr);
      writeTodos(); // Opdater visningen
    });

    const deleteBtn = li.querySelector(".delete-btn"); // Find slet knappen i li
    deleteBtn.addEventListener("click", () => {
      // Når der klikkes på slet knappen
      document.querySelector("#delete_sound").play(); // Afspil lyd ved sletning
      const id = li.dataset.id; // Hent id fra data-id attributten
      const index = toDoArr.findIndex((todo) => todo.id === id); // Find index i arrayet baseret på id
      if (index !== -1) {
        // Hvis index er gyldigt
        toDoArr.splice(index, 1); // Fjern objektet fra arrayet
        writeTodos(); // Opdater visningen
      }
    });
  });
}
