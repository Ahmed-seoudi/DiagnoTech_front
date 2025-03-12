import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from "react-router-dom";
import "./CheckSymptoms.css";
import "../style.css";

const ReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const reportData = location.state?.reportData || {
    disease: '',
    probability: '',
    description: '',
    precautions: [],
  };

  useEffect(() => {
    document.body.classList.add("custom-report-body");
    return () => {
      document.body.classList.remove("custom-report-body");
    };
  }, []);

  return (
    <div className="container py-5 custom-report">
      <h1 className="text-center mb-4 report-title">Here’s your report!</h1>

      <div className="row">

        <div className="col-md-6 d-flex flex-column gap-3">

          <div>
            <label className="custom-label">Disease</label>
            <input
              type="text"
              className="custom-input"
              value={reportData.disease}
              disabled
            />
          </div>

          <div>
            <label className="custom-label">Probability (%)</label>
            <input
              type="text"
              className="custom-input"
              value={`${reportData.probability}%`}
              disabled
            />
          </div>

          <div>
            <label className="custom-label">Description</label>
            <textarea
              className="custom-textarea"
              rows="4"
              value={reportData.description}
              disabled
            ></textarea>
          </div>

          <button className="custom-btn-primary" onClick={() => navigate("/doctor")}>
            Go to Doctor's profile
          </button>

          <button className="custom-btn-secondary" onClick={() => navigate("/")}>
            Go to home page
          </button>
        </div>

        <div className="col-md-6 d-flex flex-column gap-3">

          <div>
            <label className="custom-label">Precautions</label>
            <ul className="list-group">
              {reportData.precautions.map((precaution, index) => (
                <li key={index} className="list-group-item">
                  {precaution}
                </li>
              ))}
            </ul>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <img
              src="/img/report1.jpeg"
              alt="image1"
              className="custom-image img2"
            />
            <img
              src="/img/report2.jpeg"
              alt="image2"
              className="custom-image img1"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReportPage;
