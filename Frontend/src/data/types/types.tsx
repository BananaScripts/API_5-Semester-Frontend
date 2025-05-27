export type Bot = {
  id: string;
  image: any;
};

export type BotWithLastMessage = Bot & {
  lastMessageSnippet?: string;
};

export type User = {
  cpf: string;
  imagemPerfil: any;
};

export type RootStackParamList = {
  HomeTabs: { user: User };
  Login: undefined;
  ChatScreen: { bot: Bot };
  Perfil: { user: User };
};
