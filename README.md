<h1>Autenticação React Native utilizando o Context API</h1>

- Referência [Autenticação no React Native / ReactJS com Context API & Hooks | Masterclass #12](https://www.youtube.com/watch?v=KISMYYXSIX8&list=PLucj_45zrXWVib6QUe8YhtrGMJND5K9n7&index=2&t=113s)

---

## Iniciar projeto:

- Executar na linha de comando:

```bash
npx react-native init NOME_PROJETO
```

---

## ESLint, Prettier, Editor Config

- Gerar o arquivo editorconfig:

```js
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

```

- Antes de instalar o eslint, remova o arquivo `.eslintrc.js` e o arquivo `.prettier`

- Executar no terminal:

```bash
yarn add eslint -D
```

- Após instalado executar:

```bash
yarn eslint --init
```

- Responder as perguntas:

- How would you like to use ESLint?

- `To check syntax, find problems, and enforce code style`

- What type of modules does your project use?

- `JavaScript modules (import/export)`

- Which framework does your project use?

- `React`

- Where does your code run?

- **Remover todos**

- How would you like to define a style for your project?

- `Use a popular style guide`

- Which style guide do you want to follow?

- `Airbnb: https://github.com/airbnb/javascript`

- What format do you want your config file to be in?

- `JavaScript`

- Would you like to install them now with npm?

- `Y`

- Remover o arquivo package-look.json

- Executar o comando `yarn`

- Instalar mais algumas extensões para trabalhar com o ESLint:

- Executar o seguinte no terminal:

```bash
yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
```

- No arquivo `.eslintrc.js` alterar o conteúdo para:

```js
module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', 'js']
      }
    ],
    'import/prefer-default-export': 'off'
  },
};

```

**Nos arquivos a parte dos styles sempre é melhor vir antes que o component**

- Criar o arquivo `.prettierrc` com o seguinte conteudo:

```js
{
  "singleQuote": true,
  "trailingComma": "es5"
}

```

- Provavelmente após todos esse processos irá aparecer um monte de erros na tela do dispositivo, para corrigir, encerre o processo no terminal e execute o comando:

```bash
yarn start --reset-cache
```

- Dessa forma irá abrir o bundle porém irá resetar as dependencias

- E sempre que houver problemas sem explicação só executar esse comando ou executar o `yarn PLATAFORMA`

---

## Organizar estrutura de pastas

- Criar a pasta `src` e adicionar um arquivo `index.js` e adicionar o código que está no `App.js` e remover o arquivo `App.js` e no arquivo `index.js` que está na raiz importar o `App` de `src/index.js`:

```js
import App from './src';
```

---

## Root Import

- Facilita a importação dos arquivos que estão dentro de várias pastas, ao ínves de utilizar `../../../pasta/arquivo` ficará assim `~/pasta/arquivo`;

- Primeiro adicione a dependencia:

```bash
yarn add babel-plugin-root-import eslint-import-resolver-babel-plugin-root-import -D
```

- Ajustar o arquivo `babel.config.js` com o seguinte conteúdo:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src/',
            rootPathPrefix: '~/',
          },
        ],
      },
    ],
  ],
};


```

- Na chave `rootPathSuffix` informamos a pasta que será utilizada no caso `./src/`

- No arquivo `.eslintrc.js` adicionamos o seguinte dentro de `modules.exports`:

```js
settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        "rootPathPrefix": "~",
        "rootPathSuffix": "src"
      }
    }
  }
```

- Estamos dessa forma informando que a pasta root do projeto será `src`

- Crie também na raiz do projeto um arquivo `jsconfig.json` para o vscode não se perder nas importações com o seguinte conteúdo:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}

```

- Agora poderá utilizar `~/` ao invés de `../../`

- Para surtir efeito no app é necessário realizar a seguinte comando:

```bash
react-native start --reset-cache
```

- Pois nem sempre fechando o emulador e e dando run irá funcionar


---

## Navegação

No React Native a parte de navegação é diferente da parte de navegação do React da web

- Criar as paginas: `src/pages/Dashboard/index.js`, `src/pages/SignIn/index.js` e `src/pages/Loading/index.js`

- Criar o arquivo para rotas `src/routes.js`

- Instalar a navegação:

```bash
yarn add @react-navigation/native
```

- A dependencia do react-navigation muda constantemente por isso é sempre bom dar uma conferida na documentação para verificar as dependencias a serem instaladas.

