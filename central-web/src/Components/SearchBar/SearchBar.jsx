import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  return (
    <>
      <input className={styles.searchBar} type="text" onChange={props.filterChange}/>

    </>
  );
};

export default SearchBar;
