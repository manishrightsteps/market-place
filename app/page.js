'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Marketplace from './components/Marketplace';
import PurchaseModal from './components/PurchaseModal';
import AISearch from './components/AISearch';

export default function Home() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseType, setPurchaseType] = useState('content');
  const [showAISearch, setShowAISearch] = useState(false);

  const handleContentSelect = (content, action) => {
    if (action === 'buy') {
      setSelectedItem(content);
      setPurchaseType('content');
      setShowPurchaseModal(true);
    } else if (action === 'view') {
      router.push(`/courses/${content.slug}`);
    }
  };

  const handleTutorSelect = (tutor, action) => {
    if (action === 'book') {
      setSelectedItem(tutor);
      setPurchaseType('tutor');
      setShowPurchaseModal(true);
    } else if (action === 'view') {
      router.push(`/tutors/${tutor.slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-600">Rightsteps</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* AI Search Button */}
              <button
                onClick={() => setShowAISearch(true)}
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg font-medium text-sm transition-all shadow-md hover:shadow-lg group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>Find your fit with AI</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">✨</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace */}
      <Marketplace
        onContentSelect={handleContentSelect}
        onTutorSelect={handleTutorSelect}
      />

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        item={selectedItem}
        type={purchaseType}
      />

      {/* AI Search Modal */}
      <AISearch
        isOpen={showAISearch}
        onClose={() => setShowAISearch(false)}
      />
    </div>
  );
}
