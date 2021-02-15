const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const marked = require('marked');
const json2md = require('json2md');

function getFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('../../estudios-mexico.json', 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

async function getStudios(jsonFile) {
  const names = [];
  const links = [];
  const studios = JSON.parse(jsonFile);

  studios.Estudios.forEach((k) => {
      names.push(k.nombre);
      links.push(k.website);
  });
  return {
    names,
    links,
  };
}

async function createMD(names, links) {
  const jsonStudios = [
  { h2: 'México' },
  { ul: [] }];

  names.forEach((k, i) => {
      jsonStudios[1].ul.push({ link: { title: k, source: links[i] } });
  });
  return json2md(jsonStudios);
}

async function safeFile(md) {
  const mdFilePath = '../../estudios.md';
  const writeFileAsync = promisify(fs.writeFile);

  await writeFileAsync(mdFilePath, md);
  console.log('Markdown file is saved.');
}

(async function main() {
  const jsonFile = await getFile();
  const { names, links } = await getStudios(jsonFile);
  const md = await createMD(names, links);

  await safeFile(md);
  process.exit(0);
})().catch((e) => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});
