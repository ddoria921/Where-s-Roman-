window.mapboxgl.accessToken =
  'pk.eyJ1IjoiZGRvcmlhOTIxIiwiYSI6ImNqbzFyaTlyajBlcm8za3FpeXVobDhnOXQifQ.cCd_N_-DvB2yn4BOHmdWyQ'

const TENNESEE = [
  [-82.72679328918457, 35.27810240200768],
  [-82.72331714630127, 35.27810240200768],
  [-82.72331714630127, 35.27522953838499],
  [-82.72679328918457, 35.27522953838499]
]

const CREDO = [
  [-81.39079570770262, 28.57242430238014],
  [-81.38937950134277, 28.57242430238014],
  [-81.38937950134277, 28.57099211730347],
  [-81.39079570770262, 28.57099211730347]
]

const RUSSIA = [
  [37.6087760925293, 56.1390221995254],
  [37.61160850524902, 56.1390221995254],
  [37.61160850524902, 56.137611391714586],
  [37.6087760925293, 56.137611391714586],
]

const LOCATIONS = [TENNESEE, CREDO, RUSSIA]
const ROMAN = findRoman();

window.onload = () => {
  loadMap()
}

function loadMap() {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
    center: [-97.470703125, 28.613459424004414],
    zoom: 3
  })

  map.on('load', function() {

    map.addSource('bigroman', {
      type: 'image',
      url: 'https://wheresroman.ddoria.now.sh/assets/roman.png',
      coordinates: ROMAN
    })

    map.addLayer({
      id: 'roman-layer',
      type: 'raster',
      source: 'bigroman',
      paint: {
        'raster-fade-duration': 0
      }
    })
  })

  const compass = document.getElementById('compass_container')

  compass.addEventListener(
    'animationend',
    () => {
      compass.classList.add('fadeout')
    },
    false
    )

    compass.addEventListener('transitionend', () => {
      compass.remove()
      map.flyTo({
      center: ROMAN[0],
      zoom: 11
    })
  })
}

function findRoman() {
  const random = Math.floor(Math.random() * 1000) % 3;
  return LOCATIONS[random];
}

// map.addLayer({
//   id: 'points',
//   type: 'symbol',
//   source: {
//     type: 'geojson',
//     data: {
//       type: 'FeatureCollection',
//       features: [
//         {
//           type: 'Feature',
//           geometry: {
//             type: 'Point',
//             coordinates: ROMAN
//           },
//           properties: {
//             title: 'Roman'
//           }
//         }
//       ]
//     }
//   },
//   layout: {
//     'icon-image': 'roman-bike-15',
//     'text-field': '{title}',
//     'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
//     'text-offset': [0, 0.6],
//     'text-anchor': 'top'
//   }
// })
