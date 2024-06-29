/* INSTALL */

Required Node verson: 18.16.1 (x64)


1) clone the project from git: https://github.com/pkthong12/gym-fe-2024.git

2) Running Development with HTTPS:
    Generating an SSL Certificate:
    You need a package manager to install mkcert. For Windows, use chocolatey (PowerShell)

        Install mkcert: run this command in PowerShell:
            choco install mkcert

        Create a locally trusted CA with:
            mkcert -install

        In the root folder of the project, generate an SSL certificate with:
            mkcert localhost

3) from root folder of the project, run:
    yarn

4) from root folder of the project, run:
    yarn start

6) Mapping Api endpoint
    Comment/uncomment app.config.ts

    baseUrl: string = 'https://localhost:44360'; // is for development
    //baseUrl: string = 'http://gymbackend-001-site1.dtempurl.com'; // is for production testing

/* BUILD */
    Development: ng build
    Production: ng build --configuration production
