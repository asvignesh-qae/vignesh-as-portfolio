export default function sitemap() {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://vignesh-as.dev";

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
