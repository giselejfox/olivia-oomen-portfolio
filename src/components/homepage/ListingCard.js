export default function ListingCard({ title, slug, iconUrl }) {
  return (
    <div className="card border-0 h-100 d-flex flex-column">
      <a href={`/work/${slug}`} className="image-container">
        <img className="card-img-top hover-shrink" src={iconUrl} alt={title} />
      </a>
      <div className="card-body mt-auto">
        <p className="card-title">
          <a href={`/work/${slug}`} className="text-decoration-none text-dark">{title.toUpperCase()}</a>
        </p>
      </div>
    </div>
  );
}