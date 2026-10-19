const slides = Array.from(document.querySelectorAll(".slide"));
const overviewSlide = document.querySelector(".overview-slide");
const overviewItems = Array.from(document.querySelectorAll("[data-overview-target]"));
const mechanismSlide = document.querySelector(".mechanism-slide");
const mechanismItems = Array.from(document.querySelectorAll("[data-mechanism-target]"));
const dataSlide = document.querySelector(".data-slide");
const dataStreams = Array.from(document.querySelectorAll(".data-stream"));
const sampleWindow = document.querySelector(".sample-window");
const classificationSlide = document.querySelector(".classification-slide");
const classificationSteps = Array.from(document.querySelectorAll(".class-step"));
const similarityLab = document.querySelector(".similarity-lab");
const definitionChecks = document.querySelector(".definition-checks");
const modelSlide = document.querySelector(".model-slide");
const modelTerms = Array.from(document.querySelectorAll("[data-model-term]"));
const modelCards = Array.from(document.querySelectorAll("[data-model-card]"));
const identificationAudit = document.querySelector(".identification-audit");
const resultsSlide = document.querySelector(".results-slide");
const resultsRows = Array.from(document.querySelectorAll("[data-results-row]"));
const resultsSpecs = Array.from(document.querySelectorAll("[data-results-spec]"));
const effectPanel = document.querySelector(".effect-panel");
const robustnessSlide = document.querySelector(".robustness-slide");
const robustnessBlocks = Array.from(document.querySelectorAll("[data-robustness-block]"));
const assumptionBar = document.querySelector(".assumption-bar");
const evidenceSlide = document.querySelector(".evidence-slide");
const evidenceBlocks = Array.from(document.querySelectorAll("[data-evidence-block]"));
const evaluationSlide = document.querySelector(".evaluation-slide");
const contributionItems = Array.from(document.querySelectorAll(".contribution-item"));
const evaluationBlocks = Array.from(document.querySelectorAll("[data-evaluation-block]"));
const futureAgenda = document.querySelector(".future-agenda");
const conclusionSlide = document.querySelector(".conclusion-slide");
const conclusionBlocks = Array.from(document.querySelectorAll("[data-conclusion-block]"));
const fullscreenButton = document.querySelector("#fullscreen-button");
const slideHashes = ["cover", "overview", "motivation", "mechanisms", "data", "classification", "model", "results", "robustness", "evidence", "evaluation", "conclusion"];
let currentSlide = 0;
let overviewStep = 1;
let mechanismStep = 1;
let dataStep = 1;
let classificationStep = 1;
let modelStep = 1;
let resultsStep = 1;
let robustnessStep = 1;
let evidenceStep = 1;
let evaluationStep = 1;
let conclusionStep = 1;

function playIntro(slide = slides[currentSlide]) {
  slide.classList.remove("is-ready");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => slide.classList.add("is-ready"));
  });
}

function showSlide(index, updateHash = true) {
  if (index < 0 || index >= slides.length) return;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
    slide.setAttribute("aria-hidden", slideIndex === index ? "false" : "true");
  });

  currentSlide = index;

  if (index === 4) setDataStep(1);
  if (index === 5) setClassificationStep(1);
  if (index === 6) setModelStep(1);
  if (index === 7) setResultsStep(1);
  if (index === 8) setRobustnessStep(1);
  if (index === 9) setEvidenceStep(1);
  if (index === 10) setEvaluationStep(1);
  if (index === 11) setConclusionStep(1);

  playIntro(slides[index]);

  if (updateHash && window.location.hash !== `#${slideHashes[index]}`) {
    history.replaceState(null, "", `#${slideHashes[index]}`);
  }
}

function setOverviewStep(step) {
  overviewStep = Math.max(1, Math.min(6, step));
  overviewSlide.dataset.overviewStep = String(overviewStep);
  overviewSlide.style.setProperty("--overview-step", String(overviewStep));

  const stepLabel = overviewSlide.querySelector(".paper-reader__step b");
  stepLabel.textContent = String(overviewStep).padStart(2, "0");

  const paperSourceLabel = overviewSlide.querySelector("#paper-source-label");
  paperSourceLabel.textContent = overviewStep === 1
    ? "原文：论文第 2 页引言"
    : "原文：论文第 1 页摘要";

  overviewItems.forEach((item) => {
    const isCurrent = Number(item.dataset.overviewTarget) === overviewStep;
    item.classList.toggle("is-current", isCurrent);
    item.setAttribute("aria-current", isCurrent ? "step" : "false");
  });
}

