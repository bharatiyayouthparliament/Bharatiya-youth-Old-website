import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { doc, getDoc } from 'firebase/firestore';
import Receipt from '@/components/Receipt';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { db } from '@/firebase';

const RegistrationSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const registrationId = location.state?.registrationId;

  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!registrationId) {
      navigate('/register', { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        const docRef = doc(db, 'registrations', registrationId);
        const snap = await getDoc(docRef);

        if (!snap.exists()) {
          navigate('/register', { replace: true });
          return;
        }

        setRegistrationData({ id: snap.id, ...snap.data() });
      } catch (err) {
        console.error("Error fetching registration:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [registrationId, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!registrationData) {
    return <div className="min-h-screen flex items-center justify-center">No registration found.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Registration Successful - BYP</title>
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-8 md:py-20 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-xl w-full">

            {/* HEADER */}
            <CardHeader className="bg-green-50 p-6 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <CardTitle className="text-2xl md:text-3xl font-bold text-green-800 mt-4">
                Registration Successful!
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 text-sm md:text-base">
                Thank you for registering for the Bharatiya Youth Parliament.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 md:p-8">

              {/* TOKEN NUMBER */}
              <div className="text-center mb-10">
                <h2 className="text-lg md:text-xl font-semibold">Your Token Number</h2>
                <div className="text-3xl md:text-4xl font-bold text-[#a0291f] mt-2">
                  {registrationData.tokenNumber}
                </div>
              </div>

              {/* USER DETAILS */}
              <div className="bg-white p-4 md:p-6 rounded-lg border shadow-sm mb-8 md:mb-10">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Your Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-gray-700 text-sm md:text-base">
                  <p><strong>Full Name:</strong> {registrationData.fullName}</p>
                  <p><strong>Email:</strong> {registrationData.email}</p>
                  <p><strong>Phone:</strong> {registrationData.phone}</p>

                  {/* FIXED: SHOW REG TYPE → modeOfPresence */}
                  <p><strong>Registration Type:</strong> {registrationData.modeOfPresence}</p>

                  <p><strong>Payment Status:</strong> {registrationData.paymentStatus}</p>

                  {/* FIXED: Firebase createdAt */}
                  {registrationData.createdAt && (
                    <p>
                      <strong>Registration Date:</strong>{' '}
                      {registrationData.createdAt.toDate().toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* RECEIPT COMPONENT */}
              <div className="mt-6 md:mt-10">
                <Receipt registrationData={registrationData} />
              </div>


              <div className="text-center mt-10">
                <Button variant="outline" onClick={() => navigate('/')}>
                  Back to Home
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegistrationSuccessPage;
