import { ProjectPage } from '@shared/components/project/ProjectPage.jsx';
import { findProject } from '@shared/data/projects.js';
import * as c from '@content/soft/home.js';

/* Every project page on this site. The project comes from content/projects/;
   the header links and signup wording from content/soft/home.js. */
export default function Project({ id }) {
  return <ProjectPage project={findProject(id)}
    site={{ nav: c.projectPage.nav, listHref: c.projectPage.listHref, signup: c.signup }} />;
}
