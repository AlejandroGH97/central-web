import SearchBox from "../../Container/SearchBox/SearchBox";
import DataBox from "../../Container/DataBox/DataBox";

import styles from "./Home.module.css";
import { useState } from "react";

let causes = [
  "All Cause",
  "Natural Cause",
  "Septicemia",
  "Malignant Neoplasms",
  "Diabetes Mellitus",
  "Alzheimer Disease",
  "Influenza and Pneumonia",
  "Chronic Lower Respiratory Diseases",
  "Other Diseases of Respiratory System",
  "Nephritis, Nephrotic Syndrome, and Nephrosis",
  "Symptoms, Signs, and Abnormal Clinical and Laboratory Findings, Not Elsewhere Classified",
  "Diseases of Heart",
  "Cerebrovascular Diseases",
  "Accidents (Unintentional Injuries)",
  "Motor Vehicle Accidents",
  "Intentional Self-Harm (Suicide)",
  "Assault (Homicide)",
  "Drug Overdose",
];

const Home = () => {
  const [selectedCause, setselectedCause] = useState("");

  const selectedCauseChangeHandler = (e) => {
		
	};

  return (
    <div className={styles.home}>
      <SearchBox causeChange={selectedCauseChangeHandler} causeList={causes}/>
      <DataBox cause={selectedCause} />
    </div>
  );
};

export default Home;
