import { hydrateRoot, createRoot } from 'react-dom/client';

/* Pages are pre-rendered to HTML at build time; in the browser React
   attaches to that HTML. In `npm run dev` there is no pre-render, so it
   renders from scratch. */
export function mount(app) {
  const root = document.getElementById('root');
  if (root.firstElementChild) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
