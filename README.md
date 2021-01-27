
<h1 id="short-introduction">Short introduction</h1>
<p>Pet project, developed as coursework for 3rd course. Provides service for creating, managing, inviting users and running exams in form of tests.</p>
<h1 id="used-techs">Used Techs</h1>
<ol>
<li>Backend Service is developed by .NET Core 3.1, using following<br>
packages:<br>
1.1. Entity Framework Core<br>
1.2. JWT Auth<br>
1.3. Swashbuckle<br>
<br></li>
<li>FrontEnd Service is developed with Angular 9 using following core packages (there may be more packages, which is used in some components, but it’s not so important)<br>
2.1 <a href="https://github.com/akveo/nebular">Nebular UI</a><br>
2.2 <a href="https://github.com/ngx-translate/core">ngx-translate</a><br>
<br></li>
<li>Database is driven by SQL Server with model-first approach</li>
<li>Deploy is done using Azure Services with CI/CD integration using Azure DevOps and Azure Portal</li>
</ol>
<h1 id="i-want-to-try-it-myself">I want to try it myself</h1>
Launch Project Locally:<br>
1.1.	Checkout project from github with <code>git clone -b &lt;insert branch name here&gt; https://github.com/EduardHavron/RemoteExaminationService.git</code>;<br>
<br><br>
1.2. Manage Seed Data in <strong>RemoteExamination.API/SeedRoles.cs</strong> and <strong>RemoteExamination.API/SeedUsers.cs</strong>;<br>
<br><br>
1.3. Launch Update-Database from Visual Studio or it’s equivalent;<br>
<br><br>
1.4. Serve .NET Core API with your favorite IDE or from console with <code>dotnet run RemoteExamination.API.dll</code>. Now you can access API with <strong>localhost:5000/swagger/index.html</strong>;<br>
<br><br>
1.5. If you also want to check Angular part you can also serve it with your favorite IDE or using ng: <code>ng serve</code></li>
<h1 id="copyrights">Copyrights</h1>
<p>Notice: this is a pet project made for educational purposes. There are some front-end usages that might be used from other projects, including commercial ones. You totally shouldn’t use it for commercial purposes.</p>
<p>All rights to materials presented on this project belong to their rightful owners.</p>

