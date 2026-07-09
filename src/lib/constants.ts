export const SITE_CONFIG = {
  name: "Project Heart",
  description: "Create unforgettable digital experiences for the people you love.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og.jpg",
  themeColor: "#ffffff",
};

export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  builder: "/builder",
  login: "/login",
  signup: "/signup",
} as const;

export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB
