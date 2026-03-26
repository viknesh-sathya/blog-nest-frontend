import { Link, useSearchParams } from 'react-router-dom';
import { Search } from './Search';

export const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChangeFilter(e) {
    if (searchParams.get('sort') !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  }
  function handleCategoryChange(category) {
    if (searchParams.get('cat') !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  }
  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleChangeFilter}
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
          />{' '}
          Newest
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleChangeFilter}
            value="popular"
            className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
          />{' '}
          Most Popular
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleChangeFilter}
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
          />{' '}
          Trending
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleChangeFilter}
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
          />{' '}
          Oldest
        </label>
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-4 text-sm">
        <span
          className="underline text-blue-800 cursor-pointer"
          onClick={() => handleCategoryChange('general')}
        >
          General
        </span>
        <span
          className="underline text-blue-800 cursor-pointer"
          onClick={() => handleCategoryChange('technology')}
        >
          Technology
        </span>
        <span
          className="underline text-blue-800 cursor-pointer"
          onClick={() => handleCategoryChange('career')}
        >
          Career
        </span>
        <span
          className="underline text-blue-800 cursor-pointer"
          onClick={() => handleCategoryChange('life')}
        >
          Life
        </span>
        <span
          className="underline text-blue-800 cursor-pointer"
          onClick={() => handleCategoryChange('entertainment')}
        >
          Entertainment
        </span>
        <span
          className="underline text-blue-800 cursor-pointer"
          onClick={() => handleCategoryChange('trends')}
        >
          Trends
        </span>
      </div>
    </div>
  );
};
