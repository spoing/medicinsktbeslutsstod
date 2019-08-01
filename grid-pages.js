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

function setAktivSida(klickatElement, elementId) {
    const menyElementLista = [
        document.getElementById("1-info"),
        document.getElementById("2-jamfor"),
        document.getElementById("3-kansla"),
        document.getElementById("4-dittval"),
        document.getElementById("5-quiz"),
        document.getElementById("6-summary")
    ];

    const sidElementLista = [
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

    // Visa vilket menyval som är aktivt
    menyElementLista.forEach((menyval) => {
        if (menyval.id === klickatElement.id) {
            klickatElement.style.backgroundColor = "#343434";
            klickatElement.style.color = "#ffffff";
        } else {
            menyval.style.backgroundColor = "#eee";
            menyval.style.color = "#000000";
        }
    });

    // Visa sida med innehåll
    sidElementLista.forEach((page) => {
        if (page.id === elementId) {
            page.style.display = "block";
        } else {
            page.style.display = "none";
        }
    });
}

function toggleSelection(element) {
    var fraga = element.parentElement;
    if (fraga.id.match("fraga.*") == null) {
        fraga = fraga.parentElement;
    }

    const valLista = [
        fraga.children[0],
        fraga.children[1],
        fraga.children[2],
        fraga.children[3].children[0],
        fraga.children[3].children[1],
        fraga.children[4],
        fraga.children[5],
        fraga.children[6]
    ];

    // Kollar att vi har klickat på någon av knapparna i mitten
    if (element.attributes.name.value === 'val0L' || element.attributes.name.value === 'val0R') {

        // Går igenom listan med möjliga val och sätter class ejvald på det som inte är klickat på
        valLista.forEach((val) => {

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
        valLista.forEach((val) => {
            if (val.attributes.name.value.match('.*R$') !== null) {
                if (val.attributes.name.value.match('.*0R$') !== null) {
                    val.className = 'ejvald rightmiddle';
                } else {
                    val.className = 'ejvald';
                }
            }
        });
        if (element.attributes.name.value.match('.*1L$') !== null) {
            valLista[0].className = 'ejvald';
            valLista[1].className = 'ejvald';
            valLista[2].className = 'vald';
            valLista[3].className = 'vald leftmiddle';
        } else if (element.attributes.name.value.match('.*2L$') !== null) {
            valLista[0].className = 'ejvald';
            valLista[1].className = 'vald';
            valLista[2].className = 'vald';
            valLista[3].className = 'vald leftmiddle';
        } else if (element.attributes.name.value.match('.*3L$') !== null) {
            valLista[0].className = 'vald';
            valLista[1].className = 'vald';
            valLista[2].className = 'vald';
            valLista[3].className = 'vald leftmiddle';
        }
    } else if (element.attributes.name.value.match('.*R$') !== null) {
        valLista.forEach((val) => {
            if (val.attributes.name.value.match('.*L$') !== null) {
                if (val.attributes.name.value.match('.*0L$') !== null) {
                    val.className = 'ejvald leftmiddle';
                } else {
                    val.className = 'ejvald';
                }
            }
        });
        if (element.attributes.name.value.match('.*1R$') !== null) {
            valLista[7].className = 'ejvald';
            valLista[6].className = 'ejvald';
            valLista[5].className = 'vald';
            valLista[4].className = 'vald rightmiddle';
        } else if (element.attributes.name.value.match('.*2R$') !== null) {
            valLista[7].className = 'ejvald';
            valLista[6].className = 'vald';
            valLista[5].className = 'vald';
            valLista[4].className = 'vald rightmiddle';
        } else if (element.attributes.name.value.match('.*3R$') !== null) {
            valLista[7].className = 'vald';
            valLista[6].className = 'vald';
            valLista[5].className = 'vald';
            valLista[4].className = 'vald rightmiddle';
        }
    }
}

function toggleSelectionRight(element) {
    var fraga = element.parentElement;

    const valLista = [
        fraga.children[0],
        fraga.children[1],
        fraga.children[2],
        fraga.children[3],
        fraga.children[4],
        fraga.children[5],
        fraga.children[6]
    ];

    if (element.attributes.name.value.match('.*R$') !== null) {
        var markeraSom = 'vald';
        valLista.forEach((val) => {
            val.className = markeraSom;
            if (val.attributes.name.value === element.attributes.name.value) {
                markeraSom = 'ejvald';
            }
        });
    }
}