import axios from "axios";
import playButton from "../../images/play-button-icon.png";
import closeButton from '../../images/close_icon.png'


const displayDetailsButton = (e) => {
  e.target.style.transform = "scale(1.3)";
  e.target.style.transition =
    "transform 0.3s ease-out, opacity 0.3s ease-out";
  e.target.style.opacity = "0.9";

  const detail = e.target.nextSibling;
  detail.style.opacity = "1";
  detail.style.transition = "opacity 0.5s ease-out";
};
const closeDetailsButton = (e) => {
  e.target.style.transform = "scale(1)";
  e.target.style.transition = "transform 0.3s ease-out";
  e.target.style.opacity = "1";

  const detail = e.target.nextSibling;
  detail.style.opacity = "0 ";
  detail.style.transition = "opacity 0.5s ease-out";
};

const hoverOverDetailsButton = (e) => {
  e.target.style.opacity = "1";
  e.target.style.transition = "opacity 0.5s ease-out";
  e.target.previousSibling.style.transform = "scale(1.3)";
  e.target.previousSibling.style.opacity = "0.9";
  e.target.previousSibling.style.transition =
    "transform 0.5s ease-out, opacity 0.5s ease-out";
};

const leaveDetailButton = (e) => {
  e.target.style.opacity = "0";
  e.target.style.transition = "opacity 0.3s ease-out";
};
const createOverviewSection = async (
  tvShowName,
  tvShowOverview = "No review",
  tvShowBackdropPath,
  tvShowID,
  playTrailer,
  event
) => {
  const overviewSection = document.createElement("div");
  overviewSection.className = "overview-section";

  const overview = document.createElement("div");
  overview.className = "overview";

  const overviewTitle = document.createElement("h2");
  overviewTitle.className = "overview-title";
  overviewTitle.textContent = tvShowName;

  const overviewContent = document.createElement("div");
  overviewContent.className = "overview-content";
  overviewContent.textContent = tvShowOverview;

  const overviewPlayButton = document.createElement("button");
  overviewPlayButton.className = "play-trailer-button";
  const playButtonImg = document.createElement("img");
  playButtonImg.className = "play-button-icon";
  playButtonImg.src = `${playButton}`;
  const playButtonText = document.createElement("p");
  playButtonText.textContent = "Play";
  playButtonText.style.fontSize = "20px";

  overviewPlayButton.appendChild(playButtonImg);
  overviewPlayButton.appendChild(playButtonText);

  overview.appendChild(overviewTitle);
  overview.appendChild(overviewContent);
  overview.appendChild(overviewPlayButton);

  const overviewImage = document.createElement("img");
  overviewImage.className = "overview-image";
  overviewImage.src = `https://image.tmdb.org/t/p/w500/${tvShowBackdropPath}`;
  overviewImage.alt = `${tvShowName}`;

  const overviewCloseButton = document.createElement('img')
  overviewCloseButton.className = 'close-overview-button'
  overviewCloseButton.src = `${closeButton}`

  overviewSection.appendChild(overview);
  overviewSection.appendChild(overviewImage);
  overviewSection.appendChild(overviewCloseButton);


  event.target.parentNode.parentNode.parentNode.after(overviewSection);
  // const popularTvShows = document.querySelector(".popular-tv-shows");
  // popularTvShows.after(overviewSection);

  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${tvShowID}/videos?api_key=cc803c8c2a7e8fddea1b3ff64514f0b4&language=en-US`
  );

  const videoID = response.data.results.filter((result) => {
    return result.type === "Trailer";
  })[0];

  if (videoID) {
    overviewPlayButton.addEventListener("click", () => {
      playTrailer(videoID.key);
    });
  } else {
    overviewPlayButton.addEventListener("click", () => {
      alert("No trailer");
    });
  }

  overviewCloseButton.addEventListener('click', (e) => {
    document.querySelector('.overview-section').remove()
   
  })
  
  // window.scrollTo(0, overviewSection.getBoundingClientRect().top + overviewSection.offsetHeight);
};
const displayOverview = (
  tvShowName,
  tvShowOverview = "No review",
  tvShowBackdropPath,
  tvShowID,
  playTrailer,
  event
) => {
  if (document.querySelector(".overview-section")) {
    document.querySelector(".overview-section").remove();
    createOverviewSection(
      tvShowName,
      tvShowOverview,
      tvShowBackdropPath,
      tvShowID,
      playTrailer,
      event
    );
    document.querySelector(".overview-section").scrollIntoView();
    // window.scrollTo(0, document.querySelector('.overview-section').getBoundingClientRect().top +  document.querySelector('.overview-section').offsetHeight);
  } else {
    createOverviewSection(
      tvShowName,
      tvShowOverview,
      tvShowBackdropPath,
      tvShowID,
      playTrailer,
      event
    );
    document.querySelector(".overview-section").scrollIntoView();

    // window.scrollTo(0, document.querySelector('.overview-section').getBoundingClientRect().top +  document.querySelector('.overview-section').offsetHeight);
  }
};
export {
  displayDetailsButton,
  closeDetailsButton,
  createOverviewSection,
  displayOverview,
  hoverOverDetailsButton,
  leaveDetailButton,
};
