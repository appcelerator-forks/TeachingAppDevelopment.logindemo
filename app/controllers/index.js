var Cloud = require("ti.cloud");

function setLoginValue(){
	if(Ti.App.Properties.hasProperty("user")){
		$.lblLoginStatus.text = "You are logged in";
		$.btnToggleLogin.title = "Logout";
	}else{
		$.lblLoginStatus.text = "You are not logged in";
		$.btnToggleLogin.title = "Login";
	}
}

function doClickToggleLogin(e){
	if(Ti.App.Properties.hasProperty("user")){
		// if user is logged in, do logout
		Cloud.Users.logout(function(e){
			if(e.success){
				Ti.App.Properties.removeProperty("user");
				setLoginValue();
			}else{
				alert("Logout failed\n" + e.message);
			}
		});
	}else{
		// do login
		var loginwin = Alloy.createController("login").getView();
		loginwin.addEventListener("return:login", function(e){
			setLoginValue();
		});
		loginwin.open();
	}
}; 

setLoginValue();

$.index.open();
