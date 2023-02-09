/*TO- DO List By Dalvin Wray*/


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
    //Main Array
    let taskList;
    //Converting the JSON string from local storagae to a array that stores incomplete tasks
    let taskTodoArray= JSON.parse(localStorage.getItem('taskTodoArray'));
    
    //Array that contains completed tasks
    //Converting the JSON string from local storagae to an array that stores completed task
    let taskCompletedArray=JSON.parse(localStorage.getItem('taskComplete'));
    let taskComplete;

    


    //assigning the array that will store incompleted tasks to a variable
    if(taskTodoArray===null){
        taskList=[];
    }
    else{
        taskList=taskTodoArray
    }

    
    //Loop through the array that stores incomplete tasks
    taskList.forEach(function(task,taskIndex){
        
        //div to contain task elements
        const todo=document.createElement('div');
        todo.classList.add("task");

        //task user wishes to do
        const listItem=document.createElement('li');
        listItem.innerText=task;
        listItem.classList.add("listTask");
        todo.append(listItem);


        //Complete Button
        const taskComplete= document.createElement('button');
        taskComplete.innerText="Complete";
        taskComplete.classList.add("completeBtn");
        //Stores the index position of the task in the array, to a button to make manipulating the item in the array easier.
        taskComplete.id=taskIndex;

        todo.append(taskComplete);
    

        //Delete Button
        const taskDelete= document.createElement('button');
        taskDelete.innerText="Delete";
        taskDelete.classList.add("deleteBtn");
        //Stores the index position of the task in the array, to a button to make manipulating the item in the array easier.
        taskDelete.id=taskIndex;

        todo.append(taskDelete);
    
        //add the div that contains the task, complete and delete buttons to
        // the ul element in the list
        todoList.append(todo);

    });


    //assigning the array that will store completed tasks to a variable
    if(taskCompletedArray===null){
        taskComplete=[];
    }
    else{
        taskComplete=taskCompletedArray;
    }

    //Loop through the array that stores complete tasks
    taskComplete.forEach(function(task,taskIndex){
        //div to contain task elements
        const todo=document.createElement('div');
        todo.classList.add("task");
        todo.classList.add("classCompleted");

        //task user wishes to do
        const listItem=document.createElement('li');
        listItem.innerText=task;
        listItem.classList.add("listTask");
        todo.append(listItem);


        //complete button
        const taskComplete= document.createElement('button');
        taskComplete.innerText="Complete";
        taskComplete.classList.add("completeBtn");
        taskComplete.id=taskIndex;
        todo.append(taskComplete);
    

        //delete button
        const taskDelete= document.createElement('button');
        taskDelete.innerText="Delete";
        taskDelete.classList.add("deleteBtn");
        taskDelete.classList.add("completedDeleteBtn");
        taskDelete.id=taskIndex;
        todo.append(taskDelete);
    
        //add the div that contains the task, complete and delete buttons to
        // the ul element in the list
        todoList.append(todo);

    });
    

});



//These actions are triggered when the user adds a new item to the To-Do list
function addToList(event){
    
    //Stores input in local storage
    saveTasks(inputField.value);

    //Clear the information in the input field
    inputField.value="";

    //reload webpage
    location.reload();
       
}

//These actions are triggered when the user presses the delete or complete button
function deleteOrComplete(event){
    const btn=event.target;

    //Converts a JSON string back into an Array that stores incomplete tasks
    const taskTodoArray=JSON.parse(localStorage.getItem('taskTodoArray'));

    //As stated earlier the position of tasks in the array are stored in both the complete and delete button respectively
    const index=btn.id;

    //Converts a JSON string back into an Array that stores incomplete tasks
    let taskCompletedArray= JSON.parse(localStorage.getItem('taskComplete'));
    
    let taskComplete;
    
    
    if(taskCompletedArray===null){
        taskComplete=[];
    }
    
    else{
        taskComplete=taskCompletedArray;
    }
    
    //Complete Button
    if(btn.classList[0]==="completeBtn"){
        
        //When user presses the complete button it will toggle between complete and incomplete, 
        //depending on the current state of the task
        if (btn.parentElement.classList[1] !=="classCompleted"){
            //If the complete button is pressed when a task is incomplete the following code block will be executed
            //Firstly the task will be added to the taskComplete array
            //Secondly the task will be deleted from the array with incomplete tasks
            //Thirdly the array with completed tasks will be converted into a JSON string, then added to local storage
            //Fourthly the array with incomplete tasks will be converted into a JSON string, then added to local storage
            //Lastly page is refreshed to show the latest version of the todo list
            taskComplete.push(taskTodoArray[index]);
            taskTodoArray.splice(index,1);
            localStorage.setItem('taskComplete',JSON.stringify(taskComplete));
            localStorage.setItem('taskTodoArray',JSON.stringify(taskTodoArray));
            location.reload();
        }

        else{
            //If the complete button is pressed when a task is completed the following code block will be executed
            //Firstly the task will be added to the incomplete tasks array
            //Secondly the task will be deleted from the array with completed tasks
            //Thirdly the array with completed tasks will be cverted into a JSON string, then added to local storage
            //Fourthly the array with incomplete tasks will be converted into a JSON string, then added to local storage
            //Lastly page is refreshed to show the latest version of the todo list
            taskTodoArray.push(taskComplete[index]);
            taskComplete.splice(index,1);
            localStorage.setItem('taskComplete',JSON.stringify(taskComplete));
            localStorage.setItem('taskTodoArray',JSON.stringify(taskTodoArray));
            location.reload();
        }
        

    }

    //Delete Button
    else if (btn.classList[0]==="deleteBtn"){
        //If user hits the delete button on a task that is completed 
        //the following code block will be executed
        if(btn.classList[1]==="completedDeleteBtn"){
            //Firstly task is deleted from the array
            taskComplete.splice(index,1);
            //Secondly task is deleted from the items on screen
            btn.parentElement.remove;
            //Thirdly the array with completed tasks is converted into a JSON string and stored in local storage
            localStorage.setItem('taskComplete',JSON.stringify(taskComplete));
            //Fourthly the webpage is refreshed
            location.reload();
        }
        
        //IF user hits teh delete button on a task that is incomplete the following code block will be executed
        else{
            //task is deleted from the array
            taskTodoArray.splice(index,1);
            //task is deleted from the items on screen
            btn.parentElement.remove();
            //Updated array is converted into a JSON string and stored in local storage
            localStorage.setItem('taskTodoArray',JSON.stringify(taskTodoArray));
            //webpage is refreshed
            location.reload();
        }

    }
    
}


function dropDownMenu(event){
    
    //finds the length of all items in the todo list
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

//Stores tasks directly from the input field
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

/*TO- DO List By Dalvin Wray*/