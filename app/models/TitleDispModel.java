package models;

public class TitleDispModel extends TitleModel{
	private long storyCnt;

	private String rowStatus;

	public long getStoryCnt() {
		return storyCnt;
	}

	public void setStoryCnt(long storyCnt) {
		this.storyCnt = storyCnt;
	}

	public String getRowStatus() {
		return rowStatus;
	}

	public void setRowStatus(String rowStatus) {
		this.rowStatus = rowStatus;
	}
}
