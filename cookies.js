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

    for (