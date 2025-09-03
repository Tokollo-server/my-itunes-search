import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
  test("renders the header", () => {
    render(<App />);
    const header = screen.getByText(/iTunes Search Engine/i);
    expect(header).toBeInTheDocument();
  });

  test("renders the search input", () => {
    render(<App />);
    const searchInput = screen.getByLabelText(/search/i);
    expect(searchInput).toBeInTheDocument();
  });

  test("renders the media type select", () => {
    render(<App />);
    const mediaSelect = screen.getByLabelText(/media type/i);
    expect(mediaSelect).toBeInTheDocument();
  });

  test("renders the search button", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  test("allows typing in the search input", async () => {
    const user = userEvent.setup();
    render(<App />);
    const searchInput = screen.getByLabelText(/search/i);

    await user.type(searchInput, "Beatles");
    expect(searchInput).toHaveValue("Beatles");
  });
});
