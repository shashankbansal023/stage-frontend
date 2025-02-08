import { useEffect, useRef, useState } from "react";
import { Story } from "../interface";

const useStory = ({stories, onClose, initialIndex}: {
    stories: Story[],
    onClose: () => void;
    initialIndex: number;
}) => {

    const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(initialIndex);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [activeProgress, setActiveProgress] = useState<number>(0);
    const progressRef = useRef(activeProgress);
  
    const currentStory = stories[currentIndex];
  
    const goToNext = () => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setImageLoaded(false);
      } else if(currentStoryIndex < stories.length) {
        setCurrentStoryIndex(index => index + 1);
      }else {
          onClose();
      }
    };
  
    useEffect(() => {
      const timer = setInterval(() => {
          if(progressRef.current === 100){
              clearInterval(timer);
              return;
          }
          setActiveProgress((activeProgress) => activeProgress + 1);
      }, 50)
  
      return () => {
          clearInterval(timer);
          setActiveProgress(0);
      }
  
    }, [currentIndex])
  
    const goToPrevious = () => {
      if (currentIndex > 0) {
        setCurrentIndex((prev: number) => prev - 1);
        setImageLoaded(false);
      }else{
        onClose();
      }
    };
  
    useEffect(() => {
      const timer = setTimeout(goToNext, 5000);
      return () => clearTimeout(timer);
    }, [currentIndex]);
  
    useEffect(() => {
      setCurrentIndex(0);
    }, [currentStoryIndex])
  
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      
      if (x < width * 0.33) {
        goToPrevious();
      } else if (x > width * 0.66) {
        goToNext();
      }
    };

    return {
        currentIndex, 
        currentStory,
        handleClick,
        imageLoaded,
        activeProgress,
        setImageLoaded
    }
}

export default useStory;