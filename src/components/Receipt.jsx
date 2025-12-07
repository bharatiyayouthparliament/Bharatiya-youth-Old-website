// Receipt.jsx
import React, { useRef } from 'react';
import { QRCodeSVG } from "qrcode.react";
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Receipt = ({ registrationData }) => {
  const receiptRef = useRef();

  if (!registrationData) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">No registration data found to generate a receipt.</p>
      </div>
    );
  }

  const amountPaid = registrationData.amountPaid || 0;

  const {
    receiptNumber = `RCP-${new Date().getFullYear()}-${String(
      new Date().getMonth() + 1
    ).padStart(2, '0')}-${String(Date.now()).slice(-5)}`,

    paymentDate = new Date().toISOString(),
    fullName,
    email,
    phone,
    aadhar,
    dob,
    college,
    otherCollege,
    course,
    modeOfPresence,
    registrationType,
    tokenNumber,
    razorpayPaymentId,
    paymentStatus = registrationData.paymentStatus || 'PAID',
  } = registrationData;

  const handleDownloadPdf = () => {
    const input = receiptRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const ratio = canvas.width / canvas.height;
      const height = pdfWidth / ratio;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, height);
      pdf.save(`receipt_${receiptNumber}.pdf`);
    });
  };

  const handlePrint = () => window.print();

  const collegeName = college === 'Other' ? otherCollege : college;

  const qrValue = `https://bharatiya-youth-parliament.web.app/verify?token=${tokenNumber}&payment=${razorpayPaymentId}`;

  return (
    <div className="max-w-4xl mx-auto bg-white p-3 sm:p-6 md:p-8">
      <div
        ref={receiptRef}
        className="p-4 sm:p-6 md:p-8 border-2 border-dashed border-gray-300 print:border-none print:p-0"
      >

        {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pb-6 border-b-2 border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#a0291f] font-poppins">
            Bharatiya Youth Parliament
          </h1>

          {/* NEW: Venue, Date, Time */}
          <div className="text-gray-600 text-sm mt-1 leading-5">
            <p><strong>Venue:</strong> Talkatora Stadium, New Delhi, India</p>
            <p><strong>Date:</strong> 12 January 2026</p>
            <p><strong>Time:</strong> 11:00 AM – 06:30 PM</p>
          </div>

          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Event Registration Receipt
          </p>
        </div>

        <div className="text-left sm:text-right">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">RECEIPT</h2>
          <p className="text-sm text-gray-600">
            <strong>Receipt #:</strong> {receiptNumber}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Date:</strong> {new Date(paymentDate).toLocaleDateString()}
          </p>
        </div>
      </header>

        {/* BILLING INFO */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Billed To:</h3>
            <p className="font-bold text-gray-800">{fullName}</p>
            <p className="text-gray-600">{email}</p>
            <p className="text-gray-600">{phone}</p>
            <p className="text-gray-700 mt-2"><strong>Aadhar:</strong> {aadhar}</p>
            <p className="text-gray-700"><strong>Date of Birth:</strong> {dob}</p>
          </div>

          <div className="text-left sm:text-right">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Details:</h3>
            <p className="text-gray-700"><strong>Transaction ID:</strong> {razorpayPaymentId}</p>
            <p className="text-gray-700"><strong>Payment Method:</strong> Online</p>
            <p className="font-bold text-green-600"><strong>Status:</strong> {paymentStatus}</p>
          </div>
        </section>


        {/* REGISTRATION DETAILS */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Registration Details</h3>

          <div className="text-gray-700 space-y-1">
            <p><strong>Registration Type:</strong> {registrationType}</p>
            <p><strong>Token Number:</strong> {tokenNumber}</p>
            <p><strong>Mode of Presence:</strong> {modeOfPresence}</p>
          </div>
        </section>


        {/* SUMMARY TABLE */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Registration Summary</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 font-semibold text-gray-600">Description</th>
                  <th className="p-3 font-semibold text-gray-600 text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="p-3">
                    <p className="font-semibold text-gray-800">Bharatiya Youth Parliament 2026 Registration</p>
                    <div className="text-sm text-gray-500 mt-1">
                      <p><strong>College:</strong> {collegeName}</p>
                      <p><strong>Course:</strong> {course}</p>
                    </div>
                  </td>
                  <td className="p-3 text-right font-medium text-gray-800">₹{amountPaid}</td>
                </tr>
              </tbody>

              <tfoot>
                <tr className="font-bold">
                  <td className="p-3 text-right text-lg">Total</td>
                  <td className="p-3 text-right text-lg text-[#a0291f]">₹{amountPaid}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>


        {/* FOOTER */}
        <footer className="mt-10 pt-4 border-t text-center text-sm text-gray-500">
          <p>Thank you for your registration!</p>
          <p>If you have questions, mail: <strong>info@bhartiyayouthparliament.com</strong></p>
        </footer>


        {/* QR CODE MOVED TO BOTTOM */}
        <div className="flex justify-center mt-6">
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <QRCodeSVG value={qrValue} size={120} level="H" includeMargin={true} />
            <p className="text-center text-xs mt-2 text-gray-600">
              Scan to verify your registration
            </p>
          </div>
        </div>

      </div>


      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-center mt-8 gap-3 print:hidden">
        <Button
          onClick={handleDownloadPdf}
          className="bg-[#a0291f] hover:bg-[#8a241b] w-full sm:w-auto"
        >
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>

        <Button
          variant="outline"
          onClick={handlePrint}
          className="w-full sm:w-auto"
        >
          <Printer className="mr-2 h-4 w-4" /> Print Receipt
        </Button>
      </div>
    </div>
  );
};

export default Receipt;
