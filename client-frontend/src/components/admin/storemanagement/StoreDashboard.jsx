import React, { useState, useEffect } from 'react';
import AllArticles from './AllArticles/AllArticles';
import ManagementMenu from './ManagementMenu';
import AddArticle from './AddArticle/AddArticle';
import ShowStock from './ShowStock/ShowStock';
import axios from 'axios';

const StoreDashboard = (props) => {
  //   const userId = props.match.params.id;
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get('/api/isUserLoggedIn').then((resFromDb) => {
      setUser(resFromDb.data.user);
    });
  }, []);
  const [selectedTopic, setSelectedTopic] = useState(0);

  const onSelectHandler = (num) => {
    setSelectedTopic(num);
  };
  return (
    <div>
      <ManagementMenu onSelectTopic={onSelectHandler}></ManagementMenu>

      {selectedTopic === 1 && <AllArticles user={user}></AllArticles>}
      {selectedTopic === 2 && <AddArticle user={user}></AddArticle>}
      {selectedTopic === 3 && <ShowStock user={user}></ShowStock>}
    </div>
  );
};

export default StoreDashboard;
