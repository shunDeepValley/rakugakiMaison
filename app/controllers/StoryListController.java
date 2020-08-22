package controllers;

import java.util.ArrayList;
import java.util.List;

import models.CategoryModel;
import models.StoryDispModel;
import models.StoryListModel;
import models.StoryModel;
import models.TitleModel;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class StoryListController extends Controller {

    public Result draw() {
        return ok(views.html.storyList.render());
    }

    public Result init() {
	   	StoryListModel model = new StoryListModel();
		List<CategoryModel> categoryList = new CategoryModel().selectAll();
		List<TitleModel> titleList = new TitleModel().selectAll();
		List<StoryModel> orgStoryList = new StoryModel().selectAll();

		List<StoryDispModel> storyList = new ArrayList<StoryDispModel>();
		for (StoryModel storyModel : orgStoryList) {
			StoryDispModel dispModel = new StoryDispModel();
			dispModel.setStoryId(storyModel.getStoryId());
			dispModel.setStoryUpdDate(storyModel.getStoryUpdDate());
			dispModel.setStoryCnt(storyModel.getStoryCnt());
			dispModel.setStoryName(storyModel.getStoryName());
			dispModel.setMainId(storyModel.getMainId());
			dispModel.setThumbnailId(storyModel.getThumbnailId());
			dispModel.setCategoryId(storyModel.getCategoryId());
			dispModel.setTitleId(storyModel.getTitleId());
			dispModel.setCategoryName(
				categoryList.stream()
				.filter(category -> category.getCategoryId() == dispModel.getCategoryId())
				.findFirst()
				.get()
				.getCategoryName()
			);
			dispModel.setTitleName(
				titleList.stream()
				.filter(title -> title.getTitleId() == dispModel.getTitleId())
				.findFirst()
				.get()
				.getTitleName()
			);
			dispModel.setWatchCnt(storyModel.getWatchCnt());
			storyList.add(dispModel);
		}

	   	model.setCategoryList(categoryList);
	   	model.setTitleList(titleList);
	   	model.setStoryList(storyList);
       return ok(Json.toJson(model));
    }
}
