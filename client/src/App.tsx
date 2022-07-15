import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./app/store";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import BookmarkPage from "./pages/BookmarkPage";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import { useState } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const [user, setUser] = useState(true);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {user ? (
          <>
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
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