function setMechanismStep(step) {
  mechanismStep = Math.max(1, Math.min(3, step));
  mechanismSlide.dataset.mechanismStep = String(mechanismStep);

  mechanismItems.forEach((item) => {
    const isCurrent = Number(item.dataset.mechanismTarget) === mechanismStep;
    item.classList.toggle("is-current", isCurrent);
    item.setAttribute("aria-current", isCurrent ? "step" : "false");
  });
}

function setDataStep(step) {
  dataStep = Math.max(1, Math.min(5, step));
  dataSlide.dataset.dataStep = String(dataStep);
  dataStreams.forEach((stream, index) => stream.classList.toggle("is-revealed", index < dataStep));
  sampleWindow.classList.toggle("is-revealed", dataStep >= 5);
}

function setClassificationStep(step) {
  classificationStep = Math.max(1, Math.min(7, step));
  classificationSlide.dataset.classificationStep = String(classificationStep);
  classificationSlide.style.setProperty("--classification-progress", String(Math.min(classificationStep, 5) / 5));
  classificationSteps.forEach((item, index) => item.classList.toggle("is-revealed", index < classificationStep));
  similarityLab.classList.toggle("is-revealed", classificationStep >= 6);
  definitionChecks.classList.toggle("is-revealed", classificationStep >= 7);
}

function setModelStep(step) {
  modelStep = Math.max(1, Math.min(5, step));
  modelSlide.dataset.modelStep = String(modelStep);
  modelTerms.forEach((term, index) => term.classList.toggle("is-revealed", index < modelStep));
  modelCards.forEach((card, index) => card.classList.toggle("is-revealed", index < modelStep));
  identificationAudit.classList.toggle("is-revealed", modelStep >= 4);
}

function setResultsStep(step) {
  resultsStep = Math.max(1, Math.min(5, step));
  resultsSlide.dataset.resultsStep = String(resultsStep);
  resultsRows.forEach((row, index) => row.classList.toggle("is-revealed", index < Math.min(resultsStep, 5)));
  resultsSpecs.forEach((spec, index) => spec.classList.toggle("is-revealed", index < Math.min(resultsStep, 5)));
  effectPanel.classList.toggle("is-revealed", resultsStep >= 5);
}

function setRobustnessStep(step) {
  robustnessStep = Math.max(1, Math.min(6, step));
  robustnessSlide.dataset.robustnessStep = String(robustnessStep);
  robustnessBlocks.forEach((block) => {
    const blockStep = Number(block.dataset.robustnessBlock);
    block.classList.toggle("is-revealed", blockStep <= robustnessStep);
  });
  assumptionBar.classList.toggle("is-revealed", robustnessStep >= 3);
}

function setEvidenceStep(step) {
  evidenceStep = Math.max(1, Math.min(4, step));
  evidenceSlide.dataset.evidenceStep = String(evidenceStep);
  evidenceBlocks.forEach((block) => {
    const blockStep = Number(block.dataset.evidenceBlock);
    block.classList.toggle("is-revealed", blockStep <= evidenceStep);
  });
}

function setEvaluationStep(step) {
  evaluationStep = Math.max(1, Math.min(5, step));
  evaluationSlide.dataset.evaluationStep = String(evaluationStep);
  contributionItems.forEach((item) => item.classList.toggle("is-revealed", evaluationStep >= 1));
  evaluationBlocks.forEach((block) => {
    const blockStep = Number(block.dataset.evaluationBlock);
    block.classList.toggle("is-revealed", blockStep <= evaluationStep);
  });
  futureAgenda.classList.toggle("is-revealed", evaluationStep >= 5);
}

function setConclusionStep(step) {
  conclusionStep = Math.max(1, Math.min(5, step));
  conclusionSlide.dataset.conclusionStep = String(conclusionStep);
  conclusionBlocks.forEach((block) => {
    const blockStep = Number(block.dataset.conclusionBlock);
    block.classList.toggle("is-revealed", blockStep <= conclusionStep);
  });
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.warn("无法切换全屏模式", error);
  }
}

