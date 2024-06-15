const fs = require('fs');
const path = require('path');

let items = [];
let categories = [];

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '../data/items.json'), 'utf8', (err, data) => {
      if (err) {
        reject('unable to read file items.json');
        return;
      }

      try {
        items = JSON.parse(data);
      } catch (parseError) {
        reject('unable to parse items.json');
        return;
      }

      fs.readFile(path.join(__dirname, '../data/categories.json'), 'utf8', (err, data) => {
        if (err) {
          reject('unable to read file categories.json');
          return;
        }

        try {
          categories = JSON.parse(data);
          resolve();
        } catch (parseError) {
          reject('unable to parse categories.json');
        }
      });
    });
  });
}

function getAllItems() {
  return new Promise((resolve, reject) => {
    if (items.length === 0) {
      reject('no results returned');
    } else {
      resolve(items);
    }
  });
}

function getPublishedItems() {
  return new Promise((resolve, reject) => {
    const publishedItems = items.filter(item => item.published);
    if (publishedItems.length === 0) {
      reject('no results returned');
    } else {
      resolve(publishedItems);
    }
  });
}

function getCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length === 0) {
      reject('no results returned');
    } else {
      resolve(categories);
    }
  });
}

module.exports = {
  initialize,
  getAllItems,
  getPublishedItems,
  getCategories
};
