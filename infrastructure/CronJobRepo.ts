import { ServerSideCronJob } from "../domain/entities/CronJob";

export interface CronJobRepo {
  getCronJobs(namespace: string): Promise<ServerSideCronJob[]>;
}
