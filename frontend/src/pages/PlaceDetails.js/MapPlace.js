import React, { useEffect } from 'react'
import styled from 'styled-components'
import { createMap, loadMapApi } from 'utils/http'

const MapPlace = props => {
  const { placeId, lat, lng } = props
  const MapPlace = styled.div`
    height: 70vh;
    width: 100%;
    margin: 0 auto 20px auto;
  `

  useEffect(() => {
    const setup = async () => {
      let Maps = await loadMapApi();
      const maps = await createMap(document.getElementById('gmap-place'), lat, lng, 18)
      const service = new Maps.places.PlacesService(maps)
      const infowindow = new Maps.InfoWindow()

      let request = {
        placeId,
        fields: ['name', 'formatted_address', 'place_id', 'geometry']
      }
      service.getDetails(request, (place, status) => {
        if (status === Maps.places.PlacesServiceStatus.OK) {
          let marker = new Maps.Marker({
            map: maps,
            position: place.geometry.location
          })
  
          Maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              'Place ID: ' + place.place_id + '<br>' +
              place.formatted_address + '</div>');
            infowindow.open(maps, this);
          });
        }
      })
    }

    setup()
  })

  return (
    <MapPlace id="gmap-place"/>
  )
}

export default MapPlace
