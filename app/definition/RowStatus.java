package definition;

public enum RowStatus {
	None("none"),
	Ins("insert"),
	Upd("update"),
	Del("delete");

	private String label;

	RowStatus(String label){
		this.label = label;
	}

	public String getlabel(){
		return this.label;
	}
}
