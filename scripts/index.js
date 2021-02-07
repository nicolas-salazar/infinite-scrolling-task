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
const getNewPhotoImageElement = (photo) => {

  // Main card:
  const mainCard = document.createElement('div');
  mainCard.className = 'card centered-container d-column fadeInRight';

  // Card's body:
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardBody.innerHTML = `<img class="photo" src="${photo.urls.regular}"/>`;
  mainCard.appendChild(cardBody);

  // Card's footer:
  const cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer';

  const photoDescription = document.createElement('span');
  photoDescription.className = 'photo-description';
  photoDescription.innerHTML = photo.alt_description || '...';
  photoDescription.title = photo.alt_description || 'No description';

  const photoAuthor = document.createElement('span');
  photoAuthor.className = 'photo-author';
  const targetUsername = photo.user.instagram_username || photo.user.username;
  const targetUserProfilePage = (photo.user.instagram_username) ? `https://www.instagram.com/${photo.user.instagram_username}/` : `https://unsplash.com/@${photo.user.username}`;
  photoAuthor.innerHTML = `by: <b><a class="author-ref" href="${targetUserProfilePage}" target="_blank">${targetUsername}</a></b>`;

  cardFooter.appendChild(photoDescription);
  cardFooter.appendChild(photoAuthor);
  mainCard.appendChild(cardFooter);

  return mainCard;
}

const renderNewPhotosBunch = (photosBunch) => {
  const photosContainer = document.getElementById('photos-main-container');

  photosBunch.forEach((photo, i) => {
    photosContainer.appendChild(getNewPhotoImageElement(photo));
  });

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
