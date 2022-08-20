import {
  BatchV1Api,
  KubeConfig,
  V1CronJob,
  V1Job,
} from "@kubernetes/client-node";
import { CronJob, ServerSideCronJob } from "../domain/entities/CronJob";
import { RunStatus } from "../domain/value-objects/RunStatus";
import { formatISO } from "date-fns";
import { CronJobRepo } from "./CronJobRepo";

export class K8sCronJobRepo implements CronJobRepo {
  _kubeConfig: KubeConfig;

  constructor(kubeConfig: KubeConfig) {
    this._kubeConfig = kubeConfig;
  }

  async getCronJobs(namespace: string): Promise<ServerSideCronJob[]> {
    const k8sApi = this._kubeConfig.makeApiClient(BatchV1Api);
    const cronJobListResponse = await k8sApi.listNamespacedCronJob(namespace);
    const jobListResponse = (
      await k8sApi.listNamespacedJob(namespace)
    ).body.items.filter((job) =>
      job.metadata?.ownerReferences?.map(
        (ref) => ref.controller && ref.kind == "CronJob"
      )
    );
    jobListResponse.sort(
      (a, b) =>
        (a.status?.startTime?.getTime() ?? 0) -
        (b.status?.startTime?.getTime() ?? 0)
    );

    const real = cronJobListResponse.body.items.map(
      (cj: V1CronJob): ServerSideCronJob => {
        return {
          id: cj.metadata?.uid || "",
          name: cj.metadata?.name || "",
          lastSchedule: cj.status?.lastScheduleTime
            ? formatISO(cj.status?.lastScheduleTime || new Date())
            : null,
          runStatus: jobListResponse
            .filter(
              (job) =>
                job.metadata?.ownerReferences?.filter(
                  (ref) => ref.name == cj.metadata?.name
                ).length
            )
            .map((job: V1Job): RunStatus => {
              if (job.status?.succeeded) {
                return RunStatus.Succeeded;
              }

              if (job.status?.failed) {
                return RunStatus.Failed;
              }
              return RunStatus.InProgress;
            })
            .slice(-10),
          paused: cj.spec?.suspend || false,
        };
      }
    );

    return Promise.resolve(real);
  }
}
