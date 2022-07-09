import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import PostCard from "./components/PostCard";
import TweetBox from "./components/TweetBox";

function App() {
  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen pt-28 pb-10">
        <div className="max-w-[850px] mx-auto container">
          <TweetBox />
          <PostCard />
          <PostCard />
        </div>
      </main>
      <BottomNav />
    </>
  );
}

export default App;
