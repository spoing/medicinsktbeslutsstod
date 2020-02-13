'use strict';

var noanswergivenText = "Ej ifylld";
var printView;

/**
 * Hanterar dragspels komponenters läge utvecklad eller ihopdragen
*/
function setupAccordionEventListener() {
    var acc = document.getElementsByClassName("accordion");
    
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}

/**
 * Hanterar vilken sida som är aktiv baserat på vilken sida som klickats på
 * @param {*} clickedElement Det sidelement som klickats på
 * @param {*} elementId Sidelementets id
 */
function setActivePage(clickedElement, elementId) {
    const menuElementList = [
        document.getElementById("1-info"),
        document.getElementById("2-jamfor"),
        document.getElementById("3-kansla"),
        document.getElementById("4-dittval"),
        document.getElementById("5-quiz"),
        document.getElementById("6-summary")
    ];

    const pageElementList = [
        document.getElementById("p1"),
        document.getElementById("p2"),
        document.getElementById("p3"),
        document.getElementById("p4"),
        document.getElementById("p5"),
        document.getElementById("p6")
    ];

    var navNextOrPrint = document.getElementById("navNextOrPrint");
    var navPrev = document.getElementById("navPrev");
    printView = document.getElementById("onlyprint");
    printView.innerHTML = "";

    if (elementId === "p6") {
        navNextOrPrint.innerHTML = "<div style='cursor: pointer;' onclick='javascript:window.print();'><p><strong>Skriv ut sammanfattningen</strong></p></div>";

        // Fyll första delen av sammanfattningsdragspelet
        handleCopyOfQuizOfRadioButtonType("quiz5-tab5");
        handleCopyOfQuizOfSliderType("quiz1-tab4-full");
        handleCopyOfQuizOfSliderType("quiz4-tab5-full");
        handleCopyOfQuizOfTextareaType("quiz6-tab5");

        // Fyll andra delen av sammanfattningsdragspelet
        handleCopyOfQuizOfRadioButtonType("quiz1-tab5");
        handleCopyOfQuizOfRadioButtonType("quiz2-tab5");
        handleCopyOfQuizOfRadioButtonType("quiz3-tab5");

        // Fyll tredje delen av sammanfattningsdragspelet
        handleCopyOfQuizOfSliderType("quiz1-tab3-full");
        handleCopyOfQuizOfSliderType("quiz2-tab3-full");
        handleCopyOfQuizOfSliderType("quiz3-tab3-full");
        handleCopyOfQuizOfSliderType("quiz4-tab3-full");
        handleCopyOfQuizOfSliderType("quiz5-tab3-full");
        handleCopyOfQuizOfTextareaType("quiz6-tab3");
        handleCopyOfQuizOfTextareaType("quiz7-tab3");
        handleCopyOfQuizOfSliderType("quiz8-tab3-full");
    } else {
        var idOfNextMenuElement = menuElementList[menuElementList.indexOf(clickedElement) + 1];
        var idOfNextPageElement = pageElementList[pageElementList.indexOf(document.getElementById(elementId)) + 1];
        navNextOrPrint.innerHTML = "<div style='cursor: pointer;' onclick='javascript:setActivePage(document.getElementById(\"" + idOfNextMenuElement.id + "\"), \"" + idOfNextPageElement.id + "\");'><p><strong>Nästa sida</strong></p></div>";
    }

    if (elementId === "p1") {
        navPrev.innerHTML = "<div style=''><h3><strong></strong></h3></div>";
    } else {
        var idOfPreviousMenuElement = menuElementList[menuElementList.indexOf(clickedElement) - 1];
        var idOfPrevPageElement = pageElementList[pageElementList.indexOf(document.getElementById(elementId)) - 1];
        navPrev.innerHTML = "<div style='cursor: pointer;' onclick='javascript:setActivePage(document.getElementById(\"" + idOfPreviousMenuElement.id + "\"), \"" + idOfPrevPageElement.id + "\");'><p><strong>Föregående sida</strong></p></div>";
    }

    // Visa vilket menuChoice som är aktivt
    menuElementList.forEach((menuChoice) => {
        if (menuChoice.id === clickedElement.id) {
            clickedElement.style.backgroundColor = "#94c11f";
            clickedElement.style.color = "#ffffff";
        } else {
            menuChoice.style.backgroundColor = "#eee";
            menuChoice.style.color = "#000000";
        }
    });

    // Visa sida med innehåll
    pageElementList.forEach((page) => {
        if (page.id === elementId) {
            page.style.display = "block";
        } else {
            page.style.display = "none";
        }
    });
}

