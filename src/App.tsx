import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import MyPage from "./pages/MyPage"
import Contact from "./pages/Contact"
import PhotoDetail from "./pages/PhotoDetail"
import SearchResults from "./pages/SearchResults"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/photo/:id" element={<PhotoDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
