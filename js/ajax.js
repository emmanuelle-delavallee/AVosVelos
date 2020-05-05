// Exécute un appel AJAX GET (Modèle repris du cours OCR)
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès

class AjaxGet {
    ajaxGet(url, callback) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.addEventListener("load", () => {
            if (req.status >= 200 && req.status < 400) {
                // Appelle la fonction callback en lui passant la réponse de la requète
                callback(req.responseText);
            } else {
                console.error(req.status + " " + req.statusText + " " + url);
            }
        });
        req.addEventListener("error", function () {
            console.error("Erreur rÃ©seau avec l'URL " + url);
        });
        req.send(null);
    }
}
