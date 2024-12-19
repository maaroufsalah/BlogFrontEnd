import { useAuth, useUser } from "@clerk/clerk-react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

const Contact = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  const navigate = useNavigate();

  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      console.log(token);
      console.log(import.meta.env.VITE_API_URL);
      console.log(newPost);
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch(error => {
        console.error('Error in Axios POST request:', error);
        throw error;
      });
    },
    onSuccess: (res) => {
      toast.success("تم إضافة المنشور بنجاح");
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) {
    return <div className="">تحميل ...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div className="">الموجو تسجيل الدخول للنشر</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6 mt-14">
      <h1 className="text-cl font-bold">تواصل معنا</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <input
          className="text-4xl rounded-xl bg-white shadow-md"
          type="text"
          placeholder="عنوان..."
          name="title"
        />
        <textarea
          className="p-4 rounded-xl bg-white shadow-md max-h-80"
          name="desc"
          placeholder="فقرة التواصل..."
        />
        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "تحميل..." : "أرسل"}
        </button>
        {/* {"Progress:" + progress}
        {mutation.isError && <span>{mutation.error.message}</span>} */}
      </form>
    </div>
  );
};

export default Contact;
