package controllers;

import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;

import auth.CommonAuthenticator;
import models.AuthModel;
import models.LoginModel;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http.Request;
import play.mvc.Result;

public class LoginController extends Controller {

	public Result draw() {
        return ok(views.html.login.render());
    }

    public Result login(Request req) {
    	LoginModel model = Json.fromJson(req.body().asJson(), LoginModel.class);
    	AuthModel auth = new AuthModel();
    	byte[] passwordHash = null;
		try {
			passwordHash = auth.hash(model.getPassword());
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return ok();
		}

		// パスワード登録用
		//auth.setPasswordHash(passwordHash);
		//auth.insert();

		List<AuthModel> authList = auth.selectAll();
		for (AuthModel authModel : authList) {
			if (Arrays.equals(authModel.getPasswordHash(), passwordHash)) {
				return ok("OK").addingToSession(req, CommonAuthenticator.SESSION_KEY, passwordHash.toString());
			}
		}
    	return ok();
    }
}
