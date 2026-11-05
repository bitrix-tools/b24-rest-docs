# Получить список воронок CRM v 3.0 crm.<тип>.category.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение элементов этого типа объекта CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.category.list` возвращает воронки типа объекта CRM. Тип объекта задает сегмент `<тип>` в имени метода. В список попадают только воронки, элементы которых пользователь может читать. Остальные воронки метод пропускает без ошибки.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.category.list` ||
|| Контакт | `crm.contact.category.list` ||
|| Компания | `crm.company.category.list` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.category.list`, например `crm.smartprocess1038.category.list` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Воронки есть у сделки, контакта, компании и у смарт-процесса, если в настройках его типа включены воронки. У лида, предложения, счета и моей компании их нет.

Имя метода пишется в нижнем регистре: `crm.smartprocess1038.category.list`, а не `crm.smartProcess1038.category.list`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **pagination**
[`object`](../../../data-types.md) | Параметры постраничной навигации. [Описание параметра](#pagination)

По умолчанию метод возвращает первые 50 воронок ||
|#

Метод возвращает воронки по возрастанию `sort`, а воронки с одинаковым `sort` — по возрастанию `id`.

{% note warning "" %}

Отобрать, отсортировать воронки или выбрать отдельные поля нельзя. Параметры `filter`, `order` и `select` метод пропустит без ошибки и вернет все воронки со всеми полями.

{% endnote %}

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество воронок на странице, от `1` до `100`. Значение больше `100` вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) × limit`. Ноль возвращает первую страницу.

Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../../data-types.md) | Количество воронок, которые нужно пропустить от начала списка. Отрицательное значение вызывает ошибку.

По умолчанию: `0` ||
|#

Другие ключи в `pagination` вызывают ошибку.

{% note info "" %}

Ответ не содержит общего количества воронок. Если на странице вернулось меньше воронок, чем указано в `limit`, это последняя страница.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.category.list`

{% endnote %}

Примеры получают первые две воронки смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"pagination":{"limit":2}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.category.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"pagination":{"limit":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.category.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CategoryListResult = {
      items: Array<{
        id: number
        name: string
        sort: number
        isDefault: boolean
        isSystem?: boolean
        code?: string
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CategoryListResult>(
        'crm.smartprocess1038.category.list',
        {
          pagination: {
            limit: 2,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const categories = response.getData()!.result.items
        categories.forEach(category => console.info(category.id, category.name))
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
      async function listCategories() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.category.list',
            {
              pagination: {
                limit: 2,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const categories = response.getData().result.items
          categories.forEach(category => console.info(category.id, category.name))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listCategories)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.category.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "pagination": {
                    "limit": 2,
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
                'crm.smartprocess1038.category.list',
                [
                    'pagination' => [
                        'limit' => 2,
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
        'crm.smartprocess1038.category.list',
        {
            pagination: {
                limit: 2,
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
        'crm.smartprocess1038.category.list',
        [
            'pagination' => [
                'limit' => 2,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.category.list", b24.Params{
    	"pagination": b24.Params{
    		"limit": 2,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.category.list: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет items")
    }

    var categories []struct {
    	ID        int    `json:"id"`
    	Name      string `json:"name"`
    	Sort      int    `json:"sort"`
    	IsDefault bool   `json:"isDefault"`
    }
    if err := json.Unmarshal(raw, &categories); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, category := range categories {
    	fmt.Println(category.ID, category.Name)
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
                "id": 37,
                "name": "Общая",
                "sort": 500,
                "isDefault": false,
                "isSystem": false,
                "code": ""
            },
            {
                "id": 105,
                "name": "Закупки оборудования и мебели",
                "sort": 650,
                "isDefault": false,
                "isSystem": false,
                "code": ""
            }
        ]
    },
    "time": {
        "start": 1793714739,
        "finish": 1793714739.672466,
        "duration": 0.6724660396575928,
        "processing": 0,
        "date_start": "2026-11-03T17:05:39+03:00",
        "date_finish": "2026-11-03T17:05:39+03:00",
        "operating_reset_at": 1793715300,
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
[`object[]`](../../../data-types.md) | Воронки. Поля воронки описаны на странице метода [crm.<тип>.category.get](./crm-entity-category-get-rest-v3.md#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Состав списка зависит от типа объекта:

- сделка — воронка с `id` `0`, у воронок нет полей `isSystem` и `code`
- контакт и компания — воронка с `id` `0` и могут быть системные воронки с `isSystem: true`, например воронка поставщиков контакта с `code` `CATALOG_CONTRACTOR_CONTACT`

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION",
        "message": "Не удается распознать параметр пагинации `{\"limit\":101}`"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибка постраничной навигации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `pagination` объектом только с ключами `limit`, `page` и `offset`. `limit` — от `1` до `100`, `offset` — не меньше `0` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartprocess1038.category.list`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) и включены ли в типе воронки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-category-add-rest-v3.md)
- [{#T}](./crm-entity-category-get-rest-v3.md)
- [{#T}](./crm-entity-category-stage-list-rest-v3.md)
