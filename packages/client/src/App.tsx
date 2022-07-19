import { useState } from "react";
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
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";

import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./utils/trpc";
import { useAppSelector } from "./app/hooks";
import { getUserInfo } from "./features/auth/authSlice";
import RedirectPage from "./pages/RedirectPage";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:5000/api/trpc",
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MainRouter />
        </Provider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const MainRouter = () => {
  const userInfo = useAppSelector(getUserInfo);

  return (
    <BrowserRouter>
      {userInfo ? (
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
          <Route path="/" element={<SignInPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<RedirectPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
