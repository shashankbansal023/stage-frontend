
import useStory from '../hooks/useStory';
import { StoryViewerProps } from '../interface';
import '../story-viewer.css';

function StoryViewer({ stories, initialIndex, onClose }: StoryViewerProps) {
  
  const {handleClick , currentIndex, activeProgress, imageLoaded, setImageLoaded, currentStory} = useStory({stories, onClose, initialIndex});

  return (
    <div className="story-viewer" onClick={handleClick} data-testid="story-viewer">
      <div className="progress-container">
        {stories.map((_, index) => (
          <div key={index} className="progress-segment">
            {index < currentIndex ? (
                <div
                 className={`progress-fill filled`}
                 key={`${index}-${currentIndex}`}
               />
            ): null}
           
            {index === currentIndex ? <div className='progress-active' style={{width: `${activeProgress}%`}}></div> : null}
          </div>
        ))}
      </div>
      
      {!imageLoaded && <div className="loading-spinner" data-testid="loading-spinner" />}
      
      <img
        src={currentStory.image}
        alt=""
        onLoad={() => setImageLoaded(true)}
        style={{ opacity: imageLoaded ? 1 : 0 }}
        data-testid="story-image"
      />
    </div>
  );
}

export default StoryViewer;