import React, { useState, useEffect } from "react";
import { Container, Card, Button, Spinner, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaKey } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsChevronDown, BsChevronUp } from "react-icons/bs"; // استدعاء الأيقونات
import axios from "axios";
import "./profiles.css";
import "../style.css";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "Not Available",
    email: "Not Available",
    gender: "Not Available",
    age: 0,
    medicalHistory: "Not Available",
  });
  const [profilePicture, setProfilePicture] = useState("/img/user.png");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false); 
  const [showPasswordModal, setShowPasswordModal] = useState(false); 
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); 
  const [visibleCount, setVisibleCount] = useState(2);



  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/profile/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      });

      if (response.data) {
        setUserData(response.data.data);
        setProfilePicture(response.data.profilePicture || "/img/user.png");
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load profile data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

 const handleDeleteAccount = async () => {
  if (!deletePassword) {
    alert("Please enter your password to confirm deletion.");
    return;
  }

    try {
    await axios.delete('http://127.0.0.1:5000/api/profile/deleteAccount', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      data: {
        password: deletePassword 
      }
    });
    localStorage.removeItem('jwt');
    alert("Account deleted successfully!");
    navigate("/login");
  } catch (err) {
    console.error("Error deleting account:", err);
    alert("Failed to delete account. Please check your password and try again.");
  }
};


  const handleChangePassword = async () => {
    try {
      await axios.put('http://127.0.0.1:5000/api/profile/changePassword', {
        oldPassword,
        newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      alert("Password changed successfully!");
      setShowPasswordModal(false);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Error changing password:", err);
      alert("Failed to change password. Please check your old password and try again.");
    }
  };

  const fetchMedicalHistory = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/diagnosis/history', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });

    if (response.data && Array.isArray(response.data)) {
  setMedicalHistory(response.data);
  console.log(response.data); 
} else {
  setMedicalHistory([]);
}

  } catch (err) {
    console.error("Error fetching medical history:", err);
    setMedicalHistory([]); 
  }
};

