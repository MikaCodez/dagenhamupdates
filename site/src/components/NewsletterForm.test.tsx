// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "./NewsletterForm";

describe("NewsletterForm", () => {
  it("shows the double opt-in confirmation message on success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText(/your email address/i), "reader@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() =>
      expect(screen.getByText(/check your inbox to confirm your subscription/i)).toBeInTheDocument()
    );
    expect(fetch).toHaveBeenCalledWith(
      "/api/newsletter",
      expect.objectContaining({ method: "POST" })
    );
    vi.unstubAllGlobals();
  });

  it("shows an error message when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })));
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText(/your email address/i), "reader@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(/something went wrong/i));
    vi.unstubAllGlobals();
  });
});
