import detailsReducer from './details';

// combine Redux reducers into one reducer to access Redux states accross the project
const rootReducer = {
    details: detailsReducer,
};

export default rootReducer;