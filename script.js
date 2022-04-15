/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const CHK_IMAGE_URL = "images/checked.png";
const UNCHK_IMAGE_URL = "images/unchecked.png";
let scelta_one = false;
let scelta_two = false;
let scelta_tree = false;

function opacizza(img_sel, domanda) {
  const im_chk = document.createElement("img");
  im_chk.src = CHK_IMAGE_URL;

  const chks = document.querySelectorAll(".checkbox");

  for (const chk of chks) {
    if (chk.parentNode.dataset.questionId == domanda) {
      chk.parentNode.classList.add("non_selezionato"); // aggiunge opacita a tutti
      img_sel.parentNode.classList.add("selezionato"); // aggiunge blu a img_sel
      img_sel.parentNode.classList.remove("non_selezionato"); // toglie opacita a img_sel
    }
  }
}

function deseleziona(img_sel, domanda) {
  const im_chk = document.createElement("img");
  im_chk.src = CHK_IMAGE_URL;
  const im_unchk = document.createElement("img");
  im_unchk.src = UNCHK_IMAGE_URL;

  const chks = document.querySelectorAll(".checkbox");

  for (const chk of chks) {
    if (chk.src == im_chk.src && chk.parentNode.dataset.questionId == domanda) {
      chk.src = im_unchk.src; // cambia checked con unchecked
      chk.parentNode.classList.remove("selezionato"); // rimuove blu  a tutti
      img_sel.parentNode.classList.add("selezionato");
    }
  }
}

function ricominciaTest() {
  console.log("Si ricomincia");
  const im_unchk = document.createElement("img");
  im_unchk.src = UNCHK_IMAGE_URL;

  const chks = document.querySelectorAll(".checkbox");
  for (const chk of chks) {
    chk.src = im_unchk.src;
    chk.parentNode.classList.remove("non_selezionato");
    chk.parentNode.classList.remove("selezionato");
    chk.addEventListener("click", changeToCheck);
  }

  const risultato = document.querySelector("#risultato");
  if (risultato.hasChildNodes()) {
    while (risultato.firstChild) {
      risultato.removeChild(risultato.firstChild);
    }
  }

  risultato.classList.add("hidden");
  scelta_one = scelta_two = scelta_tree = false;
}

function getPersonalita() {
  let scelta1, scelta2, scelta3, personalita;
  let titolo = "",
    descr = "";
  const chks = document.querySelectorAll(".checkbox");
  const im_chk = document.createElement("img");
  im_chk.src = CHK_IMAGE_URL;

  for (const chk of chks) {
    if (chk.src == im_chk.src) {
      if (chk.parentNode.dataset.questionId == "one") {
        scelta1 = chk.parentNode.dataset.choiceId;
        console.log("\nScelta1 = " + scelta1);
      }
      if (chk.parentNode.dataset.questionId == "two") {
        scelta2 = chk.parentNode.dataset.choiceId;
        console.log("\nScelta2 = " + scelta2);
      }
      if (chk.parentNode.dataset.questionId == "three") {
        scelta3 = chk.parentNode.dataset.choiceId;
        console.log("\nScelta3 = " + scelta3);
      }
    }
  }

  console.log(
    "\nScelta1 = " +
      scelta1 +
      " - Scelta2 = " +
      scelta2 +
      " - Scelta3 = " +
      scelta3
  );
  if (
    (scelta1 == scelta2 && scelta2 == scelta3) ||
    (scelta1 != scelta2 && scelta2 != scelta3 && scelta1 != scelta3) ||
    (scelta1 == scelta2 && scelta2 != scelta3) ||
    (scelta1 == scelta3 && scelta2 != scelta3)
  )
    personalita = scelta1;
  else if (scelta2 == scelta3 && scelta1 != scelta2) personalita = scelta2;

  const risultato = document.querySelector("#risultato");

  titolo = document.createElement("h2");
  descr = document.createElement("p");
  titolo.textContent = RESULTS_MAP[personalita].title;
  descr.textContent = RESULTS_MAP[personalita].contents;

  risultato.appendChild(titolo);
  risultato.appendChild(descr);

  const tasto = document.createElement("button");
  tasto.textContent = "Ricomincia il quiz";
  tasto.classList.add("button");
  tasto.addEventListener("click", ricominciaTest);
  risultato.classList.remove("hidden");
  risultato.appendChild(tasto);
}

function changeToCheck(event) {
  const img_sel = event.currentTarget;
  const im_chk = document.createElement("img");
  im_chk.src = CHK_IMAGE_URL;

  let domanda = img_sel.parentNode.dataset.questionId;
  if (domanda == "one") {
    opacizza(img_sel, "one");
    deseleziona(img_sel, "one");
    scelta_one = true;
  } else if (domanda == "two") {
    opacizza(img_sel, "two");
    deseleziona(img_sel, "two");
    scelta_two = true;
  } else if (domanda == "three") {
    opacizza(img_sel, "three");
    deseleziona(img_sel, "three");
    scelta_tree = true;
  }

  img_sel.src = im_chk.src;

  const chks = document.querySelectorAll(".checkbox");

  if (scelta_one && scelta_two && scelta_tree) {
    for (const chk of chks) {
      chk.removeEventListener("click", changeToCheck);
    }
    getPersonalita();
  }
}

const chks = document.querySelectorAll(".checkbox");

for (const chk of chks) {
  chk.addEventListener("click", changeToCheck);
}
