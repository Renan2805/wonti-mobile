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
  Root: undefined;
  App: undefined;
  Modal: undefined;
  NotFound: undefined;
  First: undefined;
  Intro: undefined;
  LoginScreen: undefined;
  RecoverPasswordScreen: undefined;
  Home: undefined;
  Vagas: undefined;

  SignIn_1: {
    isUser: boolean
  };

  SignIn_2c: undefined;
  SignIn_3c: undefined;
  SignIn_4c: undefined;
  SignIn_5c: undefined;
  SignIn_6c: undefined;
  SignIn_7c: {
    instituicao: string,
    nivel: string,
    qualificacao: string
  };
  SignIn_8c: {
    instituicao: string,
    nivel: string,
    qualificacao: string,

    dataInicio: string,
    dataTermino: string
  };
  SignIn_9c: undefined;

  SignIn_2e: undefined;
  SignIn_3e: undefined;
  SignIn_4e: undefined;
  DetailScreen: undefined;
  HomeEmpresa: undefined;

};

export type HomeStackparamList = {
  Home: undefined;
  Job: { 
    id: string
    theme: boolean
  };
}

export type HomeStackScreenProps<Screen extends keyof HomeStackparamList> = NativeStackScreenProps<
  HomeStackparamList,
  Screen
>

export type VagasStackParamList = {
  Vagas: undefined;
  Job: {
    id: string
  }
}

export type VagasStackScreenProps<Screen extends keyof VagasStackParamList> = NativeStackScreenProps<
  VagasStackParamList,
  Screen  
>

export type ConfigStackParamList = {
  ConfigScreen: undefined;
  DetailScreen: undefined;
  ConfigConta:  undefined;
  Suporte: undefined;
  Seguranca: undefined;
};

export type ConfigStackScreenProps<Screen extends keyof ConfigStackParamList> = NativeStackScreenProps<
  ConfigStackParamList,
  Screen
>


export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  HomeTab: undefined;
  Vagas: undefined;
  Chat: undefined;
  Config: undefined;
  CardRecom: undefined
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type User = {
  dados_pessoais: {
    cpf: string,
    dataDeNascimento: string,
    nome: string,
    sobrenome: string,
    rg: string,
    github: string
  },
  email: string,
  endereco: {
    bairro: string,
    cep: string,
    cidade: string,
    complemento: string,
    numero: string,
    rua: string,
    uf: string
  },
  formacao: {
    aptidoes: string[],
    certificados: string[],
    idiomas: string[],
    instituicao: string,
    nivel: string,
    qualificacao: string
  },
  informacoes: string[],
  numero_cel: string
}

export type Job = {
  Hirer: string,
  HirerUid: string,
  Title: string,
  Description: string,
  Time: string,
  Type: string,
  Competitors: number,
  Place: string,
  Salary: number,
  Posted: number
}