const IMMICH_API_URL = import.meta.env.VITE_IMMICH_API_URL;
const IMMICH_API_KEY = import.meta.env.VITE_IMMICH_API_KEY;

const ALBUM_IDS = {
  cityscape: import.meta.env.VITE_IMMICH_ALBUM_CITYSCAPE,
  events: import.meta.env.VITE_IMMICH_ALBUM_EVENTS,
  nature: import.meta.env.VITE_IMMICH_ALBUM_NATURE,
  street: import.meta.env.VITE_IMMICH_ALBUM_STREET,
  wildlife: import.meta.env.VITE_IMMICH_ALBUM_WILDLIFE,
};

export async function fetchAlbumPhotos(category) {
  const albumId = ALBUM_IDS[category];
  
  if (!IMMICH_API_KEY) {
    console.warn("Immich environment variable VITE_IMMICH_API_KEY is missing.");
    return [];
  }

  if (!albumId) {
    console.warn(`No Immich album UUID mapped for category: "${category}". Check your .env file.`);
    return [];
  }

  // Use the API URL directly since the frontend and API share the same domain
  const baseUrl = (IMMICH_API_URL || "").replace(/\/$/, "");
  
  const response = await fetch(`${baseUrl}/api/albums/${albumId}`, {
    method: "GET",
    headers: {
      "x-api-key": IMMICH_API_KEY,
      "accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Immich album "${category}": ${response.statusText} (${response.status})`);
  }

  const data = await response.json();
  const assets = data.assets || [];

  return assets.map((asset) => {
    // Determine orientation
    const width = asset.exifInfo?.exifImageWidth || 1;
    const height = asset.exifInfo?.exifImageHeight || 1;
    const orientation = width >= height ? "horizontal" : "vertical";
    
    // Extract year
    const fileDate = asset.fileCreatedAt || asset.fileModifiedAt || asset.createdAt;
    const year = fileDate ? new Date(fileDate).getFullYear().toString() : new Date().getFullYear().toString();
    
    // Extract title (use description, originalFileName, or fallback)
    const title = asset.exifInfo?.description 
      || (asset.originalFileName ? asset.originalFileName.replace(/\.[^/.]+$/, "") : "Untitled");

    // Extract city/location from exifInfo if available
    const location = asset.exifInfo?.city
      || asset.exifInfo?.state
      || asset.exifInfo?.country
      || "";

    // Build image URL using apiKey query param to get original asset
    const imageUrl = `${baseUrl}/api/assets/${asset.id}/original?apiKey=${IMMICH_API_KEY}`;

    return {
      id: asset.id,
      title,
      year,
      location,
      orientation,
      imageUrl,
      shadowColor: asset.shadowColor || null
    };
  });
}
