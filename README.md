
<h1 id="short-introduction">Short introduction</h1>
<p>Pet project, developed as coursework for 3rd course. Provides service for creating, managing, inviting users and running exams in form of tests.</p>
<h1 id="used-techs">Used Techs</h1>
<ol>
<li>Backend Service is developed by .NET Core 3.1, using following<br>
packages:<br>
1.1. Entity Framework Core<br>
1.2. <a href="https://github.com/jasontaylordev/CleanArchitecture">Clean Architecture Template</a><br>
1.3. JWT Auth<br>
1.4. Swashbuckle<br>
<br></li>
<li>FrontEnd Service is developed with Angular 9 using following core packages (there may be more packages, which is used in some components, but it’s not so important)<br>
2.1 <a href="https://github.com/akveo/nebular">Nebular UI</a><br>
2.2 <a href="https://github.com/ngx-translate/core">ngx-translate</a><br>
<br></li>
<li>Database is driven by SQL Server with model-first approach</li>
<li>Deploy is done using Azure Services with CI/CD integration using Azure DevOps and Azure Portal</li>
</ol>
<h1 id="badges">Badges</h1>
<ol>
<li>FrontEnd:<br>
<a href="https://eva.design"><img src="https://i.imgur.com/oMcxwZ0.png" alt="Eva Design System" height="20px"></a><br>
<a href="https://dev.azure.com/kyrylostakhevych/RemoteExaminationFrontEnd/_build/latest?definitionId=5"><img src="https://dev.azure.com/kyrylostakhevych/RemoteExaminationFrontEnd/_apis/build/status/RemoteExaminationFrontEnd-CI" alt="Build status"></a></li>
<li>BackEnd:<br>
<a href="https://dev.azure.com/kyrylostakhevych/RemoteExaminationBackEnd/_build/latest?definitionId=10"><img src="https://dev.azure.com/kyrylostakhevych/RemoteExaminationBackEnd/_apis/build/status/reservice%20-%20CI" alt="Build status"></a></li>
</ol>
<h1 id="github-project-structure">GitHub project structure</h1>
<p>Project is separated at 2 branches: <strong>master</strong> and <strong>passportless</strong>.</p>
<ul>
<li>Master: most developed branch. It is very likely that by the time you view it it won’t work anymore, as it have trial dependency to <a href="https://github.com/microblink">MICROBLINK API</a>, which is used for passport recognition. Although, you can freely ask for trial keys from MICROBLINK, deploy your own MICROBLINK API container and freely use it for your own needs.</li>
<li>Passportless: branch that doesn’t contain dependency from MICROBLINK API, but also doesn’t contain passport recognition feature integration. It is currently available on Azure Web App:
<ul>
<li><a href="https://reservices.azurewebsites.net">Frontend</a></li>
<li><a href="https://reservice.azurewebsites.net/swagger/index.html">Backend Swashbuckle</a></li>
</ul>
</li>
</ul>
<h1 id="i-want-to-try-it-myself">I want to try it myself</h1>
<p>There is two ways to try it yourself:</p>
<ol>
<li>Azure Web App: For access to Azure Web App you can use links, provided earlier in this readme. <strong>You need credentials for accessing service: Login - <a href="mailto:admin@gmail.com">admin@gmail.com</a>, Password: 1234567890. Note: estimated azure web app availability: until January 2021</strong></li>
<li>Launch Project Locally:<br>
2.1.	Checkout project from github with <code>git clone -b &lt;insert branch name here&gt; https://github.com/EduardHavron/RemoteExaminationService.git</code>;<br>
<br><br>
2.2. Manage Seed Data in <strong>RemoteExamination.API/SeedRoles.cs</strong> and <strong>RemoteExamination.API/SeedUsers.cs</strong>;<br>
<br><br>
2.3. Launch Update-Database from Visual Studio or it’s equivalent;<br>
<br><br>
2.4. Serve .NET Core API with your favorite IDE or from console with <code>dotnet run RemoteExamination.API.dll</code>. Now you can access API with <strong>localhost:5000/swagger/index.html</strong>;<br>
<br><br>
2.5. If you also want to check Angular part you can also serve it with your favorite IDE or using ng: <code>ng serve</code></li>
</ol>
<h1 id="copyrights">Copyrights</h1>
<p>Notice: this is a pet project made for educational purposes. There are some front-end usages that might be used from other projects, including commercial ones. You totally shouldn’t use it for commercial purposes.</p>
<p>All rights to materials presented on this project belong to their rightful owners.</p>

