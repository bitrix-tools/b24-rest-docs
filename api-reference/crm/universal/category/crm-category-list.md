# Получить список воронок crm.category.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.<тип>.category.list](../../rest-v3/categories/crm-entity-category-list-rest-v3.md). Воронки счетов, документов CRM и документов КЭДО в REST 3.0 пока недоступны, для них используйте этот метод.

{% endnote %}

Метод `crm.category.list` получает список воронок, которые относятся к типу объекта CRM с идентификатором `entityTypeId`.

{% note warning "Какие воронки попадут в список" %}

Метод возвращает только те воронки, к которым у пользователя есть право на чтение.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | Идентификатор [системного](../../index.md) или [пользовательского типа](../user-defined-object-types/index.md) объекта CRM, для которого нужно получить список воронок. Тип объекта должен поддерживать воронки: [список поддерживаемых объектов](./index.md#supported-entity-types) ||
|| **filter**
[`object`](../../../data-types.md) | Необязательный фильтр воронок [(подробное описание)](#filter). По умолчанию пустой ||
|| **isCategoryMenu**
[`boolean`](../../../data-types.md) | Если `true`, возвращает данные воронок для меню со счетчиком `counter`. Необязательный параметр, по умолчанию `false` ||
|#

### Параметр filter {#filter}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../../../data-types.md) | Точное значение кода воронки. Например, `CATALOG_CONTRACTOR_CONTACT` для воронки поставщиков-контактов. Если не передано, фильтрация по коду не применяется. Другие поля и операторы фильтра не поддерживаются ||
|#

Метод возвращает весь список воронок, доступных пользователю и соответствующих фильтру, без постраничной навигации.

## Примеры кода

Получить список воронок для сделок.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.category.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.category.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CategoryListResult = {
      categories: Array<{
        id: number
        name: string
        sort: number
        entityTypeId: number
        isDefault: 'Y' | 'N'
        originId?: string
        originatorId?: string
      }>
    }

    try {
      // Метод возвращает список доступных пользователю воронок
      const response = await $b24.actions.v2.call.make<CategoryListResult>({
        method: 'crm.category.list',
        params: {
          entityTypeId: 2,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Categories:', result.categories, 'Count:', result.categories.length)
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
      async function loadCategoryList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // Метод возвращает список доступных пользователю воронок
          const response = await $b24.actions.v2.call.make({
            method: 'crm.category.list',
            params: {
              entityTypeId: 2,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Categories:', result.categories, 'Count:', result.categories.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', loadCategoryList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.category.list(
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
                'crm.category.list',
                [
                    'entityTypeId' => 2,
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
        "crm.category.list",
        {
            entityTypeId: 2,
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
        'crm.category.list',
        [
            'entityTypeId' => 2
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.category.list", b24.Params{
    	"entityTypeId": 2,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.category.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "categories".
    raw, ok := b24.Unwrap(res.Result, "categories")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа categories")
    }

    var items []struct {
    	ID           b24.ID `json:"id"`
    	Name         string `json:"name"`
    	Sort         int    `json:"sort"`
    	EntityTypeID b24.ID `json:"entityTypeId"`
    	IsDefault    string `json:"isDefault"`
    	OriginID     string `json:"originId"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "categories": [
            {
                "id": 9,
                "name": "Воронка с оригинальным названием",
                "sort": 200,
                "entityTypeId": 2,
                "isDefault": "N",
                "originId": "",
                "originatorId": ""
            },
            {
                "id": 10,
                "name": "Лидовый маршрут",
                "sort": 200,
                "entityTypeId": 2,
                "isDefault": "N",
                "originId": "",
                "originatorId": ""
            },
            {
                "id": 11,
                "name": "Путь успеха",
                "sort": 200,
                "entityTypeId": 2,
                "isDefault": "N",
                "originId": "",
                "originatorId": ""
            },
            {
                "id": 0,
                "name": "Общая",
                "sort": 300,
                "entityTypeId": 2,
                "isDefault": "Y"
            }
        ]
    },
    "total": 4,
    "time": {
        "start": 1718293410.373042,
        "finish": 1718293425.947633,
        "duration": 15.574590921401978,
        "processing": 15.16909408569336,
        "date_start": "2024-06-13T17:43:30+02:00",
        "date_finish": "2024-06-13T17:43:45+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **total**
[`integer`](../../../data-types.md) | Количество воронок, доступных пользователю и соответствующих фильтру ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **categories**
[`array`](../../../data-types.md) | Массив воронок. При `isCategoryMenu=false` поля воронки описаны в объекте [`category`](./crm-category-add.md#category). При `isCategoryMenu=true` возвращаются поля для меню, описанные ниже ||
|#

При `isCategoryMenu=false` поля `isSystem` и `code` возвращаются только для контактов и компаний — `entityTypeId=3` и `entityTypeId=4`. Для сделок и смарт-процессов эти поля в ответ не входят. Поле `isSystem` — `boolean` со значениями `Y` или `N`, поле `code` — строковый код воронки.

При `isCategoryMenu=true` каждая воронка содержит только `id`, `name`, `sort`, `entityTypeId`, `isDefault` и `counter`. Поле `counter` типа `integer` — значение счетчика текущего пользователя в этой воронке.

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
|| `400` | `100` | Could not find value for parameter {entityTypeId} | Не передан обязательный параметр `entityTypeId` ||
|| `400` | `NOT_FOUND` | Смарт-процесс не найден | Тип объекта CRM с указанным `entityTypeId` не найден ||
|| `400` | `ENTITY_TYPE_NOT_SUPPORTED` | Сущность CRM {entityTypeName} не поддерживается | Объект CRM не поддерживает воронки. Вместо `{entityTypeName}` возвращается название типа объекта ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [Воронки CRM: обзор методов](./index.md)
- [{#T}](./crm-category-add.md)
- [{#T}](./crm-category-update.md)
- [{#T}](./crm-category-get.md)
- [{#T}](./crm-category-delete.md)
- [{#T}](./crm-category-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-get-lists/how-to-get-elements-by-stage-filter.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-contractor.md)
- [{#T}](../../../../tutorials/crm/how-to-get-lists/how-to-get-contractors.md)
