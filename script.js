let currentArray = [];
let currentAlgo;
let arraySize;
let arr = [];
const sortbtn = document.getElementById('sort');
const sliderInput = document.getElementById('myRange');
const newArrayBtn = document.getElementById('newArray');
const PRIMARY_COLOR = '#f00';
const SELECTED_COLOR = '#41EAD4';
const SWAPPED_COLOR = '#454ADE';
const FINAL_COLOR = '#0f0';
const SELCETED_KEY_COLOR = '#FBFF12';

sliderInput.addEventListener("input", getRandomArray);

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

// for adding eventListener on each algo options
let algoList = document.querySelectorAll('.algoname');
for (const a of algoList){
 
    // @ts-ignore
    a.addEventListener('click', function(event)
     {   
        // console.log("a ----->", a);
         sortbtn.style.visibility = 'visible';  // making sorting btn visible
        // remove selectedAlgo class if present
       let rm = document.querySelector('.selectedAlgo');
        if (rm){
            rm.className = 'algoname';
        }
        //  add selectedAlgo class to clicked element
        a.className = 'selectedAlgo';
        // @ts-ignore
        currentAlgo = a.innerText.split(' ')[0].toLowerCase();    // store selectedAlgo choice 
        // @ts-ignore
     //  document.getElementsByClassName('algo-overview')[0].style.display = "block";
    })
}
// for making slides(drawing on page)
function makeSlides(arr){
   const centerBox = document.getElementById('center');

    // for removing slides
    // @ts-ignore
    var child = centerBox.lastElementChild;
    while(child){
        // @ts-ignore
        centerBox.removeChild(child);
        // @ts-ignore
        child = centerBox.lastElementChild;
    }

    /// for adding new slides
    // @ts-ignore
    eachWidth = 1000; //(centerBox.clientWidth - arr.length - 20) / arr.length; // 20px padding of center box
    for( let i=0; i< arr.length; i++){
        const box = document.createElement('div');
        box.className = 'slide';
        
        if(arr.length<40) {
        box.innerText = arr[i];}
        // @ts-ignore
        box.style.width = `${eachWidth}px`;
        box.style.height = `${arr[i]}px`;
        box.style.background = PRIMARY_COLOR;
        box.style.margin = '0 1px 0 0';
      
        // @ts-ignore
        centerBox.appendChild(box);
    }
}

// for making new array on click "Generate New Array" btn
document.getElementById('newArray').addEventListener('click', getRandomArray);

// generating new array
function getRandomArray(){
    // @ts-ignore
    arraySize = parseInt(document.getElementById('myRange').value); // array length
    // get center box
    const centerBox = document.getElementById('center');
    let height = centerBox.clientHeight - 15 ;
    
    let arr = [];
    for (let x=0; x<arraySize; x++){

        arr[x] = Math.floor(Math.random() * height) + 10;
        currentArray[x] = arr[x];
    }
    makeSlides(arr);
} 

