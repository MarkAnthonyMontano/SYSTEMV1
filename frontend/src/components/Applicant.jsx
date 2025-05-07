import React, { useState, useEffect, } from "react";
import axios from "axios";
import { Button, Box, TextField, Container, Typography, FormControl, InputLabel, Select, MenuItem, ListSubheader, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import SchoolIcon from '@mui/icons-material/School';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import InfoIcon from '@mui/icons-material/Info';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:5000/person_table";

const ApplicantForm = () => {
  const getPersonIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded Token: ", decoded);
      return decoded.person_id; // Make sure your token contains this field
    }
    return null;
  };

  const [data, setData] = useState([]);
  const personIDFromToken = getPersonIdFromToken();


  const [personID, setPersonID] = useState('');



  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/person_table');
      setApplicants(response.data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ first_name: "", last_name: "" });

  // Fetch all students
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);




  useEffect(() => {
    const fetchPersonalInformation = async () => {
      if (!personID) return;

      try {
        const response = await axios.get(`http://localhost:5000/person_table`);
        const filtered = response.data.filter(item => String(item.person_id) === String(personID));
        setData(filtered);
      } catch (err) {
        console.error("Failed to fetch personal information:", err);
      }
    };

    fetchPersonalInformation();
  }, [personID]);



  useEffect(() => {
    fetch("http://localhost:5000/person_table")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  const updateItem = (student) => {
    axios
      .put(`${API_URL}/${student.person_id}`, student)
      .then((res) => {
        setStudents((prevStudents) =>
          prevStudents.map((s) =>
            s.person_id === student.person_id ? res.data : s
          )
        );
      })
      .catch((err) => console.error("Update error:", err));
  };


  const [profilePicture, setProfilePicture] = useState(null);


  const fetchProfilePicture = async (person_id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/${person_id}`);
      console.log("Response data:", res.data);
      if (res.data && res.data.profile_picture) {
        console.log("Setting profile picture to:", res.data.profile_picture);
        setProfilePicture(`http://localhost:5000/uploads/${res.data.profile_picture}`);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      setProfilePicture(null);
    }
  };


  useEffect(() => {
    if (personID) {
      fetchProfilePicture(personID);
    }
  }, [personID]);

  // State for applicants
  const [applicants, setApplicants] = useState([]);

  // State for new applicant entry
  const [newApplicant, setNewApplicant] = useState({
    id: "",
    campus: "",
    academicProgram: "",
    classifiedAs: "",
    program: "",
    yearLevel: "",
    lastName: "",
    firstName: "",
    middleName: "",
    extension: "",
    nickname: "",
    height: "",
    weight: "",
    lrnNumber: "",
    gender: "",
    birthOfDate: "",
    age: "",
    birthPlace: "",
    languageDialectSpoken: "",
    citizenship: "",
    religion: "",
    civilStatus: "",
    tribeEthnicGroup: "",
    cellphoneNumber: "",
    emailAddress: "",
    telephoneNumber: "",
    facebookAccount: "",
    presentAddress: "",
    permanentAddress: "",
    street: "",
    barangay: "",
    zipCode: "",
    region: "",
    province: "",
    municipality: "",
    dswdHouseholdNumber: "",

  });

  const steps = [
    { label: 'Personal Information', icon: <PersonIcon />, path: '/applicant' },
    { label: 'Family Background', icon: <FamilyRestroomIcon />, path: '/family_background' },
    { label: 'Educational Attainment', icon: <SchoolIcon />, path: '/educ_attainment' },
    { label: 'Health Medical Records', icon: <HealthAndSafetyIcon />, path: '/health_medical_records' },
    { label: 'Other Information', icon: <InfoIcon />, path: '/other_information' },
  ];






  const [activeStep, setActiveStep] = useState(0);
  const [clickedSteps, setClickedSteps] = useState(Array(steps.length).fill(false));
  const [sameAsPresent, setSameAsPresent] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLrnNA, setIsLrnNA] = useState(false);
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [pwdType, setPwdType] = useState(''); // State for dropdown
  const [id, setId] = useState(''); // State for ID textfield

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // Handle dropdown change
  const handlePwdChange = (event) => {
    setPwdType(event.target.value);
  };

  // Handle ID textfield change
  const handleIdChange = (event) => {
    setId(event.target.value);
  };


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validTypes.includes(file.type)) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreview(null);
      alert('Invalid file type. Please select a JPEG or PNG file.');
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    setUploadedImage(preview); // ✅ Set image to show in outer box
    alert('Upload successful!');
    handleClose();
  };




  const handleNextStep = () => {
    if (step < 5) setStep(step + 1); // Change '5' to total number of steps you have
  };

  // Handler for N/A checkbox
  const handleLrnCheck = (event) => {
    const checked = event.target.checked;
    setIsLrnNA(checked);
    if (checked) {
      setNewApplicant({ ...newApplicant, lrnNumber: "" }); // Clear LRN
    }
  };


  const handleStepClick = (index) => {
    setActiveStep(index);
    const newClickedSteps = [...clickedSteps];
    newClickedSteps[index] = true;
    setClickedSteps(newClickedSteps);
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  useEffect(() => {
    if (sameAsPresent) {
      setNewApplicant((prev) => ({
        ...prev,
        permanentAddress: prev.presentAddress || "",
        barangay: prev.barangay || "",
        zipCode: prev.zipCode || "",
        region: prev.region || "",
        province: prev.province || "",
        municipality: prev.municipality || "",
        dswdHouseholdNumber: prev.dswdHouseholdNumber || "",
      }));
    }
  }, [sameAsPresent, newApplicant.presentAddress, newApplicant.barangay, newApplicant.zipCode, newApplicant.region, newApplicant.province, newApplicant.municipality, newApplicant.dswdHouseholdNumber]);



  const region1Municipalities = [
    // Ilocos Norte
    "Adams", "Bacarra", "Badoc", "Bangui", "Banna", "Batac City", "Burgos", "Carasi",
    "Currimao", "Dingras", "Dumalneg", "Laoag City", "Marcos", "Nueva Era", "Pagudpud",
    "Paoay", "Pasuquin", "Piddig", "Pinili", "San Nicolas", "Sarrat", "Solsona", "Vintar",

    // Ilocos Sur
    "Alilem", "Banayoyo", "Bantay", "Burgos", "Cabugao", "Candon City", "Caoayan", "Cervantes",
    "Galimuyod", "Gregorio del Pilar", "Lidlidda", "Magsingal", "Nagbukel", "Narvacan",
    "Quirino", "Salcedo", "San Emilio", "San Esteban", "San Ildefonso", "San Juan",
    "San Vicente", "Santa", "Santa Catalina", "Santa Cruz", "Santa Lucia", "Santa Maria",
    "Santiago", "Santo Domingo", "Sigay", "Sinait", "Sugpon", "Suyo", "Tagudin", "Vigan City",

    // La Union
    "Agoo", "Aringay", "Bacnotan", "Bagulin", "Balaoan", "Bangar", "Bauang", "Burgos",
    "Caba", "Luna", "Naguilian", "Pugo", "Rosario", "San Fernando City", "San Gabriel",
    "San Juan", "Santo Tomas", "Santol", "Sudipen", "Tubao",

    // Pangasinan
    "Agno", "Aguilar", "Alaminos City", "Anda", "Asingan", "Balungao", "Bani", "Basista",
    "Bautista", "Bayambang", "Binalonan", "Binmaley", "Bolinao", "Bugallon", "Burgos",
    "Calasiao", "Dagupan City", "Dasol", "Infanta", "Labrador", "Laoac", "Lingayen",
    "Mabini", "Malasiqui", "Manaoag", "Mangaldan", "Mangatarem", "Mapandan", "Natividad",
    "Pozorrubio", "Rosales", "San Carlos City", "San Fabian", "San Jacinto", "San Manuel",
    "San Nicolas", "San Quintin", "Santa Barbara", "Santa Maria", "Santo Tomas",
    "Sison", "Sual", "Tayug", "Umingan", "Urbiztondo", "Urdaneta City", "Villasis"
  ];

  const [selectedMunicipality, setSelectedMunicipality] = useState('');





  return (

    <Container>
      <h1 style={{ textAlign: "center", color: "maroon", marginTop: "75px" }}>APPLICANT FORM</h1>
      <div style={{ textAlign: "Center", }}>Complete the applicant form to secure your place for the upcoming academic year at EARIST.</div>
      < br />
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', px: 4 }}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Wrap the step with Link for routing */}
            <Link to={step.path} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleStepClick(index)}
              >
                {/* Step Icon */}
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: activeStep === index ? '#6D2323' : '#E8C999',
                    color: activeStep === index ? '#fff' : '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {step.icon}
                </Box>

                {/* Step Label */}
                <Typography
                  sx={{
                    mt: 1,
                    color: activeStep === index ? '#6D2323' : '#000',
                    fontWeight: activeStep === index ? 'bold' : 'normal',
                    fontSize: 14,
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
            </Link>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  height: '2px',
                  backgroundColor: '#6D2323',
                  flex: 1,
                  alignSelf: 'center',
                  mx: 2,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>



      < br />
      <form>
        <Container maxWidth="100%" sx={{ backgroundColor: "#6D2323", color: "white", borderRadius: 2, boxShadow: 3, padding: "4px", }}>
          <Box sx={{ width: "100%", }}>
            <Typography style={{ fontSize: "20px", padding: "10px", fontFamily: "Arial Black" }}>Step 1: Personal Information</Typography>
          </Box>
        </Container>
        <Container maxWidth="100%" sx={{ backgroundColor: "white", padding: 4, borderRadius: 2, boxShadow: 3 }}>


          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Personal Information</Typography>
          <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />



          <Box display="flex" alignItems="center" mb={2}>
            <Typography style={{ fontSize: "13px", marginRight: "10px", minWidth: "150px" }}>
              Campus: <span style={{ color: "red" }}>*</span>
            </Typography>

            {students.map((student) => (
              <FormControl sx={{ width: "100%" }} size="small" key={student.person_id}>
                <InputLabel id={`campus-label-${student.person_id}`}>
                  Campus (Manila/Cavite)
                </InputLabel>
                <Select
                  labelId={`campus-label-${student.person_id}`}
                  id={`campus-select-${student.person_id}`}
                  value={student.campus ?? ""} // fallback if null or undefined
                  label="Campus (Manila/Cavite)"
                  onChange={(e) => {
                    const updatedCampus = e.target.value;
                    const updatedStudent = { ...student, campus: updatedCampus };

                    // Update local state
                    setStudents((prevStudents) =>
                      prevStudents.map((s) =>
                        s.person_id === student.person_id ? updatedStudent : s
                      )
                    );

                    // Immediately update the backend
                    updateItem(updatedStudent);
                  }}
                  required
                >
                  <MenuItem value={0}>MANILA</MenuItem>
                  <MenuItem value={1}>CAVITE</MenuItem>
                </Select>
              </FormControl>
            ))}

          </Box>


          <Box display="flex" alignItems="center" mb={2}>
            <Typography style={{ fontSize: "13px", marginRight: "10px", minWidth: "150px" }}>
              Academic Program: <span style={{ color: "red" }}>*</span>
            </Typography>
            {students.map((student) => (
              <FormControl sx={{ width: "100%" }} size="small" required key={student.person_id}>
                <InputLabel id={`academic-program-label-${student.person_id}`}>
                  Select Academic Program
                </InputLabel>
                <Select
                  labelId={`academic-program-label-${student.person_id}`}
                  id={`academic-program-select-${student.person_id}`}
                  value={student.academicProgram || ""}
                  label="Select Academic Program"
                  onChange={(e) => {
                    const updatedProgram = e.target.value;
                    const updatedStudent = { ...student, academicProgram: updatedProgram };

                    // Update local state
                    setStudents((prevStudents) =>
                      prevStudents.map((s) =>
                        s.person_id === student.person_id ? updatedStudent : s
                      )
                    );

                    // Immediately update backend
                    updateItem(updatedStudent);
                  }}
                >
                  <MenuItem value="Techvoc">Techvoc</MenuItem>
                  <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                  <MenuItem value="Graduate">Graduate</MenuItem>
                </Select>
              </FormControl>
            ))}


          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography style={{ fontSize: "13px", marginRight: "10px", minWidth: "150px" }}>
              Classified As: <span style={{ color: "red" }}>*</span>
            </Typography>
            {students.map((student) => (
              <FormControl sx={{ width: "100%" }} size="small" required key={student.person_id}>
                <InputLabel id={`classified-as-label-${student.person_id}`}>
                  Select Classification
                </InputLabel>
                <Select
                  labelId={`classified-as-label-${student.person_id}`}
                  id={`classified-as-select-${student.person_id}`}
                  value={student.classifiedAs || ""}
                  label="Select Classification"
                  onChange={(e) => {
                    const updatedClassification = e.target.value;
                    const updatedStudent = { ...student, classifiedAs: updatedClassification };

                    // Update local state
                    setStudents((prevStudents) =>
                      prevStudents.map((s) =>
                        s.person_id === student.person_id ? updatedStudent : s
                      )
                    );

                    // Immediately update backend
                    updateItem(updatedStudent);
                  }}
                >
                  <MenuItem value="Freshman (First Year)">Freshman (First Year)</MenuItem>
                  <MenuItem value="Transferee">Transferee</MenuItem>
                  <MenuItem value="Returnee">Returnee</MenuItem>
                  <MenuItem value="Shiftee">Shiftee</MenuItem>
                  <MenuItem value="Foreign Student">Foreign Student</MenuItem>
                </Select>
              </FormControl>
            ))}

          </Box>



          <Box display="flex" mb={2}>
            {/* Left Side: Program and Year Level Inputs */}
            <Box flex={1}>
              {/* Program Input */}
              <Box display="flex" alignItems="center" mb={2}>
                <Typography
                  style={{
                    fontSize: "13px",
                    marginRight: "10px",
                    minWidth: "150px",
                  }}
                >
                  Program: <span style={{ color: "red" }}>*</span>
                </Typography>
                {students.map((student) => (
                  <FormControl sx={{ width: "80%" }} size="small" key={student.person_id}>
                    <InputLabel id={`program-label-${student.person_id}`}>
                      Select Program
                    </InputLabel>
                    <Select
                      labelId={`program-label-${student.person_id}`}
                      id={`program-select-${student.person_id}`}
                      value={student.program || ""}
                      label="Select Program"
                      onChange={(e) => {
                        const updatedProgram = e.target.value;
                        const updatedStudent = { ...student, program: updatedProgram };

                        // Update local state
                        setStudents((prevStudents) =>
                          prevStudents.map((s) =>
                            s.person_id === student.person_id ? updatedStudent : s
                          )
                        );

                        // Immediately update backend
                        updateItem(updatedStudent);
                      }}
                    >
                      <ListSubheader style={{ textAlign: "center", color: "maroon" }}>
                        COLLEGE OF ARCHITECTURE AND FINE ARTS
                      </ListSubheader>
                      <MenuItem value="Bachelor of Science in Architecture (BS ARCHI.)">
                        Bachelor of Science in Architecture (BS ARCHI.)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Interior Design (BSID)">
                        Bachelor of Science in Interior Design (BSID)
                      </MenuItem>
                      <MenuItem value="Bachelor in Fine Arts (BFA) - Painting">
                        Bachelor in Fine Arts (BFA) - Painting
                      </MenuItem>
                      <MenuItem value="Bachelor in Fine Arts (BFA) - Visual Communication">
                        Bachelor in Fine Arts (BFA) - Visual Communication
                      </MenuItem>

                      <ListSubheader style={{ textAlign: "center", color: "maroon" }}>
                        COLLEGE OF ARTS AND SCIENCES
                      </ListSubheader>
                      <MenuItem value="Bachelor of Science in Applied Physics w/ Comp. Sci. Emphasis (BSAP)">
                        Bachelor of Science in Applied Physics w/ Comp. Sci. Emphasis (BSAP)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Psychology (BSPSYCH)">
                        Bachelor of Science in Psychology (BSPSYCH)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Mathematics (BSMATH)">
                        Bachelor of Science in Mathematics (BSMATH)
                      </MenuItem>

                      <ListSubheader style={{ textAlign: "center", color: "maroon" }}>
                        COLLEGE OF COMPUTING STUDIES
                      </ListSubheader>
                      <MenuItem value="Bachelor of Science in Computer Science (BSCS)">
                        Bachelor of Science in Computer Science (BSCS)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Information Technology (BS INFO. TECH.)">
                        Bachelor of Science in Information Technology (BS INFO. TECH.)
                      </MenuItem>

                      <ListSubheader style={{ textAlign: "center", color: "maroon" }}>
                        COLLEGE OF BUSINESS ADMINISTRATION
                      </ListSubheader>
                      <MenuItem value="BSBA - Marketing Management">
                        BSBA - Marketing Management
                      </MenuItem>
                      <MenuItem value="BSBA - Human Resource Dev't Management (HRDM)">
                        BSBA - Human Resource Dev't Management (HRDM)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Entrepreneurship (BSEM)">
                        Bachelor of Science in Entrepreneurship (BSEM)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Office Administration (BSOA)">
                        Bachelor of Science in Office Administration (BSOA)
                      </MenuItem>

                      <ListSubheader style={{ textAlign: "center", color: "maroon" }}>
                        COLLEGE OF EDUCATIONS
                      </ListSubheader>
                      <MenuItem value="Bachelor in Secondary Education - Science">
                        Bachelor in Secondary Education - Science
                      </MenuItem>
                      <MenuItem value="Bachelor in Secondary Education - Mathematics">
                        Bachelor in Secondary Education - Mathematics
                      </MenuItem>
                      <MenuItem value="Bachelor in Secondary Education - Filipino">
                        Bachelor in Secondary Education - Filipino
                      </MenuItem>
                      <MenuItem value="Bachelor in Special Needs Education (BSNEd)">
                        Bachelor in Special Needs Education (BSNEd)
                      </MenuItem>
                      <MenuItem value="BTLE - Home Economics">BTLE - Home Economics</MenuItem>
                      <MenuItem value="BTLE - Industrial Arts">BTLE - Industrial Arts</MenuItem>
                      <MenuItem value="Professional Education / Subjects 18 units (TCP)">
                        Professional Education / Subjects 18 units (TCP)
                      </MenuItem>

                      <ListSubheader style={{ textAlign: "center", color: "maroon" }}>
                        COLLEGE OF ENGINEERING
                      </ListSubheader>
                      <MenuItem value="Bachelor of Science in Chemical Engineering (BSCHE)">
                        Bachelor of Science in Chemical Engineering (BSCHE)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Civil Engineering (BSCE)">
                        Bachelor of Science in Civil Engineering (BSCE)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Electrical Engineering (BSEE)">
                        Bachelor of Science in Electrical Engineering (BSEE)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Electronics and Communication Eng (BSECE)">
                        Bachelor of Science in Electronics and Communication Eng (BSECE)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Mechanical Engineering (BSME)">
                        Bachelor of Science in Mechanical Engineering (BSME)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Computer Engineering (BSCOE)">
                        Bachelor of Science in Computer Engineering (BSCOE)
                      </MenuItem>

                      <ListSubheader style={{ textAlign: "center", color: "maroon" }}>
                        COLLEGE OF HOSPITALITY MANAGEMENT (CHTM)
                      </ListSubheader>
                      <MenuItem value="Bachelor of Science in Tourism Management (BST)">
                        Bachelor of Science in Tourism Management (BST)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Hospitality Management (BSHM)">
                        Bachelor of Science in Hospitality Management (BSHM)
                      </MenuItem>

                      <ListSubheader style={{ textAlign: "center", color: "maroon" }}>
                        COLLEGE OF INDUSTRIAL TECHNOLOGY
                      </ListSubheader>
                      <MenuItem value="BSIT - Automotive Technology">
                        BSIT - Automotive Technology
                      </MenuItem>
                      <MenuItem value="BSIT - Electrical Technology">
                        BSIT - Electrical Technology
                      </MenuItem>
                      <MenuItem value="BSIT - Electronics Technology">
                        BSIT - Electronics Technology
                      </MenuItem>
                      <MenuItem value="BSIT - Food Technology">
                        BSIT - Food Technology
                      </MenuItem>
                      <MenuItem value="BSIT - Fashion and Apparel Technology">
                        BSIT - Fashion and Apparel Technology
                      </MenuItem>
                      <MenuItem value="BSIT - Industrial Chemistry">
                        BSIT - Industrial Chemistry
                      </MenuItem>
                      <MenuItem value="BSIT - Drafting Technology">
                        BSIT - Drafting Technology
                      </MenuItem>
                      <MenuItem value="BSIT - Machine Shop Technology">
                        BSIT - Machine Shop Technology
                      </MenuItem>
                      <MenuItem value="BSIT - Refrigeration and Air Conditioning">
                        BSIT - Refrigeration and Air Conditioning
                      </MenuItem>

                      <ListSubheader style={{ textAlign: "center", color: "maroon" }}>
                        COLLEGE OF PUBLIC ADMINISTRATION AND CRIMINOLOGY
                      </ListSubheader>
                      <MenuItem value="Bachelor in Public Administration (BPA)">
                        Bachelor in Public Administration (BPA)
                      </MenuItem>
                      <MenuItem value="Bachelor of Science in Criminology (BSCRIM)">
                        Bachelor of Science in Criminology (BSCRIM)
                      </MenuItem>
                    </Select>
                  </FormControl>
                ))}

              </Box>


              < br />
              < br />
              < br />



              {/* Year Level Dropdown */}
              <Box display="flex" alignItems="center" mb={2}>
                <Typography style={{ fontSize: "15px", marginRight: "10px", minWidth: "150px" }}>
                  Year Level: <span style={{ color: "red" }}>*</span>
                </Typography>
                {students.map((student) => (
                  <FormControl sx={{ width: "80%" }} size="small" key={student.person_id}>
                    <InputLabel id={`year-level-label-${student.person_id}`}>
                      Select Year Level
                    </InputLabel>
                    <Select
                      labelId={`year-level-label-${student.person_id}`}
                      id={`year-level-select-${student.person_id}`}
                      value={student.yearLevel || ""}
                      label="Select Year Level"
                      onChange={(e) => {
                        const updatedYearLevel = e.target.value;
                        const updatedStudent = { ...student, yearLevel: updatedYearLevel };

                        // Update local state
                        setStudents((prevStudents) =>
                          prevStudents.map((s) =>
                            s.person_id === student.person_id ? updatedStudent : s
                          )
                        );

                        // Immediately update backend
                        updateItem(updatedStudent);
                      }}
                    >
                      <MenuItem value="First Year">First Year</MenuItem>
                      <MenuItem value="Second Year">Second Year</MenuItem>
                      <MenuItem value="Third Year">Third Year</MenuItem>
                      <MenuItem value="Fourth Year">Fourth Year</MenuItem>
                      <MenuItem value="Fifth Year">Fifth Year</MenuItem>
                    </Select>
                  </FormControl>
                ))}

              </Box>

            </Box>
            {applicants.map((applicant) => (
              <div
                key={applicant.id}
                onClick={() => setPersonID(applicant.person_id)}
                style={{
                  border: personID === applicant.person_id ? '2px solid blue' : '1px solid gray',
                  textAlign: 'center',
                  border: '1px solid black',
                  width: '5.08cm',
                  height: '5.08cm',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  ml: 2,
                  position: 'relative',
                }}
              >

                {/* Display image if profile_picture exists */}
                {applicant.profile_picture ? (
                  <img
                    src={`http://localhost:5000/uploads/${applicant.profile_picture}`}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <p>No profile picture available.</p>
                )}
              </div>
            ))}

          </Box>




          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Person Details:</Typography>
          <hr style={{ border: "1px solid #ccc", width: "100%" }} />
          <br />
          <Box display="flex" width="100%" alignItems="flex-start" gap={1} mb={2}>
            {/* Label beside Last Name */}
            <Box minWidth="100px" mt={1.5}>
              <Typography fontSize="15px">
                <strong>
                  Name: <span style={{ color: "red" }}>*</span>
                </strong>
              </Typography>
            </Box>

            {/* Student Input Fields */}
            <Box width="100%">
              {students.map((student) => (
                <Box
                  key={student.person_id}
                  display="flex"
                  gap={2}
                  flexWrap="wrap"
                  mb={2}
                  width="100%"
                >
                  {/* Last Name */}
                  <Box width="19%">
                    <TextField
                      label="Enter Last Name"
                      required
                      sx={{ width: "85%" }}
                      size="small"
                      value={student.lastName || ""}
                      onChange={(e) => {
                        const updatedStudent = { ...student, lastName: e.target.value };
                        setStudents((prev) =>
                          prev.map((s) =>
                            s.person_id === student.person_id ? updatedStudent : s
                          )
                        );
                        updateItem(updatedStudent);
                      }}
                    />
                    <Typography variant="caption">FAMILY NAME</Typography>
                  </Box>

                  {/* First Name */}
                  <Box width="19%">
                    <TextField
                      label="Enter First Name"
                      required
                      sx={{ width: "85%" }}
                      size="small"
                      value={student.firstName || ""}
                      onChange={(e) => {
                        const updatedStudent = { ...student, firstName: e.target.value };
                        setStudents((prev) =>
                          prev.map((s) =>
                            s.person_id === student.person_id ? updatedStudent : s
                          )
                        );
                        updateItem(updatedStudent);
                      }}
                    />
                    <Typography variant="caption">GIVEN NAME</Typography>
                  </Box>

                  {/* Middle Name */}
                  <Box width="19%">
                    <TextField
                      label="Enter Middle Name"
                      required
                      sx={{ width: "85%" }}
                      size="small"
                      value={student.middleName || ""}
                      onChange={(e) => {
                        const updatedStudent = { ...student, middleName: e.target.value };
                        setStudents((prev) =>
                          prev.map((s) =>
                            s.person_id === student.person_id ? updatedStudent : s
                          )
                        );
                        updateItem(updatedStudent);
                      }}
                    />
                    <Typography variant="caption">MIDDLE NAME</Typography>
                  </Box>

                  {/* Extension */}
                  <Box width="10%">
                    <FormControl sx={{ width: "85%" }} size="small">
                      <InputLabel id={`extension-label-${student.person_id}`}>EXT.</InputLabel>
                      <Select
                        labelId={`extension-label-${student.person_id}`}
                        id={`extension-select-${student.person_id}`}
                        value={student.extension || ""}
                        label="EXT."
                        onChange={(e) => {
                          const updatedStudent = { ...student, extension: e.target.value };
                          setStudents((prev) =>
                            prev.map((s) =>
                              s.person_id === student.person_id ? updatedStudent : s
                            )
                          );
                          updateItem(updatedStudent);
                        }}
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Jr.">Jr.</MenuItem>
                        <MenuItem value="Sr.">Sr.</MenuItem>
                        <MenuItem value="I">I</MenuItem>
                        <MenuItem value="II">II</MenuItem>
                        <MenuItem value="III">III</MenuItem>
                        <MenuItem value="IV">IV</MenuItem>
                        <MenuItem value="V">V</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography variant="caption">EXTENSION</Typography>
                  </Box>

                  {/* Nickname */}
                  <Box width="19%">
                    <TextField
                      label="Enter Nickname"
                      sx={{ width: "85%" }}
                      size="small"
                      value={student.nickname || ""}
                      onChange={(e) => {
                        const updatedStudent = { ...student, nickname: e.target.value };
                        setStudents((prev) =>
                          prev.map((s) =>
                            s.person_id === student.person_id ? updatedStudent : s
                          )
                        );
                        updateItem(updatedStudent);
                      }}
                    />
                    <Typography variant="caption">NICKNAME</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {students.map((student) => (
            <Box key={student.person_id} display="flex" alignItems="center" mb={2}>
              <Typography style={{ fontSize: "12px", marginRight: "20px" }}>
                Height:
              </Typography>
              <TextField
                required
                value={student.height || ""}
                onChange={(e) => {
                  const updatedStudent = { ...student, height: e.target.value };
                  setStudents((prev) =>
                    prev.map((s) =>
                      s.person_id === student.person_id ? updatedStudent : s
                    )
                  );
                  updateItem(updatedStudent);
                }}
                sx={{ width: "10%", marginRight: "10px" }}
                size="small"
              />
              cm.
              <span style={{ marginRight: "20px" }}></span>

              <Typography style={{ fontSize: "12px", marginRight: "20px" }}>
                Weight:
              </Typography>
              <TextField
                required
                value={student.weight || ""}
                onChange={(e) => {
                  const updatedStudent = { ...student, weight: e.target.value };
                  setStudents((prev) =>
                    prev.map((s) =>
                      s.person_id === student.person_id ? updatedStudent : s
                    )
                  );
                  updateItem(updatedStudent);
                }}
                sx={{ width: "10%", marginRight: "10px" }}
                size="small"
              />
              kg
            </Box>
          ))}







          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography style={{ fontSize: "13px", marginRight: "10px" }}>
              Learning Reference Number:
            </Typography>

            <TextField
              label="Enter your LRN"
              required
              value={data[0]?.lrnNumber || ""}
              onChange={(e) =>
                setNewApplicant({ ...newApplicant, lrnNumber: e.target.value })
              }
              sx={{ width: "15%" }}  // Adjusted width to fit on one line
              size="small"
              disabled={isLrnNA} // Disable when checkbox is checked
            />

            <FormControlLabel
              control={<Checkbox checked={isLrnNA} onChange={handleLrnCheck} />}
              label="N/A"
            />

            {/* Gender */}
            <Typography style={{ fontSize: "13px", marginRight: "10px" }}>
              Gender: <span style={{ color: "red" }}>*</span>
            </Typography>

            {students.map((student) => (
              <FormControl sx={{ width: "15%" }} size="small" key={student.person_id}>
                <InputLabel id={`gender-label-${student.person_id}`}>Select Gender</InputLabel>
                <Select
                  labelId={`gender-label-${student.person_id}`}
                  id={`gender-select-${student.person_id}`}
                  value={student.gender ?? ""}
                  label="Select Gender"
                  onChange={(e) => {
                    const updatedGender = e.target.value;
                    const updatedStudent = { ...student, gender: updatedGender };

                    // Update local state
                    setStudents((prevStudents) =>
                      prevStudents.map((s) =>
                        s.person_id === student.person_id ? updatedStudent : s
                      )
                    );

                    // Immediately update backend
                    updateItem(updatedStudent);
                  }}
                >
                  <MenuItem value={0}>MALE</MenuItem>
                  <MenuItem value={1}>FEMALE</MenuItem>
                </Select>
              </FormControl>
            ))}



            {/* PWD */}
            <FormControlLabel
              control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
              label="PWD"
            />

            {isChecked && (
              <Box display="flex" gap={2}>
                {/* Dropdown for PWD Type */}
                <FormControl variant="outlined" sx={{ width: "50%" }} size="small">
                  <InputLabel>Choose PWD Type</InputLabel>
                  <Select
                    value={data[0]?.pwdType || ""}
                    onChange={handlePwdChange}
                    label="Choose PWD Type"
                  >
                    <MenuItem value="Blindness">Blindness</MenuItem>
                    <MenuItem value="Low-vision">Low-vision</MenuItem>
                    <MenuItem value="Leprosy Cured persons">Leprosy Cured persons</MenuItem>
                    <MenuItem value="Hearing Impairment">Hearing Impairment</MenuItem>
                    <MenuItem value="Locomotor Disability">Locomotor Disability</MenuItem>
                    <MenuItem value="Dwarfism">Dwarfism</MenuItem>
                    <MenuItem value="Intellectual Disability">Intellectual Disability</MenuItem>
                    <MenuItem value="Mental Illness">Mental Illness</MenuItem>
                    <MenuItem value="Autism Spectrum Disorder">Autism Spectrum Disorder</MenuItem>
                    <MenuItem value="Cerebral Palsy">Cerebral Palsy</MenuItem>
                    <MenuItem value="Muscular Dystrophy">Muscular Dystrophy</MenuItem>
                    <MenuItem value="Chronic Neurological conditions">Chronic Neurological conditions</MenuItem>
                    <MenuItem value="Specific Learning Disabilities">Specific Learning Disabilities</MenuItem>
                    <MenuItem value="Multiple Sclerosis">Multiple Sclerosis</MenuItem>
                    <MenuItem value="Speech and Language disability">Speech and Language disability</MenuItem>
                    <MenuItem value="Thalassemia">Thalassemia</MenuItem>
                    <MenuItem value="Hemophilia">Hemophilia</MenuItem>
                    <MenuItem value="Sickle cell disease">Sickle cell disease</MenuItem>
                    <MenuItem value="Multiple Disabilities including">Multiple Disabilities including</MenuItem>
                  </Select>
                </FormControl>



                {/* ID Textfield */}
                <TextField
                  label="PWD ID"
                  variant="outlined"
                  size="small"
                  value={data[0]?.pwdId || ""}
                  onChange={handleIdChange}
                  sx={{ width: "50%" }}
                />
              </Box>
            )}
          </Box>

          {students.map((student) => (
            <Box key={student.person_id} display="flex" gap={2} mb={2}>
              {/* Birthdate Field */}
              <Box display="flex" flexDirection="column" style={{ width: "50%" }}>
                <Typography style={{ fontSize: "12px", marginBottom: "5px" }}>
                  Birth of Date:
                </Typography>
                <TextField
                  label="Select Birthdate"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  required
                  style={{ width: "100%" }}
                  value={student.birthOfDate || ""}
                  onChange={(e) => {
                    const updatedStudent = { ...student, birthOfDate: e.target.value };
                    setStudents((prev) =>
                      prev.map((s) =>
                        s.person_id === student.person_id ? updatedStudent : s
                      )
                    );
                    updateItem(updatedStudent); // Optional: if you're syncing with backend
                  }}
                />
              </Box>

              {/* Age Field */}
              <Box display="flex" flexDirection="column" style={{ width: "50%" }}>
                <Typography style={{ fontSize: "13px", marginBottom: "5px" }}>
                  Age:
                </Typography>
                <TextField
                  label="Enter your Age"
                  required
                  style={{ width: "100%" }}
                  size="small"
                  value={student.age || ""}
                  onChange={(e) => {
                    const updatedStudent = { ...student, age: e.target.value };
                    setStudents((prev) =>
                      prev.map((s) =>
                        s.person_id === student.person_id ? updatedStudent : s
                      )
                    );
                    updateItem(updatedStudent); // Optional: if you're syncing with backend
                  }}
                />
              </Box>
            </Box>
          ))}

          {students.map((student) => (
            <Box key={student.person_id} display="flex" alignItems="center" gap={2} mb={2}>
              {/* Birth Place Field */}
              <Box display="flex" flexDirection="column" style={{ width: "50%" }}>
                <Typography style={{ fontSize: "12px", marginBottom: "5px" }}>
                  Birth Place:
                </Typography>
                <TextField
                  label="Enter your Birth Place"
                  required
                  value={student.birthPlace || ""}
                  onChange={(e) => {
                    const updatedStudent = { ...student, birthPlace: e.target.value };
                    setStudents((prev) =>
                      prev.map((s) =>
                        s.person_id === student.person_id ? updatedStudent : s
                      )
                    );
                    updateItem(updatedStudent); // Optional: if you're syncing with backend
                  }}
                  sx={{ width: "100%" }}
                  size="small"
                />
              </Box>

              {/* Language Dialect Spoken Field */}
              <Box display="flex" flexDirection="column" style={{ width: "50%" }}>
                <Typography style={{ fontSize: "12px", marginBottom: "5px" }}>
                  Language Dialect Spoken:
                </Typography>
                <TextField
                  label="Enter your Language Dialect Spoken"
                  required
                  value={student.languageDialectSpoken || ""}
                  onChange={(e) => {
                    const updatedStudent = { ...student, languageDialectSpoken: e.target.value };
                    setStudents((prev) =>
                      prev.map((s) =>
                        s.person_id === student.person_id ? updatedStudent : s
                      )
                    );
                    updateItem(updatedStudent); // Optional: if you're syncing with backend
                  }}
                  sx={{ width: "100%" }}
                  size="small"
                />
              </Box>
            </Box>
          ))}



          {students.map((student) => (
            <Box key={student.person_id} display="flex" alignItems="center" gap={2} mb={2}>
              {/* Citizenship Field */}
              <FormControl sx={{ width: "50%" }} size="small" required>
                <Typography style={{ fontSize: "12px", marginBottom: "5px" }}>
                  Citizenship:
                </Typography>
                <Select
                  value={student.citizenship || ""}
                  onChange={(e) => {
                    const updatedStudent = { ...student, citizenship: e.target.value };
                    setStudents((prev) =>
                      prev.map((s) => (s.person_id === student.person_id ? updatedStudent : s))
                    );
                    updateItem(updatedStudent);
                  }}
                >
                  <MenuItem value="">- Select Citizenship -</MenuItem>
                  {[
                    "AFGHAN", "ALBANIAN", "ARAB", "ARGENTINIAN", "AUSTRALIAN", "AUSTRIAN", "BELGIAN", "BANGLADESHI", "BAHAMIAN",
                    "BHUTANESE", "BERMUDAN", "BOLIVIAN", "BRAZILIAN", "BRUNEI", "BOTSWANIAN", "CANADIAN", "CHILE", "CHINESE",
                    "COLOMBIAN", "COSTA RICAN", "CUBAN", "CYPRIOT", "CZECH", "DANISH", "DOMINICAN", "ALGERIAN", "EGYPTIAN",
                    "SPANISH", "ESTONIAN", "ETHIOPIAN", "FIJI", "FILIPINO", "FINISH", "FRENCH", "BRITISH", "GERMAN", "GHANAIAN",
                    "GREEK", "GUAMANIAN", "GUATEMALAN", "HONG KONG", "CROATIAN", "HAITIAN", "HUNGARIAN", "INDONESIAN", "INDIAN",
                    "IRANIAN", "IRAQI", "IRISH", "ICELANDER", "ISRAELI", "ITALIAN", "JAMAICAN", "JORDANIAN", "JAPANESE", "CAMBODIAN",
                    "KOREAN", "KUWAITI", "KENYAN", "LAOTIAN", "LEBANESE", "LIBYAN", "LUXEMBURGER", "MALAYSIAN", "MOROCCAN", "MEXICAN",
                    "BURMESE", "MYANMAR", "NIGERIAN", "NOT INDICATED", "DUTCH", "NORWEGIAN", "NEPALI", "NEW ZEALANDER", "OMANI",
                    "PAKISTANI", "PANAMANIAN", "PERUVIAN", "PAPUAN", "POLISH", "PUERTO RICAN", "PORTUGUESE", "PARAGUAYAN",
                    "PALESTINIAN", "QATARI", "ROMANIAN", "RUSSIAN", "RWANDAN", "SAUDI ARABIAN", "SUDANESE", "SINGAPOREAN",
                    "SRI LANKAN", "EL SALVADORIAN", "SOMALIAN", "SLOVAK", "SWEDISH", "SWISS", "SYRIAN", "THAI", "TRINIDAD AND TOBAGO",
                    "TUNISIAN", "TURKISH", "TAIWANESE", "UKRAINIAN", "URUGUAYAN", "UNITED STATES", "VENEZUELAN", "VIRGIN ISLANDS",
                    "VIETNAMESE", "YEMENI", "YUGOSLAVIAN", "SOUTH AFRICAN", "ZAIREAN", "ZIMBABWEAN", "Others"
                  ].map((nation) => (
                    <MenuItem key={nation} value={nation}>{nation}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Religion Field */}
              <FormControl sx={{ width: "50%" }} size="small" required>
                <Typography style={{ fontSize: "12px", marginBottom: "5px" }}>
                  Religion:
                </Typography>
                <Select
                  value={student.religion || ""}
                  onChange={(e) => {
                    const updatedStudent = { ...student, religion: e.target.value };
                    setStudents((prev) =>
                      prev.map((s) => (s.person_id === student.person_id ? updatedStudent : s))
                    );
                    updateItem(updatedStudent);
                  }}
                >
                  <MenuItem value="">- Select Religion -</MenuItem>
                  {[
                    "Jehovah's Witness", "Buddist", "Catholic", "Dating Daan", "Pagano", "Atheist", "Born Again",
                    "Adventis", "Baptist", "Mormons", "Free Methodist", "Christian", "Protestant", "Aglipay", "Islam",
                    "LDS", "Seventh Day Adventist", "Iglesia Ni Cristo", "UCCP", "PMCC", "Baha'i Faith", "None", "Others"
                  ].map((religion) => (
                    <MenuItem key={religion} value={religion}>{religion}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}





          <Box display="flex" alignItems="center" gap={2} mb={2}>
            {/* Civil Status */}

            {students.map((student) => (
              <FormControl sx={{ width: "33%" }} size="small" key={`civil-${student.person_id}`}>
                <InputLabel id={`civil-status-label-${student.person_id}`}>Civil Status</InputLabel>
                <Select
                  labelId={`civil-status-label-${student.person_id}`}
                  id={`civil-status-select-${student.person_id}`}
                  value={student.civilStatus || ""}
                  label="Civil Status"
                  onChange={(e) => {
                    const updatedCivilStatus = e.target.value;
                    const updatedStudents = [...students];
                    const studentIndex = updatedStudents.findIndex((s) => s.person_id === student.person_id);
                    if (studentIndex !== -1) {
                      updatedStudents[studentIndex] = { ...updatedStudents[studentIndex], civilStatus: updatedCivilStatus };
                    }
                    setStudents(updatedStudents);
                    updateItem(updatedStudents[studentIndex]);
                  }}
                >
                  <MenuItem value="-civil status-">- civil status -</MenuItem>
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Legally Seperated">Legally Seperated</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                  <MenuItem value="Solo Parent">Solo Parent</MenuItem>
                </Select>
              </FormControl>
            ))}




            {students.map((student) => (
              <FormControl sx={{ width: "33%" }} size="small" key={student.person_id}>
                <InputLabel id={`ethnic-group-label-${student.person_id}`}>Select Tribe / Ethnic Group</InputLabel>
                <Select
                  labelId={`ethnic-group-label-${student.person_id}`}
                  id={`ethnic-group-select-${student.person_id}`}
                  value={student.tribeEthnicGroup || ""}
                  label="Select Tribe / Ethnic Group"
                  onChange={(e) => {
                    const updatedTribeEthnicGroup = e.target.value;
                    const updatedStudents = [...students]; // Create a copy of the students array
                    const studentIndex = updatedStudents.findIndex((s) => s.person_id === student.person_id);

                    if (studentIndex !== -1) {
                      updatedStudents[studentIndex] = { ...updatedStudents[studentIndex], tribeEthnicGroup: updatedTribeEthnicGroup };
                    }

                    // Update local state
                    setStudents(updatedStudents);

                    // Immediately update backend
                    updateItem(updatedStudents[studentIndex]);
                  }}
                >
                  <MenuItem value="Agta">Agta</MenuItem>
                  <MenuItem value="Agutaynen">Agutaynen</MenuItem>
                  <MenuItem value="Aklanon">Aklanon</MenuItem>
                  <MenuItem value="Alangan">Alangan</MenuItem>
                  <MenuItem value="Alta">Alta</MenuItem>
                  <MenuItem value="Amersian">Amersian</MenuItem>
                  <MenuItem value="Ati">Ati</MenuItem>
                  <MenuItem value="Atta">Atta</MenuItem>
                  <MenuItem value="Ayta">Ayta</MenuItem>
                  <MenuItem value="B'laan">B'laan</MenuItem>
                  <MenuItem value="Badjao">Badjao</MenuItem>
                  <MenuItem value="Bagobo">Bagobo</MenuItem>
                  <MenuItem value="Balangao">Balangao</MenuItem>
                  <MenuItem value="Balangingi">Balangingi</MenuItem>
                  <MenuItem value="Bangon">Bangon</MenuItem>
                  <MenuItem value="Bantoanon">Bantoanon</MenuItem>
                  <MenuItem value="Banwaon">Banwaon</MenuItem>
                  <MenuItem value="Batak">Batak</MenuItem>
                  <MenuItem value="Bicolano">Bicolano</MenuItem>
                  <MenuItem value="Binukid">Binukid</MenuItem>
                  <MenuItem value="Bohalano">Bohalano</MenuItem>
                  <MenuItem value="Bolinao">Bolinao</MenuItem>
                  <MenuItem value="Bontoc">Bontoc</MenuItem>
                  <MenuItem value="Buhid">Buhid</MenuItem>
                  <MenuItem value="Butuanon">Butuanon</MenuItem>
                  <MenuItem value="Cagyanen">Cagyanen</MenuItem>
                  <MenuItem value="Caray-a">Caray-a</MenuItem>
                  <MenuItem value="Cebuano">Cebuano</MenuItem>
                  <MenuItem value="Cuyunon">Cuyunon</MenuItem>
                  <MenuItem value="Dasen">Dasen</MenuItem>
                  <MenuItem value="Ilocano">Ilocano</MenuItem>
                  <MenuItem value="Ilonggo">Ilonggo</MenuItem>
                  <MenuItem value="Jamah Mapun">Jamah Mapun</MenuItem>
                  <MenuItem value="Malay">Malay</MenuItem>
                  <MenuItem value="Mangyan">Mangyan</MenuItem>
                  <MenuItem value="Maranao">Maranao</MenuItem>
                  <MenuItem value="Molbogs">Molbogs</MenuItem>
                  <MenuItem value="Palawano">Palawano</MenuItem>
                  <MenuItem value="Panimusan">Panimusan</MenuItem>
                  <MenuItem value="Tagbanua">Tagbanua</MenuItem>
                  <MenuItem value="Tao't">Tao't</MenuItem>
                  <MenuItem value="Bato">Bato</MenuItem>
                  <MenuItem value="Tausug">Tausug</MenuItem>
                  <MenuItem value="Waray">Waray</MenuItem>
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            ))}

            {students.map((student) => (

              <TextField
                key={`other-ethnic-${student.person_id}`}
                label="Other Ethnic Group"
                value={student.otherEthnicGroup || ""}
                style={{ width: "33%" }}
                size="small"
                onChange={(e) => {
                  const updatedOtherEthnicGroup = e.target.value;
                  const updatedStudents = [...students];
                  const studentIndex = updatedStudents.findIndex((s) => s.person_id === student.person_id);
                  if (studentIndex !== -1) {
                    updatedStudents[studentIndex] = {
                      ...updatedStudents[studentIndex],
                      otherEthnicGroup: updatedOtherEthnicGroup,
                    };
                  }

                  setStudents(updatedStudents);
                  updateItem(updatedStudents[studentIndex]);
                }}
              />
            ))}

          </Box>

          <br />

          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>
            Contact Information:
          </Typography>
          <hr style={{ border: "1px solid #ccc", width: "100%" }} />
          {students.map((student) => (
            <Box key={student.person_id} display="flex" gap={2} mb={2}>
              {/* Cellphone Number Field */}
              <Box width="50%">
                <div>
                  Cellphone Number: <span style={{ color: "red" }}>*</span>
                </div>
                <TextField
                  label="Enter Cellphone Number"
                  required
                  fullWidth
                  size="small"
                  value={student.cellphoneNumber || ""}
                  onChange={(e) => {
                    const updatedStudent = { ...student, cellphoneNumber: e.target.value };
                    setStudents((prev) =>
                      prev.map((s) => (s.person_id === student.person_id ? updatedStudent : s))
                    );
                    updateItem(updatedStudent);
                  }}
                />
              </Box>

              {/* Email Address Field */}
              <Box width="50%">
                <div>
                  Email Address: <span style={{ color: "red" }}>*</span>
                </div>
                <TextField
                  label="Enter Email Address"
                  required
                  fullWidth
                  size="small"
                  value={student.emailAddress || ""}
                  onChange={(e) => {
                    const updatedStudent = { ...student, emailAddress: e.target.value };
                    setStudents((prev) =>
                      prev.map((s) => (s.person_id === student.person_id ? updatedStudent : s))
                    );
                    updateItem(updatedStudent);
                  }}
                />
              </Box>
            </Box>
          ))}



          {students.map((student) => (
            <Box key={student.person_id} display="flex" gap={2} mt={1}>
              {/* Telephone Number Field */}
              <Box width="50%">
                <div>
                  Telephone Number: <span style={{ color: "red" }}>*</span>
                </div>
                <TextField
                  label="Enter Telephone Number"
                  required
                  fullWidth
                  size="small"
                  value={student.telephoneNumber || ""}
                  onChange={(e) => {
                    const updatedStudent = { ...student, telephoneNumber: e.target.value };
                    setStudents((prev) =>
                      prev.map((s) => (s.person_id === student.person_id ? updatedStudent : s))
                    );
                    updateItem(updatedStudent);
                  }}
                />
              </Box>

              {/* Facebook Account Field */}
              <Box width="50%">
                <div>
                  Facebook Account: <span style={{ color: "red" }}>*</span>
                </div>
                <TextField
                  label="Enter Facebook Account"
                  required
                  fullWidth
                  size="small"
                  value={student.facebookAccount || ""}
                  onChange={(e) => {
                    const updatedStudent = { ...student, facebookAccount: e.target.value };
                    setStudents((prev) =>
                      prev.map((s) => (s.person_id === student.person_id ? updatedStudent : s))
                    );
                    updateItem(updatedStudent);
                  }}
                />
              </Box>
            </Box>
          ))}

          < br />


          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Present Address:</Typography>
          <hr style={{ border: "1px solid #ccc", width: "100%", }} />


          {/* Present Address Fields (3 in a row) */}
          <Box display="flex" gap={2} mt={1}>
            <Box width="32%">
              <div>Present Address Street: <span style={{ color: "red" }}>*</span></div>
              <TextField
                label="Enter Street"
                required
                sx={{ width: "100%", marginRight: "20px" }}
                size="small"
                value={data[0]?.presentStreet || ""}
                onChange={(e) =>
                  setNewApplicant({ ...newApplicant, presentAddress: e.target.value })
                }
              />
            </Box>

            <Box width="32%">
              <div>Barangay: <span style={{ color: "red" }}>*</span></div>
              <TextField
                label="Enter Barangay"
                required
                sx={{ width: "100%", marginRight: "20px" }}
                size="small"
                value={data[0]?.presentBarangay || ""}
                onChange={(e) =>
                  setNewApplicant({ ...newApplicant, barangay: e.target.value })
                }
              />
            </Box>

            <Box width="33%">
              <div>ZIP Code: <span style={{ color: "red" }}>*</span></div>
              <TextField
                label="Enter ZIP Code"
                required
                sx={{ width: "100%", marginRight: "20px" }}
                size="small"
                value={data[0]?.presentZipCode || ""}
                onChange={(e) =>
                  setNewApplicant({ ...newApplicant, zipCode: e.target.value })
                }
              />
            </Box>
          </Box>

          {/* Region */}
          <Box width="100%" mt={1}>
            <div>Region: <span style={{ color: "red" }}>*</span></div>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel>Select Region</InputLabel>
              <Select

                id="region-select"
                value={data[0]?.presentRegion || ""}
                label="Select Region"
                sx={{ width: "100%", marginRight: "50px" }}
                onChange={(e) =>
                  setNewApplicant({ ...newApplicant, present_region: e.target.value })
                }
              >
                <MenuItem value="Region I - Ilocos Region">Region I - Ilocos Region</MenuItem>
                <MenuItem value="Region II - Cagayan Valley">Region II - Cagayan Valley</MenuItem>
                <MenuItem value="Region III - Central Luzon">Region III - Central Luzon</MenuItem>
                <MenuItem value="Region IV-A - CALABARZON">Region IV-A - CALABARZON</MenuItem>
                <MenuItem value="Region IV-B (MIMAROPA)">Region IV-B (MIMAROPA)</MenuItem>
                <MenuItem value="Region V - Bicol Region">Region V - Bicol Region</MenuItem>
                <MenuItem value="Region VI - Western Visayas">Region VI - Western Visayas</MenuItem>
                <MenuItem value="Region VII - Central Visayas">Region VII - Central Visayas</MenuItem>
                <MenuItem value="Region VIII - Eastern Visayas">Region VIII - Eastern Visayas</MenuItem>
                <MenuItem value="Region IX - Zamboanga Peninsula">Region IX - Zamboanga Peninsula</MenuItem>
                <MenuItem value="Region X - Northern Mindanao">Region X - Northern Mindanao</MenuItem>
                <MenuItem value="Region XI - Davao Region">Region XI - Davao Region</MenuItem>
                <MenuItem value="Region XII - SOCCSKSARGEN">Region XII - SOCCSKSARGEN</MenuItem>
                <MenuItem value="Region XIII - Caraga">Region XIII - Caraga</MenuItem>
                <MenuItem value="NCR - National Capital Region">NCR - National Capital Region</MenuItem>
                <MenuItem value="CAR - Cordillera Administrative Region">CAR - Cordillera Administrative Region</MenuItem>
                <MenuItem value="ARMM - Autonomous Region in Muslim Mindanao">ARMM - Autonomous Region in Muslim Mindanao</MenuItem>
              </Select>
            </FormControl>

          </Box>

          {/* Province */}
          <Box width="100%" mt={1}>
            <div>Province: <span style={{ color: "red" }}>*</span></div>
            <TextField
              label="Enter Province"
              required
              sx={{ width: "100%", marginRight: "20px" }}
              size="small"
              value={data[0]?.presentProvince || ""}
              onChange={(e) =>
                setNewApplicant({ ...newApplicant, province: e.target.value })
              }
            />
          </Box>

          {/* Municipality */}
          <Box width="100%" mt={1}>
            <div>Municipality: <span style={{ color: "red" }}>*</span></div>
            <TextField
              label="Enter Municipality"
              required
              sx={{ width: "100%", marginRight: "20px" }}
              size="small"
              value={data[0]?.presentMunicipality || ""}
              onChange={(e) =>
                setNewApplicant({ ...newApplicant, municipality: e.target.value })
              }
            />
          </Box>

          {/* DSWD Household Number */}
          <Box width="100%" mt={1}>
            <div>DSWD Household Number: <span style={{ color: "red" }}>*</span></div>
            <TextField
              label="Enter Household Number"
              required
              sx={{ width: "100%", marginRight: "20px" }}
              size="small"
              value={data[0]?.presentDswdHouseholdNumber || ""}
              onChange={(e) =>
                setNewApplicant({ ...newApplicant, dswdHouseholdNumber: e.target.value })
              }
            />
          </Box>


          <br />

          {/* Same as Present Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={sameAsPresent}
                onChange={(e) => setSameAsPresent(e.target.checked)}
              />
            }
            label="Same as Present Address"
          />

          {/* Permanent Address Title */}
          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>
            Permanent Address:
          </Typography>
          <hr style={{ border: "1px solid #ccc", width: "100%" }} />


          {/* Permanent Address Row Fields */}
          <Box display="flex" gap={2} mt={1}>
            <Box width="32%">
              <div>Permanent Address Street: <span style={{ color: "red" }}>*</span></div>
              <TextField
                label="Enter Street"
                required
                sx={{ width: "100%", marginRight: "20px" }}
                size="small"
                value={data[0]?.permanentStreet || ""}
                onChange={(e) =>
                  setNewApplicant({ ...newApplicant, permanentAddress: e.target.value })
                }
              />
            </Box>

            <Box width="32%">
              <div>Barangay: <span style={{ color: "red" }}>*</span></div>
              <TextField
                label="Enter Barangay"
                required
                sx={{ width: "100%", marginRight: "20px" }}
                size="small"
                value={data[0]?.permanentBarangay || ""}
                onChange={(e) =>
                  setNewApplicant({ ...newApplicant, barangay: e.target.value })
                }
              />
            </Box>

            <Box width="33%">
              <div>ZIP Code: <span style={{ color: "red" }}>*</span></div>
              <TextField
                label="Enter ZIP Code"
                required
                sx={{ width: "100%", marginRight: "20px" }}
                size="small"
                value={data[0]?.permanentZipCode || ""}
                onChange={(e) =>
                  setNewApplicant({ ...newApplicant, zipCode: e.target.value })
                }
              />
            </Box>
          </Box>

          <Box width="100%" mt={1}>
            <div>Region: <span style={{ color: "red" }}>*</span></div>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="region-label">Select Region</InputLabel>
              <Select
                labelId="region-label"
                id="region-select"
                value={data[0]?.permanentRegion || ""}
                label="Select Region"
                onChange={(e) =>
                  setNewApplicant({ ...newApplicant, permanent_region: e.target.value })
                }
              >
                <MenuItem value="Region I - Ilocos Region">Region I - Ilocos Region</MenuItem>
                <MenuItem value="Region II - Cagayan Valley">Region II - Cagayan Valley</MenuItem>
                <MenuItem value="Region III - Central Luzon">Region III - Central Luzon</MenuItem>
                <MenuItem value="Region IV-A - CALABARZON">Region IV-A - CALABARZON</MenuItem>
                <MenuItem value="Region IV-B (MIMAROPA)">Region IV-B (MIMAROPA)</MenuItem>
                <MenuItem value="Region V - Bicol Region">Region V - Bicol Region</MenuItem>
                <MenuItem value="Region VI - Western Visayas">Region VI - Western Visayas</MenuItem>
                <MenuItem value="Region VII - Central Visayas">Region VII - Central Visayas</MenuItem>
                <MenuItem value="Region VIII - Eastern Visayas">Region VIII - Eastern Visayas</MenuItem>
                <MenuItem value="Region IX - Zamboanga Peninsula">Region IX - Zamboanga Peninsula</MenuItem>
                <MenuItem value="Region X - Northern Mindanao">Region X - Northern Mindanao</MenuItem>
                <MenuItem value="Region XI - Davao Region">Region XI - Davao Region</MenuItem>
                <MenuItem value="Region XII - SOCCSKSARGEN">Region XII - SOCCSKSARGEN</MenuItem>
                <MenuItem value="Region XIII - Caraga">Region XIII - Caraga</MenuItem>
                <MenuItem value="NCR - National Capital Region">NCR - National Capital Region</MenuItem>
                <MenuItem value="CAR - Cordillera Administrative Region">CAR - Cordillera Administrative Region</MenuItem>
                <MenuItem value="ARMM - Autonomous Region in Muslim Mindanao">ARMM - Autonomous Region in Muslim Mindanao</MenuItem>
              </Select>
            </FormControl>

          </Box>

          <Box width="100%" mt={1}>
            <div>Province: <span style={{ color: "red" }}>*</span></div>
            <TextField
              label="Enter Province"
              required
              sx={{ width: "100%", marginRight: "20px" }}
              size="small"
              value={data[0]?.permanentProvince || ""}
              onChange={(e) =>
                setNewApplicant({ ...newApplicant, province: e.target.value })
              }
            />
          </Box>

          <Box width="100%" mt={1}>
            <div>Municipality: <span style={{ color: "red" }}>*</span></div>
            <TextField
              label="Enter Municipality"
              required
              sx={{ width: "100%", marginRight: "20px" }}
              size="small"
              value={data[0]?.permanentMunicipality || ""}
              onChange={(e) =>
                setNewApplicant({ ...newApplicant, municipality: e.target.value })
              }
            />
          </Box>

          <Box width="100%" mt={1}>
            <div>DSWD Household Number: <span style={{ color: "red" }}>*</span></div>
            <TextField
              label="Enter Household Number"
              required
              sx={{ width: "100%", marginRight: "20px" }}
              size="small"
              value={data[0]?.permanentDswdHouseholdNumber || ""}
              onChange={(e) =>
                setNewApplicant({ ...newApplicant, dswdHouseholdNumber: e.target.value })
              }
            />
          </Box>

          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 600,
                  bgcolor: 'white',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                }}
              >
                {/* Close X Button */}
                <Button
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    minWidth: 0,
                    width: 32,
                    height: 32,
                    padding: 0,
                    borderRadius: '10%',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    lineHeight: 1,
                    color: 'white',
                    backgroundColor: '#6D2323',
                    '&:hover': {
                      backgroundColor: '#b71c1c',
                    },
                  }}
                >
                  X
                </Button>

                {/* Header */}
                <Box sx={{ bgcolor: '#6D2323', color: 'white', p: 2, borderRadius: 1 }}>
                  <Typography style={{ textAlign: 'center', fontWeight: "bold" }} variant="h6" gutterBottom>
                    Upload Your Photo
                  </Typography>
                </Box>

                <Box
                  sx={{
                    border: '3px solid black',
                    p: 2,
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  {/* Preview Image - between header and guidelines */}
                  {preview && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2, position: 'relative' }}>
                      <Box
                        component="img"
                        src={preview}
                        alt="Preview"
                        sx={{
                          width: '210px',
                          height: '210px',
                          objectFit: 'cover',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                      />
                      {/* X Button to remove preview */}
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreview(null);
                        }}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 'calc(50% - 96px)',
                          minWidth: 0,
                          width: 24,
                          height: 24,
                          fontSize: '14px',
                          p: 0,
                          color: 'white',
                          bgcolor: '#d32f2f',
                          '&:hover': { bgcolor: '#b71c1c' },
                        }}
                      >
                        ×
                      </Button>
                    </Box>
                  )}
                  <Typography variant="body2" sx={{ mb: 2, fontSize: '15px' }}>
                    <strong style={{ fontSize: "15px" }}>Guidelines:</strong>
                    <Box sx={{ ml: 2, textAlign: "justify", fontFamily: "Arial", fontSize: "15px" }}>
                      - Size 2" x 2"<br />
                      - Color: Your photo must be in color.<br />
                      - Background: White.<br />
                      - Head size and position: Look directly into the camera at a straight angle, face centered.<br />
                      - File must be jpeg, jpg or png<br />
                      - Attire must be formal.
                    </Box>

                    <strong style={{ fontSize: "15px" }}>How to Change the Photo?</strong>
                    <Box sx={{ ml: 2, textAlign: "justify", fontFamily: "Arial", fontSize: "15px" }}>
                      - Click X Button<br />
                      - Then click choose file button, select photo<br />
                      - Click upload Button
                    </Box>
                  </Typography>
                </Box>

                {/* File Input */}
                <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold", marginBottom: "8px" }}>
                  Select Your Image:
                </Typography>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onClick={(e) => (e.target.value = null)} // allow re-selecting same file
                  onChange={handleFileChange}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    fontFamily: 'Arial',
                  }}
                />

                {/* Upload Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleUpload}
                  sx={{
                    backgroundColor: '#6D2323',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#5a1f1f',
                    },
                  }}
                >
                  Upload
                </Button>
              </Box>
            </Box>
          </Modal>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="region1-municipality-label">Municipality/City</InputLabel>
            <Select
              labelId="region1-municipality-label"
              id="region1-municipality-select"
              value={selectedMunicipality}
              label="Municipality/City"
              onChange={(e) => setSelectedMunicipality(e.target.value)}
            >
              {region1Municipalities.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>







          <Box display="flex" justifyContent="right" mt={4}>
            {/* Previous Page Button */}
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                backgroundColor: '#6D2323',
                color: '#fff',
                marginRight: '5px',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: '#E8C999',
                  color: '#000',
                  '& .MuiSvgIcon-root': {
                    color: '#000',
                  },
                },
              }}
            >
              <PhotoCameraIcon
                sx={{
                  marginRight: '8px',
                  color: '#fff',
                  transition: 'color 0.3s',
                }}
              />
              Upload Photo <br /> Student Picture
            </Button>

            {/* Next Step Button */}
            <Button
              variant="contained"
              component={Link}
              to="/family_background"
              endIcon={
                <ArrowForwardIcon
                  sx={{
                    color: '#fff',
                    transition: 'color 0.3s',
                  }}
                />
              }
              sx={{
                backgroundColor: '#6D2323',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#E8C999',
                  color: '#000',
                  '& .MuiSvgIcon-root': {
                    color: '#000',
                  },
                },
              }}
            >
              Next Step
            </Button>
          </Box>
        </Container>
      </form>




    </Container>
  );
};

export default ApplicantForm;
