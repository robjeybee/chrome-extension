let myLeads = [];

const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let trashBtns = document.querySelectorAll(".trash-btn");

const ulEl = document.getElementById("ul-el");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        </a>
        <a class="trash-btn" /><span class="material-symbols-outlined">
delete
</span>
        <a/>
      </li>
    `;
  }

  ulEl.innerHTML = listItems;

  trashBtns = document.querySelectorAll(".trash-btn");

  for (let i = 0; i < trashBtns.length; i++) {
    trashBtns[i].addEventListener("click", function () {
      deleteLead(i);
    });
  }
}

function deleteLead(index) {
  myLeads.splice(index, 1);

  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
}
