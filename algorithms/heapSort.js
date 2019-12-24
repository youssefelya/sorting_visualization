 async function heapSort(divArr, n, ms){
    // @ts-ignore
    for (let i = parseInt(n / 2) - 1; i >= 0; i--) 
        await heapify(divArr, n, i, ms ); 
    
    for (let i=n-1; i>=0; i--) 
    { 
        // @ts-ignore
        await swapi(divArr, 0, i, ms);
        
        // this div is sorted so green
        // @ts-ignore
        divArr[i].style.background = FINAL_COLOR;
        
        await heapify(divArr, i, 0, ms ); 
    }
}

async function heapify(divArr, n, i, ms){
    let largest = i; 
    let l = 2*i + 1;
    let r = 2*i + 2;
    
    if (l < n && parseInt(divArr[l].style.height) > parseInt(divArr[largest].style.height)) 
        largest = l; 
  
    if (r < n && parseInt(divArr[r].style.height) > parseInt(divArr[largest].style.height)) 
        largest = r; 


    if (largest != i) 
    { 
        // @ts-ignore
        await swapi(divArr, i, largest, ms);
        await heapify(divArr, n, largest, ms); 
    } 
}