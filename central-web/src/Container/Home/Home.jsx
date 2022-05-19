import SearchBox from "../../Container/SearchBox/SearchBox";
import DataBox from "../../Container/DataBox/DataBox";

import styles from "./Home.module.css";
import { useEffect, useState } from "react";

let causesMock = [
  { cause: "All Cause" },
  { cause: "Natural Cause" },
  { cause: "Septicemia" },
  { cause: "Malignant Neoplasms" },
  { cause: "Diabetes Mellitus" },
  { cause: "Alzheimer Disease" },
  { cause: "Influenza and Pneumonia" },
  { cause: "Chronic Lower Respiratory Diseases" },
  { cause: "Other Diseases of Respiratory System" },
  { cause: "Nephritis, Nephrotic Syndrome, and Nephrosis" },
  { cause: "Others Not Listed" },
  { cause: "Diseases of Heart" },
  { cause: "Cerebrovascular Diseases" },
  { cause: "Accidents (Unintentional Injuries)" },
  { cause: "Motor Vehicle Accidents" },
  { cause: "Intentional Self-Harm (Suicide)" },
  { cause: "Assault (Homicide)" },
  { cause: "Drug Overdose" },
];

const Home = () => {
  const [selectedCause, setSelectedCause] = useState({});
  const [causeList, setCauseList] = useState([]);

  useEffect(() => {
    // TODO: Pedir data al back
    let savedFavorites = JSON.parse(localStorage.getItem("favoriteCauses")) || [];
    const causes = causesMock.map((cause) => {
      const isFav = savedFavorites.findIndex((fav) => {
        return fav === cause.cause;
      });
      return { ...cause, isFavorite: isFav !== -1 };
    });
    setCauseList(() => {
      return causes;
    });
    setSelectedCause(causes[0]);
  }, []);

  const selectedCauseChangeHandler = (newCause) => {
    setSelectedCause(newCause);
  };

  const favoriteCauseHandler = (favCause) => {
    setCauseList((prevList) => {
      const newList = prevList.map((cause) => {
        if (cause.cause === favCause.cause) {
          return { cause: cause.cause, isFavorite: !cause.isFavorite };
        }
        return cause;
      });
      localStorage.setItem(
        "favoriteCauses",
        JSON.stringify(newList.filter((cause) => cause.isFavorite === true).map((cause) => cause.cause))
      );
      return newList;
    });

    if (favCause.cause === selectedCause.cause) {
      setSelectedCause((prevSelected) => {
        const newSelected = {
          ...prevSelected,
          isFavorite: !prevSelected.isFavorite,
        };
        return newSelected;
      });
    }
  };

  return (
    <div className={styles.home}>
      <SearchBox
        causeChange={selectedCauseChangeHandler}
        causeList={causeList}
        favCauseHandler={favoriteCauseHandler}
        selectedCause={selectedCause}
      />
      <DataBox cause={selectedCause} />
    </div>
  );
};

export default Home;
