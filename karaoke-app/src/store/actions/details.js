import { detailsStates } from '../states';
import { FETCH_DETAILS_START, FETCH_DETAILS_SUCCESS, FETCH_DETAILS_FAIL } from './actionTypes';

/* * * * * * * * * * * * * * *
* ACTIVE ACTION TYPE METHODS *
* * * * * * * * * * * * * *  */
const DetailsStatesCounter = new Counter(detailsStates);

// action type methods return current active action type that is determined by the state of the fetch requests.
// Also these methods pass data passed from user methods to Redux reducers to update states
export const fetchDetailsStart = (identifier) => {
    return {
        type: FETCH_DETAILS_START,
        identifier: identifier
    };
};

export const fetchDetailsSuccess = (identifier, data = {}) => {
    DetailsStatesCounter.reset(identifier);
    return {
        type: FETCH_DETAILS_SUCCESS,
        identifier: identifier,
        data: data
    };
};

export const fetchDetailsFail = (identifier, error = 'Error message missing. Please contact site administrator.') => {
    DetailsStatesCounter.reset(identifier);
    return {
        type: FETCH_DETAILS_FAIL,
        identifier: identifier,
        error: error
    };
};

/* * * * * * * * * * * * 
 * SONG LYRICS METHODS *
 * * * * * * * * * * * */

export const fetchSongLyrics = (artist = null, title = null) => {
    return async dispatch => {
        dispatch(fetchDetailsStart('songLyrics'));
        try {
            const data = await events.get(`${artist}/${title}`);
            dispatch(fetchDetailsSuccess('songLyrics', data));
        } catch (error) {
            dispatch(fetchDetailsFail('songLyrics', error));
        }
    };
};
