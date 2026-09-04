import { jsPDF } from 'jspdf';
import { TripPlan } from '../types';
import { CURRENCY_SYMBOLS } from './currencyService';

/**
 * Generates and downloads a clean, branded PDF dossier of the TripWise itinerary.
 */
export function generateTripPDF(plan: TripPlan): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const currencySymbol = CURRENCY_SYMBOLS[plan.query.currency] || '$';
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      drawHeaderWatermark();
    }
  };

  const drawHeaderWatermark = () => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text('TRIPWISE • EDITORIAL TRAVEL DOSSIER', margin, 10);
    doc.text(plan.destinationName.toUpperCase(), pageWidth - margin, 10, { align: 'right' });
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, 12, pageWidth - margin, 12);
  };

  // --- Cover / Document Header ---
  drawHeaderWatermark();
  y = 22;

  // Monogram circle
  doc.setFillColor(26, 26, 26);
  doc.circle(margin + 5, y + 4, 5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.text('T', margin + 3.8, y + 6.8);

  // Brand title
  doc.setTextColor(26, 26, 26);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('TRIPWISE', margin + 14, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('CURATED BESPOKE TRAVEL DOSSIER', margin + 46, y + 5.5);

  y += 16;

  // Destination Title
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(26, 26, 26);
  doc.text(plan.destinationName, margin, y);
  y += 7;

  // Subtitle / Narrative
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(90, 90, 90);
  const subtitleLines = doc.splitTextToSize(plan.subtitle || 'Personalized Bespoke Itinerary & Financial Plan', pageWidth - (margin * 2));
  doc.text(subtitleLines, margin, y);
  y += (subtitleLines.length * 5) + 4;

  // Meta Tags line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(26, 26, 26);
  const metaText = `DATES: ${plan.datesRange}   |   DURATION: ${plan.query.durationDays} DAYS   |   TRAVELERS: ${plan.query.travelers}   |   TIER: ${plan.query.travelStyle.toUpperCase()}`;
  doc.text(metaText, margin, y);
  y += 3;

  doc.setDrawColor(26, 26, 26);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);
  y += 7;

  // --- Financial Architecture Summary Box ---
  checkPageBreak(36);
  doc.setFillColor(250, 249, 247);
  doc.rect(margin, y, pageWidth - (margin * 2), 26, 'F');
  doc.setDrawColor(220, 220, 220);
  doc.rect(margin, y, pageWidth - (margin * 2), 26, 'S');

  const colWidth = (pageWidth - (margin * 2)) / 4;

  const drawStat = (label: string, value: string, sub: string, colIndex: number) => {
    const colX = margin + (colIndex * colWidth) + 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(130, 130, 130);
    doc.text(label.toUpperCase(), colX, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(26, 26, 26);
    doc.text(value, colX, y + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    doc.text(sub, colX, y + 21);
  };

  drawStat('Target Cap', `${currencySymbol}${plan.totalBudget.toLocaleString()}`, 'Allocated budget', 0);
  drawStat('Estimated Total', `${currencySymbol}${plan.estimatedTotal.toLocaleString()}`, 'Projected expense', 1);
  drawStat('Buffer Surplus', `+${currencySymbol}${plan.surplus.toLocaleString()}`, plan.isOverBudget ? 'Over Budget' : 'Safe reserve buffer', 2);
  drawStat('Daily Average', `${currencySymbol}${plan.dailyAverage.toLocaleString()}`, 'Per day spend', 3);

  y += 32;

  // --- Itemized Budget Table ---
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(26, 26, 26);
  doc.text('ITEMIZED BUDGET BREAKDOWN', margin, y);
  y += 4;

  doc.setDrawColor(26, 26, 26);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('CATEGORY', margin + 2, y);
  doc.text('DETAILS', margin + 40, y);
  doc.text('ESTIMATED COST', pageWidth - margin - 2, y, { align: 'right' });
  y += 3;

  doc.setDrawColor(230, 230, 230);
  doc.line(margin, y, pageWidth - margin, y);
  y += 4;

  plan.items.forEach((item) => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(26, 26, 26);
    doc.text(item.title, margin + 2, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    const detail = item.details.length > 55 ? `${item.details.substring(0, 52)}...` : item.details;
    doc.text(detail, margin + 40, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(26, 26, 26);
    doc.text(`${currencySymbol}${item.amount.toLocaleString()}`, pageWidth - margin - 2, y, { align: 'right' });
    y += 6;
  });

  y += 4;

  // --- Day-by-Day Timeline Schedule ---
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(26, 26, 26);
  doc.text('CURATED DAILY ITINERARY SCHEDULE', margin, y);
  y += 4;
  doc.line(margin, y, pageWidth - margin, y);
  y += 7;

  plan.dailyItineraries.forEach((day) => {
    checkPageBreak(40);
    // Day banner
    doc.setFillColor(245, 244, 240);
    doc.rect(margin, y, pageWidth - (margin * 2), 7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(26, 26, 26);
    doc.text(`DAY ${day.dayNumber}: ${day.title.toUpperCase()}`, margin + 3, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`Est. Spend: ${currencySymbol}${day.estCost.toLocaleString()}`, pageWidth - margin - 3, y + 5, { align: 'right' });
    y += 11;

    // Day activities
    day.activities.forEach((act) => {
      checkPageBreak(12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(26, 26, 26);
      doc.text(`[${(act.time || 'Schedule').toUpperCase()}] ${act.title}`, margin + 4, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 100, 100);
      const descLines = doc.splitTextToSize(act.description, pageWidth - (margin * 2) - 10);
      doc.text(descLines, margin + 4, y + 3.5);
      y += 4 + (descLines.length * 3.5);
    });

    // Suggested Meals
    checkPageBreak(10);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(80, 80, 80);
    doc.text(`Dining: Lunch at ${day.suggestedFood.lunch} | Dinner at ${day.suggestedFood.dinner}`, margin + 4, y);
    y += 8;
  });

  // --- Document Footer ---
  checkPageBreak(20);
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(140, 140, 140);
  const printDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  doc.text(`Generated by TripWise Intelligence Engine on ${printDate}`, margin, pageHeight - 11);
  doc.text('tripwise.ai', pageWidth - margin, pageHeight - 11, { align: 'right' });

  // Save the PDF directly to the user's downloads
  const sanitizedName = plan.destinationName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  doc.save(`TripWise_${sanitizedName}_itinerary.pdf`);
}
