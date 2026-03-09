const results = document.getElementById("results");
const summary = document.getElementById("summary");
const setCountSelect = document.getElementById("set-count");
const generateButton = document.getElementById("generate-button");

function createLottoSet() {
  const numbers = new Set();

  while (numbers.size < 6) {
    const picked = Math.floor(Math.random() * 45) + 1;
    numbers.add(picked);
  }

  return [...numbers].sort((a, b) => a - b);
}

function getNumberClass(number) {
  if (number <= 10) return "ball-yellow";
  if (number <= 20) return "ball-blue";
  if (number <= 30) return "ball-red";
  if (number <= 40) return "ball-gray";
  return "ball-green";
}

function renderSets() {
  const setCount = Number(setCountSelect.value);
  const sets = Array.from({ length: setCount }, () => createLottoSet());

  results.innerHTML = sets
    .map((set, index) => {
      const numbers = set
        .map(
          (number) =>
            `<li class="ball ${getNumberClass(number)}">${number}</li>`,
        )
        .join("");

      return `
        <article class="result-card">
          <div class="card-header">
            <span class="card-label">추천 ${index + 1}</span>
            <span class="card-copy">행운 포인트 ${set[0] + set[5]}</span>
          </div>
          <ol class="number-row">${numbers}</ol>
        </article>
      `;
    })
    .join("");

  summary.textContent = `오늘의 추천 조합 ${setCount}개를 준비했습니다.`;
}

generateButton.addEventListener("click", renderSets);

renderSets();
