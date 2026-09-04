import React, { useState } from 'react';
import { TripPlan } from '../types';
import { CURRENCY_SYMBOLS } from '../services/currencyService';
import { generateTripPDF } from '../services/pdfService';

interface PrintTripModalProps {
  isOpen: boolean;
  plan: TripPlan;
  onClose: () => void;
}

export const PrintTripModal: React.FC<PrintTripModalProps> = ({ isOpen, plan, onClose }) => {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

  if (!isOpen || !plan) return null;

  const symbol = CURRENCY_SYMBOLS[plan?.query?.currency || 'USD'] || '$';

  const handleDownloadPDF = () => {
    setIsExportingPdf(true);
    try {
      generateTripPDF(plan);
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-[#1A1A1A] w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Action Header (hidden in print) */}
        <div className="p-4 border-b border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between bg-[#FAF9F7] gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#1A1A1A]">print</span>
            <div>
              <span className="text-xs font-bold text-[#1A1A1A] block">Print & PDF Export Preview</span>
              <span className="text-[10px] text-[#666]">
                Direct PDF download or use browser print dialogue
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Direct PDF Download Button */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isExportingPdf}
              className="px-3.5 py-2 bg-[#1A1A1A] hover:bg-black disabled:bg-[#888] text-white text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow"
            >
              <span className="material-symbols-outlined text-[16px]">
                {pdfSuccess ? 'check_circle' : 'download'}
              </span>
              <span>
                {isExportingPdf
                  ? 'Generating PDF...'
                  : pdfSuccess
                  ? 'Downloaded PDF ✓'
                  : 'Download PDF'}
              </span>
            </button>

            {/* Browser Print Button */}
            <button
              type="button"
              onClick={handleTriggerPrint}
              className="px-3 py-2 border border-[#1A1A1A] bg-white hover:bg-[#FAF9F7] text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Browser Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 border border-[#E5E5E5] hover:bg-white text-xs text-[#666] hover:text-black cursor-pointer"
              aria-label="Close preview"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Document Container */}
        <div id="printable-itinerary-document" className="p-6 sm:p-10 overflow-y-auto flex-1 text-[#1A1A1A] bg-white">
          {/* Header & Branding */}
          <div className="border-b-2 border-[#1A1A1A] pb-6 mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-xs italic">T</span>
                </div>
                <span className="font-serif font-bold tracking-tight text-lg text-[#1A1A1A]">
                  TRIPWISE
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] border-l border-[#CCC] pl-2 font-medium">
                  Curated Editorial Travel
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1A1A]">
                {plan.destinationName}
              </h1>
              <p className="text-xs font-serif italic text-[#666] mt-1">
                {plan.subtitle}
              </p>
            </div>

            <div className="text-left sm:text-right bg-[#FAF9F7] p-3 border border-[#E5E5E5] min-w-[200px]">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#999] font-bold block">
                Itinerary Dossier
              </span>
              <span className="text-xs font-bold text-[#1A1A1A] block mt-0.5">
                Dates: {plan.datesRange}
              </span>
              <span className="text-xs text-[#666] block">
                Travelers: {plan.query.travelers} ({plan.query.travelStyle.toUpperCase()} TIER)
              </span>
              <span className="text-xs text-[#666] block">
                Duration: {plan.query.durationDays} Days
              </span>
            </div>
          </div>

          {/* Financial Summary & Key Allocations */}
          <div className="mb-6 p-4 border border-[#1A1A1A] bg-[#FAF9F7]">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#666] font-bold block mb-2">
              Financial Architecture & Cost Summary
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-2 border border-[#E5E5E5] bg-white">
                <span className="text-[9px] uppercase tracking-wider text-[#999] block">Total Budget</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A]">
                  {symbol}{plan.totalBudget.toLocaleString()}
                </span>
              </div>
              <div className="p-2 border border-[#E5E5E5] bg-white">
                <span className="text-[9px] uppercase tracking-wider text-[#999] block">Total Estimated Cost</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A]">
                  {symbol}{plan.estimatedTotal.toLocaleString()}
                </span>
              </div>
              <div className="p-2 border border-[#E5E5E5] bg-white">
                <span className="text-[9px] uppercase tracking-wider text-[#999] block">Remaining Budget Buffer</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A]">
                  {symbol}{plan.surplus.toLocaleString()}
                </span>
              </div>
              <div className="p-2 border border-[#E5E5E5] bg-white">
                <span className="text-[9px] uppercase tracking-wider text-[#999] block">Per Person / Day</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A]">
                  {symbol}{plan.dailyAverage.toLocaleString()} / day
                </span>
              </div>
            </div>
          </div>

          {/* Budget Breakdown Table */}
          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 mb-3">
              Itemized Budget Allocations
            </h2>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E5E5] text-[10px] uppercase tracking-wider text-[#666]">
                  <th className="py-1.5 font-bold">Category</th>
                  <th className="py-1.5 font-bold">Specification</th>
                  <th className="py-1.5 font-bold text-right">Share %</th>
                  <th className="py-1.5 font-bold text-right">Estimated Amount</th>
                </tr>
              </thead>
              <tbody>
                {plan.items.map((item) => (
                  <tr key={item.id} className="border-b border-[#F0EDE8]">
                    <td className="py-2 font-bold uppercase text-[10px] tracking-wider text-[#1A1A1A]">
                      {item.category}
                    </td>
                    <td className="py-2">
                      <span className="font-medium text-[#1A1A1A] block">{item.title}</span>
                      <span className="text-[10px] text-[#666]">{item.details}</span>
                    </td>
                    <td className="py-2 text-right text-[#666]">{item.sharePercent}%</td>
                    <td className="py-2 text-right font-serif font-bold text-[#1A1A1A]">
                      {symbol}{item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Accommodation & Transportation Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Accommodation */}
            <div className="border border-[#E5E5E5] p-4 bg-[#FAF9F7]">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#999] block mb-1">
                Accommodation Specification
              </span>
              {plan.accommodations[0] && (
                <div>
                  <h3 className="font-serif text-base font-bold text-[#1A1A1A]">
                    {plan.accommodations[0].name}
                  </h3>
                  <p className="text-xs text-[#666] mt-0.5">
                    Location: {plan.accommodations[0].location}
                  </p>
                  <p className="text-xs text-[#1A1A1A] font-semibold mt-1">
                    Rate: {symbol}{plan.accommodations[0].pricePerNight} / night • Rating: ★ {plan.accommodations[0].rating}
                  </p>
                </div>
              )}
            </div>

            {/* Transport */}
            <div className="border border-[#E5E5E5] p-4 bg-[#FAF9F7]">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#999] block mb-1">
                Ground Transit & Mobility
              </span>
              {plan.recommendations.localTransportation[0] ? (
                <div>
                  <h3 className="font-serif text-base font-bold text-[#1A1A1A]">
                    {plan.recommendations.localTransportation[0].mode}
                  </h3>
                  <p className="text-xs text-[#666] mt-0.5">
                    {plan.recommendations.localTransportation[0].description}
                  </p>
                  <p className="text-xs text-[#1A1A1A] font-semibold mt-1">
                    Est. Cost: {plan.recommendations.localTransportation[0].estCost}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-[#666]">Standard local transit pass and walking routes.</p>
              )}
            </div>
          </div>

          {/* Day-by-Day Schedule */}
          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 mb-4">
              Day-by-Day Daily Schedule
            </h2>

            <div className="flex flex-col gap-4">
              {plan.dailyItineraries.map((day) => (
                <div key={day.dayNumber} className="border border-[#E5E5E5] p-4 bg-white">
                  <div className="flex justify-between items-center border-b border-[#F0EDE8] pb-2 mb-2">
                    <span className="font-serif text-base font-bold text-[#1A1A1A]">
                      Day {day.dayNumber}: {day.title}
                    </span>
                    <span className="text-xs font-serif font-bold text-[#1A1A1A]">
                      Est: {symbol}{day.estCost.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#999] block">
                        Morning ({day.morningActivity.time})
                      </span>
                      <span className="font-semibold text-[#1A1A1A] block">{day.morningActivity.title}</span>
                      <p className="text-[11px] text-[#666] mt-0.5">{day.morningActivity.description}</p>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#999] block">
                        Afternoon ({day.afternoonActivity.time})
                      </span>
                      <span className="font-semibold text-[#1A1A1A] block">{day.afternoonActivity.title}</span>
                      <p className="text-[11px] text-[#666] mt-0.5">{day.afternoonActivity.description}</p>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#999] block">
                        Evening ({day.eveningActivity.time})
                      </span>
                      <span className="font-semibold text-[#1A1A1A] block">{day.eveningActivity.title}</span>
                      <p className="text-[11px] text-[#666] mt-0.5">{day.eveningActivity.description}</p>
                    </div>
                  </div>

                  {/* Meals & Transit strip */}
                  <div className="mt-3 pt-2 border-t border-[#F0EDE8] flex flex-wrap items-center justify-between text-[11px] text-[#666]">
                    <span>Dining notes: {day.suggestedFood.lunch} / {day.suggestedFood.dinner}</span>
                    <span>Transit: {day.localTransit.mode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Authentic Food Guide */}
          <div className="mb-6 border border-[#E5E5E5] p-4 bg-[#FAF9F7]">
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#999] block mb-2">
              Curated Gastronomy & Regional Dishes
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {plan.recommendations.localFood.slice(0, 3).map((f, i) => (
                <div key={i} className="p-2.5 bg-white border border-[#E5E5E5]">
                  <span className="font-serif font-bold text-sm text-[#1A1A1A] block">{f.dish}</span>
                  <p className="text-[11px] text-[#666] mt-0.5">{f.description}</p>
                  <span className="text-[10px] font-semibold text-[#1A1A1A] block mt-1">Est. {f.estCostRange}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-[#E5E5E5] flex justify-between items-center text-[10px] text-[#999] uppercase tracking-widest">
            <span>Generated with TripWise • Editorial Travel Intelligence</span>
            <span>Document ID: {plan.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
