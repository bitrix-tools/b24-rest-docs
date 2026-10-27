# Получить список CRM-форм crm.form.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр CRM-форм

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `crm.form.list` возвращает список CRM-форм с фильтрацией, сортировкой и постраничной навигацией.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей, которые нужно вернуть.

Можно указать раздел целиком, например `crm`, или поле раздела через точку, например `crm.entityScheme`. Описание всех полей — в разделе [Структура CRM-формы](./data-types.md#crm_form).

По умолчанию возвращаются простые поля: `id`, `code`, `name`, `active`, `system`, `languageId`, `templateId`, `createdTime`, `updatedTime`, `activeChangedById`, `activeChangedTime`.

Разделы `appearance`, `crm`, `fields`, `dependencies`, `presetFields`, `responsible`, `agreements`, `submission`, `payment`, `callback`, `booking`, `analytics`, `spamProtection`, `integrations` возвращаются, только если указаны в `select` ||
|| **filter**
[`array`](../../data-types.md) | Условия отбора в формате REST 3.0: массив условий `[поле, оператор, значение]`. Подробнее о формате — в [обзоре REST 3.0](../../rest-v3.md).

Поля для фильтра:

- `id` — идентификатор формы
- `code` — символьный код формы
- `name` — название формы. Поиск только по точному совпадению, операторы частичного совпадения не поддерживаются
- `active` — активность формы: `true` или `false`
- `createdTime` — дата создания
- `updatedTime` — дата изменения
- `crm.entityScheme` — схема CRM, то есть какие объекты создает форма. Идентификаторы схем возвращает метод [crm.form.configuration.get](./setup/crm-form-configuration-get.md)
- `responsible.userIds` — ответственный. Передайте идентификатор пользователя или массив идентификаторов, только положительные числа

Для дат используйте сравнения `>`, `>=`, `<`, `<=`: перечислить несколько дат через `in` нельзя.

Ограничения фильтра: до 50 условий и групп, вложенность до 5 уровней, до 1000 значений во всех `in` вместе ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "ASC"}` или `{"поле": "DESC"}`.

Поля для сортировки: `id`, `name`, `active`, `createdTime`, `updatedTime`, `crm.entityScheme`.

Порядок ключей задает порядок сортировки. Результат всегда дополнительно сортируется по `id`, поэтому формы не теряются и не повторяются на соседних страницах ||
|| **pagination**
[`object`](../../data-types.md) | Постраничная навигация:

- `limit` — сколько форм вернуть, от 1 до 1000
- `offset` — сколько форм пропустить с начала выборки

По умолчанию возвращается 50 форм ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.list`

{% endnote %}

