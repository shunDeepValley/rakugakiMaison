package models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;

import io.ebean.Ebean;
import io.ebean.Finder;
import io.ebean.Model;
import io.ebean.SqlUpdate;

@Entity
@Table(name = "t_main_img")
public class MainImgModel extends Model{

	@EmbeddedId
	@Column(name = "main_id")
	private int mainId;

	@EmbeddedId
	@Column(name = "main_branch_id")
	private int mainBranchId;

	@Column(name = "main_img")
	@Lob
	private byte[] mainImg;

	@Column(name = "comment")
	private String comment;

	@Column(name = "font_color")
	private String fontColor;

	@Column(name = "font_size")
	private String fontSize;

	public int getMainId() {
		return mainId;
	}

	public void setMainId(int mainId) {
		this.mainId = mainId;
	}

	public int getMainBranchId() {
		return mainBranchId;
	}

	public void setMainBranchId(int mainBranchId) {
		this.mainBranchId = mainBranchId;
	}

	public byte[] getMainImg() {
		return mainImg;
	}

	public void setMainImg(byte[] mainImg) {
		this.mainImg = mainImg;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getFontColor() {
		return fontColor;
	}

	public void setFontColor(String fontColor) {
		this.fontColor = fontColor;
	}

	public String getFontSize() {
		return fontSize;
	}

	public void setFontSize(String fontSize) {
		this.fontSize = fontSize;
	}

	public static Finder<Long,MainImgModel> find = new Finder<Long,MainImgModel>(MainImgModel.class);

	public MainImgModel selectByPrimaryKey(int mainId, int mainBranchId){
		return find.nativeSql("select * from t_main_img where main_id =" + mainId + " and main_branch_id = " + mainBranchId).findList().get(0);
	}

	public List<MainImgModel> selectByMainId(int mainId){
		return find.nativeSql("select * from t_main_img where main_id =" + mainId).findList();
	}

	public int selectMaxMainId(){
		Integer maxMainId = find.query().select("max(main_id)::Integer").findSingleAttribute();
		if (maxMainId == null) {
			return 0;
		}
	   	return maxMainId.intValue();
	}

	public void deleteByMainId (int mainId) {
		SqlUpdate del = Ebean.createSqlUpdate("delete from t_main_img where main_id = :main_id");
		del.setParameter("main_id", mainId);
		del.execute();
	}
}
