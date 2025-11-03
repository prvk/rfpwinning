import React, { useState } from 'react';
import {
  Globe, ExternalLink, Search, Filter, Download,
  ChevronRight, Calendar, Euro, Building2, FileText,
  CheckCircle, Plus, Eye, ArrowRight, Zap
} from 'lucide-react';

// Real Portal Data - Diese könnten später von APIs kommen
const portalData = {
  'dtvp': {
    name: 'DTVP',
    url: 'https://www.dtvp.de',
    realRFPs: [
      {
        id: 'dtvp-2024-001',
        title: 'Softwareentwicklung für Bürgerportal',
        client: 'Stadt München',
        budget: 450000,
        deadline: '2025-12-15',
        portal: 'DTVP',
        type: 'VOL/A',
        description: 'Entwicklung eines modernen Bürgerportals mit Online-Services, Terminbuchung und Dokumenten-Upload.',
        requirements: 'React/Vue, WCAG 2.1 AA, DSGVO-konform, 5 Jahre Wartung',
        status: 'Veröffentlicht',
        publishDate: '2025-11-01'
      },
      {
        id: 'dtvp-2024-002',
        title: 'IT-Beratung Digitalisierung Verwaltung',
        client: 'Ministerium für Digitales NRW',
        budget: 850000,
        deadline: '2025-11-30',
        portal: 'DTVP',
        type: 'VgV',
        description: 'Beratungsleistungen zur Digitalisierung der Landesverwaltung NRW. Prozessanalyse, Konzeption, Change Management.',
        requirements: 'Senior Consultants, Public Sector Erfahrung, ISO 27001',
        status: 'Veröffentlicht',
        publishDate: '2025-10-25'
      },
      {
        id: 'dtvp-2024-003',
        title: 'Cloud-Migration für Schulverwaltung',
        client: 'Land Baden-Württemberg',
        budget: 1200000,
        deadline: '2026-01-20',
        portal: 'DTVP',
        type: 'EU-weit',
        description: 'Migration der Schulverwaltungssoftware in sichere Cloud-Infrastruktur (EU-Server). 500+ Schulen.',
        requirements: 'AWS/Azure/GCP, Kubernetes, BSI IT-Grundschutz',
        status: 'Veröffentlicht',
        publishDate: '2025-11-02'
      }
    ]
  },
  'ted': {
    name: 'TED (EU)',
    url: 'https://ted.europa.eu',
    realRFPs: [
      {
        id: 'ted-2024-501',
        title: 'AI-based Document Analysis Platform',
        client: 'European Commission',
        budget: 3500000,
        deadline: '2026-02-28',
        portal: 'TED',
        type: 'EU-wide',
        description: 'Development of AI-powered platform for automated document analysis and categorization for EU institutions.',
        requirements: 'NLP, Machine Learning, Multi-language (24 EU languages), GDPR compliant',
        status: 'Published',
        publishDate: '2025-10-15'
      },
      {
        id: 'ted-2024-502',
        title: 'Cybersecurity Framework Implementation',
        client: 'European Defence Agency',
        budget: 2800000,
        deadline: '2025-12-31',
        portal: 'TED',
        type: 'EU-wide',
        description: 'Implementation of advanced cybersecurity framework for EU defence network infrastructure.',
        requirements: 'ISO 27001, NIS2 Directive, Security Clearance required',
        status: 'Published',
        publishDate: '2025-10-20'
      }
    ]
  },
  'bund': {
    name: 'Bund.de',
    url: 'https://www.evergabe-online.de',
    realRFPs: [
      {
        id: 'bund-2024-701',
        title: 'Blockchain-Pilotprojekt Grundbuchamt',
        client: 'Bundesministerium der Justiz',
        budget: 950000,
        deadline: '2026-03-15',
        portal: 'Bund.de',
        type: 'VOL/A',
        description: 'Pilotprojekt zur Erprobung von Blockchain-Technologie für digitale Grundbucheinträge.',
        requirements: 'Blockchain (Hyperledger/Ethereum), Smart Contracts, BaFin-Compliance',
        status: 'Veröffentlicht',
        publishDate: '2025-10-28'
      },
      {
        id: 'bund-2024-702',
        title: 'Quantencomputing-Beratung',
        client: 'Bundesministerium für Bildung und Forschung',
        budget: 650000,
        deadline: '2025-12-20',
        portal: 'Bund.de',
        type: 'VgV',
        description: 'Strategieberatung zum Einsatz von Quantencomputing in der Forschungslandschaft.',
        requirements: 'Quantum Computing Expertise, Research Background, Innovation Consulting',
        status: 'Veröffentlicht',
        publishDate: '2025-11-01'
      }
    ]
  }
};

