// Knowledge Base Data - FAQ, Glossar, Portal Directory

export const faqData = [
  {
    id: 'faq-1',
    category: 'Grundlagen',
    question: 'Was ist eine öffentliche Ausschreibung?',
    answer: 'Eine öffentliche Ausschreibung ist ein formelles Verfahren, bei dem öffentliche Auftraggeber (Bund, Länder, Kommunen) Aufträge für Liefer-, Bau- oder Dienstleistungen ausschreiben. Ziel ist Transparenz, Wettbewerb und wirtschaftliche Verwendung öffentlicher Mittel.',
    tags: ['Basics', 'Definition'],
    helpfulCount: 245
  },
  {
    id: 'faq-2',
    category: 'Schwellenwerte',
    question: 'Ab welchen Beträgen gelten EU-weite Schwellenwerte?',
    answer: 'EU-Schwellenwerte 2024: Bauaufträge ab 5.538.000 €, Liefer-/Dienstleistungen Bund ab 143.000 €, andere öffentliche Auftraggeber ab 221.000 €. Unterhalb dieser Werte gelten nationale Vergabevorschriften (VOL/A, VOB/A).',
    tags: ['EU', 'Schwellenwerte', 'Recht'],
    helpfulCount: 189
  },
  {
    id: 'faq-3',
    category: 'Verfahren',
    question: 'Welche Vergabeverfahren gibt es?',
    answer: 'Hauptverfahren: Offenes Verfahren (alle können bieten), Nichtoffenes Verfahren (nur ausgewählte), Verhandlungsverfahren (Verhandlungen erlaubt), Wettbewerblicher Dialog (bei komplexen Projekten), Innovationspartnerschaft (F&E).',
    tags: ['Verfahren', 'Prozess'],
    helpfulCount: 312
  },
  {
    id: 'faq-4',
    category: 'Portale',
    question: 'Wo finde ich öffentliche Ausschreibungen?',
    answer: 'Wichtigste Portale: DTVP (Deutsche Vergabeplattform), TED (EU-weit), Bund.de, Subreport, Ausschreibungen.de. Viele Bundesländer haben eigene Portale (z.B. Berlin: DTVP, Bayern: eVergabe.de).',
    tags: ['Portale', 'Recherche'],
    helpfulCount: 428
  },
  {
    id: 'faq-5',
    category: 'Fristen',
    question: 'Wie lange sind typische Angebotsfristen?',
    answer: 'Offenes Verfahren: mindestens 35 Tage (EU), 30 Tage (national). Nichtoffenes Verfahren: mindestens 30 Tage (EU). Eilverfahren haben verkürzte Fristen. Achtung: Fristen beginnen meist mit Veröffentlichung, nicht mit Kenntnisnahme.',
    tags: ['Fristen', 'Deadlines'],
    helpfulCount: 267
  },
  {
    id: 'faq-6',
    category: 'Bewertung',
    question: 'Nach welchen Kriterien werden Angebote bewertet?',
    answer: 'Zuschlagskriterien müssen in der Ausschreibung genannt sein. Typisch: Preis (oft 30-60%), technische Qualität, Referenzen, Teamkompetenz, Umsetzungskonzept. Beste Wirtschaftlichkeit gewinnt (nicht nur billigster Preis).',
    tags: ['Bewertung', 'Scoring'],
    helpfulCount: 391
  },
  {
    id: 'faq-7',
    category: 'Anforderungen',
    question: 'Was sind Eignungskriterien vs. Zuschlagskriterien?',
    answer: 'Eignungskriterien (K.O.-Kriterien): Mindestanforderungen wie Umsatz, Referenzen, Zertifikate - wer sie nicht erfüllt, ist raus. Zuschlagskriterien: Bewertungsmaßstäbe für die Angebote qualifizierter Bieter.',
    tags: ['Anforderungen', 'Qualifikation'],
    helpfulCount: 203
  },
  {
    id: 'faq-8',
    category: 'DSGVO',
    question: 'Welche Datenschutzanforderungen gelten bei öffentlichen Aufträgen?',
    answer: 'DSGVO-konforme Datenverarbeitung ist Pflicht. Bei personenbezogenen Daten: Auftragsverarbeitungsvertrag (AVV), TOMs dokumentieren, EU-Server nutzen, Datenschutzkonzept im Angebot darlegen.',
    tags: ['DSGVO', 'Datenschutz', 'Compliance'],
    helpfulCount: 176
  },
  {
    id: 'faq-9',
    category: 'Nachforderung',
    question: 'Können fehlende Unterlagen nachgereicht werden?',
    answer: 'Eignungsnachweise: ja, können nachgefordert werden. Inhaltliche Angebotsteile: nein, nachträgliche Änderungen sind unzulässig. Daher: Vollständigkeit vor Abgabe prüfen!',
    tags: ['Unterlagen', 'Nachforderung'],
    helpfulCount: 158
  },
  {
    id: 'faq-10',
    category: 'Bietergemeinschaft',
    question: 'Was ist eine Bietergemeinschaft (ARGE)?',
    answer: 'Mehrere Unternehmen bieten gemeinsam. Vorteile: Kapazitäten bündeln, Kompetenzen ergänzen. Wichtig: Gemeinsame Erklärung, gesamtschuldnerische Haftung, Lead-Partner benennen.',
    tags: ['ARGE', 'Kooperation'],
    helpfulCount: 221
  },
  {
    id: 'faq-11',
    category: 'Nachprüfung',
    question: 'Was tun bei unfairer Vergabe?',
    answer: 'Nachprüfungsverfahren bei der Vergabekammer einleiten. Frist: 15 Kalendertage nach Kenntnis des Verstoßes. Suspensiveffekt: Vergabe wird gestoppt, bis entschieden ist.',
    tags: ['Vergabekammer', 'Rechtsschutz'],
    helpfulCount: 94
  },
  {
    id: 'faq-12',
    category: 'Win Probability',
    question: 'Wie wird die Win Probability berechnet?',
    answer: 'Multi-Faktor-Analyse: Requirements Fit (30%), Team Strength (20%), Proposal Quality (20%), Price Competitiveness (15%), Past Performance (10%), Client Relationship (5%). KI-gestützte Gewichtung basierend auf RFP-Typ und Historie.',
    tags: ['Analyse', 'KI', 'Scoring'],
    helpfulCount: 412
  },
  {
    id: 'faq-13',
    category: 'Templates',
    question: 'Welche Branchen-Templates gibt es?',
    answer: 'Verfügbare Templates: IT/Software (Web, Apps, Enterprise), Consulting (Strategie, Prozess, Change), Marketing (Kampagnen, Content, Performance), Bau/Infrastruktur, Forschung/Innovation. Alle Templates inkl. typischer Requirements und Scoring-Kriterien.',
    tags: ['Templates', 'Branchen'],
    helpfulCount: 337
  },
  {
    id: 'faq-14',
    category: 'Collaboration',
    question: 'Wie funktioniert Team-Kollaboration?',
    answer: 'Features: Team-Member zuweisen, Abschnitte assignen, Kommentare & Q&A, Deadline-Tracking, Review-Workflows, Versions-Historie, Notifications bei Updates.',
    tags: ['Kollaboration', 'Team'],
    helpfulCount: 289
  },
  {
    id: 'faq-15',
    category: 'Export',
    question: 'In welchen Formaten kann ich exportieren?',
    answer: 'Export-Formate: Word/DOCX (komplettes Proposal), PDF (Angebot & Anhänge), Excel (Pricing & Scoring), CSV (Daten-Backup). Alle Exports inkl. Formatierung und Corporate Design Optionen.',
    tags: ['Export', 'Dokumente'],
    helpfulCount: 198
  },
  {
    id: 'faq-16',
    category: 'Prozesse',
    question: 'Was ist der Standard-RFP-Prozess?',
    answer: 'End-to-End Flow: 1. Screening & Qualification, 2. Bid/No-Bid Decision, 3. Requirements Analysis, 4. Team Assembly, 5. Solution Design, 6. Proposal Writing, 7. Pricing, 8. Review & Approval, 9. Submission, 10. Q&A/Präsentation, 11. Award/Debrief.',
    tags: ['Prozess', 'Workflow'],
    helpfulCount: 445
  },
  {
    id: 'faq-17',
    category: 'VOL vs VOB',
    question: 'Was ist der Unterschied zwischen VOL und VOB?',
    answer: 'VOL (Verdingungsordnung für Leistungen): Liefer- und Dienstleistungen. VOB (Verdingungsordnung für Bauleistungen): Bauaufträge. Unterschiedliche Formalien, Fristen und Vergabevorschriften.',
    tags: ['VOL', 'VOB', 'Recht'],
    helpfulCount: 167
  },
  {
    id: 'faq-18',
    category: 'ISO Zertifikate',
    question: 'Welche ISO-Zertifikate sind wichtig für öffentliche Aufträge?',
    answer: 'Häufig gefordert: ISO 9001 (Qualitätsmanagement), ISO 27001 (Informationssicherheit), ISO 14001 (Umweltmanagement). Oft K.O.-Kriterien oder Pluspunkte bei Bewertung.',
    tags: ['ISO', 'Zertifikate', 'Qualifikation'],
    helpfulCount: 142
  },
  {
    id: 'faq-19',
    category: 'Preisbildung',
    question: 'Wie kalkuliere ich Preise für öffentliche Aufträge?',
    answer: 'Kostenarten aufschlüsseln: Personal (Tagessätze × PT), Material, Reisen, Lizenzen. Gemeinkosten & Marge transparent. Wettbewerb beachten, aber nicht unter Selbstkosten. Value Adds als Differenzierung.',
    tags: ['Pricing', 'Kalkulation'],
    helpfulCount: 378
  },
  {
    id: 'faq-20',
    category: 'Präsentation',
    question: 'Was erwartet mich in der Angebotspräsentation?',
    answer: 'Typischer Ablauf: Vorstellung Team (15 min), Lösungskonzept (30 min), Q&A (30 min). Auftraggeber prüft fachliche Tiefe, Teamfähigkeit, Verständnis der Anforderungen. Professionelle Vorbereitung entscheidend.',
    tags: ['Präsentation', 'Pitch'],
    helpfulCount: 256
  }
];

