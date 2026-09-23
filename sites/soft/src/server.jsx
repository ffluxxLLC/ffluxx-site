import { renderToString } from 'react-dom/server';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Project from './pages/Project.jsx';

const PAGES = { home: Home, services: Services, project: Project };
export const render = (entry, id) => { const Page = PAGES[entry]; return renderToString(<Page id={id} />); };
