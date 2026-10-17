# equicrew – smarte energie

EquiCrew ist ein österreichisches Unternehmen aus Mauthausen, das Energie und Künstliche Intelligenz nachhaltig bereitstellt und nutzt. Im Mittelpunkt steht der EquiCube: eine kompakte Heiztechnikanlage für Einfamilienhäuser, die Luft-Wasser-Wärmepumpe, Batterie, Pufferspeicher sowie PV-, KI- und Server-Technik in einem einzigen System vereint. Diese Website stellt das Unternehmen, das Produkt und seine Vorteile vor, zeigt typische Anlagenkonfigurationen und führt Besucherinnen und Besucher über Telefon, E-Mail oder Kontaktformular direkt zur Crew.

## Technologie-Stack

- React 19 mit TypeScript im Strict-Modus
- Vite als Entwicklungs- und Build-Tool
- React Router für die fünf clientseitigen Seiten
- Framer Motion für kurze Einblendeffekte beim Scrollen und Seitenübergänge
- Modernes CSS mit Design-Tokens als Custom Properties
- Vitest, React Testing Library und jsdom für die Tests
- Sharp für die Bildpipeline (AVIF, WebP und Fallback-Formate)

Alle Bilder werden aus dem eigenen Build ausgeliefert; die Typografie nutzt die Systemschriften des Geräts. Es gibt keine externen Font-CDNs, keine Tracker, keine Analytics und daher auch keinen Cookie-Banner.

## Installation

Voraussetzung ist Node.js in einer von Vite unterstützten Version sowie npm.

```bash
npm ci
```

## Entwicklung

```bash
npm run dev
```

Die Seite ist danach unter `http://localhost:5173` erreichbar. Der Entwicklungsserver unterstützt Hot Reloading und stellt zusätzlich die interne Komponentengalerie unter `http://localhost:5173/dev/gallery` bereit. Diese Route ist nur im Entwicklungsmodus registriert und gehört nicht zum Produktions-Build.

## Produktions-Build

```bash
npm run build
```

`npm run build` prüft zuerst die TypeScript-Typen und schreibt anschließend den statischen Build nach `dist/`.

## Dienste und Start

Die Anwendung besteht aus genau einem Dienst: `web` – die statische React/Vite-Website, die aus `./` gebaut wird und den Inhalt von `dist/` ausliefert. Sie läuft auf Port `4173` und wird mit dem folgenden Befehl gestartet:

```bash
npm run preview -- --port 4173 --strictPort
```

Danach ist die Website unter `http://localhost:4173` erreichbar. Das Verzeichnis `dist/` kann auch von jedem anderen statischen Webserver bereitgestellt werden; die Anwendung muss dabei alle Pfade auf `index.html` zurückfallen lassen.

## Nutzung der Website

Die Website besteht aus fünf direkt aufrufbaren Seiten:

| Route | Inhalt |
| --- | --- |
| `/` | Startseite mit Hero-Foto, Wortmarke, Claim, Missionstext, EquiCube-Teaser und drei Referenzanlagen |
| `/equicube` | Produktseite mit Anlagenfoto, Cube-Freisteller, Kennzahlen, fünf Vorteilen und Anfrage-Aufruf |
| `/ueber-uns` | Teamfoto, Mission und die drei Gründerkarten mit Portraits und E-Mail-Adressen |
| `/kontakt` | Adresse, Telefon, E-Mail, Social-Media-Links und Kontaktformular |
| `/impressum` | Vollständige Unternehmens- und Vertretungsangaben |

Die Kopfzeile bleibt beim Scrollen sichtbar und markiert den Punkt der gerade geöffneten Seite. Auf schmalen Bildschirmen öffnet das Menüsymbol ein Navigationspanel; ein Tippen auf einen Punkt, die Escape-Taste oder ein Klick neben das Panel schließt es wieder. Jede Seite endet mit einem dunklen Kontakt-Band im Footer, das Adresse, Telefonnummer, E-Mail-Adresse sowie Links zu Kontakt und Impressum enthält.

Das Kontaktformular fragt Vorname, Nachname, E-Mail-Adresse und Nachricht ab. Es versendet nichts selbst: Nach gültiger Eingabe öffnet es das lokale E-Mail-Programm mit einer an `office@equicrew.com` adressierten, vorbereiteten Nachricht und bestätigt genau das auf der Seite. Fehlermeldungen erscheinen erst, nachdem ein Feld berührt oder das Absenden versucht wurde.

## Bilder

Die Originalfotos liegen unter `design/site-assets/`. Der Befehl

```bash
npm run images
```

erzeugt daraus die optimierten AVIF-, WebP- und Fallback-Dateien unter `src/assets/images/` sowie das Favicon und das Standard-Open-Graph-Bild unter `public/`. Die Bilder werden mit festen Breiten- und Höhenangaben ausgeliefert, damit beim Laden kein Layoutsprung entsteht; Bilder unterhalb des sichtbaren Bereichs werden nachgeladen.

## Tests

```bash
npm test
```

Die Tests prüfen unter anderem, dass jeder der fünf Pfade die richtige Seite mit eigenem Titel und eigener Meta-Description rendert und dass unbekannte Pfade auf die Startseite umleiten.

## Funktionen

- Fünf vollständige Seiten mit gemeinsamer Kopf- und Fußzeile
- Fixierte Kopfzeile mit aktiver Navigation und mobilem Navigationspanel
- Großformatige Originalfotos in AVIF und WebP mit Fallback und reservierten Seitenverhältnissen
- Startseite mit Hero, EquiCube-Teaser und drei Referenzanlagen samt technischen Angaben
- EquiCube-Seite mit Kennzahlen, fünf Vorteilen und Anfrage-Aufruf
- Über-uns-Seite mit Teamfoto, Mission und Gründerkarten
- Kontaktseite mit tel:- und mailto:-Links, LinkedIn und Instagram sowie validiertem mailto-Kontaktformular
- Impressum mit Firmenbuch-, UID- und Vertretungsangaben
- Einblendeffekte beim Scrollen und Seitenübergänge mit kurzen Dauern; bei reduzierter Bewegung erscheinen alle Inhalte sofort
- Tastaturbedienbare Navigation, sichtbare Fokusringe, beschreibende Alt-Texte und WCAG-AA-Kontraste
- Individuelle Titel, Meta-Descriptions und Open-Graph-Daten pro Seite
- Keine externen Tracker, Analytics oder Font-CDNs
