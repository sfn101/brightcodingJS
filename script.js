// selecting DOM elements
const list = document.querySelector("ul");
const form = document.querySelector("form");

// function to delete the member from front end after it ben deleted in the database
const deleteLi = id => {
  const lis = document.querySelectorAll("li[member-id]");

  lis.forEach(li => {
    if (li.getAttribute("member-id") === id) {
      li.remove();
    }
  });
};

//function for deleting member from the database
list.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    if (confirm("are you sure you want to delete this member ?")) {
      const id = e.target.parentElement.getAttribute("member-id");
      db.collection("project members")
        .doc(id)
        .delete()
        .then(() => console.log("member has been deleted"))
        .catch(err => console.error(err));
    }
  }
});

//function to add member to the database
form.addEventListener("submit", e => {
  e.preventDefault();

  const member = {
    username: form.username.value,
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    active: form.active.checked ? "yes" : "no",
  };
  // console.log(member);
  db.collection("project members")
    .add(member)
    .then(() => {
      form.reset();
      console.log("member has been added");
    })
    .catch(err => console.error(err));
});

// function to add the member info to the page
const addMember = (member, id) => {
  const html = /*html*/ `<li member-id="${id}"">
    <h3>${member.username}</h3>
    <span>first name: ${member.firstName}</span></br>
    <span>last name: ${member.lastName}</span></br>
    <span> active: ${member.active}</span>
    <button class="delete">delete</button>
  </li>`;
  list.innerHTML += html;
};

//executing all the functions to the database
db.collection("project members").onSnapshot(snap => {
  // console.log(snap.docChanges());
  if (snap.docChanges().length !== 0) {
    list.parentElement.style.display = "flex";
  }
  snap.docChanges().forEach(member => {
    if (member.type === "added") {
      // console.log(snap.docChanges());
      if (list.parentElement.style.display === "none") {
        list.parentElement.style.display = "flex";
      }
      addMember(member.doc.data(), member.doc.id);
    } else if (member.type === "removed") {
      deleteLi(member.doc.id);
      if (list.childElementCount === 0) {
        list.parentElement.style.display = "none";
      }
    } else {
      console.log(`database ${member.doc.id} has been edited
`);
    }
  });
});
