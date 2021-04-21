import json2md from 'json2md';
import { getFile, saveFile, sortByName } from './utils.js';

const BADGE =
  '[![¿Cuántos sitios están vivos?](https://raw.githubusercontent.com/indi-es/estudios/reachable-sites/reachable-site.svg)](https://github.com/indi-es/estudios/blob/reachable-sites/reachable-site-errors.txt)';

const HEADER = `
# Estudios ${BADGE}

>Si tienes dudas de como contribuir puedes leer la guía de [CONTRIBUTING.md](https://github.com/indi-es/estudios/blob/main/CONTRIBUTING.md).
>
>También puedes ver esta información en la página web [indi-es.com/estudios](https://indi-es.com/estudios)

---
`;

async function createMD(sections) {
  const jsonStudios = sections.map((section) => {
    const items = section.data.developers.sort(sortByName);
    return [
      { h2: section.title },
      {
        ul: items.map((item) => ({
          link: { title: item.name, source: item.website },
        })),
      },
    ];
  });
  return `
  ${HEADER}
  ${json2md(jsonStudios)}
  `;
}

(async function main() {
  const mexicoFile = await getFile('../../developers.json');
  const outsideFile = await getFile('../../developers-abroad.json');
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
