package controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import auth.CommonAuthenticator;
import definition.RowStatus;
import io.ebean.DB;
import io.ebean.annotation.Transactional;
import models.CategoryDispModel;
import models.CategoryModel;
import models.ManagerModel;
import models.StoryModel;
import models.TitleDispModel;
import models.TitleModel;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http.Request;
import play.mvc.Result;
import play.mvc.Security.Authenticated;

public class ManagerController extends Controller {

	@Authenticated(CommonAuthenticator.class)
	public Result draw() {
        return ok(views.html.manager.render());
    }

	public Result init() {
		ManagerModel model = new ManagerModel();
		List<CategoryDispModel> categoryList = new ArrayList<CategoryDispModel>();
		List<TitleDispModel> titleList = new ArrayList<TitleDispModel>();

		List<CategoryModel> orgCategoryList = new CategoryModel().selectAll();
		List<TitleModel> orgTitleList = new TitleModel().selectAll();
		List<StoryModel> storyList = new StoryModel().selectAll();

		for (CategoryModel categoryModel : orgCategoryList) {
			CategoryDispModel categoryDispModel = new CategoryDispModel();
			categoryDispModel.setCategoryId(categoryModel.getCategoryId());
			categoryDispModel.setCategoryName(categoryModel.getCategoryName());
			categoryDispModel.setStoryCnt(
				storyList.stream()
				.filter(story -> story.getCategoryId() == categoryModel.getCategoryId())
				.count()
			);
			categoryList.add(categoryDispModel);
		}

		for (TitleModel titleModel : orgTitleList) {
			TitleDispModel titleDispModel = new TitleDispModel();
			titleDispModel.setTitleId(titleModel.getTitleId());
			titleDispModel.setTitleName(titleModel.getTitleName());
			titleDispModel.setStoryCnt(
					storyList.stream()
					.filter(story -> story.getTitleId() == titleModel.getTitleId())
					.count()
			);
			titleList.add(titleDispModel);
		}

		model.setCategoryList(categoryList);
		model.setTitleList(titleList);
		return ok(Json.toJson(model));
    }

	@Transactional
	public Result update(Request req) {

		ManagerModel model = Json.fromJson(req.body().asJson(), ManagerModel.class);

		List<CategoryDispModel> categoryInsList = model.getCategoryList().stream()
			.filter(category -> RowStatus.Ins.getlabel().equals(category.getRowStatus()))
			.collect(Collectors.toList());
		List<CategoryDispModel> categoryUpdList = model.getCategoryList().stream()
			.filter(category -> RowStatus.Upd.getlabel().equals(category.getRowStatus()))
			.collect(Collectors.toList());
		List<CategoryDispModel> categoryDelList = model.getCategoryList().stream()
			.filter(category -> RowStatus.Del.getlabel().equals(category.getRowStatus()))
			.collect(Collectors.toList());

		List<TitleDispModel> titleInsList = model.getTitleList().stream()
			.filter(title -> RowStatus.Ins.getlabel().equals(title.getRowStatus()))
			.collect(Collectors.toList());
		List<TitleDispModel> titleUpdList = model.getTitleList().stream()
			.filter(title -> RowStatus.Upd.getlabel().equals(title.getRowStatus()))
			.collect(Collectors.toList());
		List<TitleDispModel> titleDelList = model.getTitleList().stream()
			.filter(title -> RowStatus.Del.getlabel().equals(title.getRowStatus()))
			.collect(Collectors.toList());

		for (CategoryDispModel category : categoryInsList) {
			CategoryModel categoryModel = convDispModelToOrg(category);
			categoryModel.save();
		}
		for (CategoryDispModel category : categoryUpdList) {
			CategoryModel categoryModel = convDispModelToOrg(category);
			categoryModel.update();
		}
		for (CategoryDispModel category : categoryDelList) {
			List<StoryModel> storyList = new StoryModel().selectByCategoryId(category.getCategoryId());
			for (StoryModel story : storyList) {
				story.deleteStoryRelation();
				DB.delete(story);
			}
			DB.delete(convDispModelToOrg(category));
		}

		for (TitleDispModel title : titleInsList) {
			TitleModel titleModel = convDispModelToOrg(title);
			titleModel.save();
		}
		for (TitleDispModel title : titleUpdList) {
			TitleModel titleModel = convDispModelToOrg(title);
			titleModel.update();
		}
		for (TitleDispModel title : titleDelList) {
			List<StoryModel> storyList = new StoryModel().selectitleId(title.getTitleId());
			for (StoryModel story : storyList) {
				story.deleteStoryRelation();
				DB.delete(story);
			}
			DB.delete(convDispModelToOrg(title));
		}
		return ok();
	}

	private CategoryModel convDispModelToOrg(CategoryDispModel category) {
		CategoryModel categoryModel = new CategoryModel();
		categoryModel.setCategoryId(category.getCategoryId());
		categoryModel.setCategoryName(category.getCategoryName());
		return categoryModel;
	}

	private TitleModel convDispModelToOrg(TitleDispModel title) {
		TitleModel titleModel = new TitleModel();
		titleModel.setTitleId(title.getTitleId());
		titleModel.setTitleName(title.getTitleName());
		return titleModel;
	}
}
