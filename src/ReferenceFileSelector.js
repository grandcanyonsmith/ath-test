import React, { useEffect, useState } from 'react';

const ReferenceFileSelector = ({ isReferenceFileSelectorOpen, closeReferenceFileSelector, fetchGithubRepos, fetchGithubRepoFiles }) => {
  

  const [githubRepos, setGithubRepos] = useState([]);
  const [githubRepoFiles, setGithubRepoFiles] = useState([]);
  const [selectedGithubRepo, setSelectedGithubRepo] = useState('');
  const [selectedGithubRepoFile, setSelectedGithubRepoFile] = useState(null);

  useEffect(() => {
    if (isReferenceFileSelectorOpen) {
      fetchGithubRepos().then(repos => {
        setGithubRepos(repos);
        setSelectedGithubRepo(repos[0]);
      });

      fetchGithubRepoFiles().then(files => {
        setGithubRepoFiles(files);
        setSelectedGithubRepoFile(files[0]);
      });
    }
  }, [isReferenceFileSelectorOpen]);

  const handleGithubRepoSelection = (e) => {
    setSelectedGithubRepo(e.target.value);
  };

  const handleGithubRepoFileSelection = (e) => {
    const file = githubRepoFiles.find(file => file.download_url === e.target.value);
    setSelectedGithubRepoFile(file);
  };

  if (!isReferenceFileSelectorOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Select a Repository and a File
                </h3>
                <div className="mt-2">
                  <select className="w-full py-2 px-4 rounded shadow-lg" value={selectedGithubRepo} onChange={handleGithubRepoSelection}>
                    {githubRepos && githubRepos.map(repo => <option key={repo} value={repo}>{repo}</option>)}
                  </select>
                  <select className="w-full mt-2 py-2 px-4 rounded shadow-lg" value={selectedGithubRepoFile ? selectedGithubRepoFile.download_url : ''} onChange={handleGithubRepoFileSelection}>
                    {githubRepoFiles && githubRepoFiles.map(file => <option key={file.download_url} value={file.download_url}>{file.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeReferenceFileSelector}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceFileSelector;