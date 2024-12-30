import Home from "@/app/page";
import Footer from "@/app/ui/Footer";
import Header from "@/app/ui/Header";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

test("renders Home page", async () => {
  const home = await Home();

  render(home);
  expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined();
});

test("renders Header component", async () => {
  render(<Header />);
  const home = await screen.findByText(/home/i);
  expect(home).toBeDefined();
  expect(
    await screen.findByLabelText(
      "https://github.com/DuffmanCC/networkrail-jobs"
    )
  ).toBeDefined();
});

test("renders Footer component", async () => {
  render(<Footer />);
  expect(await screen.findAllByText("Made with ❤️ by DuffmanCC")).toBeDefined();
});