- Docs: [React Navigation](https://reactnavigation.org/docs/getting-started)

- é bom verificar o que ele pede, no caso nesse projeto foi instalado também:

```bash
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

- E depois precisei acessar a pasta `ios/` e executar o comando:

**Para mac OS instalar o cocoapods: [CocoaPods](https://cocoapods.org)**


```bash
pod install
```

- Para surtir efeitos nessas alterações é necessário executar novamente o comando:

```bash
yarn PLATAFORMA
```

- Instalar a seguinte dependencia conforme [stack navigator](https://reactnavigation.org/docs/hello-react-navigation):

```bash
yarn add @react-navigation/stack
```

- No arquivo `src/routes.js` há um exemplo de como foi utilizado o `Stack Navigator` seguindo algumas opções de [createStackNavigator](https://reactnavigation.org/docs/stack-navigator#example)

**Importante: Para não quebrar a aplicação em produção é necessário adicionar a importação no arquivo de rotas:**

```js
import 'react-native-gesture-handler';
```

---

## Styled Components

- Instalação:

```bash
yarn add styled-components
```

- Um exemplo pode ser visto em `src/pages/SignIn/styles.js`

- No caso só pode ser utilizado components do Native, e ainda é necessário estilizar component por component não pode ser encadeado.

- A vantagem é que consigo utilizar o css normal como na web.


---

## Services

- Inicialmente vamos criar a pasta `src/services` e vamos adicionar o arquivo `auth.js`, para simular uma chamada de API:

```js
export function signIn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'asfjaksldfjowerj2309r0923432oklj5l3j5k43j5kl32',
        user: {
          name: 'Rodolfo',
          email: 'rodolfo@email.com',
        },
      });
    }, 2000);
  });
}
```

- Vamos adicionar a dependência `axios`:

```bash
yarn add axios
```

- E vamos criar o arquivo `src/services/api.js`, e colocar uma `baseURL` apenas para simular a chamada de api:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default api;

```

---

## Context

- Inicialmente vamos instalar a dependência `@react-native-community/async-storage`:

```bash
yarn add @react-native-community/async-storage
```

- Acessar a pasta `ios/` e executar o comando:

```bash
pod install
```

- Inicialmente vamos criar o arquivo `src/context/auth.js`

```js
// O que há de diferente é o `createContext` e `useContext`
import React, { createContext, useContext, useState, useEffect } from 'react';

import PropTypes from 'prop-types'; // Apenas para definir os tipos de parametros que serão passados para o component AuthProvider

// Semelhante ao localstorage porém para o react-native precisa disso.
import AsyncStorage from '@react-native-community/async-storage';

// Importamos as APIs de testes...
import * as auth from '~/services/auth';
import api from '~/services/api';


// Informamos a estrutura do objeto quais parametros que ele irá prover
const AuthContext = createContext({
  signed: false,
  user: {},
  loading: true,
  signIn: () => {},
  signOut: () => {},
});


// Será como component que será inserido em `src/App.js` e irá receber tudo que estiver embrulhado nesse componente em `src/App.js`
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // Ao montar o componente vamos obter os dados do AsyncStorage para verificar se o usuário está logado ou não.
  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn() {
    const response = await auth.signIn();

    setUser(response.user);
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
    api.defaults.headers.Authorization = `Bearer ${response.token}`;
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    // aqui será disponibilizado as props que será disponibilizada para os demais componentes conforme o `AuthContext.createContext({})`
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
    { /* Aqui será recebido os elementos inseridos no `src/App.js` dentro de `AuthProvider` */ }
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.any,
  ]).isRequired,
};


// Hock para chamar o useContext mais facilmente.
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

```

---

- Vamos fragmentar o código acima para melhor entendimento:


```js
import React, { createContext, useState } from 'react';

import * as auth from '~/services/auth';

const AuthContext = createContext({
  signed: false,
  user: {},
  signIn: () => {}, // será chamado para preencher a variavel `user`
  signOut: () => {}, // será chamado para limpar a variavel `user`
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function signIn() {
    const response = await auth.signIn(); // irá retornar: {token: 'asfjaksldfjowerj2309r0923432oklj5l3j5k43j5kl32',user: {name: 'Rodolfo',email: 'rodolfo@email.com',},}

    setUser(response.user);
  }

  function signOut() {
    setUser(null);
  }

  return (
    // Será utilizado em `src/App.js`
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      { /* Conteúdo desse componente utilizado no src/App.js */ }
      {children}
    </AuthContext.Provider>
  );
};

```

- Criamos as rotas: `src/routes/app.routes.js` e `src/routes/auth.routes.js` acesse os arquivos para verificar o conteúdo.

- Próximo passo no arquivo `src/App.js`:

```js
import { AuthProvider } from '~/contexts/auth';

//..

<AuthProvider>
  <Routes />
</AuthProvider>

// ...
```

