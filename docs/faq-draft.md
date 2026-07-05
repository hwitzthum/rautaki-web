# FAQ-Entwurf für rautaki.ch — zur Freigabe

Jede Antwort basiert ausschliesslich auf verifizierten Fakten der Website
(Preise, Leistungen, Erstgespräch, Profil). Stellen, die nur du bestätigen
kannst, sind mit **[BITTE PRÜFEN]** markiert. Nach Freigabe implementiere ich
die FAQ-Sektion auf /services inkl. FAQPage-Schema (JSON-LD).

---

## 1. Was macht Rautaki?

Rautaki begleitet Unternehmen und Organisationen bei der strategischen
Einführung von KI — von der Potenzialanalyse bis zur skalierbaren Umsetzung.
Der Fokus liegt auf Führungsteams: strategische Vision, kontinuierliches
Sparring und die Begleitung von Teams bis zum Produktivbetrieb.

## 2. Für wen ist Rautaki das richtige Angebot?

Für Führungsteams, Geschäftsleitungen und Verwaltungsräte, die KI-Entscheide
mit hoher Tragweite treffen — insbesondere im NPO-, Sozial- und öffentlichen
Sektor sowie in KMU. **[BITTE PRÜFEN: KMU als Zielgruppe explizit nennen?]**

## 3. Was kostet die Zusammenarbeit mit Rautaki?

Ein Beratungstag kostet ab CHF 3'500 (inkl. Vor- und Nachbereitung, Unterlagen
und dokumentierten Ergebnissen), ein Halbtag ab CHF 1'800. Punktuelles Sparring
ist zum Stundenansatz von CHF 280 möglich. Das Erstgespräch ist kostenlos.

## 4. Wie startet die Zusammenarbeit?

Mit einem kostenlosen, 45-minütigen Erstgespräch mit Harry Witzthum. Darin
klären wir Ausgangslage, Prioritäten und ob eine Zusammenarbeit sinnvoll ist —
unverbindlich und ohne Verkaufsdruck.

## 5. Arbeitet Rautaki remote oder vor Ort?

Beides. Beratungstage und Workshops finden vor Ort oder remote statt — je
nachdem, was für Ihre Organisation besser funktioniert. Rautaki hat seinen
Sitz in Kilchberg ZH und arbeitet für Organisationen in der Schweiz,
Deutschland und Österreich.

## 6. Welche Leistungen bietet Rautaki?

Drei Kernleistungen: **Strategische Vision** (KI-Strategie für Führungsteams
mit Workshops, Stakeholder-Interviews und dokumentiertem Nordstern),
**Beratung & Sparring** (kontinuierliche Begleitung von C-Level und
Verwaltungsrat bei Risikobeurteilung, Build-vs-Buy und Governance) und
**KI-Mentoring** (Begleitung von Teams von der Use-Case-Findung über
Prototypen bis zum Produktivbetrieb).

## 7. Wer steht hinter Rautaki?

Harry Witzthum, Gründer von Rautaki — Doktor der Philosophie und Diplomierter
Verbands- und NPO-Manager VMI. Er bringt langjährige Führungserfahrung aus
nationalen Nonprofit-Organisationen mit, hat Transformationsprozesse und agile
Strukturen (u.a. Holacracy) real verantwortet und unterrichtet als Dozent in
akkreditierten CAS-Programmen zu KI-Strategie und KI-Transformation.

## 8. Bietet Rautaki auch Weiterbildung an?

Was wir beraten, lehren wir auch: Harry Witzthum unterrichtet als Dozent in
akkreditierten CAS-Programmen — vom Chief AI Officer bis zur
KI-Transformation. Für Teams bietet das KI-Mentoring eine praxisnahe
Befähigung direkt an den eigenen Anwendungsfällen.
**[BITTE PRÜFEN: Institution nennen? Der Audit-Report erfand «ikf Universität
Zürich» — bitte korrekten Namen liefern, falls er öffentlich genannt werden
soll.]**

## 9. Was bedeutet «Rautaki»?

Rautaki ist te reo Māori und bedeutet «Strategie». Der Name steht für den
Kern des Angebots: strategische Klarheit vor Technologie-Aktionismus.
**[BITTE PRÜFEN: Formulierung zur Namensherkunft ok?]**

---

## Vorgesehene Umsetzung nach Freigabe

FAQ-Sektion auf `/services` (vor dem CTA), plus FAQPage-Schema im JSON-LD der
Seite — jede der 9 Fragen als `Question`/`acceptedAnswer`. Beispielstruktur:

```json
{
  "@type": "FAQPage",
  "@id": "https://www.rautaki.ch/services#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet die Zusammenarbeit mit Rautaki?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Beratungstag kostet ab CHF 3'500 …"
      }
    }
  ]
}
```
