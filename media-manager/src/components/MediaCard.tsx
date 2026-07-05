import { MediaControls } from "./Interactions";
import exampleMovieArt from "../../public/assets/example-movie.jpg";

type mediaItem = {
  category: string;
  name: string;
  size: number;
  isDeletable: boolean;
  reason?: string;
  age: number;
};

type MediaCardProps = {
  mediaItem: mediaItem;
};

type MediaArtProps = {
  mediaItem: mediaItem;
};

type MediaInfoProps = {
  mediaItem: mediaItem;
};

type MediaTitleProps = {
  title: string;
};


function MediaArt({ mediaItem }: MediaArtProps) {
  return (
    <div className="media-art">
      <img style={{ maxHeight: "150px" }} src={exampleMovieArt} alt={`${mediaItem.name} artwork`} />
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