function handleCopyOfQuizOfRadioButtonType(elementNameToCopyTo) {
    var elementToCopyTo = document.getElementsByName(elementNameToCopyTo);
    var elementToCopyFrom = document.getElementById(elementNameToCopyTo);

    var header = elementToCopyFrom.getElementsByTagName("h4");

    elementToCopyTo[0].innerHTML = header[0].innerHTML;

    var radioButtons = elementToCopyFrom.getElementsByTagName("input");

    var showText = noanswergivenText;

    for (let element of radioButtons) {
        if (element.checked) {
            showText = element.value;
            break;
        }
    }
    elementToCopyTo[0].innerHTML += " <strong>" + showText + "</strong>";

    /* Anpassa styles för utskrift */
    // let forPrint = elementToCopyTo[0].cloneNode(true);
    // forPrint.id = "onlyPrint" + elementToCopyFrom.id;
    // printView.appendChild(forPrint);
}

function handleCopyOfQuizOfSliderType(elementNameToCopyTo) {
    var showNoAnswerGiven = true;
    var elementToCopyTo = document.getElementsByName(elementNameToCopyTo);
    var elementToCopyFrom = document.getElementById(elementNameToCopyTo);

    var cloneOfElement = elementToCopyFrom.cloneNode(true);

    cloneOfElement.id = "cloneOf" + cloneOfElement.id;

    var subSliderElement = cloneOfElement.getElementsByClassName("containerSlide")[0].children[0];
    subSliderElement.id = "cloneOf" + subSliderElement.id;
    
    for (let element of subSliderElement.children) {
        element.removeAttribute('onclick');
        if (element.attributes.name === undefined) {
            for (let childElement of element.children) {
                childElement.removeAttribute('onclick');
                if (childElement.className.match("^vald .*")) {
                    showNoAnswerGiven = false;
                }
            }
        }
        if (element.className === 'vald') {
            showNoAnswerGiven = false;
        }
    }

    if (showNoAnswerGiven) {
        elementToCopyTo[0].innerText = noanswergivenText;
    } else {
        elementToCopyTo[0].innerText = '';
        if (elementToCopyTo[0].children.length === 0) {
            elementToCopyTo[0].appendChild(cloneOfElement);
        } else {
            elementToCopyTo[0].replaceChild(cloneOfElement, elementToCopyTo[0].children[0]);
        }
    }

    /* Anpassa styles för utskrift */
    // let forPrint = elementToCopyFrom.cloneNode(true);
    // forPrint.id = "onlyPrint" + elementToCopyFrom.id;

    // for (let element of forPrint.children) {
    //     element.removeAttribute('onclick');
    //     if (element.attributes.name === undefined) {
    //         for (let childElement of element.children) {
    //             childElement.removeAttribute('onclick');
    //             if (childElement.className.match("^vald .*")) {
    //                 childElement.removeAttribute('style');
    //                 childElement.attributes.className = "for-print-vald";
    //             } else {
    //                 childElement.removeAttribute('style');
    //                 childElement.className = "for-print-ejvald";
    //             }
    //         }
    //     }
    //     if (element.className === 'vald') {
    //         element.removeAttribute('style');
    //         element.attributes.className = "for-print-vald";
    //     } else {
    //         element.removeAttribute('style');
    //         element.attributes.className = "for-print-ejvald";
    //     }
    // }
    // printView.appendChild(forPrint);
}

function handleCopyOfQuizOfTextareaType(elementNameToCopyTo) {
    var elementToCopyTo = document.getElementsByName(elementNameToCopyTo);
    var elementToCopyFrom = document.getElementById(elementNameToCopyTo);

    var textarea = elementToCopyFrom.getElementsByTagName("textarea");

    if (textarea[0].value.length > 0) {
        elementToCopyTo[0].innerText = textarea[0].value;
    } else {
        elementToCopyTo[0].innerText = noanswergivenText;
    }

    /* Anpassa styles för utskrift */
    // let forPrint = elementToCopyTo[0].cloneNode(true);
    // forPrint.id = "onlyPrint" + elementToCopyFrom.id;
    // printView.appendChild(forPrint);
}

/**
 * Returnerar vilken sida som är aktiv samt sidan innan (vänster) och efter (höger)
 * om den aktiva sidan.
 */
function getActivePage() {
    const pageElementList = [
        document.getElementById("p1"),
        document.getElementById("p2"),
        document.getElementById("p3"),
        document.getElementById("p4"),
        document.getElementById("p5"),
        document.getElementById("p6")
    ];

    var pagesPrevCurNext = { prev: '', cur: '', next: '' };

    pageElementList.forEach((page) => {
        if (page.style.display === "block") {
            pagesPrevCurNext.prev = pageElementList[pageElementList.indexOf(page) - 1];
            pagesPrevCurNext.cur = pageElementList[pageElementList.indexOf(page)];
            pagesPrevCurNext.next = pageElementList[pageElementList.indexOf(page) + 1];
        }
    });

    return pagesPrevCurNext;
}

