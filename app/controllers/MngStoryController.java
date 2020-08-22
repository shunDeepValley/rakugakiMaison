package controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import auth.CommonAuthenticator;
import io.ebean.annotation.Transactional;
import models.CategoryModel;
import models.MainImgModel;
import models.MngStoryModel;
import models.StoryModel;
import models.ThumbnailImgModel;
import models.TitleModel;
import play.libs.Files.TemporaryFile;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Http.Request;
import play.mvc.Result;
import play.mvc.Security.Authenticated;

public class MngStoryController extends Controller {

	@Authenticated(CommonAuthenticator.class)
    public Result draw() {
        return ok(views.html.mngStory.render());
    }

    public Result init() {
    	MngStoryModel model = new MngStoryModel();
    	model.setStory(new StoryModel());
    	model.setCategoryList(new CategoryModel().selectAll());
    	model.setTitleList(new TitleModel().selectAll());
    	model.setThumbnailImg(new ThumbnailImgModel());
    	model.setMainImgList(new ArrayList<MainImgModel>());
        return ok(Json.toJson(model));
    }

    public Result initUpd(int storyId) {
    	MngStoryModel model = new MngStoryModel();
    	model.setStory(new StoryModel().selectByPrimaryKey(storyId));
    	model.setCategoryList(new CategoryModel().selectAll());
    	model.setTitleList(new TitleModel().selectAll());
    	model.setThumbnailImg(new ThumbnailImgModel().selectByPrimaryKey(model.getStory().getThumbnailId()));
    	model.setMainImgList(new MainImgModel().selectByMainId(model.getStory().getMainId()));
        return ok(Json.toJson(model));
    }

    @Transactional
    public Result insert(Request req) {

	    Http.MultipartFormData<TemporaryFile> body = req.body().asMultipartFormData();

	    StoryModel prmStory = null;
	    ThumbnailImgModel prmThumbnailImg = new ThumbnailImgModel();;
	    List<MainImgModel> prmMainList = new ArrayList<MainImgModel>();
	    List<byte[]> prmMainImgList = new ArrayList<byte[]>();

	    for (FilePart<TemporaryFile> file : body.getFiles()) {
	    	try {
	    		if ("story".equals(file.getKey())) {
	    			prmStory = Json.fromJson(new ObjectMapper().readTree(file.getRef().path().toFile()), StoryModel.class);
	    		}
	    		if ("thumbnailId".equals(file.getKey())) {
	    			prmThumbnailImg.setThumbnailId(Json.fromJson(new ObjectMapper().readTree(file.getRef().path().toFile()), Integer.class).intValue());
	    		}
	    		if ("thumbnailImg".equals(file.getKey())) {
	    			prmThumbnailImg.setThumbnailImg(Files.readAllBytes(file.getRef().path()));
	    		}
	    		if ("main".equals(file.getKey())) {
	    			prmMainList.add(Json.fromJson(new ObjectMapper().readTree(file.getRef().path().toFile()), MainImgModel.class));
	    		}
	    		if ("mainImg".equals(file.getKey())) {
	    			prmMainImgList.add(Files.readAllBytes(file.getRef().path()));
	    		}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	    int prmMainImgCnt = 0;
	    for (int i = 0; i < prmMainList.size(); i++) {
	    	if (prmMainList.get(i).getFontSize().isEmpty()) {
	    		prmMainList.get(i).setMainImg(prmMainImgList.get(prmMainImgCnt));
	    		prmMainImgCnt++;
	    	}
		}

	    StoryModel story = new StoryModel().selectByPrimaryKey(prmStory.getStoryId());
	    if (story != null) {
		    new MainImgModel().deleteByMainId(prmStory.getMainId());
		    for (MainImgModel mainImg : prmMainList) {
		    	mainImg.setMainId(prmStory.getMainId());
		    	mainImg.insert();
		    }
		    prmThumbnailImg.update();
		    prmStory.update();
		} else {
			int maxMainId = new MainImgModel().selectMaxMainId() + 1;
		    for (MainImgModel mainImg : prmMainList) {
		    	mainImg.setMainId(maxMainId);
		    	mainImg.insert();
		    }
		    prmThumbnailImg.insert();
		    prmStory.setMainId(maxMainId);
		    prmStory.setThumbnailId(new ThumbnailImgModel().selectMaxThumbnailId());
		    prmStory.setStoryCnt(new StoryModel().selectitleId(prmStory.getTitleId()).size() + 1);
		    prmStory.setStoryUpdDate(new Date());
		    prmStory.insert();
		}
	    return ok();
    }
}
