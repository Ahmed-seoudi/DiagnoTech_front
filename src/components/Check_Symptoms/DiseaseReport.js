import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from "react-router-dom";
import "./CheckSymptoms.css";
import "../style.css";

const DoctorSuggestion = ({ doctors }) => {
  const navigate = useNavigate();

  const handleDoctorClick = (doctor) => {
    navigate(`/doctor/${doctor._id}`, { state: { doctor } });
  };

  return (
    <div>
      <label className="custom-label">
        Doctor Suggestions
        <i className="bi bi-person-heart ms-2" style={{ fontSize: "1.2rem", color: "#3f78b5" }}></i>
      </label>
      <div className="custom-textarea p-2" style={{ minHeight: "100px", overflowY: "auto" }}>
        {Array.isArray(doctors) && doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <div
              key={index}
              className="doctor-card border rounded p-2 shadow-sm mb-2 d-flex align-items-center gap-3"
              style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
              onClick={() => handleDoctorClick(doctor)}
            >
              <i className="bi bi-person-circle" style={{ fontSize: "40px", color: "#007bff" }}></i>
              <div>
                <h6 className="mb-1">{doctor.name}</h6>
                <p className="mb-0" style={{ fontSize: "12px", color: "gray" }}>
                  <i className="bi bi-geo-alt"></i> {doctor.clinicAddress}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No doctors are available for this condition. Please try again later or contact support.</p>
        )}
      </div>
    </div>
  );
};

const ReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const reportData = location.state?.reportData || {
    disease: '',
    description: '',
    precautions: [],
    doctors: [],
  };

  useEffect(() => {
    // Removed console.log and replaced with a check for missing data
    if (!location.state?.reportData) {
      // Optionally, show a UI message or redirect
      // For now, we'll rely on fallback UI messages below
    }
    document.body.classList.add("custom-report-body");
    return () => {
      document.body.classList.remove("custom-report-body");
    };
  }, [location.state]);

  return (
    <div className="container py-5 custom-report">
      <h1 className="text-center mb-4 report-title">Here's your report!</h1>

      {/* Show a warning if no report data is available */}
      {!reportData.disease && !reportData.description && reportData.precautions.length === 0 && reportData.doctors.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          No report data available. Please try generating the report again or return to the home page.
        </div>
      ) : (
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6 d-flex flex-column gap-3">
            {/* Disease Field */}
            <div>
              <label className="custom-label">
                Disease
                <i className="bi bi-virus ms-2" style={{ fontSize: "1rem", color: "#3f78b5" }}></i>
              </label>
              <input
                type="text"
                className="custom-input"
                value={reportData.disease || 'No disease information available'}
                disabled
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="custom-label">
                Disease Description
                <i className="bi bi-journal-medical ms-2" style={{ fontSize: "1rem", color: "#3f78b5" }}></i>
              </label>
              <textarea
                className="custom-textarea"
                rows="4"
                value={reportData.description || 'No description available for this condition'}
                disabled
              ></textarea>
            </div>

            {/* Precautions */}
            <div>
              <label className="custom-label">
                Recommended Precautions
                <i className="bi bi-shield-check ms-2" style={{ fontSize: "1rem", color: "#3f78b5" }}></i>
              </label>
              {reportData.precautions.length > 0 ? (
                <div className="precautions-container">
                  {reportData.precautions.map((item, index) => (
                    <div key={index} className="precaution-item">
                      <div className="precaution-number">{index + 1}</div>
                      <div className="precaution-text">{item}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No precautions available for this condition.</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6 d-flex flex-column gap-3 align-items-end">
            {/* Doctor Suggestions */}
            <div className="w-100">
              <DoctorSuggestion doctors={reportData.doctors} />
            </div>

            {/* Button */}
            <button className="custom-btn-secondary w-100" onClick={() => navigate("/")}>
              Go to home page
            </button>

            {/* Images */}
            <div className="d-flex justify-content-end gap-3 mt-4 w-100">
              <img
                src="/img/report1.jpeg"
                alt="Medical report illustration"
                className="custom-image img2"
                onError={() => <span className="text-danger">Image not found</span>}
              />
              <img
                src="/img/report2.jpeg"
                alt="Health report illustration"
                className="custom-image img1"
                onError={() => <span className="text-danger">Image not found</span>}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportPage;