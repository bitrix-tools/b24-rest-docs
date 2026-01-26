# Обновить действие bizproc.activity.update

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет действие бизнес-процессов, добавленное приложением.

Работает только в контексте [приложения](../../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание**||
|| **CODE***
[`string`](../../data-types.md) | Внутренний идентификатор действия ||
|| **FIELDS***
[`object`](../../data-types.md) | Объект с [полями](#parametr-fields) действия бизнес-процесса ||
|#

### Параметр FIELDS {#parametr-fields}

#|
|| **Название**
`тип` | **Описание**||
|| **HANDLER***
[`string`](../../data-types.md) | URL, на который действие будет отправлять данные через сервер очередей bitrix24.

В ссылке должен быть тот же домен, на котором установлено приложение  ||
|| **AUTH_USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, токен которого будет передан приложению ||
|| **USE_SUBSCRIPTION**
[`boolean`](../../data-types.md) | Должно ли действие ожидать ответа от приложения. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **NAME***
[`string` \| `object`](../../data-types.md) | Название действия.

Может быть строкой или ассоциативным массивом локализированных строк вида:

```js
'NAME': {
    'ru': 'название действия',
    'en': 'action name',
    ...
},
```

||
|| **DESCRIPTION**
[`string` \| `object`](../../data-types.md) | Описание действия.

Может быть строкой или ассоциативным массивом локализированных строк вида:

```js
'DESCRIPTION': {
    'ru': 'описание действия',
    'en': 'action description',
    ...
},
```
 ||
|| **PROPERTIES**
[`object`](../../data-types.md) | Объект с параметрами действия. Содержит объекты, каждый из которых описывает [параметр действия](#property).

Системное название параметра должно начинаться с буквы и может содержать символы `a-z`, `A-Z`, `0-9` и нижнее подчеркивание `_` ||
|| **RETURN_PROPERTIES**
[`object`](../../data-types.md) | Объект с дополнительными результатами действия. Содержит объекты, каждый из которых описывает [параметр действия](#property).

Параметр управляет возможностью действия ожидать ответа приложения и работать с данными, которые [придут в ответе](../bizproc-robot/bizproc-event-send.md).

Системное название параметра должно начинаться с буквы и может содержать символы `a-z`, `A-Z`, `0-9` и нижнее подчеркивание `_`
||
|| **DOCUMENT_TYPE**
[`array`](../../data-types.md) | Тип документа, который будет определять типы данных для параметров `PROPERTIES` и `RETURN_PROPERTIES`. Состоит из трех элементов типа строка: 
- идентификатор модуля
- идентификатор объекта
- тип документа

Возможные варианты значений:

- Модуль CRM
    `['crm', 'CCrmDocumentLead', 'LEAD']` — лиды
    `['crm', 'CCrmDocumentContact', 'CONTACT']` — контакты
    `['crm', 'CCrmDocumentCompany', 'COMPANY']` — компании
    `['crm', 'CCrmDocumentDeal', 'DEAL']` — сделки
    `['crm', 'Bitrix\Crm\Integration\BizProc\Document\Quote', 'QUOTE']` — коммерческие предложения
    `['crm', 'Bitrix\Crm\Integration\BizProc\Document\SmartInvoice', 'SMART_INVOICE']` — счета
    `['crm', 'Bitrix\Crm\Integration\BizProc\Document\Dynamic', 'DYNAMIC_XXX']` — смарт-процессы, где XXX — идентификатор смарт-процесса

- Модуль Списки
    `['lists', 'BizprocDocument', 'iblock_XXX']` — процессы в ленте новостей, где XXX — идентификатор информационного блока
    `['lists', 'Bitrix\Lists\BizprocDocumentLists', 'iblock_XXX']` — списки в группах, где XXX — идентификатор информационного блока

- Модуль Диск
    `['disk', 'Bitrix\Disk\BizProcDocument', 'STORAGE_XXX']`, где XXX — идентификатор хранилища

||
|| **FILTER**
[`object`](../../data-types.md) | Объект с правилами ограничения действия по типу документа и редакции.

Может содержать ключи:
- `INCLUDE` — массив правил, где действие будет отображено
- `EXCLUDE` — массив правил, где действие будет скрыто

Каждое правило в массиве может быть строкой или массивом типа документа в полном или частичном варианте.

Чтобы ограничить действие по редакции Битрикс24 укажите:
- `b24` — для облака
- `box` — для коробки

Примеры:
1. Исключить действие для коробочного Битрикс24
    ```js
    FILTER: {
        EXCLUDE: [ 'box' ]
    }
    ```
2. Отображать действие только для модуля Списки
    ```js
    FILTER: {
        INCLUDE: [
            ['lists']
        ]
    }
    ```
3. Отображать действие только для модуля Списки и сделок из CRM
    ```js
    FILTER: {
        INCLUDE: [
            ['lists'],
            ['crm', 'CCrmDocumentDeal']
        ]
    }
    ```
||
|| **USE_PLACEMENT**
[`boolean`](../../data-types.md) | Дает возможность открывать дополнительные настройки действия в слайдере приложения. Возможные значения:
- `Y` — да
- `N` — нет  ||
|| **PLACEMENT_HANDLER***
[`string`](../../data-types.md) | URL обработчика встройки на стороне приложения. Обязательное, если `USE_PLACEMENT = 'Y'` ||
|#

### Объект PROPERTY {#property}

#|
|| **Название**
`тип` | **Описание**||
|| **Name**
[`string` \| `object`](../../data-types.md) | Наименование параметра ||
|| **Description**
[`string` \| `object`](../../data-types.md) | Описание параметра ||
|| **Type**
[`string`](../../data-types.md) | Тип параметра. Базовые значения: 
  - `bool` — да или нет
  - `date` — дата
  - `datetime` — дата и время
  - `double` — число
  - `int` — целое число 
  - `select` — список
  - `string` — строка
  - `text` — текст
  - `user` — пользователь  ||
|| **Options**
[`array`](../../data-types.md) | Массив значений параметра типа список `'TYPE': select'` вида:

```js
[
    'value1': 'title1',
    'value2': 'title2',
    'value3': 'title3',
    'value4': 'title4'
]
```
||
|| **Required**
[`boolean`](../../data-types.md) | Обязательность параметра. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **Multiple**
[`boolean`](../../data-types.md) | Множественность параметра. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **Default**
[`any`](../../data-types.md) | Значение параметра по умолчанию ||
|#

#### Примеры объектов

```js
// пример для типа select
'docType': {
    'Name': {
        'ru': 'Тип документа',
        'en': 'Document type'
    },
    'Required': 'Y',
    'Multiple': 'N',
    'Default': 'PDF',
    'Type': 'select',
    'Options': {
        'pdf': 'PDF',
        'docx': 'DOCX'
    }
}

// пример для типа bool
'saveDoc': {
    'Name': {
        'ru': 'Сохранить документ',
        'en': 'Save document'
    },
    'Description': {
        'ru': 'Присвоить порядковый номер',
        'en': 'Assign a sequential number'
    },
    'Type': 'bool',
    'Required': 'Y',
    'Multiple': 'N',
    'Default': 'Y'
}

// пример для типа string
'Parameters': {
    'Name': {
        'ru': 'Параметры шаблона',
        'en': 'Template\'s parameters'
    },
    'Description': {
        'ru': 'ParamID={=ParamValue}',
        'en': 'ParamID={=ParamValue}'
    },
    'Type': 'string',
    'Required': 'N',
    'Multiple': 'Y'
}
```

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"action_test_code","FIELDS":{"AUTH_USER_ID":1,"USE_SUBSCRIPTION":"N","FILTER":{"INCLUDE":[["lists"],["crm","CCrmDocumentDeal"]]}}, "auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.activity.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'bizproc.activity.update',
    		{
    			'CODE': 'action_test_code',
    			'FIELDS': {
    				'AUTH_USER_ID': 1,
    				'USE_SUBSCRIPTION': 'N',
    				'FILTER': {
    					'INCLUDE': [
    						['lists'],
    						['crm', 'CCrmDocumentDeal']
    					]
    				}
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	alert("Успешно: " + result);
    }
    catch( error )
    {
    	alert("Error: " + error);
    }
    ```

- PHP

    ```php
    try {
        $result = $serviceBuilder
            ->getBizProcScope()
            ->activity()
            ->update(
                'activity_code',
                'https://example.com/handler',
                1,
                ['en' => 'Activity Name', 'ru' => 'Название Активности'],
                ['en' => 'Activity Description', 'ru' => 'Описание Активности'],
                true,
                ['param1' => 'value1'],
                false,
                ['returnParam1' => 'value1'],
                null,
                null
            );

        if ($result->isSuccess()) {
            print($result->getCoreResponse()->getResponseData()->getResult()[0]);
        } else {
            print('Update failed.');
        }
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.activity.update',
        {
            'CODE': 'action_test_code',
            'FIELDS': {
                'AUTH_USER_ID': 1,
                'USE_SUBSCRIPTION': 'N',
                'FILTER': {
                    'INCLUDE': [
                        ['lists'],
                        ['crm', 'CCrmDocumentDeal']
                    ]
                }
            },
        },
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Успешно: " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.activity.update',
        [
            'CODE' => 'action_test_code',
            'FIELDS' => [
                'AUTH_USER_ID' => 1,
                'USE_SUBSCRIPTION' => 'N',
                'FILTER' => [
                    'INCLUDE' => [
                        ['lists'],
                        ['crm', 'CCrmDocumentDeal']
                    ]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1738149954.2918739,
        "finish": 1738149954.4590819,
        "duration": 0.16720795631408691,
        "processing": 0.017282962799072266,
        "date_start": "2025-01-29T14:25:54+03:00",
        "date_finish": "2025-01-29T14:25:54+03:00",
        "operating_reset_at": 1738150554,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если действие успешно обновлено ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ACTIVITY_VALIDATION_FAILURE",
    "error_description": "Wrong properties array!"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| `ACCESS_DENIED` | Application context required | Необходим контекст приложения ||
|| `ACCESS_DENIED` | Access denied! | Метод выполнил не администратор ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE` | Empty activity code! | Не указан код действия ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE` | Wrong activity code! | Некорректный код действия ||
|| `ERROR_ACTIVITY_NOT_FOUND` | Activity or Robot not found! | Действие или робот не найдены ||
|| `ERROR_UNSUPPORTED_PROTOCOL` | Unsupported handler protocol | Некорректный протокол хендлера http, https ||
|| `ERROR_WRONG_HANDLER_URL` | Wrong handler URL | Невалидный урл хендлера ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE` | Wrong properties array! | Некорректно заполнены параметры `PROPERTIES` или `RETURN_PROPERTIES` ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE` | Wrong property key <ключ>! | Некорректный идентификатор свойства ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE` | Empty property NAME <ключ>! | Не указано название свойства ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE` | Wrong activity FILTER! | Некорректный фильтр ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE` | Wrong activity DOCUMENT_TYPE! | Некорректный `DOCUMENT_TYPE` ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE` | No fields to update | Нет полей для обновления ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-activity-add.md)
- [{#T}](./bizproc-activity-list.md)
- [{#T}](./bizproc-activity-delete.md)
- [{#T}](./bizproc-activity-log.md)
