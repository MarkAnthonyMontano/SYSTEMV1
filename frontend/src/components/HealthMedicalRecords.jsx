import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button, Box, TextField, Container, Typography, Checkbox,
  FormControlLabel, FormGroup, Grid
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const HealthMedicalRecords = () => {
  const getPersonIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded Token: ", decoded);
      return decoded.person_id; // Ensure your token includes this
    }
    return null;
  };

  const [data, setData] = useState([]);
  const personIDFromToken = getPersonIdFromToken();

  const [personID, setPersonID] = useState('');

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/health_medical_records');
        console.log('Fetched Data:', response.data);  // Log to see the raw data
        const filtered = response.data.filter(item => String(item.person_id) === String(personIDFromToken));
        setData(filtered);
      } catch (error) {
        console.error("Error fetching Health Medical Records:", error);
      }
    };

    fetchMedicalRecords();
  }, [personID]);

  useEffect(() => {
    fetch("http://localhost:5000/health_medical_records")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  const steps = [
    { label: 'Personal Information', icon: <PersonIcon />, path: '/applicant' },
    { label: 'Family Background', icon: <FamilyRestroomIcon />, path: '/family_background' },
    { label: 'Educational Attainment', icon: <SchoolIcon />, path: '/educ_attainment' },
    { label: 'Health Medical Records', icon: <HealthAndSafetyIcon />, path: '/health_medical_records' },
    { label: 'Other Information', icon: <InfoIcon />, path: '/other_information' },
  ];


  const [activeStep, setActiveStep] = useState(3);
  const handleStepClick = (index) => setActiveStep(index);

  const cellStyle = {
    height: "0.25in",
    fontSize: "100%",
    border: "1px solid black",
    padding: "8px",
    verticalAlign: "middle"
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "6px",
    boxSizing: "border-box",
    backgroundColor: "white",
    color: "black",
  };



  return (
    <Container maxWidth="lg">
      <h1 style={{ textAlign: "center", color: "maroon", marginTop: "75x" }}>APPLICANT FORM</h1>
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

      <Container maxWidth="100%" sx={{ backgroundColor: "#6D2323", color: "white", borderRadius: 2, boxShadow: 3, padding: "4px" }}>
        <Box sx={{ width: "100%" }}>
          <Typography style={{ fontSize: "20px", padding: "10px", fontFamily: "Arial Black" }}>Step 4: Health and Medical Records</Typography>
        </Box>
      </Container>




      <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2, boxShadow: 2 }}>
        <style>
          {`
            .custom-radio {
              appearance: none;
              -webkit-appearance: none;
              background-color: rgb(165, 165, 165); 
              border: 1px solid #000;
              width: 16px;
              height: 16px;
              cursor: pointer;
              position: relative;
              border-radius: 2px;
              display: inline-block;
              margin: 0 4px;
              transition: background-color 0.2s ease;
            }

            .custom-radio:checked {
              background-color: rgb(65, 63, 63);
            }

            .custom-radio:checked::after {
              content: '✔';
              position: absolute;
              top: -1px;
              left: 2px;
              font-size: 14px;
              color: white;
            }

            textarea, input[type="text"], input[type="date"] {
              width: 100%;
              padding: 8px;
              font-size: 14px;
              border: 1px solid #ccc;
              border-radius: 8px;
              background-color: white;
              color: black;
              box-sizing: border-box;
            }
          `}
        </style>

        <div style={{ paddingRight: '10px' }}>

          <form style={{ maxWidth: "1500px", margin: "0 auto", fontSize: "14px" }}>
            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold", textAlign: "Left" }}>
              HEALTH AND MEDICAL RECORD:
            </Typography>
            <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />

            {/* Section I */}
            <div style={{ marginBottom: "16px" }}>
              <p style={{ marginBottom: "8px" }}>
                I. Do you have any of the following symptoms today?{" "}
                <FormGroup row sx={{ ml: 2 }}>
                  <FormControlLabel
                    control={<Checkbox checked={data[0]?.cough === 1} />}
                    label="Cough"
                    sx={{ ml: 5 }}
                  />
                  <FormControlLabel
                    control={<Checkbox checked={data[0]?.colds === 1} />}
                    label="Colds"
                    sx={{ ml: 5 }}
                  />
                  <FormControlLabel
                    control={<Checkbox checked={data[0]?.fever === 1} />}
                    label="Fever"
                    sx={{ ml: 5 }}
                  />
                </FormGroup>
              </p>
            </div>





            <div style={{ marginBottom: "16px" }}>
              <p style={{ marginBottom: "8px" }}>
                II. MEDICAL HISTORY: Have you suffered from, or been told you had, any of the following conditions:
              </p>

              <table
                style={{
                  width: "100%",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  tableLayout: "fixed",
                }}
              >
                <tbody>
                  <tr>
                    <td colSpan={15} style={{ border: "1px solid black", height: "0.25in" }}></td>
                    <td colSpan={12} style={{ border: "1px solid black", textAlign: "center" }}>Yes or No</td>

                    <td colSpan={15} style={{ border: "1px solid black", height: "0.25in" }}></td>
                    <td colSpan={12} style={{ border: "1px solid black", textAlign: "center" }}>Yes or No</td>

                    <td colSpan={15} style={{ border: "1px solid black", height: "0.25in" }}></td>
                    <td colSpan={12} style={{ border: "1px solid black", textAlign: "center" }}>Yes or No</td>
                  </tr>

                  <tr>
                    <td colSpan={15} style={cellStyle}>Asthma</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.asthma === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.asthma === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                    <td colSpan={15} style={cellStyle}>Fainting Spells and seizures</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.faintingSpells === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.faintingSpells === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                    <td colSpan={15} style={cellStyle}>Heart Disease</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.heartDisease === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.heartDisease === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={15} style={cellStyle}>Tuberculosis</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.tuberculosis === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.tuberculosis === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                    <td colSpan={15} style={cellStyle}>Frequent Headaches</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.frequentHeadaches === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.frequentHeadaches === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                    <td colSpan={15} style={cellStyle}>Hernia</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.hernia === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.hernia === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={15} style={cellStyle}>Chronic cough</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.chronicCough === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.chronicCough === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                    <td colSpan={15} style={cellStyle}>Head or neck injury</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.headNeckInjury === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.headNeckInjury === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                    <td colSpan={15} style={cellStyle}>H.I.V</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.hiv === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.hiv === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={15} style={cellStyle}>High blood pressure</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.highBloodPressure === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.highBloodPressure === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                    <td colSpan={15} style={cellStyle}>Diabetes Mellitus</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.diabetesMellitus === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.diabetesMellitus === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                    <td colSpan={15} style={cellStyle}>Allergies</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.allergies === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.allergies === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={15} style={cellStyle}>Cancer</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.cancer === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.cancer === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                    <td colSpan={15} style={cellStyle}>Smoking of cigarette/day</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.smokingCigarette === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.smokingCigarette === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                    <td colSpan={15} style={cellStyle}>Alcohol Drinking</td>
                    <td colSpan={12} style={cellStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.alcoholDrinking === 1} />}
                          label="Yes"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={data[0]?.alcoholDrinking === 0} />}
                          label="No"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>






            {/* Hospitalization History */}
            <Box mt={2} display="flex" alignItems="center" flexWrap="wrap">
              <span style={{ marginRight: '16px' }}>
                Do you have any previous history of hospitalization or operation?
              </span>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControlLabel
                  control={<Checkbox checked={data[0]?.hospitalized === 1} />}
                  label="Yes"
                />
                <FormControlLabel
                  control={<Checkbox checked={data[0]?.hospitalized === 0} />}
                  label="No"
                />
              </div>
            </Box>


            {/* Input Field for Specific Condition if Yes */}
            <div style={{ marginTop: "8px", display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "8px" }}>IF YES, PLEASE SPECIFY:</label>
              <input
                type="text"
                style={{
                  width: "50%",
                  padding: "8px",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  color: "black",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                placeholder=""
                value={data[0]?.hospitalizationDetails || ""}
                name="specificCondition"  // This will map to the database column 'hospitalizationDetails'
              />
            </div>

            {/* Medications Input */}
            <div style={{ marginTop: "16px" }}>
              <p>III. MEDICATIONS:</p>
              <textarea
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  color: "black",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
                value={data[0]?.medications || ""}
                rows="2"
                placeholder=""
                name="medications"  // This will map to the database column 'medications'
              />
            </div>




            {/* IV. COVID PROFILE */}
            <div>
              <p style={{ fontWeight: "600" }}>IV. COVID PROFILE:</p>
              <table
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  width: "100%",
                  tableLayout: "fixed",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        height: "90px",
                        fontSize: "100%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2} flexWrap="nowrap">
                        <span>A. Do you have history of COVID-19?</span>

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="covidHistoryYes"
                              checked={data[0]?.hadCovid === 1}
                            />
                          }
                          label="YES"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="covidHistoryNo"
                              checked={data[0]?.hadCovid === 0}
                            />
                          }
                          label="NO"
                        />

                        <span>IF YES, WHEN:</span>
                        <input
                          type="date"
                          value={data[0]?.covidDate || ""}

                          style={{
                            width: "200px",
                            height: "50px",
                            fontSize: "16px",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                      </Box>
                    </td>
                  </tr>



                  {/* B. COVID Vaccinations */}
                  <tr>
                    <td
                      style={{
                        fontSize: "100%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      <div style={{ fontWeight: "600", marginBottom: "8px" }}>
                        B. COVID Vaccinations:
                      </div>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          fontFamily: "Arial, Helvetica, sans-serif",
                          tableLayout: "fixed",
                        }}
                      >
                        <thead>
                          <tr>
                            <th style={{ textAlign: "left", width: "20%" }}></th>
                            <th style={{ textAlign: "center" }}>1st Dose</th>
                            <th style={{ textAlign: "center" }}>2nd Dose</th>
                            <th style={{ textAlign: "center" }}>Booster 1</th>
                            <th style={{ textAlign: "center" }}>Booster 2</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ padding: "4px 0" }}>Brand</td>
                            <td style={{ padding: "4px" }}>
                              <input
                                type="text"
                                name="vaccine1Brand"
                                value={data[0]?.vaccine1Brand || ""}
                                style={inputStyle}
                              />
                            </td>
                            <td style={{ padding: "4px" }}>
                              <input
                                type="text"
                                name="vaccine2Brand"
                                value={data[0]?.vaccine2Brand || ""}
                                style={inputStyle}
                              />
                            </td>
                            <td style={{ padding: "4px" }}>
                              <input
                                type="text"
                                name="booster1Brand"
                                value={data[0]?.booster1Brand || ""}
                                style={inputStyle}
                              />
                            </td>
                            <td style={{ padding: "4px" }}>
                              <input
                                type="text"
                                name="booster2Brand"
                                value={data[0]?.booster2Brand || ""}
                                style={inputStyle}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: "4px 0" }}>Date</td>
                            <td style={{ padding: "4px" }}>
                              <input
                                type="date"
                                name="vaccine1Date"
                                value={data[0]?.vaccine1Date || ""}
                                style={inputStyle}
                              />
                            </td>
                            <td style={{ padding: "4px" }}>
                              <input
                                type="date"
                                name="vaccine2Date"
                                value={data[0]?.vaccine2Date || ""}
                                style={inputStyle}
                              />
                            </td>
                            <td style={{ padding: "4px" }}>
                              <input
                                type="date"
                                name="booster1Date"
                                value={data[0]?.booster1Date || ""}
                                style={inputStyle}
                              />
                            </td>
                            <td style={{ padding: "4px" }}>
                              <input
                                type="date"
                                name="booster2Date"
                                value={data[0]?.booster2Date || ""}
                                style={inputStyle}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>



                </tbody>
              </table>
            </div>


            {/* V. Test Results */}
            <div>
              <p style={{ fontWeight: "600" }}>V. Please Indicate Result of the Following:</p>
              <table
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  width: "100%",
                  tableLayout: "fixed",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        width: "30%",
                        fontSize: "100%",
                      }}
                    >
                      Chest X-ray:
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        width: "70%",
                      }}
                    >
                      <input
                        type="text"
                        value={data[0]?.chestXray || ""}
                        style={{
                          width: "100%",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "6px",
                          boxSizing: "border-box",
                          backgroundColor: "white",
                          color: "black",
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        width: "30%",
                        fontSize: "100%",
                      }}
                    >
                      Complete Blood Count (CBC):
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        width: "70%",
                      }}
                    >
                      <input
                        type="text"
                        value={data[0]?.cbc || ""}
                        style={{
                          width: "100%",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "6px",
                          boxSizing: "border-box",
                          backgroundColor: "white",
                          color: "black",
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        width: "30%",
                        fontSize: "100%",
                      }}
                    >
                      Urinalysis:
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        width: "70%",
                      }}
                    >
                      <input
                        type="text"
                        value={data[0]?.urinalysis || ""}
                        style={{
                          width: "100%",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "6px",
                          boxSizing: "border-box",
                          backgroundColor: "white",
                          color: "black",
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        width: "30%",
                        fontSize: "100%",
                      }}
                    >
                      Others (Please specify work-ups and results):
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        width: "70%",
                      }}
                    >
                      <input
                        type="text"
                        value={data[0]?.otherworkups || ""}
                        style={{
                          width: "100%",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "6px",
                          boxSizing: "border-box",
                          backgroundColor: "white",
                          color: "black",
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>






            <div>
              <p style={{ fontWeight: "600" }}>VI. Diagnosis:</p>
              <table
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  width: "100%",
                  tableLayout: "fixed",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        fontSize: "100%",
                      }}
                    >
                      Do you have any of the following symptoms today?
                      <div style={{ marginTop: "8px" }}>
                        <FormGroup row sx={{ ml: 2 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="symptomsToday"
                                checked={data[0]?.symptomsToday === 1} // If symptomsToday is 1, check the box
                              />
                            }
                            label="Physically Fit"
                            sx={{ mr: 3 }}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="symptomsToday"
                                checked={data[0]?.symptomsToday === 0} // If symptomsToday is 0, check the box for Compliance
                              />
                            }
                            label="For Compliance"
                          />
                        </FormGroup>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>



            {/* VII. Remarks */}
            <div style={{ marginTop: "16px" }}>
              <p style={{ fontWeight: "600" }}>VII. Remarks:</p>
              <table
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  width: "100%",
                  tableLayout: "fixed",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      <textarea
                        rows="2"
                        style={{
                          width: "100%",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "8px",
                          boxSizing: "border-box",
                          backgroundColor: "white",
                          color: "black",
                          resize: "none",
                        }}
                        value={data[0]?.remarks || ""}
                        onChange={(e) => {
                          // Optionally, you can handle changes here if you want to update the state
                          // e.g., setData({...data, remarks: e.target.value});
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </form>
        </div>
      
        <Box display="flex" justifyContent="space-between" mt={4}>
          {/* Previous Page Button */}
          <Button
            variant="contained"
            component={Link}
            to="/educ_attainment"
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
            to="/other_information"
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
      </Box>

    </Container>

  );
};

export default HealthMedicalRecords;
