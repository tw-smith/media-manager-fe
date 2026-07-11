import { MediaControls } from "./Interactions";
import type { MediaItem } from "../App";
import axios from "axios";
import { useEffect, useState } from "react";

// type mediaItem = {
//   category: string;
//   name: string;
//   size: number;
//   isDeletable: boolean;
//   reason?: string;
//   age: number;
// };

type MediaCardProps = {
  mediaItem: MediaItem;
};

type MediaArtProps = {
  mediaItem: MediaItem;
};

type MediaInfoProps = {
  mediaItem: MediaItem;
};

type MediaTitleProps = {
  title: string;
};


function MediaArt({ mediaItem }: MediaArtProps) {
  const [image, setImage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const getImage = async () => {
      try {
        const res = await axios.get(mediaItem.posterURL, {
          responseType: "arraybuffer",
        });

        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        if (isMounted) {
          setImage(base64);
        }
      } catch (error) {
        console.error("Failed to load image", error);
        if (isMounted) {
          setImage("");
        }
      }
    };

    getImage();

    return () => {
      isMounted = false;
    };
  }, [mediaItem.posterURL]);

  return (
    <div className="media-art">
      <img
        style={{ maxHeight: "150px" }}
        src={image ? `data:image/jpeg;base64,${image}` : ""}
        alt={`${mediaItem.name} artwork`}
      />
    </div>
  );
}

function MediaTitle({ title }: MediaTitleProps) {
  return (
    <b>{title}</b>
  );
}

function MediaInfo({ mediaItem }: MediaInfoProps) {
  return (
    <div className="media-info">
      <MediaTitle title={mediaItem.name} />
      <p>Size: {(mediaItem.size / 1000).toFixed(2)} GB</p>
      <p>Age: {mediaItem.age} days</p>
      <p>Deletable: {mediaItem.isDeletable ? "Yes" : "No"}</p>
      {!mediaItem.isDeletable && mediaItem.reason && (
        <p>Reason: {mediaItem.reason}</p>
      )}
    </div>
  );
}

function MediaCard({ mediaItem }: MediaCardProps) {
  return (
    <div className={`media-card ${mediaItem.isDeletable ? '' : 'disabled'}`}>
      <MediaArt mediaItem={mediaItem} />
      <MediaInfo mediaItem={mediaItem} />
      <MediaControls deleteDisabled={!mediaItem.isDeletable} />
    </div>
  );
}


export { MediaCard };