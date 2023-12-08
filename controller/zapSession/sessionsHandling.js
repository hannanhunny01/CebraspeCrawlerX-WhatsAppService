const fs = require('fs').promises;
const path = require('path');

const deleteFolderRecursive = async (folderPath) => {
  try {
    try {
      await fs.stat(folderPath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('Path does not exist:', folderPath);
        return;
      }
    }

    const files = await fs.readdir(folderPath);
    for (const file of files) {
      const curPath = path.join(folderPath, file);
      const stats = await fs.stat(curPath);

      if (stats.isDirectory()) {
        await deleteFolderRecursive(curPath);
      } else {
        await fs.unlink(curPath);
      }
    }

    await fs.rmdir(folderPath);
    console.log('Folder deleted successfully');
  } catch (err) {
    console.error('Error deleting folder:', err);
  }
};

const deleteSession = async (sessionName) => {
  const folderPath = path.join(__dirname, `../../tokens/${sessionName}`);
  await deleteFolderRecursive(folderPath);
};

const getSubfolderNames = async () => {
  const tokensFolderPath = path.join(__dirname, '../../tokens');

  try {
    const subfolderNames = await fs.readdir(tokensFolderPath);
    const subfolders = await Promise.all(
      subfolderNames.map(async (name) => {
        const fullPath = path.join(tokensFolderPath, name);
        const stats = await fs.stat(fullPath);
        return stats.isDirectory() ? name : null;
      })
    );

    return subfolders.filter(Boolean);
  } catch (err) {
    console.error('Error getting subfolder names:', err);
    return [];
  }
};

const getAllSession = async () => {
  return await getSubfolderNames();
};

getAllSession().then((allSessionsAfterDeletion)=>{console.log('All sessions after deletion:', allSessionsAfterDeletion);})

deleteSession('asdas').then(()=>{ getAllSession().then((allSessionsAfterDeletion)=>{console.log('All sessions after deletion:', allSessionsAfterDeletion);})
})



module.exports = { getAllSession, deleteSession };
