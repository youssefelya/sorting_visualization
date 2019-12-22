
 async function insertionSort(arr, n, ms){
    let x, key, y;
    for(x=1;x<n;x++){
        // selected key
        arr[x].style.background = SELCETED_KEY_COLOR;
        key = arr[x].style.height;
        await timer(ms);
        y = x - 1;
        while( y>=0 && parseInt(arr[y].style.height) > parseInt(key)){
            arr[ y + 1].style.height = arr[y].style.height;
            arr[ y + 1].style.background = SELECTED_COLOR;
            await timer(ms);
            arr[ y + 1].style.background = FINAL_COLOR;
            y= y-1;
        }
        arr[y+1].style.height = key ;
        arr[y+1].style.background = SELCETED_KEY_COLOR;
        await timer(ms);

        arr[x].style.background = FINAL_COLOR;
        arr[y+1].style.background = FINAL_COLOR;
    }
    // for already sorted array, as it will leave 0th index
    arr[0].style.background = FINAL_COLOR;
}