package models;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import io.ebean.Finder;
import io.ebean.Model;
import io.ebean.annotation.NotNull;

@Entity
@Table(name = "m_auth")
public class AuthModel extends Model{

	@Id
	@Column(name = "auth_id")
	private int authId;

	@Column(name = "password_hash")
	@NotNull
	private byte[] passwordHash;

	public int getAuthId() {
		return authId;
	}

	public void setAuthId(int authId) {
		this.authId = authId;
	}

	public byte[] getPasswordHash() {
		return passwordHash;
	}

	public void setPasswordHash(byte[] passwordHash) {
		this.passwordHash = passwordHash;
	}

	public static Finder<Long,AuthModel> find = new Finder<Long,AuthModel>(AuthModel.class);

	public AuthModel selectByPrimaryKey(int authId){
	   	return find.byId((long)authId);
	}

	public List<AuthModel> selectAll(){
	   	return find.query().findList();
	}

	public byte[] hash(String password) throws NoSuchAlgorithmException {
		if (password == null) {
			return null;
		}
		return MessageDigest.getInstance("MD5").digest(password.getBytes());
    }
}
