import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import BottomNav from "../components/BottomNav";
import Header from "../components/Header";
import BookmarkPage from "../pages/BookmarkPage";
import ExplorePage from "../pages/ExplorePage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";

import { trpc } from "../utils/trpc";
import { useAppDispatch } from "../app/hooks";
import { setInfo } from "../features/user/userSlice";

interface AuthenticatedProps {
  token: string;
}

const Authenticated: React.FC<AuthenticatedProps> = ({ token }) => {
  const url = import.meta.env.SERVER_URL
    ? `${import.meta.env.SERVER_URL}`
    : "http://localhost:5000/api/trpc";

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url,
      headers() {
        return {
          Authorization: `Bearer ${token}`,
        };
      },
    })
  );

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <Body />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

function Body() {
  const dispatch = useAppDispatch();
  const { data } = trpc.useQuery(["user.getInfo"]);

  const getUserInfo = () => {
    if (data) {
      const { user } = data;
      dispatch(
        setInfo({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
        })
      );
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [data]);

  return (
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
  );
}

export default Authenticated;
