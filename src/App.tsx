import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./app/store";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import BookmarkPage from "./pages/BookmarkPage";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className="pt-[76px]">
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path=":username" element={<ProfilePage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="bookmark" element={<BookmarkPage />} />
            </Route>
          </Routes>
        </div>
        <BottomNav />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
