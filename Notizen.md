# Semesterprojekt
## R2-d2

Ziel: Bedürfnisse gezielt befriedigen

### Zustandsraum/Bedürfnisse
*	Energie (Strom) - Zeitabhängig
*	Öl, (für Gelenke) – Aktionsabhängig (bei Bewegungen)
*	Aufmerksamkeit (Sprache, tätschelt, Ball) – Zeit und Nutzerabhängig
*	Störung - Aktionsabhängig
* Beliebtheit

### Aktionen
* In Kreis fahren (Aufmerksamkeit)
  * left und top Werte anpassen
*	Roboterarme ausstrecken (Strom, Öl)
  * Arme spiegeln
*	Piepsen (Aufmerksamkeit)
  * Zufällig Leds aus- und einschalten + Sound
* Blinken (Störung beheben)
  * Monotones ein- und ausschalten
*	Hin und her fahren (Aufmerksamkeit)
  * left Werte anpassen/links-rechts gehen
* Ölfleck machen (Aufmerksamkeit)
* Ölfleck wegmachen (Beliebtheit)
* Sprechblase (Störung beheben)
  * mit Blitzen ⚡️ und Rauch 💨
* Energiesparmodus, nichts (keine Aktion wird erwartet)
  * nichts/hinlegen Gedankenblase 💤 (90° drehen)
* (Aktionen zusammenfassen)

### Reward
* Bedürfnisabhängig
* Default: leichter negativ reward

### Nutzeraktionen
Durch Buttons mit Emoticons

* Batteriewechsel 🔋
  * Recharge-Ladebalken anzeigen (ohne konkreten Ladestand)
* Öl nachfüllen 🛢
  * Roboter an Ölkanister anschließen
* Störung beheben 🛠
  * Wartungssymbol, Schraubenzieher in der Nähe einblenden
* Ball zuwerfen ⚽️
  * Ball liegt links, r2-d2 holt ihn
* Sprechen (Eingabefeld, Codewörter - Lob, )
  * Sprechblase und Blinken beim r2-d2
* Bestrafung (Dunkelkammer, Licht aus, reden mit C-3PO)
  * Alles ist dunkel, und Gitterstäbe
  * C-3PO (?) wird eingeblendet
* Keine Aktion/Reaktion
  * Roboter verdreht sein Auge oder ganz kleine vor und zurückbewegung

-> Tod (90° drehen, Störungsblase)


## Arbeitsschritte
1. Projektstruktur anlegen (done by Fabian)
2. CSS Animation in 2D,
  1. Zustandsanimationen (Klaus)
  2. Aktionsanimationen (Fabian)
  3. Hintergrund (Klaus)
3. Algorithmen finden/ins Projekt übertragen
4. Tests, Bot schreiben
