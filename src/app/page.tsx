import JobResult from "@/components/JobResult";
import FilterSidebar from "../components/FilterSidebar";
import H1 from "@/components/ui/h1";
import { jobFilterValues } from "@/lib/validation";

interface pageProps {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export default async function Home({
  searchParams: { query, type, location, remote },
}: pageProps) {
  const filterValues: jobFilterValues = {
    query,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>Developer jobs</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <FilterSidebar />
        <JobResult filterValues={filterValues}/>
      </section>
    </main>
  );
}
