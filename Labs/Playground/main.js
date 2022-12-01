function activateOnce (elem, type, handler) {
    let remove = () => {
        elem.removeEventListener(type, handler)
        elem.removeEventListener(type, remove)
    }
    elem.addEventListener(type, handler)
    elem.addEventListener(type, remove)
}

// Beispielaufruf:
activateOnce(mybutton, "click", () => alert("Button clicked"))


// q: Die Funktion arbeitet wie beschrieben
// a: Ja

// q: Das funkioniert nur, wenn auf diese Weise nicht meherere Events vom gleichen Typ am gleichen Element registriert werden, weil deren remove-Methode dann nicht mehr unterscheidbar sind
// a: Ja

// q: Das registriert zwar den Handler, aber er beliebig oft ausgeführt, da remove sich nicht selbst aus der Liste der Listener entfernen kann
// a: Nein


// q: Das funktioniert so nicht, weil zweimal Events des gleichen Typs definiert werden und der erste den zweiten überschreibt
// a: Nein
