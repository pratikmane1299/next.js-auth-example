import api from "@/lib/axios";

function tranformResponse({ success, data }: { success: boolean; data: any }) {
  if (success) {
    return { ...data };
  }
}

export function getGithubRepos(username: string): Promise<any[]> {
  return api
    .get(`/api/v1/github/${username}/repos`)
    .then((res) => res.data)
    .then(tranformResponse);
}
