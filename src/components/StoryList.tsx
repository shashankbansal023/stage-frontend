import { StoryListProps } from "../interface";
import "../story-list.css";

function StoryList({ stories, onSelectStory }: StoryListProps) {
  return (
    <div className="story-list">
      {stories.map((story, index) => (
        <div
          key={story.id}
          className="story-thumbnail"
          onClick={() => onSelectStory(index)}
          data-testid="story-thumbnail"
        >
          <img src={story.image} alt={story.user} />
        </div>
      ))}
    </div>
  );
}

export default StoryList;