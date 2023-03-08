import { uploadToS3 } from "../services/upload.service";

export async function uploadMediaController(req, res) {
    const url = await uploadToS3(req.files.file)
    return res.status(200).json({ url: url })
}