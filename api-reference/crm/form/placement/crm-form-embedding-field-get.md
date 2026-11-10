# Получить поле вариантов размещения CRM-формы crm.form.embedding.field.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.form.embedding.field.get` возвращает описание поля вариантов размещения CRM-формы по имени.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Имя поля, описание которого нужно получить.

Доступные поля:

- `formActive` — признак активности формы
- `resourcesReady` — признак готовности файлов формы
- `publicUrl` — публичная ссылка на форму
- `inline` — вариант встраивания в страницу
- `click` — вариант показа по клику
- `auto` — вариант автопоказа ||
|| **select**
[`array`](../../../data-types.md) | Список полей описания, которые нужно вернуть в ответе. Если параметр не передан, метод возвращает все поля описания.

Доступные поля:

- `name` — имя поля
- `type` — тип данных
- `title` — заголовок
- `description` — описание
- `validationRules` — правила валидации
- `requiredGroups` — группы обязательности
- `filterable` — признак доступности в фильтре
- `sortable` — признак доступности в сортировке
- `editable` — признак редактируемости
- `editableGroups` — методы, в которых поле можно изменить
- `multiple` — признак множественного значения
- `elementType` — тип элемента для составных полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.embedding.field.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"click","select":["name","type","title","editable","editableGroups","multiple","elementType"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.embedding.field.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"click","select":["name","type","title","editable","editableGroups","multiple","elementType"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.embedding.field.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type Result = {
      item: {
        name?: string
        type?: string
        editable?: boolean
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<Result>({
        method: 'crm.form.embedding.field.get',
        params: {
          name: 'click',
          select: [
            'name',
            'type',
            'title',
            'editable',
            'editableGroups',
            'multiple',
            'elementType',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item)
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
      async function crmFormEmbeddingFieldGet() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.embedding.field.get',
            params: {
              name: 'click',
              select: [
                'name',
                'type',
                'title',
                'editable',
                'editableGroups',
                'multiple',
                'elementType',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', crmFormEmbeddingFieldGet)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    select = [
        "name",
        "type",
        "title",
        "editable",
        "editableGroups",
        "multiple",
        "elementType",
    ]

    try:
        bitrix_response = client.crm.form.embedding.field.get(
            name="click",
            select=select,
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
                'crm.form.embedding.field.get',
                [
                    'name' => 'click',
                    'select' => [
                        'name',
                        'type',
                        'title',
                        'editable',
                        'editableGroups',
                        'multiple',
                        'elementType',
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
        'crm.form.embedding.field.get',
        {
            name: 'click',
            select: [
                'name',
                'type',
                'title',
                'editable',
                'editableGroups',
                'multiple',
                'elementType',
            ],
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
        'crm.form.embedding.field.get',
        [
            'name' => 'click',
            'select' => [
                'name',
                'type',
                'title',
                'editable',
                'editableGroups',
                'multiple',
                'elementType',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    res, err := client.Core().Call(ctx, "crm.form.embedding.field.get", b24.Params{
    	"name":   "click",
    	"select": []string{"name", "type", "title", "editable", "editableGroups", "multiple", "elementType"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.form.embedding.field.get: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	Name     string `json:"name"`
    	Type     string `json:"type"`
    	Editable bool   `json:"editable"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Name, item.Type)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "name": "click",
            "type": "object",
            "title": "click",
            "editable": true,
            "editableGroups": [
                "update"
            ],
            "multiple": false,
            "elementType": null
        }
    },
    "time": {
        "start": 1792594244,
        "finish": 1792594244.81444,
        "duration": 0.8144400119781494,
        "processing": 0,
        "date_start": "2026-10-21T17:50:44+03:00",
        "date_finish": "2026-10-21T17:50:44+03:00",
        "operating_reset_at": 1792594800,
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
|| **item**
[`object`](../../../data-types.md) | Объект с описанием поля. Состав зависит от `select` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Обязательное поле `name` не указано",
                "field": "name"
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
|| `name` | Обязательное поле `name` не указано | Передайте параметр `name` с существующим именем поля ||
|#

#### Поле не найдено

HTTP-статус: **404**

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Поле `foo` не найдено | Передайте имя поля из списка доступных полей или получите его методом [crm.form.embedding.field.list](./crm-form-embedding-field-list.md) ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя и scope `crm` ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `foo` для сущности `DtoFieldDto` | Передайте `select` как массив строк из списка: `name`, `type`, `title`, `description`, `validationRules`, `requiredGroups`, `filterable`, `sortable`, `editable`, `editableGroups`, `multiple`, `elementType` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-embedding-field-list.md)
- [{#T}](./crm-form-embedding-get.md)
- [{#T}](./index.md)
