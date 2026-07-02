// Récupération de l'id du véhicule depuis l'URL (?id=...)
const parametres = new URLSearchParams(window.location.search);
const idVehicule = parametres.get("id");

// Récupération des véhicules depuis le fichier JSON
const reponse = await fetch("pieces-vehicule.json");
const pieces = await reponse.json();

// Recherche du véhicule correspondant à l'id
const vehicule = pieces.find(piece => String(piece.id) === String(idVehicule));

if (vehicule) {
    afficherVehicule(vehicule);
} else {
    document.querySelector("#titre-vehicule").textContent = "Véhicule introuvable";
    document.querySelector("#fiche-vehicule").innerHTML = "<p>Ce véhicule n'existe pas ou n'est plus disponible.</p>";
}

function afficherVehicule(vehicule) {
    document.querySelector("#titre-vehicule").textContent = vehicule.nom;

    const imageElement = document.querySelector("#vehicule-image");
    imageElement.src = vehicule.image;
    imageElement.alt = vehicule.nom;

    document.querySelector("#vehicule-nom").textContent = vehicule.nom;
    document.querySelector("#vehicule-description").textContent = vehicule.description;
    document.querySelector("#vehicule-prix").textContent = `Prix : ${vehicule.prix} €`;
    document.querySelector("#vehicule-categorie").textContent = `Catégorie : ${vehicule.categorie}`;
    document.querySelector("#vehicule-disponibilite").textContent = vehicule.disponibilite ? "Disponible" : "Indisponible";
}

//////////////////////////////////
// Gestion des avis
//////////////////////////////////

const cleStockageAvis = `avis-vehicule-${idVehicule}`;

function recupererAvis() {
    const donnees = localStorage.getItem(cleStockageAvis);
    return donnees ? JSON.parse(donnees) : [];
}

function sauvegarderAvis(avis) {
    localStorage.setItem(cleStockageAvis, JSON.stringify(avis));
}

function afficherAvis() {
    const conteneurAvis = document.querySelector("#liste-avis");
    const avis = recupererAvis();

    conteneurAvis.innerHTML = "";

    if (avis.length === 0) {
        conteneurAvis.innerHTML = "<p>Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>";
        return;
    }

    avis.forEach(function (unAvis) {
        const avisElement = document.createElement("div");
        avisElement.classList.add("avis-item");

        const enteteElement = document.createElement("div");
        enteteElement.classList.add("avis-entete");

        const nomElement = document.createElement("span");
        nomElement.classList.add("avis-nom");
        nomElement.textContent = unAvis.nom;

        const noteElement = document.createElement("span");
        noteElement.classList.add("avis-note");
        noteElement.textContent = `${"★".repeat(unAvis.note)}${"☆".repeat(5 - unAvis.note)}`;

        const dateElement = document.createElement("span");
        dateElement.classList.add("avis-date");
        dateElement.textContent = unAvis.date;

        enteteElement.appendChild(nomElement);
        enteteElement.appendChild(noteElement);
        enteteElement.appendChild(dateElement);

        const commentaireElement = document.createElement("p");
        commentaireElement.textContent = unAvis.commentaire;

        avisElement.appendChild(enteteElement);
        avisElement.appendChild(commentaireElement);

        conteneurAvis.appendChild(avisElement);
    });
}

afficherAvis();

// Envoi d'un nouvel avis
const formulaireAvis = document.querySelector("#form-avis");
formulaireAvis.addEventListener("submit", function (evenement) {
    evenement.preventDefault();

    const nom = document.querySelector("#nom-avis").value.trim();
    const note = Number(document.querySelector("#note-avis").value);
    const commentaire = document.querySelector("#commentaire-avis").value.trim();

    if (!nom || !commentaire) {
        return;
    }

    const nouvelAvis = {
        nom: nom,
        note: note,
        commentaire: commentaire,
        date: new Date().toLocaleDateString("fr-FR")
    };

    const avis = recupererAvis();
    avis.unshift(nouvelAvis); // le nouvel avis apparaît en premier
    sauvegarderAvis(avis);

    afficherAvis();
    formulaireAvis.reset();
});
