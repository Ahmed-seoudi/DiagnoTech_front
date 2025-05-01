import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style.css";
import "./profiles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faStar as faStarSolid, faPerson } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { BsArrowUpRightCircle } from "react-icons/bs";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 

const DoctorProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); 
  const { isLoggedIn } = useAuth(); // Use auth context
  const [doctorDetails, setDoctorDetails] = useState(location.state?.doctor || null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [ratingComment, setRatingComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [isLoadingDoctor, setIsLoadingDoctor] = useState(false);

  useEffect(() => {
    document.body.classList.add('doctor-profile-body');
    
    // If we have a doctor ID but no doctor details, fetch them
    if (id && !doctorDetails) {
      fetchDoctorDetails(id);
    }
    
    // Use either the ID from URL params or from doctor details
    const doctorId = id || (doctorDetails && doctorDetails._id);
    
    if (doctorId) {
      fetchAppointments(doctorId);
      fetchReviews(doctorId);
    }

    return () => {
      document.body.classList.remove('doctor-profile-body');
    };
  }, [id, doctorDetails]);
  
  const fetchDoctorDetails = async (doctorId) => {
    setIsLoadingDoctor(true);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/doctors/${doctorId}`);
      if (response.data.status === 'success') {
        setDoctorDetails(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    } finally {
      setIsLoadingDoctor(false);
    }
  };

  const fetchAppointments = async (doctorId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/userbook/appointments/${doctorId}`);

      if (response.data.status === 'success' && Array.isArray(response.data.data)) {
        setAppointments(response.data.data);
      } else {
        console.warn('No appointments found or unexpected response format');
        setAppointments([]);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
    }
  };

  const fetchReviews = async (doctorId) => {
    setIsLoadingReviews(true);
    try {
      console.log('Fetching reviews for doctor ID:', doctorId);
      const response = await axios.get(`http://127.0.0.1:5000/api/userbook/reviews/${doctorId}`);
      console.log('Reviews response:', response.data);
  
      if (response.data.status === 'success') {
        // Handle different possible response formats
        if (Array.isArray(response.data.data)) {
          console.log('Setting reviews array directly:', response.data.data);
          setReviews(response.data.data);
        } else if (response.data.data && Array.isArray(response.data.data.reviews)) {
          console.log('Setting reviews from data.reviews array:', response.data.data.reviews);
          setReviews(response.data.data.reviews);
        } else if (response.data.data && response.data.data.reviews) {
          console.log('Setting single review as array:', [response.data.data.reviews]);
          setReviews([response.data.data.reviews]);
        } else {
          console.log('No valid reviews format found, setting empty array');
          setReviews([]);
        }
      } else {
        console.warn('Failed to fetch reviews:', response.data.message);
        setReviews([]);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      setReviews([]);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const bookAppointment = async () => {
    if (!selectedAppointment) {
      console.log('No appointment selected:', selectedAppointment);
      alert('Please select an appointment time first');
      return;
    }
    
    if (!isLoggedIn) {
      alert('You need to be logged in to book an appointment. Please log in first.');
      navigate('/login', { state: { returnUrl: location.pathname }});
      return;
    }
    
    console.log("Selected Appointment:", selectedAppointment);

    try {
      const doctorId = id || (doctorDetails && doctorDetails._id);
      const token = localStorage.getItem('jwt');

      const response = await fetch('http://127.0.0.1:5000/api/userbook/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          doctorId: doctorId,
          appointmentId: selectedAppointment._id,
          appointmentSlot: selectedAppointment.appointmentSlot
        })
      });

      const responseData = await response.json();

      console.log('Booking response:', responseData);

      if (responseData.status === 'success') {
        alert('Appointment booked successfully!');
        fetchAppointments(doctorId);
        setSelectedAppointment(null);
      } else {
        alert(responseData.message || 'Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  const submitRating = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (!isLoggedIn) {
      alert('You need to be logged in to submit a rating. Please log in first.');
      navigate('/login', { state: { returnUrl: location.pathname }});
      return;
    }

    try {
      const doctorId = id || (doctorDetails && doctorDetails._id);
      const token = localStorage.getItem('jwt'); 
      
      const response = await axios.post('http://127.0.0.1:5000/api/userbook/reviews/add', {
        doctorId: doctorId,
        rating: parseInt(rating, 10),
        comment: ratingComment
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Full response:', response);
      console.log('Response data:', response.data);

      if (response.data.status === 'success') {
        setRatingSubmitted(true);
        setRating(0);
        setRatingComment('');
        setTimeout(() => {
          fetchReviews(doctorId); 
        }, 500);
        alert('Rating submitted successfully!');
      } else {
        console.error('Error response:', response.data);
        alert(response.data.message || 'Failed to submit rating. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        if (error.response.status === 401) {
          alert('Authentication error. Please log in again.');
          navigate('/login', { state: { returnUrl: location.pathname }});
        } else if (error.response.data && error.response.data.message) {
          alert('Error: ' + error.response.data.message);
        } else {
          alert('Failed to submit rating. Please try again.');
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response from server. Please check your connection and try again.');
      } else {
        console.error('Error message:', error.message);
        alert('Failed to submit rating: ' + error.message);
      }
    }
  };

  const renderStars = (count) => {
    return Array(5).fill().map((_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={i < count ? faStarSolid : faStarRegular}
        className="text-warning mx-1"
      />
    ));
  };
  
  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    
    const sum = reviews.reduce((total, review) => {
      return total + (review.rating || 0);
    }, 0);
    
    return (sum / reviews.length).toFixed(1);
  };

  if (isLoadingDoctor) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading doctor details...</p>
        </div>
      </div>
    );
  }

  if (!doctorDetails) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <p className="text-danger fs-4">No doctor details available.</p>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/doctors')}>
            Return to Doctors List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex vh-100">
      <div className="bg-DoctorProfile">
        <img 
          src="/img/doctor_profile.jpg" 
          alt="Doctor Profile" 
          className="img-fluid w-100 h-100 object-cover"
        />
      </div>
      <div className="profile-content overflow-auto">
        <h1 className="text-primary fw-bold text-center mb-4 doc-h">Doctor's Profile</h1>

        <div className="d-flex flex-column align-items-center mb-4">
          <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
            style={{ width: "100px", height: "100px" }}>
            <span className="fs-1 text-white"><FontAwesomeIcon icon={faUserDoctor} /></span>
          </div>
          <h2 className="mt-3">{doctorDetails.fullName || doctorDetails.Name}</h2>
          <div className="mt-2 d-flex align-items-center">
            <div className="me-2 d-flex">
              {renderStars(Math.round(calculateAverageRating()))}
            </div>
            <span className="fw-bold text-primary">{calculateAverageRating()}</span>
            <span className="text-muted ms-1">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
          </div>
        </div>

        <div className="row g-3 profile-card p-4 mx-auto" style={{ maxWidth: "800px" }}>
          <div className="col-12 col-sm-6">
            <label htmlFor="fullname" className="form-label">Full Name</label>
            <input id="fullname" type="text" className="form-control border-primary" value={doctorDetails.fullName || doctorDetails.Name || ''} readOnly />
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="specialization" className="form-label">Specialization</label>
            <input id="specialization" type="text" className="form-control border-primary" value={doctorDetails.specialty || 'Not specified'} readOnly />
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="location" className="form-label">Location</label>
            <div className="input-group">
              <input id="location" type="text" className="form-control border-primary" value={doctorDetails.clinicAddress || 'Not specified'} readOnly />
              {doctorDetails.googleMapsLink && (
                <span className="input-group-text bg-white border-primary" style={{ cursor: 'pointer' }} onClick={() => window.open(doctorDetails.googleMapsLink, "_blank")}>
                  <BsArrowUpRightCircle size={20} className="text-primary" />
                </span>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="contact" className="form-label">Contact Number</label>
            <input id="contact" type="text" className="form-control border-primary" value={doctorDetails.contact || 'Not available'} readOnly />
          </div>
          
          <div className="col-12">
            <label htmlFor="appointments" className="form-label">Available Appointments</label>
            {appointments.length > 0 ? (
              <select
                id="appointments"
                className="form-select border-primary"
                value={selectedAppointment?._id || ""}
                onChange={(e) => {
                  const selected = appointments.find(apt => apt._id === e.target.value);
                  setSelectedAppointment(selected);
                }}
              >
                <option value="">Select an appointment</option>
                {appointments.map(apt => (
                  <option key={apt._id} value={apt._id} disabled={apt.isBooked}>
                    {apt.appointmentSlot} {apt.isBooked ? "(Booked)" : ""}
                  </option>
                ))}
              </select>
            ) : (
              <div className="alert alert-info">No available appointments found.</div>
            )}
          </div>

          <div className="col-12 mt-2">
            {selectedAppointment && (
              <div className="alert alert-success">
                Selected Appointment: {selectedAppointment.appointmentSlot}
              </div>
            )}
          </div>

          <div className="col-12 mt-3 text-center">
            <button 
              className="btn btn-primary" 
              onClick={bookAppointment}
              disabled={!selectedAppointment}
            >
              Book Selected Appointment
            </button>
          </div>
        </div>

        <div className="mt-5 mx-auto" style={{ maxWidth: "800px" }}>
          <h3 className="text-primary border-bottom pb-2">Rate this Doctor</h3>
          
          {ratingSubmitted ? (
            <div className="alert alert-success">
              Thank you for your feedback! Your review has been submitted.
            </div>
          ) : (
            <div className="profile-card p-4 mt-3">
              <div className="mb-3 text-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={star <= (hoveredRating || rating) ? faStarSolid : faStarRegular}
                    className="fs-2 mx-1 star-rating"
                    style={{ 
                      cursor: 'pointer',
                      color: star <= (hoveredRating || rating) ? '#FFC107' : '#ccc'
                    }}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                ))}
              </div>
              
              <div className="mb-3">
                <label htmlFor="ratingComment" className="form-label">Your Review (Optional)</label>
                <textarea
                  id="ratingComment"
                  className="form-control border-primary"
                  rows="3"
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="Share your experience with this doctor..."
                ></textarea>
              </div>
              
              <div className="text-center">
                <button className="btn btn-primary" onClick={submitRating}>
                  Submit Rating
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 mx-auto mb-5" style={{ maxWidth: "800px" }}>
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
            <h3 className="text-primary mb-0">Patient Reviews</h3>
            <button 
              className="btn btn-sm btn-outline-primary" 
              onClick={() => setShowReviews(!showReviews)}
            >
              {showReviews ? 'Hide Reviews' : 'Show Reviews'}
            </button>
          </div>

          {showReviews && (
            isLoadingReviews ? (
              <div className="text-center p-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading reviews...</p>
              </div>
            ) : reviews.length > 0 ? (
              <div className="review-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {reviews.map((review, index) => (
                  <div key={review._id || `review-${index}`} className="profile-card mb-3 p-3">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <div 
                            className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" 
                            style={{ width: '40px', height: '40px' }}
                          >
                            <FontAwesomeIcon icon={faPerson} />
                          </div>
                        </div>
                        <div>
                          <p className="mb-0 fw-semibold">{review.userName || 'Patient'}</p>
                          <span className="small text-muted">
                            {review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            }) : 'Unknown date'}
                          </span>
                        </div>
                      </div>
                      <div className="text-warning">
                        {renderStars(Math.round(review.rating || 0))}
                      </div>
                    </div>
                    <p className="mb-0">
                      {review.comment ? review.comment.trim() : <em className="text-muted">No comment provided.</em>}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 bg-light rounded">
                <FontAwesomeIcon icon={faStarRegular} className="display-4 text-secondary" />
                <p className="mt-3">No reviews available yet. Be the first to review!</p>
              </div>
            )
          )}
        </div>

        <div className="text-center mb-5">
          <button className="btn btn-outline-primary" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;