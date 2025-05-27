document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("journalForm");
  const entrieslist = document.getElementById("pastEntries");

  loadEntries();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const jentry = document.getElementById("jentry").value;
    const date = document.getElementById("dentry").value;

    const entry = {
      title,
      content: jentry,
      date: date,
    };

    saveEntry(entry);
    displayEntry(entry);
    form.reset();
  });
});

function saveEntry(entry) {
  let entries = JSON.parse(localStorage.getItem("entrieslist")) || [];
  entries.push(entry);
  localStorage.setItem("entrieslist", JSON.stringify(entries));
}

function loadEntries() {
  let entries = JSON.parse(localStorage.getItem("entrieslist")) || [];
  entries.forEach(displayEntry);
}

function displayEntry(entry) {
  const entriesList = document.getElementById("pastEntries");
  const li = document.createElement("li");
  li.innerHTML = `<strong>${entry.title}</strong> ${entry.content}<br/>${entry.date}`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Entry";
  deleteButton.style.margin.left = "10px";
  deleteButton.addEventListener("click", () => {
    deleteEntry(entry);
    li.remove();
  });

  li.appendChild(deleteButton);
  entriesList.appendChild(li);
}

function deleteEntry(entryToDelete) {
  let entries = JSON.parse(localStorage.getItem("entrieslist")) || [];

  entries = entries.filter(
    (entry) => !(
        entry.title === entryToDelete.title &&
        entry.content === entryToDelete.content &&
        entry.date === entryToDelete.date
      )
  );

  localStorage.setItem("entrieslist", JSON.stringify(entries));
}
