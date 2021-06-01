import store from './store/configureStore';

import { loadBugs } from './store/bugs';

store.dispatch(loadBugs());








