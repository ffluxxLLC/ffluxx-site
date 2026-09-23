import '@shared/styles/tokens.css';
import '@shared/styles/base.css';
import '@shared/styles/division.css';
import '@shared/styles/division-home.css';
import '../theme.css';
import '@shared/styles/project.css';
import { mount } from '@shared/lib/mount.jsx';
import Project from '../pages/Project.jsx';

// /apps/fi/ → 'fi'
const id = location.pathname.split('/').filter(Boolean).pop();
mount(<Project id={id} />);
