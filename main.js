let pagesArr = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-el");
const saveTabBtn = document.getElementById("saveTab-el");
const clearBtn = document.getElementById("clear-el");
const pageList = document.getElementById("page-list")
let localLeads = JSON.parse(localStorage.getItem("pages"))

function renderList(leads){
    let listItems = ""
    for(let i = 0; i < pagesArr.length; i++){
        listItems += `
        <li>
        <a href="${leads[i]}" target="_blank">${leads[i]}</a>
        </li>
        `;
    }
    pageList.innerHTML = listItems
}

saveTabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        pagesArr.push(tabs[0].url);
        localStorage.setItem("pages", JSON.stringify(pagesArr));
        renderList(pagesArr)    
    })
})

if(localLeads){
    pagesArr = localLeads;
    renderList(pagesArr)
}

saveBtn.addEventListener("click", function(){
    pagesArr.push(inputEl.value);
    inputEl.value = ""
    localStorage.setItem("pages", JSON.stringify(pagesArr));
    renderList(pagesArr)
})

clearBtn.addEventListener("dblclick",function(){
    pageList.innerHTML = ""
    localStorage.clear();
})
