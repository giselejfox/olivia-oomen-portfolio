export default function Video({ videoUrl }) {
    return (
        <div className="vh-100 d-flex justify-content-center">
            <iframe width="100%" height="90%" src={videoUrl} title="YouTube video player" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; gyroscope; web-share" allowFullScreen></iframe>
        </div>
    )
}