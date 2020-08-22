package models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import io.ebean.Finder;
import io.ebean.Model;
import io.ebean.annotation.NotNull;

@Entity
@Table(name = "t_title")
public class TitleModel extends Model {

	@Id
	@Column(name = "title_id")
	private int titleId;

	@Column(name = "title_name")
	@NotNull
	private String titleName;

	public int getTitleId() {
		return titleId;
	}

	public void setTitleId(int titleId) {
		this.titleId = titleId;
	}

	public String getTitleName() {
		return titleName;
	}

	public void setTitleName(String titleName) {
		this.titleName = titleName;
	}

	public static Finder<Long,TitleModel> find = new Finder<Long,TitleModel>(TitleModel.class);

	public TitleModel selectByPrimaryKey(int titleId){
	   	return find.byId((long)titleId);
	}

	public List<TitleModel> selectAll(){
	   	return find.query().findList();
	}
}
