package models;

import java.util.List;

public class MngStoryModel {
	private List<CategoryModel> categoryList;

	private List<TitleModel> titleList;

	private StoryModel story;

	private ThumbnailImgModel thumbnailImg;

	private List<MainImgModel> mainImgList;

	public List<CategoryModel> getCategoryList() {
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
	public StoryModel getStory() {
		return story;
	}
	public void setStory(StoryModel story) {
		this.story = story;
	}
	public ThumbnailImgModel getThumbnailImg() {
		return thumbnailImg;
	}
	public void setThumbnailImg(ThumbnailImgModel thumbnailImg) {
		this.thumbnailImg = thumbnailImg;
	}
	public List<MainImgModel> getMainImgList() {
		return mainImgList;
	}
	public void setMainImgList(List<MainImgModel> mainImgList) {
		this.mainImgList = mainImgList;
	}
}
