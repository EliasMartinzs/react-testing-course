import SearchForm from "@/components/form/SearchForm";
import { toast, useToast } from "@/hooks/use-toast";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { it, vi } from "vitest";
import { UserEvent, userEvent } from "@testing-library/user-event";

const mockToast = vi.fn();
const setUserNameMock = vi.fn();

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

describe("Search Form", () => {
  let user: UserEvent;
  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
  });

  function getFormElements() {
    const input = screen.getByRole("textbox", { name: /search/i });
    const button = screen.getByRole("button", { name: /search/i });
    return { input, button };
  }

  it("renders the search form correctly", () => {
    render(<SearchForm userName="jonh_doe" setUserName={setUserNameMock} />);
    const { input, button } = getFormElements();
    expect(input).toHaveValue("jonh_doe");
    expect(button).toBeInTheDocument();
  });

  it("displays empty input when userName is empty", () => {
    render(<SearchForm userName="" setUserName={setUserNameMock} />);
    const { input } = getFormElements();
    expect(input).toHaveValue("");
  });

  it("updates input value on changees", async () => {
    render(<SearchForm userName="" setUserName={setUserNameMock} />);
    const { input } = getFormElements();
    await user.type(input, "jonh_doe");
    expect(input).toHaveValue("jonh_doe");
  });

  it("shows toast when submitting empty input", async () => {
    render(<SearchForm userName="" setUserName={setUserNameMock} />);
    const { button } = getFormElements();
    await user.click(button);

    expect(mockToast).toHaveBeenCalledWith({
      description: "Please enter a valid username",
    });
    expect(setUserNameMock).not.toHaveBeenCalled();
  });

  it("calls setUserName on valid form submission", async () => {
    render(<SearchForm userName="" setUserName={setUserNameMock} />);
    const { button, input } = getFormElements();
    await user.type(input, "jonh_doe");
    await user.click(button);

    expect(setUserNameMock).toHaveBeenCalledWith("jonh_doe");
    expect(mockToast).not.toHaveBeenCalled();
  });
});
