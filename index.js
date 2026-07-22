/* ==========================================
   index.js
   Fortune Performance Indicator
   Main Application Controller
========================================== */

document.addEventListener("DOMContentLoaded", initializeApp);

/* ==========================================
   INITIALIZE APPLICATION
========================================== */

function initializeApp() {

    showLoading();

    try {

        /* Restore saved data */

        if (typeof initializeCookies === "function") {

            initializeCookies();

        }

        /* Initialize UI */

        if (typeof initializeUI === "function") {

            initializeUI();

        }

        /* Initialize PDF */

        if (typeof initializePDF === "function") {

            initializePDF();

        }

        /* Button Events */

        bindButtons();

        /* Initial Calculation */

        updateUI();

    }

    catch (error) {

        console.error(error);

        alert("Application failed to initialize.");

    }

    finally {

        hideLoading();

    }

}

/* ==========================================
   BUTTON EVENTS
========================================== */

function bindButtons() {

    const calculateBtn =
        document.getElementById("calculateBtn");

    const clearBtn =
        document.getElementById("clearBtn");

    if (calculateBtn) {

        calculateBtn.addEventListener("click", function () {

            updateUI();

            saveForm();

        });

    }

    if (clearBtn) {

        clearBtn.addEventListener("click", function () {

            clearForm();

        });

    }

}

/* ==========================================
   AUTO SAVE
========================================== */

document.addEventListener("change", function () {

    if (typeof saveForm === "function") {

        saveForm();

    }

});

document.addEventListener("keyup", function () {

    if (typeof saveForm === "function") {

        saveForm();

    }

});

/* ==========================================
   KEYBOARD SHORTCUTS
========================================== */

document.addEventListener("keydown", function (event) {

    /* Ctrl + S → Save */

    if (event.ctrlKey && event.key.toLowerCase() === "s") {

        event.preventDefault();

        saveForm();

        updateUI();

        alert("Progress saved.");

    }

    /* Ctrl + P → Download PDF */

    if (event.ctrlKey && event.key.toLowerCase() === "p") {

        event.preventDefault();

        downloadPDF();

    }

    /* Escape → Recalculate */

    if (event.key === "Escape") {

        updateUI();

    }

});

/* ==========================================
   AUTO RECALCULATE EVERY 30 SECONDS
========================================== */

setInterval(function () {

    updateUI();

}, 30000);

/* ==========================================
   BEFORE PAGE UNLOAD
========================================== */

window.addEventListener("beforeunload", function () {

    saveForm();

});

/* ==========================================
   WINDOW FOCUS
========================================== */

window.addEventListener("focus", function () {

    loadForm();

    updateUI();

});

/* ==========================================
   ONLINE / OFFLINE STATUS
========================================== */

window.addEventListener("offline", function () {

    console.log("Offline mode");

});

window.addEventListener("online", function () {

    console.log("Back online");

});

/* ==========================================
   GLOBAL ERROR HANDLER
========================================== */

window.addEventListener("error", function (event) {

    console.error(

        "Application Error:",

        event.message

    );

});

/* ==========================================
   END OF APPLICATION
========================================== */