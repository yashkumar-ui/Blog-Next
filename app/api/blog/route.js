import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";

const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises";
const fs = require("fs");

const LoadDB = async () => {
  await ConnectDB();
};

//Api Endpoint for getting all blogs
LoadDB();
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json({ blog });
  } else {
    const blogs = await BlogModel.find({});

    return NextResponse.json({
      blogs,
    });
  }
}

//Api Endpoint for uploading blogs
export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();
  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timestamp}_${image.name}`;

  const blogData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    author: formData.get("author"),
    image: imgUrl,
    authorImg: formData.get("authorImg"),
    timestamp,
  };
  await BlogModel.create(blogData);
  console.log("Blog Saved");
  return NextResponse.json({ sucess: true, msg: "Blog Added" });
}

//Creating Api Endpoint to delete blog

export async function DELETE(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(blogId);
  fs.unlink(`./public${blog.image}`, () => {});
  await BlogModel.findByIdAndDelete(blogId);

  return NextResponse.json({ sucess: true, msg: "Blog Deleted" });
}
