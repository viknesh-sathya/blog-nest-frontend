import { Link } from 'react-router-dom';
import { Search } from './Search';

export const MainCategories = () => {
  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* LINKS */}
      <div className="flex-1 flex items-center md:justify-start md:gap-y-4 md:gap-x-4 lg:justify-between flex-wrap">
        <Link
          to="/posts"
          className="bg-blue-800 text-white rounded-full px-4 py-2"
        >
          All posts
        </Link>
        <Link
          to="/posts?cat=technology"
          className="hover:bg-blue-100  rounded-full px-4 py-2"
        >
          Technology
        </Link>
        <Link
          to="/posts?cat=career"
          className="hover:bg-blue-100  rounded-full px-4 py-2"
        >
          Career
        </Link>
        <Link
          to="/posts?cat=life"
          className="hover:bg-blue-100  rounded-full px-4 py-2"
        >
          Life
        </Link>
        <Link
          to="/posts?cat=entertainment"
          className="hover:bg-blue-100  rounded-full px-4 py-2"
        >
          Entertainment
        </Link>
        <Link
          to="/posts?cat=trends"
          className="hover:bg-blue-100  rounded-full px-4 py-2"
        >
          Trends
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>
      {/* SEARCH */}
      <Search />
    </div>
  );
};
