# Как использовать примеры в документации

В документации в описаниях методов и дополнительных туториалах представлены примеры кода для различных языков программирования. Каждый пример, зачастую, представлен в четырех вариантах: curl запроса с параметрами, JS код с использованием библиотеки BX24.js, PHP код с использованием официального CRest SDK и Python код на базе B24-Python SDK.

## Подключение библиотек и SDK

Для использования примеров необходимо подключить соответствующую библиотеку или SDK в свой код. Ниже приведены инструкции и примеры для каждого из вариантов.

### Curl запросы

В случае использования REST API Битрикс24 через curl никакие библиотеки и SDK не нужны. Вы можете сформировать параметры для вызова любого метода REST. Вам лишь потребуется тщательно следить за правильностью формирования параметров, особенно, если речь идет про параметры, которые принимают в качестве значения массивы или структуры.

Пример выполнения запроса к REST API Bitrix24 через curl с использованием временного access-токена [OAuth 2.0](./api-reference/oauth/):

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{
"fields": {
"title": "New Deal",
"typeId": "SALE",
"stageId": "NEW"
},
auth=YOUR_ACCESS_TOKEN
}' \
https://your-domain.bitrix24.com/rest/crm.deal.add.json
```

Пример выполнения запроса к REST API Bitrix24 через curl с использованием [входящего вебхука](./local-integrations/local-webhooks.md):

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{
"fields": {
"title": "New Deal",
"typeId": "SALE",
"stageId": "NEW"
}
}' \
https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/crm.deal.add.json
```

Вместо _USER_ID_ и _CODE_ подставляются реальные значения из входящего вебхука.

### JavaScript с использованием bx24.js

Примеры с использованием стандартной [библиотеки bx24.js](./api-reference/bx24-js-sdk/index.md) предназначены для использования в рамках [локальных](./local-integrations/local-apps.md) или [тиражных приложений](./market/). Просто воспользоваться ей, подключив бибилиотеку на какой-то внешний сайт или локальную html-страницу, к сожалению, не получится.

Однако, когда вы разберетесь с понятием локального или даже тиражного приложение, использование примеров на JavaScript из документация станет очень простым. Для использования JavaScript примеров необходимо подключить только следующий скрипт:

```html
<script src="//api.bitrix24.com/api/v1/"></script>
```

Пример использования bx24.js:

```js
<script src="//api.bitrix24.com/api/v1/"></script>

<script>
BX24.callMethod(
    "crm.deal.add",
    {
        fields: {
        TITLE: "New Deal",
        TYPE_ID: "SALE",
        STAGE_ID: "NEW"
        }
    },
    function(result) {
        if (result.error()) {
            console.error(result.error());
        } else {
            console.log(result.data());
        }
    }
);
</script>
```

Дополнительную информацию о BX24.js можно найти в разделе [{#T}](./api-reference/bx24-js-sdk/index.md). Учтите, что эта библиотека может использоваться только в рамках приложений, которые открываются во фреймах в пользовательском интерфейсе Битрикс24. Читайте об этом подробнее в разделе про [виджеты](./api-reference/widgets/).

### PHP с использованием CRest SDK

Для использования PHP примеров необходимо установить и подключить CRest SDK. Подробную информацию можно найти в [{#T}](./api-reference/crest-php-sdk/index.md).

Пример использования CRest SDK:

```php
require_once('crest.php'); // подключение CRest PHP SDK

// выполнение запроса к REST API
$result = CRest::call(
    'crm.deal.add',
    [
        'fields' => [
            'TITLE' => 'New Deal',
            'TYPE_ID' => 'SALE',
            'STAGE_ID' => 'NEW'
        ]
    ]
);

// Обработка ответа от Битрикс24
if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    } else {
        print_r($result['result']);
}
```
