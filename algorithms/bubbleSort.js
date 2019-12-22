
export async function bubbleSort(divArr, n, ms){
    for(let i=0; i< n-1; i++){
        var c = false;
        // @ts-ignore
        for(j=0; j< n-i-1; j++){
            
            // @ts-ignore
            if (parseInt(divArr[j].style.height) > parseInt(divArr[j+1].style.height))
            {
                // @ts-ignore
                await swapi(divArr, j, j+1, ms);
                c= true;
            }
            
        }
        // changing color since this div is in right place now
        // @ts-ignore
        divArr[j].style.background = FINAL_COLOR;

        if (!c){
            // all array is sorted now
            for(let x=0; x<i; x++){
                divArr[x].style.background = FINAL_COLOR;
            }
            break;
        }
    }
}