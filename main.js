window.onload=loadList;
let LIST;
let id;
let addButton=document.getElementById('addButton');
let  todoEntryBox=document.getElementById('todo-entry-box');
let todoList=document.getElementById('todo-list');
let reload=document.getElementById('reload');
const dateElement=document.getElementById('date');
let options={weekday:'long',month:'short',day:'numeric'};
let today=new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US",options);
reload.addEventListener('click',function(){
    localStorage.clear();
});
addButton.addEventListener('click',addToDoItem);
function addToDoItem(){
    const inputText=todoEntryBox.value;
    if(inputText){
        addItem(inputText,id,false,false);
        LIST.push({
            text:inputText,
             id: id,
             done:false,
             trash:false
        })
        console.log(id);
        saveList();
        todoEntryBox.value="";
        id++;
    }
}
const CHECK="fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINE_THROUGH="lineThrough"
function addItem(inputText,id,done,trash){
    if(trash){return;}
    const DONE=done?CHECK:UNCHECK;
    const LINE=done?LINE_THROUGH:"";
    const text=`<li class="item">
    <i class="co fa ${DONE}" job="complete" id="${id}"></i>
    <p class="text ${LINE} "> ${inputText} </p>
    <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
    </li>`
    const position="beforeend";
    todoList.insertAdjacentHTML(position,text);

}
todoList.addEventListener('click',function(event){
    const element=event.target;
    const elementJob=event.target.attributes.job.value;
    console.log(element.id);
    if(elementJob=='complete'){
        completetodo(element);
    }else if(elementJob=='delete'){
        removetodo(element);
    }
    console.log(LIST);
    saveList();
});
function completetodo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    LIST[element.id].done=LIST[element.id].done ? false:true;
}

function removetodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash=true;
    console.log(element.id);
}

function saveList(){
    localStorage.setItem("TODOLIST",JSON.stringify(LIST));
}

function loadList(){
    if(localStorage.getItem("TODOLIST")!=null){
        LIST=JSON.parse(localStorage.getItem("TODOLIST"));
        id=LIST.length;
        console.log(id);
        for(i=0;i<LIST.length;i++){
        addItem(LIST[i].text,LIST[i].id,LIST[i].done,LIST[i].trash); 
        }
    }
    else{
        LIST=[];
        id=0;
    }
}