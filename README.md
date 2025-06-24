# POC - ElectronJS + Vite + Typescript + React

Criando projeto de teste para criação de apps desktop usando ElectronJS. Teste com libs do React (como react-router-dom e MUI), gerando build sem necessidade de instalação.

## Etapas pra execução

1. Clonar este projeto

```bash
git clone https://github.com/devlari/poc-electron
```

2. Acesse a pasta do projeto

```bash
cd poc-electron
```

3. Instalar as dependências necessárias

```bash
npm install
```

4.1. Rodar o projeto como ambiente de desenvolvimento

```bash
npm run dev
```

4.2. Buildar o projeto <br/>

```bash
npm run dist
```

💡 Certifique-se que rodou o bash como administrador, essa parte pode falhar pois o projeto pode entender que ele não tem as permissões necessárias

O executável estará na pasta dist/win-unpacked.
