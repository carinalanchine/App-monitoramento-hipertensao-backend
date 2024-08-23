## App-monitoramento-hipertensao-backend

- Projeto criado para ajudar os médicos a monitorar pacientes hipertensos

## Linguagem Ubíqua

- Paciente:

  - Vai receber notificações para tomar remédio, lembrar da consulta e lembrar de medir a pressão.
  - Registrar a pressão no app.
  - Registra se tomou o remédio.
  - Registrar os remédios que precisa tomar
  - Registrar a próxima consulta

- Médico:

  - Vai visualizar a lista de pacientes.
  - Vai visualizar os logs do paciente (remédios tomados e pressões registradas).
  - Registrar os remédios que um paciente específico precisa tomar
  - Registrar os remédios na lista geral do sistema relacionado ao hospital
  - Vai poder Agendar consulta para um determinado paciente
  - Registra os pacientes

- Enfermeiro

  - Vai visualizar a lista de pacientes.
  - Vai visualizar os logs do paciente (remédios tomados e pressões registradas).
  - Registrar os remédios que um paciente específico precisa tomar
  - Vai poder agendar consulta para um determinado paciente
  - Registra os pacientes

- Assistente:

  - Vai auxiliar tanto o médico quanto o paciente, ele pode agendar a consulta, criar conteúdo, criar a lista de remédio de cada paciente, criar acesso para o paciente.

- Consulta

- Remédio

- Pressão

- Hospital
  - Dominio para saber de onde são os profissionais e pacientes

## Explicação das pastas

- Infra: Pasta mais externa da aplicação

  - db: onde fica a conexão com o banco
  - route: onde fica as rotas da aplicação, vale lembrar que as rotas chamam os controllers

- Application: Pasta entre a intra e o domain

  - controllers: onde fica os controladores do sistema, eles que chamam os useCases e injetam as dependencias como os repository
  - repositories: onde fica os repositórios, eles recebem a instancia do banco e fazem as consultas

- Domain: Onde fica o core do sistema e as regras de negócio

  - useCases: todos casos de uso do sistema, exemplo: getUserByEmail
  - entitites: onde fica as entidades do sistema, exemplo: doctor

## Como rodar o projeto

- 1: Clone o projeto para sua máquina

- 2: Vá até a pasta pelo terminal e execute esse comando:

```
npm install
```

- 3: Crie um banco de dados postgress

- 4: Crie um arquivo na pasta raiz do projeto com o nome:

```
.env
```

- 5: Dentro desse arquivo coloque isso:

```
DATABASE_URL="postgresql://postgres:root@localhost:5432/app-monitoramento?schema=public"
```

Substitua o que está dentro das aspas pela url de conexão do seu banco de dados

- 6: Rode o comando:

```
npx prisma migrate deploy
```

- 7: Agora rode esse:

```
npx prisma db seed
```

PRONTO!!!

Para rodar o projeto execute isso:

```
npm run dev
```

## Fluxo da aplicação

1 - admin cria acesso para os médicos, enfermeiros e assistentes
2 - médicos, enfermeiros e assistentes loga na plataforma
3 - médicos, enfermeiros, assistentes e admin criam acesso para os pacientes
4 - paciente loga na plataforma
5 - médicos, enfermeiros, assistentes ou pacientes entram com os dados de remédio e consultas
6 - pacientes recebem notificações de remédio, consultas e pressão
7 - pacientes marcam se tomou o remédio, registra a pressão
8 - médicos e enfermeiros acessam os logs de cada paciente

## Rotas

- auth:

  - method: post
  - body:
    - cpf: string;
    - password: string;
  - response:
    - token: string;
    - rule: "admin" | "patient" | "assistant" | "doctor" | "nurse";

- hospital:

  - method: post
  - body:
    - name: string;

- hospital:

  - method: get
  - header:
    - autorization
  - response:
    data: []

- user

  - method: post
  - header:
    - autorization
  - body:
    - cpf: string;
    - password: string;
    - rule: "admin" | "patient" | "assistant" | "doctor" | "nurse";
    - name: string;
    - hospital: string;

- user/doctor

  - method: get
  - header:
    - autorization
  - response:
    - data: []

- user/nurse

  - method: get
  - header:
    - autorization
  - response:
    - data: []

- user/patient

  - method: get
  - header:
    - autorization
  - response:
    - data: []

- exam

  - method: post
  - header:
    - autorization
  - body:
    - name: string

- medical-appointment

  - method: post
  - header:
    - autorization
  - body:
    - date: string;
    - doctorId: string;
    - exam: string;
