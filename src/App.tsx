import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./pages/Home";
import { TrendingPage } from "./pages/TrendingPage";
import { GitHubPage } from "./pages/GitHubPage";
import { ModelsPage } from "./pages/ModelsPage";
import { AgentsPage } from "./pages/AgentsPage";
import { EducationPage } from "./pages/EducationPage";
import { SearchPage } from "./pages/SearchPage";
import { DetailPage } from "./pages/DetailPage";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/github" element={<GitHubPage />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail/:type/:id" element={<DetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
