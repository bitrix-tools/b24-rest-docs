# Получить список пользовательских полей сообщений форума forum.message.field.custom.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`forum`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `forum.message.field.custom.list` возвращает все пользовательские поля сообщений форума, включая системные поля Битрикс24, например `UF_FORUM_MESSAGE_DOC`.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор поля
- `entityId` — идентификатор объекта
- `name` — код поля
- `userTypeId` — тип поля
- `xmlId` — внешний код
- `sort` — порядок сортировки
- `isMultiple` — признак множественного поля
- `isMandatory` — признак обязательного поля
- `showFilter` — показ в фильтре списка
- `showInList` — показ в списке
- `editInList` — возможность редактирования
- `isSearchable` — участие в поиске
- `settings` — настройки типа поля
- `editFormLabel` — подпись в форме редактирования
- `listColumnLabel` — заголовок колонки в списке
- `listFilterLabel` — подпись в фильтре
- `errorMessage` — текст ошибки
- `helpMessage` — текст подсказки

По умолчанию: все поля ||
|#

{% note info "" %}

Метод всегда возвращает все поля одним списком: `filter` и `pagination` не применяются, а `order` вызывает ошибку валидации. Нужное поле ищите в ответе по `name` или получайте методом [forum.message.field.custom.get](./forum-message-field-custom-get.md) по `id`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/forum.message.field.custom.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","userTypeId","isMultiple","editFormLabel"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/forum.message.field.custom.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","userTypeId","isMultiple","editFormLabel"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/forum.message.field.custom.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CustomFieldListResult = {
      items: Array<{
        id: number
        name: string
        userTypeId: string
        isMultiple: boolean
        editFormLabel: string | null
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<CustomFieldListResult>({
        method: 'forum.message.field.custom.list',
        params: {
          select: ['id', 'name', 'userTypeId', 'isMultiple', 'editFormLabel'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(field => console.info(field.id, field.name, field.userTypeId))
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
      async function listCustomFields() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'forum.message.field.custom.list',
            params: {
              select: ['id', 'name', 'userTypeId', 'isMultiple', 'editFormLabel'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(field => console.info(field.id, field.name, field.userTypeId))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listCustomFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.forum.message.field.custom.list(
            select=["id", "name", "userTypeId", "isMultiple", "editFormLabel"],
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
                'forum.message.field.custom.list',
                [
                    'select' => ['id', 'name', 'userTypeId', 'isMultiple', 'editFormLabel'],
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
        'forum.message.field.custom.list',
        {
            select: ['id', 'name', 'userTypeId', 'isMultiple', 'editFormLabel'],
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
        'forum.message.field.custom.list',
        [
            'select' => ['id', 'name', 'userTypeId', 'isMultiple', 'editFormLabel'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "forum.message.field.custom.list", b24.Params{
    	"select": []string{"id", "name", "userTypeId", "isMultiple", "editFormLabel"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("forum.message.field.custom.list: %w", err)
    }

    // Метод заворачивает список в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	ID            int     `json:"id"`
    	Name          string  `json:"name"`
    	UserTypeID    string  `json:"userTypeId"`
    	IsMultiple    bool    `json:"isMultiple"`
    	EditFormLabel *string `json:"editFormLabel"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, field := range items {
    	fmt.Println(field.ID, field.Name, field.UserTypeID)
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
                "id": 31,
                "name": "UF_FORUM_MESSAGE_DOC",
                "userTypeId": "disk_file",
                "isMultiple": true,
                "editFormLabel": null
            },
            {
                "id": 33,
                "name": "UF_FORUM_MESSAGE_VER",
                "userTypeId": "disk_version",
                "isMultiple": false,
                "editFormLabel": null
            },
            {
                "id": 35,
                "name": "UF_FORUM_MES_URL_PRV",
                "userTypeId": "url_preview",
                "isMultiple": false,
                "editFormLabel": null
            },
            {
                "id": 433,
                "name": "UF_TASK_COMMENT_TYPE",
                "userTypeId": "integer",
                "isMultiple": false,
                "editFormLabel": null
            },
            {
                "id": 6008091,
                "name": "UF_EXTERNAL_ID",
                "userTypeId": "string",
                "isMultiple": false,
                "editFormLabel": "Код во внешней системе"
            }
        ]
    },
    "time": {
        "start": 1792670697,
        "finish": 1792670697.444028,
        "duration": 0.4440279006958008,
        "processing": 0,
        "date_start": "2026-10-22T15:04:57+03:00",
        "date_finish": "2026-10-22T15:04:57+03:00",
        "operating_reset_at": 1792671240,
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
[`array`](../../data-types.md) | Массив пользовательских полей сообщений форума. Состав полей элемента зависит от `select`. Описание полей — в методе [forum.message.field.custom.get](./forum-message-field-custom-get.md#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Кроме полей, созданных через API, в списке есть системные поля, которые Битрикс24 создает сам:

- `UF_FORUM_MESSAGE_DOC` — поле типа `disk_file` для файлов Диска в сообщении
- `UF_FORUM_MESSAGE_VER` — поле типа `disk_version` для версий файлов Диска
- `UF_FORUM_MES_URL_PRV` — поле типа `url_preview` для превью ссылок
- `UF_TASK_COMMENT_TYPE` — системное поле модуля задач

Не изменяйте и не удаляйте системные поля: на них опирается работа комментариев в Битрикс24.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "В DTO `CustomDto` в поле `id` требуется наличие атрибута `Sortable` для такого запроса",
                "field": "id"
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
|| `#FIELD#` | В DTO `CustomDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Метод не поддерживает сортировку. Уберите `order` из запроса ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `CustomDto` | Передайте в `select` только поля из списка в описании параметра ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./forum-message-field-custom-get.md)
- [{#T}](./forum-message-field-custom-add.md)
- [{#T}](./forum-message-field-custom-update.md)
- [{#T}](./forum-message-field-custom-delete.md)
- [{#T}](./forum-message-field-custom-enum-list.md)
- [{#T}](../message/index.md)
- [{#T}](./index.md)
