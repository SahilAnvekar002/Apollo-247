"use client"
import mongoose from "mongoose";
import { useEffect, useState } from "react";

// Doctor Interface
interface Doctor {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  role: string;
  experience: number;
  qualification: string;
  city: string;
  state: string;
  hospital: string;
  mode: string;
  fees: number;
  language: string[];
  profileImage: string;
  createdAt: mongoose.Schema.Types.Date;
  updatedAt: mongoose.Schema.Types.Date;
};

// Filters Interface
interface Filters {
  experience?: string;
  fees?: string;
  mode?: string;
  language?: string;
  facility?: string;
}

export default function Home() {
  const [more, setMore] = useState(false); // used for more/less toggle button
  const [doctors, setDoctors] = useState<Doctor[]>([]); // used to store doctor information
  const [filters, setFilters] = useState<Filters>({}); // used to store applied filters

  // load page when filter changes
  useEffect(() => {
    filterDoctors(filters);
  }, [filters]);

  // add/remove filter as and when user checks/unchecks checkbox
  const handleFilterChange = (
    key: keyof Filters,
    value: string,
    checked: boolean
  ) => {
    setFilters(prev => {
      if (checked) {
        return { ...prev, [key]: value };
      } else {
        const updated = { ...prev };
        delete updated[key]; 
        return updated;
      }
    });
  };

  // function to fetch doctor data with api
  const filterDoctors = async (filters: Filters) => {
    const queryParams = new URLSearchParams(filters as Record<string, string>).toString();
    const data = await fetch(`http://localhost:3000/api/list-doctor-with-filter?${queryParams}`);
    const json = await data.json();
    if (json.success) {
      setDoctors(json.payload);
    }
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 flex justify-between items-center h-16 w-full px-28 border-b border-b-gray-300 z-10 bg-white">
        <div>
          <img src="/apollo247.svg" alt="Logo" className="h-16 w-16" />
        </div>
        <div>
          <input type="text" placeholder="Search Doctors, Specialists, Conditions" className="border border-[#bebebb] bg-[#f6f6f6] py-2 px-8 w-[600px] rounded-lg outline-none placeholder:text-sm placeholder:font-medium placeholder:text-gray-400" />
        </div>
        <div>
          <button className="text-[#165d59] border border-[#165d59] px-5 py-1 rounded-lg cursor-pointer font-semibold">Login</button>
        </div>
      </nav>

      {/* Categories */}
      <header className="fixed top-16 flex w-full items-center justify-center py-2 shadow-md z-10 bg-white">
        <ul className="flex">
          <li className="font-semibold border-b-2 border-b-white hover:border-b-2 hover:border-b-[#02475b] hover:text-[#02475b] mx-4"><a href="#">Buy Medicines</a></li>
          <li className="font-semibold border-b-2 border-b-white hover:border-b-2 hover:border-b-[#02475b] hover:text-[#02475b] mx-4"><a href="#">Find Doctors</a></li>
          <li className="font-semibold border-b-2 border-b-white hover:border-b-2 hover:border-b-[#02475b] hover:text-[#02475b] mx-4"><a href="#">Lab Tests</a></li>
          <li className="font-semibold border-b-2 border-b-white hover:border-b-2 hover:border-b-[#02475b] hover:text-[#02475b] mx-4"><a href="#">Circle Membership</a></li>
          <li className="font-semibold border-b-2 border-b-white hover:border-b-2 hover:border-b-[#02475b] hover:text-[#02475b] mx-4"><a href="#">Heath Records</a></li>
          <li className="font-semibold border-b-2 border-b-white hover:border-b-2 hover:border-b-[#02475b] hover:text-[#02475b] mx-4"><a href="#">Diabetes Reversal</a></li>
          <li className="font-semibold border-b-2 border-b-white hover:border-b-2 hover:border-b-[#02475b] hover:text-[#02475b] mx-4"><a href="#">Buy Insurance</a></li>
        </ul>
      </header>

      {/* HomePage */}
      <section className="flex">

        {/* Sidebar */}
        <aside className="fixed top-28 h-[600px] flex flex-col justify-start w-[25%] overflow-y-scroll pl-32 pr-4">

          {/* Filters */}
          <div className="flex justify-between pb-4 border-b border-b-gray-300 mt-4">
            <h2 className="font-semibold text-md">Filters</h2>
            <a href="#" className="text-[#02475b] font-bold text-sm">Clear All</a>
          </div>

          <button className="text-[#165d59] text-sm border border-[#165d59] px-5 py-1 rounded-md cursor-pointer font-semibold mt-4">Show Doctors Near Me</button>

          {/* Filter - Mode of Conduct */}
          <div className="pb-4 border-b border-b-gray-300 mt-4">
            <h2 className="font-semibold text-md">Mode of Consult</h2>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="visit" id="visit" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("mode", "visit", e.target.checked)} checked={filters.mode === 'visit'}/>
              <label htmlFor="visit" className="text-gray-600">Hospital Visit</label>
            </div>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="online" id="online" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("mode", "online", e.target.checked)} checked={filters.mode === 'online'}/>
              <label htmlFor="online" className="text-gray-600">Online Consult</label>
            </div>
          </div>

          {/* Filter - Experience */}
          <div className="pb-4 border-b border-b-gray-300 mt-4">
            <h2 className="font-semibold text-md">Experience (In Years)</h2>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="05" id="05" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("experience", "0-5", e.target.checked)} checked={filters.experience === '0-5'} />
              <label htmlFor="05" className="text-gray-600">0-5</label>
            </div>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="610" id="610" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("experience", "6-10", e.target.checked)} checked={filters.experience === '6-10'}/>
              <label htmlFor="610" className="text-gray-600">6-10</label>
            </div>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="1116" id="1116" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("experience", "11-16", e.target.checked)} checked={filters.experience === '11-16'}/>
              <label htmlFor="1116" className="text-gray-600">11-16</label>
            </div>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="16" id="16" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("experience", "16+", e.target.checked)} checked={filters.experience === '16+'}/>
              <label htmlFor="16" className="text-gray-600">16+</label>
            </div>
          </div>

          {/* Filter - Fees */}
          <div className="pb-4 border-b border-b-gray-300 mt-4">
            <h2 className="font-semibold text-md">Fees (In Rupees)</h2>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="100500" id="100500" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("fees", "100-500", e.target.checked)} checked={filters.fees === '100-500'}/>
              <label htmlFor="100500" className="text-gray-600">100-500</label>
            </div>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="5001000" id="5001000" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("fees", "500-1000", e.target.checked)} checked={filters.fees === '500-1000'}/>
              <label htmlFor="5001000" className="text-gray-600">500-1000</label>
            </div>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="1000" id="1000" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("fees", "1000+", e.target.checked)} checked={filters.fees === '1000+'}/>
              <label htmlFor="1000" className="text-gray-600">1000+</label>
            </div>
          </div>

          {/* Filter - Language */}
          <div className="pb-4 border-b border-b-gray-300 mt-4">
            <h2 className="font-semibold text-md">Language</h2>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="english" id="english" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("language", "English", e.target.checked)} checked={filters.language === 'English'}/>
              <label htmlFor="english" className="text-gray-600">English</label>
            </div>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="hindi" id="hindi" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("language", "Hindi", e.target.checked)} checked={filters.language === 'Hindi'}/>
              <label htmlFor="hindi" className="text-gray-600">Hindi</label>
            </div>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="telugu" id="telugu" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("language", "Telugu", e.target.checked)} checked={filters.language === 'Telugu'}/>
              <label htmlFor="telugu" className="text-gray-600">Telugu</label>
            </div>
            {more &&
              <div>
                <div className="ml-2 mt-3">
                  <input type="checkbox" name="punjabi" id="punjabi" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("language", "Punjabi", e.target.checked)} checked={filters.language === 'Punjabi'}/>
                  <label htmlFor="punjabi" className="text-gray-600">Punjabi</label>
                </div>
                <div className="ml-2 mt-3">
                  <input type="checkbox" name="bengali" id="bengali" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("language", "Bengali", e.target.checked)} checked={filters.language === 'Bengali'}/>
                  <label htmlFor="bengali" className="text-gray-600">Bengali</label>
                </div>
                <div className="ml-2 mt-3">
                  <input type="checkbox" name="marathi" id="marathi" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("language", "Marathi", e.target.checked)} checked={filters.language === 'Marathi'}/>
                  <label htmlFor="marathi" className="text-gray-600">Marathi</label>
                </div>
                <div className="ml-2 mt-3">
                  <input type="checkbox" name="gujarati" id="gujarati" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("language", "Gujarati", e.target.checked)} checked={filters.language === 'Gujarati'}/>
                  <label htmlFor="gujarati" className="text-gray-600">Gujarati</label>
                </div>
                <div className="ml-2 mt-3">
                  <input type="checkbox" name="tamil" id="tamil" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("language", "Tamil", e.target.checked)} checked={filters.language === 'Tamil'}/>
                  <label htmlFor="tamil" className="text-gray-600">Tamil</label>
                </div>
                <div className="ml-2 mt-3">
                  <input type="checkbox" name="kannada" id="kannada" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("language", "Kannada", e.target.checked)} checked={filters.language === 'Kannada'}/>
                  <label htmlFor="kannada" className="text-gray-600">Kannada</label>
                </div>
              </div>
            }
            <button className="text-[#02475b] font-bold mt-4 cursor-pointer" onClick={() => setMore(!more)}>{more ? 'See Less' : 'See More'}</button>
          </div>

          {/* Filter - Facility */}
          <div className="pb-4 border-b border-b-gray-300 mt-4">
            <h2 className="font-semibold text-md">Facility</h2>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="apollo" id="apollo" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("facility", "Apollo Hospital", e.target.checked)} checked={filters.facility === 'Apollo Hospital'}/>
              <label htmlFor="apollo" className="text-gray-600">Apollo Hospital</label>
            </div>
            <div className="ml-2 mt-3">
              <input type="checkbox" name="other" id="other" className="h-3 w-3 text-white accent-[#02475b] mr-2 text-sm" onChange={(e) => handleFilterChange("facility", "Others", e.target.checked)} checked={filters.facility === 'Others'}/>
              <label htmlFor="other" className="text-gray-600">Other Clinics</label>
            </div>
          </div>

        </aside>

        {/* Doctors List */}
        <div className="ml-[25%] mt-28 px-10 pt-4 w-[60%]">
          <span><a href="#" className="text-sm text-[#02475b]">Home/</a> <a href="#" className="text-sm text-[#02475b]">Doctors/</a> <a href="#" className="text-sm text-[#02475b]">General Physicians</a></span>
          <h1 className="mt-4 font-bold text-2xl">Consult General Physicians Online - Internal Medicine Specialists</h1>

          <div className="flex flex-col mt-6">
            {doctors.length > 0 && doctors.map((doctor) => {
              {/* Doctor Card */}
              return (
                <div className="flex border border-gray-300 rounded-md mb-5 cursor-pointer" key={String(doctor._id)}>
                  <div className="flex px-4 py-4 w-full">
                    <div className="w-[10%]">
                      <img src={doctor.profileImage} alt="Doctor" className="w-16 h-16" />
                    </div>

                    <div className="w-[45%] px-4">
                      <h2 className="font-bold mb-1">{doctor.name}</h2>
                      <span className="text-gray-600 mb-2">{doctor.role}</span><br />
                      <span className="text-[#6b45c6] mb-2 font-bold text-xs tracking-widest uppercase">{doctor.experience} Years {doctor.qualification}</span><br />
                      <span className="text-gray-600 mb-2 text-xs">{doctor.hospital} - {doctor.city} {doctor.state}</span>
                    </div>

                    <div className="flex flex-col justify-center items-center w-[45%]">
                      <h2 className="font-bold text-lg mb-2">₹{doctor.fees}</h2>
                      <button className="text-[#165d59] border border-[#165d59] py-4 rounded-lg cursor-pointer font-semibold text-xs px-28">Consult Online</button>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </section>
    </>
  );
}
