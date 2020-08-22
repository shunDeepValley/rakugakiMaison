package controllers;

import auth.CommonAuthenticator;
import io.ebean.DB;
import io.ebean.annotation.Transactional;
import models.MngStoryListModel;
import models.StoryModel;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http.Request;
import play.mvc.Result;
import play.mvc.Security.Authenticated;

public class MngStoryListController extends Controller {

	@Authenticated(CommonAuthenticator.class)
    public Result draw() {
        return ok(views.html.mngStoryList.render());
    }

	@Transactional
	public Result delete(Request req) {
		for (StoryModel story : Json.fromJson(req.body().asJson(), MngStoryListModel.class).getStoryList()) {
			story.deleteStoryRelation();
			DB.delete(story);
		}

		return ok();
	}
}
