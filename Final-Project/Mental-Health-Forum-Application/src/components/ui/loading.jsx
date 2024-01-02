import classes from "./css/loading.module.css";

export default function LoadingForumContent() {
  return (
    <section className={classes.dotsContainer}>
      <div className={classes.dot}></div>
      <div className={classes.dot}></div>
      <div className={classes.dot}></div>
      <div className={classes.dot}></div>
      <div className={classes.dot}></div>
    </section>
  );
}
