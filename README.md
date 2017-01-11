# Demo an Upload multiple files project with google script.
## Installation
Create a folder named "Sandbox" at root path of your Google Drive
Create a new google app script here [https://script.google.com/](https://script.google.com/)
Create 2 files forms.html and server.gs in Google Script Editor (copy and paste the content of 2 similar files in this repo)
### Grant your permission for Google Script:
Open file server.gs
Go to:
Run and choose doGet.
Run and choose get_shared_folders.
Run and choose initSpreadSheet.
### Deploy
Go to Publish choose Deploy as Web App.
In "Execute Script As" choose "Me".
In "Who has accept to the app" choose "Anyone, even Anonymous"
## Usage:
Just fill the form and select multiple files
After uploading files, system will return a link, go to that link then check
Check spreadsheet "SANDBOX LOG" in the "sanbox" folder
## Please do not edit credentials information when using this demo project.
