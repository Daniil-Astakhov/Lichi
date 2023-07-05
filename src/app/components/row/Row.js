import Link from "next/link";
import styles from "../../styles/page.module.scss";
import { useStore } from "@/app/store";

export const Row = ({ windowWidth, items, index, style }) => {
  const { setCurrentPos } = useStore((state) => state);
  const mobile = windowWidth <= 768;
  const i = mobile ? index * 2 : index * 3;

  const setPos = () => {
    setCurrentPos(index);
  };

  const renderItems = () => {
    const itemIndexes = mobile ? [0, 1] : [0, 1, 2];

    return itemIndexes.map((itemIndex) => {
      const item = items[i + itemIndex];
      return (
        <div
          className={`${
            styles[`itemWrap${mobile ? "Mobile" : ""}${itemIndex}`]
          }`}
          key={item?.id}
          style={style}
        >
          <Link
            href={`/product/${item?.id}?name=${item?.name}&pf=${item?.photos[0].big}&price=${item?.price}`}
            onClick={setPos}
          >
            <div className={styles.imgWrap}>
              <img
                className={styles.img}
                src={item?.photos[0].big}
                alt={item?.name}
              />
              <div
                className={
                  mobile ? styles.descriptionMobile : styles.description
                }
                dangerouslySetInnerHTML={{
                  __html: item?.descriptions.html || null,
                }}
              />
            </div>
          </Link>

          <div className={styles.name}>{item?.name}</div>
          <div className={styles.price}>{item?.price} руб.</div>
        </div>
      );
    });
  };
  return <div className={styles.row}>{renderItems()}</div>;
};
