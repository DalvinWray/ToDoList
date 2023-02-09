//Selectors

const addBtn= document.querySelector("#add");
const inputField=document.querySelector("#input-area");
const todoList=document.querySelector("#todo-list");

const complete=document.querySelector(".completeBtn");

const dropDown=document.querySelector("#dropDown");

//Event Listners
addBtn.addEventListener('click', addToList);
todoList.addEventListener('click', deleteOrComplete);
dropDown.addEventListener('click',dropDownMenu);





//Functions

//Executes on load of website or refresh

addEventListener('load', function(){
    let taskList;
    let taskTodoArray= JSON.parse(localStorage.getItem('taskTodoArray'));
    

    if(taskTodoArray===null){
        taskList=[];
    }
    else{
        taskList=taskTodoArray
    }

    

    taskList.forEach(function(task,taskIndex,taskArray){
        
        //div to contain task elements
        const todo=document.createElement('div');
        todo.classList.add("task");

        // task user wishes to do
        const listItem=document.createElement('li');
        listItem.innerText=task;
        listItem.classList.add("listTask");
        todo.append(listItem);


        //button to show that task was completed
        const taskComplete= document.createElement('button');
        taskComplete.innerText="Complete";
        taskComplete.classList.add("completeBtn");
        taskComplete.id=taskIndex;
        todo.append(taskComplete);
    

        //button to show that task was deleted
        const taskDelete= document.createElement('button');
        taskDelete.innerText="Delete";
        taskDelete.classList.add("deleteBtn");
        taskDelete.id=taskIndex;
        todo.append(taskDelete);
    
        //add the div that contains the task, complete and delete buttons to
        // the ul element in the list
        todoList.append(todo);

    });

    

});





function addToList(event){
    
    //Stores input in local storage
    saveTasks(inputField.value);

    //Clear the information in the input field
    inputField.value="";

    //reload webpage
    location.reload();
       
}


function deleteOrComplete(event){
    const btn=event.target;
    const taskTodoArray=JSON.parse(localStorage.getItem('taskTodoArray'));
    const index=btn.id;
    let taskCompletedArray= JSON.parse(localStorage.getItem('taskComplete'));

    //strike through(completed)
    if(btn.classList[0]==="completeBtn"){
        btn.parentElement.classList.toggle("classCompleted");
        
    }

    //remove
    else if (btn.classList[0]==="deleteBtn"){
        taskTodoArray.splice(index,1);
        btn.parentElement.remove();
        localStorage.setItem('taskTodoArray',JSON.stringify(taskTodoArray));
        location.reload();
    }
    
}


function dropDownMenu(event){
    
    const todoListTaskIndex=todoList.children.length;
    
    
    switch (event.target.value){

        //display all tasks
        case "all":
            
            for (let i=0;i<todoListTaskIndex;i++){
                todoList.children[i].style.display="flex";
            }
            break;

        //display completed tasks
        case "complete":
            
            for (let i=0;i<todoListTaskIndex;i++){

                if (todoList.children[i].classList[1]==="classCompleted"){
                    todoList.children[i].style.display="flex";
                }
                
                else{
                    todoList.children[i].style.display="none";
                }

            }
            break;
        
        //display incomplete tasks
        case "incomplete":

            for (let i=0;i<todoListTaskIndex;i++){
                if ( todoList.children[i].classList[1] !== "classCompleted"){
                    todoList.children[i].style.display="flex";
                }
                
                else{
                    todoList.children[i].style.display="none";
                }
            }
            break;


    }



}

//Storage
function saveTasks(task){
    
    let taskTodoArray;
    if(localStorage.getItem('taskTodoArray')===null){
        taskTodoArray=[];
    }

    else{
        taskTodoArray=JSON.parse(localStorage.getItem('taskTodoArray'));
    }
    taskTodoArray.push(task);
    localStorage.setItem("taskTodoArray",JSON.stringify(taskTodoArray));
}


//idk wtf i am doing