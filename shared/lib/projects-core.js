/* Plain JS (no Vite features) so both the site bundle and the Node build
   scripts can use it. Turns the files in content/projects/ into one checked,
   sorted list. */
import { divisions } from '../../content/company.js';

export const idFromPath = (file) => file.split(/[\\/]/).pop().replace(/\.js$/, '');

const DATE = /^\d{4}-\d{2}-\d{2}$/;

function check(id, p) {
  const where = `content/projects/${id}.js`;
  const fail = (msg) => { throw new Error(`${where}: ${msg}`); };
  if (!p || typeof p !== 'object') fail('must `export default { … }`');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) fail('file name must be lowercase letters, numbers and dashes (it becomes the web address)');
  if (typeof p.name !== 'string' || !p.name) fail('needs a `name`');
  if (!divisions[p.division]) fail(`division must be one of: ${Object.keys(divisions).join(', ')}`);
  if (!['live', 'dev'].includes(p.status)) fail("status must be 'live' or 'dev'");
  if (typeof p.summary !== 'string' || !p.summary) fail('needs a `summary`');
  if (p.order !== undefined && typeof p.order !== 'number') fail('`order` must be a number');
  if (p.link && typeof p.link.label !== 'string') fail('`link` needs a `label`');
  for (const key of ['about', 'features', 'facts', 'updates']) {
    if (p[key] !== undefined && !Array.isArray(p[key])) fail(`\`${key}\` must be a list: [ … ]`);
  }
  (p.facts || []).forEach((f, i) => {
    if (!Array.isArray(f) || f.length !== 2) fail(`facts[${i}] must be a pair: ['Label', 'Value']`);
  });
  (p.updates || []).forEach((u, i) => {
    if (!DATE.test(u.date || '') || isNaN(new Date(u.date))) fail(`updates[${i}].date must look like '2026-10-01'`);
    if (typeof u.body !== 'string' || !u.body) fail(`updates[${i}] needs a \`body\``);
  });
}

/* entries: [[id, exportedObject], …] */
export function buildProjects(entries) {
  return entries
    .map(([id, p]) => {
      check(id, p);
      return {
        about: [], features: [], facts: [], updates: [], order: 999,
        ...p,
        id,
        updates: [...(p.updates || [])].sort((a, b) => b.date.localeCompare(a.date)),
      };
    })
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

export const projectPath = (p) => `/${divisions[p.division].projectPath}/${p.id}/`;
export const projectUrl = (p) => divisions[p.division].url + projectPath(p);
