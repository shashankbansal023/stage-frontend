import { useState, useEffect } from 'react';
import StoryViewer from './components/StoryViewer';
import StoryList from './components/StoryList';

import './App.css';
import { Story } from './interface';


function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/stories.json')
      .then(response => response.json())
      .then(data => setStories(data));
  }, []);

  return (
    <div className="app">
      {selectedStoryIndex !== null ? (
        <StoryViewer
          stories={stories}
          initialIndex={selectedStoryIndex}
          onClose={() => setSelectedStoryIndex(null)}
        />
      ) : (
        <StoryList
          stories={stories}
          onSelectStory={(index: number) => setSelectedStoryIndex(index)}
        />
      )}
    </div>
  );
}

export default App;
