import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,

  TextField,
  Container,
  Typography,
  Box, Checkbox, FormControlLabel, MenuItem, FormControl, InputLabel, Select
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { jwtDecode } from "jwt-decode";


const FamilyBackground = () => {
  const getPersonIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded Token: ", decoded);
      return decoded.person_id; // Ensure your token includes this field
    }
    return null;
  };

  const [personID, setPersonID] = useState('');
  const personIDFromToken = getPersonIdFromToken();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFamilyBackground = async () => {
      try {
        const response = await axios.get('http://localhost:5000/family_background');
        console.log('Fetched Family Background Data:', response.data);
        const filtered = response.data.filter(item => String(item.person_id) === String(personIDFromToken));
        setData(filtered);
      } catch (error) {
        console.error("Error fetching family background:", error);
      }
    };

    fetchFamilyBackground();
  }, [personID]);

  useEffect(() => {
    fetch("http://localhost:5000/family_background")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error("Error in fallback fetch:", err));
  }, []);


  const [step, setStep] = useState(2); // Initialize step at 1

  const handlePreviousPage = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNextStep = () => {
    if (step < 5) setStep(step + 1); // Change '5' to total number of steps you have
  };


  const [isFatherDeceased, setIsFatherDeceased] = useState(false);
  const [isMotherDeceased, setIsMotherDeceased] = useState(false);
  const [isSoloParent, setIsSoloParent] = useState(false);
  const [parentType, setParentType] = useState("");

  // When Solo Parent checkbox is toggled
  const handleSoloParentChange = (e) => {
    const checked = e.target.checked;
    setIsSoloParent(checked);

    if (!checked) {
      // Reset if unchecked
      setParentType("");
    }
  };

  // When Mother or Father is selected under Solo Parent
  const handleParentTypeChange = (event) => {
    const selected = event.target.value;
    setParentType(selected);

    // Logic for handling the solo parent selection (no disabling of checkboxes anymore)
    if (selected === "Mother") {
      setIsFatherDeceased(true);
      setIsMotherDeceased(false);
    } else if (selected === "Father") {
      setIsMotherDeceased(true);
      setIsFatherDeceased(false);
    }
  };



  const steps = [
    { label: 'Personal Information', icon: <PersonIcon />, path: '/applicant' },
    { label: 'Family Background', icon: <FamilyRestroomIcon />, path: '/family_background' },
    { label: 'Educational Attainment', icon: <SchoolIcon />, path: '/educ_attainment' },
    { label: 'Health Medical Records', icon: <HealthAndSafetyIcon />, path: '/health_medical_records' },
    { label: 'Other Information', icon: <InfoIcon />, path: '/other_information' },
  ];

  const [newFamilyBackground, setNewFamilyBackground] = useState({
    solo_parent: "",
    father_name: "",
    mother_name: "",
    father_deceased: "",
    father_family_name: "",
    father_given_name: "",
    father_middle_name: "",
    father_ext: "",
    father_nickname: "",
    father_education_level: "",
    father_last_school: "",
    father_course: "",
    father_year_graduated: "",
    father_contact: "",
    father_occupation: "",
    father_employer: "",
    father_income: "",
    father_email: "",
    mother_deceased: "",
    mother_family_name: "",
    mother_given_name: "",
    mother_middle_name: "",
    mother_nickname: "",
    mother_education_level: "",
    mother_school_address: "",
    mother_course: "",
    mother_year_graduated: "",
    mother_contact: "",
    mother_occupation: "",
    mother_employer: "",
    mother_income: "",
    mother_email: "",
    guardian_family_name: "",
    guardian_given_name: "",
    guardian_middle_name: "",
    guardian_ext: "",
    guardian_nickname: "",
    guardian_address: "",
    guardian_contact: "",
    guardian_email: "",
    annual_income: "",
    father_education_level: "",
    father_last_school: "",
    father_course: "",
    father_year_graduated: "",
    father_school_address: "",
    mother_education_level: "",
    mother_last_school: "",
    mother_course: "",
    mother_year_graduated: "",
    mother_school_address: "",



  });

  const [activeStep, setActiveStep] = useState(1);
  const [clickedSteps, setClickedSteps] = useState(Array(steps.length).fill(false));




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/family_background", formData);
      alert("Data submitted successfully!");
      setFormData({
        solo_parent: "",
        father_deceased: "",
        father_family_name: "",
        father_given_name: "",
        father_middle_name: "",
        father_ext: "",
        father_nickname: "",
        father_education_level: "",
        father_last_school: "",
        father_course: "",
        father_year_graduated: "",
        father_contact: "",
        father_occupation: "",
        father_employer: "",
        father_income: "",
        father_email: "",
        mother_deceased: "",
        mother_family_name: "",
        mother_given_name: "",
        mother_middle_name: "",
        mother_nickname: "",
        mother_education_level: "",
        mother_school_address: "",
        mother_course: "",
        mother_year_graduated: "",
        mother_contact: "",
        mother_occupation: "",
        mother_employer: "",
        mother_income: "",
        mother_email: "",
        guardian_family_name: "",
        guardian_given_name: "",
        guardian_middle_name: "",
        guardian_ext: "",
        guardian_nickname: "",
        guardian_address: "",
        guardian_contact: "",
        guardian_email: "",
        annual_income: "",
        father_education_level: "",
        father_last_school: "",
        father_course: "",
        father_year_graduated: "",
        father_school_address: "",
        mother_education_level: "",
        mother_last_school: "",
        mother_course: "",
        mother_year_graduated: "",
        mother_school_address: "",
      });
    } catch (error) {
      console.error("Error saving record", error);
    }
  };

  const handleStepClick = (index) => {
    setActiveStep(index);
    const newClickedSteps = [...clickedSteps];
    newClickedSteps[index] = true;
    setClickedSteps(newClickedSteps);
  };

  const [fatherEduNotApplicable, setFatherEduNotApplicable] = useState(false);
  const [motherEduNotApplicable, setMotherEduNotApplicable] = useState(false);

  const handleChange = (field, value) => {
    setNewFamilyBackground((prev) => ({
      ...prev,
      [field]: value,
    }));
  };




  return (
    <Container>
      <h1 style={{ textAlign: "center", color: "maroon", marginTop: "75px" }}>APPLICANT FORM</h1>
      <div style={{ textAlign: "Center", }}>Complete the applicant form to secure your place for the upcoming academic year at EARIST.</div>
      <br />
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

      <br />
      <form>
        <Container maxWidth="100%" sx={{ backgroundColor: "#6D2323", color: "white", borderRadius: 2, boxShadow: 3, padding: "4px" }}>
          <Box sx={{ width: "100%" }}>
            <Typography style={{ fontSize: "20px", padding: "10px", fontFamily: "Arial Black" }}>Step 2: Family Background</Typography>
          </Box>
        </Container>


        <Container maxWidth="100%" sx={{ backgroundColor: "white", padding: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold", textAlign: "Left" }}>
            Family Background:
          </Typography>
          <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />

          <Box display="flex" gap={3} width="100%" alignItems="center">
            <Box marginTop="10px" display="flex" alignItems="center">
              <div style={{ marginRight: "8px" }}>Solo Parent:</div>
              <Checkbox

                checked={isSoloParent}
                value={data[0]?.solo_parent || ""}
                onChange={handleSoloParentChange}
                inputProps={{ "aria-label": "Solo Parent checkbox" }}
              />
            </Box>

            {isSoloParent && (
              <Box marginTop="10px" display="flex" alignItems="center">
                <FormControl fullWidth size="small" style={{ width: "200px", marginRight: "16px" }}>
                  <InputLabel id="parent-type-label">Mother/Father</InputLabel>
                  <Select
                    labelId="parent-type-label"
                    value={parentType}
                    label="Mother/Father"
                    onChange={handleParentTypeChange}
                  >
                    <MenuItem value="Mother">Mother</MenuItem>
                    <MenuItem value="Father">Father</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

          </Box>


          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold", textAlign: "Center" }}>
            Father's Information:
          </Typography>
          <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />
          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>
            Father:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isFatherDeceased}
                onChange={(e) => setIsFatherDeceased(e.target.checked)}
              />
            }
            label="Father Deceased"
          />
          <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />

          {!isFatherDeceased && (
            <Box mt={2}>
              {/* Name Fields Row */}
              <Box display="flex" gap={2}>
                <div style={{ marginRight: "-40px" }}><strong><span> <br />Father's Name:</span></strong></div>
                <Box width="20%">
                  <div>Family Name: <span style={{ color: "red" }}>*</span></div>
                  <TextField
                    label="Enter Last Name"
                    required
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.father_family_name || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, father_family_name: e.target.value })
                    }
                  />

                </Box>

                <Box width="20%">
                  <div>Given Name: <span style={{ color: "red" }}>*</span></div>
                  <TextField
                    label="Enter First Name"
                    required
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.father_given_name || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, father_given_name: e.target.value })
                    }
                  />
                </Box>

                <Box width="20%">
                  <div>Middle Name: <span style={{ color: "red" }}>*</span></div>
                  <TextField
                    label="Enter Middle Name"
                    required
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.father_middle_name || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, father_middle_name: e.target.value })
                    }
                  />
                </Box>

                <Box width="20%">
                  <div>EXT: <span style={{ color: "red" }}>*</span></div>
                  <FormControl sx={{ width: "100%", }} size="small">
                    <InputLabel id="extension-label">EXT.</InputLabel>
                    <Select
                      labelId="extension-label"
                      id="extension-select"

                      value={data[0]?.father_ext || ""}
                      label="EXT."
                      onChange={(e) =>
                        setNewFamilyBackground({ ...newFamilyBackground, father_ext: e.target.value })
                      }
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
                </Box>

                <Box width="20%">
                  <div>Nick Name:</div>
                  <TextField
                    label="Enter Nickname"
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.father_nickname || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, father_nickname: e.target.value })
                    }
                  />
                </Box>
              </Box>



              < br />
              <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />
              {/* Contact Info Header */}
              <Typography
                style={{
                  fontSize: "20px",
                  color: "#6D2323",
                  fontWeight: "bold",
                  marginTop: "20px",
                  marginBottom: "10px"
                }}
              >
                Educational Background of Father:
              </Typography>

              <Box sx={{ p: 2 }}>
                {/* Father Section */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fatherEduNotApplicable}
                      onChange={(e) => {
                        setFatherEduNotApplicable(e.target.checked);
                        if (e.target.checked) {
                          setNewFamilyBackground({
                            ...newFamilyBackground,
                            father_education_level: "",
                            father_last_school: "",
                            father_course: "",
                            father_year_graduated: "",
                            father_school_address: "",  // Clear all fields when checkbox is checked
                          });
                        }
                      }}
                    />
                  }
                  label="Father's education not applicable"
                />

                {/* Father Educational Details */}
                {!fatherEduNotApplicable && (
                  <Box
                    display="flex"
                    gap={2}
                    mt={2}
                    flexWrap="nowrap"  // Ensure no wrapping of items
                    sx={{
                      '& > *': {
                        flex: 1,
                        minWidth: 150, // This can be adjusted based on your layout needs
                      },
                    }}
                  >
                    <TextField
                      label="Father's Education Level"
                      size="small"
                      value={data[0]?.father_education_level || ""}
                      onChange={(e) => handleChange("father_education_level", e.target.value)}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Father's Last School Attended"
                      size="small"
                      value={data[0]?.father_last_school || ""}
                      onChange={(e) => handleChange("father_last_school", e.target.value)}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Father's Course/Program"
                      size="small"
                      value={data[0]?.father_course || ""}
                      onChange={(e) => handleChange("father_course", e.target.value)}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Father's Year Graduated"
                      size="small"
                      value={data[0]?.father_year_graduated || ""}
                      onChange={(e) => handleChange("father_year_graduated", e.target.value)}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Father's School Address"
                      size="small"
                      value={data[0]?.father_school_address || ""}
                      onChange={(e) => handleChange("father_school_address", e.target.value)}
                      sx={{ flex: 1 }}
                    />
                  </Box>

                )}
              </Box>
              <Typography
                style={{
                  fontSize: "20px",
                  color: "#6D2323",
                  fontWeight: "bold",
                  marginTop: "20px",
                  marginBottom: "10px"
                }}
              >
                Contact Information:
              </Typography>
              {/* Contact Info Fields Row */}
              <Box display="flex" gap={2}>
                <Box width="25%">
                  <div style={{ fontSize: "12px", marginBottom: "6px", fontFamily: "Arial" }}>Contact Number:</div>
                  <TextField
                    label="Enter Contact Number"
                    required
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.father_contact || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, father_contact: e.target.value })
                    }
                  />
                </Box>

                <Box width="25%">
                  <div style={{ fontSize: "12px", marginBottom: "6px", fontFamily: "Arial" }}>Occupation:</div>
                  <TextField
                    label="Enter Occupation"
                    required
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.father_occupation || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, father_occupation: e.target.value })
                    }
                  />
                </Box>

                <Box width="25%">
                  <div style={{ fontSize: "12px", marginBottom: "6px", fontFamily: "Arial" }}>Employer/Name of Company:</div>
                  <TextField
                    label="Enter Employer/Company"
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.father_employer || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, father_employer: e.target.value })
                    }
                  />
                </Box>

                <Box width="25%">
                  <div style={{ fontSize: "12px", marginBottom: "6px", fontFamily: "Arial" }}>Monthly Income:</div>
                  <TextField
                    label="Enter Monthly Income"
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.father_income || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, father_income: e.target.value })
                    }
                  />
                </Box>
              </Box>

              {/* Email Field Full Width */}
              <Box width="100%" marginTop="10px">
                <div>Email Address:</div>
                <TextField
                  label="Enter Email"
                  style={{ width: "49.5%" }}
                  size="small"
                  value={data[0]?.father_email || ""}
                  onChange={(e) =>
                    setNewFamilyBackground({ ...newFamilyBackground, father_email: e.target.value })
                  }
                />
              </Box>
            </Box>
          )}





          < br />
          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold", textAlign: "Center" }}>
            Mother's Information:
          </Typography>
          <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />

          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>
            Mother:
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={isMotherDeceased}
                onChange={(e) => setIsMotherDeceased(e.target.checked)}
              />
            }
            label="Mother Deceased"
          />
          <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />

          {!isMotherDeceased && (
            <Box mt={2}>
              {/* Full Name Row */}
              <Box display="flex" gap={2} marginTop="10px">
                <div style={{ marginRight: "-40px" }}><strong>Mother's <span> <br />Maiden Name:</span></strong></div>
                <Box width="25%">

                  <div>Family Name: <span style={{ color: "red" }}>*</span></div>
                  <TextField
                    label="Enter Family Name"
                    required
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.mother_family_name || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, mother_family_name: e.target.value })
                    }
                  />
                </Box>

                <Box width="25%">
                  <div>Given Name: <span style={{ color: "red" }}>*</span></div>
                  <TextField
                    label="Enter Given Name"
                    required
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.mother_given_name || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, mother_given_name: e.target.value })
                    }
                  />
                </Box>

                <Box width="25%">
                  <div>Middle Name: <span style={{ color: "red" }}>*</span></div>
                  <TextField
                    label="Enter Middle Name"
                    required
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.mother_middle_name || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, mother_middle_name: e.target.value })
                    }
                  />
                </Box>

                <Box width="25%">
                  <div>Nick Name:</div>
                  <TextField
                    label="Enter Nickname"
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.mother_nickname || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, mother_nickname: e.target.value })
                    }
                  />
                </Box>
              </Box>
              < br />
              <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />

              {/* Contact Info Title */}
              <Typography
                style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold", marginTop: "20px" }}
              >
                Educational Background of Mother:
              </Typography>
              {/* Mother Section */}

              <FormControlLabel
                control={
                  <Checkbox
                    checked={motherEduNotApplicable}
                    onChange={(e) => {
                      setMotherEduNotApplicable(e.target.checked);
                      if (e.target.checked) {
                        setNewFamilyBackground({
                          ...newFamilyBackground,
                          mother_education_level: "",
                          mother_last_school: "",
                          mother_course: "",
                          mother_year_graduated: "",
                          mother_school_address: "",  // Clear all fields when checkbox is checked
                        });
                      }
                    }}
                  />
                }
                label="Mother's education not applicable"
              />

              {/* Mother Educational Details */}
              {!motherEduNotApplicable && (
                <Box sx={{ p: 2 }}>
                  {/* Mother Educational Details */}
                  {!motherEduNotApplicable && (
                    <Box
                      display="flex"
                      gap={2}
                      mt={2}
                      flexWrap="nowrap"  // Prevent wrapping of items
                      sx={{
                        '& > *': {
                          flex: 1,
                          minWidth: 150, // Adjust width of each TextField as needed
                        },
                      }}
                    >
                      <TextField
                        label="Mother's Education Level"
                        size="small"
                        value={data[0]?.mother_education_level || ""}
                        onChange={(e) => handleChange("mother_education_level", e.target.value)}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="Mother's Last School Attended"
                        size="small"
                        value={data[0]?.mother_last_school || ""}
                        onChange={(e) => handleChange("mother_last_school", e.target.value)}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="Mother's Course/Program"
                        size="small"
                        value={data[0]?.mother_course || ""}
                        onChange={(e) => handleChange("mother_course", e.target.value)}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="Mother's Year Graduated"
                        size="small"
                        value={data[0]?.mother_year_graduated || ""}
                        onChange={(e) => handleChange("mother_year_graduated", e.target.value)}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="Mother's School Address"
                        size="small"
                        value={data[0]?.mother_school_address || ""}
                        onChange={(e) => handleChange("mother_school_address", e.target.value)}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  )}
                </Box>

              )}
              <Typography
                style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold", marginTop: "20px" }}
              >
                Contact Information:
              </Typography>


              {/* Contact Information Row */}
              <Box display="flex" gap={2} marginTop="10px">
                <Box width="25%">
                  <div style={{ fontSize: "12px", marginBottom: "6px", fontFamily: "Arial" }}>Contact Number:</div>
                  <TextField
                    label="Enter Contact Number"
                    required
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.mother_contact || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, mother_contact: e.target.value })
                    }
                  />
                </Box>

                <Box width="25%">
                  <div style={{ fontSize: "12px", marginBottom: "6px", fontFamily: "Arial" }}>Occupation:</div>
                  <TextField
                    label="Enter Occupation"
                    required
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.mother_occupation || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, mother_occupation: e.target.value })
                    }
                  />
                </Box>

                <Box width="25%">
                  <div style={{ fontSize: "12px", marginBottom: "6px", fontFamily: "Arial" }}>Employer/Name of Company:</div>
                  <TextField
                    label="Enter Employer/Company"
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.mother_employer || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, mother_employer: e.target.value })
                    }
                  />
                </Box>

                <Box width="25%">
                  <div style={{ fontSize: "12px", marginBottom: "6px", fontFamily: "Arial" }}>Monthly Income:</div>
                  <TextField
                    label="Enter Monthly Income"
                    style={{ width: "100%" }}
                    size="small"
                    value={data[0]?.mother_income || ""}
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, mother_income: e.target.value })
                    }
                  />
                </Box>
              </Box>

              {/* Email Field */}
              <Box width="100%" marginTop="10px">
                <div>Email Address:</div>
                <TextField
                  label="Enter Email"
                  style={{ width: "49.5%" }}
                  size="small"
                  value={data[0]?.mother_email || ""}
                  onChange={(e) =>
                    setNewFamilyBackground({ ...newFamilyBackground, mother_email: e.target.value })
                  }
                />
              </Box>
            </Box>
          )}



          < br />
          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold", textAlign: "Center" }}>
            In Case Of Emergency:
          </Typography>
          <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />

          <Box mt={2}>
            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold", }}>
              Guardian:
            </Typography>
            <br />
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', }}>
              <div ><strong>Guardian:</strong></div>

              <FormControl fullWidth>
                <InputLabel id="guardian-label">Guardian</InputLabel>
                <Select
                  labelId="guardian-label"
                  label="Guardian"
                  value={data[0]?.guardian || ""}
                  style={{ width: "20%", marginTop: "5px" }}
                  size="small"
                  onChange={(e) =>
                    setNewFamilyBackground({ ...newFamilyBackground, guardian: e.target.value })
                  }
                >

                  <MenuItem value="Father">Father</MenuItem>
                  <MenuItem value="Mother">Mother</MenuItem>
                  <MenuItem value="Brother/Sister">Brother/Sister</MenuItem>
                  <MenuItem value="Uncle">Uncle</MenuItem>

                  <MenuItem value="StepFather">Stepfather</MenuItem>
                  <MenuItem value="StepMother">Stepmother</MenuItem>
                  <MenuItem value="Cousin">Cousin</MenuItem>
                  <MenuItem value="Father in Law">Father-in-law</MenuItem>
                  <MenuItem value="Mother in Law">Mother-in-law</MenuItem>
                  <MenuItem value="Sister in Law">Sister-in-law</MenuItem>
                  <MenuItem value="Spouse">Spouse</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </div>



            <br />

            <Box display="flex" gap={2}>
              <div style={{ marginRight: "-40px" }}><strong>Guardian Name's:</strong></div>
              <Box width="20%">
                <div>Family Name: <span style={{ color: "red" }}>*</span></div>
                <TextField
                  label="Enter Family Name"
                  required
                  style={{ width: "100%" }}
                  size="small"
                  value={data[0]?.guardian_family_name || ""}
                  onChange={(e) =>
                    setNewFamilyBackground({ ...newFamilyBackground, guardian_family_name: e.target.value })
                  }
                />
              </Box>

              <Box width="20%">
                <div>Given Name: <span style={{ color: "red" }}>*</span></div>
                <TextField
                  label="Enter Given Name"
                  required
                  style={{ width: "100%" }}
                  size="small"
                  value={data[0]?.guardian_given_name || ""}
                  onChange={(e) =>
                    setNewFamilyBackground({ ...newFamilyBackground, guardian_given_name: e.target.value })
                  }
                />
              </Box>

              <Box width="20%">
                <div>Middle Name: <span style={{ color: "red" }}>*</span></div>
                <TextField
                  label="Enter Middle Name"
                  required
                  style={{ width: "100%" }}
                  size="small"
                  value={data[0]?.guardian_middle_name || ""}
                  onChange={(e) =>
                    setNewFamilyBackground({ ...newFamilyBackground, guardian_middle_name: e.target.value })
                  }
                />
              </Box>

              <Box width="20%">
                <div>EXT: <span style={{ color: "red" }}>*</span></div>
                <FormControl sx={{ width: "100%", }} size="small">
                  <InputLabel id="extension-label">EXT.</InputLabel>
                  <Select
                    labelId="extension-label"
                    id="extension-select"

                    value={data[0]?.guardian_ext || ""}
                    label="EXT."
                    onChange={(e) =>
                      setNewFamilyBackground({ ...newFamilyBackground, father_ext: e.target.value })
                    }
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
              </Box>

              <Box width="20%">
                <div>Nick Name:</div>
                <TextField
                  label="Enter Nickname"
                  style={{ width: "100%" }}
                  size="small"
                  value={data[0]?.guardian_nickname || ""}
                  onChange={(e) =>
                    setNewFamilyBackground({ ...newFamilyBackground, guardian_nickname: e.target.value })
                  }
                />
              </Box>
            </Box>

            {/* Contact Info Header */}
            <Typography
              style={{
                fontSize: "20px",
                color: "#6D2323",
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "10px"
              }}
            >
              Contact Information:
            </Typography>


            <Box width="100%" marginTop="10px" display="flex" alignItems="center" gap={2}>
              <div style={{ whiteSpace: "nowrap" }}>Guardian's Address:</div>
              <TextField
                label="Enter Guardian Address"
                fullWidth
                size="small"
                value={data[0]?.guardian_address || ""}
                onChange={(e) =>
                  setNewFamilyBackground({ ...newFamilyBackground, guardian_email: e.target.value })
                }
              />
            </Box>



            <Box display="flex" gap={2} width="100%" marginTop="10px">
              <Box width="48%" display="flex" alignItems="center" gap={1} style={{ marginRight: "50px" }}>
                <div style={{ whiteSpace: "nowrap", marginRight: "30px" }}>Contact Number:</div>+63
                <TextField
                  label="9xxxxxxxxx"
                  fullWidth

                  size="small"
                  value={data[0]?.guardian_contact || ""}
                  onChange={(e) =>
                    setNewFamilyBackground({ ...newFamilyBackground, guardian_contact: e.target.value })
                  }
                />
              </Box>

              <Box width="48%" display="flex" alignItems="center" gap={1}  >
                <div style={{ whiteSpace: "nowrap" }}>Email Address:</div>
                <TextField
                  label="Enter Email Address"
                  fullWidth
                  size="small"
                  value={data[0]?.guardian_email || ""}
                  onChange={(e) =>
                    setNewFamilyBackground({ ...newFamilyBackground, guardian_email: e.target.value })
                  }
                />
              </Box>
            </Box>
          </Box>
          < br />
          <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />
          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold", }}>
            Family Annual Income:
          </Typography>

          <FormControl fullWidth style={{ marginTop: '10px' }}>
            <InputLabel id="family-income-label">Family Annual Income</InputLabel>
            <Select
              labelId="family-income-label"
              value={data[0]?.annual_income || ""}
              label="Family Annual Income"
              style={{ width: "100%", marginTop: "5px" }}
              size="small"
              onChange={(e) =>
                setNewFamilyBackground({ ...newFamilyBackground, annual_income: e.target.value })
              }
            >
              <MenuItem value="">--</MenuItem>
              <MenuItem value="80,000 and below">80,000 and below</MenuItem>
              <MenuItem value="80,000 to 135,000">80,000 above but not more than 135,000</MenuItem>
              <MenuItem value="135,000 to 250,000">135,000 above but not more than 250,000</MenuItem>
              <MenuItem value="250,000 to 500,000">250,000 above but not more than 500,000</MenuItem>
              <MenuItem value="500,000 to 1,000,000">500,000 above but not more than 1,000,000</MenuItem>
              <MenuItem value="1,000,000 and above">1,000,000 and above</MenuItem>
            </Select>
          </FormControl>


          <Box display="flex" justifyContent="space-between" mt={4}>
            {/* Previous Page Button */}
            <Button
              variant="contained"
              component={Link}
              to="/applicant"
              startIcon={
                <ArrowBackIcon
                  sx={{
                    color: '#000',
                    transition: 'color 0.3s',
                  }}
                />
              }
              sx={{
                backgroundColor: '#E8C999',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#6D2323',
                  color: '#fff',
                  '& .MuiSvgIcon-root': {
                    color: '#fff',
                  },
                },
              }}
            >
              Previous Step
            </Button>

            {/* Next Step Button */}
            <Button
              variant="contained"
              component={Link}
              to="/educ_attainment"
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

export default FamilyBackground;
