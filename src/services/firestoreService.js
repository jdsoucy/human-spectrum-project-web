import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore";
import CONFIG from '../config';

firebase.initializeApp(CONFIG);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};

export const addCompany = (payload) => {
  return db.collection('companies')
    .add({
      created: firebase.firestore.FieldValue.serverTimestamp(),
      // createdBy: userId,
      ...payload,
    });
};

export const getCompanyList = () => {
  return db.collection('companies')
    .orderBy('created')
    .get()
    
};

// export const getGroceryListItems = groceryListId => {
//     return db.collection('groceryLists')
//         .doc(groceryListId)
//         .collection('items')
//         .get();
// }

// export const streamGroceryListItems = (groceryListId, observer) => {
//     return db.collection('groceryLists')
//         .doc(groceryListId)
//         .collection('items')
//         .orderBy('created')
//         .onSnapshot(observer);
// };

// export const addUserToGroceryList = (userName, groceryListId, userId) => {
//     return db.collection('groceryLists')
//         .doc(groceryListId)
//         .update({
//             users: firebase.firestore.FieldValue.arrayUnion({ 
//                 userId: userId,
//                 name: userName
//             })
//         });
// };

// export const addGroceryListItem = (item, groceryListId, userId) => {
//     return getGroceryListItems(groceryListId)
//         .then(querySnapshot => querySnapshot.docs)
//         .then(groceryListItems => groceryListItems.find(groceryListItem => groceryListItem.data().name.toLowerCase() === item.toLowerCase()))
//         .then(matchingItem => {
//             if (!matchingItem) {
//                 return db.collection('groceryLists')
//                     .doc(groceryListId)
//                     .collection('items')
//                     .add({
//                         name: item,
//                         created: firebase.firestore.FieldValue.serverTimestamp(),
//                         createdBy: userId
//                     });
//             }
//             throw new Error('duplicate-item-error');
//         });
// };