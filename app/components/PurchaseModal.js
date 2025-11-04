'use client';

import { useState } from 'react';

export default function PurchaseModal({ isOpen, onClose, item, type = 'content' }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !item) return null;

  const handlePurchase = async () => {
    setStep(2); // Move to processing step
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Success step
    }, 2000);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-linear-to-r from-green-50 to-blue-50 p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {step === 1 ? 'Confirm Purchase' : step === 2 ? 'Processing...' : 'Purchase Complete!'}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {/* Step 1: Confirmation */}
          {step === 1 && (
            <>
              {/* Item Preview */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl">{type === 'content' ? item.image : item.photo}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  {type === 'content' ? (
                    <p className="text-sm text-gray-600">{item.grade} • {item.lessons} lessons</p>
                  ) : (
                    <p className="text-sm text-gray-600">{item.subjects?.join(', ')} • {item.experience}</p>
                  )}
                </div>
              </div>

              {/* What's Included */}
              {type === 'content' && (
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-3">What&apos;s Included:</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>
                      <span>{item.lessons} video lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>
                      <span>Practice worksheets</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">
                    {type === 'content' ? 'Course Price:' : 'Session Price:'}
                  </span>
                  <span className="font-medium">£{type === 'content' ? item.price : item.hourlyRate}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Platform Fee:</span>
                  <span className="font-medium">£0</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t border-gray-100 pt-2">
                  <span>Total:</span>
                  <span className="text-green-600">£{type === 'content' ? item.price : item.hourlyRate}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h5 className="font-medium text-gray-900 mb-3">Payment Method:</h5>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-green-300">
                    <input type="radio" name="payment" className="text-green-600" defaultChecked />
                    <span className="text-sm font-medium">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-green-300">
                    <input type="radio" name="payment" className="text-green-600" />
                    <span className="text-sm font-medium">PayPal</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-green-300">
                    <input type="radio" name="payment" className="text-green-600" />
                    <span className="text-sm font-medium">Apple Pay</span>
                  </label>
                  
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePurchase}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Pay £{type === 'content' ? item.price : item.hourlyRate}
                </button>
              </div>
            </>
          )}

          {/* Step 2: Processing */}
          {step === 2 && (
            <div className="text-center py-8">
              <div className="animate-spin w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-4"></div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment...</h4>
              <p className="text-gray-600">Please wait while we process your payment securely.</p>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h4>
              <p className="text-gray-600 mb-6">
                {type === 'content'
                  ? 'You now have lifetime access to this course.'
                  : 'Your session has been booked successfully.'
                }
              </p>
              <div className="space-y-3">
                <button
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transition-colors relative z-10"
                  onClick={() => {
                    // Handle start learning or view booking details
                    console.log('Redirecting to content/booking...');
                    handleClose();
                  }}
                >
                  {type === 'content' ? 'Start Learning Now' : 'View Booking Details'}
                </button>
                <button
                  onClick={handleClose}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors relative z-10"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Security Footer */}
        {step === 1 && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure payment powered by Stripe</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}