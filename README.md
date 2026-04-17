# 🎵 VibeStream - Premium Music Streaming

![VibeStream Preview](https://img.shields.io/badge/Design-Glassmorphism-9d50bb)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20MUI%20%7C%20Vite-blue)

**VibeStream** é um player de música premium desenvolvido com React e Vite, integrado à API do Google Drive para streaming direto. Conta com uma interface sofisticada em design glassmorphic, controles de áudio dinâmicos e navegação inteligente, unindo estética moderna a uma experiência de reprodução fluida, responsiva e de alta performance.

## ✨ Funcionalidades

- ☁️ **Integração com Google Drive:** Sincronização direta com seus arquivos de áudio armazenados na nuvem.
- 🕹️ **Modo Demo:** Possibilidade de explorar a interface e funcionalidades mesmo sem um Client ID configurado.
- 🎨 **Design Premium:** Interface moderna com efeito glassmorphic, modo escuro nativo e animações suaves via Framer Motion.
- 📡 **Streaming em Tempo Real:** Player global que permite navegação contínua pelo app sem interromper a música.
- 📊 **Dashboard & Analytics:** Visão geral do armazenamento e estatísticas da sua biblioteca.
- 🔐 **Autenticação Segura:** Login integrado com Google OAuth.

## 🚀 Tecnologias Utilizadas

- **Frontend:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **UI/UX:** [Material UI (MUI)](https://mui.com/) + [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Gerenciamento de Dados:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Requisições:** [Axios](https://axios-http.com/)
- **Ícones:** [Lucide React](https://lucide.dev/) & [MUI Icons](https://mui.com/material-ui/material-icons/)

## 📂 Estrutura do Projeto

A arquitetura foi pensada para escalabilidade e fácil manutenção:

```
src/
├── components/          # Componentes globais e reutilizáveis
│   ├── AudioPlayer/     # Componentes do player principal
│   └── ...              # StatCards, Breadcrumbs, Dropdowns
├── hooks/               # Custom hooks (ex: useGoogleDrive)
├── presentation/        # Camada de visualização
│   ├── layout/          # Estrutura de navegação (Sidebar, Header)
│   └── pages/           # Telas completas (Home, Library, Analytics, etc)
├── services/            # Integração com APIs e serviços externos
├── theme.js             # Configuração do tema visual (MUI)
└── constants.js         # Definições globais e enums
```

## 🛠️ Instalação e Execução

1. **Clone o repositório:**
   ```bash
    git clone https://github.com/TauaneAlessandra/music-stream-drive.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Certifique-se de que o backend proxy esteja rodando em `https://localhost:19131` para garantir o stream das músicas.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

---

Desenvolvido por **Tauane** com foco em design e performance. 🚀
