import type { NextApiRequest, NextApiResponse } from "next";
import createK8sCronJobRepo from "../../infrastructure/CreateK8sCronJobRepo";
import process from "process";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res
    .status(200)
    .json(
      await (
        await createK8sCronJobRepo()
      ).getCronJobs(process.env.K8S_NAMESPACE || "default")
    );
}
