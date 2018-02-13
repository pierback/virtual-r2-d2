---
# Gruppe 7: Virtual Robot
## Vorlesung Reinforcement Learning, WS 2017/18, Universität Augsburg
###Authors: Klaus Emathinger, Fabian Pieringer
abstract:
   Hier kommt ein Abstract hin, das die Grundidee und Beschreibung des Problems erläutert.
  Auch sollen hier die wichtigsten Ergebnisse in Kurzfassung niedergeschrieben werden.
  *(~ 60 Wörter)*

---



# Das Problem

Die Grundidee ist ein virtuelles Haustier, welches vom User am Leben
gehalten werden muss, indem dieser die Bedürfnisse des Haustiers befriedigt. Dies geschieht in Form von gezielten User-Aktionen, welche jeweils auf ein bestimmtes Bedürfnis abzielen. Der Roboter muss durch eigene Aktionen auf seine Bedürfnisse aufmerksam machen, was zur Folge hat, dass der User dieses Verhalten interpretieren und eine neue Aktionen auswählen muss. 
Die Bedürfnisse umfassen Öl, Aufmerksamkeit und Störung. Die erste Implementierung des Zustandraumes sah zudem noch Liebe und Energie als Bedürfnisse vor, welche aber in der finalen Version keine Verwendung mehr fanden, da der Zustandraum für den Lerner zu groß gewesen wäre.
Schlussendlich lernt der Agent das Mapping von einer eigenen Aktion auf ein bestimmtes Bedürfnis. Der Lernerfolg hängt zudem stark davon ab, wie gut und wie schnell der User das Verhalten des Agenten versteht und die richtigen Aktionen zur Befriedigung der Bedürfnisse ausführt.

<!--- 
Beschreiben Sie hier das von Ihnen bearbeitete Thema/Problem/die Idee.
Was lernt der Agent?

*Sie können für die Dokumentation Informationen aus den Wochenberichten überarbeiten/ergänzen und wiederverwenden!*

*(~ 150 Wörter)*
-->


# Modellierung

Alle relevanten Informationen zum Reinforcement Learning Ansatz werden in diesem Abschnitt erwähnt.
Begründen Sie, warum Sie sich für diese Modellierung entschieden haben.

Verwenden Sie Abbildungen, um abstrakte Sachverhalte zu veranschaulichen.

*Sie können hierfür Ihre Informationen aus Aufgabenblatt 8 überarbeiten/ergänzen und wiederverwenden!*



## Agent, Umgebung und Zustandsraum

Was gehört bei Ihrer Modellerung zum Agenten und in welcher Umgebung befindet sich dieser?
Wie wird der Zustandsraum aufgespannt?
Wie haben Sie das Problem vereinfacht?
Welche Merkmale gibt es?

*(~ 200 Wörter)*



## Aktionen

Der Agent verfügt über vier Aktionen, unter/zwischen denen er wählen kann: Schlafen, Ölfleck machen, Winken, Störung anzeigen.  
Schlafen: Die Bedürfnisse des Agenten sind alle im optimalen bzw. in einem akzeptablen Bereich. Der Agent ist somit nicht gezwungen den User auf ein bestimmtes Bedürfnis aufmerksam zu machen und wählt im optimal Fall diese Aktion aus.
Ölfleck machen: Der Agent ist im Bedürfnis Ölstand auf einem kritischen Level und versucht den User mit dieser Aktion darauf aufmerksam zu machen 
Winken: Das Bedürfnis Aufmerksamkeit hat ein niedriges Level erreicht, der Agent versucht durch das Winken den User darauf aufmerksam zu machen
Störung anzeigen: Der Agent zeigt dem User eine Störung an, damit jener diese beheben soll

<!--- 
Welche Aktionen stehen Ihrem lernenden Agenten zur Verfügung?

*(~ 100 Wörter)*
-->


## Belohnungsfunktion

Der Reward setzt sich aus der Aktion des Users (Reaktion) und dem vom Agenten im Vorlauf angezeigten Verhalten (Previous Condition) zusammen. Das heißt, bemerkt der Agent, dass z.B. sein Ölstand niedrig ist, signalisiert dies mit der "Ölfleck machen" Aktion und der User interpretiert dieses Verhalten richtig, indem er die User-Aktion "Öl geben" ausführt, so bekommt der Agent einen positiven Reward, da er das Mapping zwischen dem Zustand und seiner Aktion gelernt hat und der User die für das Bedürfnis richtige/notwendige Reaktion ausgeführt hat. Signalisiert der Agent, dass er z.B. Öl braucht und der User auf dieses Verhalten eingeht, der Ölstand sich aber im unkritischen Bereich befindet, so bekommt der Agent einen negativen Reward. Dieser Ansatz gilt analog auch für das Bedürfnis Aufmerksamkeit. Beim Bedürfnis Störung wird der Agent belohnt, wenn eine Störung vorliegt, der Agent dies durch eine Aktion anzeigt und der User darauf mit der "Reparieren" Aktion reagiert.

<!--- 
Aus welchen Daten bilden Sie die Belohnung?
Inwiefern könnte diese auf echten Nutzersignalen basieren?

*(~ 100 Wörter)*
-->


# Algorithmen und initiale Simulation

Welchen Algorithmus/welche Algorithmen benutzen Sie/haben Sie gewählt und weshalb?
Was wären plausible Alternativen?

Mit welchen Parameterwerten (Lernrate, Diskontwert, etc.) haben Sie Ihre initiale Simulation durchgeführt und was haben Sie sich davon versprochen?
Welche anderen Belegungen haben Sie im Folgenden noch ausprobiert?

Verwenden Sie einen Plot der Performanz.

*(~ 200 Wörter)*



# Der Prototyp

Der Prototyp ist eine Webapplikation, bestehend aus einem Node.JS Server und einem HTML5, CSS, JavaScript Frontend. Die Animationen des Agenten und die User Interaktion werden im Frontend realisiert. 
Der Lernalgorithmus wiederum wird auf dem Server ausgeführt, welcher per Websocket mit dem Frontend kommuniziert. Dabei empfängt der Server die Reaktion des Users (Frontend &rarr; Backend) und versendet die neue Aktion des Agenten an das Frontend (Backend &rarr; Frontend). Die folgende Abbildung veranschaulicht diesen Workflow nochmals:


![Screenshot](figures/r2-workflow.png)



<!--- Hier ist Platz für Screenshots/Fotos sowie eine knappe Übersicht über Ihre Implementierung (Bestandteile, wie diese Zusammenhängen, Fokus auf den Technologien).

![Screenshot](figures/Computer-kitten.jpg "https://upload.wikimedia.org/wikipedia/commons/9/9a/Computer-kitten.jpg")
*(~ 100 Wörter)*
-->


# Ergebnis

Welche Parameterwerte nutzen Sie in Ihrem endgültigen Prototyp und warum?
Entsprechen die Lernergebnisse Ihren Erwartungen?
Ist Ihr System so nutzbar und wie schnell lernt es im Rahmen echter Nutzerinteraktion?

*(~ 150 Wörter)*
