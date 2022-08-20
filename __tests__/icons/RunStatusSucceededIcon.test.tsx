import { render, screen } from "@testing-library/react";
import { RunStatusSucceededIcon } from "@/components/icons/RunStatusSucceededIcon";

describe("RunStatusSucceededIcon", () => {
  it("has correct aria tags", async () => {
    render(<RunStatusSucceededIcon />);
    expect(
      await screen.findByRole("img", { name: "Job status succeeded icon" })
    ).toBeInTheDocument();
  });
});
