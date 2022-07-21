class Task {                       //Task Class
  constructor(text, status) {
    this.text = text;
    this.status = status;
  }
}
//Global Nodes
var textNode = document.getElementById("textenter");  
var parent = document.getElementById("main");

// Starting 
showToDo();
// For fetching data from local Storage
function showToDo(){                    
  let tasklist;
  if (JSON.parse(localStorage.getItem("task")) !== null) 
  {
    tasklist = JSON.parse(localStorage.getItem("task"));
  } 
  else {
    tasklist = [];
  }
  parent.innerHTML=`<h1 class="tasklist">TASK LIST</h1>
        <p>Add tasks to your list by typing to the right and pressing enter.You may then view pending tasks below.</p>`;
  tasklist.forEach((task,index)=>{
    let st="unchecked";
    let d="none";
    let col="black";
    if(task.status===1)
    {
      col="green"
      st="checked";
      d="line-through";
    }
    parent.innerHTML += `<div class="task" id="${index}">
    <span class="text" style = "text-decoration:${d}; color:${col}">${task.text}</span>
    <div class="right">
    <img src = "edit.png" class="edittask" id="${index}" onclick="editTask(this.id)">
    <input type="checkbox" id="${index}" class= status" onchange="editStatus(this.id,${task.status})" ${st}>
    <button id="${index}" class="deleteTask" onclick="deleteTask(this.id)">X</button>
    </div>
    </div>
    <hr>`;
  })
}
// Event Listeren for pressing Enter
textNode.addEventListener('keypress', function addTask(e)
{
  if(e.key==='Enter')
  {
    var value = textNode.value;
    let task = new Task(value,0);
    if(validateToDo(value))
    {  
      addToDo(task);

    }
    textNode.value = "";
    e.preventDefault();

  }
});
// For editing the task name
function editTask(index)
{
  let tasklist=JSON.parse(localStorage.getItem('task'));
  let pastData=tasklist[index].text;
  if(tasklist[index].status===1)
  {
    alert('Task is marked done!');
    return;
  }
  let newData = window.prompt("Edit this Task...", pastData);
  if(newData.trim())
  {
    tasklist[index].text=newData;
  }
  else
  {
    alert(`Oh! Dude?\nTask is Empty!\nYou must write something!!!`);
  }
  localStorage.setItem("task",JSON.stringify(tasklist));
  showToDo();
}
// For mark done or undone
function editStatus(index,status)
{
  let tasklist = JSON.parse(localStorage.getItem("task"));
  if(status===1)
  {
    tasklist[index].status = 0;
  }
  else{
    tasklist[index].status = 1;
  }
  localStorage.setItem("task", JSON.stringify(tasklist));
  showToDo();
}
// For deleting the task 
function deleteTask(index)
{
  let tasklist = JSON.parse(localStorage.getItem("task"));
  tasklist.splice(index,1);
  localStorage.setItem("task", JSON.stringify(tasklist));
  showToDo();
}
// Validating the input
function validateToDo(input)
{
  if(input.trim())
  {
    return true;
  }
}
// Adding to the local Storage
function addToDo(task)
{
  let tasklist;
  if(JSON.parse(localStorage.getItem('task'))!==null)
  {
    tasklist=JSON.parse(localStorage.getItem('task'));
  }
  else
  {
    tasklist=[];
  }
  tasklist.push(task)
  localStorage.setItem("task",JSON.stringify(tasklist)); 
  showToDo();
}
