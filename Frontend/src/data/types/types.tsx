export type RootStackParamList = {
    Home: undefined;
    ChatScreen: { bot: Bot };
  };
  
  export type Bot = {
    id: string;
    image: any;
  };