// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, getDocs, collection, getDoc, doc, query, where} from "firebase/firestore/lite"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzkN2H3E5mMT0OEdFSUTJLcGnirxl36JI",
  authDomain: "vanlife-507f1.firebaseapp.com",
  projectId: "vanlife-507f1",
  storageBucket: "vanlife-507f1.appspot.com",
  messagingSenderId: "68051494923",
  appId: "1:68051494923:web:2184c35f815c0fee767f0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef);
    let dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));

    return dataArr;
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id);
    const vanSnapshot = await getDoc(docRef);
    return {...vanSnapshot.data(), id: vanSnapshot.id};
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"));
    const querySnapshot = await getDocs(q);
    const vansData = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    return vansData;
}

// export async function fetchData(url) {
//     const res = await fetch(url);
//     if (!res.ok) {
//         throw {
//             "message": JSON.parse(res._bodyText).error,
//             "status": res.status,
//             "statusText": res.statusText,
//         }
//     }
//     const data = await res.json();
//     return data;
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}