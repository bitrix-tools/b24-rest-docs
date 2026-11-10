# Получить список моих компаний с реквизитами и контактами v 3.0 crm.mycompany.basic.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение компаний, счетов, документов CRM или документов КЭДО — достаточно права на любой из этих типов объектов

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.mycompany.basic.list` возвращает список моих компаний с основными данными: названием, телефонами, почтой, реквизитами и банковскими реквизитами.

Метод доступен без прав администратора CRM, которые нужны методу [crm.mycompany.list](./crm-entity-list-rest-v3.md). Например, список своих компаний получит сотрудник, который работает только со счетами или документами.

## Отличия от crm.mycompany.list

#|
|| **Что сравниваем** | **crm.mycompany.basic.list** | **crm.mycompany.list** ||
|| Кто может вызвать | Пользователь с правом на чтение компаний, счетов, документов CRM или документов КЭДО | Администратор CRM ||
|| Поля | Только `id`, `title`, `email`, `phone`, `requisites`, `bankRequisites` | Все поля моей компании, кроме реквизитов, включая пользовательские поля. [Поля моей компании](./fields-my-company.md) ||
|| Ответ без `select` | `id` и `title` | Только `id` ||
|| Фильтр | Только операторы `=` и `in`, поля `id`, `title`, `email.value`, `phone.value`. Без отрицания | Операторы и поля из [описания crm.<тип>.list](./crm-entity-list-rest-v3.md#filter) ||
|| Сортировка | Только по `id` и `title` | По полям с признаком `sortable` ||
|#

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Список полей, которые нужно вернуть для каждой компании. [Описание параметра](#select)

По умолчанию: `["id", "title"]` ||
|| **filter**
[`array`](../../../data-types.md) | Условия отбора компаний. [Описание параметра](#filter)

Если параметр не передан, метод возвращает все мои компании ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. [Описание параметра](#order)

По умолчанию: `{"id": "ASC"}` ||
|| **pagination**
[`object`](../../../data-types.md) | Параметры постраничной навигации: `limit`, `page`, `offset`. [Описание параметра](#pagination)

По умолчанию метод возвращает первые 50 компаний ||
|#

### Параметр select {#select}

Доступные поля:

- `id` — идентификатор компании
- `title` — название компании
- `email` — адреса почты
- `phone` — телефоны
- `requisites` — реквизиты компании
- `bankRequisites` — банковские реквизиты компании

Поля вложенных объектов можно выбрать через точку: `phone.value`, `requisites.inn`, `bankRequisites.bankName`. Имя объекта целиком, например `requisites`, возвращает все его поля.

Другие поля, например `createdTime`, вызывают ошибку `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`. Описания доступных полей возвращают методы `crm.mycompany.basic.field.list` и `crm.mycompany.basic.field.get`.

### Параметр filter {#filter}

Фильтр — массив условий в формате REST 3.0, условия соединяются логикой И:

- `["поле", значение]` — точное совпадение, для значения-массива — вхождение в список
- `["поле", "=", значение]` — точное совпадение
- `["поле", "in", [значение, значение]]` — вхождение в список

Фильтровать можно по полям:

- `id` — идентификатор компании
- `title` — название компании, точное совпадение
- `email.value` — адрес почты
- `phone.value` — номер телефона

Другие операторы, например `>=` или `!=`, вызывают ошибку `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`. Условия по реквизитам, например `requisites.inn`, вызывают ту же ошибку.

Условия можно соединить логикой ИЛИ группой `{"logic": "or", "conditions": [...]}`. Группа с `"negative": true` вызывает ошибку `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`. Подробнее о группах условий — в описании метода [crm.<тип>.list](./crm-entity-list-rest-v3.md#filter).

Фильтр ищет только среди моих компаний: условие по идентификатору обычной компании возвращает пустой список.

### Параметр order {#order}

Объект, где ключ — `id` или `title`, а значение — направление сортировки.

Возможные значения направления:

- `ASC` — по возрастанию
- `DESC` — по убыванию

Если `id` нет в `order`, метод добавляет его последним ключом с тем же направлением, что у последнего поля. Сортировка по другим полям вызывает ошибку.

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество компаний на странице. Ноль и отрицательное значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) × limit` ||
|| **offset**
[`integer`](../../../data-types.md) | Количество компаний, которые нужно пропустить от начала списка. Отрицательное значение вызывает ошибку.

