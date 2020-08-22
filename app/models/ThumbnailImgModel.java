package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import io.ebean.Ebean;
import io.ebean.Finder;
import io.ebean.Model;
import io.ebean.SqlUpdate;
import io.ebean.annotation.NotNull;

@Entity
@Table(name = "t_thumbnail_img")
public class ThumbnailImgModel extends Model{

	@Id
	@Column(name = "thumbnail_id")
	private int thumbnailId;

	@Column(name = "thumbnail_img")
	@NotNull
	@Lob
	private byte[] thumbnailImg;

	public int getThumbnailId() {
		return thumbnailId;
	}

	public void setThumbnailId(int thumbnailId) {
		this.thumbnailId = thumbnailId;
	}

	public byte[] getThumbnailImg() {
		return thumbnailImg;
	}

	public void setThumbnailImg(byte[] thumbnailImg) {
		this.thumbnailImg = thumbnailImg;
	}

	public static Finder<Long,ThumbnailImgModel> find = new Finder<Long,ThumbnailImgModel>(ThumbnailImgModel.class);

	public ThumbnailImgModel selectByPrimaryKey(int thumbnailId){
	   	return find.byId((long)thumbnailId);
	}

	public int selectMaxThumbnailId(){
		Integer maxThumbnailId = find.query().select("max(thumbnail_id)::Integer").findSingleAttribute();
		if (maxThumbnailId == null) {
			return 0;
		}
	   	return maxThumbnailId.intValue();
	}

	public void deleteByThumbnailId (int thumbnailId) {
		SqlUpdate del = Ebean.createSqlUpdate("delete from t_thumbnail_img where thumbnail_id = :thumbnail_id");
		del.setParameter("thumbnail_id", thumbnailId);
		del.execute();
	}
}
