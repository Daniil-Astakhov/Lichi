"use client";
import BaseTable, { Column, AutoResizer } from "react-base-table";
import { useCallback, useState, useEffect, useContext } from "react";
import { fetchData } from "../../lib/getProductList";
import { AppContext } from "../../AppContext";
import Loading from "../loading";

import styles from "../../styles/page.module.scss";
import "react-base-table/styles.css";

const ROW_HEIGHT_DESK = 0.76;
const ROW_HEIGHT_MOB = 0.51;
const ITEMS_LENGTH = 24;

export default function List() {
  const { scrollY, setScrollY } = useContext(AppContext);
  const [items, setItems] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);
  const [scrollContainer, setScrollContainer] = useState(null);

  const MAX_COLUMNS = windowWidth <= 768 ? 2 : 3;
  //This logic should be replaced with dynamic data loading
  // and canceling the need to reload the page when changing the screen width to 768px
  const visibleItems = items?.slice(0, Math.ceil(items.length / MAX_COLUMNS));
  const keys = Array.from(Array(MAX_COLUMNS).keys(), (i) => `column-${i}`);

  useEffect(() => {
    fetchData(ITEMS_LENGTH).then((data) => {
      setItems(data);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [items]);

  //We can replace the data approach with ref by replacing part of the react-base-table source library code. "Костыль"
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setTimeout(() => {
      setScrollContainer(document.querySelector(".BaseTable__body"));
    }, 500);
  }, [items]);

  useEffect(() => {
    if (scrollContainer) {
      const handleScroll = () => {
        const { scrollTop } = scrollContainer;
        setScrollY(scrollTop);
      };

      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollContainer]);

  const handleScrollToTop = useCallback(() => {
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [scrollContainer]);

  const cellRenderer = useCallback(
    (props) => {
      const { rowIndex, columnIndex } = props;
      const itemIndex = rowIndex * MAX_COLUMNS + columnIndex;
      const item = items[itemIndex];

      return (
        <div className={styles.itemWrap} key={itemIndex}>
          <div className={styles.imgWrap}>
            <img
              className={styles.img}
              src={item?.photos[0].big}
              alt={item?.name}
            />
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{__html: item?.descriptions.html || null}}
            />
            <div
              className={styles.descriptionMobile}
              dangerouslySetInnerHTML={{__html: item?.descriptions.html || null}}
            />
          </div>
          <div className={styles.name}>{item?.name}</div>

          <div className={styles.price}>{item?.price} руб.</div>
        </div>
      );
    },
    [items]
  );

  if (!items) {
    return <Loading />;
  }

  return (
    <div className={styles.App}>
      <AutoResizer>
        {({ width, height }) => (
          <BaseTable
            data={visibleItems}
            width={width}
            height={height}
            rowKey="id"
            headerHeight={0}
            rowHeight={
              windowWidth <= 768
                ? windowWidth * ROW_HEIGHT_DESK
                : windowWidth * ROW_HEIGHT_MOB
            }
            rowClassName="no-border-row"
          >
            {keys.map((columnKey) => {
              return (
                <Column
                  key={columnKey}
                  title={columnKey}
                  width={
                    windowWidth <= 768
                      ? windowWidth * 0.5
                      : windowWidth * 0.33333
                  }
                  cellRenderer={cellRenderer}
                />
              );
            })}
          </BaseTable>
        )}
      </AutoResizer>
      <div
        className={scrollY > 600 ? styles.scroll : styles.scrollHide}
        onClick={handleScrollToTop}
      >
        <span></span>
        TOP
      </div>
    </div>
  );
}
