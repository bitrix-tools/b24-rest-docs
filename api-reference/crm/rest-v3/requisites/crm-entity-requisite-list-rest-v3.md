# Получить список реквизитов контакта или компании v 3.0 crm.<тип>.requisite.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр контакта или компании

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.requisite.list` возвращает реквизиты одного контакта или одной компании. Тип владельца задает сегмент `<тип>` в имени метода, владельца — условие в фильтре. Реквизиты всех контактов и компаний возвращает метод [crm.requisite.list](./crm-requisite-list-rest-v3.md).

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Компания | `crm.company.requisite.list` ||
|| Контакт | `crm.contact.requisite.list` ||
|#

Реквизиты есть только у контактов и компаний. Тип владельца задает сегмент `company` или `contact` в имени метода, реквизит другого типа владельца метод не найдет. Реквизиты моей компании доступны через методы `crm.company.*`.

Имя метода пишется в нижнем регистре: `crm.company.requisite.list`, а не `crm.Company.Requisite.List`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Фильтр с одним условием по владельцу: `[["companyId","=",3167]]` в методе компании, `[["contactId","=",14]]` в методе контакта. Других полей для фильтра нет, оператор — только `=`, без групп и отрицания ||
|| **select**
[`array`](../../../data-types.md) | Список полей реквизита, которые нужно вернуть. Поля и вложенные объекты `addresses`, `bankRequisites` — как в [select метода crm.<тип>.requisite.get](./crm-entity-requisite-get-rest-v3.md).

По умолчанию: только `id` ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно только по `id`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию: по возрастанию `id` ||
|| **pagination**
[`object`](../../../data-types.md) | Постраничная навигация: `limit` — количество реквизитов на странице, по умолчанию `50`, `offset` — сколько реквизитов пропустить. Ноль и отрицательный `limit` вызывают ошибку ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.company.requisite.list`

{% endnote %}

Примеры получают реквизиты компании с идентификатором `3167`. Для контакта замените имя метода на `crm.contact.requisite.list` и `companyId` на `contactId`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["companyId","=",3167]],"select":["id","companyId","presetId","name","inn","kpp"],"order":{"id":"asc"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.requisite.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["companyId","=",3167]],"select":["id","companyId","presetId","name","inn","kpp"],"order":{"id":"asc"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.company.requisite.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type RequisiteListResult = {
      items: Array<{
        id: number
        companyId: number
        presetId: number
        name: string
        inn: string | null
        kpp: string | null
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<RequisiteListResult>(
        'crm.company.requisite.list',
        {
          filter: [
            ['companyId', '=', 3167],
          ],
          select: ['id', 'companyId', 'presetId', 'name', 'inn', 'kpp'],
          order: {
            id: 'asc',
          },
          pagination: {
            limit: 50,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Requisites:', result.items)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listRequisites() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.company.requisite.list',
            {
              filter: [
                ['companyId', '=', 3167],
              ],
              select: ['id', 'companyId', 'presetId', 'name', 'inn', 'kpp'],
              order: {
                id: 'asc',
              },
              pagination: {
                limit: 50,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Requisites:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listRequisites)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.company.requisite.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["companyId", "=", 3167],
                ],
                "select": ["id", "companyId", "presetId", "name", "inn", "kpp"],
                "order": {
                    "id": "asc",
                },
                "pagination": {
                    "limit": 50,
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.company.requisite.list',
                [
                    'filter' => [
                        ['companyId', '=', 3167],
                    ],
                    'select' => ['id', 'companyId', 'presetId', 'name', 'inn', 'kpp'],
                    'order' => [
                        'id' => 'asc',
                    ],
                    'pagination' => [
                        'limit' => 50,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'crm.company.requisite.list',
        {
            filter: [
                ['companyId', '=', 3167],
            ],
            select: ['id', 'companyId', 'presetId', 'name', 'inn', 'kpp'],
            order: {
                id: 'asc',
            },
            pagination: {
                limit: 50,
            },
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.company.requisite.list',
        [
            'filter' => [
                ['companyId', '=', 3167],
            ],
            'select' => ['id', 'companyId', 'presetId', 'name', 'inn', 'kpp'],
            'order' => [
                'id' => 'asc',
            ],
            'pagination' => [
                'limit' => 50,
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
    res, err := client.Core().Call(ctx, "crm.company.requisite.list", b24.Params{
    	"filter": []any{
    		[]any{"companyId", "=", 3167},
    	},
    	"select": []string{"id", "companyId", "presetId", "name", "inn", "kpp"},
    	"order": b24.Params{
    		"id": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.company.requisite.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID        int     `json:"id"`
    		CompanyID int     `json:"companyId"`
    		PresetID  int     `json:"presetId"`
    		Name      string  `json:"name"`
    		Inn       *string `json:"inn"`
    		Kpp       *string `json:"kpp"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Name)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "id": 549,
                "companyId": 3167,
                "presetId": 1,
                "name": "Основной реквизит",
                "inn": "7701234567",
                "kpp": "770201001"
            },
            {
                "id": 551,
                "companyId": 3167,
                "presetId": 5,
                "name": "Реквизит ИП",
                "inn": null,
                "kpp": null
            }
        ]
    },
    "time": {
        "start": 1793711900,
        "finish": 1793711900.089311,
        "duration": 0.08931088447570801,
        "processing": 0,
        "date_start": "2026-11-03T16:18:20+03:00",
        "date_finish": "2026-11-03T16:18:20+03:00",
        "operating_reset_at": 1793712480,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`object[]`](../../../data-types.md) | Реквизиты владельца с полями из `select`. Без `select` у каждого реквизита только `id`. Если реквизитов нет, массив пустой. [Описание полей реквизита](./index.md#fields) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации фильтров объекта запроса",
        "validation": [
            {
                "message": "Требуется указать фильтр по обязательному полю `companyId`",
                "field": "filter.companyId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Обязательное поле `filter` не указано | Передайте `filter` с условием по владельцу ||
|| `name` | В DTO `OwnerRequisiteCompanyDto` в поле `name` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по владельцу ||
|| `sort` | В DTO `OwnerRequisiteCompanyDto` в поле `sort` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id` ||
|#

#### Ошибки валидации фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.companyId` | Требуется указать фильтр по обязательному полю `companyId` | Добавьте условие `["companyId","=",<идентификатор>]`. В методе контакта — `contactId` ||
|| `filter.companyId` | Укажите в фильтре одно условие для поля companyId с оператором =, без вложенных групп и отрицания | Оставьте одно условие по владельцу с оператором `=`. Операторы `in`, `>` и повтор условия не поддерживаются ||
|#

#### Неверная пагинация

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` больше нуля и `offset` не меньше нуля ||
|#

#### Владелец не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Контакта или компании нет или у вас нет права на просмотр. Проверьте идентификатор в фильтре и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `OwnerRequisiteCompanyDto` | Проверьте имена полей в `select` по [описанию полей реквизита](./index.md#fields) ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.company.requisite.list`. Методы реквизитов есть только у контактов и компаний: сегмент `company` или `contact` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-requisite-get-rest-v3.md)
- [{#T}](./crm-requisite-list-rest-v3.md)
- [{#T}](./crm-entity-requisite-add-rest-v3.md)
