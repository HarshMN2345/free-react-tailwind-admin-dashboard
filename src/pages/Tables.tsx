import Breadcrumb from '../components/Breadcrumb';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tables = () => {
  const [membershipData, setMembershipData] = useState([]);
  const handleSwitchToggle = async (memberToUpdate) => {
    try {
      const updatedData = membershipData.map(member => {
        if (member._id === memberToUpdate._id) {
          return { ...member, approved: !member.approved };
        }
        return member;
      });
      setMembershipData(updatedData);
      const apiUrl = `http://localhost:8080/api/membership/update-approval?id=${memberToUpdate._id}`;
      await axios.patch(apiUrl, {
        approved: !memberToUpdate.approved,
      });
  
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };
  

  useEffect(() => {
    axios.get('http://localhost:8080/api/membership/all')
      .then(response => {
        setMembershipData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Breadcrumb pageName="Membership Details" />
      <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Membership Details</h1>
      <div className="grid grid-cols-3 gap-4">
  {membershipData.map(member => (
    <div key={member._id} className="border rounded-lg p-4 shadow-md">
       <h2 className="text-xl font-semibold mb-2">{member.businessName}</h2>
          <p className="text-gray-600">Email:{member.email}</p>
          <p className="text-gray-600">Phone no:{member.phoneNumber}</p>
          <p className="text-gray-600">Address: {member.streetAddress1}, {member.city}, {member.state}</p>
          <p className="text-gray-600">Zip Code: {member.zipCode}</p>
          <p className="text-gray-600">Country: {member.country}</p>
          <p className="text-gray-600">Business Type: {member.businessType.join(', ')}</p>
          <p className="text-gray-600">Primary Buyer 1: {member.primaryBuyer1}</p>
          <p className="text-gray-600">Primary Buyer 2: {member.primaryBuyer2}</p>
          <p className="text-gray-600">Email Updates: {member.emailUpdates ? 'Yes' : 'No'}</p>
          <p className="text-gray-600">Text Updates: {member.textUpdates ? 'Yes' : 'No'}</p>
          <p className="">
            Business ID 1: {' '}
            <a
              href={`http://localhost:8080/MembershipFiles/${member.businessName}/${member.businessID1}`}
              download
              className='text-blue-500 hover:underline'
            >
              Download File
            </a>
          </p>
          <p className="">
            Business ID 2: {' '}
            <a
              href={`http://localhost:8080/MembershipFiles/${member.businessName}/${member.businessID2}`}
              download
              className='text-blue-700 hover:underline'
            >
              Download File
            </a>
          </p>
          <p className="">
            Tax Certificate: {' '}
            <a
              href={`http://localhost:8080/MembershipFiles/${member.businessName}/${member.taxCertificate}`}
              download
              className='text-blue-700 hover:underline'
            >
              Download File
            </a>
          </p>
          <p className="text-gray-600">Sales Tax Reseller: {member.salesTaxReseller}</p>
          <div>
      <span>{member.approved ? 'Approved' : 'Not Approved'}</span>
      <label className="switch">
      <input type="checkbox" checked={member.approved} onChange={() => handleSwitchToggle(member)} />
        <span className="slider round"></span>
      </label>
    </div>
    </div>
  ))}
</div>
    </div>
      
    </>
  );
};

export default Tables;
