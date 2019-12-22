
 async function qucikSort(divArr, l, h, ms){
    if(l<h){
        // @ts-ignore
        pi = await parition(divArr, l, h, ms)
        // @ts-ignore
        await qucikSort(divArr, l, pi-1, ms);
        // @ts-ignore
        await qucikSort(divArr, pi+1, h, ms);
    }
    for(let x=0; x<=h; x++){
        // @ts-ignore
        divArr[x].style.background = FINAL_COLOR;
    }
}
