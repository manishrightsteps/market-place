'use client';

import { useState } from 'react';
import ContentMarketplaceEnterprise from './ContentMarketplaceEnterprise';
import TutorMarketplace from './TutorMarketplace';
import PurchaseModal from './PurchaseModal';
import ContentPreview from './ContentPreview';
import TutorProfile from './TutorProfile';
import CourseDetails from './CourseDetails';
import TutorDetails from './TutorDetails';

export default function MarketplaceDemo() {
  const [activeTab, setActiveTab] = useState('content');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState('content');
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTutorProfile, setShowTutorProfile] = useState(false);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showTutorDetails, setShowTutorDetails] = useState(false);

  const handleContentSelect = (content, action) => {
    if (action === 'buy') {
      setSelectedItem(content);
      setModalType('content');
      setShowModal(true);
    } else if (action === 'preview') {
      setSelectedItem(content);
      setShowPreview(true);
    } else if (action === 'view') {
      setSelectedItem(content);
      setShowCourseDetails(true);
    }
  };

  const handleTutorSelect = (tutor, action) => {
    if (action === 'book') {
      setSelectedItem(tutor);
      setModalType('tutor');
      setShowModal(true);
    } else if (action === 'view') {
      setSelectedItem(tutor);
      setShowTutorDetails(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const closePreview = () => {
    setShowPreview(false);
    setSelectedItem(null);
  };

  const handlePreviewPurchase = (content) => {
    setShowPreview(false);
    setSelectedItem(content);
    setModalType('content');
    setShowModal(true);
  };

  const closeTutorProfile = () => {
    setShowTutorProfile(false);
    setSelectedItem(null);
  };

  const handleTutorBooking = (bookingData) => {
    setShowTutorProfile(false);
    setSelectedItem(bookingData.tutor);
    setModalType('tutor');
    setShowModal(true);
  };

  const handleCourseDetailsBack = () => {
    setShowCourseDetails(false);
    setSelectedItem(null);
  };

  const handleCourseDetailsBuyNow = (course) => {
    setShowCourseDetails(false);
    setSelectedItem(course);
    setModalType('content');
    setShowModal(true);
  };

  const handleTutorDetailsBack = () => {
    setShowTutorDetails(false);
    setSelectedItem(null);
  };

  const handleTutorDetailsBookNow = (tutor) => {
    setShowTutorDetails(false);
    setSelectedItem(tutor);
    setModalType('tutor');
    setShowModal(true);
  };

  // If showing course details, render only that
  if (showCourseDetails) {
    return (
      <CourseDetails
        course={selectedItem}
        onBack={handleCourseDetailsBack}
        onBuyNow={handleCourseDetailsBuyNow}
      />
    );
  }

  // If showing tutor details, render only that
  if (showTutorDetails) {
    return (
      <TutorDetails
        tutor={selectedItem}
        onBack={handleTutorDetailsBack}
        onBookNow={handleTutorDetailsBookNow}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enterprise Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-600">
                Rightsteps
              </h1>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Components */}
      <ContentMarketplaceEnterprise
        onContentSelect={handleContentSelect}
        onTutorSelect={handleTutorSelect}
      />

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={showModal}
        onClose={closeModal}
        item={selectedItem}
        type={modalType}
      />

      {/* Content Preview Modal */}
      <ContentPreview
        isOpen={showPreview}
        onClose={closePreview}
        content={selectedItem}
        onPurchase={handlePreviewPurchase}
      />

      {/* Tutor Profile Modal */}
      <TutorProfile
        isOpen={showTutorProfile}
        onClose={closeTutorProfile}
        tutor={selectedItem}
        onBook={handleTutorBooking}
      />

      {/* Integration Examples */}
      {/* <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Integration Examples:</h2>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 font-mono">
            <p className="mb-2">// Embed Content Marketplace</p>
            <p className="mb-2">&lt;ContentMarketplace</p>
            <p className="ml-4 mb-2">onContentSelect=&#123;handleContentSelect&#125;</p>
            <p className="ml-4 mb-2">showFilters=&#123;true&#125;</p>
            <p className="ml-4 mb-2">showHeader=&#123;false&#125;</p>
            <p className="ml-4 mb-2">className="my-custom-class"</p>
            <p className="mb-4">/&gt;</p>

            <p className="mb-2">// Embed Tutor Marketplace</p>
            <p className="mb-2">&lt;TutorMarketplace</p>
            <p className="ml-4 mb-2">onTutorSelect=&#123;handleTutorSelect&#125;</p>
            <p className="ml-4 mb-2">compact=&#123;true&#125;</p>
            <p className="ml-4 mb-2">showFilters=&#123;false&#125;</p>
            <p className="ml-4 mb-2">maxWidth="4xl"</p>
            <p>/&gt;</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}