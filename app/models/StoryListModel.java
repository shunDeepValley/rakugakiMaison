package models;

import java.util.List;

public class StoryListModel {
	private List<CategoryModel> categoryList;

	private List<TitleModel> titleList;

	private List<StoryDispModel> storyList;

	private List<CategoryModel> getCategoryList() {
		return categoryList;
	}
	public void setCategoryList(List<CategoryModel> categoryList) {
		this.categoryList = categoryList;
	}

	public List<TitleModel> getTitleList() {
		return titleList;
	}
	public void setTitleList(List<TitleModel> titleList) {
		this.titleList = titleList;
	}

	public List<StoryDispModel> getStoryList() {
		return storyList;
	}
	public void setStoryList(List<StoryDispModel> storyList) {
		this.storyList = storyList;
	}
}