export const glossaryData = [
  {
    id: 'gloss-1',
    term: 'Ausschreibung',
    definition: 'Förmliches Verfahren zur Vergabe von Aufträgen, bei dem Unternehmen zur Angebotsabgabe aufgefordert werden.',
    category: 'Grundbegriffe',
    relatedTerms: ['Vergabe', 'RFP', 'Tender']
  },
  {
    id: 'gloss-2',
    term: 'RFP (Request for Proposal)',
    definition: 'Angebotsaufforderung mit detaillierten Anforderungen und Bewertungskriterien. Bieter reichen ausformuliertes Konzept und Preis ein.',
    category: 'Grundbegriffe',
    relatedTerms: ['RFQ', 'RFI', 'Ausschreibung']
  },
  {
    id: 'gloss-3',
    term: 'RFQ (Request for Quotation)',
    definition: 'Preisanfrage für standardisierte Leistungen. Weniger komplex als RFP, Fokus auf Preis.',
    category: 'Grundbegriffe',
    relatedTerms: ['RFP', 'Angebotsanfrage']
  },
  {
    id: 'gloss-4',
    term: 'RFI (Request for Information)',
    definition: 'Informationsanfrage vor eigentlicher Ausschreibung zur Markterkundung.',
    category: 'Grundbegriffe',
    relatedTerms: ['RFP', 'Marktanalyse']
  },
  {
    id: 'gloss-5',
    term: 'VOL/A',
    definition: 'Verdingungsordnung für Leistungen (Vergabe- und Vertragsordnung für Dienstleistungen), gilt unterhalb EU-Schwellenwerte.',
    category: 'Vergaberecht',
    relatedTerms: ['VOB', 'VgV', 'GWB']
  },
  {
    id: 'gloss-6',
    term: 'VOB/A',
    definition: 'Verdingungsordnung für Bauleistungen, Vergabeteil. Regelt Ausschreibung und Vergabe von Bauaufträgen.',
    category: 'Vergaberecht',
    relatedTerms: ['VOL', 'Bauleistungen']
  },
  {
    id: 'gloss-7',
    term: 'VgV (Vergabeverordnung)',
    definition: 'Gilt oberhalb EU-Schwellenwerte. Umsetzung europäischer Vergaberichtlinien in deutsches Recht.',
    category: 'Vergaberecht',
    relatedTerms: ['GWB', 'EU-Richtlinien']
  },
  {
    id: 'gloss-8',
    term: 'GWB (Gesetz gegen Wettbewerbsbeschränkungen)',
    definition: 'Deutsches Kartellgesetz, enthält Vergaberecht (Teil 4). Basis für öffentliche Vergaben.',
    category: 'Vergaberecht',
    relatedTerms: ['VgV', 'VOL', 'VOB']
  },
  {
    id: 'gloss-9',
    term: 'TED (Tenders Electronic Daily)',
    definition: 'Europäisches Ausschreibungsportal. Veröffentlichung EU-weiter Ausschreibungen oberhalb Schwellenwerte.',
    category: 'Portale',
    relatedTerms: ['DTVP', 'EU-Ausschreibungen']
  },
  {
    id: 'gloss-10',
    term: 'DTVP (Deutsche Vergabeplattform)',
    definition: 'Zentrale deutsche e-Vergabe-Plattform für Bund und viele Länder.',
    category: 'Portale',
    relatedTerms: ['TED', 'eVergabe']
  },
  {
    id: 'gloss-11',
    term: 'Schwellenwert',
    definition: 'Auftragswert, ab dem EU-weite Ausschreibungspflicht besteht. 2024: z.B. 143.000€ (Dienstleistungen Bund).',
    category: 'Vergaberecht',
    relatedTerms: ['EU-Vergabe', 'VgV']
  },
  {
    id: 'gloss-12',
    term: 'Eignungskriterien',
    definition: 'Mindestanforderungen an Bieter (Umsatz, Referenzen, Zertifikate). K.O.-Kriterien: Nicht-Erfüllung führt zu Ausschluss.',
    category: 'Bewertung',
    relatedTerms: ['Zuschlagskriterien', 'Qualifikation']
  },
  {
    id: 'gloss-13',
    term: 'Zuschlagskriterien',
    definition: 'Bewertungsmaßstäbe für Angebote (Preis, Qualität, Referenzen etc.). Gewichtung muss in Ausschreibung genannt sein.',
    category: 'Bewertung',
    relatedTerms: ['Eignungskriterien', 'Scoring']
  },
  {
    id: 'gloss-14',
    term: 'Wirtschaftlichstes Angebot',
    definition: 'Bestes Preis-Leistungs-Verhältnis nach Zuschlagskriterien. Nicht automatisch billigstes Angebot.',
    category: 'Bewertung',
    relatedTerms: ['Zuschlagskriterien', 'Bewertung']
  },
  {
    id: 'gloss-15',
    term: 'Bietergemeinschaft (ARGE)',
    definition: 'Zusammenschluss mehrerer Unternehmen für gemeinsames Angebot. Gesamtschuldnerische Haftung.',
    category: 'Organisation',
    relatedTerms: ['Konsortium', 'Kooperation']
  },
  {
    id: 'gloss-16',
    term: 'Unterauftragnehmer',
    definition: 'Subunternehmer, den Hauptbieter einsetzen will. Muss oft bei Angebot genannt und qualifiziert werden.',
    category: 'Organisation',
    relatedTerms: ['ARGE', 'Nachunternehmer']
  },
  {
    id: 'gloss-17',
    term: 'Vergabekammer',
    definition: 'Nachprüfungsinstanz bei vermeintlich unfairen Vergaben. Beim Bundeskartellamt bzw. Ländern angesiedelt.',
    category: 'Rechtsschutz',
    relatedTerms: ['Nachprüfungsverfahren', 'Rechtsschutz']
  },
  {
    id: 'gloss-18',
    term: 'Nachprüfungsverfahren',
    definition: 'Rechtliches Verfahren vor Vergabekammer gegen Vergabeentscheidung. Suspendiert Zuschlagserteilung.',
    category: 'Rechtsschutz',
    relatedTerms: ['Vergabekammer', 'Vergaberecht']
  },
  {
    id: 'gloss-19',
    term: 'Referenzen',
    definition: 'Nachweise über vergleichbare, erfolgreich abgeschlossene Projekte. Oft Eignungskriterium.',
    category: 'Qualifikation',
    relatedTerms: ['Eignungskriterien', 'Track Record']
  },
  {
    id: 'gloss-20',
    term: 'Eignungsleihe',
    definition: 'Bieter nutzt Kapazitäten/Qualifikationen Dritter zur Erfüllung von Eignungskriterien. Dritter muss Verpflichtungserklärung abgeben.',
    category: 'Qualifikation',
    relatedTerms: ['Eignungskriterien', 'Unterauftragnehmer']
  },
  {
    id: 'gloss-21',
    term: 'Bieterfragen',
    definition: 'Möglichkeit, Rückfragen zur Ausschreibung zu stellen. Antworten werden allen Bietern zugänglich gemacht.',
    category: 'Verfahren',
    relatedTerms: ['Submission', 'Verfahren']
  },
  {
    id: 'gloss-22',
    term: 'Submission',
    definition: 'Frist, bis zu der Angebote eingereicht sein müssen. Verspätete Angebote werden ausgeschlossen.',
    category: 'Verfahren',
    relatedTerms: ['Fristen', 'Angebotsabgabe']
  },
  {
    id: 'gloss-23',
    term: 'Angebotsbindefrist',
    definition: 'Zeitraum, in dem Bieter an sein Angebot gebunden ist. Typisch: 30-90 Tage.',
    category: 'Verfahren',
    relatedTerms: ['Submission', 'Bindung']
  },
  {
    id: 'gloss-24',
    term: 'Aufhebung',
    definition: 'Abbruch des Vergabeverfahrens durch Auftraggeber. Möglich bei schwerwiegenden Gründen.',
    category: 'Verfahren',
    relatedTerms: ['Verfahren', 'Abbruch']
  },
  {
    id: 'gloss-25',
    term: 'Debriefing',
    definition: 'Feedback-Gespräch nach Vergabe. Auftraggeber erläutert Gründe für Absage bzw. Zuschlag an anderen Bieter.',
    category: 'Nachbereitung',
    relatedTerms: ['Feedback', 'Vergabe']
  },
  {
    id: 'gloss-26',
    term: 'Wertungspreis',
    definition: 'Preis inkl. aller Kostenbestandteile, der in Bewertung eingeht. Basis für Preisvergleich.',
    category: 'Pricing',
    relatedTerms: ['Zuschlagskriterien', 'Bewertung']
  },
  {
    id: 'gloss-27',
    term: 'DSGVO-konform',
    definition: 'Datenschutz-Grundverordnung eingehalten: Rechtmäßigkeit, Transparenz, Zweckbindung, Datensparsamkeit.',
    category: 'Compliance',
    relatedTerms: ['Datenschutz', 'Compliance']
  },
  {
    id: 'gloss-28',
    term: 'TOMs (Technische und organisatorische Maßnahmen)',
    definition: 'Datenschutz-Maßnahmen nach DSGVO: Verschlüsselung, Zugangskontrollen, Backups etc.',
    category: 'Compliance',
    relatedTerms: ['DSGVO', 'Datenschutz']
  },
  {
    id: 'gloss-29',
    term: 'AVV (Auftragsverarbeitungsvertrag)',
    definition: 'Vertrag zwischen Auftraggeber und Dienstleister bei Verarbeitung personenbezogener Daten. DSGVO-Pflicht.',
    category: 'Compliance',
    relatedTerms: ['DSGVO', 'Datenschutz']
  },
  {
    id: 'gloss-30',
    term: 'Win Probability',
    definition: 'Gewinnwahrscheinlichkeit für RFP. Wird aus Requirements Fit, Team, Preis, Proposal-Qualität etc. berechnet.',
    category: 'Analyse',
    relatedTerms: ['Scoring', 'KI-Analyse']
  }
];

