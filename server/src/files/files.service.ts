import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
    async createFile(file): Promise<string>{
        try{
            const fileName = uuid.v4()+'.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath)){//если по этому пути ничего не существует то создаём папку
                fs.mkdirSync(filePath,{recursive:true});//если какой-то папки не будет, то она создастся            
                }   
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        }
        catch(e){
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteFile(fileName: string): Promise<void> {
        try {
            const filePath = path.resolve(__dirname, '..', 'static', fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);  // Удаляем файл
            } else {
                throw new HttpException('Файл не найден', HttpStatus.NOT_FOUND);
            }
        } catch (e) {
            throw new HttpException('Произошла ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}