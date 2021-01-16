
import axios from 'axios'
const BaseURL = 'https://swapi.dev/api'

export const fetchPeople = (url = null) => {
    return async () => {
        url = !url ? `${BaseURL}/people` : url
        let response = await axios.get(url)
        return response;
    }
}

export const fetchPeopleDetails = (peopleId) => {
    return async () => {
        let url = `${BaseURL}/people/${peopleId}`
        let response = await axios.get(url)
        return response;
    }
}
export const fetchFilmDetails = (filmArray) => {
    return async () => {
        return Promise.all(
            filmArray.map(async film => {
                let response = await fetchFilmName(film)
                return response;
            })
        )
    }
}
const fetchFilmName = async (film) => {
    let filmDetails = await axios.get(film)
    return filmDetails;
}