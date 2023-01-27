import React, { useMemo, useState } from "react";
import { Button } from "flowbite-react";
import GithubRepoCard from "./GithubRepoCard";

function GithubRepos({ repos }: { repos: any[] }) {
  const [showMore, setShowMore] = useState(false);

  const reposToShow = useMemo(() => {
    return showMore ? repos : repos?.slice(0, 6);
  }, [showMore, repos]);

  return (
    <div>
      <h5 className="text-gray-700 font-medium text-lg mb-4">Repositories</h5>
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
        {reposToShow.map((repo) => (
          <GithubRepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      <div className="mt-4 w-full flex justify-center">
        <Button
          size={"xs"}
          color="light"
          onClick={() => setShowMore((prev) => !prev)}
        >
          show {showMore ? "less" : "more"}
        </Button>
      </div>
    </div>
  );
}

export default GithubRepos;
