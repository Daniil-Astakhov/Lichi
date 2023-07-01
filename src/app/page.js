import { AppProvider } from "./AppContext";
import ListApp from "./components/list/List";

export default function Home() {
  return (
    <AppProvider>
      <ListApp />
    </AppProvider>
  );
}
