/* ============================================================
   Every project, read from content/projects/*.js (one file each).
   Nothing to edit here — add or change files in content/projects/.
   ============================================================ */
import { buildProjects, idFromPath, projectPath, projectUrl, detailRows } from '../lib/projects-core.js';

const files = import.meta.glob(['../../content/projects/*.js', '!../../content/projects/_*.js'], { eager: true });

export const projects = buildProjects(
  Object.entries(files).map(([file, mod]) => [idFromPath(file), mod.default]),
);

export { projectPath, projectUrl, detailRows };
export const projectsIn = (division) => projects.filter((p) => p.division === division);
export const liveCount = (list) => list.filter((p) => p.status === 'live').length;
export const findProject = (id) => projects.find((p) => p.id === id);

/* A division's Build notes / Devlog: its own notes plus every update from
   its projects, newest first. `own` entries: { date, title?, body } */
export function divisionUpdates(division, own = []) {
  const fromProjects = projectsIn(division).flatMap((p) =>
    p.updates.map((u) => ({ ...u, project: p })));
  return [...own, ...fromProjects].sort((a, b) => b.date.localeCompare(a.date));
}
