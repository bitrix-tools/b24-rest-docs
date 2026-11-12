# Получить воронку по Id crm.category.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом доступа к воронке «Чтение»

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.<тип>.category.get](../../rest-v3/categories/crm-entity-category-get-rest-v3.md). Воронки счетов, документов CRM и документов КЭДО в REST 3.0 пока недоступны, для них используйте этот метод.

{% endnote %}

Метод `crm.category.get` получает информацию о воронке с идентификатором `id`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | Идентификатор [системного](../../index.md) или [пользовательского типа](../user-defined-object-types/index.md) объекта CRM, для которого нужно получить воронку. Тип объекта должен поддерживать воронки: [список поддерживаемых объектов](./index.md#supported-entity-types) ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор воронки. Для общей воронки сделок, контактов или компаний укажите `0`. Идентификатор можно получить методом [`crm.category.list`](./crm-category-list.md) или при создании воронки методом [`crm.category.add`](./crm-category-add.md) ||
|#

## Примеры кода

Как получить информацию о воронке с `id` = `1`, находящейся в сделках.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"id":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.category.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.category.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CategoryGetResult = {
      category: {
        id: number
        name: string
        sort: number
        entityTypeId: number
        isDefault: string
        originId?: string | null
        originatorId?: string | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<CategoryGetResult>({
        method: 'crm.category.get',
        params: {
          entityTypeId: 2,
          id: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.category)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getCategoryById() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.category.get',
            params: {
              entityTypeId: 2,
              id: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.category)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCategoryById)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.category.get(
            bitrix_id=1,
            entity_type_id=2,
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


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.category.get',
                [
                    'entityTypeId' => 2,
                    'id'          => 1,
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

    ```js
    BX24.callMethod(
        "crm.category.get",
        {
            entityTypeId: 2,
            id: 1,
        },
        (result) => 
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.category.get',
        [
            'entityTypeId' => 2,
            'id' => 1
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.category.get", b24.Params{
    	"entityTypeId": 2,
    	"id":           1,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.category.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "category".
    raw, ok := b24.Unwrap(res.Result, "category")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа category")
    }

    var item struct {
    	ID           b24.ID `json:"id"`
    	Name         string `json:"name"`
    	Sort         int    `json:"sort"`
    	EntityTypeID b24.ID `json:"entityTypeId"`
    	IsDefault    string `json:"isDefault"`
    	OriginID     string `json:"originId"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "category": {
            "id": 1,
            "name": "Новая воронка #1",
            "sort": 200,
            "entityTypeId": 2,
            "isDefault": "N",
            "originId": "",
            "originatorId": ""
        }
    },
    "time": {
        "start": 1718291429.253404,
        "finish": 1718291429.654617,
        "duration": 0.4012131690979004,
        "processing": 0.025265216827392578,
        "date_start": "2024-06-13T17:10:29+02:00",
        "date_finish": "2024-06-13T17:10:29+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит объект `category` с информацией о воронке ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Объект `result.category` содержит основные поля:

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор воронки. Для общей воронки сделок может быть равен `0` ||
|| **name**
[`string`](../../../data-types.md) | Название воронки ||
|| **sort**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта CRM, которому принадлежит воронка ||
|| **isDefault**
[`boolean`](../../../data-types.md) | Признак воронки по умолчанию: `Y` — да, `N` — нет ||
|#

Остальные поля зависят от типа объекта и воронки. Поля `originId` и `originatorId` возвращаются для воронок сделок, но отсутствуют у общей воронки с `id = 0`. Поля `isSystem` и `code` возвращаются для контактов и компаний; в ответах сделок и смарт-процессов они отсутствуют. Подробное описание полей — в [таблице объекта category](./crm-category-add.md#category), доступные для типа объекта поля — в методе [crm.category.fields](./crm-category-fields.md).

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|| `400` | `100` | Could not find value for parameter {entityTypeId} | Не передан обязательный параметр `entityTypeId` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {id}. Should be value of type int. | Передано значение неверного типа. Пример: `id=abc` вместо целого числа ||
|| `400` | `NOT_FOUND` | Смарт-процесс не найден | Тип объекта CRM с указанным `entityTypeId` не найден ||
|| `400` | `ENTITY_TYPE_NOT_SUPPORTED` | Сущность CRM {entityTypeName} не поддерживается | Объект CRM не поддерживает воронки. Вместо `{entityTypeName}` возвращается название типа объекта ||
|| `400` | `NOT_FOUND` | Элемент не найден | Воронки с указанными `entityTypeId` и `id` не существует ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | У пользователя нет прав просматривать элементы данной воронки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [Воронки CRM: обзор методов](./index.md)
- [{#T}](./crm-category-add.md)
- [{#T}](./crm-category-update.md)
- [{#T}](./crm-category-list.md)
- [{#T}](./crm-category-delete.md)
- [{#T}](./crm-category-fields.md)
