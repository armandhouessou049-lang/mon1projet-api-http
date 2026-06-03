//Récupération des pièces depuis le fichiers JSON
const reponse = await fetch("pieces-vehicule.json");
const pieces = await reponse.json();

for( let i = 0; i < pieces.length; i++) {

    
const articleElement = document.createElement("article");
const article = pieces[i];

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

};