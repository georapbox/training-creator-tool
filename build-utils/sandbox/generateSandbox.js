const { getAllFiles, getFilesContent } = require('./get-files');
const axios = require('axios');

const generateSandbox = async (path) => {
  try {
    const paths = await getAllFiles(path);
    const files = await getFilesContent(paths);
    const requestBody = files.reduce((body, file) => {
      const [, relativePath] = file.name.split(path + '/');
      body[relativePath] = { content: file.content };
      return body;
    }, {});
    const response = await axios.post('https://codesandbox.io/api/v1/sandboxes/define?json=1', { files: requestBody });
    return response.data.sandbox_id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = generateSandbox;
