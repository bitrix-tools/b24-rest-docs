# Добавить новую воронку crm.category.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на управление воронками. Для смарт-процесса цифрового рабочего места право проверяется в рамках этого рабочего места

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.<тип>.category.add](../../rest-v3/categories/crm-entity-category-add-rest-v3.md). Воронки счетов, документов CRM и документов КЭДО в REST 3.0 пока недоступны, для них используйте этот метод.

{% endnote %}

Метод `crm.category.add` создает новую воронку для типа объекта CRM с идентификатором `entityTypeId`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId*** 
[`integer`](../../../data-types.md) | Идентификатор [системного](../../index.md) или [пользовательского типа](../user-defined-object-types/index.md) объекта CRM, для которого будет создана новая воронка ||
|| **fields***
[`object`](../../../data-types.md)  | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления новой воронки в виде структуры:

```js
fields: {
    name: "Новая воронка",
    sort: 50,
    isDefault: "N",
},
```

 ||
|#

### Параметр fields {#parametr-fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Название воронки:
- не длиннее `255` символов
- не пустое
- не состоит только из пробельных символов ||
|| **sort**
[`integer`](../../../data-types.md) | Индекс сортировки. Отрицательное значение игнорируется.

Для воронки сделки, если `sort` не передан или передан отрицательным, используется `0`. Для воронок контактов, компаний и смарт-процессов в этих случаях используется `500` ||
|| **isDefault**
[`boolean`](../../../data-types.md) | Признак воронки по умолчанию. Может иметь значения:
- `Y` или `true` — да
- `N` или `false` — нет

По умолчанию равно `N`.

В сделках поле `isDefault` игнорируется. Для контактов и компаний нельзя создать воронку по умолчанию: значение `Y` или `true` вызывает ошибку.

Для смарт-процесса при создании воронки с `isDefault: "Y"` прежняя воронка по умолчанию теряет этот признак. Ограничения изменения и удаления описаны в [crm.category.update](./crm-category-update.md#parametr-fields) и [crm.category.delete](./crm-category-delete.md) ||
|#

## Примеры кода

Создать новую воронку по умолчанию в смарт-процессе с `entityTypeId = 1152`.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId": 1152, "fields": {"name": "Новая воронка по умолчанию", "sort": 50, "isDefault": "Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.category.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId": 1152, "fields": {"name": "Новая воронка по умолчанию", "sort": 50, "isDefault": "Y"}, "auth": "**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.category.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CategoryAddResult = {
      category: {
        id: number
        name: string
        sort: number
        entityTypeId: number
        isDefault: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<CategoryAddResult>({
        method: 'crm.category.add',
        params: {
          entityTypeId: 1152,
          fields: {
            name: 'New default pipeline',
            sort: 50,
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
      async function addCategory() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.category.add',
            params: {
              entityTypeId: 1152,
              fields: {
                name: 'New default pipeline',
                sort: 50,
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

      document.addEventListener('DOMContentLoaded', addCategory)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.category.add(
            fields={
                "name": "Новая воронка по умолчанию",
                "sort": 50,
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
                'crm.category.add',
                [
                    'entityTypeId' => 1152,
                    'fields' => [
                        'name'     => 'Новая воронка по умолчанию',
                        'sort'     => 50,
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
        echo 'Error adding category: ' . $e->getMessage();
    }
    ```

- BX24.js

	```js
    BX24.callMethod(
        "crm.category.add",
        {
            entityTypeId: 1152,
            fields: {
                name: "Новая воронка по умолчанию",
                sort: 50,
                isDefault: 'Y',
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
        'crm.category.add',
        [
            'entityTypeId' => 1152,
            'fields' => [
                'name' => "Новая воронка по умолчанию",
                'sort' => 50,
                'isDefault' => 'Y',
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
    res, err := client.Core().Call(ctx, "crm.category.add", b24.Params{
    	"entityTypeId": 1152,
    	"fields": b24.Params{
    		"name":      "Новая воронка по умолчанию",
    		"sort":      50,
    		"isDefault": "Y",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.category.add: %w", err)
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
            "id": 5,
            "name": "Новая воронка по умолчанию",
            "sort": 50,
            "entityTypeId": 1152,
            "isDefault": "Y"
        }
    },
    "time": {
        "start": 1718116794.208887,
        "finish": 1718116794.666272,
        "duration": 0.4573848247528076,
        "processing": 0.1496260166168213,
        "date_start": "2024-06-11T16:39:54+02:00",
        "date_finish": "2024-06-11T16:39:54+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит объект [`category`](#category) с информацией о воронке ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект category {#category}

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
[`integer`](../../../data-types.md) | Идентификатор [системного](../../index.md) или [пользовательского типа](../user-defined-object-types/index.md), к которому принадлежит воронка ||
|| **isDefault**
[`boolean`](../../../data-types.md) | Признак воронки по умолчанию: `Y` — да, `N` — нет ||
|| **originId**
[`string`](../../../data-types.md) | Идентификатор элемента в источнике данных.

Существует только в сделках ||
|| **originatorId**
[`string`](../../../data-types.md) | Идентификатор источника данных.

Существует только в сделках ||
|| **isSystem** 
[`boolean`](../../../data-types.md) | Является ли воронка системной.

Поле присутствует для воронок контактов и компаний ||
|| **code**
[`string`](../../../data-types.md) | Псевдоним для системных воронок.

Поле присутствует для воронок контактов и компаний ||
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
|| `400` | `NOT_FOUND` | Смарт-процесс не найден | Тип объекта CRM с указанным `entityTypeId` не найден ||
|| `400` | `ENTITY_TYPE_NOT_SUPPORTED` | Сущность CRM {entityTypeName} не поддерживается | Объект CRM не поддерживает воронки. Вместо `{entityTypeName}` возвращается название типа объекта ||
|| `400` | `ADDING_DISABLED` | Добавление системной категории запрещено | Возникает при передаче `fields.isSystem = "Y"`: создание системных воронок запрещено ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | Возникает, если у пользователя недостаточно прав для добавления воронки ||
|| `400` | `0` | Field 'NAME' is required. | Возникает, если при создании воронки сделки не передано поле `name` или передано пустое название ||
|| `400` | `160` | Internal server error. | Возникает при попытке создать воронку по умолчанию для контактов или компаний: общая воронка не поддерживает изменение признака `isDefault` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [Воронки CRM: обзор методов](./index.md)
- [{#T}](./crm-category-update.md)
- [{#T}](./crm-category-get.md)
- [{#T}](./crm-category-list.md)
- [{#T}](./crm-category-delete.md)
- [{#T}](./crm-category-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-category-to-spa.md)
