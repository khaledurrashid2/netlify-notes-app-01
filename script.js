async function loadNotes(){

  const res = await fetch("/.netlify/functions/notes");
  const notes = await res.json();

  const list = document.getElementById("notes");
  const emptyMessage = document.getElementById("emptyMessage");

  list.innerHTML = "";

  if(notes.length === 0){
    emptyMessage.textContent = "No notes stored";
    return;
  }

  emptyMessage.textContent = "";

  notes.forEach(n => {

    const li = document.createElement("li");

    li.textContent = n.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "deleteBtn";

    delBtn.onclick = () => deleteNote(n.id);

    li.appendChild(delBtn);

    list.appendChild(li);

  });

}

async function addNote(){

  const input = document.getElementById("noteInput");
  const text = input.value.trim();

  if(text === "") return;

  await fetch("/.netlify/functions/notes",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({text:text})
  });

  input.value="";

  loadNotes();
}

async function deleteNote(id){

  await fetch("/.netlify/functions/notes",{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({id:id})
  });

  loadNotes();
}

loadNotes();
