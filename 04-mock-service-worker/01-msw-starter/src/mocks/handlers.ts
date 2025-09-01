import { http, HttpResponse } from "msw";
import { type Post } from "../hooks/usePosts";

const url = "http://localhost:4000/posts";

export let posts: Post[] = [
  {
    id: "1",
    likes: 5,
    title: "First post",
  },
  {
    id: "2",
    likes: 7,
    title: "Second post",
  },
];

export const handlers = [
  http.get(url, async () => {
    return HttpResponse.json(posts);
  }),
  http.post(url, async ({ request }) => {
    const newPost = (await request.json()) as Post;
    newPost.id = Date.now().toString();
    posts.push(newPost);
    return HttpResponse.json(newPost, { status: 201 });
  }),
  http.put(`${url}/:id`, async ({ params, request }) => {
    const { id } = params;
    const updatedPost = (await request.json()) as Post;
    const index = posts.findIndex((post) => post.id === id);
    posts[index] = updatedPost;
    return HttpResponse.json(updatedPost, { status: 201 });
  }),
  http.delete(`${url}/:id`, async ({ params }) => {
    const { id } = params;
    posts = posts.filter((p) => p.id !== id);
    return HttpResponse.json(null, { status: 200 });
  }),
];

export const getErrorHandler = [
  http.get(url, () => {
    return HttpResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }),
];

export const createErrorHandler = [
  http.post(url, () => {
    return HttpResponse.json(
      { message: "Failed to create post" },
      { status: 400 }
    );
  }),
];

export const updateErrorHandler = [
  http.put(`${url}/:id`, () => {
    return HttpResponse.json(
      { message: "Failed to update post" },
      { status: 400 }
    );
  }),
];

export const deleteErrorHandler = [
  http.delete(`${url}/:id`, () => {
    return HttpResponse.json(
      { message: "Failed to delete post" },
      { status: 400 }
    );
  }),
];
