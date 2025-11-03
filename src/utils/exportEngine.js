/**
 * RFP Export Engine
 * Exports RFP data to Word (.docx), PDF, and Excel (CSV)
 * Uses: docx, jspdf libraries
 */

import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, WidthType, AlignmentType, HeadingLevel, BorderStyle } from 'docx';
import { jsPDF } from 'jspdf';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Trigger browser download for generated file
 */
export function triggerDownload(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Format date for filenames and documents
 */
function formatDate(date = new Date()) {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

/**
 * Sanitize filename
 */
function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9_-]/g, '_');
}

/**
 * Format currency
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

/**
 * Calculate file size in KB
 */
function getFileSizeKB(blob) {
  return `${Math.round(blob.size / 1024)} KB`;
}

// ============================================================================
// WORD EXPORT (.DOCX)
// ============================================================================

/**
 * Export RFP to Word Document
 * @param {Object} rfpData - RFP data object
 * @returns {Promise<Object>} Export result with success, filename, size
 */
export async function exportToWord(rfpData) {
  try {
    const {
      title = 'RFP Proposal',
      client = 'Client',
      deadline,
      budget,
      summary = '',
      requirements = [],
      team = [],
      pricing = {},
      sections = []
    } = rfpData;

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // TITLE PAGE
          new Paragraph({
            text: title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),
          new Paragraph({
            text: `Proposal for ${client}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: `Date: ${formatDate()}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),

          // PAGE BREAK
          new Paragraph({
            text: '',
            pageBreakBefore: true
          }),

          // EXECUTIVE SUMMARY
          new Paragraph({
            text: 'Executive Summary',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: summary || 'This proposal outlines our comprehensive solution to meet your requirements.',
            spacing: { after: 400 }
          }),

          // PROJECT DETAILS
          new Paragraph({
            text: 'Project Details',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Client: ', bold: true }),
              new TextRun({ text: client })
            ],
            spacing: { after: 100 }
          }),
          ...(deadline ? [new Paragraph({
            children: [
              new TextRun({ text: 'Deadline: ', bold: true }),
              new TextRun({ text: deadline })
            ],
            spacing: { after: 100 }
          })] : []),
          ...(budget ? [new Paragraph({
            children: [
              new TextRun({ text: 'Budget: ', bold: true }),
              new TextRun({ text: formatCurrency(budget) })
            ],
            spacing: { after: 400 }
          })] : []),

          // REQUIREMENTS
          ...(requirements.length > 0 ? [
            new Paragraph({
              text: 'Requirements Analysis',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
              pageBreakBefore: true
            }),
            createRequirementsTable(requirements)
          ] : []),

          // TEAM OVERVIEW
          ...(team.length > 0 ? [
            new Paragraph({
              text: 'Team Overview',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
              pageBreakBefore: true
            }),
            createTeamTable(team)
          ] : []),

          // PRICING
          ...(pricing && (pricing.total || pricing.breakdown) ? [
            new Paragraph({
              text: 'Pricing',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
              pageBreakBefore: true
            }),
            createPricingSection(pricing)
          ] : []),

          // PROPOSAL SECTIONS
          ...createProposalSections(sections)
        ]
      }]
    });

    // Generate and download
    const blob = await Packer.toBlob(doc);
    const filename = `RFP_${sanitizeFilename(title)}_${formatDate()}.docx`;
    triggerDownload(blob, filename);

    return {
      success: true,
      filename,
      size: getFileSizeKB(blob),
      format: 'Word'
    };

  } catch (error) {
    console.error('Word export error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Create requirements table for Word
 */
function createRequirementsTable(requirements) {
  const rows = [
    // Header row
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: 'ID', bold: true })],
          shading: { fill: 'E0E0E0' }
        }),
        new TableCell({
          children: [new Paragraph({ text: 'Requirement', bold: true })],
          shading: { fill: 'E0E0E0' }
        }),
        new TableCell({
          children: [new Paragraph({ text: 'Priority', bold: true })],
          shading: { fill: 'E0E0E0' }
        }),
        new TableCell({
          children: [new Paragraph({ text: 'Status', bold: true })],
          shading: { fill: 'E0E0E0' }
        })
      ]
    }),
    // Data rows
    ...requirements.map((req, index) => new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: `REQ-${String(index + 1).padStart(3, '0')}` })]
        }),
        new TableCell({
          children: [new Paragraph({ text: req.text || req.name || req.description || '' })]
        }),
        new TableCell({
          children: [new Paragraph({ text: req.priority || req.importance || 'Medium' })]
        }),
        new TableCell({
          children: [new Paragraph({ text: req.status || req.compliance || 'Pending' })]
        })
      ]
    }))
  ];

  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE }
  });
}

