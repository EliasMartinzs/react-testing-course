import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getElements } from "./Form.test";

import { posts } from "../mocks/handlers";

import {
  getErrorHandler,
  createErrorHandler,
  deleteErrorHandler,
  updateErrorHandler,
} from "../mocks/handlers";
import server from "../mocks/server";

describe("App Component", () => {
  it("renders the app component", () => {
    render(<App />);

    expect(screen.getByText(/posts manager/i)).toBeInTheDocument();
  });

  it("fetches post on mount", async () => {
    render(<App />);

    expect(await screen.findByText(/first post/i)).toBeInTheDocument();
    expect(await screen.findByText(/second post/i)).toBeInTheDocument();
    // expect(await screen.findByText(/third post/i)).toBeInTheDocument();
  });

  it("creates a new post", async () => {
    const user = userEvent.setup();
    render(<App />);
    const { submitButton, titleInput } = getElements();

    await user.type(titleInput, "New post");
    await user.click(submitButton);
    expect(await screen.findByText(/new post/i)).toBeInTheDocument();
  });

  it("update post", async () => {
    const user = userEvent.setup();
    render(<App />);
    const buttonLike = await screen.findByRole("button", {
      name: `👍 ${posts[0].likes}`,
    });
    await user.click(buttonLike);
    expect(
      await screen.findByRole("button", {
        name: `👍 ${posts[0].likes}`,
      })
    ).toBeInTheDocument();
  });

  it("delete post", async () => {
    const user = userEvent.setup();
    render(<App />);

    // pega o elemento
    const initialPosts = await screen.findAllByRole("article");
    expect(initialPosts).toHaveLength(3);
    const lastPost = initialPosts[2];

    // pega o botao do elemento
    const deleteBtn = within(lastPost).getByRole("button", { name: /delete/i });

    await user.click(deleteBtn);
    const postsAfterDelete = await screen.findAllByRole("article");
    expect(postsAfterDelete).toHaveLength(2);
  });

  it("shows error message when fetching posts fails", async () => {
    server.use(...getErrorHandler);
    render(<App />);
    expect(
      await screen.findByText(/failed to fetch posts/i)
    ).toBeInTheDocument();
  });

  it("shows error message when failed to createting a post fails", async () => {
    const user = userEvent.setup();
    server.use(...createErrorHandler);
    render(<App />);
    const { submitButton, titleInput } = getElements();
    await user.type(titleInput, "new post");
    await user.click(submitButton);
    expect(
      await screen.findByText(/failed to create post/i)
    ).toBeInTheDocument();
  });

  it("displays error message when updating post fails", async () => {
    const user = userEvent.setup();
    server.use(...updateErrorHandler);
    render(<App />);
    const likeBtn = await screen.findByRole("button", {
      name: `👍 ${posts[0].likes}`,
    });
    await user.click(likeBtn);
    expect(
      await screen.findByText(/failed to update post/i)
    ).toBeInTheDocument();
  });

  it("shows error message whent deleteting post fails", async () => {
    const user = userEvent.setup();
    server.use(...deleteErrorHandler);
    render(<App />);
    const allPosts = await screen.findAllByRole("article");
    expect(allPosts).toHaveLength(2);
    const initialPost = allPosts[1];
    const deleteBtn = within(initialPost).getByRole("button", {
      name: /delete/i,
    });
    await user.click(deleteBtn);
    expect(await screen.findByText(/failed to delete post/i));
  });
});