useEffect(() => {
  document.body.classList.add('profile-bg');
  fetchUserData();
  fetchMedicalHistory();

  const reloadProfile = sessionStorage.getItem('reloadProfile');
  if (reloadProfile === 'true') {
    sessionStorage.removeItem('reloadProfile');
  }

  return () => {
    document.body.classList.remove('profile-bg');
  };
}, [location]);


  if (loading) {
    return (
      <Container className="mt-5 d-flex justify-content-center">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading profile...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 d-flex justify-content-center">
        <Card className="p-4 shadow-lg border-0 rounded-4 text-center" style={{ maxWidth: "700px", width: "100%", backgroundColor: "#f8f9fa" }}>
          <div className="text-danger mb-3">
            <h4>Error</h4>
            <p>{error}</p>
          </div>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow-lg border-0 rounded-4 text-center" style={{ maxWidth: "700px", width: "100%", backgroundColor: "#f8f9fa" }}>
        <div className="d-flex justify-content-center mb-3">
          <div className="position-relative" style={{ width: "180px", height: "180px" }}>
            <img
              src={profilePicture}
              alt="User Profile"
              className="rounded-circle border border-3 border-primary shadow-sm"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        <h3 className="mb-3 fw-bold text-primary">User Profile</h3>

        <div className="text-start px-4">
          <p className="fw-semibold mb-2">Full Name:</p>
          <p className="text-muted">{userData.fullName}</p>

          <p className="fw-semibold mb-2">Email:</p>
          <p className="text-muted">{userData.email}</p>

          <p className="fw-semibold mb-2">Gender:</p>
          <p className="text-muted">{userData.gender}</p>

          <p className="fw-semibold mb-2">Age:</p>
          <p className="text-muted">{userData.age}</p>

<p className="fw-semibold mb-2">Medical History:</p>
{medicalHistory.length > 0 ? (
  <div>
    {medicalHistory.slice(0, visibleCount).map((item, index) => {
      const isOpen = openIndex === index;
      const diseaseName = item.diagnosisResult?.[0]?.disease || "Unknown Disease";

      return (
        <Card 
          key={index} 
          className={`mb-2 shadow-sm border-0 ${isOpen ? 'bg-light' : ''}`} 
          style={{ cursor: 'pointer', transition: 'all 0.3s ease-in-out', borderRadius: '12px' }}
          onClick={() => setOpenIndex(isOpen ? null : index)} 
        >
          <Card.Body className="py-2 px-3">
            {/* --- الجزء المختصر --- */}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-1 text-primary" style={{ fontSize: "1rem" }}>{diseaseName}</h6>
                <p className="mb-0 text-muted" style={{ fontSize: "0.85rem" }}>
                  <small>Diagnosed on: {new Date(item.createdAt).toLocaleDateString()}</small>
                </p>
              </div>
              <div className="text-secondary" style={{ fontSize: "1.4rem" }}>
                {isOpen ? <BsChevronUp /> : <BsChevronDown />}
              </div>
            </div>

            {/* --- التفاصيل الكاملة --- */}
            {isOpen && (
              <div className="mt-3" style={{ fontSize: "0.9rem", transition: 'all 0.3s ease-in-out' }}>
                <p><strong>Symptoms:</strong> {item.symptoms.join(", ")}</p>

                {item.diagnosisResult && item.diagnosisResult.length > 0 && (
                  <div>
                    <p><strong>Probability:</strong> {item.diagnosisResult[0].probability}%</p>
                    <p><strong>Description:</strong> {item.diagnosisResult[0].description}</p>
                    <p><strong>Precautions:</strong></p>
                    <ul>
                      {item.diagnosisResult[0].precautions.map((precaution, idx) => (
                        <li key={idx}>{precaution}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      );
    })}

    {/* --- أزرار التحكم --- */}
    <div className="text-center mt-3">
      {visibleCount < medicalHistory.length && (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setVisibleCount(prev => prev + 2)} // عرض اتنين كمان
          className="rounded-pill px-4 me-2"
        >
          View More
        </Button>
      )}
      {visibleCount > 2 && (
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setVisibleCount(2)} // يرجع لأول اتنين
          className="rounded-pill px-4"
        >
          View Less
        </Button>
      )}
    </div>

  </div>
) : (
  <p className="text-muted">Not Available</p>
)}
          
        </div>

        <div className="d-flex justify-content-center mt-4 gap-2">
          <Link to="/update-info">
            <Button variant="primary" className="px-4 fw-semibold shadow">
              <FaEdit className="me-2" /> Update Info
            </Button>
          </Link>
          <Button variant="warning" className="px-4 fw-semibold shadow" onClick={() => setShowPasswordModal(true)}>
            <FaKey className="me-2" /> Reset Password
          </Button>
          <Button variant="danger" className="px-4 fw-semibold shadow" onClick={() => setShowConfirmModal(true)}>
            <FaTrash className="me-2" /> Delete Profile
          </Button>
        </div>
      </Card>

      {/* Modal Confirm Delete */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Deletion</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Please enter your password to confirm account deletion.</p>
    <Form.Group className="mb-3">
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        value={deletePassword}
        onChange={(e) => setDeletePassword(e.target.value)}
        placeholder="Enter your password"
      />
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => {
      setShowConfirmModal(false);
      setDeletePassword(""); 
    }}>Cancel</Button>
    <Button variant="danger" onClick={() => {
      if (deletePassword.trim() === "") {
        alert("Please enter your password.");
      } else {
        setShowConfirmModal(false);
        setShowFinalConfirm(true); 
      }
    }}>Delete</Button>
  </Modal.Footer>
</Modal>

{/* Are You*/}

<Modal show={showFinalConfirm} onHide={() => setShowFinalConfirm(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Are You Sure?</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to delete your account? This action cannot be undone.</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => {
      setShowFinalConfirm(false);
      setDeletePassword(""); 
    }}>No</Button>
    <Button variant="danger" onClick={handleDeleteAccount}>Yes, Delete</Button>
  </Modal.Footer>
</Modal>



      {/* Modal Reset Password */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
          <Button variant="warning" onClick={handleChangePassword}>Change Password</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;
