package controllers;

import models.MainImgModel;
import models.ThumbnailImgModel;
import play.mvc.Controller;
import play.mvc.Result;

public class CommonController extends Controller {

    public Result progModal() {
        return ok(views.html.progModal.render());
    }

    public Result updModal() {
        return ok(views.html.updModal.render());
    }

    public Result getThumbnailImg(int thumbnailId) {
    	byte[] thumbnailImg = new ThumbnailImgModel().selectByPrimaryKey(thumbnailId).getThumbnailImg();
       return ok(thumbnailImg).as("image/jpeg");
    }

    public Result getMainImg(int mainId, int mainBranchId) {
    	byte[] mainImg = new MainImgModel().selectByPrimaryKey(mainId, mainBranchId).getMainImg();
       return ok(mainImg).as("image/jpeg");
    }
}
