let myLeads = [];

const inputEl = document.getElementById("input-el")

const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("save-btn")

const ulEl = document.getElementById("ul-el");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

const tabs = [
    {url: "https://www.linkedin.com/in/per-harald-borgen/"}
]

saveBtn.addEventListener("click", function () {
    console.log(tabs[0].url)
})


deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear()
  myLeads = []
  ulEl.innerHTML = ""
  console.log("Button double clicked")
})

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads);
  console.log( localStorage.getItem("myLeads") )
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        </a>
      </li>
    `;
  }

  ulEl.innerHTML = listItems;
}
