let controls = document.getElementById("con").addEventListener("click",start);
let gameBlocks = document.querySelector(".game-blocks")

function start() {
  let yourName = prompt("Your Name ?")

  if(yourName == null || yourName == ""){
    document.querySelector(".name span").innerHTML ="UnKnown";
  }else{
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".controls").remove();
  showAll();
}
let blocks = Array.from(document.querySelectorAll(".game-blocks .block"));

let orderRange = [...blocks.keys()]
shuffle(orderRange);
blocks.forEach((block, index)=>{

  block.style.order = orderRange[index];
  block.addEventListener("click",function () {
    
    flipBlocks(block);
  })
})


function shuffle(array) {
  let current = array.length;
  while(current > 0 ){
  random = Math.floor(Math.random()* current)
console.log(random)
  current--

  temp = array[current];
  array[current] = array[random];
  array[random] = temp;
}
  return array;
}

let block = document.querySelector(".block");

function flipBlocks(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));


  
  if(allFlippedBlocks.length === 2){
    
    checkMatch(allFlippedBlocks[0],allFlippedBlocks[1])
    stopClicking();
    end();
    
  }

}
function end() {
  let allFlippedBlocksMatch = blocks.filter(flippedBlockMatch => flippedBlockMatch.classList.contains('has-match'));
  if(allFlippedBlocksMatch.length === blocks.length){
    setTimeout(()=>{
      let end = document.querySelector("#end");
      let endText = document.querySelector(".end");
      end.style.display = "flex";
      endText.innerHTML =`Congrats,You Won!! with just a ${tries.innerHTML} Wrong Tries <br> Try Again`
      endText.addEventListener("click",function () {
        restart();
      })
    },800)
  }
}
let tries = document.querySelector(".tries span");
function checkMatch(firstBlock,secondBlock) {
  

  if(firstBlock.dataset.technology == secondBlock.dataset.technology){
    firstBlock.classList.remove("is-flipped")
    secondBlock.classList.remove("is-flipped")
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  }
  else{
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped")
      secondBlock.classList.remove("is-flipped")
      tries.innerHTML =parseInt(tries.innerHTML)+ 1 ;
      
    }, 800);

  }
  
  
}
function stopClicking() {
  gameBlocks.classList.add("stop-clicking");
  setTimeout(() => {
    gameBlocks.classList.remove("stop-clicking");
  }, 800);
  
}

function showAll() {
  blocks.forEach(block=>{
    block.classList.add("is-flipped");
    gameBlocks.classList.add("stop-clicking");
    setTimeout(()=>{
    block.classList.remove("is-flipped");
    gameBlocks.classList.remove("stop-clicking");
    },800)
  })
  
}

function restart() {
  location.reload();
}


