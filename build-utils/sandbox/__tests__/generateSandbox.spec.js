const axios = require('axios');
const { getAllFiles, getFilesContent } = require('./../get-files');
const generateSandbox = require('./../generateSandbox');

jest.mock('./../get-files');
jest.mock('axios');

describe('generateSandbox', () => {
  it('should call codesandbox api and return correct id', async () => {
    axios.post.mockResolvedValue({
      data: { sandbox_id: 'sandbox_id' }
    });
    getAllFiles.mockResolvedValue(['example/file1', 'example/file2']);
    getFilesContent.mockResolvedValue([
      {
        name: 'example/file1',
        content: 'file 1 content'
      },
      {
        name: 'example/file2',
        content: 'file 2 content'
      }
    ]);
    expect(await generateSandbox('example')).toBe('sandbox_id');
    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('define?json=1'), {
      files: {
        file1: {
          content: 'file 1 content'
        },
        file2: {
          content: 'file 2 content'
        }
      }
    });
  });

  it('should only trim example folder', async () => {
    axios.post.mockResolvedValue({
      data: { sandbox_id: 'sandbox_id' }
    });
    getAllFiles.mockResolvedValue(['example/file1', 'example/another-folder/file2']);
    getFilesContent.mockResolvedValue([
      {
        name: 'example/file1',
        content: 'file 1 content'
      },
      {
        name: 'example/another-folder/file2',
        content: 'file 2 content'
      }
    ]);
    expect(await generateSandbox('example')).toBe('sandbox_id');
    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('define?json=1'), {
      files: {
        file1: {
          content: 'file 1 content'
        },
        'another-folder/file2': {
          content: 'file 2 content'
        }
      }
    });
  });
  it('should return null on error', async () => {
    axios.post.mockRejectedValue('Error');
    getAllFiles.mockResolvedValue(['example/file1', 'example/file2']);
    getFilesContent.mockResolvedValue([
      {
        name: 'example/file1',
        content: 'file 1 content'
      },
      {
        name: 'example/file2',
        content: 'file 2 content'
      }
    ]);
    expect(await generateSandbox('example')).toBe(null);
  });
});
