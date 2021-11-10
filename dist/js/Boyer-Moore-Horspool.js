"use strict";
function getCharIndex(char) {
    const res = char.charCodeAt(0) - 97;
    return res < 0 ? 26 : res;
}
function getShiftArray(pattern) {
    const shiftArray = [];
    for (let i = 0; i < 27; i++) {
        shiftArray[i] = pattern.length;
    }
    for (let i = pattern.length - 2; i >= 0; i--) {
        let idx = getCharIndex(pattern.charAt(i));
        if (shiftArray[idx] == pattern.length) {
            shiftArray[idx] = pattern.length - i - 1;
        }
    }
    return shiftArray;
}
function addLogEntry(log) {
    const logContainer = document.getElementById("log");
    const tmp = document.createElement("p");
    tmp.innerHTML = "-" + log;
    logContainer === null || logContainer === void 0 ? void 0 : logContainer.append(tmp);
}
function BoyerMooreHorspool(text, pattern) {
    const shiftArray = getShiftArray(pattern);
    let currentIndex = 0;
    while (currentIndex + pattern.length < text.length) {
        let i = pattern.length - 1;
        while (i >= 0 && text[i + currentIndex] == pattern[i])
            i--;
        if (i == -1)
            return currentIndex;
        currentIndex += shiftArray[getCharIndex(text[i + currentIndex])];
    }
    return -1;
}
function BoyerMooreHorspoolStepped(text, pattern, cI) {
    const shiftArray = getShiftArray(pattern);
    let currentIndex = cI;
    if (currentIndex + pattern.length >= text.length) {
        addLogEntry("OUT OF BOUNDS! PATTERN NOT FOUND");
        return {
            currentIndex: currentIndex,
            completed: true,
            foundIndex: -1,
            matches: [],
            mismatch: -1,
        };
    }
    let i = pattern.length - 1;
    while (i >= 0 && text[i + currentIndex] == pattern[i]) {
        addLogEntry(`Matching: '${pattern[i]}' and '${text[i + currentIndex]}'`);
        i--;
    }
    if (i == -1) {
        addLogEntry(`Found pattern at index ${currentIndex}`);
        let matches = [];
        Array.from(pattern).forEach((c, i) => matches.push(currentIndex + i));
        return {
            currentIndex: currentIndex,
            completed: true,
            foundIndex: currentIndex,
            matches: matches,
            mismatch: -1,
        };
    }
    addLogEntry(`Matching: '${pattern[i]}' and '${text[i + currentIndex]}' -> Shifting: ${shiftArray[getCharIndex(text[i + currentIndex])]}`);
    let matches = [];
    let mismatch = i + currentIndex;
    currentIndex += shiftArray[getCharIndex(text[i + currentIndex])];
    for (let j = mismatch + 1; j < pattern.length + currentIndex; j++) {
        matches.push(j);
    }
    return {
        currentIndex: currentIndex,
        completed: false,
        foundIndex: -1,
        matches: matches,
        mismatch: mismatch,
    };
}
//# sourceMappingURL=Boyer-Moore-Horspool.js.map