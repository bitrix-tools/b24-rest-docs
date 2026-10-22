# Получить список открытых линий для CRM-формы crm.form.openline.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр CRM-форм и на изменение открытых линий

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.form.openline.list` возвращает открытые линии и показывает, является ли в них указанная CRM-форма приветственной.

{% note info "" %}

Метод только читает данные: назначить форму приветственной через REST нельзя.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Фильтр по CRM-форме. Принимает ровно одно условие по полю `formId` с оператором `=`:

```json
[["formId", "=", 45]]
```

Другие поля, операторы, логика `or` и отрицание не поддерживаются.

Идентификатор формы можно получить методом [crm.form.list](../crm-form-list.md) ||
|| **order**
[`object`](../../../data-types.md) | Сортировка по идентификатору открытой линии. Принимает только поле `id`.

Возможные значения:

- `ASC` — по возрастанию
- `DESC` — по убыванию

Например, `{"id": "DESC"}` ||
|| **pagination**
[`object`](../../../data-types.md) | Параметры постраничной навигации:

- `limit` — количество открытых линий на странице, от 1 до 1000. По умолчанию — `50`
- `offset` — сколько открытых линий пропустить от начала выборки. По умолчанию — `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.openline.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["formId","=",49]],"order":{"id":"ASC"},"pagination":{"limit":3}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.openline.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["formId","=",49]],"order":{"id":"ASC"},"pagination":{"limit":3},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.openline.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FormOpenLineListResult = {
      items: Array<{
        formId: number
        id: number
        name: string
        bound: boolean
        welcomeFormEnabled: boolean
        welcomeFormId: number | null
        welcomeFormDelayed: boolean
        previewUrl: string | null
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<FormOpenLineListResult>({
        method: 'crm.form.openline.list',
        params: {
          filter: [['formId', '=', 49]],
          order: { id: 'ASC' },
          pagination: { limit: 3 },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(item => console.info(item.id, item.name, item.bound))
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
      async function getFormOpenLines() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.openline.list',
            params: {
              filter: [['formId', '=', 49]],
              order: { id: 'ASC' },
              pagination: { limit: 3 },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(item => console.info(item.id, item.name, item.bound))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getFormOpenLines)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.form.openline.list(
            filter=[["formId", "=", 49]],
            order={"id": "ASC"},
            pagination={"limit": 3},
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
                'crm.form.openline.list',
                [
                    'filter' => [['formId', '=', 49]],
                    'order' => ['id' => 'ASC'],
                    'pagination' => ['limit' => 3],
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
        'crm.form.openline.list',
        {
            filter: [['formId', '=', 49]],
            order: { id: 'ASC' },
            pagination: { limit: 3 },
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
        'crm.form.openline.list',
        [
            'filter' => [['formId', '=', 49]],
            'order' => ['id' => 'ASC'],
            'pagination' => ['limit' => 3],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    res, err := client.Core().Call(ctx, "crm.form.openline.list", b24.Params{
    	"filter":     [][]any{{"formId", "=", 49}},
    	"order":      map[string]string{"id": "ASC"},
    	"pagination": map[string]int{"limit": 3},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.form.openline.list: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	FormID             int     `json:"formId"`
    	ID                 int     `json:"id"`
    	Name               string  `json:"name"`
    	Bound              bool    `json:"bound"`
    	WelcomeFormEnabled bool    `json:"welcomeFormEnabled"`
    	WelcomeFormID      *int    `json:"welcomeFormId"`
    	WelcomeFormDelayed bool    `json:"welcomeFormDelayed"`
    	PreviewURL         *string `json:"previewUrl"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range items {
    	fmt.Println(item.ID, item.Name, item.Bound)
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
                "formId": 49,
                "id": 1,
                "name": "Открытая линия ",
                "bound": false,
                "welcomeFormEnabled": false,
                "welcomeFormId": 25,
                "welcomeFormDelayed": true,
                "previewUrl": "https://test.bitrix24.ru/pub/form/49/7vo9z0/?view=preview&preview=ol&preview_id=1"
            },
            {
                "formId": 49,
                "id": 3,
                "name": "Wix",
                "bound": false,
                "welcomeFormEnabled": true,
                "welcomeFormId": 25,
                "welcomeFormDelayed": true,
                "previewUrl": "https://test.bitrix24.ru/pub/form/49/7vo9z0/?view=preview&preview=ol&preview_id=3"
            },
            {
                "formId": 49,
                "id": 5,
                "name": "Открытая линия 4",
                "bound": false,
                "welcomeFormEnabled": false,
                "welcomeFormId": 25,
                "welcomeFormDelayed": true,
                "previewUrl": null
            }
        ]
    },
    "time": {
        "start": 1792594222,
        "finish": 1792594222.68616,
        "duration": 0.6861600875854492,
        "processing": 0,
        "date_start": "2026-10-21T17:50:22+03:00",
        "date_finish": "2026-10-21T17:50:22+03:00",
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
|| **items**
[`array`](../../../data-types.md) | Список открытых линий, [подробное описание](#items) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **formId**
[`integer`](../../../data-types.md) | Идентификатор CRM-формы из фильтра запроса ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор открытой линии ||
|| **name**
[`string`](../../../data-types.md) | Название открытой линии ||
|| **bound**
[`boolean`](../../../data-types.md) | Является ли форма из фильтра приветственной формой этой линии.

Возможные значения:

- `true` — форма назначена приветственной
- `false` — форма не назначена приветственной ||
|| **welcomeFormEnabled**
[`boolean`](../../../data-types.md) | Включена ли в линии приветственная форма: эта или другая.

Возможные значения:

- `true` — приветственная форма включена
- `false` — приветственная форма выключена ||
|| **welcomeFormId**
[`integer`](../../../data-types.md) | Идентификатор приветственной формы линии. Равен `null`, если форма не выбрана ||
|| **welcomeFormDelayed**
[`boolean`](../../../data-types.md) | Когда показывается приветственная форма.

Возможные значения:

- `true` — после первого сообщения посетителя
- `false` — до первого сообщения посетителя ||
|| **previewUrl**
[`string`](../../../data-types.md) | Ссылка на предпросмотр виджета на сайт с этой открытой линией. Равна `null`, если линия не подключена ни к одному активному виджету. Форма из фильтра видна в предпросмотре, только если `bound` равно `true` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации фильтров объекта запроса",
        "validation": [
            {
                "message": "Требуется указать фильтр по обязательному полю `formId`",
                "field": "filter.formId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки фильтра и параметров запроса

HTTP-статус: **400**

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Значение поля не может быть пустым | Передайте `filter` с условием `[["formId", "=", <id формы>]]` ||
|| `id` | В DTO `OpenLineDto` в поле `id` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по `formId` ||
|| `name` | В DTO `OpenLineDto` в поле `name` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.formId` | Требуется указать фильтр по обязательному полю `formId` | Передайте условие по `formId` с оператором `=` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `[["formId","=",0]]` | Передайте одно условие `[["formId", "=", <id формы>]]` с положительным идентификатором, без логики `or` и отрицания ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `UP` | Передайте `order` в виде `{"id": "ASC"}` или `{"id": "DESC"}` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":1001}` | Передайте `limit` от 1 до 1000 и `offset` не меньше 0 ||
|#

#### Форма не найдена

HTTP-статус: **404**

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `formId` | Запись с ID = `999999` не найдена | Проверьте идентификатор формы методом [crm.form.list](../crm-form-list.md) ||
|#

#### Ошибки доступа

HTTP-статус: **403**

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право на просмотр CRM-форм ||
|#

Код ошибки: `BITRIX_CRM_V2_INFRASTRUCTURE_REST_EXCEPTION_FORM_OPENLINEACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав для изменения открытых линий | Выдайте пользователю право на изменение открытых линий ||
|#

Код ошибки: `BITRIX_CRM_V2_INFRASTRUCTURE_REST_EXCEPTION_FORM_OPENLINESUNAVAILABLEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Установите модуль «Открытые линии» | Установите модуль «Открытые линии» на Битрикс24 ||
|#

Код ошибки: `BITRIX_CRM_V2_INFRASTRUCTURE_REST_EXCEPTION_FORM_PHONEVERIFICATIONREQUIREDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Чтобы добавить CRM-форму, подтвердите номер телефона | Подтвердите номер телефона в Битрикс24 и повторите запрос ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-openline-field-list.md)
- [{#T}](./crm-form-sitebutton-list.md)
- [{#T}](./crm-form-embedding-get.md)
- [{#T}](./index.md)
