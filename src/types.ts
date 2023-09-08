export interface Author {
    id: number;
    name: string;
    photo: string;
    accountPlan: string;
}

export interface Comment {
    id: number;
    text: string;
    author: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    author: Author;
    comments: Comment[];
}


export interface HomePageProps<T> {
    dummyPosts: T[];
    setDummyPosts: React.Dispatch<React.SetStateAction<T[]>>;
}

export interface PostDetailsProps<T> {
    dummyPosts: T[];
    setDummyPosts: React.Dispatch<React.SetStateAction<T[]>>;
}

