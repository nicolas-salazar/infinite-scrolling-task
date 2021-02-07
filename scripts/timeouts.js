const waitFor = (timeAsMiliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(); }, timeAsMiliseconds);
  });
}