import type { Metadata } from "next";

export const siteUrl = "https://www.pceenergies.com";
export const siteName = "Phoenix Creed Energy";
export const defaultDescription =
  "Phoenix Creed Energy is building Africa's electric mobility ecosystem through EV charging infrastructure, fleet solutions, intelligent software, battery storage, and professional EV servicing.";
export const defaultOgImage = "/pce-logo.png";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
}: PageMetadataInput): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName,
      title,
      description,
      images: [
        {
          url: image,
          width: 1254,
          height: 1254,
          alt: `${siteName} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
