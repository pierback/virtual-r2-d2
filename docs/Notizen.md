#Semesterprojekt
##R2-d2

Ziel Bedürfnisse gezielt befriedigen

###Zustandsraum/Bedürfnisse
*	Energie (Strom) - Zeitabhängig
*	Öl (für Gelenke) – Aktionsabhängig (bei Bewegungen)
*	Aufmerksamkeit (Sprache, tätschelt, Ball) – Zeit und Nutzerabhängig
*	Störung - Aktionsabhängig
*   Liebe

### Reward
* Bedürfnisabhängig
* Default: leichter negativ reward

##Aktionen (act)
Sinnvolle Aktionen für 

* Energie
    * 'waveArms' im Sinne von Hilfe
    * 'peepMonotonous' 
* Öl
    * 'peepMonotonous'
    * 'waveArms' im Sinne von Hilfe
* Aufmerksamkeit
    * 'move' hin und her fahren
    * 'waveArms' spielerisch
    * 'MakeSmear' Ölfleck machen
* Störung
    * 'operates' Sprechblase mit Blitzen ⚡️ und Rauch 💨
    * 'MakeSmear' Ölfleck machen
    * 'peepMonotonous'
* Liebe
    * 'peepIrregular' Freudiges quitschen
    * 'RemoveSmear' Ölfleck entfernen
* Keine Bedürfnisse
    * 'snooze' Gedankenblase mit snooze, hinlegen?
    

### Nutzeraktionen (react)


* Batteriewechsel 'recharge' 🔋
    * Recharge-Ladebalken anzeigen (ohne konkreten Ladestand)
* Ölen 'oil' 🛢
    * Roboter an Ölkanister anschließen
* Störung beheben 'repair' 🛠
    * Wartungssymbol, Schraubenzieher in der Nähe einblenden
* Ball zuwerfen 'toss ball' ⚽️
    * 'play ball' Ball liegt links, r2-d2 holt ihn
* Loben 'praise'
    * 'happy' r2-d2 bewegt sich ganz schnell auf und ab
* Bestrafung 'punish' (Dunkelkammer, Licht aus, reden mit C-3PO)
    * Alles ist dunkel, und Gitterstäbe
    * C-3PO (?) wird eingeblendet
* Keine Aktion 'nothing'
    * Roboter verdreht sein Auge oder ganz kleine vor und zurückbewegung

### Spezialanimation
* Tod (90° drehen, Störungsblase)


## Arbeitsschritte
1. Projektstruktur anlegen (done by Fabian)
2. CSS Animation in 2D,
  1. Zustandsanimationen 
  2. Aktionsanimationen 
3. Zustandsraum implementieren
3. Algorithmen finden/ins Projekt übertragen
4. Tests, Bot schreiben
