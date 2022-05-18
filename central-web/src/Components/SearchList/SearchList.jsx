import ListItem from "../ListItem/ListItem";
import styles from "./SearchList.module.css";

const SearchList = (props) => {

  let filteredList = props.causeList.filter((cause) => {
    return cause.toLowerCase().search(props.causeFilter.toLowerCase()) !== -1;
  })

  return (
    <div className={styles.searchList}>
      {filteredList.map((cause, index) => {
        return <ListItem key={cause} cause={cause} />
      })}
    </div>
  );
};

export default SearchList;
