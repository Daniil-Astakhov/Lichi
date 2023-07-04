"use client";
import { useCallback, useEffect, useRef, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import { fetchData } from "../../lib/getProductList";
import { Row } from "../row/Row";
import { Spinner, LoadingPage } from "../loading/spinners";
import { useFlag, useStore } from "@/app/store";
import styles from "../../styles/page.module.scss";

const ROW_HEIGHT_MOB = 0.72;
const ROW_HEIGHT_DESK = 0.51;
const ITEMS_LENGTH = 12;

export const ListApp = () => {
  const listRef = useRef(null);
  const {
    scrollY,
    setScrollY,
    items,
    currentPos,
    setItems,
    maxScrollHeight,
    setMaxScrollHeight,
    windowSize,
    setWindowSize,
  } = useStore((state) => state);
  const { load, setLoad, page, setPage } = useFlag((state) => state);

  const size = windowSize.width <= 768 ? 2 : 3;

  const getDataList = () => {
    fetchData(ITEMS_LENGTH, page).then((data) => {
      setItems([...items, ...data]);
      setLoad(false);
      setPage(page + 1);
    });
  };

  const itemSize = useMemo(() => {
    return windowSize.width <= 768
      ? windowSize.width * ROW_HEIGHT_MOB
      : windowSize.width * ROW_HEIGHT_DESK;
  }, [windowSize.width]);

  const getWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const handleScrollToTop = useCallback(() => {
    listRef.current.scrollToItem(0);
  }, []);

  const handleScroll = useCallback(({ scrollOffset }) => {
    setScrollY(scrollOffset);
  }, []);

  useEffect(() => {
    getDataList();
    getWindowSize();
    const handleResize = () => {
      getWindowSize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (currentPos) listRef.current.scrollToItem(currentPos);
  }, [listRef.current]);

  useEffect(() => {
    setMaxScrollHeight(listRef.current?._outerRef.firstChild.clientHeight);
  }, [items]);

  useEffect(() => {
    if (scrollY > 100 && scrollY + 20 + windowSize.height >= maxScrollHeight) {
      setLoad(true);
    }
  }, [scrollY]);

  useEffect(() => {
    if (load) {
      getDataList();
    }
  }, [load]);

  const row = useCallback(
    ({ index, style }) => {
      const rowData = {
        windowWidth: windowSize.width,
        style,
        index,
        items,
      };

      return <Row {...rowData} />;
    },
    [items, windowSize.width]
  );

  if (!items.length) {
    return <LoadingPage />;
  }

  return (
    <div className={styles.App}>
      <List
        ref={listRef}
        width={windowSize.width}
        height={windowSize.height}
        itemCount={items.length / size}
        itemSize={itemSize}
        onScroll={handleScroll}
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
};
