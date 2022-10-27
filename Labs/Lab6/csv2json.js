/*Aufgabe 1: CSV zu JSON (Abgabe)
Ziel dieser Aufgabe ist es, ein Script zu implementieren, mit dem Sie eine CSV-Datei (CommaSeparated Values) nach JSON konvertieren können:
$ node csv2json.js data.csv data.json
Implementieren Sie zunächst den Teil, welcher die CSV-Datei mit Hilfe der File System API synchron
einliest und verschiedene Informationen zur Datei ausgibt:
• Grösse der Datei
• Datum der letzten Änderung
• Anzahl Datensätze
• Benötigte Zeit zum Lesen der Datei
Zum Testen sind unter code/csv eine CSV-Datei abgelegt.
Ergänzen Sie das Programm so, dass die eingelesenen Daten in JSON konvertiert und in die Ausgabedatei geschrieben werden. In JSON resultiert ein Array, welches für jede der CSV-Zeilen einen Eintrag
enthält. Die Attribute befinden sich in der ersten Zeile der CSV-Datei. Sie werden in jeden Eintrag im
JSON-Array als Attribute des Objekts übernommen.
Hinweise:
• Passen Sie auf, dass Sie durch falsche Interpretation der Kommandozeilenargumente nicht versehentlich Ihr Script mit der JSON-Datei überschreiben, wenn beides im gleichen Verzeichnis liegt.
• Die Methode split von String.prototype zerlegt einen String an vorgegebenen Trennzeichen in
seine Bestandteile: https://devdocs.io/javascript/global_objects/string/split
• Sie können zunächst ein JavaScript-Objekt aufbauen, welches mit JSON.stringify in einen JSONString konvertiert wird: https://devdocs.io/javascript/global_objects/json/stringify
Weitere Aufgaben:
• Vergleichen Sie die Zeit zum Lesen der Datei mit der für die Verarbeitung benötigten Zeit.
• Verwenden Sie zum Lesen und Schreiben der Dateien nun asynchrone Funktionen.
• Testen Sie auch die /*/
function csv2json(csvFile, jsonFile) {
    const fs = require('fs');
    const path = require('path');
    const csv = fs.readFileSync(csvFile, 'utf8');
    const lines = csv.split('\n');
    const header = lines[0].split(',');
    const data = lines.slice(1).map(line => {
        const values = line.split(',');
        const obj = {};
        header.forEach((key, i) => {
            obj[key] = values[i];
        });
        return obj;
    });
    fs.writeFileSync(jsonFile, JSON.stringify(data));
}
