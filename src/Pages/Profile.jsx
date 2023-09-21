import React, { useEffect, useState } from 'react'
import {getAuth} from 'firebase/auth'
import {collection, getDocs, query, where} from 'firebase/firestore';
import {db} from '../Firebase'

export default function Profile() {
    const auth = getAuth();
    const [number, setNumber] = useState('');
    const stringpart = JSON.stringify(auth.currentUser.email);
    const name = stringpart.match(/([a-zA-Z]+)/);
    var rollno = stringpart.match(/([0-9]+)/);
    const year1 = stringpart.split(".");
    const year = year1[1].match(/([0-9]+)/);
    rollno[0] = year[0]+"1099"+rollno[0]
    const dep1 = JSON.stringify(year1[1]);
    const dep = dep1.match(/([a-zA-Z]+)/);
    const corrected = "20"+year[0];
    useEffect(()=>{
        async function getphonenumber(){
            const listingRef = collection(db,"users");

            const q = query(listingRef,where("email","==",auth.currentUser.email));
            // const snapshot = await getDoc(auth.currentUser.uid);
            const querysnap = await getDocs(q);
            querysnap.forEach((doc)=>{
                const data = doc.data();
                const phoneNumber = data.number;
                setNumber(phoneNumber)
            })
        }
        getphonenumber();
    },[auth.currentUser.uid])
  return (
    <div>
        <p>{name[0]}</p>
        <p>{auth.currentUser.email}</p>
        <p>{rollno[0]}</p>
        <p>{dep[0].toUpperCase()}</p>
        <p>{corrected}</p>
        <p>{number}</p>
    </div>
  )
}
