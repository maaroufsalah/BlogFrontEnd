import { Link } from "react-router-dom";
import Search from "./Search";

const MainCategories = () => {
  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* links */}
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <Link
          to="/posts"
          className="bg-blue-800 text-white rounded-full px-4 py-2"
        >
          كل المنشورات
        </Link>
        <Link
          to="/posts?cat=رياضة"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          رياضة
        </Link>
        <Link
          to="/posts?cat=ثقافة"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          ثقافة
        </Link>
        <Link
          to="/posts?cat=اجتماع"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          اجتماع
        </Link>
        <Link
          to="/posts?cat=بيئة"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          بيئة
        </Link>
        <Link
          to="/posts?cat=فن"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          فن
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>
      {/* search */}
      <Search/>
    </div>
  );
};

export default MainCategories;
