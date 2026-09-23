import { renderToString } from 'react-dom/server';
import Home from './pages/Home.jsx';

const PAGES = { home: Home };
export const render = (entry) => { const Page = PAGES[entry]; return renderToString(<Page />); };
