import json2md from 'json2md';
import { getFile, saveFile, sortByName } from './utils.js';

const BADGE =
  '[![¿Cuántos sitios están vivos?](https://raw.githubusercontent.com/indi-es/estudios/reachable-sites/reachable-site.svg)](https://github.com/indi-es/estudios/blob/reachable-sites/reachable-site-errors.txt)';
const DIVIDER = { p: '---' };

async function createMD(sections) {
  const badge = { h1: `Estudios ${BADGE}` };

  const jsonStudios = sections.map((section) => {
    const items = section.data.Estudios.sort(sortByName);
    return [
      { h2: section.title },
      {
        ul: items.map((item) => ({
          link: { title: item.nombre, source: item.website },
        })),
      },
    ];
  });
  return json2md([badge, DIVIDER, ...jsonStudios]);
}

(async function main() {
  const mexicoFile = await getFile('../../estudios-mexico.json');
  const outsideFile = await getFile('../../estudios-fuera-de-mexico.json');
  const mexico = JSON.parse(mexicoFile);
  const outside = JSON.parse(outsideFile);

  const md = await createMD([
    { title: 'México', data: mexico },
    { title: 'Fuera de México', data: outside },
  ]);

  await saveFile('../../README.md', md);
  process.exit(0);
})().catch((e) => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});
