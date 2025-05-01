import React, { useState, useRef, useEffect } from "react";
import logo from "../../img/logo.png";
import "./HomePage.css";
import "../style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import accurate from "../../img/accurate.png";
import transport from "../../img/transport(1).png";
import patient from "../../img/patient.png";
import HPatients from "../../img/healthy.png";
import heart from "../../img/mother-earth-day.png";
import Clients from "../../img/rating(1).png";
import Doctor from "../../img/doctor-appointment.png";
import generaltips from "../../img/good-health-message-board-with-green-apple-stethoscope-white-background.jpg";
import dr from "../../img/close-up-people-wearing-lab-coats.jpg";
import Guidelines from "../../img/close-up-hand-holding-pen-top-view.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import medicalreport from "../../img/medical-report-record-form-history-patient-concept.jpg";
import doctorvisit from "../../img/doctor-writing-clipboard-with-hand-chin.jpg";
import diseaseprevention from "../../img/Tips for disease prevention.jpg";
import periodicexam from "../../img/periodicexam.jpg";
import mentalhealth from "../../img/MENTALhealth.jpg";
import digitalhealth from "../../img/digitalheaith.jpg";
import visa from "../../img/visa.png";
import clinic from "../../img/logo1.png";
import company from "../../img/logo2.png";
import alliance from "../../img/logo3.png";
import faq from "../../img/9a1a0d69ebfa79f4228d2db72e15bde9.png";
import { Carousel, Modal, Button } from "react-bootstrap";
import footerImage from "../../img/530242319709347d08f803e333bc5d01.jpg";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown , faUserCircle  } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar, Nav, NavDropdown , Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from "axios";
import heroImage from "../../img/modified_image_blue.jpg"
import { faCheckCircle, faChartBar, faNewspaper, faHandshake, faQuestionCircle, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView } from "framer-motion";
import { MdHealthAndSafety } from "react-icons/md";
import { BsSend, BsHeadset } from "react-icons/bs";
import "./Chatbot.css"; 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const HomePage = () => {
  const { isLoggedIn, logout } = useAuth(); 
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.add('home-body');
    return () => {
      document.body.classList.remove('home-body');
    };
  }, []);
  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };
  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <p>Please log in to see more content.</p>
      )}
    </div>
  );
};
export default HomePage;
//////////////////////////////////Header-Section//////////////////////////////////////////////////////////////
export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, logout } = useAuth(); 
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

   useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          console.warn("No token found");
          return;
        }

        const response = await axios.get(
          "http://127.0.0.1:5000/api/profile/user",
          {
            headers: {
            Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response) {
          console.log(response);

          const fullName = response.data.data.fullName.trim();
          const firstName = fullName.split(" ")[0];
          setUsername(firstName);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);


  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`header-container ${scrolled ? 'scrolled' : ''}`}
    >
      <Container fluid>
        <Navbar.Brand onClick={() => navigate('/')} className="logo" style={{ cursor: 'pointer' }}>
          <img src={logo} alt="website's logo" width="50" height="50" />
          <span className="site-name">DiagnoTech</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-light" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nav-links">
          <NavDropdown 
  title={<span style={{ color: 'black' }} className="home-dropdown-title">Home <FontAwesomeIcon icon={faCaretDown} /></span>} 
  id="basic-nav-dropdown"
  show={isDropdownOpen}
  onToggle={setIsDropdownOpen}
  className="custom-dropdown"
>
  <NavDropdown.Item href="#why-choose-us">
    <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'gray', marginRight: '8px' }} />
    Why Choose Us?
  </NavDropdown.Item>
  <div className="dropdown-divider"></div>
  <NavDropdown.Item href="#Statistics-sec">
    <FontAwesomeIcon icon={faChartBar} style={{ color: 'gray', marginRight: '8px' }} />
    Statistics
  </NavDropdown.Item>
  <div className="dropdown-divider"></div>
  <NavDropdown.Item href="#Tips-News">
    <FontAwesomeIcon icon={faNewspaper} style={{ color: 'gray', marginRight: '8px' }} />
    Tips & News
  </NavDropdown.Item>
  <div className="dropdown-divider"></div>
  <NavDropdown.Item href="#partnership-sec">
    <FontAwesomeIcon icon={faHandshake} style={{ color: 'gray', marginRight: '8px' }} />
    Partnerships
  </NavDropdown.Item>
  <div className="dropdown-divider"></div>
  <NavDropdown.Item href="#faq-sec">
    <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'gray', marginRight: '8px' }} />
    Frequently Asked Questions
  </NavDropdown.Item>
  <div className="dropdown-divider"></div>
  <NavDropdown.Item href="#footer-sec">
    <FontAwesomeIcon icon={faArrowCircleDown} style={{ color: 'gray', marginRight: '8px' }} />
    Footer
  </NavDropdown.Item>
