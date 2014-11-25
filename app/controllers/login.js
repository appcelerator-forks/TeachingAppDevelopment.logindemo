var args = arguments[0] || {};
// use require to access the cloud module
var Cloud = require("ti.cloud");

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
