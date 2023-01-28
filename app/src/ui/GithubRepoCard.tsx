import React from 'react'
import { Card } from 'flowbite-react';
import { EyeIcon, ShareIcon, StarIcon } from '@heroicons/react/24/outline';
import ExternalLink from '@/components/ExternalLink';

function GithubRepoCard({ repo }: { repo: any }) {
  return (
    // <Card
    //   horizontal
    //   imgSrc={`https://opengraph.githubassets.com/${repo.id}/${repo.owner.login}/${repo.name}`}
    // >
    <div className="bg-white rounded-lg shadow ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="grid grid-cols-[40%_1fr]">
        <img
          src={`https://opengraph.githubassets.com/${repo.id}/${repo.owner.login}/${repo.name}`}
          alt={repo.name}
          className="h-full w-full"
        />
        <div className="flex flex-col pl-2.5 py-2 pr-1.5">
          <ExternalLink
            className="text-base font-medium text-gray-700 underline cursor-pointer"
            href={repo.html_url}
          >
            {repo.name}
          </ExternalLink>
          {repo.description && (
            <p className="mb-1 text-xs font-medium text-gray-500">
              description
            </p>
          )}

          <div className="mt-2 inline-flex items-center space-x-2">
            <span className="flex text-gray-600 font-medium text-xs">
              <StarIcon className="h-4 w-4 mr-1" />
              <span>{repo.stargazers_count}</span>
            </span>
            <span className="flex text-gray-600 font-medium text-xs">
              <ShareIcon className="h-4 w-4 mr-1 -rotate-90" />
              <span>{repo.forks_count}</span>
            </span>
            <span className="flex text-gray-600 font-medium text-xs">
              <EyeIcon className="h-4 w-4 mr-1" />
              <span>{repo.watchers_count}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    // </Card>
  );
}

export default GithubRepoCard