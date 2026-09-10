export default function robots() {
  const baseUrl = "https://your-domain.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/dashboard/",
        "/profile/",
        "/applications/",
        "/login/",
        "/register/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}