/**
 * Create team table for Word
 */
function createTeamTable(team) {
  const rows = [
    // Header row
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: 'Name', bold: true })],
          shading: { fill: 'E0E0E0' }
        }),
        new TableCell({
          children: [new Paragraph({ text: 'Role', bold: true })],
          shading: { fill: 'E0E0E0' }
        }),
        new TableCell({
          children: [new Paragraph({ text: 'Experience', bold: true })],
          shading: { fill: 'E0E0E0' }
        }),
        new TableCell({
          children: [new Paragraph({ text: 'Allocation', bold: true })],
          shading: { fill: 'E0E0E0' }
        })
      ]
    }),
    // Data rows
    ...team.map(member => new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: member.name || '' })]
        }),
        new TableCell({
          children: [new Paragraph({ text: member.role || member.position || '' })]
        }),
        new TableCell({
          children: [new Paragraph({ text: member.experience || member.years ? `${member.years} years` : '' })]
        }),
        new TableCell({
          children: [new Paragraph({ text: member.allocation || member.fte ? `${member.fte}%` : '' })]
        })
      ]
    }))
  ];

  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE }
  });
}

/**
 * Create pricing section for Word
 */
function createPricingSection(pricing) {
  const elements = [];

  if (pricing.breakdown && pricing.breakdown.length > 0) {
    const rows = [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: 'Item', bold: true })],
            shading: { fill: 'E0E0E0' }
          }),
          new TableCell({
            children: [new Paragraph({ text: 'Amount', bold: true })],
            shading: { fill: 'E0E0E0' }
          })
        ]
      }),
      ...pricing.breakdown.map(item => new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: item.name || item.description || '' })]
          }),
          new TableCell({
            children: [new Paragraph({ text: formatCurrency(item.amount || item.cost || 0) })]
          })
        ]
      }))
    ];

    elements.push(new Table({
      rows,
      width: { size: 100, type: WidthType.PERCENTAGE }
    }));

    elements.push(new Paragraph({ text: '', spacing: { after: 200 } }));
  }

  if (pricing.total) {
    elements.push(new Paragraph({
      children: [
        new TextRun({ text: 'Total: ', bold: true, size: 28 }),
        new TextRun({ text: formatCurrency(pricing.total), bold: true, size: 28 })
      ],
      spacing: { before: 200 }
    }));
  }

  return elements.length > 0 ? elements : new Paragraph({ text: 'Pricing information not available.' });
}

/**
 * Create proposal sections for Word
 */
function createProposalSections(sections) {
  if (!sections || sections.length === 0) return [];

  const elements = [];
  sections.forEach((section, index) => {
    elements.push(
      new Paragraph({
        text: section.title || `Section ${index + 1}`,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
        pageBreakBefore: index > 0
      })
    );

    if (section.content) {
      const paragraphs = section.content.split('\n').filter(p => p.trim());
      paragraphs.forEach(p => {
        elements.push(new Paragraph({
          text: p,
          spacing: { after: 200 }
        }));
      });
    }
  });

  return elements;
}

// ============================================================================
// PDF EXPORT
// ============================================================================

/**
 * Export RFP to PDF
 * @param {Object} rfpData - RFP data object
 * @returns {Promise<Object>} Export result with success, filename, size
 */
