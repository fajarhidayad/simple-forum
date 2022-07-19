import { BrowserRouter } from "react-router-dom";

import { useAppSelector } from "./app/hooks";
import { getToken } from "./features/auth/authSlice";
import Unauthenticated from "./routes/Unauthenticated";
import Authenticated from "./routes/Authenticated";

function App() {
  const token = useAppSelector(getToken);

  return (
    <BrowserRouter>
      {token ? <Authenticated token={token.token} /> : <Unauthenticated />}
    </BrowserRouter>
  );
}

export default App;
