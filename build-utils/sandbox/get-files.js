const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const path = require('path');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readile = promisify(fs.readFile);

const getAllFiles = async (directory) => {
  const subdirs = await readdir(directory);

  const files = await Promise.all(
    subdirs
      .filter((subdir) => subdir !== '.DS_Store')
      .map(async (subdir) => {
        const res = resolve(directory, subdir);
        return (await stat(res)).isDirectory() ? getAllFiles(res) : res;
      })
  );
  return files.flat();
};

const getFilesContent = async (paths) => {
  const sandboxFiles = await Promise.all(
    paths.map(async (path) => {
      const content = await readile(path, { encoding: 'utf-8' });
      return {
        name: path,
        content
      };
    })
  );

  return sandboxFiles;
};

const getDirectoryPath = (rootDirectory, url, protocol) => {
  const directoryPath = url.replace(protocol, '');
  return path.join(rootDirectory, directoryPath);
};

exports.getAllFiles = getAllFiles;
exports.getFilesContent = getFilesContent;
exports.getDirectoryPath = getDirectoryPath;