getRandomArray(); 
async function sort() {

    // @ts-ignore
   // document.getElementsByClassName('algo-overview')[0].style.display = "block";

    // displaying selected sort Info
  //  document.getElementById(currentAlgo + "Info").style.display = "block";

    // disabling all things
    document.getElementById('sort').setAttribute("disabled", "disabled");
     sliderInput.setAttribute("disabled", "disabled");
    newArrayBtn.setAttribute("disabled", "disabled");
    sliderInput.className = 'slider disabled';
    // @ts-ignore
    sliderInput.parentNode.className = 'disabled';
    newArrayBtn.className = 'disabled';

    // getting all divs
    var divArr = document.getElementsByClassName('slide');
    var speed = document.getElementsByClassName('slider');
   // console.log('speed -----> ',speed['points'].value)

    var n = divArr.length;
    const ms = delayTime(speed['points'].value);

    // deciding algorithm function to excute
    if (currentAlgo === 'bubble') {

        // setting algo-overview values
     //   setOverviewInfo("O(n<sup>2</sup>)", "In-Place", "Stable", "Internal", "Non-Recursive", "Yup!");
     

        // calling bubbleSortFunction
        // @ts-ignore
        await bubbleSort(divArr, n, ms);


    } else if (currentAlgo === 'heap') {

        // setting algo-overview values
    //    setOverviewInfo("O(n logn)", "In-Place", "UnStable", "Internal", "Non-Recursive", "Yup!");
       setNote('It first builds a <span>MAX HEAP</span>, then delete maximum valued element from it and put it at the end of collection. It recursively repeat this until whole collection is sorted.')
   
       // @ts-ignore
        await heapSort(divArr, n, ms); // calling heapSort        

    } else if (currentAlgo === 'merge') {

    //    setNote('If you look closely, you will notice that at some moments it has duplicated values, becoz in merge SOrt it never swaps values instead it <span>OVERWRITES</span> them!!!');

        const animations = [];
        const realArray = [];
        for (const elm of document.getElementsByClassName('slide')) {
            // @ts-ignore
            realArray.push(parseInt(elm.style.height));
        };

        const auxiliaryArray = realArray.slice();
        // @ts-ignore
        mergeSort(realArray, 0, realArray.length - 1, auxiliaryArray, animations);


        for (let x = 0; x < animations.length; x++) {
            const arrayBars = document.getElementsByClassName('slide');
            const isColorChange = x % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[x];
                // @ts-ignore
                const barOneStyle = arrayBars[barOneIdx].style;
                // @ts-ignore
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = x % 3 === 0 ? SELECTED_COLOR : PRIMARY_COLOR;
                barOneStyle.background = color;
                barTwoStyle.background = color;
                await timer(ms);
            } else {

                const [barOneIdx, newHeight] = animations[x];
                // @ts-ignore
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                // @ts-ignore
                arrayBars[barOneIdx].innerText = newHeight;
            }
        }

    } else if (currentAlgo === "insertion") {

        // setting algo-overview values
     //   setOverviewInfo("O(n<sup>2</sup>)", "In-Place", "Stable", "Internal", "Non-Recursive", "Yup!");
       setNote('Insertion sort is based on the idea that one element from the input elements is consumed in each iteration to find its correct position i.e, the position to which it belongs in a sorted array.')
        // @ts-ignore
        await insertionSort(divArr, n, ms);
    } else if (currentAlgo === 'quick') {

        // setting algo-overview values
     //   setOverviewInfo("O(n logn)", "In-Place", "UnStable", "Internal", "Recursive", "Yup!");

       setNote('In this, I have always picked <span>LAST</span> element as pivot.')
        // @ts-ignore
        await qucikSort(divArr, 0, n - 1, ms);
    }else if(currentAlgo === 'radix'){
        //### Nothing yet !!!!! 
        setNote('Radix sort works by sorting each digit from least significant digit to most significant digit <br> Digits with same color (red) mean that they already right position');

       await radixSort(divArr, n, ms);
       
        
    } 
    else {
        alert('how did you clicked that button');
    }


    // turning divs color back to noraml as all are sorted
    await timer(1000);
    backToNormal(divArr, n);

    // enabling all things 
    document.getElementById("sort").removeAttribute("disabled");
    sliderInput.removeAttribute("disabled");
    newArrayBtn.removeAttribute("disabled");
    sliderInput.className = 'slider';
    // @ts-ignore
    sliderInput.parentNode.className = '';
  //  newArrayBtn.className = '';

    // hiding selected sort Info and overview info

   // document.getElementById(currentAlgo + "Info").style.display = "none";
    // @ts-ignore
   // document.getElementsByClassName('algo-overview')[0].style.display = "none";
    // remove overview Info
 //   removeOverviewInfo();

    removeNote();

}

// for swapping two div's height and changing color
async function swapi(arr, i, j, ms){
   let  a1 = arr[i];
   let a2 = arr[j];
    // changing to selected colors
    a1.style.background = SELECTED_COLOR;
    a2.style.background = SELECTED_COLOR;
    await timer(ms);
    // swapping divs heights
    // @ts-ignore
    let b = a1.style.height;
    a1.style.height = a2.style.height;
    a2.style.height = b;
    // changing to swapped colors after swapping
    a1.style.background = SWAPPED_COLOR;
    a2.style.background = SWAPPED_COLOR;
    await timer(ms);
    // changing back to primary color(normal)
    a1.style.background = PRIMARY_COLOR;
    a2.style.background = PRIMARY_COLOR;

    //swap values; 
    const a1value = a1.innerText;
    a1.innerText = a2.innerText;
    a2.innerText = a1value;
}


