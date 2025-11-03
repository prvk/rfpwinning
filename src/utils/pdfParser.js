/**
 * RFP PDF Parser
 *
 * Parses PDF documents to extract structured information about RFPs
 * including budget, deadlines, requirements, client info, and project details.
 *
 * @example
 * ```javascript
 * import { parsePDFFile, parsePDFBuffer } from './utils/pdfParser.js';
 *
 * // Option 1: Parse from File object (browser upload)
 * const fileInput = document.querySelector('input[type="file"]');
 * fileInput.addEventListener('change', async (e) => {
 *   const file = e.target.files[0];
 *   const rfpData = await parsePDFFile(file);
 *   console.log(rfpData);
 * });
 *
 * // Option 2: Parse from buffer (Node.js)
 * const fs = require('fs');
 * const buffer = fs.readFileSync('rfp-document.pdf');
 * const rfpData = await parsePDFBuffer(buffer);
 * console.log(rfpData);
 * ```
 */

import * as pdfjsLib from 'pdfjs-dist';

// Konfiguriere den Worker für pdfjs-dist
if (typeof window !== 'undefined') {
  // Browser environment
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

/**
 * Extrahiert Budget-Informationen aus Text
 * @param {string} text - Der zu analysierende Text
 * @returns {number|null} - Gefundener Budget-Betrag oder null
 */
function extractBudget(text) {
  const patterns = [
    // Standard Euro-Formate
    /(?:Budget|Volumen|Auftragswert|Kosten)[:\s]*(?:bis\s+zu\s+)?(?:ca\.?\s+)?(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)\s*(?:Euro|EUR|€)/gi,
    // Nur Beträge mit Euro-Zeichen
    /(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)\s*(?:Euro|EUR|€)/gi,
    // Budget: 150.000 EUR Format
    /(?:Budget|Volumen|Auftragswert)[:\s]+(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/gi,
    // Bis zu X Euro
    /bis\s+(?:zu\s+)?(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)\s*(?:Euro|EUR|€)/gi
  ];

  let maxBudget = null;

  for (const pattern of patterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      const budgetStr = match[1].replace(/\./g, '').replace(',', '.');
      const budget = parseFloat(budgetStr);

      if (!isNaN(budget) && budget > 0) {
        // Speichere das höchste gefundene Budget
        if (maxBudget === null || budget > maxBudget) {
          maxBudget = budget;
        }
      }
    }
  }

  return maxBudget;
}

/**
 * Extrahiert Deadline-Informationen aus Text
 * @param {string} text - Der zu analysierende Text
 * @returns {string|null} - ISO-formatiertes Datum oder null
 */
function extractDeadline(text) {
  const patterns = [
    // DD.MM.YYYY oder DD/MM/YYYY
    {
      regex: /(?:Frist|Deadline|Abgabe|Einreichung|bis)[:\s]*(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{4})/gi,
      format: (match) => {
        const day = match[1].padStart(2, '0');
        const month = match[2].padStart(2, '0');
        const year = match[3];
        return `${year}-${month}-${day}`;
      }
    },
    // DD.MM.YY
    {
      regex: /(?:Frist|Deadline|Abgabe|Einreichung|bis)[:\s]*(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{2})/gi,
      format: (match) => {
        const day = match[1].padStart(2, '0');
        const month = match[2].padStart(2, '0');
        const year = parseInt(match[3]) + 2000;
        return `${year}-${month}-${day}`;
      }
    },
    // YYYY-MM-DD (ISO format)
    {
      regex: /(?:Frist|Deadline|Abgabe|Einreichung|bis)[:\s]*(\d{4})-(\d{2})-(\d{2})/gi,
      format: (match) => match[0].match(/\d{4}-\d{2}-\d{2}/)[0]
    }
  ];

  const deadlines = [];

  for (const pattern of patterns) {
    const matches = text.matchAll(pattern.regex);
    for (const match of matches) {
      try {
        const dateStr = pattern.format(match);
        const date = new Date(dateStr);

        // Validiere das Datum
        if (!isNaN(date.getTime())) {
          deadlines.push({
            date: date,
            dateStr: dateStr
          });
        }
      } catch (e) {
        // Ignoriere ungültige Daten
      }
    }
  }

  // Gib die nächste Deadline in der Zukunft zurück, oder die früheste wenn keine in der Zukunft
  if (deadlines.length > 0) {
    const now = new Date();
    const futureDates = deadlines.filter(d => d.date >= now);

    if (futureDates.length > 0) {
      futureDates.sort((a, b) => a.date - b.date);
      return futureDates[0].dateStr;
    } else {
      deadlines.sort((a, b) => a.date - b.date);
      return deadlines[0].dateStr;
    }
  }

  return null;
}

/**
 * Extrahiert Requirements aus Text
 * @param {string} text - Der zu analysierende Text
 * @returns {Array} - Array von Requirement-Objekten
 */
function extractRequirements(text) {
  const requirements = [];
  const lines = text.split('\n');

  // Keywords für verschiedene Kategorien
  const technicalKeywords = /technisch|software|hardware|system|plattform|infrastruktur|api|datenbank|schnittstelle/i;
  const functionalKeywords = /funktion|feature|modul|komponente|prozess|workflow|ablauf/i;
  const qualityKeywords = /qualität|sicherheit|performance|verfügbarkeit|standard|norm|zertifizierung/i;

  // Priority keywords
  const mustHaveKeywords = /muss|erforderlich|zwingend|notwendig|obligatorisch|verpflichtend|pflicht/i;
  const shouldHaveKeywords = /sollte|wünschenswert|empfohlen|bevorzugt|idealerweise/i;
  const niceToHaveKeywords = /kann|optional|zusätzlich|bonus|vorteilhaft/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Ignoriere zu kurze Zeilen
    if (line.length < 10) continue;

    // Prüfe ob die Zeile ein Requirement ist
    const isMustHave = mustHaveKeywords.test(line);
    const isShouldHave = shouldHaveKeywords.test(line);
    const isNiceToHave = niceToHaveKeywords.test(line);

    if (isMustHave || isShouldHave || isNiceToHave) {
      let priority = 'should-have';
      if (isMustHave) priority = 'must-have';
      else if (isNiceToHave) priority = 'nice-to-have';

      // Bestimme die Kategorie
      let category = 'general';
      if (technicalKeywords.test(line)) category = 'technical';
      else if (functionalKeywords.test(line)) category = 'functional';
      else if (qualityKeywords.test(line)) category = 'quality';

      // Bereinige den Text (entferne Aufzählungszeichen etc.)
      const cleanText = line
        .replace(/^[\-\*•]\s*/, '')
        .replace(/^\d+[\.\)]\s*/, '')
        .trim();

      if (cleanText.length > 0) {
        requirements.push({
          text: cleanText,
          category: category,
          priority: priority
        });
      }
    }

    // Prüfe auf nummerierte/bullet Listen mit Requirements
    const listItemMatch = line.match(/^[\-\*•]\s*(.+)|^\d+[\.\)]\s*(.+)/);
    if (listItemMatch) {
      const itemText = (listItemMatch[1] || listItemMatch[2]).trim();

      // Nur hinzufügen wenn noch nicht vorhanden und relevant
      if (itemText.length > 15 && !requirements.some(r => r.text === itemText)) {
        // Bestimme Kategorie
        let category = 'general';
        if (technicalKeywords.test(itemText)) category = 'technical';
        else if (functionalKeywords.test(itemText)) category = 'functional';
        else if (qualityKeywords.test(itemText)) category = 'quality';

        requirements.push({
          text: itemText,
          category: category,
          priority: 'should-have'
        });
      }
    }
  }

  return requirements;
}

