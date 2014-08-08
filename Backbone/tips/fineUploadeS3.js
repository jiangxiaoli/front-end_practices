//include file in cms.html
// <script src="vender/all.fineuploader.min.js"></script>


function video_upload_s3(titleId, titleCategory, templateId, videoList) {

    //alert("in file uploader");
    $('#fineuploader-S3').fineUploaderS3({
        request: {
            // REQUIRED: We are using a custom domain
            // for our S3 bucket, in this case.  You can
            // use any valid URL that points to your bucket.
            endpoint: "https://rstudio.s3.amazonaws.com",

            // REQUIRED: The AWS public key for the client-side user
            // we provisioned.
            accessKey: "xxxxxxxxx"
        },

        template:templateId ,

        // REQUIRED: Path to our local server where requests
        // can be signed.
        signature: {
            endpoint: "http://localhost:8080/rstudio/upload/s3/signature"
        },

        // OPTIONAL: An endopint for Fine Uploader to POST to
        // after the file has been successfully uploaded.
        // Server-side, we can declare this upload a failure
        // if something is wrong with the file.
        uploadSuccess: {
            endpoint: "http://localhost:8080/rstudio/upload/s3/success"
        },

        objectProperties : {
            key : function(fileId) {
                var keyRetrieval = new qq.Promise();
                var filename = $('#fineuploader-S3')
                    .fineUploader("getName", fileId);

                var pos = filename.lastIndexOf(".");
                var suffix = filename.substring(pos,
                    filename.length);
                var file = "original" + suffix;
                var uuid = $('#fineuploader-S3').fineUploader(
                    "getUuid", fileId);
                keyRetrieval = uuid + "/" + "video" + "/"
                    + file;
                return keyRetrieval;
            }
        },

        // USUALLY REQUIRED: Blank file on the same domain
        // as this page, for IE9 and older support.
        iframeSupport: {
            localBlankPagePath: "/success.html"
        },

        // optional feature
        chunking: {
            enabled: true,
            partSize : 16000000
        },

        // optional feature
        resume: {
            enabled: true
        },

        // optional feature
        deleteFile: {
            enabled: false,
            method: "POST",
            endpoint: "/s3demo.php"
        },

        // optional feature
        validation: {
            itemLimit: 1000,
            sizeLimit: 200000000000000
        },

        thumbnails: {
            placeholders: {
                notAvailablePath: "css/vendor/not_available-generic.png",
                waitingPath: "css/vendor/waiting-generic.png"
            }
        }
    })
        // Enable the "view" link in the UI that allows the file to be downloaded/viewed
        .on('complete', function(event, id, name, response) {

            var uuid = $(this).fineUploader("getUuid", id);
            console.log("id:" + id + ",name:" + name, ",uuid:"+uuid);

            var $fileEl = $(this).fineUploaderS3("getItemByFileId", id),
                $viewBtn = $fileEl.find(".view-btn");

            $fileEl.find("#video_uuid").attr("value", uuid);
            $fileEl.find("#video_titleId").attr("value", titleId);

            //view is not working
            if (response.success) {
                $viewBtn.show();
                $viewBtn.attr("href", response.tempLink);
                console.log("in success, view link:"+response.tempLink);
            }

            //save meta data
            $fileEl.find("#save_video_meta").click(function (e) {
                e.preventDefault();

                //could has something wrong here
                if($fileEl.find("#video_episode").val() != ""){
                    alert("Plese input video name.");
                    return;
                }

                console.log("in save_video_meta");

                var oldUrl = "/rstudio/upload/save/seriesmetadata";

                //set the input of videoType
                if(titleCategory == "MOVIE"){
                    $fileEl.find("#videoType").attr("value","电影");
                }

                switch(titleCategory){
                    case "MOVIE":
                        $fileEl.find("#videoType").attr("value","电影");
                        break;
                    case "SHOW":
                        $fileEl.find("#videoType").attr("value","综艺");
                        var date = $fileEl.find("#video_episode").val();
                        console.log("date: "+ date);

                        break;
                    case "CLIP":
                        $fileEl.find("#videoType").attr("value","短片");
                        break;
                    default: break;
                }

                $fileEl.find('#video_meta_form').ajaxSubmit({
                    url:oldUrl,
                    beforeSubmit: function (attr) {
                        console.log("attr: "+ JSON.stringify(attr));
                    },
                    success: function (response) {
                        //var videoId = JSON.stringify(response);
                        //response = videoId
                        console.log("in success: " + response);

                        //fetch video from videoId
                        var video = new app.Video();
                        video.url="/rstudio/api/titles/videos/"+response;
                        video.fetch().done(function (data) {
                            console.log("in video fetch done, data:"+data);

                            //add new video to videoList
                            console.log("videoList length before: " + videoList.length);
                            videoList.add(video);
                            console.log("videoList length after: " + videoList.length);

                            $("#video_count").html(videoList.length);

                            alert("save video succeed!!");
                            $fileEl.hide();
                            //window.location.replace("/rstudio/cms.html#titles/"+titleId);
                        });

                    },
                    error: function () {
                        console.log("in error");
                    }
                });

            });

        });

}


/* html template - with form 


<!-- Fine Uploader DOM Element
====================================================================== -->
<div id="fineuploader-S3"></div>


<!-- Fine Uploader template : show
====================================================================== -->
<script type="text/template" id="simple-previews-template-show">
    <div class="qq-uploader-selector qq-uploader">
        <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
            <span>Drop files here to upload</span>
        </div>
        <div class="qq-upload-button-selector qq-upload-button">
            <div>Upload files</div>
        </div>
        <span class="qq-drop-processing-selector qq-drop-processing">
          <span>Processing dropped files...</span>
          <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
        </span>

        <!-- uploader list -->
        <ul class="qq-upload-list-selector qq-upload-list">
            <li class="uploader_list_li">
                <div class="qq-progress-bar-container-selector">
                    <div class="qq-progress-bar-selector qq-progress-bar"></div>
                </div>
                <span class="qq-upload-spinner-selector qq-upload-spinner"></span>
                <img class="qq-thumbnail-selector" qq-max-size="100" qq-server-scale>


                <!-- metadata form show -->
                <form id="video_meta_form" class="form-horizontal" method="post" action=""  enctype="multipart/form-data">
                    <input id="video_titleId" type="hidden" name="titleId" required/>
                    <input type="hidden" name="taskType" value="系列剧" required/>
                    <input id="videoType" type="hidden" name="videoType" value="电视剧" required/>

                    <div class="form-group" style="margin: 10px">
                        <label for="video_episode" class="control-label"> 视频日期:</label>
                        <input id="video_episode" type="date" name="episode" style="width: 150px; color: #000000" required>
                    </div>

                    <input id="video_uuid" type="hidden" name="videoId" required/>

                    <br/>

                    <!--<div class="form-group">
                        <label for="video_uuid" class="control-label">VideoId:</label>
                        <input id="video_uuid" name="videoId" type="text" class="form-control" placeholder="uuid" required>
                    </div>-->

                    <button id="save_video_meta" class="btn btn-primary">Save Video</button>
                </form>

                <a class="view-btn btn-small btn-info hide" target="_blank">View</a>
            </li>
        </ul>

    </div>
</script>


*/