/**
 * Hanterar val i en dubbelriktad "slide" avgör vilka sektioner av "slide:en" som ska
 * vara tända/släckta (vald eller ej vald) 
 * @param {*} element Elementet för den sektion av "slide:en" som klickats på
 */
function toggleSelection(element) {
    var question = element.parentElement;
    if (question.id.match("quiz.*") == null) {
        question = question.parentElement;
    }

    const choiceList = [
        question.children[0],
        question.children[1],
        question.children[2],
        question.children[3].children[0],
        question.children[3].children[1],
        question.children[4],
        question.children[5],
        question.children[6]
    ];

    // Kollar att vi har klickat på någon av knapparna i mitten
    if (element.attributes.name.value === 'val0L' || element.attributes.name.value === 'val0R') {

        // Går igenom listan med möjliga val och sätter class ejvald på det som inte är klickat på
        choiceList.forEach((val) => {

            // Kollar om där vi är i listan matchar det som vi klickat på (id) och sätter class vald
            // annars (else) sätts class ejvald
            if (val.attributes.name.value === 'val0L' || val.attributes.name.value === 'val0R') {

                if (val.attributes.name.value.match('.*L$') !== null) {
                    val.className = 'vald leftmiddle';
                } else {
                    val.className = 'vald rightmiddle';
                }

            } else {
                val.className = 'ejvald';
            }

        });

    } else if (element.attributes.name.value.match('.*L$') !== null) {
        choiceList.forEach((val) => {
            if (val.attributes.name.value.match('.*R$') !== null) {
                if (val.attributes.name.value.match('.*0R$') !== null) {
                    val.className = 'ejvald rightmiddle';
                } else {
                    val.className = 'ejvald';
                }
            }
        });
        if (element.attributes.name.value.match('.*1L$') !== null) {
            choiceList[0].className = 'ejvald';
            choiceList[1].className = 'ejvald';
            choiceList[2].className = 'vald';
            choiceList[3].className = 'vald leftmiddle';
        } else if (element.attributes.name.value.match('.*2L$') !== null) {
            choiceList[0].className = 'ejvald';
            choiceList[1].className = 'vald';
            choiceList[2].className = 'vald';
            choiceList[3].className = 'vald leftmiddle';
        } else if (element.attributes.name.value.match('.*3L$') !== null) {
            choiceList[0].className = 'vald';
            choiceList[1].className = 'vald';
            choiceList[2].className = 'vald';
            choiceList[3].className = 'vald leftmiddle';
        }
    } else if (element.attributes.name.value.match('.*R$') !== null) {
        choiceList.forEach((val) => {
            if (val.attributes.name.value.match('.*L$') !== null) {
                if (val.attributes.name.value.match('.*0L$') !== null) {
                    val.className = 'ejvald leftmiddle';
                } else {
                    val.className = 'ejvald';
                }
            }
        });
        if (element.attributes.name.value.match('.*1R$') !== null) {
            choiceList[7].className = 'ejvald';
            choiceList[6].className = 'ejvald';
            choiceList[5].className = 'vald';
            choiceList[4].className = 'vald rightmiddle';
        } else if (element.attributes.name.value.match('.*2R$') !== null) {
            choiceList[7].className = 'ejvald';
            choiceList[6].className = 'vald';
            choiceList[5].className = 'vald';
            choiceList[4].className = 'vald rightmiddle';
        } else if (element.attributes.name.value.match('.*3R$') !== null) {
            choiceList[7].className = 'vald';
            choiceList[6].className = 'vald';
            choiceList[5].className = 'vald';
            choiceList[4].className = 'vald rightmiddle';
        }
    }
}

/**
 * Hanterar val i en enkelriktad "slide" avgör vilka sektioner av "slide:en" som ska
 * vara tända/släckta (vald eller ej vald) 
 * @param {*} element Elementet för den sektion av "slide:en" som klickats på
 */
function toggleSelectionRight(element) {
    var question = element.parentElement;

    const choiceList = [
        question.children[0],
        question.children[1],
        question.children[2],
        question.children[3],
        question.children[4],
        question.children[5],
        question.children[6]
    ];

    if (element.attributes.name.value.match('.*R$') !== null) {
        var markAs = 'vald';
        choiceList.forEach((val) => {
            val.className = markAs;
            if (val.attributes.name.value === element.attributes.name.value) {
                markAs = 'ejvald';
            }
        });
    }
}