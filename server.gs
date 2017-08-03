/*
Created by Tran Dinh Khang
*/
var dropbox = "Sandbox"; // Root folder Name, musts be already initialized!

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('forms.html').setTitle("Sandbox Upload Form");
}
function uploadFilesToDrive(base64Data, fileName, user_dir_name, init_user) {

  try
  {

    //    Get root directory
    var folder = DriveApp.getFoldersByName(dropbox).next();
    var user_dirs = folder.getFoldersByName(user_dir_name);
    if (!user_dirs.hasNext() && init_user) {
       var user_dir = folder.createFolder(user_dir_name);
    } else {
       var user_dir = folder.getFoldersByName(user_dir_name).next();

    }

    var splitBase = base64Data.split(','),
        type = splitBase[0].split(';')[0].replace('data:','');

    var byteCharacters = Utilities.base64Decode(splitBase[1]);
    var ss = Utilities.newBlob(byteCharacters, type);
    ss.setName(fileName);


    var file = user_dir.createFile(ss);
    return "OK";
  }
  catch(e){
    if(init_user)
     return e.toString();
    else
    {
    uploadFilesToDrive(base64Data, fileName, user_dir_name, init_user);
    }
  }
}
function get_shared_folders(user_dir_name){
  try{
    var dropbox = "sandbox"; // Root folder Name, musts be already initialized!
    var folder = DriveApp.getFoldersByName(dropbox).next();
    var user_dir = folder.getFoldersByName(user_dir_name).next().setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
    return user_dir.getUrl();
  }catch(e){
     return get_shared_folders(user_dir_name);

  }
}
// Create SANDBOX LOG in "User Root Folder"
function initSpreadSheet(){
var folder = DriveApp.getFoldersByName(dropbox).next();;//gets first folder with the given foldername
var new_ss = SpreadsheetApp.create('SANDBOX LOG')
var copyFile=DriveApp.getFileById(new_ss.getId());
folder.addFile(copyFile);
PropertiesService.getScriptProperties().setProperty('sheet_id', copyFile.getId());
var ss = SpreadsheetApp.openById(copyFile.getId()); // ID of the spread_sheet
var sheet = ss.getActiveSheet();
sheet.appendRow(['Full Name','Code','Email','Link Folder','Time']);
DriveApp.getRootFolder().removeFile(copyFile);  
}


function logSheet(user_name, user_email,user_code, user_time){
 var sheet_id = PropertiesService.getScriptProperties().getProperty('sheet_id');
 var ss = SpreadsheetApp.openById(sheet_id); // ID of the spread_sheet
 var sheet = ss.getActiveSheet();
 var url = get_shared_folders(user_name + ' - ' + user_code + ' - ' + user_email);
 sheet.appendRow([user_name,user_code, user_email, url, user_time]);
}
