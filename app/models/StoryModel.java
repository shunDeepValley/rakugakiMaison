package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import io.ebean.Ebean;
import io.ebean.Finder;
import io.ebean.Model;
import io.ebean.SqlUpdate;
import io.ebean.annotation.NotNull;

@Entity
@Table(name = "t_story")
public class StoryModel extends Model{

	@Id
	@Column(name = "story_id")
	private int storyId;

	@Column(name = "story_upd_date")
	@NotNull
	private Date storyUpdDate;

	@Column(name = "story_cnt")
	@NotNull
	private int storyCnt;

	@Column(name = "story_name")
	@NotNull
	private String storyName;

	@Column(name = "main_id")
	@NotNull
	private int mainId;

	@Column(name = "thumbnail_id")
	@NotNull
	private int thumbnailId;

	@Column(name = "category_id")
	@NotNull
	private int categoryId;

	@Column(name = "title_id")
	@NotNull
	private int titleId;

	@Column(name = "watch_cnt")
	@NotNull
	private int watchCnt;

	public int getStoryId() {
		return storyId;
	}

	public void setStoryId(int storyId) {
		this.storyId = storyId;
	}

	public Date getStoryUpdDate() {
		return storyUpdDate;
	}

	public void setStoryUpdDate(Date storyUpdDate) {
		this.storyUpdDate = storyUpdDate;
	}

	public int getStoryCnt() {
		return storyCnt;
	}

	public void setStoryCnt(int storyCnt) {
		this.storyCnt = storyCnt;
	}

	public String getStoryName() {
		return storyName;
	}

	public void setStoryName(String storyName) {
		this.storyName = storyName;
	}

	public int getMainId() {
		return mainId;
	}

	public void setMainId(int mainId) {
		this.mainId = mainId;
	}

	public int getThumbnailId() {
		return thumbnailId;
	}

	public void setThumbnailId(int thumbnailId) {
		this.thumbnailId = thumbnailId;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public int getTitleId() {
		return titleId;
	}

	public void setTitleId(int titleId) {
		this.titleId = titleId;
	}

	public int getWatchCnt() {
		return watchCnt;
	}

	public void setWatchCnt(int watchCnt) {
		this.watchCnt = watchCnt;
	}

	public static Finder<Long,StoryModel> find = new Finder<Long,StoryModel>(StoryModel.class);

	public List<StoryModel> selectByCategoryId(int categoryId){
		return find.query().where().eq("category_id", categoryId).findList();
	}

	public List<StoryModel> selectitleId(int titleId){
		return find.query().where().eq("title_id", titleId).findList();
	}

	public StoryModel selectByPrimaryKey(int storyId){
	   	return find.byId((long)storyId);
	}

	public List<StoryModel> selectAll(){
	   	return find.query().findList();
	}

	public void deleteStoryRelation() {
		new ThumbnailImgModel().deleteByThumbnailId(this.getThumbnailId());
		new MainImgModel().deleteByMainId(this.getMainId());
	}

	public void updateWatchCntByMainId (int mainId) {
		SqlUpdate del = Ebean.createSqlUpdate("update t_story set watch_cnt = watch_cnt + 1 where main_id = :main_id");
		del.setParameter("main_id", mainId);
		del.execute();
	}
}
