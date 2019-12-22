
function mergeSort(realArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSort(auxiliaryArray, startIdx, middleIdx, realArray, animations);
    mergeSort(auxiliaryArray, middleIdx + 1, endIdx, realArray, animations);
    doMerge(realArray, startIdx, endIdx, middleIdx, auxiliaryArray, animations);
}

function doMerge(realArray, startIdx, endIdx, middleIdx, auxiliaryArray, animations) {
    let i = startIdx;
    let j = middleIdx + 1;
    let k = startIdx;

    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {

            animations.push([k, auxiliaryArray[i]]);

            realArray[k++] = auxiliaryArray[i++];
        } else {

            animations.push([k, auxiliaryArray[j]]);

            realArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        realArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        realArray[k++] = auxiliaryArray[j++];
    }
}