По умолчанию: `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.mycompany.basic.list`

{% endnote %}

Примеры получают две мои компании по идентификаторам с телефонами, почтой, реквизитами и названиями банков. Компании отсортированы по названию.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","phone","email","requisites.id","requisites.presetId","bankRequisites.id","bankRequisites.bankName"],"filter":[["id","in",[3,79]]],"order":{"title":"ASC"},"pagination":{"limit":10}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.mycompany.basic.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","phone","email","requisites.id","requisites.presetId","bankRequisites.id","bankRequisites.bankName"],"filter":[["id","in",[3,79]]],"order":{"title":"ASC"},"pagination":{"limit":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.mycompany.basic.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type Multifield = {
      id: number
      valueTypeId: string
      value: string
    }

    type MyCompanyBasicListResult = {
      items: {
        id: number
        title: string
        phone: Multifield[]
        email: Multifield[]
        requisites: { id: number, presetId: number }[]
        bankRequisites: { id: number, bankName: string | null }[]
      }[]
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<MyCompanyBasicListResult>(
        'crm.mycompany.basic.list',
        {
          select: [
            'id',
            'title',
            'phone',
            'email',
            'requisites.id',
            'requisites.presetId',
            'bankRequisites.id',
            'bankRequisites.bankName',
          ],
          filter: [
            ['id', 'in', [3, 79]],
          ],
          order: {
            title: 'ASC',
          },
          pagination: {
            limit: 10,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        for (const company of response.getData()!.result.items) {
          console.info(company.id, company.title, company.requisites.length)
        }
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listMyCompanies() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.mycompany.basic.list',
            {
              select: [
                'id',
                'title',
                'phone',
                'email',
                'requisites.id',
                'requisites.presetId',
                'bankRequisites.id',
                'bankRequisites.bankName',
              ],
              filter: [
                ['id', 'in', [3, 79]],
              ],
              order: {
                title: 'ASC',
              },
              pagination: {
                limit: 10,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          for (const company of response.getData().result.items) {
            console.info(company.id, company.title, company.requisites.length)
          }
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listMyCompanies)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.mycompany.basic.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": [
                    "id",
                    "title",
                    "phone",
                    "email",
                    "requisites.id",
                    "requisites.presetId",
                    "bankRequisites.id",
                    "bankRequisites.bankName",
                ],
                "filter": [
                    ["id", "in", [3, 79]],
                ],
                "order": {
                    "title": "ASC",
                },
                "pagination": {
                    "limit": 10,
                },
            },
            prefer_version=3,
        )
        for company in response["result"]["items"]:
            print(company["id"], company["title"], len(company["requisites"]))
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
                'crm.mycompany.basic.list',
                [
                    'select' => [
                        'id',
                        'title',
                        'phone',
                        'email',
                        'requisites.id',
                        'requisites.presetId',
                        'bankRequisites.id',
                        'bankRequisites.bankName',
                    ],
                    'filter' => [
                        ['id', 'in', [3, 79]],
                    ],
                    'order' => [
                        'title' => 'ASC',
                    ],
                    'pagination' => [
                        'limit' => 10,
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
        'crm.mycompany.basic.list',
        {
            select: [
                'id',
                'title',
                'phone',
                'email',
                'requisites.id',
                'requisites.presetId',
                'bankRequisites.id',
                'bankRequisites.bankName',
            ],
            filter: [
                ['id', 'in', [3, 79]],
            ],
            order: {
                title: 'ASC',
            },
            pagination: {
                limit: 10,
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
        'crm.mycompany.basic.list',
        [
            'select' => [
                'id',
                'title',
                'phone',
                'email',
                'requisites.id',
                'requisites.presetId',
                'bankRequisites.id',
                'bankRequisites.bankName',
            ],
            'filter' => [
                ['id', 'in', [3, 79]],
            ],
            'order' => [
                'title' => 'ASC',
            ],
            'pagination' => [
                'limit' => 10,
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
    res, err := client.Core().Call(ctx, "crm.mycompany.basic.list", b24.Params{
    	"select": []string{
    		"id", "title", "phone", "email",
    		"requisites.id", "requisites.presetId",
    		"bankRequisites.id", "bankRequisites.bankName",
    	},
    	"filter": []any{
    		[]any{"id", "in", []int{3, 79}},
    	},
    	"order": b24.Params{
    		"title": "ASC",
    	},
    	"pagination": b24.Params{
    		"limit": 10,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.mycompany.basic.list: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var companies []struct {
    	ID         int    `json:"id"`
    	Title      string `json:"title"`
    	Requisites []struct {
    		ID       int `json:"id"`
    		PresetID int `json:"presetId"`
    	} `json:"requisites"`
    }
    if err := json.Unmarshal(raw, &companies); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, company := range companies {
    	fmt.Println(company.ID, company.Title, len(company.Requisites))
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
                "id": 3,
                "title": "ООО Ромашка",
                "email": [
                    {
                        "id": 7605,
                        "valueTypeId": "WORK",
                        "valueType": {
                            "id": "WORK",
                            "name": "Рабочий e-mail",
                            "nameShort": "Рабочий"
                        },
                        "value": "info@example.com"
                    }
                ],
                "phone": [
                    {
                        "id": 7637,
                        "valueTypeId": "WORK",
                        "valueType": {
                            "id": "WORK",
                            "name": "Рабочий телефон",
                            "nameShort": "Рабочий"
                        },
                        "value": "+79990000000"
                    }
                ],
                "requisites": [
                    {
                        "id": 3,
                        "presetId": 1
                    },
                    {
                        "id": 49,
                        "presetId": 1
                    }
                ],
                "bankRequisites": [
                    {
                        "id": 3,
                        "bankName": "Основной счет"
                    }
                ]
            },
            {
                "id": 79,
                "title": "ООО Ландыш",
                "email": [],
                "phone": [],
                "requisites": [
                    {
                        "id": 97,
                        "presetId": 1
                    }
                ],
                "bankRequisites": []
            }
        ]
    },
    "time": {
        "start": 1793707015,
        "finish": 1793707015.500961,
        "duration": 0.5009610652923584,
        "processing": 0,
        "date_start": "2026-11-03T14:56:55+03:00",
        "date_finish": "2026-11-03T14:56:55+03:00",
        "operating_reset_at": 1793707560,
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
|| **result.items**
[`array`](../../../data-types.md) | Список моих компаний. Каждая компания содержит только поля из `select`. Поля компании описаны в методе [crm.mycompany.basic.get](./crm-my-company-basic-get-rest-v3.md#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Ответ не содержит общего количества компаний. Если на странице вернулось меньше компаний, чем указано в `limit`, это последняя страница.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION",
        "message": "Не удается распознать выражение фильтра `[\"id\",\">=\",3]`"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибка фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `#CONDITION#` | Используйте только операторы `=` и `in`, поля `id`, `title`, `email.value`, `phone.value` и группы без `negative` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `BasicCompanyDto` | Передайте в `select`, `filter` и `order` только поля из описания параметров ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`, HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение сортировки `#DIRECTION#` | Передайте `order` объектом, например `{"title":"ASC"}`, с направлением `ASC` или `DESC` ||
|#

#### Поле не участвует в сортировке

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`, HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `#FIELD#` | В DTO `BasicCompanyDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id` или `title` ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` больше нуля и `offset` не меньше нуля ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права на чтение ни компаний, ни счетов, ни документов CRM, ни документов КЭДО ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, `crm.mycompany.basic.list`, а не `crm.myCompany.basic.list` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-my-company-basic-get-rest-v3.md)
- [{#T}](./crm-entity-list-rest-v3.md)
- [{#T}](./fields-my-company.md)
- [{#T}](../requisites/crm-requisite-list-rest-v3.md)
