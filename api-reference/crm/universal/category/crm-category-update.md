# Обновить воронку crm.category.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на управление воронками. Для смарт-процесса цифрового рабочего места право проверяется в рамках этого рабочего места

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.<тип>.category.update](../../rest-v3/categories/crm-entity-category-update-rest-v3.md). Воронки счетов, документов CRM и документов КЭДО в REST 3.0 пока недоступны, для них используйте этот метод.

{% endnote %}

Метод `crm.category.update` обновляет воронку с идентификатором `id`: изменяет значения полей, переданных в `fields`. Значения остальных полей не меняются.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | Идентификатор [системного](../../index.md) или [пользовательского типа](../user-defined-object-types/index.md) объекта CRM, для которого будет обновлена воронка ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор воронки. Можно получить методом [`crm.category.list`](./crm-category-list.md) или при создании воронки методом [`crm.category.add`](./crm-category-add.md) ||
|| **fields***
[`object`](../../../data-types.md)  |  Значения полей (подробное описание приведено [ниже](#parametr-fields)) для обновления полей воронки в виде структуры:

```js
fields: {
    name: "Название воронки",
    sort: 1000,
    isDefault: "Y",
},
```

  ||
|#

### Параметр fields {#parametr-fields}

Полное описание полей воронки приведено в [crm.category.fields](./crm-category-fields.md) и [таблице полей crm.category.add](./crm-category-add.md#parametr-fields). Особенности обновления:

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Название воронки ||
|| **sort**
[`integer`](../../../data-types.md) | Индекс сортировки. Передайте неотрицательное число. Отрицательное значение игнорируется, прежнее значение сохраняется ||
|| **isDefault**
[`boolean`](../../../data-types.md) | Признак воронки по умолчанию:
- `Y` или `true` — да
- `N` или `false` — нет

Если для типа объекта доступно изменение признака, передайте `Y` или `true`, чтобы назначить обновляемую воронку воронкой по умолчанию. Прежняя воронка по умолчанию потеряет этот признак.

В сделках поле `isDefault` недоступно для изменения.

Проверить доступность изменения для типа объекта можно методом [`crm.category.fields`](./crm-category-fields.md): неизменяемое поле имеет свойство `isReadOnly = true` ||
|#


## Примеры кода

Как обновить воронку с `id = 4` в смарт-процессе с `entityTypeId = 1152`

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1152,"id":4,"fields":{"name":"Новое название воронки","sort":1000,"isDefault":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.category.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1152,"id":4,"fields":{"name":"Новое название воронки","sort":1000,"isDefault":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.category.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CategoryUpdateResult = {
      category: {
        id: number
        name: string
        sort: number
        entityTypeId: number
        isDefault: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<CategoryUpdateResult>({
        method: 'crm.category.update',
        params: {
          entityTypeId: 1152,
          id: 4,
          fields: {
            name: 'New funnel name',
            sort: 1000,
            isDefault: 'Y',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.category.id, result.category.name)
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
      async function updateCategory() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.category.update',
            params: {
              entityTypeId: 1152,
              id: 4,
              fields: {
                name: 'New funnel name',
                sort: 1000,
                isDefault: 'Y',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.category.id, result.category.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateCategory)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.category.update(
            bitrix_id=4,
            fields={
                "name": "Новое название воронки",
                "sort": 1000,
                "isDefault": "Y",
            },
            entity_type_id=1152,
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
                'crm.category.update',
                [
                    'entityTypeId' => 1152,
                    'id'          => 4,
                    'fields'      => [
                        'name'     => 'Новое название воронки',
                        'sort'     => 1000,
                        'isDefault' => 'Y',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating category: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.category.update",
        {
            entityTypeId: 1152,
            id: 4,
            fields: {
                name: "Новое название воронки",
                sort: 1000,
                isDefault: "Y",
            },
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
        'crm.category.update',
        [
            'entityTypeId' => 1152,
            'id' => 4,
            'fields' => [
                'name' => "Новое название воронки",
                'sort' => 1000,
                'isDefault' => "Y"
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.category.update", b24.Params{
    	"entityTypeId": 1152,
    	"id":           4,
    	"fields": b24.Params{
    		"name":      "Новое название воронки",
    		"sort":      1000,
    		"isDefault": "Y",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.category.update: %w", err)
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
            "id": 4,
            "name": "Новое название воронки",
            "sort": 1000,
            "entityTypeId": 1152,
            "isDefault": "Y"
        }
    },
    "time": {
        "start": 1718359296.368324,
        "finish": 1718359296.65352,
        "duration": 0.28519606590270996,
        "processing": 0.03645014762878418,
        "date_start": "2024-06-14T12:01:36+02:00",
        "date_finish": "2024-06-14T12:01:36+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит объект [`category`](#category) ||
|| **category**
[`object`](../../../data-types.md) | Объект обновленной воронки в составе `result`. Его поля описаны в разделе [Объект category](#category) ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Объект category {#category}

Полное описание объекта — в [crm.category.add](./crm-category-add.md#category). Краткий состав ответа:

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор воронки ||
|| **name**
[`string`](../../../data-types.md) | Название воронки ||
|| **sort**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта CRM ||
|| **isDefault**
[`boolean`](../../../data-types.md) | Признак воронки по умолчанию: `Y` — да, `N` — нет ||
|| **originId**, **originatorId**
[`string`](../../../data-types.md) | Идентификаторы для связи с внешней системой. Возвращаются для дополнительных воронок сделок ||
|| **isSystem**
[`boolean`](../../../data-types.md) | Признак системной воронки: `Y` — да, `N` — нет. Возвращается для контактов и компаний ||
|| **code**
[`string`](../../../data-types.md) | Символьный код воронки. Возвращается для контактов и компаний ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Смарт-процесс не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан обязательный параметр. Вместо `{fields}` возвращается имя пропущенного параметра: `entityTypeId`, `id` или `fields` ||
|| `400` | `NOT_FOUND` | Смарт-процесс не найден | Тип объекта CRM с указанным `entityTypeId` не найден ||
|| `400` | `ENTITY_TYPE_NOT_SUPPORTED` | Сущность CRM {entityTypeName} не поддерживается | Объект CRM не поддерживает воронки. Вместо `{entityTypeName}` возвращается название типа объекта ||
|| `400` | `NOT_FOUND` | Элемент не найден | Возникает, если обновляемой воронки не существует ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | Возникает, если у пользователя, обновляющего воронку, недостаточно прав ||
|#

Текст ошибки зависит от языка Битрикс24. Метод также возвращает ошибки сохранения воронки; их состав зависит от типа объекта CRM.

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-category-add.md)
- [{#T}](./crm-category-get.md)
- [{#T}](./crm-category-list.md)
- [{#T}](./crm-category-delete.md)
- [{#T}](./crm-category-fields.md)
