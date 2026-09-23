import { renderToString } from 'react-dom/server';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';

const PAGES = { home: Home, services: Services };
export const render = (entry) => { const Page = PAGES[entry]; return renderToString(<Page />); };
