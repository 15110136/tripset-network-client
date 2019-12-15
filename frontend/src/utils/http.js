import { GMAP_URL } from "constants/Layout";

const SCRIPT_CACHED = {};

function getScript (src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');

    script.async = true;
    script.src = src;

    script.addEventListener('load', function () {
      document.head.removeChild(script);
      resolve(script);
    });

    script.addEventListener('error', function (err) {
      reject(err);
    });

    document.head.appendChild(script);
  });
}

export function loadScript (url) {
  if (!SCRIPT_CACHED[url]) {
    SCRIPT_CACHED[url] = getScript(url);
  }

  return SCRIPT_CACHED[url];
}

export async function loadMapApi () {
  await loadScript(GMAP_URL);

  return window.google.maps;
}

export async function createMap (el, lat=10.776, lng=106.700, zoom=18) {
  let Maps = await loadMapApi()
  let place = new Maps.LatLng(lat, lng);
  let maps = new Maps.Map(el, { center: place, zoom });
  return maps
}