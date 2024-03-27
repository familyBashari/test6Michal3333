import multer from 'multer';

const storage=multer.diskStorage({
    destination: (req,file,cb)=> (
        cb(null,'uploads/')//תכונה זו מציינת את התיקייה שבה הקבצים ישמרו כאשר הם מועלים
    ),
    filename:(req,file,cb) => (
        cb(null,`${Date.now()}-${file.originalname}`)// תכונה זו מציינת את שם הקובץ שמתווסף בתיקיית היעד
    )
})

const upload=multer({
    storage,
    limits:{
        fileSize:1024*1024*2//עד 2 מגה בית
    }
});

export default  upload;