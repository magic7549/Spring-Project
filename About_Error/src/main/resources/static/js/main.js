const content = "ITe it에 오신걸 환영합니다!"
const text = document.querySelector(".text")
let index = 0;

function sleep(delay){ 
    const start = new Date().getTime(); 
    while (new Date().getTime() < start + delay); 
    }

function typing(){
    text.textContent += content[index++];
    if(index > content.length){
        text.textContent = ""
        index = 0;
        sleep(3000);
    }
}
setInterval(typing, 200)