export interface Story {
  id: number;
  user: string;
  image: string;
}

export interface StoryListProps {
    stories: Story[];
    onSelectStory: (index: number) => void;
  }


export interface StoryViewerProps {
    stories: Story[];
    initialIndex: number;
    onClose: () => void;
  }
  