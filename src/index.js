import store from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved, selectUnresolvedBugs, bugAssignedToUser, selectBugsByUser } from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';


store.dispatch(bugAdded({description: "Bug1"}));
store.dispatch(bugAdded({description: "Bug2"}));
store.dispatch(bugAdded({description: "Bug3"}));
store.dispatch(projectAdded({ name: "BugTracker" }));
store.dispatch(bugResolved({id:2}));
store.dispatch(bugRemoved({id:3}));

store.dispatch(userAdded({ name: 'Colin' }));
store.dispatch(userAdded({ name: 'Joey' }));
store.dispatch(userAdded({ name: 'Sloont' }));

store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));

console.log(selectBugsByUser(1)(store.getState()));


