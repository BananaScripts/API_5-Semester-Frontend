export const users: User[] = [
    {
      cpf: '123',
      senha: '123',
      nome: 'João Silva',
      dataEntrada: '2023-01-15',
      cargo: 'Gerente',
      imagemPerfil: require('../../../assets/joao.png'), 
    },
    {
      cpf: '98765432100',
      senha: 'senha456',
      nome: 'Maria Oliveira',
      dataEntrada: '2022-08-20',
      cargo: 'Analista de Suporte',
      imagemPerfil: require('../../../assets/maria.png'),
    },
  ];
  
  export type User = {
    cpf: string;
    senha: string;
    nome: string;
    dataEntrada: any;
    cargo: string;
    imagemPerfil: any;
    response?: (message: string) => string;
  };
  