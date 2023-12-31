import styles from "../../styles/page.module.scss";

export function generateMetadata({ searchParams: { name } }) {
  return {
    title: name,
  };
}

export default function Card({
  params: { id },
  searchParams: { name, pf, price },
}) {
  return (
    <div className={styles.productWrap}>
      <div className={styles.product}>
        <div className={styles.cardImgWrap}>
          <img src={pf} alt={name} />
        </div>
      </div>
      <div className={styles.cardDescrWrap}>
        <div className={styles.cardDescr}>
          <span>{name}</span>
          <span>{price + " руб"}</span>
          <span>id {id}</span>
        </div>
      </div>
    </div>
  );
}
