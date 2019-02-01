export function favouriteManager(id) {
  let favouritesToSave;

  const favourites = getFavourites();
  
  if (favourites) {
    if (getFavourite(id)) {
      favouritesToSave = favourites.filter(favourite => favourite !== id);
    } else {
      favouritesToSave = [...favourites, id];
    }
  } else {
    favouritesToSave = [id];
  }

  localStorage.setItem("favourites", JSON.stringify(favouritesToSave));
}

export function getFavourites() {
  return JSON.parse(localStorage.getItem("favourites"));
}

export function getFavourite(id) {
  const favourites = JSON.parse(localStorage.getItem("favourites"));
  return favourites && favourites.find(x => x === id);
}
