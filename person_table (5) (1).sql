-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2025 at 05:24 PM
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
-- Table structure for table `person_table`
--

CREATE TABLE `person_table` (
  `person_id` int(11) NOT NULL,
  `profile_picture` varchar(25) NOT NULL,
  `campus` varchar(25) DEFAULT NULL,
  `academicProgram` varchar(25) DEFAULT NULL,
  `classifiedAs` varchar(25) DEFAULT NULL,
  `program` varchar(75) DEFAULT NULL,
  `yearLevel` varchar(10) DEFAULT NULL,
  `lastName` varchar(10) DEFAULT NULL,
  `firstName` varchar(10) DEFAULT NULL,
  `middleName` varchar(10) DEFAULT NULL,
  `extension` varchar(10) DEFAULT NULL,
  `nickname` varchar(10) DEFAULT NULL,
  `height` varchar(10) DEFAULT NULL,
  `weight` varchar(10) DEFAULT NULL,
  `lrnNumber` varchar(10) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `pwdType` varchar(10) DEFAULT NULL,
  `pwdId` varchar(10) DEFAULT NULL,
  `birthOfDate` varchar(10) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `birthPlace` varchar(10) DEFAULT NULL,
  `languageDialectSpoken` varchar(10) DEFAULT NULL,
  `citizenship` varchar(10) DEFAULT NULL,
  `religion` varchar(10) DEFAULT NULL,
  `civilStatus` varchar(10) DEFAULT NULL,
  `tribeEthnicGroup` varchar(10) DEFAULT NULL,
  `otherEthnicGroup` varchar(10) NOT NULL,
  `cellphoneNumber` varchar(10) DEFAULT NULL,
  `emailAddress` varchar(35) DEFAULT NULL,
  `telephoneNumber` varchar(10) DEFAULT NULL,
  `facebookAccount` varchar(25) DEFAULT NULL,
  `presentStreet` varchar(10) DEFAULT NULL,
  `presentBarangay` varchar(10) DEFAULT NULL,
  `presentZipCode` varchar(10) DEFAULT NULL,
  `presentRegion` varchar(75) DEFAULT NULL,
  `presentProvince` varchar(25) DEFAULT NULL,
  `presentMunicipality` varchar(25) DEFAULT NULL,
  `presentDswdHouseholdNumber` varchar(10) DEFAULT NULL,
  `permanentStreet` varchar(10) DEFAULT NULL,
  `permanentBarangay` varchar(10) DEFAULT NULL,
  `permanentZipCode` varchar(10) DEFAULT NULL,
  `permanentRegion` varchar(75) DEFAULT NULL,
  `permanentProvince` varchar(25) DEFAULT NULL,
  `permanentMunicipality` varchar(25) DEFAULT NULL,
  `permanentDswdHouseholdNumber` varchar(10) DEFAULT NULL,
  `solo_parent` varchar(5) DEFAULT NULL,
  `father_deceased` varchar(5) DEFAULT NULL,
  `father_family_name` varchar(10) DEFAULT NULL,
  `father_given_name` varchar(10) DEFAULT NULL,
  `father_middle_name` varchar(10) DEFAULT NULL,
  `father_ext` varchar(10) DEFAULT NULL,
  `father_nickname` varchar(10) DEFAULT NULL,
  `father_education_level` varchar(50) DEFAULT NULL,
  `father_last_school` varchar(50) DEFAULT NULL,
  `father_course` varchar(50) DEFAULT NULL,
  `father_year_graduated` varchar(10) DEFAULT NULL,
  `father_school_address` varchar(40) DEFAULT NULL,
  `father_contact` varchar(15) DEFAULT NULL,
  `father_occupation` varchar(30) DEFAULT NULL,
  `father_employer` varchar(10) DEFAULT NULL,
  `father_income` varchar(10) DEFAULT NULL,
  `father_email` varchar(35) DEFAULT NULL,
  `mother_deceased` varchar(5) DEFAULT NULL,
  `mother_family_name` varchar(10) DEFAULT NULL,
  `mother_given_name` varchar(10) DEFAULT NULL,
  `mother_middle_name` varchar(10) DEFAULT NULL,
  `mother_nickname` varchar(10) DEFAULT NULL,
  `mother_education_level` varchar(50) DEFAULT NULL,
  `mother_last_school` varchar(50) DEFAULT NULL,
  `mother_course` varchar(50) DEFAULT NULL,
  `mother_year_graduated` varchar(10) DEFAULT NULL,
  `mother_school_address` varchar(10) DEFAULT NULL,
  `mother_contact` varchar(15) DEFAULT NULL,
  `mother_occupation` varchar(10) DEFAULT NULL,
  `mother_employer` varchar(10) DEFAULT NULL,
  `mother_income` varchar(10) DEFAULT NULL,
  `mother_email` varchar(35) DEFAULT NULL,
  `guardian` varchar(10) DEFAULT NULL,
  `guardian_family_name` varchar(10) DEFAULT NULL,
  `guardian_given_name` varchar(10) DEFAULT NULL,
  `guardian_middle_name` varchar(10) DEFAULT NULL,
  `guardian_ext` varchar(10) DEFAULT NULL,
  `guardian_nickname` varchar(10) DEFAULT NULL,
  `guardian_address` varchar(50) DEFAULT NULL,
  `guardian_contact` varchar(15) DEFAULT NULL,
  `guardian_email` varchar(35) DEFAULT NULL,
  `annual_income` varchar(50) DEFAULT NULL,
  `schoolLevel` varchar(50) DEFAULT NULL,
  `schoolLastAttended` varchar(50) DEFAULT NULL,
  `schoolAddress` varchar(50) DEFAULT NULL,
  `courseProgram` varchar(50) DEFAULT NULL,
  `honor` varchar(10) DEFAULT NULL,
  `generalAverage` varchar(10) DEFAULT NULL,
  `yearGraduated` varchar(10) DEFAULT NULL,
  `strand` varchar(50) DEFAULT NULL,
  `cough` int(10) DEFAULT NULL,
  `colds` int(10) DEFAULT NULL,
  `fever` int(10) DEFAULT NULL,
  `asthma` int(10) DEFAULT NULL,
  `faintingSpells` int(10) DEFAULT NULL,
  `heartDisease` int(10) DEFAULT NULL,
  `tuberculosis` int(10) DEFAULT NULL,
  `frequentHeadaches` int(10) DEFAULT NULL,
  `hernia` int(10) DEFAULT NULL,
  `chronicCough` int(10) DEFAULT NULL,
  `headNeckInjury` int(10) DEFAULT NULL,
  `hiv` int(10) DEFAULT NULL,
  `highBloodPressure` int(10) DEFAULT NULL,
  `diabetesMellitus` int(10) DEFAULT NULL,
  `allergies` int(10) DEFAULT NULL,
  `cancer` int(10) DEFAULT NULL,
  `smokingCigarette` int(10) DEFAULT NULL,
  `alcoholDrinking` int(10) DEFAULT NULL,
  `hospitalized` int(10) DEFAULT NULL,
  `hospitalizationDetails` varchar(50) DEFAULT NULL,
  `medications` varchar(50) DEFAULT NULL,
  `hadCovid` int(10) DEFAULT NULL,
  `covidDate` varchar(10) DEFAULT NULL,
  `vaccine1Brand` varchar(10) DEFAULT NULL,
  `vaccine1Date` varchar(10) DEFAULT NULL,
  `vaccine2Brand` varchar(10) DEFAULT NULL,
  `vaccine2Date` varchar(10) DEFAULT NULL,
  `booster1Brand` varchar(10) DEFAULT NULL,
  `booster1Date` varchar(10) DEFAULT NULL,
  `booster2Brand` varchar(10) DEFAULT NULL,
  `booster2Date` varchar(10) DEFAULT NULL,
  `chestXray` varchar(10) DEFAULT NULL,
  `cbc` varchar(10) DEFAULT NULL,
  `urinalysis` varchar(10) DEFAULT NULL,
  `otherworkups` varchar(40) DEFAULT NULL,
  `symptomsToday` int(10) DEFAULT NULL,
  `remarks` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `person_table`
--

INSERT INTO `person_table` (`person_id`, `profile_picture`, `campus`, `academicProgram`, `classifiedAs`, `program`, `yearLevel`, `lastName`, `firstName`, `middleName`, `extension`, `nickname`, `height`, `weight`, `lrnNumber`, `gender`, `pwdType`, `pwdId`, `birthOfDate`, `age`, `birthPlace`, `languageDialectSpoken`, `citizenship`, `religion`, `civilStatus`, `tribeEthnicGroup`, `otherEthnicGroup`, `cellphoneNumber`, `emailAddress`, `telephoneNumber`, `facebookAccount`, `presentStreet`, `presentBarangay`, `presentZipCode`, `presentRegion`, `presentProvince`, `presentMunicipality`, `presentDswdHouseholdNumber`, `permanentStreet`, `permanentBarangay`, `permanentZipCode`, `permanentRegion`, `permanentProvince`, `permanentMunicipality`, `permanentDswdHouseholdNumber`, `solo_parent`, `father_deceased`, `father_family_name`, `father_given_name`, `father_middle_name`, `father_ext`, `father_nickname`, `father_education_level`, `father_last_school`, `father_course`, `father_year_graduated`, `father_school_address`, `father_contact`, `father_occupation`, `father_employer`, `father_income`, `father_email`, `mother_deceased`, `mother_family_name`, `mother_given_name`, `mother_middle_name`, `mother_nickname`, `mother_education_level`, `mother_last_school`, `mother_course`, `mother_year_graduated`, `mother_school_address`, `mother_contact`, `mother_occupation`, `mother_employer`, `mother_income`, `mother_email`, `guardian`, `guardian_family_name`, `guardian_given_name`, `guardian_middle_name`, `guardian_ext`, `guardian_nickname`, `guardian_address`, `guardian_contact`, `guardian_email`, `annual_income`, `schoolLevel`, `schoolLastAttended`, `schoolAddress`, `courseProgram`, `honor`, `generalAverage`, `yearGraduated`, `strand`, `cough`, `colds`, `fever`, `asthma`, `faintingSpells`, `heartDisease`, `tuberculosis`, `frequentHeadaches`, `hernia`, `chronicCough`, `headNeckInjury`, `hiv`, `highBloodPressure`, `diabetesMellitus`, `allergies`, `cancer`, `smokingCigarette`, `alcoholDrinking`, `hospitalized`, `hospitalizationDetails`, `medications`, `hadCovid`, `covidDate`, `vaccine1Brand`, `vaccine1Date`, `vaccine2Brand`, `vaccine2Date`, `booster1Brand`, `booster1Date`, `booster2Brand`, `booster2Date`, `chestXray`, `cbc`, `urinalysis`, `otherworkups`, `symptomsToday`, `remarks`) VALUES
(262626, '5_profile_picture.jpg', 'MANILA', 'Undergraduate', 'Freshman (First Year)', 'Bachelor of Science in Information Technology (BS INFO. TECH.)', 'First Year', 'Montano', 'Mark', 'Placido', NULL, 'Mark', '165', '53', '1111111', 'MALE', 'Low-vision', '0', '2003-06-26', 21, 'GentleHans', 'Tagalog', 'FILIPINO', 'Christian', 'Single', 'Agta', 'HAHA', '0994818368', 'montano.ma.bsinfotech@gmail.com', 'N/A', 'Mark Montano', '19 G K1', 'Libis', '1110', 'NCR - National Capital Region', 'Metro Manila', 'Quezon City', 'N/A', '19 G K1', 'Libis', '1110', 'NCR - National Capital Region', 'Metro Manila', 'Quezon City', 'N/A', NULL, NULL, 'Montano', 'Mario', 'Alberto', NULL, 'Mar', 'College Graduate', 'UP Diliman', 'Marine', '1990', 'Quezon City', '09666287280', 'House Husband', 'N/A', '10,000', 'mariomontano0505@gmail.com', NULL, 'Placido', 'Rolinda', 'Caluba', 'Linda', 'College Graduate', 'Earist Manila', 'BS Accountancy', '2000', 'Nagtahan', '09770361991', 'Business', 'N/A', '20,000', 'rolindamontano@gmail.com', 'Father', 'Montano', 'Mario', 'Alberto', NULL, 'Mar', '19 G K1. Dona Yayang Street Libis QC', '09666287280', 'mariomontano0505@gmail.com', '80,000 and below', 'Senior High School', 'Camp General Emilio Aguinaldo High School', 'Murphy Quezon City', 'TVL - ICT', 'N/A', '93.250', '2022', 'Information and Communications Technology (ICT)', 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'Appendicitis 2016', 'Vitamin C', 1, '2022-01-02', 'Pfizer', '2021-06-20', 'Pfizer', '2021-07-20', 'Moderna', '2022-09-01', 'Sinovac', NULL, 'Normal', 'Normal', 'Normal', 'Normal', 1, 'None ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `person_table`
--
ALTER TABLE `person_table`
  ADD PRIMARY KEY (`person_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `person_table`
--
ALTER TABLE `person_table`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=262628;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