- Como utilizar o `Context API` em um componente:

```js
import React, { useContext } from 'react'; // Utilize o useContext
import { Button, Text } from 'react-native';
import { AuthContext } from '~/context/auth'; // Obtenha o context

export default function Component() {
  const { user, signIn } = useContext(AuthContext); // Obtenha as props desejada do context que foi passado através do `<AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }} >`

  function handleClick() {
    // Chamamos a function do context
    signIn();
  }

  use
  return (
    <>
      <Text>{user.name}</Text>
      <Button onPress={handleClick} title="Sign In" />
    </>
  );

  // ...
}
```

- **Importante que o component esteja de alguma form dentro de `<AuthProvider>` no caso desse projeto estamos colocando dentro das rotas**

---

## AsyncStorage

- Para armazenar os dados de login para recuperar após fechar e abrir o app, utilizamos o `AsyncStorage`

```bash
yarn add @react-native-community/async-storage
```

- Acessar a pasta `ios/` e executar o comando:

```bash
pod install
```

- Isso ficará sobre a responsabilidade do Context `src/contexts/auth.js`

- Ao realizar o `signIn()`:

```js
async function signIn() {
  const response = await auth.signIn();
  setUser(response.user);

  // Não podemos salvar objeto javascript diretamente, convertemos para string.
  await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
  await AsyncStorage.setItem('@RNAuth:token', response.token);
}
```

- Ao acessar o app verificamos se o usuário está com os dados salvos:

```js
useEffect(() => {
  async function loadStorageData() {
    const storageUser = await AsyncStorage.getItem('@RNAuth:user');
    const storageToken = await AsyncStorage.getItem('@RNAuth:token');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (storageUser && storageToken) {
      setUser(JSON.parse(storageUser));
    }
    setLoading(false);
  }
  loadStorageData();
}, []);
```

## axios

- Instale o `axios`:

```bash
yarn add axios
```

- crie o arquivo `src/services/api.js`

- Utilizar token após obté-lo, então podemos definir na api axios:

```js
import api from '~/services/api';

// ...

async function signIn() {
  // ...

  api.defaults.headers.Authorization = `Bearer ${response.token}`;
}
```

- E quando obtemos quando abrimos o app e verificamos se as credenciais estão salvas:

```js
import api from '~/services/api';

// ...

if (storageUser && storageToken) {
  setUser(JSON.parse(storageUser));
  api.defaults.headers.Authorization = `Bearer ${storageToken}`;
}

// ...
```

- Mais detalhes abra o arquivo `src/contexts/auth.js`

## Loading

- O AsyncStorage é async então a tela `Sign In` será exibida e logo depois a `Dashboard` dará uma piscada de uma tela para outra. Para tratar isso:
  - criamos uma view de Loading `src/pages/Loading/index.js`, caso deseje pode utilizar o [React Native Splash Screen](https://www.npmjs.com/package/rn-splash-screen) se preferir.

  - No `src/contexts/auth.js` adicionamos uma prop `loading`:
  ```js
  const AuthContext = createContext({
    // ...
    loading: true,
    //...
  });
  ```
  - Ainda nesse arquivo criamos um state para controlar o loading:
  ```js
  // ...
  const [loading, setLoading] = useState(true);
  // ...

  useEffect(() => {
    // ...
    setLoading(false);
    // ...
  }, []);
  // ...

  //adicionamos o `loading` no value do component `AuthContext.Provider`

  <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
    {children}
  </AuthContext.Provider>
  // ...

  ```

  - Finalmente em `src/routes/index.js` realizamos a condição:

  ```js
  import React from 'react';
  // ...
  import { useAuth } from '~/contexts/auth';
  import Loading from '~/pages/Loading';

  const Routes = () => {
    const { signed, loading } = useAuth();

    if (loading) {
      return <Loading />;
    }

    // ...
  };

  export default Routes;

  ```

---

## hock para o Context API

- Para não chamar o `useContext` e o context nos componentes podemos gerar um hock no própiro context.

- No arquivo `src/contexts/auth.js` adicionamos:

```js
// Adicionado o `useContext`
import React, { createContext, useState, useEffect, useContext } from 'react';

// ...


// Esse será o hock que será chamado nos componentes
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

```

- Então nos componentes podemos chamar apenas:

```js
// ...
import { useAuth } from '~/contexts/auth';

const Component = () => {
  const { signOut, user } = useAuth();
  // ...
}
```

- Por fim para utilizarmos mais de um Context API podemos empilhar um dentro do outro no caso no `src/App.js`:

```js
<Context1>
  <Context2>
  </Context2>
</Context1>
```
