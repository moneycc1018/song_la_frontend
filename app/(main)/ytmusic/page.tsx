import ArtistSelectArea from "../components/artist-select-card";

export default function YtmusicPage() {
  return (
    <div>
      <div></div>
      <div className="grid grid-cols-2">
        <ArtistSelectArea data={[]} />
      </div>
    </div>
  );
}
