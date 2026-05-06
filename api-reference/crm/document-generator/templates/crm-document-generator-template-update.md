# Изменить существующий шаблон документа crm.documentgenerator.template.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" шаблонов генератора документов

Метод `crm.documentgenerator.template.update` обновляет существующий шаблон документа.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../data-types.md) | Идентификатор шаблона ||
|| **fields**^*^
[`object`](../../data-types.md) | Объект с полями шаблона для обновления [(подробнее)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Название шаблона ||
|| **file**
[`file`](../../data-types.md#file) | Файл шаблона в формате `["имя_файла.docx", "base64_контент"]`. Можно передать в `base64` или в `multipart/form-data`. Подробнее: [Как загружать файлы](../../../files/how-to-upload-files.md) ||
|| **numeratorId**
[`integer`](../../data-types.md) | Идентификатор нумератора. Список доступных нумераторов можно получить методом [crm.documentgenerator.numerator.list](../numerator/crm-document-generator-numerator-list.md) ||
|| **region**
[`string`](../../data-types.md) | Регион шаблона, например `ru` ||
|| **entityTypeId**
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
[`array`](../../data-types.md) | Массив кодов прав доступа, например `["UA"]`.

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
- `SND<id>`, `SNDR<id>`, `SNT<id>`, `SNTR<id>` — структурные коды подразделений и команд ||
|| **active**
[`char`](../../data-types.md) | Активность шаблона: `Y` или `N` ||
|| **withStamps**
[`char`](../../data-types.md) | Подставлять печать и подпись: `Y` или `N` ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример обновления шаблона документа, где:
- идентификатор шаблона — `41`
- новое название — `Шаблон из файла (обновлен)`
- идентификатор нумератора — `49`
- регион шаблона — `ru`
- идентификатор CRM-элемента — `2`
- код прав доступа — `UA`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":41,"fields":{"name":"Шаблон из файла (обновлен)","file":["template-updated.docx","**base64_encoded_content**"],"numeratorId":49,"region":"ru","entityTypeId":["2"],"users":["UA"],"active":"Y","withStamps":"N","sort":500}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.template.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":41,"fields":{"name":"Шаблон из файла (обновлен)","file":["template-updated.docx","**base64_encoded_content**"],"numeratorId":49,"region":"ru","entityTypeId":["2"],"users":["UA"],"active":"Y","withStamps":"N","sort":500},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.template.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.documentgenerator.template.update',
    		{
    			id: 41,
    			fields: {
    				name: 'Шаблон из файла (обновлен)',
    				file: ['template-updated.docx', '**base64_encoded_content**'],
    				numeratorId: 49,
    				region: 'ru',
    				entityTypeId: ['2'],
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
                'crm.documentgenerator.template.update',
                [
                    'id' => 41,
                    'fields' => [
                        'name' => 'Шаблон из файла (обновлен)',
                        'file' => [
                            'template-updated.docx',
                            '**base64_encoded_content**',
                        ],
                        'numeratorId' => 49,
                        'region' => 'ru',
                        'entityTypeId' => ['2'],
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
        echo 'Error updating template: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.template.update',
        {
            id: 41,
            fields: {
                name: 'Шаблон из файла (обновлен)',
                file: ['template-updated.docx', '**base64_encoded_content**'],
                numeratorId: 49,
                region: 'ru',
                entityTypeId: ['2'],
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
        'crm.documentgenerator.template.update',
        [
            'id' => 41,
            'fields' => [
                'name' => 'Шаблон из файла (обновлен)',
                'file' => [
                    'template-updated.docx',
                    '**base64_encoded_content**',
                ],
                'numeratorId' => 49,
                'region' => 'ru',
                'entityTypeId' => ['2'],
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
            "name": "Шаблон из файла (обновлен)",
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
            "updateTime": "2026-03-18T17:26:29+03:00"
        }
    },
    "time": {
        "start": 1773843989,
        "finish": 1773843989.201709,
        "duration": 0.20170903205871582,
        "processing": 0,
        "date_start": "2026-03-18T17:26:29+03:00",
        "date_finish": "2026-03-18T17:26:29+03:00",
        "operating_reset_at": 1773844589,
        "operating": 0
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
    "error_description": "Шаблон не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `100` | Invalid value {...} to match with parameter {fields}. Should be value of type array. | Параметр `fields` передан не как объект ||
|| `0` | Шаблон не найден | Шаблон с указанным `id` не найден или недоступен ||
|| `0` | Could not save file | Не удалось сохранить файл шаблона ||
|| `DOCGEN_ACCESS_ERROR` | Access denied | Нет доступа к шаблону ||
|| `Пустое значение` | You do not have permissions to modify templates | Недостаточно прав для изменения шаблонов генератора документов ||
|| `Пустое значение` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-template-add.md)
- [{#T}](./crm-document-generator-template-get.md)
- [{#T}](./crm-document-generator-template-list.md)
- [{#T}](./crm-document-generator-template-delete.md)
- [{#T}](./crm-document-generator-template-get-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
