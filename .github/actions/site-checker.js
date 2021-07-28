import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import axios from 'axios';
import { getFile, saveFile } from './utils.js';

function getLinks(json) {
  return json.developers
    .filter((item) => !item.inactive)
    .map(
      (item) => item.website || item.facebook || item.twitter || item.instagram
    );
}

const validStatusCode = (code) => code >= 200 && code < 400;

async function getStatusTotals(links) {
  const total = links.length;
  const errorMessages = [];
  const getStatus = async (link) => {
    try {
      console.info(`Checking ${link}`);
      const res = await axios.get(link);
      const valid = validStatusCode(res.status);
      console.info(`[${valid ? 'active' : 'dead'} - ${res.status}] ${link}`);
      if (!valid) {
        throw new Error(`Request failed [${res.status}]`);
      }
      return valid;
    } catch (e) {
      console.error(`${link} - ${e.message}`);
      errorMessages.push({ link, error: e, date: new Date().toISOString() });
      return false;
    }
  };
  const status = await Promise.all(links.map(getStatus));
  const alive = status.filter(Boolean).length;
  return {
    alive,
    total,
    errorMessages,
  };
}

async function getBadge(alive, total) {
  const diff = total - alive;
  let color = 'green';
  if (diff > 0) {
    color = 'yellow';
  }
  if (diff > 5) {
    color = 'red';
  }
  const res = await axios(
    `https://img.shields.io/badge/vivos-${alive}%2F${total}-${color}`
  );
  return res.data;
}

(async function main() {
  const db = await getFile('../../developers.json');
  const parsed = JSON.parse(db);

  const links = getLinks(parsed);
  const { alive, total, errorMessages } = await getStatusTotals(links);
  const badgeSvg = await getBadge(alive, total);

  const badgePath = '../../_badges/reachable-site.svg';
  const errorFilePath = '../../_badges/errors.json';
  const errorMessage = JSON.stringify(errorMessages, null, 2);
  if (errorMessages.length > 0) {
    console.error('errorMessage', errorMessage);
  }
  const mkdirAsync = promisify(fs.mkdir);
  await mkdirAsync(path.dirname(badgePath), { recursive: true });

  await saveFile(badgePath, badgeSvg);
  await saveFile(errorFilePath, errorMessage);
  process.exit(0);
})().catch((e) => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});
