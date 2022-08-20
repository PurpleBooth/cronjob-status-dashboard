import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SWRConfig } from "swr";
import createK8sCronJobRepo from "../infrastructure/CreateK8sCronJobRepo";
import Home from "@/pages/index";
import { ServerSideCronJob } from "../domain/entities/CronJob";

describe("Home", () => {
  describe("on a successful request", () => {
    function renderComponent(cronJobs: ServerSideCronJob[]) {
      render(
        <SWRConfig
          value={{
            fallback: {
              "/api/cron-jobs": cronJobs,
            },
          }}
        >
          <Home />
        </SWRConfig>
      );
    }

    it("renders a list of jobs", async () => {
      const cronJobs = await (
        await createK8sCronJobRepo()
      ).getCronJobs("something");
      renderComponent(cronJobs);

      const articles = await screen.findAllByRole("article");

      expect(articles).toHaveLength(3);
      expect(
        await screen.findByRole(
          "heading",
          { name: cronJobs[0].name },
          { container: articles[0] }
        )
      ).toBeInTheDocument();
      expect(
        await screen.findByRole(
          "heading",
          { name: cronJobs[1].name },
          { container: articles[1] }
        )
      ).toBeInTheDocument();
      expect(
        await screen.findByRole(
          "heading",
          { name: cronJobs[2].name },
          { container: articles[2] }
        )
      ).toBeInTheDocument();
    });
  });
  describe("on a failed request", () => {
    function renderComponent(cronJobs: ServerSideCronJob[]) {
      render(<Home />);
    }

    it("renders an error", async () => {
      const cronJobs = await (
        await createK8sCronJobRepo()
      ).getCronJobs("something");
      renderComponent(cronJobs);
      await screen.findByRole("heading", { name: "Error" });
    });
  });
});
