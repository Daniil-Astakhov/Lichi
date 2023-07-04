import "./styles/globals.scss";
import styles from "./styles/page.module.scss";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Test List",
  description: "Test app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.container}>{children}</div>
      </body>
    </html>
  );
}
