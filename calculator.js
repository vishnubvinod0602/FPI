/* ==========================================
   calculator.js
   Fortune Performance Indicator
========================================== */

/*
----------------------------------------------
MAXIMUM SCORES
----------------------------------------------
Learning Index       : 210
Reinforcement Index  : 168
Performance Index    : 105
----------------------------------------------
Weightage
----------------------------------------------
Learning       40%
Reinforcement  40%
Performance    20%
----------------------------------------------
*/

const MAX_LEARNING = 210;
const MAX_REINFORCEMENT = 168;
const MAX_PERFORMANCE = 105;

/* ==========================================
   COUNT CHECKED
========================================== */

function countChecked(ids) {

    let count = 0;

    ids.forEach(id => {

        const element = document.getElementById(id);

        if (element && element.checked) {

            count++;

        }

    });

    return count;

}

/* ==========================================
   LEARNING INDEX
========================================== */

function calculateLearning() {

    const gs =
        countChecked([
            "gs_mon","gs_tue","gs_wed",
            "gs_thu","gs_fri","gs_sat"
        ]) * 10;

    const newspaper =
        countChecked([
            "news_mon","news_tue","news_wed",
            "news_thu","news_fri","news_sat"
        ]) * 10;

    const optional =
        countChecked([
            "opt_mon","opt_tue","opt_wed",
            "opt_thu","opt_fri","opt_sat"
        ]) * 10;

    const dna =
        countChecked([
            "dna_mon","dna_tue","dna_wed",
            "dna_thu","dna_fri","dna_sat"
        ]) * 5;

    return gs + newspaper + optional + dna;

}

/* ==========================================
   REINFORCEMENT INDEX
========================================== */

function calculateReinforcement() {

    const gsRevision =
        countChecked([
            "gsr_mon","gsr_tue","gsr_wed",
            "gsr_thu","gsr_fri","gsr_sat"
        ]) * 10;

    const optionalRevision =
        countChecked([
            "opr_mon","opr_tue","opr_wed",
            "opr_thu","opr_fri","opr_sat"
        ]) * 10;

    const weeklyPreparation =
        countChecked([
            "wtp_mon","wtp_tue","wtp_wed",
            "wtp_thu","wtp_fri","wtp_sat"
        ]) * 8;

    return gsRevision + optionalRevision + weeklyPreparation;

}

/* ==========================================
   PERFORMANCE INDEX
========================================== */

function calculatePerformance() {

    const answerWriting =
        countChecked([
            "aw_mon","aw_tue","aw_wed",
            "aw_thu","aw_fri","aw_sat"
        ]) * 10;

    const weeklyTest =
        document.getElementById("weeklyTest").checked
            ? 45
            : 0;

    return answerWriting + weeklyTest;

}

/* ==========================================
   PERCENTAGES
========================================== */

function calculatePercent(score, maxScore) {

    return (score / maxScore) * 100;

}

/* ==========================================
   FINAL FPI
========================================== */

function calculateFPI() {

    const learning =
        calculateLearning();

    const reinforcement =
        calculateReinforcement();

    const performance =
        calculatePerformance();

    const learningPercent =
        calculatePercent(
            learning,
            MAX_LEARNING
        );

    const reinforcementPercent =
        calculatePercent(
            reinforcement,
            MAX_REINFORCEMENT
        );

    const performancePercent =
        calculatePercent(
            performance,
            MAX_PERFORMANCE
        );

    const fpi =

        (learningPercent * 0.40) +

        (reinforcementPercent * 0.40) +

        (performancePercent * 0.20);

    return {

        learning,

        reinforcement,

        performance,

        learningPercent,

        reinforcementPercent,

        performancePercent,

        fpi,

        status:getStatus(fpi)

    };

}

/* ==========================================
   STATUS
========================================== */

function getStatus(score) {

    if(score>=90){

        return{

            text:"Excellent",

            className:"status-excellent"

        };

    }

    if(score>=75){

        return{

            text:"On Track",

            className:"status-track"

        };

    }

    if(score>=60){

        return{

            text:"Needs Attention",

            className:"status-attention"

        };

    }

    return{

        text:"Critical",

        className:"status-critical"

    };

}

/* ==========================================
   REFRESH RESULT
========================================== */

function refreshCalculation(){

    const result=calculateFPI();

    document.getElementById("learningScore").textContent =
        result.learning;

    document.getElementById("reinforcementScore").textContent =
        result.reinforcement;

    document.getElementById("performanceScore").textContent =
        result.performance;

    document.getElementById("fpiScore").textContent =
        result.fpi.toFixed(1)+"%";

    const status=document.getElementById("status");

    status.textContent="Status : "+result.status.text;

    status.className=result.status.className;

    return result;

}