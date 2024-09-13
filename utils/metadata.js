export function generateMetadata(
  title,
  description,
  currentUrl = "https://jansori.jihun.io"
) {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: currentUrl,
      title,
      description,
      images: [
        {
          url: "/metadata/jansori-card.png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/metadata/jansori-card.png"],
    },
  };
}
