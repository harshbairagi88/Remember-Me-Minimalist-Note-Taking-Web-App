const closebtn = document.querySelector("#close")
const overlay = document.querySelector("#overlay")
const makerem = document.querySelector("#make")
const title = document.querySelector("#title")
const content = document.querySelector("#content")
const save = document.querySelector("#save")
const cards = document.querySelector("#cards")
const vacant = document.querySelector(".vacant")

if(localStorage.getItem("memory") === null){

    localStorage.setItem("memory", JSON.stringify([]))
}

overlay.style.display = "none"

closebtn.addEventListener("click", function(){
    overlay.style.display = "none"
})

makerem.addEventListener("click", function(){
    overlay.style.display = "initial"
})



save.addEventListener("click", function(){

    const output = {
        title : title.value,
        content : content.value 
    }

   

    const allPreviousTasks = localStorage.getItem("memory")

    const parsedTasks = JSON.parse(allPreviousTasks)

    parsedTasks.push(output)

    const stringifedTasks =  JSON.stringify(parsedTasks)

    localStorage.setItem("memory", stringifedTasks)

    title.value = ""

    content.value = ""

    overlay.style.display = "none"

    printer()
})

function removeMemory(index) {
    const allPreviousTasks = localStorage.getItem("memory");
    const parsedTasks = JSON.parse(allPreviousTasks);
    parsedTasks.splice(index, 1);

    const stringifiedTasks = JSON.stringify(parsedTasks);
    localStorage.setItem("memory", stringifiedTasks);
    if (memoryParsed.length > 0){

        vacant.style.display = "none"
    }
    printer();
}



function printer (){
    const allMemory =  localStorage.getItem("memory")

    const memoryParsed =  JSON.parse(allMemory)

    clutter = ""

    memoryParsed.forEach(function(elem, index) {
        clutter += `
            <div class="w-60 bg-zinc-800 p-3 rounded-lg">
                <div class="flex items-center justify-between">
                    <h2 class="font-semibold text-xl">${elem.title}</h2>
                    <div class="flex gap-2">
                    <i class="ri-edit-fill text-xl edit-icon" onclick="editMemory(${index})"></i>
                    <i class="ri-close-circle-fill text-xl close-icon" onclick="removeMemory(${index})"></i>
                    </div>
                </div>
                <p class="mt-4 text-sm">${elem.content}</p>
            </div>`;
    });

    cards.innerHTML = clutter

    if (memoryParsed.length > 0){

        vacant.style.display = "none"
    }

    
}


printer()
