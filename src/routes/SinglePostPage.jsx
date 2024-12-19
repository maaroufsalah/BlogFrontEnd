import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "جاري التحميل...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "منشور غير متوفر، المرجو تحديث الصفحة!";

  return (
    <div className="flex flex-col gap-8 mt-10">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>كتبه</span>
            <Link className="text-blue-800">{data.user.username}</Link>
            <span>في فئة</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt, 'ar')}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.img} w="600" className="rounded-2xl" />
          </div>
        )}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12 justify-between">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            {/* {data.content} */}
          </p>
          <div
            className="content-display"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-2 text-sm font-medium">الناشر</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user.img && (
                <Image
                  src={data.user.img}
                  className="w-12 h-12 rounded-full object-cover"
                  w="48"
                  h="48"
                />
              )}
              <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            {/* <p className="text-sm text-gray-500">
              ssssssssss sit amet consectetur
            </p> */}
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.png" w={30} h={30} />
              </Link>
              <Link>
                <Image src="instagram.png" w={30} h={30} />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">الفئات</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="/posts">
              كل المنشورات
            </Link>
            <Link className="underline" to="/posts?cat=sport">
              رياضة
            </Link>
            <Link className="underline" to="/posts?cat=culture">
            ثقافة
            </Link>
            <Link className="underline" to="/posts?cat=social">
            اجتماع
            </Link>
            <Link className="underline" to="/posts?cat=environment">
            بيئة
            </Link>
            <Link className="underline" to="/posts?cat=art">
            فن
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">بحث</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