export const portalDirectoryData = [
  {
    id: 'portal-1',
    name: 'DTVP',
    fullName: 'Deutsche Vergabeplattform',
    url: 'https://www.dtvp.de',
    scope: 'Bund und Länder',
    threshold: 'Ab 1.000 € (Schwellenwert: siehe VOL/VgV)',
    registration: 'Kostenlose Registrierung, Zertifikat für elektronische Signatur erforderlich',
    specialFeatures: 'Zentrale Plattform für Bund, Berlin, Brandenburg u.a. E-Vergabe Ende-zu-Ende.',
    coverage: ['Bund', 'Berlin', 'Brandenburg', 'Thüringen'],
    languages: ['DE'],
    logo: '🏛️',
    pros: ['Weit verbreitet', 'Gute Usability', 'Viele Ausschreibungen'],
    cons: ['Zertifikat notwendig', 'Kosten für Signatur'],
    rating: 4.5
  },
  {
    id: 'portal-2',
    name: 'TED',
    fullName: 'Tenders Electronic Daily',
    url: 'https://ted.europa.eu',
    scope: 'EU-weit',
    threshold: 'Oberhalb EU-Schwellenwerte (z.B. 143.000 € Bund)',
    registration: 'Keine Registrierung für Recherche nötig',
    specialFeatures: 'Offizielle EU-Plattform, alle EU-Länder, Übersetzung in EU-Sprachen, umfangreiche Suchfilter.',
    coverage: ['EU-weit', 'Alle Mitgliedsstaaten'],
    languages: ['EN', 'DE', 'FR', 'ES', 'IT', '+ 20 weitere'],
    logo: '🇪🇺',
    pros: ['EU-weit', 'Große Aufträge', 'Kostenlos'],
    cons: ['Komplexe Navigation', 'Hohe Anforderungen'],
    rating: 4.2
  },
  {
    id: 'portal-3',
    name: 'Bund.de',
    fullName: 'Vergabeportal des Bundes',
    url: 'https://www.evergabe-online.de',
    scope: 'Bundesbehörden',
    threshold: 'Alle Schwellenwerte',
    registration: 'Registrierung erforderlich',
    specialFeatures: 'Direktzugriff auf Ausschreibungen von Bundesministerien und Bundesbehörden.',
    coverage: ['Bund', 'Bundesbehörden'],
    languages: ['DE', 'EN'],
    logo: '🦅',
    pros: ['Behörden-Aufträge', 'Zuverlässig', 'Übersichtlich'],
    cons: ['Nur Bund', 'Begrenzte Branchen'],
    rating: 4.0
  },
  {
    id: 'portal-4',
    name: 'Subreport',
    fullName: 'Subreport Vergabe',
    url: 'https://www.subreport.de',
    scope: 'Deutschland',
    threshold: 'Alle',
    registration: 'Kostenpflichtige Premium-Mitgliedschaft für volle Features',
    specialFeatures: 'Aggregator mit KI-Matching, Alerting, CRM-Integration. Privates Portal mit erweiterten Funktionen.',
    coverage: ['Deutschland', 'Alle Bundesländer'],
    languages: ['DE'],
    logo: '📊',
    pros: ['AI-Matching', 'Alerts', 'Viele Features'],
    cons: ['Kostenpflichtig', 'Komplexität'],
    rating: 4.3
  },
  {
    id: 'portal-5',
    name: 'eVergabe Bayern',
    fullName: 'Elektronische Vergabe Bayern',
    url: 'https://www.evergabe.bayern.de',
    scope: 'Bayern',
    threshold: 'Ab 1.000 €',
    registration: 'Kostenlose Registrierung',
    specialFeatures: 'Speziell für bayerische Kommunen und Landesbehörden. Gute Usability.',
    coverage: ['Bayern'],
    languages: ['DE'],
    logo: '🏔️',
    pros: ['Regional fokussiert', 'Einfach', 'Kostenlos'],
    cons: ['Nur Bayern', 'Kleinere Aufträge'],
    rating: 4.1
  },
  {
    id: 'portal-6',
    name: 'Ausschreibungen.de',
    fullName: 'Ausschreibungen.de',
    url: 'https://www.ausschreibungen.de',
    scope: 'Deutschland & EU',
    threshold: 'Alle',
    registration: 'Basis kostenlos, Premium kostenpflichtig',
    specialFeatures: 'Großes Aggregator-Portal, alle Branchen, gute Suche, Alerts per Email.',
    coverage: ['Deutschland', 'EU'],
    languages: ['DE', 'EN'],
    logo: '🔍',
    pros: ['Große Auswahl', 'Gute Suche', 'Alerts'],
    cons: ['Premium kostenpflichtig', 'Werbung'],
    rating: 4.0
  },
  {
    id: 'portal-7',
    name: 'Deutsches Ausschreibungsblatt',
    fullName: 'Deutsches Ausschreibungsblatt (DAB)',
    url: 'https://www.deutsches-ausschreibungsblatt.de',
    scope: 'Deutschland',
    threshold: 'Alle',
    registration: 'Kostenpflichtige Mitgliedschaft',
    specialFeatures: 'Traditionelles Portal mit langer Historie. Bau, Handwerk, Technik stark vertreten.',
    coverage: ['Deutschland'],
    languages: ['DE'],
    logo: '🏗️',
    pros: ['Bau-Fokus', 'Etabliert', 'Detailliert'],
    cons: ['Kostenpflichtig', 'Alte UI'],
    rating: 3.8
  },
  {
    id: 'portal-8',
    name: 'NRW.VERGABE',
    fullName: 'Vergabeplattform NRW',
    url: 'https://www.vergabe.nrw.de',
    scope: 'Nordrhein-Westfalen',
    threshold: 'Ab 1.000 €',
    registration: 'Kostenlose Registrierung',
    specialFeatures: 'Zentrale Plattform für NRW-Kommunen und Landesbehörden.',
    coverage: ['Nordrhein-Westfalen'],
    languages: ['DE'],
    logo: '⚙️',
    pros: ['NRW-Fokus', 'Viele Kommunen', 'Kostenlos'],
    cons: ['Nur NRW', 'Mittelmäßige UI'],
    rating: 3.9
  },
  {
    id: 'portal-9',
    name: 'Cosinex',
    fullName: 'Cosinex Vergabe',
    url: 'https://www.cosinex.de',
    scope: 'Deutschland',
    threshold: 'Alle',
    registration: 'Software-Lösung (lizenzpflichtig)',
    specialFeatures: 'Professionelle e-Vergabe-Software für Auftraggeber. Bieter können Ausschreibungen abrufen.',
    coverage: ['Deutschland'],
    languages: ['DE'],
    logo: '💻',
    pros: ['Professionell', 'Viele Features', 'Integration'],
    cons: ['Lizenzkosten', 'Komplex'],
    rating: 4.2
  },
  {
    id: 'portal-10',
    name: 'BieterCheck',
    fullName: 'BieterCheck.de',
    url: 'https://www.bietercheck.de',
    scope: 'Deutschland',
    threshold: 'Alle',
    registration: 'Kostenlose Registrierung, Premium Features kostenpflichtig',
    specialFeatures: 'Aggregator mit Fokus auf IT, Consulting, Marketing. KI-gestütztes Matching.',
    coverage: ['Deutschland', 'DACH'],
    languages: ['DE'],
    logo: '✅',
    pros: ['IT/Consulting', 'Matching', 'Alerts'],
    cons: ['Premium kostenpflichtig', 'Kleinere Auswahl'],
    rating: 3.7
  },
  {
    id: 'portal-11',
    name: 'Vergabe24',
    fullName: 'Vergabe24 Brandenburg',
    url: 'https://www.vergabe24.brandenburg.de',
    scope: 'Brandenburg',
    threshold: 'Ab 1.000 €',
    registration: 'Kostenlose Registrierung',
    specialFeatures: 'E-Vergabe-Plattform des Landes Brandenburg.',
    coverage: ['Brandenburg'],
    languages: ['DE'],
    logo: '🌲',
    pros: ['Regional', 'Kostenlos', 'Einfach'],
    cons: ['Nur Brandenburg', 'Geringe Auswahl'],
    rating: 3.6
  },
  {
    id: 'portal-12',
    name: 'Hamburg Vergabe',
    fullName: 'Elektronische Vergabe Hamburg',
    url: 'https://www.evergabe.hamburg.de',
    scope: 'Hamburg',
    threshold: 'Ab 1.000 €',
    registration: 'Kostenlose Registrierung',
    specialFeatures: 'Zentrale Vergabeplattform der Freien und Hansestadt Hamburg.',
    coverage: ['Hamburg'],
    languages: ['DE'],
    logo: '⚓',
    pros: ['Hamburg-Fokus', 'Gute UI', 'Kostenlos'],
    cons: ['Nur Hamburg'],
    rating: 4.0
  }
];

export default {
  faqData,
  glossaryData,
  portalDirectoryData
};