/**
 * Extrahiert Client-Name aus Text
 * @param {string} text - Der zu analysierende Text
 * @returns {string|null} - Client-Name oder null
 */
function extractClient(text) {
  const patterns = [
    /(?:Auftraggeber|Kunde|Mandant|Unternehmen)[:\s]+([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+)*(?:\s+(?:GmbH|AG|e\.V\.|KG|OHG))?)/,
    /(?:Auftraggeber|Kunde|Mandant)[:\s]+(.+?)(?:\n|$)/,
    /^([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+)*\s+(?:GmbH|AG|e\.V\.|KG|OHG))/m
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return null;
}

/**
 * Extrahiert Projekt-Titel aus Text
 * @param {string} text - Der zu analysierende Text
 * @returns {string|null} - Projekt-Titel oder null
 */
function extractProjectTitle(text) {
  const patterns = [
    /(?:Projekt|Ausschreibung|Titel|Betreff|Vorhaben)[:\s]+(.+?)(?:\n|$)/i,
    /^(?:RFP|Request for Proposal)[:\s]+(.+?)(?:\n|$)/im,
    /Ausschreibung\s+[„"](.+?)[""]/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  // Fallback: Erste Zeile wenn sie wie ein Titel aussieht
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine.length > 10 && firstLine.length < 150 && !firstLine.includes('.pdf')) {
      return firstLine;
    }
  }

  return null;
}

/**
 * Extrahiert Text aus einem PDF-Dokument
 * @param {ArrayBuffer} data - PDF-Daten als ArrayBuffer
 * @returns {Promise<string>} - Extrahierter Text
 */
async function extractTextFromPDF(data) {
  try {
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;

    let fullText = '';

    // Iteriere durch alle Seiten
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Kombiniere alle Text-Items
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');

      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    throw new Error(`PDF-Parsing fehlgeschlagen: ${error.message}`);
  }
}

/**
 * Parst ein PDF-File-Objekt (Browser)
 * @param {File} file - PDF File-Objekt
 * @returns {Promise<Object>} - Strukturierte RFP-Daten
 */
export async function parsePDFFile(file) {
  if (!file || file.type !== 'application/pdf') {
    throw new Error('Ungültige Datei. Bitte laden Sie eine PDF-Datei hoch.');
  }

  try {
    // Konvertiere File zu ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    return await parsePDFBuffer(arrayBuffer);
  } catch (error) {
    throw new Error(`Fehler beim Parsen der PDF-Datei: ${error.message}`);
  }
}

/**
 * Parst einen PDF-Buffer
 * @param {ArrayBuffer|Buffer} buffer - PDF-Daten
 * @returns {Promise<Object>} - Strukturierte RFP-Daten
 */
export async function parsePDFBuffer(buffer) {
  try {
    // Konvertiere Buffer zu ArrayBuffer falls nötig (Node.js compatibility)
    const arrayBuffer = buffer instanceof ArrayBuffer
      ? buffer
      : buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

    // Extrahiere Text aus PDF
    const rawText = await extractTextFromPDF(arrayBuffer);

    // Extrahiere strukturierte Informationen
    const title = extractProjectTitle(rawText);
    const client = extractClient(rawText);
    const budget = extractBudget(rawText);
    const deadline = extractDeadline(rawText);
    const requirements = extractRequirements(rawText);

    return {
      title: title || 'Unbekanntes Projekt',
      client: client || 'Unbekannter Kunde',
      budget: budget,
      deadline: deadline,
      requirements: requirements,
      rawText: rawText,
      metadata: {
        parsed: new Date().toISOString(),
        requirementsCount: requirements.length,
        hasbudget: budget !== null,
        hasDeadline: deadline !== null
      }
    };
  } catch (error) {
    throw new Error(`Fehler beim Parsen des PDF-Buffers: ${error.message}`);
  }
}

/**
 * Validiert die geparsten RFP-Daten
 * @param {Object} rfpData - Geparste RFP-Daten
 * @returns {Object} - Validierungsergebnis
 */
export function validateRFPData(rfpData) {
  const issues = [];
  const warnings = [];

  if (!rfpData.title || rfpData.title === 'Unbekanntes Projekt') {
    warnings.push('Projekt-Titel konnte nicht extrahiert werden');
  }

  if (!rfpData.client || rfpData.client === 'Unbekannter Kunde') {
    warnings.push('Kunde/Auftraggeber konnte nicht identifiziert werden');
  }

  if (!rfpData.budget) {
    issues.push('Budget konnte nicht extrahiert werden');
  }

  if (!rfpData.deadline) {
    issues.push('Deadline konnte nicht extrahiert werden');
  }

  if (rfpData.requirements.length === 0) {
    issues.push('Keine Requirements gefunden');
  }

  return {
    isValid: issues.length === 0,
    issues: issues,
    warnings: warnings,
    score: calculateCompleteness(rfpData)
  };
}

/**
 * Berechnet die Vollständigkeit der geparsten Daten (0-100%)
 * @param {Object} rfpData - Geparste RFP-Daten
 * @returns {number} - Vollständigkeits-Score
 */
function calculateCompleteness(rfpData) {
  let score = 0;

  if (rfpData.title && rfpData.title !== 'Unbekanntes Projekt') score += 15;
  if (rfpData.client && rfpData.client !== 'Unbekannter Kunde') score += 15;
  if (rfpData.budget) score += 25;
  if (rfpData.deadline) score += 25;
  if (rfpData.requirements.length > 0) score += 20;

  return score;
}

/**
 * Formatiert die RFP-Daten für die Anzeige
 * @param {Object} rfpData - Geparste RFP-Daten
 * @returns {string} - Formatierte Zusammenfassung
 */
export function formatRFPSummary(rfpData) {
  const validation = validateRFPData(rfpData);

  let summary = `
=== RFP Analyse Zusammenfassung ===

Projekt: ${rfpData.title}
Kunde: ${rfpData.client}
Budget: ${rfpData.budget ? `${rfpData.budget.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}` : 'Nicht angegeben'}
Deadline: ${rfpData.deadline || 'Nicht angegeben'}

Requirements (${rfpData.requirements.length}):
`;

  // Gruppiere Requirements nach Priority
  const mustHave = rfpData.requirements.filter(r => r.priority === 'must-have');
  const shouldHave = rfpData.requirements.filter(r => r.priority === 'should-have');
  const niceToHave = rfpData.requirements.filter(r => r.priority === 'nice-to-have');

  if (mustHave.length > 0) {
    summary += '\nMUSS-Kriterien:\n';
    mustHave.forEach((req, idx) => {
      summary += `  ${idx + 1}. [${req.category}] ${req.text}\n`;
    });
  }

  if (shouldHave.length > 0) {
    summary += '\nSOLL-Kriterien:\n';
    shouldHave.forEach((req, idx) => {
      summary += `  ${idx + 1}. [${req.category}] ${req.text}\n`;
    });
  }

  if (niceToHave.length > 0) {
    summary += '\nKANN-Kriterien:\n';
    niceToHave.forEach((req, idx) => {
      summary += `  ${idx + 1}. [${req.category}] ${req.text}\n`;
    });
  }

  summary += `\nVollständigkeit: ${validation.score}%\n`;

  if (validation.warnings.length > 0) {
    summary += '\nWarnungen:\n';
    validation.warnings.forEach(w => summary += `  - ${w}\n`);
  }

  if (validation.issues.length > 0) {
    summary += '\nProbleme:\n';
    validation.issues.forEach(i => summary += `  - ${i}\n`);
  }

  return summary;
}

// Default export
export default {
  parsePDFFile,
  parsePDFBuffer,
  validateRFPData,
  formatRFPSummary,
  extractBudget,
  extractDeadline,
  extractRequirements,
  extractClient,
  extractProjectTitle
};
