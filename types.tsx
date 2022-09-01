/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  App: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Intro: undefined;
  LoginScreen: undefined;
  
  SignIn_1: {
    isUser: boolean
  };

  SignIn_2c: {
    cpf: string,
    senha: string
  };
  SignIn_3c: {
    nome: string,
    sobrenome: string,
    rg: string,
    cpf: string,
    senha: string
  };
  SignIn_4c: {
    data_nasc: Date,
    cidade: string,
    uf: string,

    nome: string,
    sobrenome: string,
    rg: string,
    cpf: string,
    senha: string
  }

  SignIn_2e: {
    cnpj: string,
    senha: string
  }
  Detalhes: undefined;
};



export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: {title: string};
  Vagas: undefined;
  Chat: undefined;
  Config: undefined;
  CardRecom: undefined
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
