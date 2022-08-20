import { CronJobRepo } from "./CronJobRepo";

let CreateK8sCronJobRepo = async (): Promise<CronJobRepo> => {
  if (process.env.NODE_ENV == "test") {
    const { MemoryCronJobRepo } = await import("./MemoryCronJobRepo");
    return new MemoryCronJobRepo();
  } else {
    const { KubeConfig } = await import("@kubernetes/client-node");
    const { K8sCronJobRepo } = await import("./K8sCronJobRepo");

    const kc = new KubeConfig();
    if (process.env.LOAD_FROM == "cluster") {
      kc.loadFromCluster();
    } else {
      kc.loadFromDefault();
    }

    return new K8sCronJobRepo(kc);
  }
};

export default CreateK8sCronJobRepo;
