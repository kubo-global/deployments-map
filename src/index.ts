import "./styles.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set your Mapbox access token
mapboxgl.accessToken = "pk.eyJ1Ijoic2hhbmUtYWZyb2RpZGFjdCIsImEiOiJjbGllYnlqNmowcTNhM3FvYjdzNWY3djRjIn0.gzBrP3TNMbIfqzRez04NdA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/shane-afrodidact/cliec7pkb004b01pg9y096n6b/draft", // Use your desired base map style
  center: [-15.433, 13.2774], // Center the map
  zoom: 1, // Set the initial zoom level (a low value to cover the whole world)
});

// After the map loads, zoom towards your desired location
map.on("load", () => {
  const desiredLocation: mapboxgl.LngLatLike = [-15.433, 13.2774]; // Coordinates of your desired location
  const padding: number = 100; // Adjust the padding as needed
  const zoom: number = 7.5; // Adjust the zoom level as needed

  // Ease to the desired location with padding and zoom
  map.easeTo({
    center: desiredLocation,
    zoom: zoom,
    padding: {
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
    },
    duration: 3500, // Adjust the duration as needed
  });
});

// Add navigation controls to the map
map.addControl(new mapboxgl.NavigationControl());

// Function to perform an action when a location button is clicked
function handleLocationButtonClick(
  longitude: number,
  latitude: number,
  zoom: number
) {
  map.flyTo({
    center: [longitude, latitude],
    zoom: zoom,
    speed: 1.5,
    curve: 1.42,
    easing(t: number) {
      return t;
    },
  });
}

interface School {
  name: string;
  longitude: number;
  latitude: number;
  zoom: number;
  schoolName: string;
  numberOfStudents: number;
  numberOfClients: number;
  schoolDescription: string;
  classImage: string;
}

// Get the buttons container element
const buttonsContainer = document.getElementById("buttons-container");

// Create a button for viewing the whole country
const viewCountryButton: HTMLButtonElement = document.createElement("button");
viewCountryButton.textContent = "Overview";
viewCountryButton.className =
  "mx-2 py-2 px-4 bg-afrodidactYellow text-afrodidactDark rounded shadow";

viewCountryButton.addEventListener("click", () => {
  zoomToCountry();
});

buttonsContainer?.appendChild(viewCountryButton);

// Get the school info elements
const schoolNameElement = document.getElementById("school-name") as HTMLElement;
const schoolNumberOfStudentsElement = document.getElementById(
  "school-number-of-students"
) as HTMLElement;
const schoolNumberOfClientsElement = document.getElementById(
  "school-number-of-clients"
) as HTMLElement;
const schoolDescriptionElement = document.getElementById(
  "school-description"
) as HTMLElement;
const schoolClassImageElement = document.getElementById(
  "class-image"
) as HTMLElement;

const schools: School[] = [
  {
    name: "The Swallow",
    longitude: -16.7028,
    latitude: 13.44719,
    zoom: 19,
    schoolName: "The Swallow Centre of Emancipating Education",
    numberOfStudents: 225,
    numberOfClients: 26,
    schoolDescription: "Afrodidact Model School.",
    classImage: "img/theswallow.jpg",
  },
  {
    name: "Bakoteh Proper LBS",
    longitude: -16.69577,
    latitude: 13.43553,
    zoom: 18,
    schoolName: "Bakoteh Proper Lower Basic School",
    numberOfStudents: 3000,
    numberOfClients: 51,
    schoolDescription:
      "The biggest lower basic school in The Gambia with +/- 3000 pupils. 6 grades, up to 12 classes/grade - 115 teachers. Solar installation installed. Funded by Rotary Grant 2016052 (RC Banjul, RC Beveren-Waas). ",
    classImage: "img/bakotehproper.jpg",
  },
  {
    name: "Albreda LBS",
    longitude: -16.3857,
    latitude: 13.3388,
    zoom: 18,
    schoolName: "Albreda Lower Basic School",
    numberOfStudents: 381,
    numberOfClients: 26,
    schoolDescription:
      "The lower basic school of Albreda is located in the Northbank. It has 381 pupils + 91 toddlers (Early Childhood Development). There are 6 grades with 2 classes/grade, and 12 teachers. Solar installation installed. Funded by Rotary Grant 2016052 (RC Banjul, RC Beveren-Waas).",
    classImage: "img/albreda.jpg",
  },
  {
    name: "Njaba Kunda LBS",
    longitude: -15.916,
    latitude: 13.54918,
    zoom: 18,
    schoolName: "Njaba Kunda Lower Basic School",
    numberOfStudents: 406,
    numberOfClients: 26,
    schoolDescription:
      "406 pupils + 36 toddlers ECD - 6 grades, 2 classes/grade (gr2:3) - 13 teachers. Solar installation installed. Funded by Rotary Grant 2016052 (RC Banjul, RC Beveren-Waas).",
    classImage: "img/njabakunda.jpg",
  },
  // ... other schools
];

