const http = require("http");
const app = http.createServer();
const port = 8000; 
const fs = require("fs");
const path = require("path");
const url = require("url");
const MyMath = require('@lir0sis/math')

const errorCatcher = (func, ...args) => {
    try {
        return func(...args)
    }
    catch(err) {
        return null
    }
}

const readDir = (dir, tCount = 0) => {
    let path_arr = dir.split('/')
    let str = '  '.repeat(tCount) + path_arr[path_arr.length - 1] + '/\n'

    fs.readdirSync(dir + '/').forEach((f) => {
        const value = errorCatcher(readDir, dir + '/' + f, tCount + 1)

        if(value == null) {
            str += '  '.repeat(tCount + 1) + f + '\n'
        }
        else {
            str+= value
        }
    })
    return str
    
}

const getDirectory = (dir) => {
    const value = errorCatcher(readDir, dir)
    if (value == null)
        return './'
    else
        return value
    
}

app.listen(port, () => {
    
    console.log(`Слушаем порт: ${port}`);
});

app.on("request", (request, response) => {
    switch (request.method) {
        case "GET": {
            switch (url.parse(request.url).pathname) {
                case "/users":
                    response.writeHead(200).end("GET. Список пользователей");
                    break;
                case "/employees":
                    response.writeHead(200).end("GET. Список сотрудников");
                    break;
                case "/files":
                    response.writeHead(200).end("<pre>" + getDirectory('.') + "</pre>");
                    break;
                default:
                    fs.readFile(path.join(__dirname, "index.html"), function(error, data) {
                        if (error) console.log(error);
                        response.writeHead(200).end(data);
                    });
            }
            break;              
        }
        case "POST": {
            switch (url.parse(request.url).pathname) {
                case "/users":
                    request.on("data", function (data) {
                       response.end("Вы ввели: " + data.toString().toUpperCase());
                    });
                    break;
                case "/employees":
                    response.writeHead(200).end("POST. Список сотрудников");
                    break;
                case "/task":
                    request.on("data", function (data) {
                        let str_data = data.toString();
                        let result = ''
                        let matches = str_data.match(/((\d+, ?)+\d+)|(\d+)/g)
                        if (matches != null && matches[0] == str_data) {
                            let str_array = /, ?/i[Symbol.split](str_data)
                            result = "Результат: " + MyMath.summ(str_array.map(parseFloat))
                        }
                        else 
                            result = "Неправильні дані"
                        response.end(result);
                     });
                    break;
                default:
                    response.writeHead(200).end("POST. Работает хорошо");
            }
            break;
        
        }
        case "PUT": {
            response.writeHead(202).end("PUT. Объект изменён");
            break;
        }
        case "DELETE": {
            response.writeHead(203).end("DELETE. Объект удалён");
            break;
        }
        default: {
            response.writeHead(404).end("Не найдено");
        }
    }
});
