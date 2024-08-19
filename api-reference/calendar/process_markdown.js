const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Ошибка при чтении файла ${filePath}:`, err);
            return;
        }

        const lines = data.split('\n');

        // Проверяем, находится ли заголовок первого уровня уже в первой строке
        if (lines[0].startsWith('# ')) {
            console.log(`Файл ${filePath} уже имеет заголовок на первой строке. Пропускаем.`);
            return;
        }

        let header = null;
        let headerIndex = -1;
        let hasEmptyLineAfterHeader = false;

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('# ')) {
                header = lines[i];
                headerIndex = i;
                if (i + 1 < lines.length && lines[i + 1].trim() === '') {
                    hasEmptyLineAfterHeader = true;
                }
                break;
            }
        }

        if (header !== null) {
            lines.splice(headerIndex, hasEmptyLineAfterHeader ? 2 : 1);
            if (hasEmptyLineAfterHeader) {
                lines.unshift(header, ''); // Добавляем заголовок и пустую строку
            } else {
                lines.unshift(header); // Добавляем только заголовок
            }
        }

        const newData = lines.join('\n');
        fs.writeFile(filePath, newData, 'utf8', (err) => {
            if (err) {
                console.error(`Ошибка при записи файла ${filePath}:`, err);
            }
        });
    });
}

function processFolder(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(`Ошибка при чтении папки ${folderPath}:`, err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Ошибка при получении информации о файле ${filePath}:`, err);
                    return;
                }

                if (stats.isDirectory()) {
                    processFolder(filePath); // Рекурсивно обрабатываем подпапку
                } else if (path.extname(file) === '.md') {
                    processFile(filePath);
                }
            });
        });
    });
}

const folderPath = process.argv[2];
if (!folderPath) {
    console.error('Пожалуйста, укажите путь к папке.');
    process.exit(1);
}

processFolder(folderPath);
console.log('Обработка завершена.');