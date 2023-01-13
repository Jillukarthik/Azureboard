var draggables = document.querySelectorAll(".draggable"); //child
var containers = document.querySelectorAll(".container"); //parent

//counting tasks
var incompleteCount = document.getElementById("incomplete-count");
var inProcessCount = document.getElementById("inProcess-count");
var CompletedCount = document.getElementById("Completed-count");

let draggedmessage = document.querySelector(".dragged__message");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
    countCard();
    // message();
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    // console.log(afterElement);  refering to next element
    // draggable.lastElementChild.textContent = "success";
    // console.log(draggable.lastElementChild);
    if (afterElement == null) {
      //while adding last or down

      async function message() {
        let p = new Promise((resolve) => {
          setTimeout(() => {
            resolve((draggable.lastElementChild.style.display = "none"));
          }, 1500);
        });
        draggable.lastElementChild.style.display = "block"; 
        draggable.lastElementChild.textContent = "success!!!";

        container.appendChild(draggable);
        let result = await p;
      }
      message();
    } else {
      async function message() {
        let p = new Promise((resolve) => {
          setTimeout(() => {
            resolve((draggable.lastElementChild.style.display = "none"));
          }, 1500);
        });
        draggable.lastElementChild.style.display = "block";
        container.insertBefore(draggable, afterElement);
        draggable.lastElementChild.textContent = "success!!!";

        let result = await p;
      }
      message();
      //inserting in middle  and inserting in top
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  //pro
  // console.log(draggableElements);
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      //getting the size of the box
      const offset = y - box.top - box.height / 2;
      // console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        //for adding in top
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function countCard() {
  const incomplete = document.querySelector(".incomplete");
  const inprogress = document.querySelector(".inprogress");
  const completed = document.querySelector(".completed");
  incompleteCount.textContent = `${incomplete.children.length - 1}`;
  inProcessCount.textContent = `${inprogress.children.length - 1}`;
  CompletedCount.textContent = `${completed.children.length - 1}`;
  console.log(inprogress);
}

countCard();
