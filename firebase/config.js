// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVi99gaueFoc8_FqKNYI9GAdsotNuqyFM",
  authDomain: "postsapp-a2c40.firebaseapp.com",
  projectId: "postsapp-a2c40",
  storageBucket: "postsapp-a2c40.appspot.com",
  messagingSenderId: "992087607416",
  appId: "1:992087607416:web:3805ca2f1c4007ab95058d",
  databaseURL: "https://project-id.firebaseio.com",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
