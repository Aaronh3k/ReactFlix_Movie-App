import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

interface AvatarProps {
  url: string | null;
  size: number;
  email: string;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>, path: string) => void;
}

const Avatar: React.FC<AvatarProps> = ({ url, size, email, onUpload }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error: any) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(event, filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  function getDefaultAvatar() {
    const firstLetter = email.charAt(0).toUpperCase();
    return (
      <div
        className="avatar-default"
        style={{
          height: size,
          width: size,
          lineHeight: `${size}px`,
          fontSize: size / 2,
          borderRadius: "50%",
          backgroundColor: "#C4C4C4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFFFFF",
        }}
      >
        {firstLetter}
      </div>
    );
  }

  function handleEditClick() {
    const fileInput = document.getElementById("avatar-input");
    if (fileInput) {
      fileInput.click();
    }
  }

  return (
    <div className="avatar-wrapper" style={{ position: "relative" }}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{
            height: size,
            width: size,
            borderRadius: "50%",
          }}
        />
      ) : (
        getDefaultAvatar()
      )}
      <div className="upload-button-container" style={{ width: size }}>
        <IconButton
          aria-label="Edit Avatar"
          icon={<EditIcon />}
          onClick={handleEditClick}
          zIndex="overlay"
          position="absolute"
          bottom="0"
          right="0"
          bgColor="transparent"
          _hover={{ bgColor: "transparent" }}
          _active={{ bgColor: "transparent", transform: "scale(0.9)" }}
          _focus={{ boxShadow: "none" }}
        />
        <input
          id="avatar-input"
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
      {editing && (
        <div
          className="avatar-editing-container"
          style={{ height: size + 20, width: size + 20 }}
        >
          <IconButton
            aria-label="Cancel Edit Avatar"
            icon={<EditIcon />}
            onClick={() => setEditing(false)}
            zIndex="overlay"
            position="absolute"
            top="0"
            right="0"
            bgColor="transparent"
            _hover={{ bgColor: "transparent" }}
            _active={{ bgColor: "transparent", transform: "scale(0.9)" }}
            _focus={{ boxShadow: "none" }}
          />
          <div className="upload-button-container">
            <label className="upload-button" htmlFor="avatar-input">
              {uploading ? "Uploading..." : "Choose new avatar"}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
