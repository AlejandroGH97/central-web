import styles from "./SearchBox.module.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
import SearchList from "../../Components/SearchList/SearchList";
import { useState } from "react";

const SearchBox = (props) => {

  const [causeFilterState, setcauseFilterState] = useState("")

  const causeFilterChangeHandler = (event) => {
    setcauseFilterState(event.target.value);
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.navButtons}>
        <button className={styles.button}>Causas</button>
        <button className={styles.button}>Favoritos</button>
      </div>
      <SearchBar filterChange={causeFilterChangeHandler} />
      <SearchList causeList={props.causeList} causeFilter={causeFilterState} />
    </div>
  );
};

export default SearchBox;
