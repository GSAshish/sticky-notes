const appEl = document.querySelector(".notes-app");
const addBtn = document.querySelector(".btn");
const olddata = JSON.parse(localStorage.getItem("sticky_notes"));
let data = olddata === null ? [] : olddata;
function renderOldData() {
  if (data.length > 0) {
    data.forEach((item, index) => {
      const div = createoldElemnt(index, item);
      appEl.insertBefore(div, addBtn);
    });
  }
}
renderOldData();

//UPDATING LOCALSTORAGE
function updateHandler() {
  localStorage.removeItem("sticky_notes");
  localStorage.setItem("sticky_notes", JSON.stringify(data));
}
// EDITING HANDLER
function onEditHandler(e) {
  let id = e.target.getAttribute("id");
  const index = id.split("_")[1];
  data[+index] = e.target.textContent;
  updateHandler();
}
// DELETE HANDLER
function onDeleteHandler(e) {
  let id = e.target.getAttribute("id");
  e.target.classList.add("hidden");
  const index = id.split("_")[1];
  data.splice(+index - 1, 1);
  updateHandler();
}
// CREATE element
function createnewElement(index, text) {
  const div = document.createElement("div");
  div.classList.add("notes");
  div.setAttribute("contenteditable", true);
  div.setAttribute("id", `s_${index}`);
  div.setAttribute("oninput", "onEditHandler(event);");
  div.setAttribute("title", "one click to edit\ndouble click to delete");
  div.setAttribute("ondblclick", "onDeleteHandler(event);");
  div.setAttribute("placeholder", "Enter text here...");
  div.textContent = text;
  data.push(text);
  return div;
}
// CREATING OLD ELEMENT
function createoldElemnt(index, text) {
  const div = document.createElement("div");
  div.classList.add("notes");
  div.setAttribute("contenteditable", true);
  div.setAttribute("id", `s_${index}`);
  div.setAttribute("oninput", "onEditHandler(event);");
  div.setAttribute("ondblclick", "onDeleteHandler(event);");
  div.setAttribute("placeholder", "Enter text here...");
  div.textContent = text;
  return div;
}
function onAddHandler(e) {
  const div = createnewElement(data.length, "");
  appEl.insertBefore(div, e.target);
  updateHandler();
}
// clear All
function onClearAll(e) {
  const notesEl = document.querySelectorAll(".notes");

  notesEl.forEach((note) => {
    note.classList.add("hidden");
  });
  data = [];
  updateHandler();
}