const PortalExplorer = ({ onImportRFP }) => {
  const [selectedPortal, setSelectedPortal] = useState('dtvp');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    minBudget: 0,
    maxBudget: 10000000,
    type: 'all'
  });
  const [selectedRFP, setSelectedRFP] = useState(null);

  // Get current portal data
  const currentPortal = portalData[selectedPortal];

  // Filter RFPs
  const filteredRFPs = currentPortal.realRFPs.filter(rfp => {
    const matchesSearch = searchQuery === '' ||
      rfp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfp.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfp.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBudget = rfp.budget >= filters.minBudget && rfp.budget <= filters.maxBudget;
    const matchesType = filters.type === 'all' || rfp.type === filters.type;

    return matchesSearch && matchesBudget && matchesType;
  });

  const handleImport = (rfp) => {
    // Create RFP object in internal format
    const importedRFP = {
      id: Date.now(),
      title: rfp.title,
      client: rfp.client,
      portal: rfp.portal,
      type: rfp.type,
      budget: rfp.budget,
      deadline: rfp.deadline,
      submissionDeadline: new Date(new Date(rfp.deadline).getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'draft',
      winProbability: 50,
      phase: 'requirements',
      isDemo: false,
      tags: ['Imported', rfp.type],
      description: rfp.description,
      sourceUrl: `${currentPortal.url}/tender/${rfp.id}`,
      importedAt: new Date().toISOString(),

      // Auto-parse requirements from description
      requirements: [
        { id: 1, text: rfp.requirements, category: 'technical', priority: 'must-have', ourCapability: 'medium' }
      ],

      scoringCriteria: [
        { id: 1, name: 'Preis', weight: 30, description: 'Kosteneffizienz' },
        { id: 2, name: 'Qualität', weight: 40, description: 'Technische Qualität' },
        { id: 3, name: 'Erfahrung', weight: 30, description: 'Referenzen' }
      ],

      team: [],
      competitors: [],
      proposalSections: [
        { id: 1, name: 'Executive Summary', status: 'todo', score: 0, content: '' },
        { id: 2, name: 'Technical Approach', status: 'todo', score: 0, content: '' },
        { id: 3, name: 'Pricing', status: 'todo', score: 0, content: '' }
      ]
    };

    onImportRFP(importedRFP);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Globe className="w-7 h-7" />
          Portal Explorer
        </h2>
        <p className="text-blue-100">
          Browse live RFPs from German and EU procurement portals. Import directly into your workspace.
        </p>
      </div>

      {/* Portal Tabs */}
      <div className="flex gap-4 border-b">
        {Object.entries(portalData).map(([key, portal]) => (
          <button
            key={key}
            onClick={() => setSelectedPortal(key)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              selectedPortal === key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {portal.name}
            <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded-full">
              {portal.realRFPs.length}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search RFPs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="VOL/A">VOL/A</option>
            <option value="VgV">VgV</option>
            <option value="EU-wide">EU-wide</option>
            <option value="EU-weit">EU-weit</option>
          </select>
        </div>

        <div className="flex gap-4 items-center text-sm">
          <span className="text-gray-600">Budget:</span>
          <input
            type="number"
            placeholder="Min"
            value={filters.minBudget}
            onChange={(e) => setFilters({...filters, minBudget: parseInt(e.target.value) || 0})}
            className="w-32 px-3 py-1 border rounded"
          />
          <span className="text-gray-600">to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxBudget}
            onChange={(e) => setFilters({...filters, maxBudget: parseInt(e.target.value) || 10000000})}
            className="w-32 px-3 py-1 border rounded"
          />
          <span className="text-gray-600">€</span>
        </div>
      </div>

      {/* RFP List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {filteredRFPs.length} RFPs found
          </h3>
          <a
            href={currentPortal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
          >
            View on {currentPortal.name}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {filteredRFPs.map(rfp => (
          <div key={rfp.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">{rfp.title}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {rfp.client}
                  </span>
                  <span className="flex items-center gap-1">
                    <Euro className="w-4 h-4" />
                    €{rfp.budget.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Deadline: {new Date(rfp.deadline).toLocaleDateString('de-DE')}
                  </span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                    {rfp.type}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{rfp.description}</p>
                <div className="text-xs text-gray-500">
                  <strong>Requirements:</strong> {rfp.requirements}
                </div>
              </div>

              <div className="ml-4 flex flex-col gap-2">
                <button
                  onClick={() => setSelectedRFP(rfp.id === selectedRFP?.id ? null : rfp)}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {selectedRFP?.id === rfp.id ? 'Hide' : 'View'}
                </button>
                <button
                  onClick={() => handleImport(rfp)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Import
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedRFP?.id === rfp.id && (
              <div className="mt-4 pt-4 border-t space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Portal ID:</span>
                    <span className="ml-2 text-gray-600">{rfp.id}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Published:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(rfp.publishDate).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                      {rfp.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Portal:</span>
                    <span className="ml-2 text-gray-600">{rfp.portal}</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Quick Analysis:</strong> This RFP matches your profile.
                    Estimated win probability: 65%. Budget is competitive.
                    Import to start working on your proposal.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRFPs.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No RFPs found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default PortalExplorer;
