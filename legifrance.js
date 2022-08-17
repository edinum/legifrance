function createButton(target, handler) {
  var button = document.createElement("button");
  var buttonText = document.createTextNode("Recherche Légifrance");
  button.appendChild(buttonText);
  button.setAttribute("type", "button");
  button.style.marginLeft = "10px";
  button.style.fontSize = "12px";
  button.addEventListener("click", handler, false);
  target.insertAdjacentElement('afterend', button);
  return button;
}

function request(apikey, textId) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status !== 200) {
        alert("Erreur lors de la recherche Légifrance (" + xhr.status + ")");
      } else {
        var response = JSON.parse(xhr.responseText);
        populateFields(textId, response.text);
      }
    }
  };
  // TODO: use production, not sandbox
  xhr.open("POST", "https://sandbox-api.piste.gouv.fr/dila/legifrance-beta/lf-engine-app/consult/juri");
  xhr.setRequestHeader("accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + apikey);
  xhr.send(JSON.stringify({ "textId": textId }));
}

function populateFields(textId, data) {
  var fields = {
    numerolegifrance: textId,
    numero: data.num,
    chambre: data.formation,
    date: new Date(data.relevantDate).toLocaleDateString("fr-FR"),
    lien: "https://www.legifrance.gouv.fr/ceta/id/" + textId,
    entries_codepublication: data.publicationRecueil,
    entries_juridictions: data.juridiction
  };

  Object.keys(fields).forEach(function(key) {
    var value = fields[key];
    if (key === "entries_codepublication") {
      var select = document.querySelector("#entries_codepublication select");
      select.value = value;
    } else if (key === "entries_juridictions") {
      // TODO
    } else {
      document.getElementById(key).value = value;
    }
  });
}

// Main
var apikey = document.currentScript.getAttribute("data-apikey");
var input = document.getElementById("numerolegifrance");

var handler = function() {
  var numerolegifrance = window.prompt("Numéro Légifrance", input.value);
  if (!numerolegifrance) return;
  request(apikey, numerolegifrance);
}

var button = createButton(input, handler);