// Create location buttons for specific locations
schools.forEach(createLocationButton);
schools.forEach(addMarkerToMap);

// Function to create a button for a location
function createLocationButton(school: School): void {
  const button = document.createElement("button");
  button.textContent = school.name;

  // Add Tailwind CSS classes
  button.className =
    "mx-2 py-2 px-4 bg-afrodidactYellow text-afrodidactDark shadow rounded";

  button.addEventListener("click", () => {
    handleLocationButtonClick(school.longitude, school.latitude, school.zoom);
    updateSchoolInfo(
      school.schoolName,
      school.numberOfStudents,
      school.numberOfClients,
      school.schoolDescription,
      school.classImage
    );

    openSidebar();
  });
  buttonsContainer?.appendChild(button);
}

// Function to update the school info box with the provided data
function updateSchoolInfo(
  name: string,
  numberOfStudents: number,
  numberOfClients: number,
  description: string,
  classImage: string
): void {
  schoolNameElement.textContent = name;
  schoolNumberOfStudentsElement.textContent = numberOfStudents.toString();
  schoolNumberOfClientsElement.textContent = numberOfClients.toString();
  schoolDescriptionElement.textContent = description;
  schoolClassImageElement.setAttribute("src", classImage);
}

// The function to zoom out to the country level
function zoomToCountry(): void {
  map.flyTo({ center: [-15.433, 13.2774], zoom: 7.5 });

  closeSidebar();
}

// The function to add a marker on the map
function addMarkerToMap(school: School): void {
  // Define a custom color for the marker
  const markerColor = "#f14346";

  // Create the marker
  const marker = new mapboxgl.Marker({ color: markerColor })
    .setLngLat([school.longitude, school.latitude])
    .addTo(map); // Add the marker to the map

  // Add a click event listener to the marker
  marker.getElement().addEventListener("click", () => {
    map.flyTo({
      center: [school.longitude, school.latitude],
      zoom: school.zoom,
    });
    updateSchoolInfo(
      school.schoolName,
      school.numberOfStudents,
      school.numberOfClients,
      school.schoolDescription,
      school.classImage
    );

    openSidebar();
  });
}
const classImage = document.getElementById("class-image") as HTMLImageElement;
const expandedImage = document.getElementById(
  "expanded-image"
) as HTMLImageElement;
const imageContainer = document.getElementById("image-container");
const closeButton = document.getElementById("close-button");

classImage.addEventListener("click", () => {
  const imageUrl = classImage.src;
  expandedImage.src = imageUrl;
  imageContainer?.classList.remove("hidden");
  imageContainer?.classList.add("opacity-0");
  setTimeout(() => {
    imageContainer?.classList.add("opacity-100");
  }, 0);
});

closeButton?.addEventListener("click", () => {
  imageContainer?.classList.remove("opacity-100");
  setTimeout(() => {
    imageContainer?.classList.add("hidden");
  }, 500);
});

const closeInfoBoxButton = document.getElementById(
  "close-info-box-button"
) as HTMLElement | null;
const infoBox = document.getElementById("info-box") as HTMLElement | null;

if (closeInfoBoxButton && infoBox) {
  closeInfoBoxButton.addEventListener("click", () => {
    infoBox.classList.remove("flex"); // Remove the 'hidden' class
    infoBox.classList.add("hidden"); // Add the 'flex' class
  });
}

const sidebar = document.getElementById("sidebar") as HTMLElement;
const openSidebarBtn = document.getElementById("openSidebarBtn") as HTMLElement;
const closeSidebarBtn = document.getElementById(
  "closeSidebarBtn"
) as HTMLElement;

// openSidebarBtn.addEventListener('click', () => {
//   openSidebar();
// });

closeSidebarBtn.addEventListener("click", () => {
  closeSidebar();
});

function openSidebar(): void {
  sidebar.style.display = "flex";
  openSidebarBtn.style.display = "none";
  if (map) {
    map.resize(); // Trigger map resize event
  }
}

function closeSidebar(): void {
  sidebar.style.display = "none";
  openSidebarBtn.style.display = "block";
  if (map) {
    map.resize(); // Trigger map resize event
  }
}
