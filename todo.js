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

function addToList(event){
    

    if (inputField.value !=""){

        //div to contain task elements
        const todo=document.createElement('div');
        todo.classList.add("task");


        // task user wishes to complete
        const listItem=document.createElement('li');
        listItem.innerText=inputField.value;
        listItem.classList.add("listTask");
        todo.append(listItem);

        //button to show that task was completed
        const taskComplete= document.createElement('button');
        taskComplete.innerText="Complete";
        taskComplete.classList.add("completeBtn");
        todo.append(taskComplete);
        

        //button to show that task was deleted
        const taskDelete= document.createElement('button');
        taskDelete.innerText="Delete";
        taskDelete.classList.add("deleteBtn");
        todo.append(taskDelete);
        
        //add the div that contains the task, complete and delete buttons to
        // the ul element in the list
        todoList.append(todo);
        
        //Clear the information in the input field
        inputField.value="";
    }



    else{
        alert("Please Enter A Task You Wish To Complete");
    }
       
    
}


function deleteOrComplete(event){
    const btn=event.target;
    //strike through
    if(btn.classList[0]==="completeBtn"){
        btn.parentElement.classList.toggle("classCompleted");
    }

    //remove
    else if (btn.classList[0]==="deleteBtn"){
        btn.parentElement.remove();
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