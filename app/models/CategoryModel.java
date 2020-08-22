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
@Table(name = "t_category")
public class CategoryModel extends Model{

	@Id
	@Column(name = "category_id")
	private int categoryId;

	@Column(name = "category_name")
	@NotNull
	private String categoryName;

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public static Finder<Long,CategoryModel> find = new Finder<Long,CategoryModel>(CategoryModel.class);

	public CategoryModel selectByPrimaryKey(int categoryId){
	   	return find.byId((long)categoryId);
	}

	public List<CategoryModel> selectAll(){
	   	return find.query().findList();
	}

}
