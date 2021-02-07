// App consts:
const PHOTOS_PER_BUNCH = 5;

// Dev consts:
const DEV_MODE = true;

// Functions for fetching new photos via unsplash api:
const UNSPLASH_API_KEY = 'yTo9-Xn72MaLp22BLXZJkM9qfeda9LBJSPR4SSmXT1E';

const getPhotosBunchFromUnsplashApi = async () => {
  try {
    const apiResponse = await fetch(`https://api.unsplash.com/photos/random?count=${PHOTOS_PER_BUNCH}`, {
      headers: { Authorization: `Client-ID ${UNSPLASH_API_KEY}`, },
    });

    const dataAsJson = await apiResponse.json();
    return dataAsJson
  }
  catch (error) {
    throw error;
  }
}

// Functions for rendering new photos on DOM:
const renderNewPhotosBunch = (photosBunch) => {
  console.log('NSALAZAR. photosBunch:', photosBunch);
}

// Functions for requesting new photos actioned by scroll behaviour:
const getMorePhotos = async () => {
  const targetFunction = DEV_MODE ? getPhotosBunchFromMockData : getgetPhotosBunchFromUnsplashApi;
  const obtainedPhotos = await targetFunction();

  return obtainedPhotos;
}

const printMorePhotos = async () => {
  const newPhotosBunch = await getMorePhotos();
  renderNewPhotosBunch(newPhotosBunch);
}

// Initialization:
