import express, { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import multer from 'multer';
import uniqueString from 'unique-string';
import * as child_process from "child_process";


const app = express();
const port = 3000;

// Создание временной директории
const tmpDir = path.join(os.tmpdir(), 'uploads');
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}


const upload = multer({ dest: tmpDir });

// Обработка POST-запроса с multipart формой
app.post('/upload', upload.fields([{ name: 'latex', maxCount: 1 }, { name: 'img', maxCount: 1 }]), (req: Request, res: Response) => {

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const latexFile = files['latex'][0];
  const imgFile = files['img'][0];

  // Создание уникальной директории
  const uniqueDir = path.join(tmpDir, uniqueString());
  fs.mkdirSync(uniqueDir);

  // Перемещение файлов в уникальную директорию
  fs.renameSync(latexFile.path, path.join(uniqueDir, latexFile.originalname));
  fs.renameSync(imgFile.path, path.join(uniqueDir, imgFile.originalname));

  // Spawn a child process to do something with the files
  const child = child_process.spawn("node", ["xelatex", "-jobname=out", latexFile.originalname], {
    cwd: uniqueDir,
    stdio: "inherit",
  });

  child.on("exit", () => {

    const filePath = path.join(uniqueDir, "out.pdf");
    const stream = fs.createReadStream(filePath);

    stream.on("close", () => {
      fs.rmdirSync(uniqueDir, { recursive: true });
    });

    stream.on("open", () => {
      res.setHeader("Content-Type", "application/pdf");
      stream.pipe(res);
    });

    stream.on("error", (err) => {
      res.statusCode = 500;
      res.end(`Error: ${err.message}`);
    });

  });

});



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});