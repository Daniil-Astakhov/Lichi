"use client";
import { useCallback, useState, useEffect, useContext } from "react";
import { FixedSizeList as List } from "react-window";
import { fetchData } from "../../lib/getProductList";
import { AppContext } from "../../AppContext";
import { Row } from "../row/Row";
import { Spinner, Loading } from "../loading/spinners";

import styles from "../../styles/page.module.scss";

const ROW_HEIGHT_MOB = 0.72;
const ROW_HEIGHT_DESK = 0.51;
const ITEMS_LENGTH = 12;

export default function ListApp() {
  const { scrollY, setScrollY } = useContext(AppContext);
  const [items, setItems] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: null, height: null });
  const [maxScrollHeight, setMaxScrollHeight] = useState(null);
  const [scrollContainer, setScrollContainer] = useState(null);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);

  const size = windowSize.width <= 768 ? 2 : 3;

  const getWindowSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    fetchData(ITEMS_LENGTH, page).then((data) => {
      setItems(data);
      setPage(page + 1);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      getWindowSize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //We can replace the data approach with ref by replacing part of the react-window source library code. "Костыль"
  useEffect(() => {
    getWindowSize();
    setTimeout(() => {
      setScrollContainer(document.querySelector(".List"));
    }, 500);
  }, [items]);

  useEffect(() => {
    if (scrollY > 100 && scrollY + 20 + windowSize.height >= maxScrollHeight) {
      setLoad(true);
    }
    if (scrollContainer) {
      const handleScroll = () => {
        const { scrollTop } = scrollContainer;
        setMaxScrollHeight(scrollContainer.scrollHeight);
        setScrollY(scrollTop);
      };
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollY, scrollContainer]);

  useEffect(() => {
    if (load) {
      fetchData(ITEMS_LENGTH, page).then((data) => {
        setItems((prev) => [...prev, ...data]);
        setLoad(false);
        setPage(page + 1);
      });
    }
  }, [load]);

  const handleScrollToTop = useCallback(() => {
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [scrollContainer]);

  const row = ({ index, style }) => {
    return (
      <Row
        windowWidth={windowSize.width}
        style={style}
        index={index}
        items={items}
      />
    );
  };

  if (!items) {
    return <Loading />;
  }

  return (
    <div className={styles.App}>
      <List
        className="List"
        width={windowSize.width}
        height={windowSize.height}
        itemCount={items.length / size}
        itemSize={
          windowSize.width <= 768
            ? windowSize.width * ROW_HEIGHT_MOB
            : windowSize.width * ROW_HEIGHT_DESK
        }
        itemData={items}
      >
        {row}
      </List>
      <div
        className={scrollY > 600 ? styles.scroll : styles.scrollHide}
        onClick={handleScrollToTop}
      >
        <span></span>
        TOP
      </div>
      <div className={styles.load}>{load && <Spinner />}</div>
    </div>
  );
}
