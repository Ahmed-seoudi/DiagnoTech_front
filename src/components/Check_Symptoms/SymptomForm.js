import React, { useState, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CheckSymptoms.css"
import "../style.css"
import { useNavigate } from "react-router-dom";

const SymptomForm = () => {
  const [symptoms, setSymptoms] = useState([null, null, null]);
  const [symptomOptions, setSymptomOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch("/cleaned_structured_symptoms[1].json");
        const data = await response.json();
        const formattedData = Object.values(data).map(symptom => ({
          label: symptom,
          value: symptom.replace(/\s+/g, '_').toLowerCase()
        }));
        setSymptomOptions(formattedData);
      } catch (error) {
        console.error("Error fetching symptoms:", error);
      }
    };

    fetchSymptoms();
  }, []);


  useEffect(() => {
    document.body.classList.add("custom-symptom-body");
    return () => {
      document.body.classList.remove("custom-symptom-body");
    };
  }, []);

  const handleChange = (index, selectedOption) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = selectedOption;
    setSymptoms(newSymptoms);
  };

  const addSymptom = () => {
    setSymptoms([...symptoms, null]);
  };

  const removeSymptom = (index) => {
    if (index < 3) return; 
    const newSymptoms = symptoms.filter((_, i) => i !== index);
    setSymptoms(newSymptoms);
  };

  const isSubmitDisabled = symptoms.filter(sym => sym?.value).length < 3;

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitDisabled) return;

  const selectedSymptoms = symptoms
    .filter(sym => sym?.value)
    .map(sym => sym.value);

  try {
    setIsSubmitting(true); 

    const response = await fetch('http://127.0.0.1:5000/api/diagnosis/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ symptoms: selectedSymptoms }),
    });

    console.log(selectedSymptoms);

if (response.ok) {
  const result = await response.json(); 
  console.log('Success:', result);

  navigate("/disease-report", { state: { reportData: result.diagnosis.diagnosisResult[0] } }); 

  setSymptoms([null, null, null]); 
} else {
  console.error('Error submitting symptoms:', response.statusText);
  alert('Failed to submit symptoms. Please try again.');
}

  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  } finally {
    setIsSubmitting(false); 
  }
};


  return (
<div className="container mt-5 d-flex justify-content-between align-items-start">
  {/* Form Section */}
  <div className="form-wrapper">
    <h2 className="text-primary text-center mb-4">Enter your symptoms:</h2>
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">
      {symptoms.map((symptom, index) => (
        <div className="mb-3 d-flex align-items-center" key={index}>
          <Select
            options={symptomOptions}
            value={symptom}
            onChange={(selectedOption) => handleChange(index, selectedOption)}
            isClearable
            isSearchable
            placeholder={`Symptom ${index + 1}`}
            className="flex-grow-1"
          />
          {index >= 3 && (
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => removeSymptom(index)}
            >
              ✖
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline-primary w-100 mb-2"
        onClick={addSymptom}
      >
        Add symptom +
      </button>
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitDisabled || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  </div>

  {/* Images Section */}
  <div className="d-none d-md-flex flex-column align-items-center ms-4 images-wrapper">
    <div className="d-flex gap-3 mb-3">
      <img
        src="/img/alcohl-img-symptom.jpeg"
        alt="alcohol"
        className="img-fluid rounded-circle image-100"
      />
      <img
        src="/img/pills-img-symptom.jpeg"
        alt="pills"
        className="img-fluid rounded-circle image-150"
      />
    </div>
    <img
      src="/img/dr-img-symptom.jpeg"
      alt="doctor"
      className="img-fluid rounded-circle image-200"
    />
  </div>
</div>

  );
};

export default SymptomForm;
