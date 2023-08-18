/////////////////////////////////// HTML elements/////////////////////////////////
let newTaskBtn=document.querySelector("#newTask");
let modal=document.querySelector("#modal");
let descriptionInput=document.querySelector("#description")
let titleInput=document.querySelector("#title")
let categoryInput=document.querySelector("#category")
let statusInput=document.querySelector("#status")
let addBtn=document.querySelector("#addBtn")
let nextUpTasksContainer = document.getElementById("toDo");
let inProgressTasksContainer = document.getElementById("inProgress");
let doneTasksContainer = document.getElementById("done");
let root=document.querySelector(":root")
let modeBtn=document.querySelector("#mode")
var nextUpCountElement = document.getElementById("nextUpCount");
var inProgressCountElement = document.getElementById("inProgressCount");
var doneCountElement = document.getElementById("doneCount");
let gridBtn=document.querySelector('#gridBtn');
let barsBtn=document.querySelector('#barsBtn')
let nextUpSection=document.querySelector(".next-up")
let inprogressSection=document.querySelector(".in-progress")
let doneSection=document.querySelector(".done")
var sections = document.querySelectorAll("section");
var tasksContainer = document.querySelectorAll(".tasks");
var remainingCounterElement = document.getElementById("remainingCounter");
var body = document.body;
var searchInput = document.getElementById("searchInput");

////////////////////////////////////////////// variables ////////////////////////////////////////

let tasksArr= JSON.parse(localStorage.getItem("task")) ||[]

let containers={
    nextUp:document.querySelector(".next-up"),
    inProgress:document.querySelector(".in-progress"),
    done:document.querySelector(".done")
}
let globalIndex=0;

for(let i=0;i<tasksArr.length;i++){
    displayTask(i)
}
let updatedIndex;

var titleRegex = /^\w{3,}(\s\w+)*$/;
var descriptionRegex = /^(?=.{5,100}$)\w{1,}(\s\w*)*$/;

var nextUpCount = 0;
var inProgressCount = 0;
var doneCount = 0;
var remainingCounter = 100;


//////////////////////////////////////// functions /////////////////////////////////////////

function showModal(){

    scroll(0, 0);
    body.style.overflow = "hidden";
modal.classList.replace("d-none","d-flex")

}
function hideModal(){
    modal.classList.replace("d-flex","d-none")
    
    clearInput()
    body.style.overflow = "auto";
}

function addTask(){

    let task={
        status:statusInput.value,
        category:categoryInput.value,
        title:titleInput.value,
    description:descriptionInput.value
    }
    tasksArr.push(task)
    localStorage.setItem("task",JSON.stringify(tasksArr))
    
    globalIndex=tasksArr.length-1
// console.log(tasksArr)

}

function displayTask(index){

let x=tasksArr[index].status


containers[x].querySelector(".tasks").innerHTML+=`
<div class="task">
<h3 class="text-capitalize">${tasksArr[index].title}</h3>
<p class="description text-capitalize">${tasksArr[index].description}</p>
<h4 class="category ${tasksArr[index].category} text-capitalize">${tasksArr[index].category}</h4>
<ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
  <li><i class="bi bi-pencil-square" onclick="getData(${index})"></i></li>
  <li><i class="bi bi-trash-fill" onclick="deleteTask(${index})"></i></li>
  <li><i class="bi bi-palette-fill" onclick="changeBgColor(event)"></i></i></li>
</ul>
</div>
`


setHTMLocation(x);
}

function generateRondomColor(){
    let colorArr=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];

let color='#';
for(let i=0;i<6;i++){
   let random=colorArr[Math.trunc(Math.random()*16 )]
    color+= random
}
return color + 'aa'
}

function changeBgColor(e){
    console.log( e.target.parentElement.parentElement.parentElement)
    e.target.parentElement.parentElement.parentElement.style.backgroundColor=generateRondomColor()
}

function deleteTask(index){
    tasksArr.splice(index,1);
    localStorage.setItem("task",JSON.stringify(tasksArr))

resetTasksContainer()
resetCount();
    for(let i=0;i<tasksArr.length;i++){
        displayTask(i)
    }
    
}

function resetTasksContainer(){
    nextUpTasksContainer.innerHTML = "";
  inProgressTasksContainer.innerHTML = "";
  doneTasksContainer.innerHTML = "";
    
}

function clearInput(){
   
    descriptionInput.value=''
    titleInput.value=''
    statusInput.value = "nextUp";
  categoryInput.value = "education";
  
}

function changMode(){
    if (modeBtn.dataset.mode == "night") {
        root.style.setProperty("--main-black", "#f1f1f1");
        root.style.setProperty("--sec-black", "#ddd");
        root.style.setProperty("--text-color", "#222");
        root.style.setProperty("--gray-color", "#333");
        root.style.setProperty("--mid-gray", "#f1f1f1");
        modeBtn.classList.replace("bi-brightness-high-fill", "bi-moon-stars-fill");
        modeBtn.dataset.mode = "light";
      } else if (modeBtn.dataset.mode == "light") {
        root.style.setProperty("--main-black", "#0d1117");
        root.style.setProperty("--sec-black", "#161b22");
        root.style.setProperty("--text-color", "#a5a6a7");
        root.style.setProperty("--gray-color", "#dadada");
        root.style.setProperty("--mid-gray", "#474a4e");
        modeBtn.classList.replace("bi-moon-stars-fill", "bi-brightness-high-fill");
        modeBtn.dataset.mode = "night";
      }
}


