import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import RedirectPage from "../pages/RedirectPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import { trpc } from "../utils/trpc";

const Unauthenticated = () => {
  const url = import.meta.env.SERVER_URL
    ? `${import.meta.env.SERVER_URL}`
    : "http://localhost:5000";

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: `${url}/api/trpc`,
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<RedirectPage />} />
        </Routes>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Unauthenticated;
