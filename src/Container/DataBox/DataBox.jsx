import Star from "../../Assets/Icons/Star";
import styles from "./DataBox.module.css";

const DataBox = (props) => {
  return (
    <div className={styles.dataBox}>
      <h1>
        {props.cause.cause}{" "}
        {props.cause.isFavorite && (
          <Star height={30} width={30} class={styles.star} />
        )}
      </h1>
    </div>
  );
};

export default DataBox;
