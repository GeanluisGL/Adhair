import multer from "multer"

const save = multer.diskStorage({
    destination:(req, file,cb) => {
        cb( null, './public/uploads')
    }, 
    filename: (req, file, cb) =>{
        if(file !== null){
            const ext = file.originalname.split('.').pop()
            cb(null, Date.now()+'.'+ext)
        }
    }
})

const filtro = (req,file,cb) => {
    if(file && (file.mimetype)=== 'imagejpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else{
        cb(null,false)
    }
}

export const UploadImage = multer({storage:save, fileFilter:filtro})
    
