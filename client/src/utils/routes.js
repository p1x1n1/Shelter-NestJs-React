import { Component } from "react"
import AuthPage from "../pages/Auth"
import { ADOPT, AUTH_URL, PROFILE } from "./const"
import PetsCatalog from "../pages/PetsCatalog"
import AdoptionForm from "../pages/AdoptPet"
import ProfilePage from "../pages/Profile"

export const authRoutes = [
    {
        path: AUTH_URL,
        Component: <AuthPage />,
    },
    {
        path:'/',
        Component: <PetsCatalog/>
    },
    {
        path: ADOPT+':petId/',
        Component: <AdoptionForm/>
    },
    {
        path: PROFILE,
        Component: <ProfilePage/>
    }
]
export const publicRoutes = [
    {
        path: AUTH_URL,
        Component: <AuthPage />,
    },
    {
        path:'/',
        Component: <PetsCatalog/>
    },
    {
        path: ADOPT+'/:petId',
        Component: <AdoptionForm/>
    },
    {
        path: "*",
        component: () => <h1>404 Not Found</h1>,
    }

]