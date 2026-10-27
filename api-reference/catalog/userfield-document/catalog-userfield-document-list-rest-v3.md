# Получить список значений пользовательских полей документов складского учета v 3.0 catalog.document.userfield.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр» для документов этого типа и правами «Просмотр каталога товаров» и «Просмотр раздела Складской учет»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.document.userfield.list` возвращает значения пользовательских полей документов складского учета одного типа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["docType", "=", "A"], ["id", "=", 325]]`. Синтаксис фильтра описан в [обзоре REST 3.0](../../rest-v3.md#filter).

Обязательно условие `["docType", "=", "<тип>"]` с оператором `=`. Возможные значения типа возвращает метод [catalog.document.type.list](../document/catalog-document-type-list.md). Для несуществующего типа метод возвращает пустой список.

Кроме `docType`, фильтровать можно по `id`. Фильтр по `userFields`, группы условий с логикой `or` и отрицание не поддерживаются ||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор документа
- `docType` — тип документа
- `userFields` — значения пользовательских полей

Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"id": "desc"}`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

Сортировать можно по `id` и `docType` ||
|| **pagination**
[`object`](../../data-types.md) | Постраничная навигация. [Описание объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество записей на странице. Значения больше `1000` уменьшаются до `1000`, значение `0` вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Если передан, заменяет `offset`. Страница за концом списка возвращает пустой массив ||
|| **offset**
[`integer`](../../data-types.md) | Количество записей, которые нужно пропустить ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.document.userfield.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["docType","=","A"],["id","=",325]],"select":["id","docType","userFields"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.userfield.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["docType","=","A"],["id","=",325]],"select":["id","docType","userFields"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.document.userfield.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentUserfieldListResult = {
      items: Array<{
        id?: number
        docType?: string
        userFields?: Record<string, unknown> | null
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentUserfieldListResult>({
        method: 'catalog.document.userfield.list',
        params: {
          filter: [
            ['docType', '=', 'A'],
            ['id', '=', 325],
          ],
          select: ['id', 'docType', 'userFields'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Documents:', result.items)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function documentUserfieldList() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.document.userfield.list',
            params: {
              filter: [
                ['docType', '=', 'A'],
                ['id', '=', 325],
              ],
              select: ['id', 'docType', 'userFields'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Documents:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', documentUserfieldList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.userfield.list(
            filter=[
                ["docType", "=", "A"],
                ["id", "=", 325],
            ],
            select=["id", "docType", "userFields"],
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
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
                'catalog.document.userfield.list',
                [
                    'filter' => [
                        ['docType', '=', 'A'],
                        ['id', '=', 325],
                    ],
                    'select' => ['id', 'docType', 'userFields'],
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
        'catalog.document.userfield.list',
        {
            filter: [
                ['docType', '=', 'A'],
                ['id', '=', 325],
            ],
            select: ['id', 'docType', 'userFields'],
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
        'catalog.document.userfield.list',
        [
            'filter' => [
                ['docType', '=', 'A'],
                ['id', '=', 325],
            ],
            'select' => ['id', 'docType', 'userFields'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.document.userfield.list", b24.Params{
    	"filter": []any{
    		[]any{"docType", "=", "A"},
    		[]any{"id", "=", 325},
    	},
    	"select": []string{"id", "docType", "userFields"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.document.userfield.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID         int                        `json:"id"`
    		DocType    string                     `json:"docType"`
    		UserFields map[string]json.RawMessage `json:"userFields"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.DocType, len(item.UserFields))
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
                "id": 325,
                "docType": "A",
                "userFields": {
                    "UF_CAT_STORE_DOCUMENT_A_REST_TEST": "1"
                }
            }
        ]
    },
    "time": {
        "start": 1792665383,
        "finish": 1792665383.478756,
        "duration": 0.4787559509277344,
        "processing": 0,
        "date_start": "2026-10-22T13:36:23+03:00",
        "date_finish": "2026-10-22T13:36:23+03:00",
        "operating_reset_at": 1792665960,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../../data-types.md) | Массив документов. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **docType**
[`string`](../../data-types.md) | Тип документа ||
|| **userFields**
[`object`](../../data-types.md) или `null` | Значения пользовательских полей документа. Ключи — коды полей вида `UF_*`, например `UF_CAT_STORE_DOCUMENT_A_REST_TEST`.

`null`, если у документов этого типа нет пользовательских полей ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "The docType field is not specified in the filter parameter"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | The docType field is not specified in the filter parameter | Добавьте в `filter` условие `["docType", "=", "<тип>"]`. Оператор `in` для `docType` не поддерживается ||
|| `filter` | Filter OR groups are not supported | Уберите группы с логикой `or` из `filter` ||
|| `userFields` | В DTO `UserfieldDocumentDto` в поле `userFields` требуется наличие атрибута `Filterable` для такого запроса | Уберите `userFields` из `filter` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `UserfieldDocumentDto` | Укажите только поля из описания параметра `select` ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте в `limit` число от `1` до `1000` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на документы этого типа и на раздел Складской учет ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-userfield-document-update-rest-v3.md)
- [{#T}](./catalog-userfield-document-field-list.md)
- [{#T}](../document/catalog-document-list-rest-v3.md)
- [{#T}](./index.md)
