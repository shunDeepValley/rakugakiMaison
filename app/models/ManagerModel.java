package models;

import java.util.List;

public class ManagerModel {
	private List<CategoryDispModel> categoryList;

	private List<TitleDispModel> titleList;

	public List<CategoryDispModel> getCategoryList() {
		return categoryList;
	}

	public void setCategoryList(List<CategoryDispModel> categoryList) {
		this.categoryList = categoryList;
	}

	public List<TitleDispModel> getTitleList() {
		return titleList;
	}

	public void setTitleList(List<TitleDispModel> titleList) {
		this.titleList = titleList;
	}
}
