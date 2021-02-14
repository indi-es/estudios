const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const marked = require('marked');
const axios = require('axios').default;

function getFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('../../README.md', 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

function getElementsByType(obj, type = 'link') {
  const res = [];
  if (Array.isArray(obj)) {
    obj.forEach((elem) => {
      if (elem.type === type) {
        res.push(elem);
      } else {
          res.push.apply(res,getElementsByType(elem, type));
      }
    });
  } else if (typeof obj === 'object' && obj !== null) {
    Object.values(obj).forEach((elem) => {
        res.push.apply(res,getElementsByType(elem, type));
    });
  }
  return res;
}

async function getLinks(md) {
  const tokens = marked.lexer(md);
  const allLinks = getElementsByType(tokens).map(({ href }) => href);
  return allLinks;
}

const validStatusCode = (code) => code >= 200 && code < 400;

async function getStatusTotals(links) {
  const total = links.length;
  const errorMessages = [];
  const getStatus = async (link) => {
    try {
      const res = await axios.get(link);
      const valid = validStatusCode(res.status);
      if (!valid) {
        errorMessages.push(`${link} does not have a valid status code`);
        return false;
      }
      return true;
    } catch {
      errorMessages.push(`${link} cound not be reached`);
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
  const md = await getFile();
  const links = await getLinks(md);
  const { alive, total, errorMessages } = await getStatusTotals(links);
  const badgeSvg = await getBadge(alive, total);

  const badgePath = '../../_badges/reachable-site.svg';
  const errorFilePath = '../../_badges/reachable-site-errors.txt';
  const errorMessage = errorMessages.join('\r\n');
  if (errorMessages.length > 0) {
    console.error('errorMessage', errorMessage);
  }
  const writeFileAsync = promisify(fs.writeFile);
  const mkdirAsync = promisify(fs.mkdir);
  await mkdirAsync(path.dirname(badgePath), { recursive: true });
  await writeFileAsync(badgePath, badgeSvg);
  await writeFileAsync(errorFilePath, errorMessage);
  process.exit(0);
})().catch((e) => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});
