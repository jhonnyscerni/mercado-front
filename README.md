# Instalar NPM
## LINUX
- sudo apt install npm

## Instalar o Angular
- npm install -g @angular/cli@latest

# Instalar o node por NVM
## Linux
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
## MAC
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
### Isso instalará o script nvm em sua conta de usuário. Para usá-lo, você deve antes gerar seu arquivo .bashrc:
## LINUX
- source ~/.bashrc
## MAC
- source ~/.nvm/nvm.sh
### NVM quais versões do Node estão disponíveis:
- nvm list-remote

### Instalar a Versão usada no Projeto
- nvm install v16.14.2

### Usar a Versão instalada
- nvm use 16.14.2

### Após comando aparecerá
Now using node v16.14.2 (npm v9.6.7)

## Executando o Projeto

- ng serve 

## URL 
- http://localhost:4200/

