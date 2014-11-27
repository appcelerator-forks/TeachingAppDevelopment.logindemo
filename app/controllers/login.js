var args = arguments[0] || {};
// use require to access the cloud module
var Cloud = require("ti.cloud");

// Facebook setup

var facebook = require("facebook");
facebook.appid = [YOUR FB APP ID HERE];
facebook.permissions = ["public_profile", "email", "user_friends"];

if(facebook.loggedIn){
	$.btnFacebook.title = "Log out of facebook";		
}else{
	$.btnFacebook.title = "Login with Facebook";
}

function doClickFaceBookLogin(e){
	if(facebook.loggedIn){
		facebook.logout();
	}else{
		facebook.authorize();	
	}
}

facebook.addEventListener('login', function(e) {
    if (e.success) {
    	Ti.API.info("login event");
        Ti.App.Properties.setObject("fbuser", e.data);
        $.btnFacebook.title = "Log out of facebook";		
    }
});
facebook.addEventListener('logout', function(e) {
   	Ti.API.info("logout event");
    Ti.App.Properties.removeProperty("fbuser");
    $.btnFacebook.title = "Login with Facebook";
});

function doClickLogin(e){
	Ti.API.info("Login clicked");
	// Log the user in
	Cloud.Users.login({
		login: $.tfUsername.value,
		password: $.tfPassword.value,
		pretty_json: true
	},function(e){
		if(e.success){
			var user = e.users[0];
			Ti.API.info(e);
			Ti.App.Properties.setObject("user",user);
			$.loginwindow.close();
		}else{
			alert("Login Failed\n" + e.message);
		}		
	});
};

function doShowCreate(e){
	$.vLogin.hide();
	$.vCreate.show();
}

function doClickCreate(e){
	// Create a new user
	Cloud.Users.create({
		username: $.tfNewUsername.value,
		email: $.tfNewEmail.value,
		password: $.tfNewPassword1.value,
		password_confirmation: $.tfNewPassword2.value,
		first_name: $.tfNewFirstname.value,
		last_name: $.tfNewLastname.value
	}, function(e){
		if(e.success){
			var user = e.users[0];
			Ti.App.Properties.setObject("user",user);
			$.loginwindow.close();
		}else{
			alert("User Creation Failed\n" + e.message);
		}		
	});
}

function doClickCancelCreate(e){
	$.vLogin.show();
	$.vCreate.hide();
}

function doCloseWindow(e){
	$.loginwindow.fireEvent("return:login", {});
	$.loginwindow.close();
}
