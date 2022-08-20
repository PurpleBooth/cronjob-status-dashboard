import type { NextPage } from "next";
import Head from "next/head";
import {
  createCronJobFromServerSide,
  ServerSideCronJob,
} from "../domain/entities/CronJob";
import useSwr from "swr";
import { CronJobStatusCard } from "@/components/CronJobStatusCard";

const Home: NextPage = () => {
  const { data, error } = useSwr<ServerSideCronJob[]>(
    "/api/cron-jobs",
    (url: string) => fetch(url).then((res) => res.json())
  );

  return (
    <div className="m-8">
      <Head>
        <title>CronJob Dashboard</title>
        <meta
          name="description"
          content="Overview of the CronJobs currently running in the cluster"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {error && (
        <main className="flex flex-wrap gap-4 justify-center">
          <div
            className={
              "justify-self-center bg-neutral-100 p-0 m-0 drop-shadow p-0 m-2 dark:bg-neutral-800 border-red-500 border-2 container"
            }
          >
            <h1>Error</h1>
            <pre>{JSON.stringify(error)}</pre>
          </div>
        </main>
      )}
      {Array.isArray(data) && (
        <main className="flex flex-wrap gap-4 justify-start">
          {data.map(createCronJobFromServerSide).map((cronJob) => (
            <CronJobStatusCard key={cronJob.id} cronJob={cronJob} />
          ))}
        </main>
      )}
    </div>
  );
};

export default Home;
