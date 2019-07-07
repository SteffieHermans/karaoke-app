import { detailsStates } from '../states';
import { FETCH_DETAILS_START, FETCH_DETAILS_SUCCESS, FETCH_DETAILS_FAIL } from '../actions/actionTypes';

const initialState = detailsStates.reduce((state, stateName) => ({
    ...state,
    [stateName]: { data: null, loading: false, error: null }
}), {});

/* * * * * * * * * * * * * * * * * * * * * * * * *
* METHODS THAT UPDATE STATES WITH CORRECT VALUES *
* * * * * * * * * * * * * * * * * * * * * * * *  */
const fetchDetailsStart = (state, action) => ({
    ...state,
    ...{ [action.identifier]: {...state[action.identifier], ...{ loading: true } } }
});

const fetchDetailsSuccess = (state, action) => ({
    ...state,
    ...{ [action.identifier]: {...state[action.identifier], ...{
        data: action.data,
        loading: false,
        error: null
    } } }
});

const fetchDetailsFail = (state, action) => ({
    ...state,
    ...{ [action.identifier]: {...state[action.identifier], ...{ data: null, success: false, loading: false, error: action.error } } }
});

/* * * * * * * * *
* REDUCER METHOD *
* * * * * * * *  */
// Depending on the active action type, execute the correct function to update the correct states with the correct values
// Pass two parameters, first is the old state values, second is the new state values, these are passed from actions
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DETAILS_START: return fetchDetailsStart(state, action);
        case FETCH_DETAILS_SUCCESS: return fetchDetailsSuccess(state, action);
        case FETCH_DETAILS_FAIL: return fetchDetailsFail(state, action);
        default: return state;
    }
};

export default reducer;