import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ProjectPage = lazy(() => import('./pages/HomePage/sections/Experience'));
const BlogPage = lazy(() => import('./pages/HomePage/sections/Hero'));

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectPage />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
