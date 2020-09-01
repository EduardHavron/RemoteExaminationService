# Short introduction

Pet project, developed as coursework for 3rd course. Provides service for creating, managing, inviting users and running exams in form of tests.

# Used Techs

 1. Backend Service is developed by .NET Core 3.1, using following
    packages:
 1.1. Entity Framework Core
 1.2. [Clean Architecture Template](https://github.com/jasontaylordev/CleanArchitecture)
 1.3. JWT Auth
 1.4. Swashbuckle
 <br>
 2. FrontEnd Service is developed with Angular 9 using following core packages (there may be more packages, which is used in some components, but it's not so important)
 2.1 [Nebular UI](https://github.com/akveo/nebular)
 2.2 [ngx-translate](https://github.com/ngx-translate/core)
<br>
3. Database is driven by SQL Server with model-first approach
4. Deploy is done using Azure Services with CI/CD integration using Azure DevOps and Azure Portal
# Badges
 1. FrontEnd:
[<img src="https://i.imgur.com/oMcxwZ0.png" alt="Eva Design System" height="20px" />](https://eva.design)
 [![Build status](https://dev.azure.com/kyrylostakhevych/RemoteExaminationFrontEnd/_apis/build/status/RemoteExaminationFrontEnd-CI)](https://dev.azure.com/kyrylostakhevych/RemoteExaminationFrontEnd/_build/latest?definitionId=5)
 2. BackEnd:
 [![Build status](https://dev.azure.com/kyrylostakhevych/RemoteExaminationBackEnd/_apis/build/status/reservice%20-%20CI)](https://dev.azure.com/kyrylostakhevych/RemoteExaminationBackEnd/_build/latest?definitionId=10)
# GitHub project structure
Project is separated at 2 branches: **master** and **passportless**.
 - Master: most developed branch. It is very likely that by the time you view it it won't work anymore, as it have trial dependency to [MICROBLINK API](https://github.com/microblink), which is used for passport recognition. Although, you can freely ask for trial keys from MICROBLINK, deploy your own MICROBLINK API container and freely use it for your own needs.
 - Passportless: branch that doesn't contain dependency from MICROBLINK API, but also doesn't contain passport recognition feature integration. It is currently available on Azure Web App:
	 - [Frontend](https://reservices.azurewebsites.net)
	 - [Backend Swashbuckle](https://reservice.azurewebsites.net/swagger/index.html)

# I want to try it myself
There is two ways to try it yourself:

 1. Azure Web App: For access to Azure Web App you can use links, provided earlier in this readme. **You need credentials for accessing service: Login - admin@gmail.com, Password: 1234567890.**
 2. Launch Project Locally:
 2.1.	Checkout project from github with `git clone -b <insert branch name here> https://github.com/EduardHavron/RemoteExaminationService.git`;
 <br>
 2.2. Manage Seed Data in **RemoteExamination.API/SeedRoles.cs** and **RemoteExamination.API/SeedUsers.cs**;
 <br>
 2.3. Launch Update-Database from Visual Studio or it's equivalent;
 <br>
 2.4. Serve .NET Core API with your favorite IDE or from console with `dotnet run RemoteExamination.API.dll`. Now you can access API with **localhost:5000/swagger/index.html**;
 <br>
 2.5. If you also want to check Angular part you can also serve it with your favorite IDE or using ng: `ng serve`

# Copyrights
Notice: this is a pet project made for educational purposes. There are some front-end usages that might be used from other projects, including commercial ones. You totally shouldn't use it for commercial purposes.

All rights to materials presented on this project belong to their rightful owners.