</NavDropdown>
            <Nav.Link href="/DoctorsList" className="about-us">Doctors List</Nav.Link>
            <Nav.Link href="#contact" className="contact-us">About Us</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center user-actions">
            {isLoggedIn ? (
              <>
                <Button className="auth-btn me-3" onClick={handleLogout}>
                  Logout
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FontAwesomeIcon 
                    icon={faUserCircle} 
                    className="user-icon" 
                    onClick={() => navigate('/profile')} 
                    style={{ cursor: 'pointer' , color: 'rgb(0, 0, 0)'}} 
                  />
                  <span
                    style={{ fontWeight: 'bold', color: '#ffff', cursor: 'pointer' }}
                    onClick={() => navigate('/profile')}
                  >
                    <span style={{ color: 'black' }}>
                      {username ? username.split(' ')[0] : 'Guest'}
                    </span>
                  </span>
                </div>
              </>
            ) : (
              <>
                <Button className="auth-btn me-3" onClick={() => navigate('/login')}>
                  Register
                </Button>
                <Button className="auth-btn" onClick={() => navigate('/register')}>
                  Login
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
// ////////////////////////////////////////////HeroImg-section///////////////////////////////////////////////
export const HeroImg = () => {

    const { isLoggedIn } = useAuth(); // خد حالة تسجيل الدخول من السياق
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (isLoggedIn) {
      navigate('/symptom-form');
    } else {
      navigate('/login');
    }
  };
  
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="hero-text position-relative">
            <div className="text-container">
              <h2>
                Uncover the exact cause of your symptoms with the power of AI - your health starts with more accurate knowledge.
              </h2>
            </div>
            <Button 
              className="book-demo d-flex align-items-center gap-2" 
              onClick={handleStartClick}>
              Start Checking
              <MdHealthAndSafety size={22} />
            </Button>

          </Col>

          <Col md={6} className="hero-image">
            <img src={heroImage} alt="Illustration" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
////////////////////////////Why-choose-us-section////////////////////////////////////////
export const Whu = () => {
  return (
    <motion.div
    id="why-choose-us"
    className="whu-container"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <motion.h2
      className="whu-title"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}  
      viewport={{ once: true }}
    >
      Why Choose Us ?
    </motion.h2>
    <motion.p
      className="whu-subtitle"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}  
      viewport={{ once: true }}
    >
      Get accurate, up-to-date medical information you can trust. Stay informed with clear, evidence-based health insights designed for you.
    </motion.p>
    <div className="whu-reasons">
      {[
        {
          img: accurate,
          title: "Accurate & Reliable Information",
          text: "Our content is reviewed by medical professionals to ensure accuracy.",
        },
        {
          img: transport,
          title: "Comprehensive Services",
          text: "From preventive care to specialized treatments, we offer a full range of medical services.",
        },
        {
          img: patient,
          title: "Trusted by Patients",
          text: "Our patients trust us for reliable, professional, and ethical healthcare.",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="whu-reason"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.6,  
            delay: index * 0.2,  
            ease: "backOut",
          }}
          viewport={{ once: true }}
        >
          <img src={item.img} alt={item.title} width="90" height="90" />
          <p>{item.title}</p>
          <p>{item.text}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
  );
};
/////////////////////////////////////Statistics-Section/////////////////////////////////////////////////////
export const Statistics = () => {
  return (
    <motion.div
      id="Statistics-sec"
      className="statistics-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="statistics-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Statistics
      </motion.h2>
      <div className="statistics-items">
        {[ 
          { img: HPatients, text: "350 +", desc: "Happy patients", alt: "happy patients" },
          { img: heart, text: "180 +", desc: "Saved hearts", alt: "saved hearts" },
          { img: Clients, text: "500 +", desc: "Happy clients", alt: "Happy Clients" },
          { img: Doctor, text: "230 +", desc: "Expert doctors", alt: "Expert Doctors" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="statistics-item"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img src={item.img} alt={item.alt} width="90" height="90" />
            <p className="statistics-text">{item.text}</p>
            <p className="statistics-description">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
////////////////////////////////////////////Tips & News-section/////////////////////////////////////////////////    //
export const Tips = () => {
  const [show, setShow] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const tipsData = [
    {
      img: generaltips,
      title: "General Health Tips",
      description: "*Best Eating Habits for Better Health.*",
      details: (
        <div>
          <p> <strong>Health Tips for a Better Life</strong></p>
          <p>✔️ <strong>Eat Healthy:</strong><br />
Eat more fruits and vegetables, and reduce fast food and fried foods.<br />
       Drink 8 glasses of water daily to stay hydrated.</p>
          <p>✔️ <strong>Exercise:</strong><br />
       Up to 30 minutes daily (walking, running, light exercise).<br />
         Improves heart health and reduces stress.</p>
          <p>✔️ <strong>Sleep Well:</strong><br />
        7-9 hours of sleep daily improves concentration and mood.<br />
         Avoid using your phone before bed for better rest.</p>
          <p>✔️ <strong>Take Care of Your Mental Health:</strong><br />
         Take time to relax, pursue hobbies, and avoid stress.</p>
          <p>✔️ <strong>Protect Yourself from Disease:</strong><br />
         Wash your hands regularly and get regular checkups.<br />
           Consult a doctor when needed and maintain your immunity.</p>
          <p>🔹 <em>Your health is your wealth; take care of it daily! 💙</em></p>
        </div>
      ),
    },
    {
      img: dr,
      title: "Latest Medical Developments",
      description: "*Using AI in early diagnosis of diseases.*",
      details: (
        <div>
          <p> <strong>Latest Medical Developments</strong></p>
          <p>✔️ <strong>Artificial Intelligence in Diagnosis:</strong><br />
         AI can analyze scans and lab reports with high accuracy, helping doctors detect diseases early.</p>
          <p>✔️ <strong>Gene Therapy Technologies:</strong><br />
           Gene therapy modifies disease-causing genes, offering new hope for treating genetic diseases.</p>
          <p>✔️ <strong>Innovative Medicines:</strong><br />
          New drugs target cancer cells without affecting healthy cells, reducing treatment side effects.</p>
          <p>✔️ <strong>Advances in Organ Transplantation:</strong><br />
           3D bioprinters are now used for organ transplantation, reducing the need for donors.</p>
          <p>✔️ <strong>Smart Health Apps:</strong><br />
          Phone apps monitor health, measure heart rate, and alert users to abnormal changes.</p>
          <p>🔹 <em>Medicine is constantly evolving, making diagnosis and treatment faster and more accurate! 💙</em></p>
        </div>
      ),
    },
    {
      img: Guidelines,
      title: "Guidelines for people with chronic diseases",
      description: "*Effective tips for controlling blood sugar.*",
      details: (
        <div>
            <p> <strong>Guidelines for people with chronic diseases</strong></p>
          <p>✔️ <strong>Managing Diabetes Daily</strong></p>
          <p>Monitor your blood sugar regularly, follow a balanced diet, and take medications as prescribed.</p>
          <p>✔️ <strong>Natural Remedies for Better Health</strong></p>
          <p>Use natural methods like regular exercise, a healthy diet, and stress management to improve your condition.</p>
          <p>✔️<strong>Stay Active</strong></p>
          <p>Engage in light physical activities suitable for your condition to maintain your overall health.</p>
          <p>✔️<strong>Medication Adherence</strong></p>
          <p>Always follow your doctor’s instructions and never skip your medications.</p>
          <p>🔹 Managing chronic diseases requires consistency and care—your health is worth it! 💙</p>
        </div>
      ),
    },
    {
      img: medicalreport,
      title: "How to read medical reports",
      description: "*Quick tips to understand and interpret medical reports easily.*",
      details: (
        <div>
          <p><strong>Understanding Your Medical Reports</strong></p>
          <p>Medical reports contain essential information about your health, and understanding them can help you make informed decisions. Here’s a guide to help you interpret the most common sections:</p>
          <p>✔️ <strong>1. Patient Information</strong><br />
          This section includes your basic details, such as:
          <ul>
            <li>Name, Age, and Gender: Ensures the report is for the correct patient.</li>
            <li>Report Date: Helps track when the tests were performed.</li>
            <li>Doctor’s Information: Identifies the specialist who requested or interpreted the report.</li>
          </ul></p>
          <p>✔️ <strong>2. Test Names and Purpose</strong><br />
          Each report usually lists the medical tests performed. For example:
          <ul>
            <li>Complete Blood Count (CBC): Evaluates overall health and detects disorders.</li>
            <li>Lipid Profile: Measures cholesterol levels and assesses heart health.</li>
            <li>Blood Glucose Test: Monitors blood sugar levels for diabetes diagnosis.</li>
          </ul>
          <strong>Tip:</strong> Understanding the purpose of each test helps you connect results to specific health concerns.</p>
          <p>✔️ <strong>3. Results and Normal Ranges</strong><br />
          This is the most critical part of your report. It usually displays:
          <ul>
            <li>Test Result: Your actual measurement (e.g., 5.6 mmol/L for blood glucose).</li>
            <li>Reference Range: The normal range for comparison (e.g., 3.9 - 5.8 mmol/L).</li>
            <li>Flag Indicators: Marked as "High," "Low," or "Normal" based on your result.</li>
          </ul>
         <strong>Tip:</strong> If your result is outside the normal range, consult your doctor for further evaluation.</p>
          <p>✔️ <strong>4. Medical Terminology Explained</strong><br />
          Reports often use technical terms. Here are some common ones:
          <ul>
            <li>"Negative" or "Normal": No issues detected.</li>
            <li>"Positive" or "Abnormal": Indicates potential concerns requiring further review.</li>
            <li>"Pending": Some results may take longer to process.</li>
          </ul>
       <strong>Tip:</strong> Don’t hesitate to ask your doctor to explain unclear terms.</p>
        </div>
      ),
    },
    {
      img: doctorvisit,
      title: "How to prepare for a medical visit",
      description: "*Essential tips to prepare for your medical visit effectively.*",
      details: (
        <div>
          <p> <strong>How to read medical reports ?</strong></p>
          <p>✔️ <strong>1. Gather Your Medical History:</strong><br />
          Bring previous test results, medication lists, and any existing health records.</p>
          <p>✔️ <strong>2. List Your Symptoms:</strong><br />
          Write down your symptoms, when they started, and any patterns you’ve noticed.</p>
          <p>✔️ <strong>3. Prepare Questions:</strong><br />
          Note down concerns and questions you want to discuss with your doctor.</p>
          <p>✔️ <strong>4. Bring a Companion (If Needed):</strong><br />
          Having someone with you can help remember details and provide emotional support.</p>
          <p>✔️ <strong>5. Be Honest and Clear:</strong><br />
          Share accurate information about your health and lifestyle for a better diagnosis.</p>
        </div>
      ),
    },
    { img: diseaseprevention, 
      title: "Tips for disease prevention", 
      description: "*Simple and effective tips to prevent common diseases.*",
       details:(
<>
      <p><strong>Tips for Disease Prevention</strong></p>
     <p>✔️ <strong> 1. Maintain Good Hygiene:</strong><br />
Wash your hands regularly, cover your mouth when coughing or sneezing, and keep your surroundings clean.</p>
<p>✔️ <strong>2. Eat a Healthy Diet:</strong><br />
Consume a balanced diet rich in fruits, vegetables, whole grains, and lean proteins to boost your immune system.</p>
<p>✔️ <strong> 3. Stay Physically Active:</strong><br />
Engage in regular exercise to improve circulation, strengthen your body, and reduce the risk of chronic diseases.</p>
<p>✔️<strong> 4. Get Vaccinated:</strong><br />
Stay up to date with recommended vaccines to protect yourself from preventable illnesses.</p>
<p>✔️ <strong>5. Avoid Smoking and Limit Alcohol:</strong><br />
Smoking weakens your immune system, and excessive alcohol intake can harm your liver and overall health.</p>
<p>✔️<strong> 6. Manage Stress and Get Enough Sleep:</strong><br />
High stress and lack of sleep can weaken immunity; practice relaxation techniques and ensure 7-9 hours of sleep per night.</p>
<p>✔️<strong> 7. Schedule Regular Health Checkups:</strong><br />
Early detection of health issues can prevent complications—visit your doctor for routine screenings</p>
</>
    ),
     },
    { img: periodicexam, title: "The importance of periodic examinations", description:"*Regular check-ups are key to early detection and better health.*", details: (
      <>
      <p><strong>The importance of periodic examinations</strong></p>
     <p><strong>Periodic Exam – The Power of Early Detection</strong><br />
     Regular health checkups are essential for detecting health problems early, improving treatment success, and maintaining overall well-being. Here’s why periodic exams matter:</p>
     <p>✔️ <strong> 1. Detect Problems Early:</strong><br />
     Routine screenings identify health issues like diabetes, heart disease, and cancer in their early stages when they are easier to treat.</p>
<p>✔️ <strong>2. Monitor Chronic Conditions:</strong><br />
If you have chronic diseases (e.g., diabetes, hypertension), regular checkups help track your condition and adjust treatments if necessary.</p>
<p>✔️ <strong> 3. Prevent Future Health Issues:</strong><br />
Early detection through regular exams can prevent minor health concerns from becoming serious medical problems.</p>
<p>✔️<strong> 4. Personalized Health Advice:</strong><br />
Your doctor can provide tailored guidance on lifestyle changes, vaccinations, and preventive care based on your medical history.</p>
<p>✔️ <strong>5. Stay Up to Date with Screenings:</strong><br />
Important tests may include:

    Blood Tests: Check cholesterol, blood sugar, and organ function.
    Cancer Screenings: Mammograms, colonoscopies, and other tests based on your age and risk factors.
    Heart Health: Monitor blood pressure and heart rate for cardiovascular health.</p>
<p>✔️<strong> 6. Mental Health Check-Ins</strong><br />
Periodic exams also assess your mental well-being, ensuring you receive support for stress, anxiety, or depression.</p>
<p><strong>Your health is your most valuable asset—regular exams can save your life! 💙</strong></p>
</>
    )
    },
    { img: mentalhealth, title: "Mental Health", description: "*Your mental health is key to a balanced and happy life—take time to care for it.*", details: (
      <>
      <p><strong>Mental Health</strong></p>
      <p><strong> Mental Health – Take Care of Your Mind</strong><br/>
      Mental health is just as important as physical health. Taking care of your emotional well-being improves your quality of life and overall health. Here are key ways to prioritize your mental well-being:</p>
     <p>✔️ <strong> 1. Practice Self-Care:</strong><br />
     Engage in activities you enjoy—whether it's reading, exercising, or spending time with loved ones—to recharge and maintain emotional balance.</p>
<p>✔️ <strong>2. Manage Stress Effectively:</strong><br />
Use stress-relief techniques like deep breathing, meditation, and time management to handle daily pressures and maintain calm.</p>
<p>✔️ <strong> 3. Stay Connected:</strong><br />
Build and maintain strong relationships. Talking to someone you trust helps reduce feelings of loneliness and isolation.</p>
<p>✔️<strong> 4. Get Enough Sleep:</strong><br />
Aim for 7-9 hours of quality sleep each night to support emotional regulation, focus, and overall well-being.</p>
<p>✔️ <strong>5. Seek Professional Help:</strong><br />
If you’re feeling overwhelmed, anxious, or depressed, don’t hesitate to consult a mental health professional for guidance and support..</p>
<p>✔️<strong> 6. Maintain a Healthy Lifestyle:</strong><br />
Regular physical activity, a balanced diet, and hydration can positively impact your mood and energy </p>
<p>✔️<strong> 7. Set Boundaries and Take Breaks:</strong><br />
Create personal boundaries to avoid burnout and give yourself time to relax and recover from daily challenges.</p><br/>
<p><strong>Your mental health matters—nurture it every day! 💙</strong></p>
</>
    )},
    { img: digitalhealth, title: "Digital health & health technology", description:"*Digital tech improves healthcare.*", details: (
    <div> 
       <p><strong>Digital health and health technology</strong></p>
      <p><strong>Digital Health & Health Technology – The Future of Healthcare</strong></p>
       <p>Technology is revolutionizing healthcare, making medical services more accessible, efficient, and accurate. Here’s how digital health is improving lives:</p> 
      <p>✔️ <strong>1. Telemedicine & Virtual Consultations:</strong><br /> Patients can now consult doctors remotely via video calls, reducing the need for hospital visits and ensuring quick medical advice.</p>
       <p>✔️ <strong>2. Wearable Health Devices:</strong><br /> Smartwatches and fitness trackers monitor heart rate, oxygen levels, sleep patterns, and physical activity, helping users take proactive steps toward better health.</p> 
       <p>✔️ <strong>3. AI in Medical Diagnosis:</strong><br /> Artificial intelligence analyzes medical images and patient data, helping doctors detect diseases early and improve treatment accuracy.</p> 
       <p>✔️ <strong>4. Electronic Health Records (EHRs):</strong><br /> Digital records store patient history securely, allowing doctors to access and update medical data instantly, improving efficiency and reducing errors.</p> 
       <p>✔️ <strong>5. Mobile Health Apps:</strong><br /> Health apps assist with medication reminders, track symptoms, and offer personalized wellness plans, making healthcare management easier.</p> 
       <p>✔️ <strong>6. Robotics in Surgery:</strong><br /> Advanced robotic-assisted surgeries enhance precision, reduce recovery time, and improve patient outcomes.</p>
        <p>✔️ <strong>7. Blockchain for Secure Health Data:</strong><br /> Blockchain technology ensures patient data privacy and security, reducing risks of data breaches and unauthorized access.</p> 
        <p>🔹 <em>Technology is shaping the future of healthcare—embrace innovation for a healthier life! 💙</em></p> </div>) },
  ];
  const totalSlides = Math.ceil(tipsData.length / 3);
  const handleShow = (tip) => {
    setSelectedTip(tip);
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const ref = useRef(null);
const isInView = useInView(ref, { once: true });
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,  
    },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
return (
  <motion.div
    id="Tips-News"
    className="container my-5"
    ref={ref}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <h2 className="text-center tips-title mb-4">Tips & News</h2>
    <Carousel
      activeIndex={activeIndex}
      onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
      indicators={false}
      interval={null}
      className="tips-carousel"
      prevIcon={<FaChevronLeft className="custom-carousel-icon custom-prev-icon" />}
      nextIcon={<FaChevronRight className="custom-carousel-icon custom-next-icon" />}
    >
      {Array.from({ length: totalSlides }).map((_, i) => (
        <Carousel.Item key={i}>
          <motion.div
            className="row justify-content-center"
            variants={containerVariants}
            initial="hidden"
            animate={activeIndex === i && isInView ? "visible" : "hidden"}
          >
            {tipsData.slice(i * 3, i * 3 + 3).map((tip, index) => (
              <motion.div
                key={i * 3 + index}
                className="col-md-4 col-sm-6 col-12 mb-3 d-flex justify-content-center"
                variants={cardVariants}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2, 
                  ease: "easeOut",
                }}
              >
                <div className="card tip-card" onClick={() => handleShow(tip)}>
                  <img src={tip.img} className="card-img-top" alt={tip.title} />
                  <div className="card-body text-center">
                    <h5 className="card-title mb-2">{tip.title}</h5>
                    <p className="card-text">{tip.description}</p>
                    <button className="more-btn">Read</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Carousel.Item>
      ))}
    </Carousel>
    <div className="carousel-navigation text-center mt-4">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <span
          key={index}
          className={`nav-dot ${index === activeIndex ? "active" : ""}`}
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </div>
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedTip?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={selectedTip?.img} alt={selectedTip?.title} className="img-fluid mb-3" />
        <p className="tip-details">{selectedTip?.details}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  </motion.div>
);
};
// /////////////////////////////Partenerships-section////////////////////////////////////
export const Partnerships = () => {
  const partners = [
    { id: 1, img: visa },
    { id: 2, img: clinic },
    { id: 3, img: company },
    { id: 4, img: alliance },
  ];
  return (
    <motion.div
      id="partnership-sec"
      className="container-fluid my-5 partnership-container"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-center mb-4 partnership-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Partnerships
      </motion.h2>
      <motion.div
        className="partnerships-grid"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            className="partner-item"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2, 
              ease: "backOut",
            }}
            viewport={{ once: true }}
          >
            <img src={partner.img} alt={`Partner ${partner.id}`} className="partner-img" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// ///////////////////////////////////FAQ-Section////////////////////////////////////////////////////////////////////
export const Faqsection = () => {
  const faqs = [
    { question: 'How do I enter my symptoms?', answer:' You can enter symptoms via the dedicated page, with an auto-complete feature for easy selection.' },
    { question: 'Is my medical history kept?', answer: 'Yes, all previous symptoms and diagnoses are stored on your profile.'},
    { question: 'How to determine the appropriate specialization?', answer:' Based on the symptoms you present, we determine the best medical specialty for your condition.' },
    { question: 'Can I know doctors in many fields?', answer: 'Yes, you can easily find doctors in various fields through the website.' },
  ];
  return (
    <motion.div
      id="faq-sec"
      className="faq-container"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="faq-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center">
          <motion.img
            src={faq}
            alt="FAQ"
            className="faq-image"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </div>
        <div className="col-md-6">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="accordion-item"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,  
                  ease: "backOut",
                }}
                viewport={{ once: true }}
              >
                <h2 className="accordion-header" id={`flush-heading${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`flush-collapse${index}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`flush-collapse${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`flush-heading${index}`}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    {faq.answer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .faq-container {
          background:rgb(255, 255, 255);
          padding: 50px 0;
          margin-top: 70px;
        }
        .faq-title {
          text-align: center;
          font-size: 36px;
          font-weight: bold;
          word-spacing: 4px;
          letter-spacing: 2px;
          margin-top: -30px;
        }
        .faq-image {
          width: 80%;
          max-width: 400px;
          object-fit: contain;
          margin-top: -65px;
        }
        .accordion-button {
          font-size: 1rem;
          font-weight: bold;
          color: #007bff;
        }
        .accordion-item {
          margin-bottom: 15px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .col-md-6 {
          margin-top: 70px;
          margin-left: -20px;
        }
        @media (max-width: 767px) {
          .faq-container {
            padding: 20px 0;
          }
          .faq-image {
            width: 100%;
            max-width: 350px;
            margin-top: -20px;
          }
          .faq-title {
            font-size: 2rem;
          }
          .col-md-6 {
            margin-top: 20px;
            margin-left: 0;
          }
        }
      `}</style>
    </motion.div>
  );
};
////////////////////////////////Footer-section////////////////////////////////////////////////
export const Footer = () => {
  return (
    <footer className="footer-container">
      <div id="footer-sec" className="footer-wave">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="#e3f2fd" d="M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,144C672,160,768,224,864,234.7C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </svg>
      </div>
      <div className="footer-image-overlay">
        <img src={footerImage} alt="Decorative" className="footer-image" width="70px" height="70px" />
      </div>
      <Container>
        <Row className="align-items-center text-center text-md-start footer-content">
          <Col md={4} className="footer-section">
            <img src={logo} alt="Logo" className="footer-logo" width="70px" height="70px" />
            <h5>Learn More</h5>
            <ul>
              <li><a href="#">Our Blog</a></li>
              <li><a href="#">Rover Guarantee</a></li>
              <li><a href="#">Safety</a></li>
              <li><a href="#">Q&A Community</a></li>
            </ul>
          </Col>
          <Col md={4} className="footer-section">
            <h5>About</h5>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Statement</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </Col>
          <Col md={4} className="footer-section">
            <h5>Need Help?</h5>
            <ul>
              <li><a href="#">Help Center</a></li>
            </ul>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <p className="copyrights">&copy; 2024 Your Project Name. All Rights Reserved.</p>
      </div>
      <style>{`
      body {
  overflow-x: hidden;
}
        .footer-container {
          background: linear-gradient(135deg, #e3f2fd, #ffffff);
          padding: 100px 0 0;
          position: relative;
          overflow: hidden;
          width: 100%;
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }
        .footer-wave {
          position: absolute;
          top: -20px;
          left: 0;
          width: 100%;
          line-height: 0;
        }
        .footer-image-overlay {
          position: absolute;
          top:62px;
          right: 20px;
          z-index: 10;
        }
        .footer-image {
          width: 200px;
          height: auto;
          border-radius: 50%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .footer-logo {
          max-width: 150px;
          margin-bottom: 40px;
        }
        .footer-section h5 {
          font-weight: bold;
          margin-bottom: 40px;
          color: #1976d2;
        }
        .footer-section ul {
          list-style: none;
          padding: 0;
        }
        .footer-section ul li {
          margin-bottom: 10px;
        }
        .footer-section ul li a {
          text-decoration: none;
          color: #555;
          transition: color 0.3s ease;
        }
        .footer-section ul li a:hover {
          color: #1976d2;
        }
        .social-icons a {
          margin-right: 15px;
          font-size: 20px;
          color: #1976d2;
          transition: color 0.3s ease;
        }
        .social-icons a:hover {
          color: #0d47a1;
        }
        .footer-content {
          margin-top: 100px;
          flex: 1;
        }
        .footer-bottom {
          text-align: center;
          padding-top: 20px;
        }
        @media (max-width: 768px) {
          .footer-image-overlay {
            position: static;
            text-align: center;
            margin-bottom: 20px;
          }
          .footer-image {
            width: 150px;
          }
          .footer-section {
            margin-bottom: 30px;
          }
          .footer-content {
            margin-top: 50px;
          }
          .footer-bottom {
            padding-top: 10px;
          }
        }
      `}</style>
    </footer>
  );
};
// /////////////////////////////////ScrollButtons-Section//////////////////////////////////////////////
export const ScrollButtons = () => {
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };
  return (
    <div className="scroll-buttons">
      {showScroll && (
        <>
          <button className="scroll-btn up" onClick={scrollToTop}>
            <FaArrowUp />
          </button>
          <button className="scroll-btn down" onClick={scrollToBottom}>
            <FaArrowDown />
          </button>
        </>
      )}
      <style jsx>{`
        .scroll-buttons {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .scroll-btn {
          width: 35px;
          height: 35px;
          border: none;
          border-radius: 50%;
          background: #007bff;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          transition: background 0.3s;
        }
        .scroll-btn:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};
/////////////////////////////////////////////////ChatBot/////////////////////////////////////////////////////////////
export const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello how can i help you", sender: "bot" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleClose = () => setShowChat(false);
  const handleShow = () => setShowChat(true);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatBotMessage = (text) => {
    const cleanedText = text.replace(/\*\*/g, '');
    return cleanedText.split(/(\b\w+\b)/g).map((part, index) => {
      if (text.match(/\*\*[^\*]+\*\*/g)?.some(bold => bold.slice(2, -2) === part)) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (inputMessage.trim() === "") return;

    const userMessage = { text: inputMessage, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/chatBot/chat",
        { message: inputMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.reply) {
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: response.data.reply, sender: "bot" },
          ]);
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I encountered an error. Please try again later.", sender: "bot" },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="chat-icon-container" onClick={handleShow}>
        <div className="chat-icon">
          <BsHeadset />
        </div>
        <div className="ai-assistant-bubble">
          Hi I'm your medical AI assistant
        </div>
      </div>

      {/* Chat Modal */}
      <Modal
        show={showChat}
        onHide={handleClose}
        centered
        className="chatbot-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={require("../../img/logo.png")} alt="Logo" width="30" height="30" className="me-2" />
            DiagnoTech Assistant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="chat-body">
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
              >
                {msg.sender === "bot" ? formatBotMessage(msg.text) : msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="message bot typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Modal.Body>
        <Modal.Footer className="chat-footer">
          <Form onSubmit={handleSendMessage} className="w-100">
            <InputGroup>
              <Form.Control
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                autoFocus
              />
              <Button variant="primary" type="submit" disabled={isLoading}>
                <BsSend />
              </Button>
            </InputGroup>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
};