import { getPlacesWithinDistance } from "./placeDetailData";

const MAX_DISTANCE = 20;
const MAX_TAGS = 2;
const MAX_ITEMS = 5;

export const mockTourData = getPlacesWithinDistance(MAX_DISTANCE)
  .map(place => ({
    id: place.id,
    name: place.name,
    tags: place.tags.slice(0, MAX_TAGS),
    imageUrl: place.imageUrl,
    distance: place.distance,
  }))
  .sort((a, b) => a.distance - b.distance)
  .slice(0, MAX_ITEMS);
