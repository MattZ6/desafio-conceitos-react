import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      try {
        const { data } = await api.get('/repositories');

        setRepositories(data);
      } catch(err) {
        console.log(err);
      }
    }

    getRepositories();
  }, []);

  async function handleAddRepository() {
    const project = {
      title: `My new project (#${Date.now()})`,
      url: 'https://github.com/mattz6',
      techs: ['React', 'React Native', 'NodeJS']
    }

    try {
      const { data } = await api.post('/repositories', project);

      setRepositories([...repositories, data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepositories(repositories.filter(x => x.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        { repositories.map(repo => (
          <li key={repo.id}>
            { repo.title }

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
