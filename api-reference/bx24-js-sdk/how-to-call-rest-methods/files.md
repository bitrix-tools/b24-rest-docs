# Обработать файлы

Методы REST-сервиса получают файлы в виде строки, закодированной в `base64`. Также можно отправить обычный массив, первым элементом которого будет имя файла, вторым — содержимое в `base64`.

В случае полностью клиентского приложения можно либо воспользоваться объектом [FileReader](http://www.w3.org/TR/FileAPI/), либо просто отдать в качестве значения поля запроса ссылку на элемент формы типа «файл» (`<input type="file">`).

## Пример

```html
<input type="file" id="testfile"><br />
<span onclick="sendInputFile()">send file from inputsend static file</span>
<script>
function sendInputFile() {
    BX24.init(() => {
    
        BX24.callMethod('entity.item.add', {
            'ENTITY': 'menu',
            'NAME': Math.random(),
            'DETAIL_PICTURE': document.getElementById('testfile')
        }, function(){
            alert('Finished!');
        });
    });
}
/*
POST https://my.bitrix24.com/rest/entity.item.add.json HTTP/1.1
Host: my.bitrix24.com
Content-Length: 186
Content-Type: text/plain; charset=UTF-8
auth=6a8c365cb010ba42bd5b0f6ae803f47c&ENTITY=menu&NAME=0.2630483947652045&DETAIL_PICTURE[0]=1.gif&DETAIL_PICTURE[1]=R0lGODlhAQABAIAAAP%2F%2F%2FwAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D
*/
function sendStaticFile()  {
    BX24.init(() => {
    
        BX24.callMethod('entity.item.add', {
            'ENTITY': 'menu',
            'NAME': '1.gif',
            'DETAIL_PICTURE': ['1.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==']
        }, function(){
            alert('Finished!');
        });
    });
 }
/*
POST https://my.bitrix24.com/rest/entity.item.add.json HTTP/1.1
Host: my.bitrix24.com
Content-Length: 173
Content-Type: text/plain; charset=UTF-8
auth=6a8c365cb010ba42bd5b0f6ae803f47c&ENTITY=menu&NAME=1.gif&DETAIL_PICTURE[0]=1.gif&DETAIL_PICTURE[1]=R0lGODlhAQABAIAAAP%2F%2F%2FwAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D
*/
</script>
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Для методов [CRM](../../crm/index.md) при добавлении картинки для товара вместо

```php
'DETAIL_PICTURE': ['1.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==']
```

используйте

```php
"PREVIEW_PICTURE": {"fileData": ["1.gif", "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="]}
```

Такая особенность вызвана тем, что в CRM поддерживается удаление файлов.

Для удаления картинки из поля, нужно вначале получить `ID` файла картинки в поле `PHOTO` методом [crm.contact.get](../../crm/contacts/crm-contact-get.md) и после передать его с параметром `remove` в метод [crm.contact.update](../../crm/contacts/crm-contact-update.md). Как пример, в контакте 308 удаляем фото с идентификатором 11062 (`REGISTER_SONET_EVENT` можно не передавать):

```js
BX24.init(() => {
    BX24.callMethod(
        "crm.contact.update",
        {
            id: 308,
            fields:
            {
                "PHOTO": {id: 11062, remove: 'Y'}
            },
            params: { "REGISTER_SONET_EVENT": "Y" }        
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.info(result.data());                
            }
        }
    );
});
```

## Продолжите изучение

- [{#T}](./bx24-call-bind.md)
- [{#T}](./bx24-call-unbind.md)
- [{#T}](./bx24-call-method.md)
- [{#T}](./bx24-call-batch.md)