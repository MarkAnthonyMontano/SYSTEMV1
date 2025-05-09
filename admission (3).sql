-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2025 at 04:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admission`
--

-- --------------------------------------------------------

--
-- Table structure for table `admission_requirement`
--

CREATE TABLE `admission_requirement` (
  `requirements_id` int(11) NOT NULL,
  `requirements_description` varchar(500) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admission_requirement`
--

INSERT INTO `admission_requirement` (`requirements_id`, `requirements_description`, `image_path`) VALUES
(1, 'Original and Photocopy of high school report card (form 138) duly signed by the school Principal and/or Registrar', '/uploads/1742451253156-396258677_1054941569018505_3459809278394292113_n.png'),
(2, 'Original and Photocopy of Certificate of Good Moral Character', NULL),
(3, 'Original and Photocopy of NSO Birth Certificate', '/uploads/1742451275906-826785b8445e64de2be00c01f40cc12e.jpg'),
(4, 'Recent One (1) piece 1x1 picture(white background)', '/uploads/1742451480560-826785b8445e64de2be00c01f40cc12e.jpg'),
(5, 'Certification from School Principal and/or Registrar with School\'s dry seal that no copy of applicant\'s form 137 has been sent to other College or University', NULL),
(6, 'Notarized Affidavit that the applicant did not enroll in any College or University within and/or outside the country with (waiver) that if there is concealment of previous enrollment, the City of Malabon University enrollment shall be null and void', '/uploads/1742451510115-b0c6d84cd8cb71ee4cca35dfd27d24f0.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `applicant_requirements`
--

CREATE TABLE `applicant_requirements` (
  `id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `student_requirement_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `person_table`
--

CREATE TABLE `person_table` (
  `person_id` int(11) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `campus` int(11) DEFAULT NULL,
  `academicProgram` varchar(100) DEFAULT NULL,
  `classifiedAs` varchar(50) DEFAULT NULL,
  `program` varchar(100) DEFAULT NULL,
  `program2` varchar(100) DEFAULT NULL,
  `program3` varchar(100) DEFAULT NULL,
  `yearLevel` varchar(30) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `middleName` varchar(100) DEFAULT NULL,
  `extension` varchar(10) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `height` varchar(10) DEFAULT NULL,
  `weight` varchar(10) DEFAULT NULL,
  `lrnNumber` varchar(20) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `pwdType` varchar(50) DEFAULT NULL,
  `pwdId` varchar(50) DEFAULT NULL,
  `birthOfDate` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `birthPlace` varchar(255) DEFAULT NULL,
  `languageDialectSpoken` varchar(255) DEFAULT NULL,
  `citizenship` varchar(50) DEFAULT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `civilStatus` varchar(50) DEFAULT NULL,
  `tribeEthnicGroup` varchar(50) DEFAULT NULL,
  `otherEthnicGroup` varchar(50) NOT NULL,
  `cellphoneNumber` varchar(20) DEFAULT NULL,
  `emailAddress` varchar(100) DEFAULT NULL,
  `telephoneNumber` varchar(20) DEFAULT NULL,
  `facebookAccount` varchar(255) DEFAULT NULL,
  `presentStreet` varchar(255) DEFAULT NULL,
  `presentBarangay` varchar(100) DEFAULT NULL,
  `presentZipCode` varchar(10) DEFAULT NULL,
  `presentRegion` varchar(75) DEFAULT NULL,
  `presentProvince` varchar(75) DEFAULT NULL,
  `presentMunicipality` varchar(75) DEFAULT NULL,
  `presentDswdHouseholdNumber` varchar(50) DEFAULT NULL,
  `permanentStreet` varchar(255) DEFAULT NULL,
  `permanentBarangay` varchar(100) DEFAULT NULL,
  `permanentZipCode` varchar(10) DEFAULT NULL,
  `permanentRegion` varchar(75) DEFAULT NULL,
  `permanentProvince` varchar(75) DEFAULT NULL,
  `permanentMunicipality` varchar(75) DEFAULT NULL,
  `permanentDswdHouseholdNumber` varchar(50) DEFAULT NULL,
  `solo_parent` varchar(5) DEFAULT NULL,
  `father_deceased` varchar(5) DEFAULT NULL,
  `father_family_name` varchar(100) DEFAULT NULL,
  `father_given_name` varchar(100) DEFAULT NULL,
  `father_middle_name` varchar(100) DEFAULT NULL,
  `father_ext` varchar(10) DEFAULT NULL,
  `father_nickname` varchar(50) DEFAULT NULL,
  `father_education_level` varchar(100) DEFAULT NULL,
  `father_last_school` varchar(100) DEFAULT NULL,
  `father_course` varchar(100) DEFAULT NULL,
  `father_year_graduated` varchar(10) DEFAULT NULL,
  `father_school_address` varchar(255) DEFAULT NULL,
  `father_contact` varchar(20) DEFAULT NULL,
  `father_occupation` varchar(100) DEFAULT NULL,
  `father_employer` varchar(100) DEFAULT NULL,
  `father_income` varchar(20) DEFAULT NULL,
  `father_email` varchar(100) DEFAULT NULL,
  `mother_deceased` varchar(5) DEFAULT NULL,
  `mother_family_name` varchar(100) DEFAULT NULL,
  `mother_given_name` varchar(100) DEFAULT NULL,
  `mother_middle_name` varchar(100) DEFAULT NULL,
  `mother_nickname` varchar(50) DEFAULT NULL,
  `mother_education_level` varchar(100) DEFAULT NULL,
  `mother_last_school` varchar(100) DEFAULT NULL,
  `mother_course` varchar(100) DEFAULT NULL,
  `mother_year_graduated` varchar(10) DEFAULT NULL,
  `mother_school_address` varchar(255) DEFAULT NULL,
  `mother_contact` varchar(20) DEFAULT NULL,
  `mother_occupation` varchar(100) DEFAULT NULL,
  `mother_employer` varchar(100) DEFAULT NULL,
  `mother_income` varchar(20) DEFAULT NULL,
  `mother_email` varchar(100) DEFAULT NULL,
  `guardian` varchar(100) DEFAULT NULL,
  `guardian_family_name` varchar(100) DEFAULT NULL,
  `guardian_given_name` varchar(100) DEFAULT NULL,
  `guardian_middle_name` varchar(100) DEFAULT NULL,
  `guardian_ext` varchar(10) DEFAULT NULL,
  `guardian_nickname` varchar(50) DEFAULT NULL,
  `guardian_address` varchar(255) DEFAULT NULL,
  `guardian_contact` varchar(20) DEFAULT NULL,
  `guardian_email` varchar(100) DEFAULT NULL,
  `annual_income` varchar(50) DEFAULT NULL,
  `schoolLevel` varchar(50) DEFAULT NULL,
  `schoolLastAttended` varchar(100) DEFAULT NULL,
  `schoolAddress` varchar(255) DEFAULT NULL,
  `courseProgram` varchar(100) DEFAULT NULL,
  `honor` varchar(100) DEFAULT NULL,
  `generalAverage` decimal(5,2) DEFAULT NULL,
  `yearGraduated` int(11) DEFAULT NULL,
  `strand` varchar(100) DEFAULT NULL,
  `cough` int(11) DEFAULT NULL,
  `colds` int(11) DEFAULT NULL,
  `fever` int(11) DEFAULT NULL,
  `asthma` int(11) DEFAULT NULL,
  `faintingSpells` int(11) DEFAULT NULL,
  `heartDisease` int(11) DEFAULT NULL,
  `tuberculosis` int(11) DEFAULT NULL,
  `frequentHeadaches` int(11) DEFAULT NULL,
  `hernia` int(11) DEFAULT NULL,
  `chronicCough` int(11) DEFAULT NULL,
  `headNeckInjury` int(11) DEFAULT NULL,
  `hiv` int(11) DEFAULT NULL,
  `highBloodPressure` int(11) DEFAULT NULL,
  `diabetesMellitus` int(11) DEFAULT NULL,
  `allergies` int(11) DEFAULT NULL,
  `cancer` int(11) DEFAULT NULL,
  `smokingCigarette` int(11) DEFAULT NULL,
  `alcoholDrinking` int(11) DEFAULT NULL,
  `hospitalized` int(11) DEFAULT NULL,
  `hospitalizationDetails` varchar(255) DEFAULT NULL,
  `medications` varchar(255) DEFAULT NULL,
  `hadCovid` int(11) DEFAULT NULL,
  `covidDate` varchar(50) DEFAULT NULL,
  `vaccine1Brand` varchar(50) DEFAULT NULL,
  `vaccine1Date` varchar(50) DEFAULT NULL,
  `vaccine2Brand` varchar(50) DEFAULT NULL,
  `vaccine2Date` varchar(50) DEFAULT NULL,
  `booster1Brand` varchar(50) DEFAULT NULL,
  `booster1Date` varchar(50) DEFAULT NULL,
  `booster2Brand` varchar(50) DEFAULT NULL,
  `booster2Date` varchar(50) DEFAULT NULL,
  `chestXray` varchar(100) DEFAULT NULL,
  `cbc` varchar(100) DEFAULT NULL,
  `urinalysis` varchar(100) DEFAULT NULL,
  `otherworkups` varchar(255) DEFAULT NULL,
  `symptomsToday` int(11) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `termsOfAgreement` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `person_table`
--

INSERT INTO `person_table` (`person_id`, `profile_picture`, `campus`, `academicProgram`, `classifiedAs`, `program`, `program2`, `program3`, `yearLevel`, `lastName`, `firstName`, `middleName`, `extension`, `nickname`, `height`, `weight`, `lrnNumber`, `gender`, `pwdType`, `pwdId`, `birthOfDate`, `age`, `birthPlace`, `languageDialectSpoken`, `citizenship`, `religion`, `civilStatus`, `tribeEthnicGroup`, `otherEthnicGroup`, `cellphoneNumber`, `emailAddress`, `telephoneNumber`, `facebookAccount`, `presentStreet`, `presentBarangay`, `presentZipCode`, `presentRegion`, `presentProvince`, `presentMunicipality`, `presentDswdHouseholdNumber`, `permanentStreet`, `permanentBarangay`, `permanentZipCode`, `permanentRegion`, `permanentProvince`, `permanentMunicipality`, `permanentDswdHouseholdNumber`, `solo_parent`, `father_deceased`, `father_family_name`, `father_given_name`, `father_middle_name`, `father_ext`, `father_nickname`, `father_education_level`, `father_last_school`, `father_course`, `father_year_graduated`, `father_school_address`, `father_contact`, `father_occupation`, `father_employer`, `father_income`, `father_email`, `mother_deceased`, `mother_family_name`, `mother_given_name`, `mother_middle_name`, `mother_nickname`, `mother_education_level`, `mother_last_school`, `mother_course`, `mother_year_graduated`, `mother_school_address`, `mother_contact`, `mother_occupation`, `mother_employer`, `mother_income`, `mother_email`, `guardian`, `guardian_family_name`, `guardian_given_name`, `guardian_middle_name`, `guardian_ext`, `guardian_nickname`, `guardian_address`, `guardian_contact`, `guardian_email`, `annual_income`, `schoolLevel`, `schoolLastAttended`, `schoolAddress`, `courseProgram`, `honor`, `generalAverage`, `yearGraduated`, `strand`, `cough`, `colds`, `fever`, `asthma`, `faintingSpells`, `heartDisease`, `tuberculosis`, `frequentHeadaches`, `hernia`, `chronicCough`, `headNeckInjury`, `hiv`, `highBloodPressure`, `diabetesMellitus`, `allergies`, `cancer`, `smokingCigarette`, `alcoholDrinking`, `hospitalized`, `hospitalizationDetails`, `medications`, `hadCovid`, `covidDate`, `vaccine1Brand`, `vaccine1Date`, `vaccine2Brand`, `vaccine2Date`, `booster1Brand`, `booster1Date`, `booster2Brand`, `booster2Date`, `chestXray`, `cbc`, `urinalysis`, `otherworkups`, `symptomsToday`, `remarks`, `termsOfAgreement`) VALUES
(262626, '262626_profile_picture.jpg', 0, 'Undergraduate', 'Freshman (First Year)', 'Bachelor of Science in Information Technology (BS INFO. TECH.)', 'Bachelor of Science in Computer Science (BSCS)', 'Bachelor of Science in Computer Engineering (BSCOE)', 'Third Year', 'Doeeee', 'John', 'Michael', 'V', 'Johnny', '5\'11', '65kg', '123456789012', 0, 'Visual Impairment', 'PWD12345', '2003-06-20', 21, 'Manila, Philippines', 'Tagalog, English', 'FILIPINO', 'Born Again', 'Single', 'Agta', 'Wala', '09171234567', 'johndoe@email.com', '028123456', 'facebook.com/johndoe', '123 Mabini St.', '137404053', '1000', '13', '1374', '137404', 'DSWD123456', '123 Mabini St.', '137404053', '1000', '13', '1374', '137404', 'DSWD654321', 'Yes', 'No', 'Doe Sr.', 'Jonathan', 'Smiths', 'III', 'Jon', 'College Graduate', 'UP Diliman', 'Engineering', '1990', 'Quezon City', '09181234567', 'Engineer', 'ABC Corp', '50000', 'jon.doe@abc.com', 'No', 'Jane', 'Mary', 'Anne', 'Janey', 'College Graduate', 'PUP', 'Business Admin', '1992', 'Sta. Mesa', '09221234567', 'Accountant', 'XYZ Corp', '45000', 'jane.doe@xyz.com', 'Father', 'Parker', 'Ben', 'Jose', NULL, 'Benny', '789 Recto Ave', '09192233445', 'uncleben@family.com', '80,000 and below', 'Senior High School', 'Rizal High School', 'Pasig City', 'STEM', 'With Honors', 92.50, 2022, 'Information and Communications Technology (ICT)', 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'Wala ngani', 'Vitamins C', 1, '2022-02-11', 'Pfizer', '2022-03-14', 'Pfizer', '2022-04-13', 'Moderna', '2022-07-14', 'Pfizer', '2023-01-14', 'Normal', 'Normal', 'Normal', 'Normal', 1, 'Fit to enroll', 1);

-- --------------------------------------------------------

--
-- Table structure for table `requirements`
--

CREATE TABLE `requirements` (
  `requirements_id` int(11) NOT NULL,
  `requirements_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_account`
--

CREATE TABLE `users_account` (
  `user_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_account`
--

INSERT INTO `users_account` (`user_id`, `person_id`, `email`, `password`) VALUES
(1, 8, 'ardenhello@gmail.com', '$2b$10$dxs3rjyLGQtPIeDpyeAUTOsViqjJWC6ZYb1uhlWSZLePjvPOj/qZ.'),
(2, 9, 'helloworld@gmail.com', '$2b$10$nFy87sT3nxNm86U2h68Q3u4kWEQaKX2RoNAvTE4hbr65833rNq8Qq'),
(3, 10, 'cedrick.delacruz@gmail.com', '$2b$10$iS690ZkAbnEK1d35JhonwO6RxEVsK9M.R4PkgHWiJHtvktwCAT642'),
(4, 11, 'cedrick.delacruz', '$2b$10$hiAlk6x24spR8Syk7jGOyOlsFnH3ztSyKij1hCn6laNYVE/E/rQGa'),
(6, 15, 'mecasio.a.bsinfotech@gmail.com', '$2b$10$1A/ryJsTy5Y7fMFGYjLmkeyr8LMAtqxlPxREG//Q4h9pp9uqHzYGu'),
(21, 30, 'ardenmecasio1211@gmail.com', '$2b$10$CwMDQ9trHjw2DLbz6mpD3ummXPTKGMNDdxFcXHRuTRm7iHS1okspa'),
(22, 31, 'arden13qwerty@gmail.com', '$2b$10$MLJOG7LqgmsxdP1dFbzfJeB7p0a0zWCTd0oodmK1Hg8G8DBPDm4E.'),
(23, 32, 'rafaelkennethsaluba@gmail.com', '$2b$10$WFqoon2ZpoTehDeAdTYtjuE5I2IhrP7lKYBecjFnNOTV2GM82HRQ.'),
(24, 33, 'ardenhello123@gmail.com', '$2b$10$H2DNHN9ZbbU7bnrO24T65eTF.BLiBwWvdFXNLeFmhrnpASwwj3Wcy'),
(25, 34, 'freddiellove9@gmail.com', '$2b$10$ouU4m5BvmMPtPacCR1c/Z.Jw3PzWkm7NoMVAw/btg6/OVBy/AHoli'),
(26, 35, 'helloarden@gmail.com', '$2b$10$YVNJgFT27RZlhF7pKaBJge8hIIQlDptxGnCDvemt.NxisJ9PZ6T1C');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admission_requirement`
--
ALTER TABLE `admission_requirement`
  ADD PRIMARY KEY (`requirements_id`);

--
-- Indexes for table `applicant_requirements`
--
ALTER TABLE `applicant_requirements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `person_id` (`person_id`),
  ADD KEY `student_requirement_id` (`student_requirement_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `person_table`
--
ALTER TABLE `person_table`
  ADD PRIMARY KEY (`person_id`);

--
-- Indexes for table `requirements`
--
ALTER TABLE `requirements`
  ADD PRIMARY KEY (`requirements_id`);

--
-- Indexes for table `users_account`
--
ALTER TABLE `users_account`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `person_id` (`person_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admission_requirement`
--
ALTER TABLE `admission_requirement`
  MODIFY `requirements_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `applicant_requirements`
--
ALTER TABLE `applicant_requirements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `requirements`
--
ALTER TABLE `requirements`
  MODIFY `requirements_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users_account`
--
ALTER TABLE `users_account`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
