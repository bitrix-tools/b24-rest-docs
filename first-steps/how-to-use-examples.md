# Как использовать примеры в документации

В документации в описаниях методов и дополнительных туториалах представлены примеры кода для различных языков программирования. Каждый пример, зачастую, представлен в четырех вариантах: curl запроса с параметрами, JS код с использованием библиотеки BX24.js, PHP код с использованием CRest SDK, PHP код с использованием официального B24PhpSdk и JS код с использованием официального B24JsSdk.

## Curl запросы

В случае использования REST API Битрикс24 через curl никакие библиотеки и SDK не нужны. Вы можете сформировать параметры для вызова любого метода REST. Вам лишь потребуется тщательно следить за правильностью формирования параметров, особенно, если речь идет про параметры, которые принимают в качестве значения массивы или структуры.

Пример выполнения запроса к REST API Bitrix24 через curl с использованием временного access-токена [OAuth 2.0](../settings/oauth/index.md):

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

Пример выполнения запроса к REST API Bitrix24 через curl с использованием [входящего вебхука](../local-integrations/local-webhooks.md):

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

## Подключение библиотек и SDK

Для использования примеров необходимо подключить соответствующую библиотеку или SDK в свой код. Ниже приведены инструкции и примеры для каждого из вариантов.

### JavaScript с использованием bx24.js

Примеры с использованием стандартной [библиотеки bx24.js](../sdk/bx24-js-sdk/index.md) предназначены для использования в рамках [локальных](../local-integrations/local-apps.md) или [тиражных приложений](../market/index.md). Просто воспользоваться ей, подключив бибилиотеку на какой-то внешний сайт или локальную html-страницу, к сожалению, не получится.

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

Дополнительную информацию о BX24.js можно найти в разделе [{#T}](../sdk/bx24-js-sdk/index.md). Учтите, что эта библиотека может использоваться только в рамках приложений, которые открываются во фреймах в пользовательском интерфейсе Битрикс24. Читайте об этом подробнее в разделе про [виджеты](../api-reference/widgets/index.md).

### JavaScript с использованием B24JsSDK

В отличие от bx24.js, B24JsSDK может использоваться в любых веб-приложениях, как в качестве front-end, так и в качестве back-end на Node.js.

Это различие требует немного другого подхода к подключению библиотеки. Подробную информацию можно найти в [{#T}](../sdk/b24jssdk/index.md). Сейчас же приведем пример подключения B24JsSDK в качестве браузерной UMD-библиотеки:

```html
<script src="https://unpkg.com/@bitrix24/b24jssdk@latest/dist/umd/index.min.js"></script>
```

После подключения библиотека будет доступна через глобальную переменную `B24Js`. Пример использования B24JsSDK ниже подразумевает, что код используется в рамках приложений, которые открываются во фреймах в пользовательском интерфейсе Битрикс24:

```html
<script src="https://unpkg.com/@bitrix24/b24jssdk@latest/dist/umd/index.min.js"></script>
<script type="module">
try
{
    const $logger = B24Js.LoggerBrowser.build('local-app', true);
    
    const $b24 = await B24Js.initializeB24Frame();
    $b24.setLogger(
        B24Js.LoggerBrowser.build('Core')
    );
    
    $logger.warn('B24Frame.init');
    
    const response = await $b24.callMethod(
        'crm.item.add',
        {
            entityTypeId: B24Js.EnumCrmEntityTypeId.deal,
            fields: {
                title: `New Deal`,
                typeId: 'SALE',
                stageId: 'NEW'
            }
        }
    );
    
    const newDeal = response.getData().result.item;
    
    $logger.info(
        `${B24Js.Text.getDateForLog()} crm.item.add >>`,
        {
            newId: newDeal.id,
            createdTime: B24Js.Text.toDateTime(newDeal.createdTime).toFormat('HH:mm:ss'),
            fields: newDeal
        }
    );
}
catch( error )
{
    console.error(error);
}
</script>
```

Библиотека также поддерживает работу с входящими вебхуками. Однако, в этом случае её следует использовать на back-end в Node.js. Вызывать REST API с помощью входящего вебхука с front-end небезопасно, так как любой пользователь, открывший такое приложение, сможет увидеть вебхук и использовать его для несанкционированного доступа к Битрикс24 с правами пользователя, создавшего вебхук.

### PHP с использованием B24PhpSDK

Для начала использования необходимо установить и подключить B24PhpSDK. Подробную информацию можно найти в [{#T}](../sdk/b24phpsdk/index.md).

Пример использования B24PhpSDK со входящим вебхуком:

```php

declare(strict_types=1);

// Подключение базового класса SDK
use Bitrix24\SDK\Services\ServiceBuilderFactory;

// следите за правильностью пути к autoload.php. он может быть другим, если
// вы используете свою структуру папок 
require_once 'vendor/autoload.php'; 

$B24 = ServiceBuilderFactory::createServiceBuilderFromWebhook(
    '--сюда надо вставить код вашего вебхука--'
);

$result = $B24->getCRMScope()->deal()->add([
    'TITLE' => 'New Deal',
    'TYPE_ID' => 'SALE',
    'STAGE_ID' => 'NEW'
])->getId();
```

### PHP с использованием CRest SDK

Для использования PHP примеров необходимо установить и подключить CRest SDK. Подробную информацию можно найти в [{#T}](../sdk/crest-php-sdk/index.md).

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
