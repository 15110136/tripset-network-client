import React, { Fragment, Component } from 'react'
import { Container } from 'components/Layout'
import { createMap, loadMapApi } from 'utils/http';
import { H1 } from 'components/Text';
import styled from 'styled-components';

export default class PlaceDetails extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      Maps: null,
      service: null,
      maps: null,
      place: null
    }
  }

  initGGmap = async (lat, lng, placeId) => {
    const Maps = await loadMapApi();
    const maps = await createMap(document.getElementById('gmap-place'), lat, lng, 18)
    const service = new Maps.places.PlacesService(maps)
    const infowindow = new Maps.InfoWindow()

    return new Promise(function(resolve, reject) {
      let request = {
        placeId,
        fields: ['name', 'formatted_address', 'place_id', 'geometry']
      }
      service.getDetails(request, (place, status) => {
        if (status === Maps.places.PlacesServiceStatus.OK) {
          resolve(place)
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
    })
  }
  
  async componentDidMount () {
    const { placeId, lat, lng } = this.props.match.params
    this.initGGmap(lat, lng, placeId).then(res => console.log(res))
    // let { Maps, service, maps } = await this.initGGmap(lat, lng, placeId)
    // let a = service.getDetails({ placeId, fields: ['name', 'formatted_address', 'place_id', 'geometry'] }, (plc, status) => {
    //   return new Promise(plc)
    // })
  }

  render() {
    const MapPlace = styled.div`
      height: 70vh;
      width: 100%;
      margin: 0 auto;
    `

    const HeaderDetails = styled.div`
      ${H1} {
        font-size: ${p => p.theme.font.size.lg};
      }
    `

    return (
      <Fragment>
        <Container spacing="xxxs">
          <MapPlace id="gmap-place"/>
          <HeaderDetails>
            <H1>{this.place}</H1>
          </HeaderDetails>
        </Container>
      </Fragment>
    )
  }
}

