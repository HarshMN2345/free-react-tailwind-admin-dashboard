import Breadcrumb from '../components/Breadcrumb';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Calendar = () => {
  const [vendors, setVendors] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [content, setContent] = useState('');
  const [logo, setLogo] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/vendor/allVendors')
      .then(response => setVendors(response.data))
      .catch(error => console.error('Error fetching vendors:', error));
  }, []);

  const handleAddVendor = () => {
    const formData = new FormData();
    formData.append('vendorName', vendorName);
    formData.append('content', content);
    formData.append('logo', logo);
    formData.append('image1', image1);
    formData.append('image2', image2);
    formData.append('image3', image3);

    axios.post('http://localhost:8080/api/vendor/addVendor', formData)
      .then(response => {
        console.log('Vendor added successfully:', response.data);
      })
      .catch(error => console.error('Error adding vendor:', error));
  };

  return (
    <>
      <Breadcrumb pageName="Vendor" />

     <div className='h-screen bg-gray-100'>
      {/* Existing Vendors Section */}
      <div className="justify-center items-center p-[2%] flex flex-col">
        {/* Existing Vendors Title */}
        <h1 className="font-handwriting text-3xl">Existing Vendors</h1>
        <div className="w-[10%] bg-red-500 h-[3px]"></div>

        {/* Existing Vendors Display */}
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 ">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <Link to={`/vendor/spotlight?name=${vendor.vendorName}`}>
                <div>
                  <img src={`http://localhost:8080/${vendor.logoURL}`} alt={`${vendor.vendorName} Logo`} className="h-32 w-32 object-cover rounded-full mx-auto mt-5" />
                  <div className="px-4 py-3">
                    <p className="text-lg font-bold text-black text-center">{vendor.vendorName}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>
      </div>

      {/* Add Vendor Section */}
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className="font-handwriting text-3xl">Add Vendors</h1>
        <div className="w-[10%] bg-red-500 h-[3px]"></div>

        {/* Add Vendor Form */}
        <div className="mt-5 bg-white rounded-lg shadow w-[40%]">
          {/* Form Header */}
          <div className="flex">
            <div className="flex-1 py-5 pl-5 overflow-hidden">
              <h1 className="inline text-2xl font-semibold leading-none">
                Add Vendor
              </h1>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="px-5 pb-5">
            <input
              placeholder="Vendor Name"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 border-blueGray-500 text-base transition duration-500 ease-in-out transform  rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
            <input
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 border-blueGray-500 text-base transition duration-500 ease-in-out transform  rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
            {/* Logo Input */}
            <input
              type="file"
              onChange={(e) => setLogo(e.target.files[0])}
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 border-blueGray-500 mt-2 text-base transition duration-500 ease-in-out transform  rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
            {/* Image1 Input */}
            <input
              type="file"
              onChange={(e) => setImage1(e.target.files[0])}
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
            {/* Image2 Input */}
            <input
              type="file"
              onChange={(e) => setImage2(e.target.files[0])}
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
            {/* Image3 Input */}
            <input
              type="file"
              onChange={(e) => setImage3(e.target.files[0])}
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
          </div>

          {/* Form Submission */}
          <hr className="mt-4" />
          <div className="flex flex-row-reverse p-3">
            <div className="flex-initial pl-3">
              <button
                type="button"
                onClick={handleAddVendor}
                className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize bg-white border-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-900 transition duration-300 transform active:scale-95 ease-in-out"
              >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 2v9h9v2h-9v9h-2v-9h-9v-2h9v-9h2zm2-2h-6v9h-9v6h9v9h6v-9h9v-6h-9v-9z"/></svg>
                <span className="pl-2 mx-1">Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Calendar;
