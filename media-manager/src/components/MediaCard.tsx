import { DeleteButton } from "./Interactions";


function MediaArt({ mediaItem }) {
  return (
    <div className="media-art">
      <img style={{ maxHeight: "100px" }} src="/src/assets/hero.png" alt={`${mediaItem.name} artwork`} />
    </div>
  );
}

function MediaTitle({ title }) {
  return (
    <h3>{title}</h3>
  );
}

function MediaInfo({ mediaItem }) {
  return (
    <div className="media-info">
      <MediaTitle title={mediaItem.name} />
      <p>Category: {mediaItem.category}</p>
      <p>Year: {mediaItem.year}</p>
      <p>Size: {(mediaItem.size / 1000).toFixed(2)} GB</p>
      <p>Age: {mediaItem.age} days</p>
      <p>Deletable: {mediaItem.isDeletable ? "Yes" : "No"}</p>
      {!mediaItem.isDeletable && mediaItem.reason && (
        <p>Reason: {mediaItem.reason}</p>
      )}
    </div>
  );
}

function MediaCard({ mediaItem }) {
  return (
    <div className={`media-card ${mediaItem.isDeletable ? '' : 'disabled'}`}>
      <MediaArt mediaItem={mediaItem} />
      <MediaInfo mediaItem={mediaItem} />
      <DeleteButton disabled={!mediaItem.isDeletable} />
    </div>
  );
}

export { MediaCard };