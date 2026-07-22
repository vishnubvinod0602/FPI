/* ==========================================
   ui.js
   Fortune Performance Indicator
   Handles UI updates and interactions
========================================== */

/* ==========================================
   ELEMENTS
========================================== */

const learningScore = document.getElementById("learningScore");
const reinforcementScore = document.getElementById("reinforcementScore");
const performanceScore = document.getElementById("performanceScore");
const fpiScore = document.getElementById("fpiScore");
const statusText = document.getElementById("status");
const resultCard = document.getElementById("result");

/* ==========================================
   UPDATE UI
========================================== */

function updateUI() {

    const result = calculateFPI();

    learningScore.textContent = result.learning;

    reinforcementScore.textContent = result.reinforcement;

    performanceScore.textContent = result.performance;

    fpiScore.textContent = result.fpi.toFixed(1) + "%";

    statusText.textContent = "Status : " + result.status.text;

    statusText.className = result.status.className;

    updateResultColor(result.fpi);

    animateResult();

}

/* ==========================================
   RESULT CARD COLOR
========================================== */

function updateResultColor(score) {

    resultCard.classList.remove(
        "success",
        "warning",
        "danger"
    );

    if (score >= 90) {

        resultCard.classList.add("success");

    }

    else if (score >= 60) {

        resultCard.classList.add("warning");

    }

    else {

        resultCard.classList.add("danger");

    }

}

/* ==========================================
   CLEAR FORM
========================================== */

function clearForm() {

    if (!confirm("Clear all saved data?")) {

        return;

    }

    document.querySelectorAll("input").forEach(input => {

        if (input.type === "checkbox") {

            input.checked = false;

        }

        else {

            input.value = "";

        }

    });

    if (typeof clearCookies === "function") {

        clearCookies();

    }

    updateUI();

}

/* ==========================================
   ANIMATION
========================================== */

function animateResult() {

    resultCard.classList.remove("fade-in");

    void resultCard.offsetWidth;

    resultCard.classList.add("fade-in");

}

/* ==========================================
   LOADING
========================================== */

function showLoading() {

    let loader = document.getElementById("loading");

    if (!loader) {

        loader = document.createElement("div");

        loader.id = "loading";

        loader.className = "loading";

        loader.innerHTML = "<div class='spinner'></div>";

        document.body.appendChild(loader);

    }

    loader.classList.remove("hidden");

}

function hideLoading() {

    const loader = document.getElementById("loading");

    if (loader) {

        loader.classList.add("hidden");

    }

}

/* ==========================================
   MESSAGE
========================================== */

function showMessage(message) {

    alert(message);

}

/* ==========================================
   LIVE CALCULATION
========================================== */

function enableLiveCalculation() {

    document.querySelectorAll("input").forEach(input => {

        input.addEventListener("change", () => {

            updateUI();

        });

        input.addEventListener("keyup", () => {

            updateUI();

        });

    });

}

/* ==========================================
   PRINT RESULT
========================================== */

function printResult() {

    window.print();

}

/* ==========================================
   RESET STATUS
========================================== */

function resetResult() {

    learningScore.textContent = "0";

    reinforcementScore.textContent = "0";

    performanceScore.textContent = "0";

    fpiScore.textContent = "0%";

    statusText.textContent = "Status : --";

    statusText.className = "";

}

/* ==========================================
   INITIALIZE UI
========================================== */

function initializeUI() {

    updateUI();

    enableLiveCalculation();

}