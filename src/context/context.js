import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setReps] = useState(mockRepos);
  const [followers, setFoloowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [loading, setIsloading] = useState(false);

  const [error, setError] = useState({ show: false, msg: '' });

  const checkRequests = () => {
    axios
      .get(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'sorry you exided limit requests');
        }
      })
      .catch((err) => console.log(err));
  };

  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }

  const searchGithubUser = async (user) => {
    toggleError()
    // setFoloowers(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
    } else {
      toggleError(true, 'There is no user with taht username!');
    }
  };
  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        requests,
        githubUser,
        repos,
        followers,
        error,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
