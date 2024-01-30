import fetch from 'node-fetch';
import { getFile, saveFile, sortByName } from './utils.js';

const githubUrl =
  'https://raw.githubusercontent.com/indi-es/juegos/main/data.json';

async function getGames() {
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
          return [...previous, ...developers.map((item) => item.toLowerCase())];
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
      parsed.developers.map((current) => current.name.toLowerCase())
    );
  } catch (error) {
    console.error('Error reading the JSON file:', error.message);
    return [];
  }
}

async function getMissing() {
  const db = await getStudiosFromDb();
  const gamesDevs = await getGames();
  const missing = gamesDevs.filter((item) => !db.has(item));
  const missingList = missing.map((item) => `- ${item}`).join('\n');
  await saveFile(
    '../../missing.md',
    `# Faltan
> ${missing.length} Estudios que posiblemente hace falta agregar/normalizar.

---

${missingList}
`
  );
}

getMissing();
