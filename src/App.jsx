import { Toaster } from "react-hot-toast";
import RouterIndex from "./routers/RouterIndex";

function App() {
  return (
    <>
      <div>
        <RouterIndex />
        <Toaster position="top-center" />
      </div>
    </>
  );
}

export default App;
