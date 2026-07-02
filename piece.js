//Récupération des pièces depuis le fichiers JSON
const reponse = await fetch("pieces-vehicule.json");
const pieces = await reponse.json();

function generervehicules(pieces){
for( let i = 0; i < pieces.length; i++) {
 const article= pieces[i];
 // Création d’une balise dédiée à un vehicule
const articleElement = document.createElement("article");
articleElement.dataset.id = pieces[i].id

const imageElement =  document.createElement("img");
imageElement.src = article.image;
const nomElement = document.createElement("h2");
nomElement.textContent = article.nom;
const descriptionElement = document.createElement("p");
descriptionElement.textContent = article.description;
const prixElement = document.createElement("p");
prixElement.textContent = `Prix : ${article.prix} €`;
const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie;
categorieElement.style="font weight:10px,"
const disponibiliteElement = document.createElement("p");
disponibiliteElement.textContent = article.disponibilite ? "Disponible" : "Indisponible";

const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(articleElement);
articleElement.appendChild(imageElement);
articleElement.appendChild(nomElement);
articleElement.appendChild(descriptionElement);
articleElement.appendChild(prixElement);
articleElement.appendChild(categorieElement);
articleElement.appendChild(disponibiliteElement);


// Rendre la fiche cliquable : redirection vers la page de détail du véhicule
articleElement.style.cursor = "pointer";
articleElement.addEventListener("click", function () {
  window.location.href = `vehicule.html?id=${article.id}`;
});


};

}
generervehicules(pieces);

//gestion des bouttons 
//boutton pour trier par ordres croisant de prix 
const boutonTrierP = document.querySelector(".btn-Trier-Prix");
boutonTrierP.addEventListener("click", function(){
      const vehiculesOrdonnees = Array.from(pieces);
    vehiculesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    generervehicules(vehiculesOrdonnees);
});

    const boutonDisponibles = document.querySelector(".btn-disponibles");
    boutonDisponibles.addEventListener("click", function(){
    // Filtrer les véhicules disponibles
    const vehiculesDisponibles = pieces.filter(piece => piece.disponibilite === true );
     // Vider la section des fiches
    document.querySelector(".fiches").innerHTML = "";
     // Afficher uniquement les véhicules disponibles
    generervehicules(vehiculesDisponibles);
})