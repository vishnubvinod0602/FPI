/* ==========================================
   cookies.js
   Fortune Performance Indicator
   Handles saving and restoring form data
========================================== */

const COOKIE_EXPIRY_DAYS = 365;

/* ==========================================
   SET COOKIE
========================================== */

function setCookie(name, value, days = COOKIE_EXPIRY_DAYS) {

    const date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    document.cookie =
        `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;

}

/* ==========================================
   GET COOKIE
========================================== */

function getCookie(name) {

    const cookieName = name + "=";

    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {

        cookie = cookie.trim();

        if (cookie.indexOf(cookieName) === 0) {

            return decodeURIComponent(
                cookie.substring(cookieName.length)
            );

        }

    }

    return "";

}

/* ==========================================
   DELETE COOKIE
========================================== */

function deleteCookie(name) {

    document.cookie =
        `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

}

/* ==========================================
   SAVE COMPLETE FORM
========================================== */

function saveForm() {

    const elements = document.querySelectorAll("input");

    elements.forEach(element => {

        if (!element.id) return;

        if (element.type === "checkbox") {

            setCookie(
                element.id,
                element.checked
            );

        }

        else {

            setCookie(
                element.id,
                element.value
            );

        }

    });

}

/* ==========================================
   LOAD COMPLETE FORM
========================================== */

function loadForm() {

    const elements = document.querySelectorAll("input");

    elements.forEach(element => {

        if (!element.id) return;

        const value = getCookie(element.id);

        if (value === "") return;

        if (element.type === "checkbox") {

            element.checked = (value === "true");

        }

        else {

            element.value = value;

        }

    });

}

/* ==========================================
   CLEAR ALL COOKIES USED BY FPI
========================================== */

function clearCookies() {

    const elements = document.querySelectorAll("input");

    elements.forEach(element => {

        if (!element.id) return;

        deleteCookie(element.id);

    });

}

/* ==========================================
   AUTO SAVE
========================================== */

function enableAutoSave() {

    const elements = document.querySelectorAll("input");

    elements.forEach(element => {

        element.addEventListener("change", saveForm);

        element.addEventListener("keyup", saveForm);

    });

}

/* ==========================================
   RESET FORM
========================================== */

function resetForm() {

    const elements = document.querySelectorAll("input");

    elements.forEach(element => {

        if (element.type === "checkbox") {

            element.checked = false;

        }

        else {

            element.value = "";

        }

    });

    clearCookies();

    if (typeof updateUI === "function") {

        updateUI();

    }

}

/* ==========================================
   EXPORT DATA
========================================== */

function getFormData() {

    const data = {};

    const elements = document.querySelectorAll("input");

    elements.forEach(element => {

        if (!element.id) return;

        data[element.id] =
            element.type === "checkbox"
                ? element.checked
                : element.value;

    });

    return data;

}

/* ==========================================
   IMPORT DATA
========================================== */

function setFormData(data) {

    Object.keys(data).forEach(key => {

        const element = document.getElementById(key);

        if (!element) return;

        if (element.type === "checkbox") {

            element.checked = data[key];

        }

        else {

            element.value = data[key];

        }

    });

}

/* ==========================================
   INITIALIZE COOKIE MODULE
========================================== */

function initializeCookies() {

    loadForm();

    enableAutoSave();

}