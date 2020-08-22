package controllers;

import java.util.List;

import io.ebean.annotation.Transactional;
import models.MainImgModel;
import models.StoryModel;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class StoryController extends Controller {

    public Result draw() {
        return ok(views.html.story.render());
    }

    @Transactional
    public Result init(int mainId) {
    	new StoryModel().updateWatchCntByMainId(mainId);
    	List<MainImgModel> mainImgList = new MainImgModel().selectByMainId(mainId);
    	return ok(Json.toJson(mainImgList));
    }
}
