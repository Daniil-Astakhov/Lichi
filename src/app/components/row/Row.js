import styles from "../../styles/page.module.scss";

export const Row = ({ windowWidth, items, index, style }) => {
  const mobile = windowWidth <= 768;
  const i = mobile ? index * 2 : index * 3;

  const renderItems = () => {
    const itemIndexes = mobile ? [0, 1] : [0, 1, 2];

    return itemIndexes.map((itemIndex) => {
      const item = items[i + itemIndex];

      return (
        <div
          className={`${
            styles[`itemWrap${mobile ? "Mobile" : ""}${itemIndex}`]
          }`}
          key={item?.id || item?.name}
          style={style}
        >
          <div className={styles.imgWrap}>
            <img
              className={styles.img}
              src={item?.photos[0].big}
              alt={item?.name}
            />
            <div
              className={mobile ? styles.descriptionMobile : styles.description}
              dangerouslySetInnerHTML={{
                __html: item?.descriptions.html || null,
              }}
            />
          </div>
          <div className={styles.name}>{item?.name}</div>
          <div className={styles.price}>{item?.price} руб.</div>
        </div>
      );
    });
  };
  return <div className={styles.row}>{renderItems()}</div>;
};
