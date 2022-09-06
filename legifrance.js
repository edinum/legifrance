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

function requestToken(callback, remainingAttempts) {
  if (remainingAttempts == null) remainingAttempts = 5;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 400) {
        if (remainingAttempts < 1) {
          alert("Erreur lors de l'authentification à l'API Piste : nombre de tentatives dépassé (" + xhr.status + ")");
          return;
        }
        console.log("requestToken : nouvelle tentative (reste " + Number(remainingAttempts - 1) + ")");
        return requestToken(callback, remainingAttempts - 1);
      }
      if (xhr.status !== 200) {
        alert("Erreur lors de l'authentification à l'API Piste (" + xhr.status + ")");
        return;
      } 
      var response = JSON.parse(xhr.responseText);
      var token = response.access_token;
      var duration = response.expires_in;
      storeToken(token, duration);
      if (typeof callback === "function") {
        callback(token);
      }
    }
  };
  xhr.open("POST", window.pisteUrls.auth);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var clientId = window.pisteClient.id;
  var clientSecret = window.pisteClient.secret;
	var params = "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret + "&scope=openid";
  xhr.send(encodeURI(params));
}

function storeToken(token, duration) {
  var expirationDate = Date.now() + (duration * 1000);
  window.localStorage.setItem("pisteToken", token);
  window.localStorage.setItem("pisteTokenExpirationDate", expirationDate);
}

function getToken(callback) {
  var expirationDate = window.localStorage.getItem("pisteTokenExpirationDate");
  if (Date.now() < expirationDate) {
    var token = window.localStorage.getItem("pisteToken");
    return callback(token);
  }
  return requestToken(callback)
}

function requestData(token, textId) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status !== 200) {
        alert("Erreur lors de la recherche Légifrance (" + xhr.status + ")");
        return;
      } 
      var response = JSON.parse(xhr.responseText);
      populateFields(textId, response.text);
    }
  };
  var apiUrl = window.pisteUrls.api;
  xhr.open("POST", apiUrl);
  xhr.setRequestHeader("accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + token);
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
      var select = document.querySelector("#entries_juridictions select");
      var normalized = normalizeJuridiction(value);
      console.log(select, normalized);
      select.value = normalized;
    } else {
      document.getElementById(key).value = value;
    }
  });
}

function normalizeJuridiction(value) {
  return value
    // Capitalize
    .replace(/[\w-]+$/, function(match) {
      return match.split("-").map(function(str) {
        return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
      }).join("-");
    })
    .replace(/CAA de/i, "CAA")
    .replace(/Conseil d.[ÉE]tat/i, "CE")
    .replace(/Tribunal administratif/i, "TA");
}

function clickHandler() {
  var numerolegifrance = window.prompt("Numéro Légifrance", input.value);
  if (!numerolegifrance) return;
  getToken(function(token) {
    requestData(token, numerolegifrance);
  });
}

// Main
window.pisteClient = {
  id: document.currentScript.getAttribute("data-clientid"),
  secret: document.currentScript.getAttribute("data-clientsecret")
};
window.pisteUrls = {
  auth: document.currentScript.getAttribute("data-authurl"),
  api: document.currentScript.getAttribute("data-apiurl")
}
var input = document.getElementById("numerolegifrance");
var button = createButton(input, clickHandler);
