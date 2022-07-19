import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import BottomNav from "../components/BottomNav";
import Header from "../components/Header";
import BookmarkPage from "../pages/BookmarkPage";
import ExplorePage from "../pages/ExplorePage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";

import { trpc } from "../utils/trpc";

interface AuthenticatedProps {
  token: string;
}

const Authenticated: React.FC<AuthenticatedProps> = ({ token }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:5000/api/trpc",
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
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Authenticated;
