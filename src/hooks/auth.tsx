import React, { createContext, ReactNode, useContext, useState } from 'react';

import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';


interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId: '257537654258-vteh8ofi2178ee13ebf92dqskbmo8kpi.apps.googleusercontent.com',
        androidClientId: '257537654258-ud1s76b9the45grnr3cfjjatf1hnoivs.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })

      if (result.type === 'success') {

        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!,
        };
        setUser(userLogged);
        await AsyncStorage.setItem("@login-social:user", JSON.stringify(userLogged));

      }
    } catch (error) {
      throw new Error(error)
    }


  }

  //obrigatorio para publicação na apple quando utilizar login social
  async function signInWithApple() {
    try {

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: undefined,
        }
        setUser(userLogged);
        await AsyncStorage.setItem("@login-social:user", JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }