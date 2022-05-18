import styles from "./ListItem.module.css";

const ListItem = (props) => {
  return (
    <div className={styles.listItem} title={props.cause}>
      <div className={styles.itemText}>{props.cause}</div>
			<div className={styles.itemFav}>★</div>
    </div>
  );
};

export default ListItem;
