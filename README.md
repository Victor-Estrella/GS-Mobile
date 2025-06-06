# 🏠 SafeHub

O **SafeHub** é um aplicativo mobile para gestão de abrigos emergenciais, facilitando o controle de ocupação, estoque, localização e administração dos abrigos em situações de emergência.

## ✨ Funcionalidades

- **Cadastro e Login de Usuário**
- **Cadastro e Edição de Abrigos**
  - Nome, capacidade, localização e responsável
- **Controle de Estoque**
  - Alimentos, roupas, medicamentos, água e número de pessoas
  - Edição e exclusão de estoque
- **Mapa Interativo**
  - Visualização dos abrigos no mapa com geolocalização automática
  - Pinos coloridos conforme ocupação (verde, amarelo, vermelho)
- **Dashboard**
  - Resumo rápido da situação do abrigo
  - Alertas de lotação
- **Configurações**
  - Atualização de dados do usuário e abrigo
  - Exclusão de conta e abrigo (com confirmação)
- **Segurança**
  - Validação para não exceder a capacidade do abrigo
  - Confirmação antes de ações críticas

## 🛠️ Tecnologias Utilizadas

- **React Native** (Expo)
- **TypeScript**
- **React Navigation**
- **Axios**
- **React Native Maps**
- **AsyncStorage**
- **Spring Boot** (backend)
- **Oracle Database** (banco de dados)
- **OpenStreetMap Nominatim** (geocodificação)

## 📱 Telas Principais

- Login / Cadastro
- Dashboard
- Cadastro/Edição de Abrigo
- Cadastro/Edição de Estoque
- Mapa dos Abrigos
- Configurações

## 🚦 Como funciona a cor dos pinos no mapa?

- **Verde:** Ocupação < 50%
- **Amarelo:** Ocupação entre 50% e 80%
- **Vermelho:** Ocupação acima de 80%

## 🚀 Como rodar o projeto

1. Instale as dependências:
   ```
   npm install
   ```
2. Inicie o projeto:
   ```
   npm run start
   ```

## 👥 Integrantes

- Julia Monteiro - RM:557023 - Turma: 2TDSPV
- Sofia Andrade Petruk - RM:556585 - Turma: 2TDSPV
- Victor Henrique Estrella Carracci - RM:556206 - Turma: 2TDSPH

---

## 📺🔴 Link do Vídeo
https://youtu.be/BVbVajDElRg


Feito com 💙 para ajudar na gestão de abrigos e salvar vidas!