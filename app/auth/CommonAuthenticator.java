package auth;

import java.util.Optional;

import controllers.routes;
import play.mvc.Http.Request;
import play.mvc.Result;
import play.mvc.Security.Authenticator;

public class CommonAuthenticator extends Authenticator {
	public static final String SESSION_KEY = "pwdHash";

	@Override
	public Optional<String> getUsername (Request req) {
		return req.session().get(SESSION_KEY);
	}

	@Override
	public Result onUnauthorized(Request req) {
		return redirect(routes.LoginController.draw());
	}

}
