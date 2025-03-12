import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style.css";
import "./profiles.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/test.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setDoctorDetails(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching doctor details:', error);
        setLoading(false);
      });
  }, []);
  

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!doctorDetails) return <p className="text-center mt-5 text-danger">Failed to load doctor details.</p>;

  return (

    
    <div className="d-flex flex-column flex-md-row vh-100">
      <div className="w-50 bg-DoctorProfile"></div>

      <div className="w-100 w-md-50 d-flex flex-column justify-content-center align-items-center bg-white p-4">
        <h1 className="text-primary fw-bold text-center">Doctor's Profile</h1>

        <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center mt-3"
          style={{ width: "100px", height: "100px" }}>
          <span className="fs-1 text-white"><FontAwesomeIcon icon={faUserDoctor} /></span>
        </div>

        <div className="mt-4 row g-3 w-75">
          <div className="col-12 col-sm-6">
            <label htmlFor="fullname" className="form-label">Full Name</label>
            <input id="fullname" type="text" className="form-control border-primary" value={doctorDetails.fullname} readOnly 
            />
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="specialization" className="form-label">Specialization</label>
            <input id="specialization" type="text" className="form-control border-primary" value={doctorDetails.specialization} readOnly/>
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="location" className="form-label">Location</label>
            <input id="location" type="text" className="form-control border-primary" value={doctorDetails.location} readOnly/>
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="appointments" className="form-label">Available Appointments</label>
            <input id="appointments" type="text" className="form-control border-primary" value={doctorDetails.appointments?.length ? doctorDetails.appointments.join(', ') : 'No Appointments'} readOnly
            />
          </div>
        </div>

        <div className="mt-4 d-flex flex-column flex-md-row gap-3">
          <button className="btn btn-primary w-100 w-md-auto"onClick={() => window.open(doctorDetails.Open_Whatsapp, "blank")}>Book an appointment</button>
          <button className="btn btn-outline-primary w-100 w-md-auto"  onClick={() => navigate('/')}
          >Go to home page</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;