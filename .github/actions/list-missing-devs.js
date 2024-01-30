import fetch from 'node-fetch';
import { getFile, saveFile } from './utils.js';

const githubUrl =
  'https://raw.githubusercontent.com/indi-es/juegos/main/data.json';

function normalizeName(value) {
  return value.toLowerCase().replace(/\s/g, '');
}

async function getGamesDict() {
  try {
    const response = await fetch(githubUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const { games } = data;

    const result = games.reduce((previous, current) => {
      const developers = (current?.developers ? current.developers : []).map(
        (item) => item
      );

      developers.forEach((element) => {
        const key = normalizeName(element);
        const ob = { originalDev: element, ...current };
        if (!(key in previous)) {
          previous[key] = [ob];
        } else {
          previous[key] = [...previous[key], ob];
        }
      });

      return previous;
    }, {});

    return result;
  } catch (error) {
    console.error('Error downloading or saving the JSON file:', error.message);
    return [];
  }
}

export async function getGames() {
  try {
    const response = await fetch(githubUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const { games } = data;

    return [
      ...new Set(
        games.reduce((previous, current) => {
          const developers = current?.developers ? current.developers : [];
          return [
            ...previous,
            ...developers.map((item) => normalizeName(item)),
          ];
        }, [])
      ),
    ];
  } catch (error) {
    console.error('Error downloading or saving the JSON file:', error.message);
    return [];
  }
}

async function getStudiosFromDb() {
  try {
    const db = await getFile('../../developers.json');
    const parsed = JSON.parse(db);
    return new Set(
      parsed.developers.map((current) => normalizeName(current.name))
    );
  } catch (error) {
    console.error('Error reading the JSON file:', error.message);
    return [];
  }
}

async function getMissing() {
  const db = await getStudiosFromDb();
  const gamesDevs = await getGamesDict();

  const missing = Object.keys(gamesDevs)
    .filter((key) => !db.has(key))
    .reduce((prev, key) => [...prev, gamesDevs[key]], [])
    .map((item) => ({
      devName: item[0].originalDev,
      numberOfGames: item.length,
    }))
    .sort((a, b) => b.numberOfGames - a.numberOfGames);

  const missingList = missing
    .map((item) => {
      const { devName, numberOfGames } = item;
      return `| ${devName} | ${numberOfGames} |`;
    })
    .join('\n');
  await saveFile(
    '../../missing.md',
    `# Faltan
> ${missing.length} Estudios que posiblemente hace falta agregar/normalizar.

---

| Nombre | № de juegos |
|--------|-------------|
${missingList}
`
  );
}

getGamesDict();
getMissing();
