import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Report } from './pages/Report';
import { RoadSafety } from './pages/RoadSafety';
import { Evacuation } from './pages/Evacuation';
import { Emergency } from './pages/Emergency';
import { Memos } from './pages/Memos';
import { Game } from './pages/Game';
import { CCTV } from './pages/CCTV';
import { Contacts } from './pages/Contacts';
import { Admin } from './pages/Admin';
import { Notifications } from './pages/Notifications';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="report" element={<Report />} />
        <Route path="road-safety" element={<RoadSafety />} />
        <Route path="evacuation" element={<Evacuation />} />
        <Route path="emergency" element={<Emergency />} />
        <Route path="memos" element={<Memos />} />
        <Route path="game" element={<Game />} />
        <Route path="cctv" element={<CCTV />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="admin" element={<Admin />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}
