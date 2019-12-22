import React, { Fragment, Component } from 'react'
import { Container } from 'components/Layout'
import { createMap, loadMapApi } from 'utils/http';
import { H1 } from 'components/Text';
import styled from 'styled-components';
import MapPlace from './MapPlace';
import PlacePhotos from './PlacePhotos';
import PlaceReviews from './PlaceReviews';

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

  initGGmap = async () => {
    const { placeId, lat, lng } = this.props.match.params
    const Maps = await loadMapApi();
    const maps = await createMap(document.createElement('div'), lat, lng, 18)
    const service = new Maps.places.PlacesService(maps)
    service.getDetails({
      placeId,
      fields: ['name', 'formatted_address', 'place_id', 'url', 'photo',
        'rating', 'reviews'
      ]
    }, (place, sts) => {
      if (sts === Maps.places.PlacesServiceStatus.OK) {
        place.photos = place.photos.map(item => {
          item.src = item.getUrl()
          return item
        })
        this.setState({
          place
        })
      }
    })
  }
  
  componentDidUpdate() {
    this.initGGmap()
  }

  async componentDidMount () {
    this.initGGmap()
  }
  
  render() {
    const HeaderDetails = styled.div`
      display: flex;
      align-items: baseline;

      ${H1} {
        font-size: 46px;
      }
    `
    const Address = styled.p`
      font-weight: bold;

      a img {
        width: 30px;
        margin-left: 10px;
      }
    `

    const Rating = styled.span`
      font-weight: bold;
      font-size: 46px;
      margin-left: 50px;

      img {
        width: 34px;
      }
    `

    const { placeId, lat, lng } = this.props.match.params
    const { place } = this.state
    return (
      <Fragment>
        <Container spacing="xxxs">
          <MapPlace placeId={placeId} lat={lat} lng={lng}/>
          {place && (
            <div>
              <HeaderDetails>
                <H1>
                  {place.name}
                </H1>
                <Rating>
                  {place.rating}
                  <img src="/favourites.png" alt="star"/>
                </Rating>
              </HeaderDetails>
              <Address>
                {place.formatted_address}
                <a href={place.url}>
                  <img src="/map.png" alt="map-icon"/>
                </a>
              </Address>
              <PlacePhotos list={place.photos}/>
              <PlaceReviews list={place.reviews}/>
            </div>
          )}
        </Container>
      </Fragment>
    )
  }
}

