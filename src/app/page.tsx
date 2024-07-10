import JobList from "@/components/ui/JobList";
import prisma from "@/lib/prisma";
import FilterSidebar from "../components/FilterSidebar";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer jobs
        </h1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <FilterSidebar />{" "}
        <div className="grow space-y-4">
          {" "}
          {jobs.map((job) => (
            <JobList job={job} key={job.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