async function printcurrecntArray(buckets, originArray, currentArr, divArr,  n, ms){
    // let posiCHanged = changePosition(originArray, currentArr);
    // console.log(' posi changed ' ,posiCHanged);
    // for(let i = 0; i<posiCHanged.length; i++){
    //     divArr[posiCHanged[i][0]].style.background = SELECTED_COLOR;
    // }
    // await timer(ms);
    // for(let i =0; i<posiCHanged.length;i++){
  

    //     divArr[posiCHanged[i][0]].style.height = `${originArray[posiCHanged[i][1]] }px`;
    //     divArr[posiCHanged[i][0]].innerText = originArray[posiCHanged[i][1]] ;

    //     divArr[posiCHanged[i][1]].style.height =`${originArray[posiCHanged[i][0]]}px`;
    //     divArr[posiCHanged[i][1]].innerText = originArray[posiCHanged[i][0]];

    // }
    // await timer(ms);
    // for(let i = 0; i<currentArr.length; i++){
    //     divArr[i].style.height = `${currentArr[i]}px`;
    //     divArr[i].innerText = currentArr[i] ;
    //     divArr[i].style.background = PRIMARY_COLOR;
    // }
    // console.log(' originArray  ', originArray);
    //  console.log(' current array ', currentArr);
    let index = 0;
    let memoIndex = index; 
    for(let i=0; i<buckets.length; i++){
        for(let j=0; j<buckets[i].length; j++){
            if(index < divArr.length){
            divArr[index].style.background = SELECTED_COLOR;
            divArr[index].style.height = `${buckets[i][j]}px`;
            divArr[index].innerText = buckets[i][j];
            memoIndex = index; 
            index = index +1;
            await timer(ms/10);
        } 
        await timer(ms);
        if(j == buckets[i].length-1){
            for(let j=0; j<buckets[i].length; j++){
                if(index < divArr.length ){
                divArr[memoIndex].style.background = PRIMARY_COLOR;
            }
            }
        }

        }
    }
  }
  



 
  function changePosition(originArray, currentArr){
    let changed = [];
    let posiChaned = [];
    for(let i= 0; i<originArray.length; i++){
      if(originArray[i] != currentArr[i]){
          let helper = [];
          helper.push(i);
          for(let x = 0;  x<originArray.length; x++){
              if(currentArr[i] == originArray[x]){
                helper.push(x);
                break;
              }
          }
          changed[i] = 1;
          posiChaned.push(helper); 
        }
      else{
        changed[i]= 0;
      } 
    }
    return posiChaned;
  }
  


/// back to normal color after sorting
function backToNormal(arr, n){
    for(let x=0; x<n; x++){
        arr[x].style.background = PRIMARY_COLOR;
    }
}

// decide delay time as per length of array
function delayTime(n) {
    if (n <= 200 && n >= 150) {
        return 5;
    }
    else if (n <= 150 && n >= 100) {
        return 15;
    } else if (n < 100 && n >= 80) {
        return 35;
    } else if (n < 80 && n >= 60) {
        return 75;
    } else if (n < 60 && n >= 40) {
        return 100;
    } else if (n < 40 && n >= 20) {
        return 500;
    } else { // for n<20 && n>4
        return 1000;
    }
}

// set overview Info for selected algorithm
function setOverviewInfo(time, space, stable, memory, recursive, comparsion) {
    document.getElementById("timeComplex").innerHTML = time;
    document.getElementById("spaceComplex").innerText = space;
    document.getElementById("stability").innerText = stable;
    document.getElementById("memory").innerText = memory;
    document.getElementById("recursive").innerText = recursive;
    document.getElementById("swapi").innerText = comparsion;
}
// remove overview Info for selected algorithm
function removeOverviewInfo() {
    document.getElementById("timeComplex").innerHTML = '';
    document.getElementById("spaceComplex").innerText = '';
    document.getElementById("stability").innerText = '';
    document.getElementById("memory").innerText = '';
    document.getElementById("recursive").innerText = '';
    document.getElementById("swapi").innerText = '';
}

async function setNote(message){
    const noteElement = document.getElementById('note');
    noteElement.children[0].innerHTML = "NOTE : "+message;
    noteElement.style.visibility = 'visible';
    noteElement.style.backgroundColor = 'black';
    // @ts-ignore
    await timer(3000);
}

function removeNote(){
    const noteElement = document.getElementById('note');
    noteElement.children[0].innerHTML = '';
    noteElement.style.visibility = 'hidden';
}



async function parition(divArr, l, h, ms){

    divArr[h].style.background = SELCETED_KEY_COLOR; // yellow key, pivot color
    let pi = parseInt(divArr[h].style.height);  
 
    let i = (l - 1)  // Index of smaller element

    // @ts-ignore
    for (j = l; j <= h- 1; j++)
    {
        // If current element is smaller than the pivot
        // @ts-ignore
        if (parseInt(divArr[j].style.height) < pi)
        {
            i++;
            // @ts-ignore
            await swapi(divArr, i, j, ms);          
        }
    }

    await swapi(divArr, i+1, h, ms); 
    divArr[h].style.background = PRIMARY_COLOR;
    return (i + 1);
}



// function generateArray(){
//     // @ts-ignore
//     arraySize = 20;
    
//     let arr = [];
//     for (let x=0; x<arraySize; x++){
//         arr[x] = Math.floor(Math.random()*1000) ;
//         currentArray[x] = arr[x];
//     }
//    return arr;
// } 


// async  function radex(){
//     var divArr = document.getElementsByClassName('slide');
//     var speed = document.getElementsByClassName('slider');
//     var n = divArr.length;

  

//     const ms = delayTime(speed['points'].value);
//    await radixSort(divArr, n, ms);
// }