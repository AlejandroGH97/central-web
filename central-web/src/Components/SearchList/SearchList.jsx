import { useEffect, useState } from "react";
import ListItem from "../ListItem/ListItem";
import styles from "./SearchList.module.css";

const SearchList = (props) => {
  const [filteredList, setFilteredList] = useState(props.causeList);

  useEffect(() => {
    const newList = props.causeList.filter((cause) => {
      return (
        cause.cause.toLowerCase().search(props.causeFilter.toLowerCase()) !== -1
      );
    });

    setFilteredList(newList);
  }, [props.causeList, props.causeFilter]);

  return (
    <div className={styles.searchList}>
      {filteredList.map((cause, index) => {
        return (
          <ListItem
            key={cause.cause}
            cause={cause}
            causeChange={props.causeChange}
            isSelected={cause.cause === props.selectedCause.cause}
            favCauseHandler={props.favCauseHandler}
          />
        );
      })}
    </div>
  );
};

export default SearchList;
