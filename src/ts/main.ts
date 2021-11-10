window.onload = (e: Event) => {
  const nextStepButton = document.getElementById("run") as HTMLButtonElement;
  const textField = document.getElementById("text") as HTMLInputElement;
  const patternField = document.getElementById("pattern") as HTMLInputElement;
  let currentIndex = 0;

  nextStepButton.onclick = (e: Event) => {
    e.preventDefault();
    let pat = patternField.value;
    if (currentIndex === 0) {
      clearRows();
      addRow(textField.value, []);
    }

    for (let i = 0; i < currentIndex; i++) {
      pat = " " + pat;
    }

    let res = BoyerMooreHorspoolStepped(
      textField.value,
      patternField.value,
      currentIndex
    );
    addRow(pat, res.matches, res.mismatch, textField.value.length);
    currentIndex = res.completed ? 0 : res.currentIndex;
    if(res.completed){
      nextStepButton.innerHTML = "Restart";
    }else{
      nextStepButton.innerHTML = "Next Step";
    }
  };
};

function clearRows(): void {
  const tbody = document.querySelector("#tbody");
  const log = document.querySelector("#log");
  if (!tbody || !log) return;
  tbody.innerHTML = "";
  log.innerHTML = "";
}

function addRow(
  text: string,
  matches?: number[],
  mismatch?: number,
  spaceFill?: number
): void {
  const tbody = document.querySelector("#tbody");
  const row = document.createElement("tr");
  spaceFill = spaceFill === undefined ? 0 : spaceFill;

  Array.from(text).forEach((c, i) => {
    const tmp = document.createElement("td");
    if (matches?.indexOf(i) != -1) tmp.classList.add("match");
    if (mismatch == i) tmp.classList.add("mismatch");
    tmp.innerHTML = c;
    row.appendChild(tmp);
  });

  for (let i = 0; i < spaceFill - text.length; i++) {
    const tmp = document.createElement("td");
    tmp.innerHTML = " ";
    row.appendChild(tmp);
  }

  tbody?.appendChild(row);
}
