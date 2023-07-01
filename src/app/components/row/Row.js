import styles from "../../styles/page.module.scss";
export const Row = ({ windowWidth, items, index, style }) => {
  const mobile = windowWidth <= 768;
  const i = mobile ? index * 2 : index * 3;

  return mobile ? (
    <div className={styles.row}>
      {[0, 1].map((e, index) => (
        <div
          className={`${styles[`itemWrapMobile${index}`]}`}
          key={items[i + index]?.name}
          style={style}
        >
          <div className={styles.imgWrap}>
            <img
              className={styles.img}
              src={items[i + index]?.photos[0].big}
              alt={items[i + index]?.name}
            />
            <div
              className={styles.descriptionMobile}
              dangerouslySetInnerHTML={{
                __html: items[i + index]?.descriptions.html || null,
              }}
            />
          </div>
          <div className={styles.name}>{items[i + index]?.name}</div>
          <div className={styles.price}>{items[i + index]?.price} руб.</div>
        </div>
      ))}
    </div>
  ) : (
    <div className={styles.row}>
      {[0, 1, 2].map((e, index) => (
        <div
          className={`${styles[`itemWrap${index}`]}`}
          key={items[i + index]?.id}
          style={style}
        >
          <div className={styles.imgWrap}>
            <img
              className={styles.img}
              src={items[i + index]?.photos[0].big}
              alt={items[i + index]?.name}
            />
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: items[i + index]?.descriptions.html || null,
              }}
            />
          </div>
          <div className={styles.name}>{items[i + index]?.name}</div>
          <div className={styles.price}>{items[i + index]?.price} руб.</div>
        </div>
      ))}
    </div>
  );
};
