import api from "@/lib/axios";

export const updateProfile = (profile: any) => {
	return api
    .patch("/api/v1/update-profile", {
      ...profile,
    })
    .then((res) => res.data);
}
