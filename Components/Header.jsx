import { assets, framerone } from "@/Assets/assets";
import axios from "axios";
import { delay, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Send email to backend API
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error(response.data.msg);
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          className="w-[130px] w-auto sm:w-auto"
        />
        <button className="flex items-center gap-2 font-medium py-2 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
          Get Started
          <Image src={assets.arrow} />
        </button>
      </div>
      <div className="text-center py-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 25, duration: 0.5 },
          }}
          className="text-3xl sm:text-5xl font-medium"
        >
          Latest Blogs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 25, duration: 2.5 },
          }}
          className="mt-10 max-w-[740px] m-auto text-xs sm:text-base"
        >
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          sed velit quisquam inventore nesciunt doloremque numquam?
        </motion.p>
        <form
          onSubmit={onSubmitHandler}
          action=""
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000] "
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
