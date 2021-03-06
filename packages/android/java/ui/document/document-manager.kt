package ui.document

import android.app.Activity
import android.content.Intent
import core.BaseApp
import core.ImageCompressionTask
import core.MubbleLogger
import org.json.JSONObject
import ui.base.MubbleBaseActivity
import util.FileBase

@Suppress("UNUSED")
class DocumentManager(private val parentActivity: MubbleBaseActivity,
                      private val listener: (JSONObject) -> Unit) : MubbleLogger {

  enum class MIMETYPE constructor(private val types: Array<String>) {

    DOC(arrayOf("application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "application/pdf")), // .doc, .docx, .pdf, .txt
    PPT(arrayOf("application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation")),
    EXCEL(arrayOf("application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")),
    IMG(arrayOf("image/*")),
    ZIP(arrayOf("application/zip"));

    fun getValue(): Array<String> {
      return types
    }
  }

  companion object {

    private const val ERROR_ACT_NOT_FOUND     = "actNotFound"
    private const val ERROR_ACT_RESULT_FAIL   = "actResultFailure"
    private const val ERROR_INTENT_DATA_FAIL  = "intentDataFailure"
    private const val ERROR_IO_EXCEPTION      = "ioException"

    const val SELECT_FILE_REQ_CODE = 8000
  }

  fun isRequestCode(requestCode: Int) = requestCode == SELECT_FILE_REQ_CODE

  fun selectImgOrPdf() {

    val intent = Intent(Intent.ACTION_GET_CONTENT)

    val types = MIMETYPE.IMG.getValue()

    intent.addCategory(Intent.CATEGORY_OPENABLE)
    intent.type = "image/*"
    intent.putExtra(Intent.EXTRA_MIME_TYPES, types)
    intent.flags = Intent.FLAG_GRANT_READ_URI_PERMISSION and Intent.FLAG_GRANT_WRITE_URI_PERMISSION

    parentActivity.startActivityForResult(Intent.createChooser(intent,
        "Select Document"), SELECT_FILE_REQ_CODE)
  }

  fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {

    if (resultCode != Activity.RESULT_OK) {
      respondWithFailure(ERROR_ACT_RESULT_FAIL)
      return
    }

    try {

      val uri       = data!!.data!!
      val mimeType  = BaseApp.instance.contentResolver.getType(uri)

      val bm        = FileBase.getBitmapFromUri(uri)
      val base64    = FileBase.getBase64Data(bm)
      val cmpB64    = ImageCompressionTask().compressImage(base64)!!

      val checksum  = FileBase.getCheckSum(cmpB64)

//      var base64    : String
//      val checksum  : String?
//      val mimeType  : String?
//      val fileSize  : Long?
//
//      mimeType  = BaseApp.instance.contentResolver.getType(uri)
//
//      if (checkMimeType(mimeType, MIME_TYPE.IMG)) { // User selected an Image
//
//        val bm    = FileBase.getBitmapFromUri(uri)
//        base64    = FileBase.getBase64Data(bm)
//        fileSize  = FileBase.getFileSize(uri)
//
//      } else { // User selected PDF
//
//        base64    = FileBase.getBase64Data(uri)
//        fileSize  = FileBase.getFileSize(uri)
//      }
//
//      //base64    = ImageCompressionTask().compressImage(base64)!!
//      checksum  = FileBase.getCheckSum(base64)

      val obj = JSONObject()
      obj.put("base64",   cmpB64)
      obj.put("checksum", checksum)
      obj.put("mimeType", mimeType)

      listener(obj)

    } catch (e: Exception) {
      respondWithFailure(ERROR_IO_EXCEPTION)
    }
  }

  private fun respondWithFailure(errCode: String) {

    val obj = JSONObject()
    obj.put("error", errCode)
    listener(obj)
  }

  private fun checkMimeType(type: String, mime: MIMETYPE): Boolean {

    return if (type.contains("image") && mime === MIMETYPE.IMG) true
    else mime.getValue().contains(type)
  }

}