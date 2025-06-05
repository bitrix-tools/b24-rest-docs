# Загрузить шаблон documentgenerator.template.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `documentgenerator.template.add` добавляет новый шаблон. 

Контент файла (параметр `file`) можно передать двумя способами:
- В POST-запросе закодированным в *base64* (`fields[file]`);
- Без кодировки в *multipart/form-data* (просто `file`);

Т.к. интерфейс должен быть реализован самостоятельно, то настройки видимости (параметр `fields[users]`) нужны только самому приложению. Аналогично индекс сортировки (параметр `fields[sort]`) и активность (параметр `fields[active]`).

Все созданные через этот метод шаблоны привязаны к модулю rest и единственному провайдеру `\Bitrix\DocumentGenerator\DataProvider\Rest`.

#|
|| **Параметр** | **Описание** ||
|| **fields** | Массив полей шаблона. ||
|#

## Параметры fields

#|
|| **Параметр** | **Описание** ||
|| **name**^*^ | Название шаблона. ||
|| **file**^*^ | Контент файла, закодированный в [base64](../../files/how-to-upload-files.md) (обязательное). Как альтернативу, контент файла можно передать в `multipart / form-data`. В этом случае его не надо кодировать в `base64`. ||
|| **code** | Символьный код шаблона. ||
|| **numeratorId**^*^ | Идентификатор нумератора. ||
|| **region**^*^ | Страна. ||
|| **users** | Массив видимости. По умолчанию пусто. ||
|| **active** | Y/N флаг активности. По умолчанию Y. ||
|| **withStamps** | Y/N ставить печати и подписи. По умолчанию N. ||
|| **sort** | Индекс сортировки. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

```php
$data = [
    'fields' => [
        'name' => 'Rest Template',
        'file' => base64_encode(file_get_contents($_SERVER['DOCUMENT_ROOT'].'/upload/rest_template.docx')),
        'numeratorId' => 1,
        'region' => 'ru',
        'users' => ['UA'],
        'providers' => ['Bitrix\\DocumentGenerator\\DataProvider\\Rest'],
    ],
];

$url = $webHookUrl.$prefix.'.template.add/';
```

# Ответ в случае успеха

> 200 OK

Возвращает те же данные, что и при вызове [documentgenerator.template.get()](./document-generator-template-get.md) на новом шаблоне. 

```php
[result] => Array
    (
        [template] => Array
            (
                [id] => 203
                [name] => Rest Template
                [region] => ru
                [code] =>
                [download] => http://mycrm.bitrix24.com/bitrix/services/main/ajax.php?action=documentgenerator.template.download&id=203&ts=1539173306
                [active] => Y
                [moduleId] => rest
                [numeratorId] => 1
                [withStamps] => N
                [providers] => Array
                    (
                        [bitrix\documentgenerator\dataprovider\rest] => bitrix\documentgenerator\dataprovider\rest
                    )

                [users] => Array
                    (
                        [UA] => UA
                    )

                [isDeleted] => N
                [sort] => 500
                [createTime] => 2018-10-10T14:08:26+02:00
                [updateTime] => 2018-10-10T14:08:26+02:00
                [downloadMachine] => http://mycrm.bitrix24.com/rest/1/webhookkey/documentgenerator.template.download/?token=documentgenerator%7CYWN0a // тут длинная ссылка
            )

    )
```

