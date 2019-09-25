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

    // if(elementId === 'p6') {
    // 	const fraga1 = document.getElementById('fraga1');
    // 	var p6 = document.getElementById('p6');
    // 	p6.innerHTML = "<br><br><div class='grid-containerSlide'>" + fraga1.innerHTML + "</div>";
    // }

    // Visa vilket menuChoice som är aktivt
    menuElementList.forEach((menuChoice) => {
        if (menuChoice.id === clickedElement.id) {
            clickedElement.style.backgroundColor = "#343434";
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

    var pagesPrevCurNext = {prev: '', cur: '', next: ''};

    pageElementList.forEach((page) => {
        if(page.style.display === "block") {
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
    if (question.id.match("fraga.*") == null) {
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