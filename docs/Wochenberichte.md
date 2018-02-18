# Wochenbericht Nr. 1

## Protokoll

* Umsetzung mit Javascript/Html/Css

* Implementierung von Klaus Emathinger
  * Css files angepasst
  * Grundmethoden zur Bewegung des R2D2 implementiert
  * Hintergrund wurde festgelegt
  https://pixabay.com/de/w%C3%BCste-trockenheit-ausgetrocknet-279862/ (CC0 Creative Commons Lizenz)
* Implementierung von Fabian Pieringer
  * Projektstruktur erstellt mit allen node.js Entwicklertools
  * Einbindung des externenen R2D2 Projektes https://github.com/tsnolan23/Pure-CSS-R2D2
  * Ball-Animation implementiert

* Bisher nur theoretischer Entwurf (siehe Notizen) zur geplanten Modellierung des Reinforcements Modell (gemeinsam erarbeitet)

* Dokumentation der Problemmodellierung (siehe Notizen)

* Screenshot:
![Screenshot](Woche1.JPG)

## Erreichte Ziele

* Projektstruktur wurde angelegt
* Klassendiagramm wurde erstellt
* Animation wurde begonnen

## Aufgetretene Probleme

* Keine

## Nächste Ziele

* Fertigstellung der Aktionsanimationen (aktiv)
* Fertigstellung der Interaktionsanimationen (reaktiv)
* Implementierung des Echtzeit-Lernalgorithmus'

# Wochenbericht Nr. 2

## Protokoll

* Implementierung von Klaus Emathinger
  * Animationen programmiert
  * Zustandsraum und Belohnungssystem umgesetzt (pair programming)
  * Wochenbericht	geschrieben
* Implementierung von Fabian Pieringer
  * Animationen implementiert
  * Zustandsraum und Belohnungssystem (pair programming)
  * Zeitliches Timing der Animationen und Spielablauf
  * Projektstruktur und Heroku-Deployment
  https://virtual-r2d2.herokuapp.com/#

## Erreichte Ziele

* Fertigstellung der Aktionsanimationen (aktiv)
* Fertigstellung der Interaktionsanimationen (reaktiv)

## Aufgetretene Probleme

* RL-Algorithmus noch nicht implementiert

## Nächste Ziele

* Zustandsraum weiter abstrahieren
* Reinforcement Algorithmus implementieren
* Parameter anpassen und Tests schreiben (Woche 4 und 5)


# Wochenbericht Nr. 3

## Protokoll

* Easy und Hard-Mode Implemenetierung
* State-Class zur Zustandsraum-Abstrahierung
* Start Reinforcement Algorithmus Implementierung
* Umstieg auf Typescript auf Server

## Erreichte Ziele

* Zustandraum-Abstrahierung abgeschlossen


## Aufgetretene Probleme

* Javascript hat nativ keine multidim. Arrays

## Nächste Ziele

* Reinforcement Algorithmus implementieren


# Wochenbericht Nr. 4

## Protokoll

* Implementierung von Klaus Emathinger
  * Sarsa-Algorithmus mit Pseudocode modellieren
  * Algorithmus implementieren (Pair programming)
  * Debug-Bot implentieren als mock-up für user (Pair Programming)
  * Initalwerte für Q-Table festlegen
  * Debuggen
* Implementierung von Fabian Pieringer
  * Helper functions
  * Alogrithmus implentieren (Pair programming)
  * Debug-Bot implentieren
  * Debuggen

## Erreichte Ziele

* Reinforcement Algorithmus implentiert

## Aufgetretene Probleme

* Programmfehler (die .zB. bei der Vereinfachung des Zustands- und Aktionsraums entstanden sind)

## Nächste Ziele

* Fertig debuggen
* Präsentation fertigstellen
* Dokumentation abschließen

# Wochenbericht Nr. 5

## Protokoll

* Umsetzungen von Klaus Emathinger
  * Sarsa-Algorithmus debuggen
  * Sarsa-Algorithmus optimieren
  * Daten plotten 
* Umsetzungen von Fabian Pieringer
  * Sarsa-Algorithmus debuggen
  * Aktuellen Stand deployen auf heroku
  * Präsentationsfolien erstellen

## Erreichte Ziele

* Projekt bis auf Dokumentation abgeschlossen

## Aufgetretene Probleme

* Viele Bugs
* Optimierung durch 'ausprobieren' von Parametern

## Nächste Ziele

* Fertigstellung der Dokumentation und des Videos
