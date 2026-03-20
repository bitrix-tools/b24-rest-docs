# Добавить новый шаблон crm.documentgenerator.template.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" шаблонов генератора документов

Метод `crm.documentgenerator.template.add` добавляет новый шаблон документа.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**^*^
[`object`](../../data-types.md) | Объект с параметрами шаблона [(подробнее)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**^*^
[`string`](../../data-types.md) | Название шаблона ||
|| **file**^*^
[`file`](../../data-types.md#file) | Файл шаблона в формате `["имя_файла.docx", "base64_контент"]`. Можно передать в `base64` или в `multipart/form-data`. Подробнее: [Как загружать файлы](../../../files/how-to-upload-files.md) ||
|| **numeratorId**^*^
[`integer`](../../data-types.md) | Идентификатор нумератора. Список доступных нумераторов можно получить методом [crm.documentgenerator.numerator.list](../numerator/crm-document-generator-numerator-list.md) ||
|| **region**^*^
[`string`](../../data-types.md) | Регион шаблона, например `ru` ||
|| **entityTypeId**^*^
[`array`](../../data-types.md) | Массив идентификаторов CRM-объектов, для которых доступен шаблон.

Типичные значения:
- `1` — лид
- `2` — сделка
- `3` — контакт
- `4` — компания
- `5` — счет (старая версия)
- `7` — коммерческое предложение
- `31` — счет

Для объектов с направлениями добавляется суффикс направления, например:
- `2_category_0` — сделка, направление `0`
- `31_1` — счет, направление `1`

Для смарт-процессов указывается `entityTypeId` типа из [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) или [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md), например:
- `177` — элемент смарт-процесса с `entityTypeId = 177`
- `177_1` — элемент смарт-процесса с направлением `1` ||
|| **users**
[`array`](../../data-types.md) | Массив кодов прав доступа, например `["UA"]`

Поддерживаются коды доступа:
- `UA` — все пользователи
- `U<id>` — пользователь
- `G<id>` — группа пользователей
- `D<id>` — отдел
- `DR<id>` — отдел с подотделами
- `IU<id>` — пользователь интранета
- `SG<id>`, `SG<id>_A`, `SG<id>_E`, `SG<id>_K` — рабочая группа/проект
- `SU<id>`, `SU<id>_M` — пользователь соцсети
- `CHAT<id>` — чат
- `AD`, `AE`, `AT`, `ATD`, `ATE`, `ATT` (и варианты с идентификатором) — роль в структуре
- `SND<id>`, `SNDR<id>`, `SNT<id>`, `SNTR<id>` — структурные коды подразделений и команд

Если параметр не передан или передан пустым, в доступ автоматически добавляется текущий пользователь (`U<id>`) ||
|| **active**
[`char`](../../data-types.md) | Активность шаблона: `Y` или `N`. По умолчанию `Y` ||
|| **withStamps**
[`char`](../../data-types.md) | Подставлять печать и подпись: `Y` или `N`. По умолчанию `N` ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример добавления шаблона документа, где:
- название шаблона — `Шаблон КП из REST`
- идентификатор нумератора — `49`
- регион шаблона — `ru`
- идентификаторы CRM-элементов — `2` и `2_category_0`
- код прав доступа — `UA`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Шаблон КП из REST","file":["template.docx","**base64_encoded_content**"],"numeratorId":49,"region":"ru","entityTypeId":["2","2_category_0"],"users":["UA"],"active":"Y","withStamps":"N","sort":500}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.template.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Шаблон КП из REST","file":["template.docx","**base64_encoded_content**"],"numeratorId":49,"region":"ru","entityTypeId":["2","2_category_0"],"users":["UA"],"active":"Y","withStamps":"N","sort":500},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.template.add
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.documentgenerator.template.add',
    		{
    			fields: {
    				name: 'Шаблон КП из REST',
    				file: ['template.docx', '**base64_encoded_content**'],
    				numeratorId: 49,
    				region: 'ru',
    				entityTypeId: ['2', '2_category_0'],
    				users: ['UA'],
    				active: 'Y',
    				withStamps: 'N',
    				sort: 500,
    			},
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.documentgenerator.template.add',
                [
                    'fields' => [
                        'name' => 'Шаблон КП из REST',
                        'file' => [
                            'template.docx',
                            '**base64_encoded_content**',
                        ],
                        'numeratorId' => 49,
                        'region' => 'ru',
                        'entityTypeId' => ['2', '2_category_0'],
                        'users' => ['UA'],
                        'active' => 'Y',
                        'withStamps' => 'N',
                        'sort' => 500,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding template: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.template.add',
        {
            fields: {
                name: 'Шаблон КП из REST',
                file: ['template.docx', '**base64_encoded_content**'],
                numeratorId: 49,
                region: 'ru',
                entityTypeId: ['2', '2_category_0'],
                users: ['UA'],
                active: 'Y',
                withStamps: 'N',
                sort: 500,
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.documentgenerator.template.add',
        [
            'fields' => [
                'name' => 'Шаблон КП из REST',
                'file' => [
                    'template.docx',
                    '**base64_encoded_content**',
                ],
                'numeratorId' => 49,
                'region' => 'ru',
                'entityTypeId' => ['2', '2_category_0'],
                'users' => ['UA'],
                'active' => 'Y',
                'withStamps' => 'N',
                'sort' => 500,
            ],
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
    "result": {
        "template": {
            "id": "41",
            "name": "Шаблон из файла",
            "region": "ru",
            "code": null,
            "download": "https://mysite.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.template.download&SITE_ID=s1&id=41",
            "active": "Y",
            "moduleId": "crm",
            "numeratorId": "49",
            "withStamps": "N",
            "users": {
                "UA": "UA"
            },
            "isDeleted": "N",
            "sort": "500",
            "downloadMachine": "https://mysite.ru/rest/crm.documentgenerator.template.download.json?...",
            "entityTypeId": [
                "2"
            ],
            "createTime": "2026-03-18T15:54:20+03:00",
            "updateTime": "2026-03-18T15:54:20+03:00"
        }
    },
    "time": {
        "start": 1773838459,
        "finish": 1773838460.813945,
        "duration": 1.8139450550079346,
        "processing": 1,
        "date_start": "2026-03-18T15:54:19+03:00",
        "date_finish": "2026-03-18T15:54:20+03:00",
        "operating_reset_at": 1773839059,
        "operating": 1.0305089950561523
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит объект [`template`](#template) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип template {#template}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор шаблона ||
|| **name**
[`string`](../../data-types.md) | Название шаблона ||
|| **region**
[`string`](../../data-types.md) | Регион шаблона ||
|| **code**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Символьный код шаблона ||
|| **download**
[`string`](../../data-types.md) | Ссылка на скачивание файла шаблона ||
|| **downloadMachine**
[`string`](../../data-types.md) | Ссылка на скачивание файла шаблона для приложения ||
|| **active**
[`char`](../../data-types.md) | Активность шаблона: `Y` или `N` ||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля ||
|| **numeratorId**
[`string`](../../data-types.md) | Идентификатор нумератора ||
|| **withStamps**
[`char`](../../data-types.md) | Подставлять печать и подпись: `Y` или `N` ||
|| **users**
[`object`](../../data-types.md) | Объект кодов прав доступа в формате `{"UA":"UA"}` ||
|| **isDeleted**
[`char`](../../data-types.md) | Признак удаления шаблона: `Y` или `N` ||
|| **sort**
[`string`](../../data-types.md) | Индекс сортировки ||
|| **entityTypeId**
[`array`](../../data-types.md) | Массив идентификаторов CRM-элементов, для которых доступен шаблон ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата и время создания шаблона ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата и время последнего обновления шаблона ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Empty required fields: numeratorId"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `100` | Invalid value {...} to match with parameter {fields}. Should be value of type array. | Параметр `fields` передан не как объект ||
|| `0` | Empty required fields: name, numeratorId, region, entityTypeId | Не переданы обязательные поля в объекте `fields` ||
|| `0` | Missing file content | Не передан файл шаблона в `fields.file` ||
|| `0` | Could not save file | Не удалось сохранить файл шаблона ||
|| `Пустое значение` | You do not have permissions to modify templates | Недостаточно прав для изменения шаблонов генератора документов ||
|| `Пустое значение` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-template-update.md)
- [{#T}](./crm-document-generator-template-get.md)
- [{#T}](./crm-document-generator-template-list.md)
- [{#T}](./crm-document-generator-template-delete.md)
- [{#T}](./crm-document-generator-template-get-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
