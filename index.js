
const fs=require("fs");
const path=require("path")
const readline=require("readline")


const taskfilepath=path.join(__dirname,"task.json")

// Ensure the file exists
if(!fs.existsSync(taskfilepath)){
    console.log("file not exist");
    fs.writeFileSync(taskfilepath,"[]")
}

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const getTask=()=>{
    const tasks=fs.readFileSync(taskfilepath, "utf-8");  //utf-8 convet into string
    return JSON.parse(tasks);
}
const saveMyTask=(tasks)=>{
    fs.writeFileSync(taskfilepath,JSON.stringify(tasks))
} 

function addTask(task){
 const tasks=getTask();  // [{},{}]
 tasks.push({description:task,completed:false})
 saveMyTask(tasks);
 console.log("task added successfully");
}

const listTask=()=>{
    const tasks=getTask();
    tasks.forEach((task,index)=>{
        console.log(`${index+1}.${task.description}-[${task.completed ? "isCompleted" : "notCompleted"}]`);
    })
}


// complete task
const completeTask=(taskNo)=>{
const tasks=getTask();   // Array<{description: string, completed: boolean}>
if(tasks[taskNo-1]){
    tasks[taskNo-1].completed=true;
    saveMyTask(tasks);
    console.info("task completed successfully");
}else{
    console.warn("invalid task number")
}
return;
}

const deleteTask=(taskNo)=>{
const tasks=getTask();
if(tasks[taskNo-1]){
    const filteredTask=tasks.filter((task,index)=>index !== taskNo-1);
    saveMyTask(filteredTask);
    console.info("task deleted successfully");
}else{
    console.warn("invalid task number");
}
return;
}
function todoManager(){
    rl.question(`what you like to add 
        
        1.Add a task
        2.list all task
        3.mark task as completed
        4.Delete Task
        5.Exit
        `
        
        ,(answer)=>{
        switch(answer){
            case "1":
                rl.question("enter your task:",(task)=>{
                    console.log(`adding task:${task}`);
                    addTask(task)
                    todoManager()
                })
            break;
             
            case "2":
                listTask();
                todoManager();
                break;
            
            case "3":
                rl.question("enter the task number you want to complete:",(taskNo)=>{
                    completeTask(+taskNo); //string number into number
                    todoManager();
                })
                break;
            
            case "4":
                rl.question("enter the task number you want to delete:",(taskNo)=>{
                    deleteTask(+taskNo);
                    todoManager();
                })
                 break;
            case "5":
                    rl.close();
                    break;
                default:
                console.log("invalid option");
                todoManager()
        }
    })

}
todoManager()