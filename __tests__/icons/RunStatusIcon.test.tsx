import { render, screen } from "@testing-library/react";
import { RunStatusIcon } from "@/components/icons/RunStatusIcon";
import { RunStatus } from "../../domain/value-objects/RunStatus";

describe("RunStatusIcon", () => {
  it("renders in placeholder mode", async () => {
    render(<RunStatusIcon />);
    expect(
      await screen.findByRole("img", { name: "Job status placeholder icon" })
    ).toBeInTheDocument();
  });
  it("renders in in progress mode", async () => {
    render(<RunStatusIcon status={RunStatus.InProgress} />);
    expect(
      await screen.findByRole("img", { name: "Job status in progress icon" })
    ).toBeInTheDocument();
  });
  it("renders in succeeded mode", async () => {
    render(<RunStatusIcon status={RunStatus.Succeeded} />);
    expect(
      await screen.findByRole("img", { name: "Job status succeeded icon" })
    ).toBeInTheDocument();
  });
  it("renders in failed mode", async () => {
    render(<RunStatusIcon status={RunStatus.Failed} />);
    expect(
      await screen.findByRole("img", { name: "Job status failed icon" })
    ).toBeInTheDocument();
  });
});