export async function exportToPDF(rfpData) {
  try {
    const {
      title = 'RFP Proposal',
      client = 'Client',
      deadline,
      budget,
      summary = '',
      requirements = [],
      team = [],
      pricing = {},
      sections = []
    } = rfpData;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    let yPos = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);

    // TITLE PAGE
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    yPos = addCenteredText(doc, title, yPos);
    yPos += 10;

    doc.setFontSize(16);
    doc.setFont(undefined, 'normal');
    yPos = addCenteredText(doc, `Proposal for ${client}`, yPos);
    yPos += 10;

    doc.setFontSize(12);
    yPos = addCenteredText(doc, `Date: ${formatDate()}`, yPos);
    yPos += 30;

    // EXECUTIVE SUMMARY
    doc.addPage();
    yPos = 20;
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('Executive Summary', margin, yPos);
    yPos += 10;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    const summaryText = summary || 'This proposal outlines our comprehensive solution to meet your requirements.';
    yPos = addWrappedText(doc, summaryText, margin, yPos, contentWidth);
    yPos += 10;

    // PROJECT DETAILS
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Project Details', margin, yPos);
    yPos += 8;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.text(`Client: ${client}`, margin, yPos);
    yPos += 6;

    if (deadline) {
      doc.text(`Deadline: ${deadline}`, margin, yPos);
      yPos += 6;
    }

    if (budget) {
      doc.text(`Budget: ${formatCurrency(budget)}`, margin, yPos);
      yPos += 10;
    }

    // REQUIREMENTS
    if (requirements.length > 0) {
      yPos = checkPageBreak(doc, yPos, 40);
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.text('Requirements Analysis', margin, yPos);
      yPos += 10;

      yPos = addRequirementsTable(doc, requirements, margin, yPos, contentWidth);
    }

    // TEAM
    if (team.length > 0) {
      yPos = checkPageBreak(doc, yPos, 40);
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.text('Team Overview', margin, yPos);
      yPos += 10;

      yPos = addTeamTable(doc, team, margin, yPos, contentWidth);
    }

    // PRICING
    if (pricing && (pricing.total || pricing.breakdown)) {
      yPos = checkPageBreak(doc, yPos, 40);
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.text('Pricing', margin, yPos);
      yPos += 10;

      yPos = addPricingSection(doc, pricing, margin, yPos, contentWidth);
    }

    // SECTIONS
    if (sections && sections.length > 0) {
      sections.forEach((section, index) => {
        doc.addPage();
        yPos = 20;
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.text(section.title || `Section ${index + 1}`, margin, yPos);
        yPos += 10;

        if (section.content) {
          doc.setFontSize(11);
          doc.setFont(undefined, 'normal');
          yPos = addWrappedText(doc, section.content, margin, yPos, contentWidth);
        }
      });
    }

    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    // Generate and download
    const blob = doc.output('blob');
    const filename = `RFP_${sanitizeFilename(title)}_${formatDate()}.pdf`;
    triggerDownload(blob, filename);

    return {
      success: true,
      filename,
      size: getFileSizeKB(blob),
      format: 'PDF'
    };

  } catch (error) {
    console.error('PDF export error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// PDF Helper Functions

function addCenteredText(doc, text, y) {
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.text(text, pageWidth / 2, y, { align: 'center' });
  return y + 8;
}

function addWrappedText(doc, text, x, y, maxWidth) {
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach(line => {
    y = checkPageBreak(doc, y, 10);
    doc.text(line, x, y);
    y += 6;
  });
  return y;
}

function checkPageBreak(doc, y, requiredSpace) {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (y + requiredSpace > pageHeight - 20) {
    doc.addPage();
    return 20;
  }
  return y;
}

function addRequirementsTable(doc, requirements, x, y, maxWidth) {
  doc.setFontSize(10);
  const colWidths = [20, maxWidth - 60, 20, 20];

  // Header
  y = checkPageBreak(doc, y, 15);
  doc.setFont(undefined, 'bold');
  doc.text('ID', x, y);
  doc.text('Requirement', x + colWidths[0], y);
  doc.text('Priority', x + colWidths[0] + colWidths[1], y);
  doc.text('Status', x + colWidths[0] + colWidths[1] + colWidths[2], y);
  y += 7;

  doc.setFont(undefined, 'normal');

  // Rows
  requirements.forEach((req, index) => {
    y = checkPageBreak(doc, y, 10);
    const reqId = `REQ-${String(index + 1).padStart(3, '0')}`;
    const reqText = req.text || req.name || req.description || '';
    const priority = req.priority || req.importance || 'Medium';
    const status = req.status || req.compliance || 'Pending';

    doc.text(reqId, x, y);

    // Wrap requirement text
    const wrappedText = doc.splitTextToSize(reqText, colWidths[1] - 5);
    const firstLine = wrappedText[0] || '';
    doc.text(firstLine, x + colWidths[0], y);

    doc.text(priority.substring(0, 8), x + colWidths[0] + colWidths[1], y);
    doc.text(status.substring(0, 8), x + colWidths[0] + colWidths[1] + colWidths[2], y);
    y += 7;
  });

  return y + 5;
}

function addTeamTable(doc, team, x, y, maxWidth) {
  doc.setFontSize(10);
  const colWidths = [40, 40, 30, 30];

  // Header
  y = checkPageBreak(doc, y, 15);
  doc.setFont(undefined, 'bold');
  doc.text('Name', x, y);
  doc.text('Role', x + colWidths[0], y);
  doc.text('Experience', x + colWidths[0] + colWidths[1], y);
  doc.text('Allocation', x + colWidths[0] + colWidths[1] + colWidths[2], y);
  y += 7;

  doc.setFont(undefined, 'normal');

  // Rows
  team.forEach(member => {
    y = checkPageBreak(doc, y, 10);
    const name = (member.name || '').substring(0, 25);
    const role = (member.role || member.position || '').substring(0, 25);
    const experience = member.experience || (member.years ? `${member.years}y` : '');
    const allocation = member.allocation || (member.fte ? `${member.fte}%` : '');

    doc.text(name, x, y);
    doc.text(role, x + colWidths[0], y);
    doc.text(String(experience), x + colWidths[0] + colWidths[1], y);
    doc.text(String(allocation), x + colWidths[0] + colWidths[1] + colWidths[2], y);
    y += 7;
  });

  return y + 5;
}

function addPricingSection(doc, pricing, x, y, maxWidth) {
  doc.setFontSize(11);

  if (pricing.breakdown && pricing.breakdown.length > 0) {
    doc.setFont(undefined, 'bold');
    y = checkPageBreak(doc, y, 15);
    doc.text('Item', x, y);
    doc.text('Amount', x + maxWidth - 40, y);
    y += 7;

    doc.setFont(undefined, 'normal');
    pricing.breakdown.forEach(item => {
      y = checkPageBreak(doc, y, 10);
      const name = (item.name || item.description || '').substring(0, 50);
      const amount = formatCurrency(item.amount || item.cost || 0);
      doc.text(name, x, y);
      doc.text(amount, x + maxWidth - 40, y);
      y += 6;
    });
    y += 5;
  }

  if (pricing.total) {
    y = checkPageBreak(doc, y, 15);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Total:', x, y);
    doc.text(formatCurrency(pricing.total), x + maxWidth - 40, y);
    y += 10;
  }

  return y;
}

// ============================================================================
// EXCEL/CSV EXPORT
// ============================================================================

/**
 * Export RFP to Excel (CSV format)
 * @param {Object} rfpData - RFP data object
 * @returns {Promise<Object>} Export result with success, filename, size
 */
export async function exportToExcel(rfpData) {
  try {
    const {
      title = 'RFP Proposal',
      requirements = [],
      team = [],
      pricing = {},
      winProbability,
      score
    } = rfpData;

    let csvContent = '';

    // REQUIREMENTS SHEET
    csvContent += '=== REQUIREMENTS LIST ===\n';
    csvContent += 'ID,Requirement,Priority,Status,Category\n';
    requirements.forEach((req, index) => {
      const reqId = `REQ-${String(index + 1).padStart(3, '0')}`;
      const text = escapeCSV(req.text || req.name || req.description || '');
      const priority = escapeCSV(req.priority || req.importance || 'Medium');
      const status = escapeCSV(req.status || req.compliance || 'Pending');
      const category = escapeCSV(req.category || req.type || '');
      csvContent += `${reqId},${text},${priority},${status},${category}\n`;
    });
    csvContent += '\n\n';

    // PRICING BREAKDOWN
    csvContent += '=== PRICING BREAKDOWN ===\n';
    csvContent += 'Item,Amount (EUR),Notes\n';
    if (pricing.breakdown && pricing.breakdown.length > 0) {
      pricing.breakdown.forEach(item => {
        const name = escapeCSV(item.name || item.description || '');
        const amount = item.amount || item.cost || 0;
        const notes = escapeCSV(item.notes || '');
        csvContent += `${name},${amount},${notes}\n`;
      });
    }
    if (pricing.total) {
      csvContent += `TOTAL,${pricing.total},\n`;
    }
    csvContent += '\n\n';

    // TEAM MEMBERS
    csvContent += '=== TEAM MEMBERS ===\n';
    csvContent += 'Name,Role,Experience (years),Allocation (%),Skills\n';
    team.forEach(member => {
      const name = escapeCSV(member.name || '');
      const role = escapeCSV(member.role || member.position || '');
      const experience = member.experience || member.years || '';
      const allocation = member.allocation || member.fte || '';
      const skills = escapeCSV(member.skills ? member.skills.join('; ') : '');
      csvContent += `${name},${role},${experience},${allocation},${skills}\n`;
    });
    csvContent += '\n\n';

    // SCORING MATRIX
    csvContent += '=== SCORING MATRIX ===\n';
    csvContent += 'Metric,Value,Max,Percentage\n';
    if (score) {
      csvContent += `Overall Score,${score},100,${score}%\n`;
    }
    if (winProbability) {
      csvContent += `Win Probability,${winProbability},100,${winProbability}%\n`;
    }
    if (requirements.length > 0) {
      const metCount = requirements.filter(r => r.status === 'Met' || r.compliance === 'Full').length;
      const coverage = Math.round((metCount / requirements.length) * 100);
      csvContent += `Requirements Coverage,${metCount},${requirements.length},${coverage}%\n`;
    }

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const filename = `RFP_${sanitizeFilename(title)}_${formatDate()}.csv`;
    triggerDownload(blob, filename);

    return {
      success: true,
      filename,
      size: getFileSizeKB(blob),
      format: 'Excel (CSV)'
    };

  } catch (error) {
    console.error('Excel export error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Escape CSV values (handle commas, quotes, newlines)
 */
function escapeCSV(value) {
  if (typeof value !== 'string') return value;

  // If value contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// ============================================================================
// BATCH EXPORT
// ============================================================================

/**
 * Export to all formats
 * @param {Object} rfpData - RFP data object
 * @returns {Promise<Object>} Combined export results
 */
export async function exportAll(rfpData) {
  try {
    const results = {
      word: await exportToWord(rfpData),
      pdf: await exportToPDF(rfpData),
      excel: await exportToExcel(rfpData)
    };

    const allSuccess = results.word.success && results.pdf.success && results.excel.success;

    return {
      success: allSuccess,
      results,
      message: allSuccess
        ? 'All formats exported successfully'
        : 'Some exports failed - check individual results'
    };

  } catch (error) {
    console.error('Batch export error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================================
// EXPORT
// ============================================================================

export default {
  exportToWord,
  exportToPDF,
  exportToExcel,
  exportAll,
  triggerDownload
};
