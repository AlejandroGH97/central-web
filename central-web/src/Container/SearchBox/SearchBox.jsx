import styles from "./SearchBox.module.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
import SearchList from "../../Components/SearchList/SearchList";
import { useState } from "react";

const SearchBox = (props) => {
  const [causeFilter, setcauseFilter] = useState("");
  const [activeTab, setActiveTab] = useState("Causas");
  let selectedList = props.causeList;

  if (activeTab === "Causas") {
    selectedList = props.causeList;
  } else {
    const filteredList = props.causeList.filter((cause) => {
      return cause.isFavorite;
    });
    selectedList = filteredList;
  }

  const causeFilterChangeHandler = (event) => {
    setcauseFilter(event.target.value);
  };

  const toggleCausas = () => {
    setActiveTab("Causas");
  };

  const toggleFav = () => {
    setActiveTab("Fav");
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.navButtons}>
        <button
          className={`${styles.button} ${
            activeTab === "Causas" ? styles.active : ""
          }`}
          onClick={toggleCausas}
        >
          Causas
        </button>
        <button
          className={`${styles.button} ${
            activeTab === "Fav" ? styles.active : ""
          }`}
          onClick={toggleFav}
        >
          Favoritos
        </button>
      </div>
      <SearchBar filterChange={causeFilterChangeHandler} />
      <SearchList
        selectedCause={props.selectedCause}
        causeList={selectedList}
        causeFilter={causeFilter}
        causeChange={props.causeChange}
        favCauseHandler={props.favCauseHandler}
      />
    </div>
  );
};

export default SearchBox;
