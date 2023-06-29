import { AppProvider } from "./AppContext";
import List from "./components/list/List";

export default function Home() {
  return (
    <AppProvider>
      <List />
    </AppProvider>
  );
}
