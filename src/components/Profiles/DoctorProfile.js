import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style.css";
import "./profiles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { BsArrowUpRightCircle } from "react-icons/bs";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorDetails = location.state?.doctor;

  useEffect(() => {
    document.body.classList.add('doctor-profile-body');

    return () => {
      document.body.classList.remove('doctor-profile-body');
    };
  }, []);

  if (!doctorDetails) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <p className="text-danger fs-4">No doctor details available.</p>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

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
            <input id="fullname" type="text" className="form-control border-primary" value={doctorDetails.name} readOnly />
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="specialization" className="form-label">Specialization</label>
            <input id="specialization" type="text" className="form-control border-primary" value={doctorDetails.specialty} readOnly />
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="location" className="form-label">Location</label>
            <div className="input-group">
              <input id="location" type="text" className="form-control border-primary" value={doctorDetails.clinicAddress} readOnly />
              {doctorDetails.googleMapsLink && (
                <span className="input-group-text bg-white border-primary" style={{ cursor: 'pointer' }} onClick={() => window.open(doctorDetails.googleMapsLink, "_blank")}>
                  <BsArrowUpRightCircle size={20} className="text-primary" />
                </span>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="appointments" className="form-label">Available Appointments</label>
            <input id="appointments" type="text" className="form-control border-primary" value={doctorDetails.availableAppointments || 'No Appointments'} readOnly />
          </div>
          <div className="col-12 col-sm-6 ">
            <label htmlFor="contact" className="form-label">Contact Number</label>
            <input id="contact" type="text" className="form-control border-primary" value={doctorDetails.contact} readOnly />
          </div>
        </div>

        <div className="mt-4 d-flex flex-column flex-md-row gap-3">
          {doctorDetails.whatsappLink && (
            <button className="btn btn-primary w-100 w-md-auto" onClick={() => window.open(doctorDetails.whatsappLink, "_blank")}>
              Book an appointment
            </button>
          )}
          <button className="btn btn-outline-primary w-100 w-md-auto" onClick={() => navigate('/')}>Go to home page</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
