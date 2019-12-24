
 async function radixSort(divArr,n ,ms) {
  
  let arr = getRealArray(divArr, n);
  let originArray = arr;
  const max =  getMaxLength(arr); // length of the max digit in the array

  for (let i = 0; i < max; i++) {
      let buckets = Array.from({ length: 10 }, () => [ ])
      for (let j = 0; j < arr.length; j++) {
        buckets[getPosition(arr[ j ], i)].push(arr[ j ]); // pushing into buckets
      }
      arr = [ ].concat(...buckets);
      await timer(ms);
    // await printBuckets(buckets, divArr, ms);
    
     await printcurrecntArray(buckets, originArray, arr, divArr, n, ms);
      originArray = arr;
      if( i == max-1 ){
        await printcurrecntArray(originArray, arr, divArr, n, ms);
      }
  }
  
}

 function getPosition(num, place){
  return  Math.floor(Math.abs(num)/Math.pow(10,place))% 10
 }

 function  getMaxLength(arr) {
  let max = 0;
  for (let num of arr) {
      if (max < num.toString().length) {
          max = num.toString().length
      }
  }
  return max
}



 function getRealArray(divArr, n){
  let arr = []; 
  
  for(let i=0; i<n ; i++ ){
  //  console.log('div ', divArr[i].innerText);
    arr[i] = divArr[i].innerText;
  }
  return arr;
}

