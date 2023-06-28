"use client";
import "../../styles/globals.scss";
import BaseTable, { Column, AutoResizer } from "react-base-table";
import React, { useCallback, useState, useEffect } from "react";
import Loading from "../loading";
import { fetchData } from "../../lib/getProductList";
import styles from "../../styles/page.module.scss";
import "react-base-table/styles.css";

export default function List() {
  const [items, setItems] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrollContainer, setScrollContainer] = useState(null);
  const [scrollTop, setScrollTop] = useState(null);

  const ITEMS_LENGTH = 24;
  const MAX_COLUMNS = windowWidth <= 768 ? 2 : 3;
  const visibleItems = items?.slice(0, Math.ceil(items.length / MAX_COLUMNS));
  const keys = Array.from(Array(MAX_COLUMNS).keys(), (i) => `column-${i}`);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setScrollContainer(document.querySelector(".BaseTable__body"));
    }, 500);
  }, [items]);

  useEffect(() => {
    if (scrollContainer) {
      const handleScroll = () => {
        const { scrollTop } = scrollContainer;
        setScrollTop(scrollTop);
      };
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollContainer]);

  useEffect(() => {
    fetchData(ITEMS_LENGTH).then((data) => {
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        throw new Error("Data is not in the expected format");
      }
    });
  }, []);

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
        <div key={itemIndex}>
          <div className={styles.itemWrap}>
            <div className={styles.imgWrap}>
              <img
                className={styles.img}
                src={item?.photos[0].big}
                alt={item?.name}
              />
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: item?.descriptions.html || null,
                }}
              />
            </div>

            <div className={styles.name}>{item?.name}</div>
            <div
              className={styles.descriptionMobile}
              dangerouslySetInnerHTML={{
                __html: item?.descriptions.html || null,
              }}
            />
            <div className={styles.price}>{item?.price} руб.</div>
          </div>
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
              windowWidth <= 768 ? windowWidth * 0.76 : windowWidth * 0.51
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
        className={scrollTop > 600 ? styles.scroll : styles.scrollHide}
        onClick={handleScrollToTop}
      >
        <span></span>
        TOP
      </div>
    </div>
  );
}
