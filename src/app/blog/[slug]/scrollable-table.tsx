'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from '../page.module.css';

export default function ScrollableTable({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const table = tableRef.current;
    if (!wrapper || !table) return;

    const updateOverflow = () => setHasOverflow(wrapper.scrollWidth > wrapper.clientWidth);

    updateOverflow();
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(wrapper);
    observer.observe(table);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={styles.tableScroll}
      tabIndex={hasOverflow ? 0 : undefined}
      role={hasOverflow ? 'region' : undefined}
      aria-label={hasOverflow ? 'Scrollable table' : undefined}
    >
      <table ref={tableRef}>{children}</table>
    </div>
  );
}
