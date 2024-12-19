import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };
  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat:category,
      });
    }
  };


  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">بحث</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">فلتر</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
          />
          الأحدث
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="popular"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
          />
          الأكثر شعبية
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
          />
          الشائع
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
          />
          الأقدم
        </label>
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">فئات</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("عامة")}>كل المنشورات</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("رياضة")}>رياضة</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("ثقافة")}>ثقافة</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("اجتماع")}>اجتماع</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("بيئة")}>بيئة</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("فن")}>فن</span>
      </div>
    </div>
  );
};

export default SideMenu;
