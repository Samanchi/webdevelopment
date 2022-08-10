let addBtn = document.getElementById("add-btn");
let title = document.getElementById("title");
let note = document.getElementById("text");


addBtn.addEventListener("click", (e) => {
    if (title.value == "") {
        return alert("Add title to submit notes.")
    }


    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: title.value,
        note: note.value
    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    title.value = "";
    note.value = "";


    showNotes();
})



//showing notes on page
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (elements, index) {
        html += `
                <div id="note">
                    <p class="note-counter">Note ${index + 1}</p>
                    <h3 class="note-title">${elements.title}</h3>
                    <p class="note-text">${elements.note}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="note-btn">Delete</button>
                    <button id="${index}" onclick="editNote(this.id)" class="edit-btn">Edit</button>
                    <button id="${index}" onclick="archive(this.id)" class="note-btn">Archive</button>
                    <button id="${index}" onclick="backup(this.id)" class="edit-btn">Backup</button>
                    
                </div>
`;
    });
    let noteElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteElm.innerHTML = html;

    }

    else {
        noteElm.innerHTML="No Notes Available to show.Please create one to show."
    }

}



//delete notes function
function deleteNote(index) {
    let confirmDel = confirm("Are you sure you want to delete the notes?");
    

    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];

        }
        else {
            notesObj = JSON.parse(notes);
        }


        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();

    }

}



//edit notes function

function editNote(index) {
    let notes = localStorage.getItem("notes");
    if (title.value !== "" || note.value !== "") {
        return alert("clear the fields to edit the notes");
    }
    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);
    notesObj.findIndex((element, index) => {
        title.value = element.title;
        note.value = element.note;
    })

    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}





showNotes();