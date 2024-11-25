import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client'

import './index.css'

import Layout from './pages/Layout.tsx';
import MainScreen from './pages/MainScreen.tsx';

import ChooseManyPage from './pages/games/ChooseMany.tsx';
import Wheel from './pages/games/Wheel.tsx';

import NoPage from './pages/NoPage.tsx';
import About from './pages/about.tsx';
import Admin from './pages/Admin.tsx';
import SettingsPage from './pages/settings.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path={`/`} element={<Layout/>}>
          <Route index path={`/`} element={<MainScreen />} />
          <Route path={`/choosemany`} element={<ChooseManyPage />}/>
          <Route path={`/wheel`} element={<Wheel />}/>
          <Route path={`/admin`} element={<Admin />}/>
          <Route path={`/about`} element={<About />}/>
          <Route path={`/settings`} element={<SettingsPage />}/>
      </Route>
      <Route path="*" element={<NoPage />}/>  {/* Not found page */}
    </Routes>
  </BrowserRouter>
)
