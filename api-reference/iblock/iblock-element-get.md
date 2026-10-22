# Получить элемент инфоблока iblock.element.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`iblock`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../rest-v3.md).

{% endnote %}

Метод `iblock.element.get` возвращает элемент инфоблока по идентификатору.

{% note warning "" %}

Метод работает только с инфоблоками, у которых в административной панели задан «Символьный код API» и включен «Доступ через REST». В облачном Битрикс24 административной панели нет, поэтому задать эти настройки нельзя и метод возвращает ошибку. Подробнее — в [ограничениях и особенностях раздела](./index.md#restrictions).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblock***
[`integer`](../data-types.md) | Идентификатор инфоблока, в котором находится элемент. Значение должно быть больше `0`.

Обратите внимание: параметр называется `iblock`, а не `iblockId`. В ошибках проверки инфоблока поле называется `iblockId` ||
|| **id***
[`integer`](../data-types.md) | Идентификатор элемента.

Идентификатор можно получить методом [iblock.element.list](./iblock-element-list.md) ||
|| **select**
[`array`](../data-types.md) | Массив полей элемента, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор элемента
- `iblockId` — идентификатор инфоблока
- `name` — название элемента
- `iblockSectionId` — идентификатор раздела инфоблока
- `properties` — значения свойств элемента

По умолчанию: `id`, `iblockId`, `name`, `iblockSectionId`. Поле `properties` без `select` возвращается, только если у элемента заполнены свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/iblock.element.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"iblock":14,"id":215,"select":["id","name","iblockSectionId","properties"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/iblock.element.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"iblock":14,"id":215,"select":["id","name","iblockSectionId","properties"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/iblock.element.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PropertyValue = {
      id: number
      value: string
      description: string | null
    }

    type ElementGetResult = {
      item: {
        id: number
        name: string
        iblockSectionId: number | null
        properties: Record<string, PropertyValue | PropertyValue[]>
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<ElementGetResult>({
        method: 'iblock.element.get',
        params: {
          iblock: 14,
          id: 215,
          select: ['id', 'name', 'iblockSectionId', 'properties'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item.name, result.item.properties)
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
      async function getElement() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'iblock.element.get',
            params: {
              iblock: 14,
              id: 215,
              select: ['id', 'name', 'iblockSectionId', 'properties'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item.name, result.item.properties)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getElement)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.iblock.element.get(
            iblock=14,
            id=215,
            select=["id", "name", "iblockSectionId", "properties"],
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
                'iblock.element.get',
                [
                    'iblock' => 14,
                    'id' => 215,
                    'select' => ['id', 'name', 'iblockSectionId', 'properties'],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'iblock.element.get',
        {
            iblock: 14,
            id: 215,
            select: ['id', 'name', 'iblockSectionId', 'properties'],
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
        'iblock.element.get',
        [
            'iblock' => 14,
            'id' => 215,
            'select' => ['id', 'name', 'iblockSectionId', 'properties'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "iblock.element.get", b24.Params{
    	"iblock": 14,
    	"id":     215,
    	"select": []string{"id", "name", "iblockSectionId", "properties"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("iblock.element.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID              int                        `json:"id"`
    	Name            string                     `json:"name"`
    	IblockSectionID *int                       `json:"iblockSectionId"`
    	Properties      map[string]json.RawMessage `json:"properties"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name, len(item.Properties))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 215,
            "name": "Кресло офисное",
            "iblockSectionId": 8,
            "properties": {
                "COLOR": {
                    "id": 1043,
                    "value": "Черный",
                    "description": null
                },
                "SIZE": [
                    {
                        "id": 1044,
                        "value": "M",
                        "description": null
                    },
                    {
                        "id": 1045,
                        "value": "L",
                        "description": null
                    }
                ]
            }
        }
    },
    "time": {
        "start": 1792670785,
        "finish": 1792670785.424705,
        "duration": 0.42470502853393555,
        "processing": 0,
        "date_start": "2026-10-22T15:06:25+03:00",
        "date_finish": "2026-10-22T15:06:25+03:00",
        "operating_reset_at": 1792671360,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../data-types.md) | Элемент инфоблока. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор элемента ||
|| **iblockId**
[`integer`](../data-types.md) | Идентификатор инфоблока ||
|| **name**
[`string`](../data-types.md) | Название элемента ||
|| **iblockSectionId**
[`integer`](../data-types.md) | Идентификатор раздела инфоблока. `null`, если элемент не привязан к разделу ||
|| **properties**
[`object`](../data-types.md) | Значения свойств элемента. Ключ — символьный код свойства, значение — [объект значения](#property-value) для одиночного свойства или массив таких объектов для множественного.

Если `properties` указано в `select`, а свойств у элемента нет, возвращается пустой массив `[]` ||
|#

#### Объект значения свойства {#property-value}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор значения свойства ||
|| **value**
[`string`](../data-types.md) | Значение свойства ||
|| **description**
[`string`](../data-types.md) | Описание значения. `null`, если описание не задано ||
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
                "message": "Unable to compile iblock entity.",
                "field": "iblockId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `iblock` | Обязательное поле `iblock` не указано | Передайте идентификатор инфоблока в параметре `iblock` ||
|| `iblock` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор инфоблока ||
|| `id` | Обязательное поле `id` не указано | Передайте идентификатор элемента ||
|| `iblockId` | Iblock not found. | Инфоблока с таким идентификатором нет. Проверьте значение `iblock` ||
|| `iblockId` | Unable to compile iblock entity. | У инфоблока не задан символьный код API. Задайте его в административной панели. В облачном Битрикс24 это сделать нельзя ||
|| `iblockId` | Restricted iblock ID:`#ID#` (`#API_CODE#`) | У инфоблока выключен доступ через REST. Включите его в административной панели ||
|#

#### Ошибка нахождения элемента

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Элемента с таким идентификатором нет в инфоблоке. Проверьте `id` и `iblock` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `ElementDto` | Укажите только поля из [описания объекта item](#item) ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./iblock-element-list.md)
- [{#T}](./iblock-element-field-list.md)
- [{#T}](./index.md)
- [{#T}](../lists/index.md)
