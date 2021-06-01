import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import logger from './middleware/logger';
import toast from './middleware/toast';
import api from './middleware/api';




const store = configureStore({
    reducer: rootReducer, 
    middleware: [
        ...getDefaultMiddleware(),
        logger({ destination: "console" }),
        toast,
        api
    ]
});


export default store;