fullscreenButton.addEventListener("click", toggleFullscreen);

overviewItems.forEach((item) => {
  item.addEventListener("click", () => setOverviewStep(Number(item.dataset.overviewTarget)));
});

mechanismItems.forEach((item) => {
  item.addEventListener("click", () => setMechanismStep(Number(item.dataset.mechanismTarget)));
});

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "f") {
    toggleFullscreen();
  }

  if (event.key.toLowerCase() === "r") {
    playIntro();
  }

  if (event.key === "ArrowRight" || event.key === "Right") {
    if (currentSlide === 4 && dataStep < 5) {
      setDataStep(dataStep + 1);
      return;
    }
    if (currentSlide === 5 && classificationStep < 7) {
      setClassificationStep(classificationStep + 1);
      return;
    }
    if (currentSlide === 6 && modelStep < 5) {
      setModelStep(modelStep + 1);
      return;
    }
    if (currentSlide === 7 && resultsStep < 5) {
      setResultsStep(resultsStep + 1);
      return;
    }
    if (currentSlide === 8 && robustnessStep < 6) {
      setRobustnessStep(robustnessStep + 1);
      return;
    }
    if (currentSlide === 9 && evidenceStep < 4) {
      setEvidenceStep(evidenceStep + 1);
      return;
    }
    if (currentSlide === 10 && evaluationStep < 5) {
      setEvaluationStep(evaluationStep + 1);
      return;
    }
    if (currentSlide === 11 && conclusionStep < 5) {
      setConclusionStep(conclusionStep + 1);
      return;
    }
    showSlide(currentSlide + 1);
  }

  if (event.key === "ArrowLeft" || event.key === "Left") {
    if (currentSlide === 4 && dataStep > 1) {
      setDataStep(dataStep - 1);
      return;
    }
    if (currentSlide === 5 && classificationStep > 1) {
      setClassificationStep(classificationStep - 1);
      return;
    }
    if (currentSlide === 6 && modelStep > 1) {
      setModelStep(modelStep - 1);
      return;
    }
    if (currentSlide === 7 && resultsStep > 1) {
      setResultsStep(resultsStep - 1);
      return;
    }
    if (currentSlide === 8 && robustnessStep > 1) {
      setRobustnessStep(robustnessStep - 1);
      return;
    }
    if (currentSlide === 9 && evidenceStep > 1) {
      setEvidenceStep(evidenceStep - 1);
      return;
    }
    if (currentSlide === 10 && evaluationStep > 1) {
      setEvaluationStep(evaluationStep - 1);
      return;
    }
    if (currentSlide === 11 && conclusionStep > 1) {
      setConclusionStep(conclusionStep - 1);
      return;
    }
    showSlide(currentSlide - 1);
  }

  if (event.key === "ArrowDown" || event.key === "Down" || event.key === " ") {
    event.preventDefault();
    if (currentSlide === 0) {
      showSlide(1);
    } else if (currentSlide === 1) {
      setOverviewStep(overviewStep + 1);
    } else if (currentSlide === 3) {
      setMechanismStep(mechanismStep + 1);
    }
  }

  if ((event.key === "ArrowUp" || event.key === "Up") && currentSlide === 1) {
    event.preventDefault();
    setOverviewStep(overviewStep - 1);
  }

  if ((event.key === "ArrowUp" || event.key === "Up") && currentSlide === 3) {
    event.preventDefault();
    setMechanismStep(mechanismStep - 1);
  }
});

window.addEventListener("load", () => {
  setOverviewStep(1);
  setMechanismStep(1);
  setDataStep(1);
  setClassificationStep(1);
  setModelStep(1);
  setResultsStep(1);
  setRobustnessStep(1);
  setEvidenceStep(1);
  setEvaluationStep(1);
  setConclusionStep(1);
  const requestedIndex = slideHashes.indexOf(window.location.hash.slice(1));
  showSlide(requestedIndex >= 0 ? requestedIndex : 0, false);
});

window.addEventListener("hashchange", () => {
  const requestedIndex = slideHashes.indexOf(window.location.hash.slice(1));
  if (requestedIndex >= 0 && requestedIndex !== currentSlide) {
    showSlide(requestedIndex, false);
  }
});
