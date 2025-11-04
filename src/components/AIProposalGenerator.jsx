import React, { useState } from 'react';
import { X, Sparkles, Check, Copy, Edit3 } from 'lucide-react';

const AIProposalGenerator = ({ rfp, onInsertContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiProvider, setAiProvider] = useState('mock');
  const [section, setSection] = useState('Executive Summary');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [apiKey, setApiKey] = useState('');

  const sections = [
    'Executive Summary',
    'Technical Approach',
    'Project Timeline',
    'Team & Qualifications',
    'Risk Management',
    'Budget Breakdown'
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'persuasive', label: 'Persuasive' },
    { value: 'technical', label: 'Technical' },
    { value: 'friendly', label: 'Friendly' }
  ];

  const lengths = [
    { value: 'short', label: 'Short (~150 words)' },
    { value: 'medium', label: 'Medium (~300 words)' },
    { value: 'long', label: 'Long (~500 words)' }
  ];

  const generateMockProposal = (rfp, section, options) => {
    const { tone, length } = options;

    const lengthMultiplier = {
      short: 1,
      medium: 2,
      long: 3
    }[length];

    const toneModifiers = {
      professional: {
        prefix: 'We are pleased to',
        style: 'formal and structured',
        closer: 'We look forward to the opportunity to demonstrate our capabilities.'
      },
      persuasive: {
        prefix: 'Imagine a solution where',
        style: 'compelling and benefit-focused',
        closer: 'Partner with us to transform this vision into reality.'
      },
      technical: {
        prefix: 'Our technical analysis indicates',
        style: 'detailed and specification-driven',
        closer: 'This approach ensures optimal technical implementation.'
      },
      friendly: {
        prefix: "We're excited to",
        style: 'approachable and collaborative',
        closer: "We can't wait to work together on this!"
      }
    };

    const modifier = toneModifiers[tone];
    const budget = rfp.budget ? `€${rfp.budget.toLocaleString()}` : 'the specified budget';
    const requirementCount = rfp.requirements?.length || 0;
    const timeline = rfp.deadline ? new Date(rfp.deadline).toLocaleDateString() : 'the proposed timeline';

    const templates = {
      'Executive Summary': `${modifier.prefix} submit our comprehensive proposal for ${rfp.title}. ${
        lengthMultiplier >= 2
          ? `This project represents an exceptional opportunity to deliver innovative solutions within ${budget}.`
          : ''
      }

Our approach combines proven methodologies with cutting-edge technology to address all ${requirementCount} specified requirements. ${
        lengthMultiplier >= 2
          ? `We have assembled a dedicated team with extensive experience in similar projects, ensuring successful delivery by ${timeline}.`
          : ''
      }

${lengthMultiplier >= 3
  ? `Key differentiators of our proposal include:
- Comprehensive risk mitigation strategies
- Agile development methodology for flexibility
- Dedicated project management and quality assurance
- Post-delivery support and maintenance

Our track record demonstrates consistent on-time, on-budget delivery with client satisfaction rates exceeding 95%. `
  : ''
}${modifier.closer}`,

      'Technical Approach': `${modifier.prefix} that our technical solution addresses all ${requirementCount} requirements through a ${tone} architecture. ${
        lengthMultiplier >= 2
          ? `We propose a scalable, modular design that ensures long-term maintainability and extensibility.`
          : ''
      }

Core Technical Components:
${rfp.requirements?.slice(0, 3).map((req, idx) =>
  `${idx + 1}. ${req.description ? req.description.substring(0, 80) : `Requirement ${idx + 1}`}${lengthMultiplier >= 2 ? ' - Implemented using industry best practices' : ''}`
).join('\n')}

${lengthMultiplier >= 3
  ? `Technology Stack:
- Frontend: Modern responsive framework
- Backend: Robust, scalable architecture
- Database: High-performance data management
- Security: Industry-standard encryption and authentication
- DevOps: Automated CI/CD pipeline

Our implementation follows SOLID principles and incorporates automated testing at every level. `
  : ''
}${modifier.closer}`,

      'Project Timeline': `${modifier.prefix} deliver this project with the target completion date of ${timeline}. ${
        lengthMultiplier >= 2
          ? `Our phased approach ensures continuous progress tracking and stakeholder engagement.`
          : ''
      }

Phase 1: Discovery & Planning (Weeks 1-2)
- Requirements finalization and validation
- Technical architecture design
${lengthMultiplier >= 2 ? '- Stakeholder workshops and approval\n- Risk assessment and mitigation planning' : ''}

Phase 2: Development (Weeks 3-8)
- Core functionality implementation
- Iterative development sprints
${lengthMultiplier >= 2 ? '- Regular progress demonstrations\n- Quality assurance and testing' : ''}

${lengthMultiplier >= 3
  ? `Phase 3: Testing & Refinement (Weeks 9-10)
- Comprehensive system testing
- User acceptance testing
- Performance optimization
- Security audit

Phase 4: Deployment & Handover (Weeks 11-12)
- Production deployment
- User training and documentation
- Knowledge transfer
- Post-launch support setup

`
  : ''
}${modifier.closer}`,

      'Team & Qualifications': `${modifier.prefix} assemble a world-class team specifically for ${rfp.title}. ${
        lengthMultiplier >= 2
          ? `Each team member brings specialized expertise and proven experience in delivering similar projects.`
          : ''
      }

Core Team Members:
- Project Manager: 10+ years managing complex technology projects
- Lead Architect: Expert in scalable system design
- Senior Developers: Combined 25+ years of experience
${lengthMultiplier >= 2 ? '- UX/UI Designer: Award-winning design portfolio\n- QA Lead: Certified testing specialist' : ''}

${lengthMultiplier >= 3
  ? `Our Company Credentials:
- Successfully delivered 50+ projects in the past 3 years
- Client retention rate of 92%
- ISO 9001:2015 certified
- Industry awards and recognition
- Partnerships with leading technology providers

Relevant Experience:
We have completed similar projects for clients in your industry, including comprehensive solution delivery within comparable budgets and timelines. Our case studies demonstrate our ability to exceed expectations consistently.

`
  : ''
}${modifier.closer}`,

      'Risk Management': `${modifier.prefix} implement comprehensive risk management strategies for ${rfp.title}. ${
        lengthMultiplier >= 2
          ? `Our proactive approach identifies, assesses, and mitigates potential risks before they impact project success.`
          : ''
      }

Identified Risks and Mitigation:

1. Technical Risks
- Risk: Integration complexity
- Mitigation: Thorough API testing and documentation
${lengthMultiplier >= 2 ? '- Contingency: Alternative integration approaches prepared' : ''}

2. Timeline Risks
- Risk: Scope creep affecting deadline
- Mitigation: Strict change control process
${lengthMultiplier >= 2 ? '- Contingency: Resource scaling capability' : ''}

${lengthMultiplier >= 3
  ? `3. Resource Risks
- Risk: Key personnel availability
- Mitigation: Cross-trained team members
- Contingency: Pre-qualified backup resources

4. Quality Risks
- Risk: Defects in production
- Mitigation: Automated testing and code review
- Contingency: Rapid response support team

5. Budget Risks
- Risk: Cost overruns
- Mitigation: Detailed tracking and early warning system
- Contingency: 10% contingency reserve allocated

Our risk register is monitored weekly with stakeholder updates and proactive response protocols.

`
  : ''
}${modifier.closer}`,

      'Budget Breakdown': `${modifier.prefix} provide transparent budget allocation for ${rfp.title} within the total budget of ${budget}. ${
        lengthMultiplier >= 2
          ? `Our pricing reflects competitive market rates while ensuring quality delivery.`
          : ''
      }

Budget Allocation:

Development & Implementation: 50%
- Frontend development
- Backend development
- Database design
${lengthMultiplier >= 2 ? '- API integration\n- Third-party services' : ''}

Project Management: 15%
- Project coordination
- Stakeholder communication
${lengthMultiplier >= 2 ? '- Risk management\n- Quality assurance' : ''}

${lengthMultiplier >= 3
  ? `Testing & QA: 15%
- Unit testing
- Integration testing
- User acceptance testing
- Performance testing

Design & UX: 10%
- User interface design
- User experience optimization
- Responsive design implementation

Documentation & Training: 5%
- Technical documentation
- User manuals
- Training materials
- Knowledge transfer sessions

Contingency Reserve: 5%
- Risk mitigation
- Scope adjustments
- Unforeseen challenges

`
  : ''
}Payment terms: Milestone-based with 30% upfront, 40% at mid-project, and 30% upon completion. ${modifier.closer}`
    };

    return templates[section] || `${modifier.prefix} create a comprehensive ${section.toLowerCase()} for this proposal. [Content would be generated based on RFP requirements and selected parameters.] ${modifier.closer}`;
  };

  const generateWithRealAPI = async (rfp, section, options) => {
    const { tone, length } = options;

    const prompt = `Generate a ${length} ${tone} ${section} for the following RFP:

Title: ${rfp.title}
Budget: €${rfp.budget?.toLocaleString() || 'Not specified'}
Deadline: ${rfp.deadline || 'Not specified'}
Requirements: ${rfp.requirements?.map(r => r.description || r.title).join(', ') || 'None specified'}

Please create a compelling, professional proposal section that addresses the client's needs.`;

    if (aiProvider === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a professional proposal writer.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: length === 'short' ? 300 : length === 'medium' ? 600 : 1000
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } else if (aiProvider === 'anthropic') {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: length === 'short' ? 300 : length === 'medium' ? 600 : 1000,
          messages: [
            { role: 'user', content: prompt }
          ]
        })
      });

      const data = await response.json();
      return data.content[0].text;
    }

    throw new Error('Invalid AI provider');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedContent('');
    setIsEditing(false);

    try {
      let content;
      if (aiProvider === 'mock') {
        // Simulate API delay for realism
        await new Promise(resolve => setTimeout(resolve, 1500));
        content = generateMockProposal(rfp, section, { tone, length });
      } else {
        content = await generateWithRealAPI(rfp, section, { tone, length });
      }

      setGeneratedContent(content);
      setEditedContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent('Error generating content. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInsert = () => {
    const contentToInsert = isEditing ? editedContent : generatedContent;
    onInsertContent(section, contentToInsert);
    setIsModalOpen(false);
    setGeneratedContent('');
    setIsEditing(false);
  };

  const handleCopyToClipboard = () => {
    const contentToCopy = isEditing ? editedContent : generatedContent;
    navigator.clipboard.writeText(contentToCopy);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Generate with AI
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
                AI Proposal Generator
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* AI Provider Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AI Provider
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setAiProvider('mock')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      aiProvider === 'mock'
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold">Mock AI</div>
                    <div className="text-xs text-gray-500">No API key needed</div>
                  </button>
                  <button
                    onClick={() => setAiProvider('openai')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      aiProvider === 'openai'
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold">OpenAI GPT-4</div>
                    <div className="text-xs text-gray-500">Requires API key</div>
                  </button>
                  <button
                    onClick={() => setAiProvider('anthropic')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      aiProvider === 'anthropic'
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold">Anthropic Claude</div>
                    <div className="text-xs text-gray-500">Requires API key</div>
                  </button>
                </div>
              </div>

              {/* API Key Input (if not mock) */}
              {aiProvider !== 'mock' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Section Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section to Generate
                </label>
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {sections.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        tone === t.value
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {lengths.map((l) => (
                    <button
                      key={l.value}
                      onClick={() => setLength(l.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        length === l.value
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || (aiProvider !== 'mock' && !apiKey)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Content
                  </>
                )}
              </button>

              {/* Generated Content Preview */}
              {generatedContent && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Generated Content
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        {isEditing ? 'Preview' : 'Edit'}
                      </button>
                      <button
                        onClick={handleCopyToClipboard}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </button>
                    </div>
                  </div>

                  {isEditing ? (
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                    />
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto whitespace-pre-wrap">
                      {generatedContent}
                    </div>
                  )}

                  {/* Insert Button */}
                  <button
                    onClick={handleInsert}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Insert into Proposal
                  </button>
                </div>
              )}

              {/* Info Banner for Mock Mode */}
              {aiProvider === 'mock' && !generatedContent && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Mock AI Mode Active</p>
                      <p>
                        This mode generates intelligent placeholder content based on your RFP data.
                        No API key required. Perfect for testing and demonstrations!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIProposalGenerator;
