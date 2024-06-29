import { ThreeCircles } from "react-loader-spinner";
import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.Loader}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#f5bf03"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