Пример получает активные формы, которые создают лид, созданные с начала 2026 года.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","active","crm.entityScheme","responsible.userIds","updatedTime"],"filter":[["active","=",true],["crm.entityScheme","=",1],["createdTime",">=","2026-01-01T00:00:00+03:00"]],"order":{"createdTime":"DESC"},"pagination":{"limit":50,"offset":0}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","active","crm.entityScheme","responsible.userIds","updatedTime"],"filter":[["active","=",true],["crm.entityScheme","=",1],["createdTime",">=","2026-01-01T00:00:00+03:00"]],"order":{"createdTime":"DESC"},"pagination":{"limit":50,"offset":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FormListResult = {
      items: Array<{
        id: number
        name: string
        active: boolean
        updatedTime: string
        crm: {
          entityScheme: number
        }
        responsible: {
          userIds: number[]
        }
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<FormListResult>({
        method: 'crm.form.list',
        params: {
          select: [
            'id',
            'name',
            'active',
            'crm.entityScheme',
            'responsible.userIds',
            'updatedTime',
          ],
          filter: [
            ['active', '=', true],
            ['crm.entityScheme', '=', 1],
            ['createdTime', '>=', '2026-01-01T00:00:00+03:00'],
          ],
          order: {
            createdTime: 'DESC',
          },
          pagination: {
            limit: 50,
            offset: 0,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.items)
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
      async function listForms() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.list',
            params: {
              select: [
                'id',
                'name',
                'active',
                'crm.entityScheme',
                'responsible.userIds',
                'updatedTime',
              ],
              filter: [
                ['active', '=', true],
                ['crm.entityScheme', '=', 1],
                ['createdTime', '>=', '2026-01-01T00:00:00+03:00'],
              ],
              order: {
                createdTime: 'DESC',
              },
              pagination: {
                limit: 50,
                offset: 0,
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
          console.info(result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listForms)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # client = Client(token, prefer_version=3)

    try:
        bitrix_response = client.crm.form.list(
            select=[
                "id",
                "name",
                "active",
                "crm.entityScheme",
                "responsible.userIds",
                "updatedTime",
            ],
            filter=[
                ["active", "=", True],
                ["crm.entityScheme", "=", 1],
                ["createdTime", ">=", "2026-01-01T00:00:00+03:00"],
            ],
            order={
                "createdTime": "DESC",
            },
            pagination={
                "limit": 50,
                "offset": 0,
            },
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
                'crm.form.list',
                [
                    'select' => [
                        'id',
                        'name',
                        'active',
                        'crm.entityScheme',
                        'responsible.userIds',
                        'updatedTime',
                    ],
                    'filter' => [
                        ['active', '=', true],
                        ['crm.entityScheme', '=', 1],
                        ['createdTime', '>=', '2026-01-01T00:00:00+03:00'],
                    ],
                    'order' => [
                        'createdTime' => 'DESC',
                    ],
                    'pagination' => [
                        'limit' => 50,
                        'offset' => 0,
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
        'crm.form.list',
        {
          select: [
            'id',
            'name',
            'active',
            'crm.entityScheme',
            'responsible.userIds',
            'updatedTime',
          ],
          filter: [
            ['active', '=', true],
            ['crm.entityScheme', '=', 1],
            ['createdTime', '>=', '2026-01-01T00:00:00+03:00'],
          ],
          order: {
            createdTime: 'DESC',
          },
          pagination: {
            limit: 50,
            offset: 0,
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
        'crm.form.list',
        [
            'select' => [
                'id',
                'name',
                'active',
                'crm.entityScheme',
                'responsible.userIds',
                'updatedTime',
            ],
            'filter' => [
                ['active', '=', true],
                ['crm.entityScheme', '=', 1],
                ['createdTime', '>=', '2026-01-01T00:00:00+03:00'],
            ],
            'order' => [
                'createdTime' => 'DESC',
            ],
            'pagination' => [
                'limit' => 50,
                'offset' => 0,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "crm.form.list", b24.Params{
    	"select": []string{"id", "name", "active", "crm.entityScheme", "responsible.userIds", "updatedTime"},
    	"filter": []any{
    		[]any{
    			"active",
    			"=",
    			true,
    		},
    		[]any{
    			"crm.entityScheme",
    			"=",
    			1,
    		},
    		[]string{"createdTime", ">=", "2026-01-01T00:00:00+03:00"},
    	},
    	"order": map[string]any{
    		"createdTime": "DESC",
    	},
    	"pagination": map[string]any{
    		"limit": 50,
    		"offset": 0,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.form.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var forms []struct {
    	ID     int    `json:"id"`
    	Name   string `json:"name"`
    	Active bool   `json:"active"`
    }
    if err := json.Unmarshal(raw, &forms); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(len(forms))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "id": 45,
                "name": "Контактные данные",
                "active": true,
                "updatedTime": "2026-03-11T16:47:17+03:00",
                "crm": {
                    "entityScheme": 1
                },
                "responsible": {
                    "userIds": []
                }
            }
        ]
    },
    "time": {
        "start": 1792593038,
        "finish": 1792593038.734321,
        "duration": 0.734321117401123,
        "processing": 0,
        "date_start": "2026-10-21T17:30:38+03:00",
        "date_finish": "2026-10-21T17:30:38+03:00",
        "operating_reset_at": 1792593600,
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
|| **items**
[`array`](../../data-types.md) | Массив форм. Состав полей каждой формы зависит от `select`. [Структура CRM-формы](./data-types.md#crm_form) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION",
        "message": "Неизвестный оператор фильтра `%`"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `system` | В DTO `FormDto` в поле `system` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по полям из описания параметра `filter` ||
|| `code` | В DTO `FormDto` в поле `code` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по полям из описания параметра `order` ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Проверьте тип значения в условии фильтра ||
|| `responsible.userIds` | В поле `responsible.userIds` требуется тип данных `positive int` для такого запроса | Передайте положительный идентификатор пользователя ||
|#

#### Ошибки фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `%` | Используйте операторы REST 3.0. Название ищите по точному совпадению оператором `=` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Filter node limit exceeded.` | Сократите фильтр: до 50 условий и групп, вложенность до 5 уровней, до 1000 значений во всех `in` ||
|#

#### Ошибки сортировки и навигации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `UP` | Передайте объект вида `{"createdTime":"DESC"}` с направлением `ASC` или `DESC` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":1001}` | Передайте `limit` от 1 до 1000 и неотрицательный `offset` ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `foo` для сущности `CrmSettingsDto` | Передайте поля из раздела [Структура CRM-формы](./data-types.md#crm_form) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право на просмотр CRM-форм ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-get.md)
- [{#T}](./data-types.md)
- [{#T}](./crm-form-field-list.md)
- [{#T}](./index.md)
