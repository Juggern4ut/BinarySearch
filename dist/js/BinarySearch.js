"use strict";
const binarySearch = (arr, x) => {
    let l = -1;
    let h = arr.length;
    let m = -1;
    while (l + 1 != h) {
        m = (l + h) >> 1;
        if (arr[m] <= x)
            l = m;
        else
            h = m;
    }
    return m;
};
function sequencialSearch(arr, x) {
    let i = 0;
    while (i < arr.length && !(arr[i] === x))
        i++;
    return i == arr.length ? -1 : i;
}
//# sourceMappingURL=BinarySearch.js.map