# Обновить компанию HCM Link humanresources.hcmlink.company.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources.hcmlink`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `humanresources.hcmlink.company.update` обновляет компанию из системы кадрового учета и список ее полей в интеграции HCM Link.

Метод работает только в контексте авторизации [приложения](../../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор компании HCM Link.

Получить идентификатор можно методом [humanresources.hcmlink.company.list](./humanresources-hcmlink-company-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Новые данные компании из системы кадрового учета [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **company***
[`string`](../../data-types.md) | Код компании в системе кадрового учета ||
|| **crmCompanyId***
[`integer`](../../data-types.md) | Идентификатор компании CRM.

Получить идентификатор можно методом [crm.item.list](../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 4` и фильтром `isMyCompany = Y` ||
|| **title***
[`string`](../../data-types.md) | Название компании ||
|| **data**
[`object`](../../data-types.md) | Дополнительные данные компании ||
|| **fields***
[`array`](../../data-types.md) | Новый список полей системы кадрового учета [(подробное описание)](#field) ||
|#

### Элемент массива fields.fields {#field}

#|
|| **Название**
`тип` | **Описание** ||
|| **field***
[`string`](../../data-types.md) | Код поля в системе кадрового учета ||
|| **title***
[`string`](../../data-types.md) | Название поля ||
|| **type**
[`string`](../../data-types.md) | Тип поля. Если не передать значение, метод сохранит поле с внутренним типом `UNKNOWN`.

Возможные значения:

- `STRING` — строка
- `FIRST_NAME` — имя
- `LAST_NAME` — фамилия
- `PATRONYMIC_NAME` — отчество
- `PHONE` — телефон
- `EMAIL` — адрес электронной почты
- `ADDRESS` — адрес
- `BIRTHDAY` — дата рождения
- `SNILS` — СНИЛС
- `INN` — ИНН
- `POSITION` — должность
- `DEPARTMENT` — подразделение
- `DOCUMENT_REGISTRATION_NUMBER` — регистрационный номер документа
- `DOCUMENT_UID` — уникальный идентификатор документа
- `DOCUMENT_DATE` — дата документа ||
|| **entityType**
[`string`](../../data-types.md) | Тип объекта, к которому относится поле. Если не передать значение, метод сохранит поле с внутренним типом `UNKNOWN`.

Возможные значения:

- `EMPLOYEE` — сотрудник
- `COMPANY` — компания
- `DOCUMENT` — документ ||
|| **ttl**
[`integer`](../../data-types.md) | Время хранения значения поля в секундах.

По умолчанию 86400 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"fields":{"company":"hr-company-001","crmCompanyId":12,"title":"ООО Ромашка","fields":[{"field":"personal_number","title":"Табельный номер","type":"STRING","entityType":"EMPLOYEE"}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/humanresources.hcmlink.company.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make({
        method: 'humanresources.hcmlink.company.update',
        params: {
          id: 15,
          fields: {
            company: 'hr-company-001',
            crmCompanyId: 12,
            title: 'ООО Ромашка',
            fields: [
              {
                field: 'personal_number',
                title: 'Табельный номер',
                type: 'STRING',
                entityType: 'EMPLOYEE',
              },
            ],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info(response.getData()!.result)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function updateHcmLinkCompany() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'humanresources.hcmlink.company.update',
            params: {
              id: 15,
              fields: {
                company: 'hr-company-001',
                crmCompanyId: 12,
                title: 'ООО Ромашка',
                fields: [
                  {
                    field: 'personal_number',
                    title: 'Табельный номер',
                    type: 'STRING',
                    entityType: 'EMPLOYEE'
                  }
                ]
              }
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          console.info(response.getData().result)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateHcmLinkCompany)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.hcmlink.company.update',
                [
                    'id' => 15,
                    'fields' => [
                        'company' => 'hr-company-001',
                        'crmCompanyId' => 12,
                        'title' => 'ООО Ромашка',
                        'fields' => [
                            [
                                'field' => 'personal_number',
                                'title' => 'Табельный номер',
                                'type' => 'STRING',
                                'entityType' => 'EMPLOYEE',
                            ],
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating company: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'humanresources.hcmlink.company.update',
        {
            id: 15,
            fields: {
                company: 'hr-company-001',
                crmCompanyId: 12,
                title: 'ООО Ромашка',
                fields: [{ field: 'personal_number', title: 'Табельный номер', type: 'STRING', entityType: 'EMPLOYEE' }]
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'humanresources.hcmlink.company.update',
        [
            'id' => 15,
            'fields' => [
                'company' => 'hr-company-001',
                'crmCompanyId' => 12,
                'title' => 'ООО Ромашка',
                'fields' => [
                    [
                        'field' => 'personal_number',
                        'title' => 'Табельный номер',
                        'type' => 'STRING',
                        'entityType' => 'EMPLOYEE',
                    ],
                ],
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "humanresources.hcmlink.company.update", b24.Params{
    	"id": 15,
    	"fields": b24.Params{
    		"company":      "hr-company-001",
    		"crmCompanyId": 12,
    		"title":        "ООО Ромашка",
    		"fields": []b24.Params{
    			{
    				"field":      "personal_number",
    				"title":      "Табельный номер",
    				"type":       "STRING",
    				"entityType": "EMPLOYEE",
    			},
    		},
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("humanresources.hcmlink.company.update: %w", err)
    }

    var updated bool
    if err := json.Unmarshal(res.Result, &updated); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(updated)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1739860000.123,
        "finish": 1739860000.456,
        "duration": 0.333,
        "processing": 0.111,
        "date_start": "2026-08-06T19:51:02+03:00",
        "date_finish": "2026-08-06T19:51:02+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если компания обновлена ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **200**, **403**

```json
{
    "error": 510,
    "error_description": "Operation failed"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Когда возникает** ||
|| `510` | Operation failed | Не переданы обязательные поля, компания CRM не найдена или произошла ошибка сохранения ||
|| `ACCESS_DENIED` | Access denied! Access denied. | Пользователь не является администратором ||
|| `WRONG_AUTH_TYPE` | Application context required | Метод вызван не в контексте приложения ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-hcmlink-company-add.md)
- [{#T}](./humanresources-hcmlink-company-list.md)
- [{#T}](./humanresources-hcmlink-company-delete.md)