function getData(index){
    updatedIndex=index;
    addBtn.innerHTML="Update Task"
    showModal()

    addBtn.classList.add("btn-update");
    addBtn.classList.remove("btn-new-task");
    
    statusInput.value=tasksArr[index].status;
    descriptionInput.value=tasksArr[index].description;
    titleInput.value=tasksArr[index].title;
    categoryInput.value=tasksArr[index].category;
}

function updateData(index){
   
    tasksArr[index].status=statusInput.value;
 tasksArr[index].description   =descriptionInput.value;
   tasksArr[index].title= titleInput.value;
   tasksArr[index].category= categoryInput.value;

 
    localStorage.setItem("task",JSON.stringify(tasksArr))

    resetTasksContainer();
    resetCount();
    addBtn.classList.remove("btn-update");
    addBtn.classList.add("btn-new-task");
    addBtn.innerHTML="Add Task"
 hideModal();

    for(let i=0;i<tasksArr.length;i++){
     displayTask(i)
    }
   
  
}
function changeToBars(){
barsBtn.classList.add("active")
gridBtn.classList.remove("active")


for (var i = 0; i < sections.length; i++) {
    sections[i].classList.remove("col-md-6", "col-lg-4");
    sections[i].style.overflow = "auto";
  }

  for (var j = 0; j < tasksContainer.length; j++) {
    tasksContainer[j].setAttribute("data-view", "bars");
  }


}
    
function searchTask() {
    resetTasksContainer();
    resetCount();
    var searchKey = searchInput.value;
    for (var i = 0; i < tasksArr.length; i++) {
      if (
        tasksArr[i].title.toLowerCase().includes(searchKey.toLowerCase()) ||
        tasksArr[i].category.toLowerCase().includes(searchKey.toLowerCase())
      ) {
        displayTask(i);
      }
    }
  }
function changeToGrid(){
    barsBtn.classList.remove("active")
gridBtn.classList.add("active")

for (var i = 0; i < sections.length; i++) {
    sections[i].classList.add("col-md-6", "col-lg-4");
    sections[i].style.overflow = "visible";
  }

  for (var j = 0; j < tasksContainer.length; j++) {
    tasksContainer[j].removeAttribute("data-view", "bars");
  }
}

function validate(regex, element) {
    if (regex.test(element.value)) {
      element.classList.remove("is-invalid");
      element.classList.add("is-valid");
      element.parentElement.nextElementSibling.classList.replace(
        "d-block",
        "d-none"
      );
    } else {
      element.classList.remove("is-valid");
      element.classList.add("is-invalid");
      element.parentElement.nextElementSibling.classList.replace(
        "d-none",
        "d-block"
      );
    }
    return regex.test(element.value);
}

function resetCount() {
    nextUpCount = 0;
    inProgressCount = 0;
    doneCount = 0;
    nextUpCountElement.innerHTML = nextUpCount;
    inProgressCountElement.innerHTML = inProgressCount;
    doneCountElement.innerHTML = doneCount;
  }
  function setHTMLocation(status) {
    switch (status) {
      case "nextUp":
       
        nextUpCount++;
        nextUpCountElement.innerHTML = nextUpCount;
        break;
      case "inProgress":
     
        inProgressCount++;
        inProgressCountElement.innerHTML = inProgressCount;
        break;
      case "done":
       
        doneCount++;
        doneCountElement.innerHTML = doneCount;
        break;
    }
  }

/////////////////////////////////////////////////// EventListener ////////////////////////////////
newTaskBtn.addEventListener("click",showModal)

document.addEventListener("keydown",function(e){
//   console.log( e.key)  
if (e.key==="Escape")
hideModal();
})

modal.addEventListener("click",function(e){
// console.log(e.target.id)
if( e.target.id=="modal")
hideModal();
})

addBtn.addEventListener("click",function(){
    if(validate(titleRegex,titleInput) && validate(descriptionRegex,descriptionInput))
{
    if(addBtn.innerHTML.trim()=="Add Task"){
        addTask()
        displayTask(globalIndex)
        hideModal()
        clearInput()
       
      
    }
    else if(addBtn.innerHTML=="Update Task"){
       
updateData(updatedIndex);

    }
}
descriptionInput.classList.remove("is-valid")
titleInput.classList.remove("is-valid")
})

modeBtn.addEventListener("click",changMode)
barsBtn.addEventListener("click",changeToBars)
gridBtn.addEventListener("click",changeToGrid)


titleInput.addEventListener("input", function () {
    validate(titleRegex, titleInput);
  });
  
  descriptionInput.addEventListener("input", function () {
    validate(descriptionRegex, descriptionInput);
    remainingCounter = 100 - descriptionInput.value.split("").length;
    remainingCounterElement.innerHTML = remainingCounter;
  });
  searchInput.addEventListener("input", searchTask);