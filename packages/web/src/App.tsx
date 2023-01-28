/**
 * Provider and Screen configuration for the web based application
 * @author Elias Schablowski & John Hanna
 * @format
 */

import "./App.css";

import React, { useEffect } from "react";
import  AppNavigator from "./navigation/AppNavigator";
import { Spinner } from "native-base";
import { useDispatch, useSelector, user, language } from "@RideSaver/store";

export default function App() {

    const dispatch = useDispatch();
    const isLoading = useSelector(user.getIsLoading) as boolean;
    const token = useSelector(user.getToken) as boolean;

    useEffect(() => { dispatch(language.switchLocale("en-US"));}, [dispatch]);

    if (isLoading) {  return <Spinner />; }   
        
    return ( 
    <AppNavigator token={token}/> 
    );
}


