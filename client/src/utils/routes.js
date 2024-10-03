import { Component } from "react"
import AuthPage from "../pages/Auth"
import { ADOPT, AUTH_URL, CONTRACT, FORMADD, PROFILE } from "./const"
import PetsCatalog from "../pages/PetsCatalog"
import AdoptionForm from "../pages/AdoptPet"
import ProfilePage from "../pages/Profile"
import Contract from "../pages/Contract"
import FormAddPet from "../components/FormAdd/FormAdd"
import PetDetails from "../components/PetsDetails"

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
    },
    {
        path: CONTRACT,
        Component: <Contract/>
    },
    {
        path: FORMADD,
        Component: <FormAddPet/>
    },
    {
        path:'/pets/:id',
        Component: <PetDetails/>
    },

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
    },
    {
        path:'/pets/:id',
        Component: <PetDetails/>
    },


]