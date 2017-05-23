const fetchMedia = ( media ) => {
  return {
    type: "FETCH_MEDIA",
    payload: media,
  }
}

const startReproductionMedia = ( media ) => {
  return {
    type: "FETCH_REPRODUCTION_MEDIA",
    payload: media,
  }
}

const stopReproductionMedia = () => {
  return {
    type: "REMOVE_REPRODUCTION_MEDIA",
  }
}

const defaultMediaState = {
  isFetched: false,
  media: null
}

const media = ( state=defaultMediaState, action ) => {
  switch (action.type) {
    case 'FETCH_MEDIA' {
      return {
        ...state,
        isFetched : true,
        data: action.payload
      }
    }
  }
  return state;
}

const defaultReproductionState = {
  isPlaying : false,
  media : media(null, {})
}

const reproduction = (state=defaultReproductionState, action) => {
  switch (action.type) {
    case 'FETCH_REPRODUCTION_MEDIA' : {
      return {
        ...state,
        isPlaying: true,
        media: media(null, fetchMedia(action.payload))
      }
    },
    case 'REMOVE_REPRODUCTION_MEDIA' : {
      return {
        ...state,
        isPlaying: false,
        media: media(null, {})
      }
    }
  }
  return state;
}
