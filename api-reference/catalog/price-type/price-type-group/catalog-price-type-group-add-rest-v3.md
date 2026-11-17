# Добавить привязку типа цен к группе покупателей v 3.0 catalog.pricetype.group.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Управление типами цен»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `catalog.pricetype.group.add` добавляет привязку типа цены к группе покупателей и возвращает ее поля.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями новой привязки. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **catalogGroupId***
[`integer`](../../../data-types.md) | Идентификатор типа цены.

Идентификатор можно получить методом [catalog.pricetype.list](../catalog-price-type-list-rest-v3.md) ||
|| **groupId***
[`integer`](../../../data-types.md) | Идентификатор группы пользователей.

При создании типа цены Битрикс24 сам добавляет для него привязки к группе администраторов с идентификатором `1` с обоими типами доступа ||
|| **access***
[`boolean`](../../../data-types.md) | Тип доступа к цене.

Возможные значения:

- `true` — право на покупку по этому типу цены
- `false` — право на просмотр этого типа цены

Строки `Y` и `N` из прежней версии API вызывают ошибку валидации ||
|#

Сочетание `catalogGroupId`, `groupId` и `access` должно быть уникальным. Поле `id` заполняется автоматически, если передать его в `fields`, метод вернет ошибку.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.pricetype.group.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":21,"groupId":2,"access":true}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.pricetype.group.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":21,"groupId":2,"access":true},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.pricetype.group.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PriceTypeGroupAddResult = {
      item: {
        id: number
        catalogGroupId: number
        groupId: number
        access: boolean
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<PriceTypeGroupAddResult>({
        method: 'catalog.pricetype.group.add',
        params: {
          fields: {
            catalogGroupId: 21,
            groupId: 2,
            access: true,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Binding created:', result.item.id)
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
      async function addPriceTypeGroup() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.pricetype.group.add',
            params: {
              fields: {
                catalogGroupId: 21,
                groupId: 2,
                access: true,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Binding created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addPriceTypeGroup)
    </script>
    ```

- Python

    В `b24pysdk` нет обертки для этого метода, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.pricetype.group.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "catalogGroupId": 21,
                    "groupId": 2,
                    "access": True,
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
                'catalog.pricetype.group.add',
                [
                    'fields' => [
                        'catalogGroupId' => 21,
                        'groupId' => 2,
                        'access' => true,
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
        'catalog.pricetype.group.add',
        {
            fields: {
                catalogGroupId: 21,
                groupId: 2,
                access: true,
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
        'catalog.pricetype.group.add',
        [
            'fields' => [
                'catalogGroupId' => 21,
                'groupId' => 2,
                'access' => true,
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
    res, err := client.Core().Call(ctx, "catalog.pricetype.group.add", b24.Params{
    	"fields": b24.Params{
    		"catalogGroupId": 21,
    		"groupId":        2,
    		"access":         true,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.pricetype.group.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID             int    `json:"id"`
    	CatalogGroupID int    `json:"catalogGroupId"`
    	GroupID        int    `json:"groupId"`
    	Access         bool   `json:"access"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.GroupID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 169,
            "catalogGroupId": 21,
            "groupId": 2,
            "access": true
        }
    },
    "time": {
        "start": 1792668012,
        "finish": 1792668012.406017,
        "duration": 0.4060170650482178,
        "processing": 0,
        "date_start": "2026-10-22T14:20:12+03:00",
        "date_finish": "2026-10-22T14:20:12+03:00",
        "operating_reset_at": 1792668600,
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
|| **result.item**
[`object`](../../../data-types.md) | Поля созданной привязки. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор привязки. Нужен для удаления привязки методом [catalog.pricetype.group.delete](./catalog-price-type-group-delete-rest-v3.md) ||
|| **catalogGroupId**
[`integer`](../../../data-types.md) | Идентификатор типа цены ||
|| **groupId**
[`integer`](../../../data-types.md) | Идентификатор группы пользователей ||
|| **access**
[`boolean`](../../../data-types.md) | Тип доступа:
- `true` — покупка
- `false` — просмотр ||
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
                "message": "The specified access type for this group already exists"
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
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `catalogGroupId` | В поле `catalogGroupId` требуется тип данных `int` для такого запроса | Передайте число ||
|| `access` | В поле `access` требуется тип данных `bool` для такого запроса | Передайте `true` или `false` вместо `Y` или `N` ||
|| `-` | The specified price type does not exist | Проверьте идентификатор типа цены методом [catalog.pricetype.list](../catalog-price-type-list-rest-v3.md) ||
|| `-` | The specified group does not exist | Передайте идентификатор существующей группы пользователей ||
|| `-` | The specified access type for this group already exists | Такая привязка уже есть. Привязки к группе `1` создаются вместе с типом цены ||
|#

Если в запросе несколько ошибок, метод возвращает их все в массиве `validation`.

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `catalogGroupId` | Не заполнено обязательное поле "catalogGroupId" | Передайте `catalogGroupId` в `fields` ||
|| `groupId` | Не заполнено обязательное поле "groupId" | Передайте `groupId` в `fields` ||
|| `access` | Не заполнено обязательное поле "access" | Передайте `access` в `fields` ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `PriceTypeGroupDto` | Передайте в `fields` только `catalogGroupId`, `groupId`, `access` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Управление типами цен» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-group-delete-rest-v3.md)
- [{#T}](./catalog-price-type-group-list-rest-v3.md)
- [{#T}](./catalog-price-type-group-field-list.md)
- [{#T}](./catalog-price-type-group-field-get.md)
- [{#T}](../catalog-price-type-add-rest-v3.md)
