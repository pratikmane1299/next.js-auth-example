import React, { ChangeEvent, FormEvent, useState } from "react";

import {
  Button,
  Label,
  Modal,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";

function EditProfileModal({
  show,
  user,
  isUpdating,
  onClose,
  onUpdateProfile,
}: {
  show: boolean;
  user: any;
  isUpdating: boolean;
  onClose: () => void;
  onUpdateProfile: (profile: any) => void;
}) {
  const [profile, setProfile] = useState<any>({
    ...user,
    tags: user?.tags?.join(","),
  });
  const [errors, setErrors] = useState<any>({
    firstname: "",
    lastname: "",
    bio: "",
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setProfile((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    let errors: any = {};
    if (profile?.firstname === "") {
      errors.firstname = "Firstname is required";
    }
    if (profile?.lastname === "") {
      errors.lastname = "Lastname is required";
    }

    if (profile?.bio === "") {
      errors.bio = "Bio is required";
    }

    return errors;
  }

  async function handleSubmit() {
    const errors = validate();
    if (Object.keys(errors)?.length > 0) {
      return setErrors(errors);
    }

		setErrors({});
    onUpdateProfile(profile);
  }

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Edit Profile</Modal.Header>
      <Modal.Body>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-x-3">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="firstname" value="Firstname" />
              </div>
              <TextInput
                id="firstname"
                name="firstname"
                type="text"
                value={profile?.firstname}
                onChange={handleChange}
                required={true}
                color={errors?.firstname && "failure"}
                helperText={errors?.firstname && errors?.firstname}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="lastname" value="Lastname" />
              </div>
              <TextInput
                id="lastname"
                name="lastname"
                type="text"
                value={profile?.lastname}
                onChange={handleChange}
                required={true}
								color={errors?.lastname && "failure"}
                helperText={errors?.lastname && errors?.lastname}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bio">Bio</Label>
            </div>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Write something about yourself..."
              required={true}
              rows={4}
              value={profile?.bio}
              onChange={handleChange}
							color={errors?.bio && "failure"}
              helperText={errors?.bio && errors?.bio}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="tags">Tags</Label>
            </div>
            <TextInput
              id="tags"
              name="tags"
              placeholder="www.mycoolsite.com"
              helperText="Enter tags separated by comma"
              value={profile?.tags || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="website">Website</Label>
            </div>
            <TextInput
              id="website"
              name="website"
              placeholder="www.mycoolsite.com"
              value={profile?.website || ""}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-3">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="twitter">Twitter</Label>
              </div>
              <TextInput
                id="twitter"
                name="twitter"
                helperText="Only enter valid username"
                value={profile?.socials?.twitter || ""}
                onChange={(e) => {
                  const { value } = e.target;

                  setProfile((prev: any) => ({
                    ...prev,
                    socials: {
                      ...prev.socials,
                      twitter: value,
                    },
                  }));
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="instagram">Instagram</Label>
              </div>
              <TextInput
                id="instagram"
                name="instagram"
                helperText="Only enter valid username"
                value={profile?.socials?.instagram || ""}
                onChange={(e) => {
                  const { value } = e.target;

                  setProfile((prev: any) => ({
                    ...prev,
                    socials: {
                      ...prev.socials,
                      instagram: value,
                    },
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end">
          <Button type="button" onClick={handleSubmit}>
            {isUpdating ? (
              <div className="mr-3">
                <Spinner size="sm" light={true} />
              </div>
            ) : (
              `Update`
            )}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProfileModal;
