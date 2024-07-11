import { jobFilterValues } from "@/lib/validation";
import JobList from "./JobList";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { title } from "process";

interface JobResultsProps {
  filterValues: jobFilterValues;
}

const JobResult = async ({
  filterValues: { query, type, location, remote },
}: JobResultsProps) => {
  const searchString = query
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");
  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};
  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      {approved:true}
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="grow space-y-4">
      {" "}
      {jobs.map((job) => (
        <JobList job={job} key={job.id} />
      ))}
    </div>
  );
};

export default JobResult;
